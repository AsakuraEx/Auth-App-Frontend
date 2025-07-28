import { defineStore } from "pinia";
import rolService from "@/services/rolService";

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
    
    return {
        obtenerRoles
    }
})