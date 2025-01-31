<template>
  <v-app>
    <AppBar />
    <AppNavDrawer />
    <AppFooter />
    <AppInfo />
    <!-- class="pt-12 pb-9" 去除上下抖动 -->
    <v-main class="pt-12 pb-9">
      <slot />
    </v-main>
  </v-app>
</template>
