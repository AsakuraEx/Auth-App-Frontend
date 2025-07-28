import usuarioService from "@/services/usuarioService";
import { defineStore } from "pinia";

export const useUsuarioStore = defineStore('usuarios', ()=>{
    
    async function obtenerUsuarios() {
        try{
            const usuarios = await usuarioService.obtenerUsuarios();

            if(usuarios.status === 200){
                return usuarios
            }

        }catch(e){
            return e
        }
    }

    async function toggleEstadoUsuario(id){
        try{

            return await usuarioService.toggleEstadoUsuario(id)

        }catch(e){
            return e
        }
    }

    async function agregarUsuario(data){
        try {
            const response = await usuarioService.agregarUsuario(data);
            if(response.status === 201){
                return response
            }
        }catch(e){
            console.log(e)
            return e
        }
    }
    
    return {
        obtenerUsuarios,
        toggleEstadoUsuario,
        agregarUsuario
    }
})