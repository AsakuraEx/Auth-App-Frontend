export const rules = {
    NameRules: [
        value => !!value || 'El campo es requerido',
        value =>  (value && value.length >= 3) || 'Debe agregar al menos 3 caracteres',
        value => (value && value.length <= 50) || 'El máximo de caracteres permitidos es de 50'
    ],
    emailRules: [
        value => !!value || 'El campo es requerido',
        value => {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            if(!regex.test(value)) {
                return 'Debe ingresar un correo electrónico valido'
            }
        }
    ],
    documentoRules: [
        value => !!value || 'El campo es requerido'
    ]
}