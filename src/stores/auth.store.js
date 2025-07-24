import { defineStore } from "pinia";
import authService from "@/services/authService";

export const useAuthStore = defineStore('auth', ()=>{
    
    async function IniciarSesion(email, password){

        if(!email){
            return
        }

        if(!password){
            return
        }

        try {
            const response = await authService.iniciarSesion(email, password)
            if(response.status === 201){
                return response.data;
            }

        }catch(e){
            return e
        }

    }

    async function CerrarSesion(token){

        if(!token) {
            return 
        }

        try {
            const response = await authService.cerrarSesion(token);
            if(response.status === 200){
                return response
            }

        }catch(e){
            return e
        }

    }

    async function obtenerRolesyPermisos(rol_id){

        if(!rol_id){
            return
        }

        try {

            const response = await authService.obtenerRolesyPermisos(rol_id)
            if(response.status === 200){
                return response
            }

        }catch(e){
            return e
        }

    }
    
    return { IniciarSesion, CerrarSesion, obtenerRolesyPermisos }
})