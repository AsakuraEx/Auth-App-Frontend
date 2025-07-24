<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useToastStore } from '@/stores/toast.store';
import { useRouter } from 'vue-router';
import { mdiChevronLeft, mdiLogout } from '@mdi/js';
import { useDisplay } from 'vuetify/lib/composables/display';
import { menu } from '@/common/menu-index';
import { jwtDecode } from 'jwt-decode';

const authStore = useAuthStore()
const toastStore = useToastStore()
const router = useRouter()

const errores = ref({})

const decoded = jwtDecode(localStorage.getItem('token'))
const menuOptions = ref(menu)
const informacionRol = ref({})

const { xlAndDown } = useDisplay()
const drawer = ref(true);
const rail = ref(true)

const grupoPermitido = computed(()=> {
    const arrayOptions = menuOptions.value.permisos
    console.log(arrayOptions)
    return true
})

const logoutEventHandler = async () => {
    const response = await authStore.CerrarSesion(localStorage.getItem('token'));

    if(response.response){
        errores.value = response.response.data;
        toastStore.MostrarError(errores.value.message)
        return
    }

    if(response.status === 200){
        localStorage.removeItem('token')
        localStorage.removeItem('expiracion')
        router.push({name: 'login'})
    }
}

drawer.value = xlAndDown.value;

watch(xlAndDown, (val)=>{
    drawer.value = val
})



onMounted(async ()=>{

    const {data} = await authStore.obtenerRolesyPermisos(decoded.rol_id)
    informacionRol.value = data;

    grupoPermitido()
})

</script>

<template>
    
    <v-app-bar title="Auth Application" class="text-center bg-indigo-darken-1"></v-app-bar>
    <v-navigation-drawer 
        v-model="drawer" 
        :width="300"
        :rail="rail"
        class="bg-indigo-darken-2"
        permanent
        @click="rail = false"
    >

        <v-list>
            <v-list-item 
                prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" 
                :title="decoded.nombre+ ' '+decoded.apellido" 
                :subtitle="informacionRol.nombre" 
            >
                <template v-slot:append>
                <v-btn
                    :icon="mdiChevronLeft"
                    variant="text"
                    @click.stop="rail = !rail"
                ></v-btn>
                </template>
            </v-list-item>
            
        </v-list>

        <v-divider></v-divider>

        <v-list v-for="option in menuOptions" nav>

            <v-list-item 
                link 
                :prepend-icon="option.icon" 
                :title="option.nombre"
                v-if="!option.submenus"
            >
            </v-list-item>

            <v-list-group 
                v-else 
                value="Config"
            >

                <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        :prepend-icon="option.icon"
                        :title="option.nombre"
                    ></v-list-item>
                </template>

                <v-list-item 
                    link
                    v-for="submenu in option.submenus" 
                    :prepend-icon="submenu.icon" 
                    :title="submenu.nombre"
                >
                </v-list-item>

            </v-list-group>
            
        </v-list>

        <template v-slot:append v-if="rail == false">
            <div class="pa-2">
                <v-btn 
                    variant="tonal" 
                    color="bg-indigo-lighten-2"
                    @click="logoutEventHandler"
                    block 
                >
                    <v-icon :icon="mdiLogout"></v-icon>
                    Logout
                </v-btn>                
            </div>
        </template>

    </v-navigation-drawer>

</template>


<style scoped>


</style>