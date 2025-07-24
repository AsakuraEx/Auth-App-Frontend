import api from "@/lib/axios"

export default  {

    iniciarSesion (email, password) {
        return api.post(`/sesiones`, {email: email, contraseña: password})
    },

    cerrarSesion (token) {
        return api.delete(`/sesiones`, {data: {token}})
    },

    obtenerRolesyPermisos (rol_id) {
        return api.get(`/roles/permisos/config/${rol_id}`)
    }

}