<script setup>
import { useRolStore } from '@/stores/roles.store';
import { useToastStore } from '@/stores/toast.store';
import { mdiEye, mdiPencil, mdiUpdate } from '@mdi/js';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const rolStore = useRolStore()
const toastStore = useToastStore()
const roles = ref([]);

const verDetalleRol = (id) => {

    router.push({name: 'detalleRoles', params: {id: id}})

}

onMounted(async ()=>{

    roles.value = await rolStore.obtenerRoles();

    if(rolStore.mensaje){
        await toastStore.MostrarConfirmacion(rolStore.mensaje)
        rolStore.limpiarMensaje()
    }

})

</script>

<template>
    <div class="pa-4">
        <p class="text-h4 font-weight-bold">Mantenimiento de roles</p>
    </div>

    <div class="pa-4 d-flex justify-end">
        <v-btn 
            variant="elevated" 
            color="indigo-darken-1"
            rounded="xl"
            elevation="4"
            :to="{name: 'rolesCreate'}"
        >
            Crear un nuevo rol
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
                    Nombre del rol
                </th>
                <th class="text-left font-weight-bold">
                    Descripción
                </th>
                <th class="text-left font-weight-bold">
                    Acciones
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="rol in roles"
                :key="rol.id"
            >
                <td>{{ rol.nombre }}</td>
                <td>{{ rol.descripcion }}</td>
                <td>
                    <v-btn 
                        :icon="mdiEye" 
                        class="text-blue-darken-1"
                        variant="text"
                        @click="verDetalleRol(rol.id)"
                    >
                    </v-btn>
                    <v-btn 
                        :icon="mdiPencil" 
                        class="text-orange-darken-1"
                        variant="text"
                        :to="{name: 'rolesUpdate', params: {id: rol.id}}"
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
