<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const toastStore = useToastStore()
const router = useRouter()
const credenciales = reactive({
    email: '',
    contraseña: ''
})

const errores = ref({})

const SubmitHandledEvent = async () => {

    if(Object.values(credenciales).includes('')){
        toastStore.MostrarError('Todos los campos son requeridos para iniciar sesión')
        return
    }

    const response = await authStore.IniciarSesion(credenciales.email, credenciales.contraseña);

    if(response){

        // Respuesta exitosa
        if(response.token){
            localStorage.setItem('token', response.token)
            localStorage.setItem('expiracion', response.expiracion)
            router.push({name: 'home'})
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

}

</script>

<template>
    
    <section class="d-flex align-center">
        <v-sheet class="mx-auto bg-indigo-lighten-5 pa-5 rounded" width="450">
            <h1 class="text-center py-4">Inicio de Sesión</h1> 
                 
            <v-form @submit.prevent="SubmitHandledEvent">
    
                <v-text-field
                    v-model="credenciales.email"
                    label="Correo Electrónico"
                ></v-text-field>
    
                <v-text-field
                    v-model="credenciales.contraseña"
                    label="Contraseña"
                    type="password"
                    hint="Ingresa tu contraseña para acceder al sitio"
                ></v-text-field>
    
                <v-btn 
                    class="mt-2 bg-indigo-darken-2" 
                    type="submit" 
                    block
                >
                    Iniciar Sesión
                </v-btn>
                
                
            </v-form>   
        </v-sheet>
    </section>

</template>

<style scoped>
    
    section {
        min-height: 90vh;
    }

</style>
