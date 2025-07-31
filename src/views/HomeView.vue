<script setup>
import { jwtDecode } from 'jwt-decode';


const decoded = jwtDecode(localStorage.getItem('token'))

</script>

<template>


    <div class="pa-4">
        <p class="text-h4">Bienvenido de nuevo, {{decoded.nombre}} {{decoded.apellido}}</p>
    </div>

</template>
