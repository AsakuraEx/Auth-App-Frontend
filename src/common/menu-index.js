import { mdiAccount, mdiBulletinBoard, mdiCog, mdiHome } from "@mdi/js";

export const menu = [
    {
        nombre: "Inicio",
        permisos: [1,2,3,4,5],
        icon: mdiHome,
        route: { name: 'home' }
    },
    {
        nombre: "Usuarios",
        permisos: [1,2,3],
        icon: mdiAccount,
        route: { name: 'usuarios' }
    },
    {
        nombre: "Configuración",
        permisos: [4, 5],
        icon: mdiCog,
        submenus: [
            {
                nombre: "Roles",
                permisos: [4, 5],
                icon: mdiBulletinBoard,
                route: { name: 'roles' }
            },
            {
                nombre: "Permisos",
                permisos: [4, 5],
                icon: mdiBulletinBoard,
                route: { name: 'permisos' }
            }
        ]
    }

]