<script setup>
import { mdiChevronDown, mdiChevronUp, mdiCircle } from '@mdi/js';
import { onMounted, ref } from 'vue';

const show = ref(false)


</script>

<template>


    <h1>Historial de Actualizaciones</h1>

    <v-card 
        variant="tonal"
    >

        <v-card-title>
            Cambios realizados en el sistema
        </v-card-title>

        <v-card-subtitle>
            Última actualización: 23/07/2025
        </v-card-subtitle>

        <v-card-actions>
            
        <v-spacer></v-spacer>
        <v-btn
            :icon="show ? mdiChevronUp : mdiChevronDown"
            @click="show = !show"
        ></v-btn>

        </v-card-actions>

        <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
                Se inició el desarrollo de un backend en NestJS para realizar el ejercicio de un Login con autenticación de tokens, gestión de usuarios, roles y permisos

                <v-list>
                    <v-list-item 
                        :prepend-icon="mdiCircle" 
                        class="text-blue-darken-4" 
                        title="Se agrega el módulo usuarios con las funciones: crear, actualizar, listar y activar ó desactivar."
                        subtitle="21/07/2025"
                    >
                    </v-list-item>
                    <v-list-item 
                        :prepend-icon="mdiCircle" 
                        class="text-blue-darken-4" 
                        title="Se agrega el módulo Roles con las funciones: crear, listar."
                        subtitle="21/07/2025"
                    >
                    </v-list-item>
                    <v-list-item 
                        :prepend-icon="mdiCircle" 
                        class="text-blue-darken-4" 
                        title="Se agrega el módulo Permisos con las funciones: listar, estos deben crearse desde base."
                        subtitle="21/07/2025"
                    >
                    </v-list-item>
                </v-list>
            </v-card-text>
        </div>
        </v-expand-transition>
    </v-card>

</template>
