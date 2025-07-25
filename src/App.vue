<script setup>
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Header from './components/Header.vue';

const route = useRoute();
const login = ref(false)

watch(()=>route.name, (path)=>{
  if(path === 'login'){
    login.value = true
  }else{
    login.value = false
  }
})


</script>

<template>

  <v-app>
    
    <Header v-if="!login"/>

    <v-main class="d-flex justify-center bg-grey-lighten-5">

      <v-container>

        <RouterView />
        
      </v-container>
      
    </v-main>

  </v-app>


</template>

<style scoped>

</style>
