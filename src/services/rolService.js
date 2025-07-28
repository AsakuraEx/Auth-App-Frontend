import api from "@/lib/axios";

export default {
    obtenerRoles(){
        return api.get('/roles')
    }
}