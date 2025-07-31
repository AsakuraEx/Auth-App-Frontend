<script setup>
import { useAuthStore } from '@/stores/auth.store';
import { useRolStore } from '@/stores/roles.store';
import { useToastStore } from '@/stores/toast.store';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { rules } from '@/common/rules-form';

const route = useRoute()
const router = useRouter()
const rolStore = useRolStore()
const authStore = useAuthStore()
const toastStore = useToastStore()
const rol = ref({});
const permisos = ref([])

onMounted(async ()=>{

    const { data }= await authStore.obtenerRolesyPermisos(route.params.id)
    if(!data){
        toastStore.MostrarError('No fue posible obtener la información del rol')
    }
    rol.value = data
    permisos.value = await rolStore.obtenerPermisos()

})

const submitHandledEvent = async () => {

    if(rol.value.permisos.length === 0){
        toastStore.MostrarError('Debe agregar al menos un permiso al rol')
        return
    }

    if(rol.value.nombre === ''){
        toastStore.MostrarError('El nombre es requerido.')
        return
    }

    try{
        await rolStore.actualizarRol(rol.value);
        rolStore.enviarMensaje('El rol se ha actualizado con exito')
        router.push({name: 'roles'})
    
    }catch(e) {
        toastStore.MostrarError('Ocurrio un error al guardar el rol: ' + e);
        console.error(e) 
    }

}


</script>

<template>
    <div class="pa-4">
        <p class="text-h4 font-weight-bold">Actualización del rol: {{ rol.nombre }}</p>
    </div>

    <div class="pa-4 d-flex justify-end">
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

    <v-sheet
        :elevation="2"
        min-height="700"
        width="100%"
        class="pa-6"
        border
        rounded
    >

        <v-form @submit.prevent="submitHandledEvent()">
            <v-text-field
                v-model="rol.nombre"
                :rules="rules.NameRules"
                label="Nombre del rol"
            ></v-text-field>

            <v-text-field 
                v-model="rol.descripcion"
                label="Descripción del rol"
                :rules="rules.DescriptionRules"
            ></v-text-field>


            <p class="text-h5 text-weight-medium mt-4">Permisos disponibles para asignar:</p>

            <v-container class="d-flex flex-sm-wrap" fluid>
                <v-checkbox
                    class="pa-2"
                    v-model="rol.permisos"
                    v-for="permiso in permisos"
                    :label="permiso.nombre"
                    :value="permiso"
                ></v-checkbox>                 
            </v-container>

            <div class="d-flex-inline flex-column ga-2">
                <v-btn 
                    class="mt-2 bg-indigo-darken-1 rounded-xl" 
                    type="submit" 
                    text="Actualizar"
                >
                </v-btn>
            </div>
        </v-form>

    </v-sheet>

</template>