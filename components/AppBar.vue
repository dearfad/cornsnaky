<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="isNavDrawerShow = !isNavDrawerShow" />
    <v-app-bar-title class="font-weight-bold">Cornsnaky</v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
const isNavDrawerShow = ref(false)
</script>