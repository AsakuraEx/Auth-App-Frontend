import api from "@/lib/axios";

export default {
    obtenerRoles(){
        return api.get('/roles')
    },

    obtenerPermisos(){
        return api.get('/roles/permisos')
    },

    crearRoles(data){
        return api.post('/roles', data)
    },

    actualizarRol(data){
        return api.put('/roles', data)
    }
    
}