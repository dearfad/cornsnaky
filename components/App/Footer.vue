<template>
  <v-footer app>
    <ClientOnly>
      <v-sheet class="mx-auto text-caption">
        {{ new Date().getFullYear() }} - Ver 2025.0206.21.20 -
        <span class="font-weight-bold">{{
          stateStore.userName
            ? stateStore.userName + "@" + stateStore.userGroup
            : "访客"
        }}</span>
      </v-sheet>
    </ClientOnly>
  </v-footer>
</template>

<script setup>
const stateStore = useStateStore()
</script>
