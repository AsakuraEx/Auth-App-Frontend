<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { useRolStore } from '@/stores/roles.store';
import { mdiInformation } from '@mdi/js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const rolStore = useRolStore()
const authStore = useAuthStore()
const route = useRoute()
const { id } = route.params
const rolDetallado = ref({})

onMounted(async ()=>{
    const {data} = await authStore.obtenerRolesyPermisos(id)
    rolDetallado.value = data
})

</script>

<template>
    
    <div class="mt-4 d-flex justify-space-between pa-4">
        <p class="text-h4 font-weight-bold">
            {{ rolDetallado.nombre }}
        </p>
   
        <v-btn 
            variant="elevated" 
            color="indigo-darken-1"
            rounded="xl"
            elevation="4"
            :to="{name: 'roles'}"
        >
            Regresar
        </v-btn>
    </div>

    <div class="mt-2 pa-4" v-if="rolDetallado.permisos?.length > 0 || rolDetallado.descripcion">
        <v-alert 
            class="text-indigo-darken-1 bg-blue-lighten-5 rounded-2"
            :icon="mdiInformation" 
            :title="rolDetallado.descripcion? 'Descripción' : 'Información'" 
            :text="rolDetallado.descripcion? rolDetallado.descripcion : 'No se ha proporcionado una descripción sobre el rol'"
        ></v-alert>

    </div>

    <div class="pa-4" v-if="(rolDetallado.permisos?.length > 0)">
        <v-table striped="even">
            <thead>
            <tr class="bg-indigo-darken-1">
                <th class="text-left font-weight-bold">
                    No.
                </th>
                <th class="text-left font-weight-bold">
                    Permiso
                </th>
                <th class="text-left font-weight-bold">
                    Descripción del permiso
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(permiso, index) in rolDetallado.permisos"
                :key="permiso.id"
            >
                <td>{{ index + 1 }}</td>
                <td>{{ permiso.nombre }}</td>
                <td>{{ permiso.descripcion }}</td>
            </tr>
            </tbody>
        </v-table>
    </div>

    <v-alert 
        v-if="!rolDetallado.descripcion && rolDetallado.permisos?.length === 0"
        class="text-red-darken-1 bg-red-lighten-5 rounded-2"
        :icon="mdiInformation" 
        title="Atención" 
        text="No hay información que mostrar acerca del rol, se creo vacío"
    ></v-alert>

    <div class="pa-4" v-if="rolDetallado.descripcion && rolDetallado.permisos?.length === 0">
        <v-alert 
            class="text-red-darken-1 bg-red-lighten-5 rounded-2"
            :icon="mdiInformation" 
            title="Atención" 
            text="El rol no posee ningun permiso"
        ></v-alert>
    </div>

</template>

