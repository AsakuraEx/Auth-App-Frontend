<script setup>
import { ref, watch } from 'vue';
import { mdiAccount, mdiBulletinBoard, mdiCard, mdiChevronLeft, mdiCog, mdiLogout } from '@mdi/js';
import { useDisplay } from 'vuetify/lib/composables/display';

const { xlAndDown } = useDisplay()
const drawer = ref(true);
const rail = ref(true)

drawer.value = xlAndDown.value;


watch(xlAndDown, (val)=>{
    drawer.value = val
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
        <v-list nav>

            <v-list-item 
                prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" 
                title="Francisco Escobar" 
                subtitle="Administrador" 
            >
                <template v-slot:append>
                <v-btn
                    :icon="mdiChevronLeft"
                    variant="text"
                    @click.stop="rail = !rail"
                ></v-btn>
                </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item 
                link 
                :prepend-icon="mdiAccount" 
                title="Usuarios"
            >
            </v-list-item>

            <v-list-group value="Config">

                <template v-slot:activator="{ props }">
                    <v-list-item
                        v-bind="props"
                        :prepend-icon="mdiCog"
                        title="Configuración"
                    ></v-list-item>
                </template>

                <v-list-item 
                    link 
                    :prepend-icon="mdiBulletinBoard" 
                    title="Roles"
                >
                </v-list-item>

                <v-list-item 
                    link 
                    :prepend-icon="mdiBulletinBoard" 
                    title="Permisos"
                >
                </v-list-item>

            </v-list-group>
            
        </v-list>

        <template v-slot:append v-if="rail == false">
            <div class="pa-2">
                <v-btn variant="tonal" block color="bg-indigo-lighten-2">
                    <v-icon :icon="mdiLogout"></v-icon>
                    Logout
                </v-btn>                
            </div>
        </template>

    </v-navigation-drawer>

</template>


<style scoped>


</style>