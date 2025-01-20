<template>
  <v-app-bar flat density="compact">
    <v-app-bar-nav-icon
      @click="stateStore.isNavDrawerShow = !stateStore.isNavDrawerShow"
    />
    <v-app-bar-title
      class="font-weight-bold cursor-pointer"
      @click="router.push('/')"
      >Cornsnaky</v-app-bar-title
    >
  </v-app-bar>
</template>

<script setup>
const stateStore = useStateStore()
const router = useRouter()
</script>
