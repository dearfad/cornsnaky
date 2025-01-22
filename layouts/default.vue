<template>
  <v-app>
    <AppBar />
    <AppNavDrawer />
    <AppFooter />
    <AppInfo />
    <v-main class="pt-12 pb-9">
      <slot />
    </v-main>
  </v-app>
</template>
