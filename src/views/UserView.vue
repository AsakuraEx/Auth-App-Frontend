<script setup>
import { mdiContentSave, mdiSquareEditOutline, mdiTrashCan, mdiUpdate } from '@mdi/js';
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from '@/stores/usuarios.store';

    const usuarioStore = useUsuarioStore()

    const usuarios = ref([]);

    const isModalOpen = ref(false)

    const SwitchUsuario = async (id) => {
        const response = await usuarioStore.toggleEstadoUsuario(id)
        usuarios.value = response.data
    }

    onMounted(async ()=>{

        const response = await usuarioStore.obtenerUsuarios();

        console.log(response)

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

    })



</script>

<template>
    <div class="pa-4">
        <p class="text-h4">Usuarios registrados en el sistema</p>
    </div>

    <div class="pa-4 d-flex justify-end">
        <v-btn 
            variant="elevated" 
            color="indigo-darken-1"
            rounded="xl"
            elevation="4"
            @click="isModalOpen = true"
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
                    Acción
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
                    >
                    </v-btn>
                    <v-btn 
                        :icon="mdiTrashCan" 
                        class="text-red-darken-1"
                        variant="text"
                    >
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </v-table>

        <v-dialog
            v-model="isModalOpen"
            width="auto"
        >
        <v-card
            max-width="400"
            :prepend-icon="mdiContentSave"
            title="Agregar nuevo usuario"
        >

            <v-card-text>
                Formulario de ingreso de usuario
            </v-card-text>

            <template v-slot:actions>
            <v-btn
                class="ms-auto"
                text="Cerrar"
                @click="isModalOpen = false"
            ></v-btn>
            </template>
        </v-card>
        </v-dialog>

    </v-sheet>
</template>

