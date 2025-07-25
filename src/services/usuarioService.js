import api from "@/lib/axios"

export default {

    obtenerUsuarios(){
        return api.get('/usuarios')
    },

    toggleEstadoUsuario(id){
        return api.patch(`/usuarios/estado/${id}`)
    }

}