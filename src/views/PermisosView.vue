<script setup>
import { useRolStore } from '@/stores/roles.store';
import { useToastStore } from '@/stores/toast.store';
import { onMounted, ref } from 'vue';

const rolStore = useRolStore()
const toastStore = useToastStore()
const permisos = ref([])

onMounted(async ()=>{
    const response = await rolStore.obtenerPermisos();

    if(!response){
        toastStore.MostrarError('No fue posible obtener los permisos')
        return
    }

    permisos.value = response
})

const transformarFecha = (date) => {

    const fechaUTC = new Date(date);

    // Ajusta a UTC-6 manualmente (El Salvador)
    fechaUTC.setHours(fechaUTC.getHours() - 6);

    const dia = String(fechaUTC.getDate()).padStart(2, '0');
    const mes = String(fechaUTC.getMonth() + 1).padStart(2, '0');
    const anio = fechaUTC.getFullYear();

    let horas = fechaUTC.getHours();
    const minutos = String(fechaUTC.getMinutes()).padStart(2, '0');
    const ampm = horas >= 12 ? 'P.M' : 'A.M';

    horas = horas % 12;
    horas = horas ? horas : 12; // 0 → 12

    const horaFormateada = `${dia}-${mes}-${anio} ${horas}:${minutos} ${ampm}`;

    return horaFormateada

}

</script>

<template>
    <div class="pa-4">
        <p class="text-h4 font-weight-bold">Catálogo de permisos</p>
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
                    Fecha creación:
                </th>
                <th class="text-left font-weight-bold">
                    Fecha actualización:
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="permiso in permisos"
                :key="permiso.id"
            >
                <td>{{ permiso.nombre }}</td>
                <td>{{ permiso.descripcion }}</td>
                <td>{{ transformarFecha(permiso.createdAt) }}</td>
                <td>{{ transformarFecha(permiso.updatedAt) }}</td>
            </tr>
            </tbody>
        </v-table>

    </v-sheet>

</template>
