import { defineStore } from "pinia";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export const useToastStore = defineStore('toast', ()=>{

    function MostrarConfirmacion (mensaje) {
        toast(mensaje, {
            autoClose: 3000,
            theme: 'colored',
            type: 'success'
        });
    }

    function MostrarError (mensaje) {
        toast(mensaje, {
            autoClose: 3000,
            theme: 'colored',
            type: 'error'
        });
    }

    function MostrarInformacion (mensaje) {
        toast(mensaje, {
            autoClose: 3000,
            theme: 'colored',
            type: 'info'
        });
    }

    return {
        MostrarConfirmacion,
        MostrarError,
        MostrarInformacion
    }

})