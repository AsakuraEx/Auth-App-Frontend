import { mdiAccount, mdiBulletinBoard, mdiCog } from "@mdi/js";

export const menu = [
    {
        nombre: "Usuarios",
        permisos: [1,2,3],
        icon: mdiAccount
    },
    {
        nombre: "Configuración",
        permisos: [4, 5],
        icon: mdiCog,
        submenus: [
            {
                nombre: "Roles",
                permisos: [4, 5],
                icon: mdiBulletinBoard
            },
            {
                nombre: "Permisos",
                permisos: [4, 5],
                icon: mdiBulletinBoard
            }
        ]
    }

]