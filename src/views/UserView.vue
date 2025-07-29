<script setup>
import { mdiContentSave, mdiSquareEditOutline } from '@mdi/js';
import { onMounted, reactive, ref } from 'vue';
import { useUsuarioStore } from '@/stores/usuarios.store';
import { rules } from '@/common/rules-form';
import { useRolStore } from '@/stores/roles.store';
import { useToastStore } from '@/stores/toast.store';

    const usuarioStore = useUsuarioStore()
    const rolStore = useRolStore()
    const toastStore = useToastStore()

    const usuarios = ref([]);

    const roles = ref([])

    const agregarModal = ref(false)

    const actualizarUsuario = ref(false)

    const nuevoUsuario = reactive({
        nombre: '',
        apellido: '',
        email: '',
        documento: '',
        telefono: '',
        contraseña: '',
        rol_id: null
    })

    const SwitchUsuario = async (id) => {
        const response = await usuarioStore.toggleEstadoUsuario(id)
        usuarios.value = response.data
    }

    onMounted(async ()=>{

        await obtenerUsuarios()

        roles.value = await rolStore.obtenerRoles()

    })

    const obtenerUsuarios = async () =>{
        const response = await usuarioStore.obtenerUsuarios();

        // Respuesta exitosa
        if(response.data){
            usuarios.value = response.data
        }

        // Error controlado
        if(response.response){
            errores.value = response.response.data;
            toastStore.MostrarError(errores.value.message)
            return
        }

        // Error no controlado
        if(response.message){
            errores.value = response.message;
            toastStore.MostrarError(errores.value+ ': Hubo un problema de red')
            return
        }
    }

    const mostrarModalActualizar = async (id) => {

        actualizarUsuario.value = true;
        agregarModal.value = true
        const usuarioEncontrado = await usuarioStore.obtenerUsuarioPorId(id);
        Object.assign(nuevoUsuario, {
            id: usuarioEncontrado.id,
            nombre: usuarioEncontrado.nombre,
            apellido: usuarioEncontrado.apellido,
            email: usuarioEncontrado.email,
            documento: usuarioEncontrado.documento,
            telefono: usuarioEncontrado.telefono,
            rol_id: usuarioEncontrado.rol_id.id,
        });

    }

    const submitHandledEvent = async () => {

        if(actualizarUsuario.value){

            const response = await usuarioStore.actualizarUsuario(nuevoUsuario);
            if(response){
               if(response.data){
                   toastStore.MostrarConfirmacion('Se actualizo el usuario correctamente')
                   await obtenerUsuarios()
                   cerrarModal()
                   return
               }
               
               if(response.response){
                    toastStore.MostrarError(response.response.data.message)
               }
            }

        }else{

            const response = await usuarioStore.agregarUsuario(nuevoUsuario);
            if(response){
               if(response.data){
                   toastStore.MostrarConfirmacion('Se creo el usuario correctamente')
                   await obtenerUsuarios()
                   cerrarModal()
                   return
               }
               
               if(response.response){
                    toastStore.MostrarError(response.response.data.message)
               }
            }

        }


    }

    const cerrarModal = () => {

        agregarModal.value = false
        actualizarUsuario.value = false
        Object.assign(nuevoUsuario, {
            id: '',
            nombre: '',
            apellido: '',
            email: '',
            documento: '',
            telefono: '',
            contraseña: '',
            rol_id: null
        });

    }



</script>

<template>
    <div class="pa-4">
        <p class="text-h4 font-weight-bold">Usuarios registrados en el sistema</p>
    </div>

    <div class="pa-4 d-flex justify-end">
        <v-btn 
            variant="elevated" 
            color="indigo-darken-1"
            rounded="xl"
            elevation="4"
            @click="agregarModal = true"
        >
            Agregar usuario
        </v-btn>
    </div>

    <v-sheet
        :elevation="2"
        min-height="700"
        width="100%"
        class="pa-6"
        border
        rounded
    >

        <v-table striped="even">
            <thead>
            <tr class="bg-indigo-darken-4">
                <th class="text-left font-weight-bold">
                    Nombre
                </th>
                <th class="text-left font-weight-bold">
                    Correo electrónico
                </th>
                <th class="text-left font-weight-bold">
                    Documento
                </th>
                <th class="text-left font-weight-bold">
                    Teléfono
                </th>
                <th class="text-left font-weight-bold">
                    Rol
                </th>
                <th class="text-left font-weight-bold">
                    Estado
                </th>
                <th class="text-left font-weight-bold">
                    Editar
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="usuario in usuarios"
                :key="usuario.id"
            >
                <td>{{ usuario.nombre }} {{ usuario.apellido }}</td>
                <td>{{ usuario.email }}</td>
                <td>{{ usuario.documento }}</td>
                <td>{{ usuario.telefono }}</td>
                <td>{{ usuario.rol_id.nombre }}</td>
                <td>
                    <div 
                        :class="usuario.activo ? 'bg-green-darken-1':'bg-red-darken-1'"
                        class="rounded-xl text-center cursor-pointer"
                        @click="SwitchUsuario(usuario.id)"
                    >
                        {{ usuario.activo ? 'Habilitado': 'Inhabilitado' }}
                    </div>
                </td>
                <td>
                    <v-btn 
                        :icon="mdiSquareEditOutline" 
                        class="text-orange-darken-1"
                        variant="text"
                        @click="mostrarModalActualizar(usuario.id)"
                    >
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </v-table>

        <v-dialog
            v-model="agregarModal"
            width="550px"
        >
        <v-card
            max-width="400"
            :prepend-icon="mdiContentSave"
            :title="actualizarUsuario ? 'Actualizar un usuario existente' : 'Agregar nuevo usuario'"
        >

            <v-card-text>

                <v-form @submit.prevent="submitHandledEvent()">
                    <v-text-field
                        v-model="nuevoUsuario.nombre"
                        :rules="rules.NameRules"
                        label="Nombre"
                    ></v-text-field>

                    <v-text-field 
                        v-model="nuevoUsuario.apellido" 
                        label="Apellido"
                        :rules="rules.NameRules"
                    ></v-text-field>
                    
                    <v-text-field 
                        v-model="nuevoUsuario.email" 
                        label="Correo electrónico"
                        :rules="rules.emailRules"
                    ></v-text-field>

                    <v-text-field 
                        v-model="nuevoUsuario.documento" 
                        label="N° de documento"
                        :rules="rules.documentoRules"
                    ></v-text-field>

                    <v-text-field 
                        v-model="nuevoUsuario.telefono" 
                        label="Teléfono"
                    ></v-text-field>

                    <v-text-field 
                        v-model="nuevoUsuario.contraseña" 
                        label="Contraseña"
                        type="password"
                        v-if="!actualizarUsuario"
                    ></v-text-field>

                    <v-select
                        clearable
                        label="Rol de Usuario"
                        v-model="nuevoUsuario.rol_id"
                        :items="roles"
                        item-value="id"
                        item-title="nombre"
                    ></v-select>

                    <div class="d-flex flex-column ga-2">
                        <v-btn 
                            class="mt-2 bg-indigo-darken-1" 
                            type="submit" 
                            :text="actualizarUsuario ? 'Actualizar' : 'Guardar'"
                            block
                            :loading="loading"
                        >
                        </v-btn>
                        <v-btn
                            class="ms-auto bg-blue-grey-lighten-4"
                            type="button"
                            text="Cerrar"
                            block
                            @click="cerrarModal()"
                        >
                        </v-btn>
                    </div>
                </v-form>

            </v-card-text>
        </v-card>
        </v-dialog>

    </v-sheet>
</template>

