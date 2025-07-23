<script setup>
import { reactive } from 'vue';

const credenciales = reactive({
    email: '',
    contraseña: ''
})

const SubmitHandledEvent = () => {
    console.log(credenciales)
}

</script>

<template>
    
    <v-sheet class="mx-auto bg-indigo-lighten-5 pa-5 rounded mt-8" width="450">
        <h1 class="text-center py-4">Inicio de Sesión</h1>       
        <v-form @submit.prevent="SubmitHandledEvent">

            <v-text-field
                v-model="credenciales.email"
                :rules="rules"
                label="Correo Electrónico"
            ></v-text-field>

            <v-text-field
                v-model="credenciales.contraseña"
                :rules="rules"
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

</template>

<style>
    
</style>
