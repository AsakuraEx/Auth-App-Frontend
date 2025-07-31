import { defineStore } from "pinia";
import rolService from "@/services/rolService";
import { ref } from "vue";

export const useRolStore = defineStore('roles', ()=>{
    
    async function obtenerRoles(){

        try {
            const response = await rolService.obtenerRoles()
            if(response.status === 200){
                return response.data
            }
        }catch(e){
            return e
        }

    }

    async function obtenerRolPorId(id){

        try {
            const response = await rolService.obtenerRolPorId(id)
            if(response.status === 200){
                return response.data
            }
        }catch(e){
            console.error(e)
            return e
        }

    }

    async function obtenerPermisos(){

        try {
            const response = await rolService.obtenerPermisos()
            if(response.status === 200){
                return response.data
            }
        }catch(e){
            return e
        }

    }

    async function crearRoles(data){

        try {
            const response = await rolService.crearRoles(data)
            if(response.status === 201){
                return response
            }
        }catch(e){
            console.error(e)
            return e
        }

    }

    async function actualizarRol(data){
        try{
            const response = await rolService.actualizarRol(data);
            if(response.status === 201){
                return response
            }
        }catch(e){
            console.error(e)
            return e
        }
    }
    
    const mensaje = ref('')

    const enviarMensaje = (texto) => {
        mensaje.value = texto;
    }

    const limpiarMensaje = () => {
        mensaje.value = ''
    }

    return {
        obtenerRoles,
        obtenerRolPorId,
        obtenerPermisos,
        crearRoles,
        actualizarRol,
        mensaje,
        enviarMensaje,
        limpiarMensaje
    }
})