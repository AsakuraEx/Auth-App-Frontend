import api from "@/lib/axios"

export default {

    obtenerUsuarios(){
        return api.get('/usuarios')
    },
    
    agregarUsuario(data){
        return api.post('/usuarios', data)
    },

    toggleEstadoUsuario(id){
        return api.patch(`/usuarios/estado/${id}`)
    }

}