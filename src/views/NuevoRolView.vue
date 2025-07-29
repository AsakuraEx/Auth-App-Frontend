<script setup>
import { onMounted, reactive, ref } from 'vue';
import { rules } from '@/common/rules-form';
import { useRolStore } from '@/stores/roles.store';
import { useToastStore } from '@/stores/toast.store';
import { useRouter } from 'vue-router';

const router = useRouter()
const rolStore = useRolStore()
const toastStore = useToastStore()
const nuevoRol = reactive({
    nombre: '',
    descripcion: '',
    permisos: []
})

const permisos = ref([])

const submitHandledEvent = async () => {

    if(nuevoRol.permisos.length === 0){
        toastStore.MostrarError('Debe agregar al menos un permiso al rol')
    }

    try{
        await rolStore.crearRoles(nuevoRol);
        toastStore.MostrarConfirmacion('El rol se ha creado con exito');
        setTimeout(()=>{
            router.push({name: 'roles'})
        }, 300)
    }catch(e) {
        toastStore.MostrarError('Ocurrio un error al guardar el rol: ' + e);
        console.error(e) 
    }
    

}

onMounted(async ()=>{

    permisos.value = await rolStore.obtenerPermisos()

})

</script>

<template>
    <div class="pa-4">
        <p class="text-h4 font-weight-bold">Agregar un nuevo rol</p>
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
                v-model="nuevoRol.nombre"
                :rules="rules.NameRules"
                label="Nombre del rol"
            ></v-text-field>

            <v-text-field 
                v-model="nuevoRol.descripcion" 
                label="Descripción del rol"
                :rules="rules.DescriptionRules"
            ></v-text-field>


            <p class="text-h5 text-weight-medium mt-4">Permisos disponibles para asignar:</p>

            <v-container class="d-flex flex-sm-wrap" fluid>
                <v-checkbox
                    class="pa-2"
                    v-for="permiso in permisos"
                    v-model="nuevoRol.permisos"
                    :label="permiso.nombre"
                    :value="permiso"
                ></v-checkbox>                 
            </v-container>

            <div class="d-flex-inline flex-column ga-2">
                <v-btn 
                    class="mt-2 bg-indigo-darken-1 rounded-xl" 
                    type="submit" 
                    text="Guardar"
                >
                </v-btn>
            </div>
        </v-form>
    </v-sheet>

    <div class="mt-4 d-flex justify-end">
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
</template>


