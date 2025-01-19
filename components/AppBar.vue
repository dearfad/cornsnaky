<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="isNavDrawerShow = !isNavDrawerShow" />
    <v-app-bar-title class="font-weight-bold">Cornsnaky</v-app-bar-title>
    <v-spacer />
    <v-btn text to="/">首页</v-btn>
    <v-btn text to="/user">用户</v-btn>
    <v-btn text to="/quest">问题</v-btn>
  </v-app-bar>
</template>

<script setup>
const isNavDrawerShow = ref(false)
</script>