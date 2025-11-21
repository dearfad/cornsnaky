// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/supabase",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      cryptoKey: "",
    },
  },
  nitro: {
    preset: "static",
  },
});
