<template>
  <v-sheet class="d-flex flex-column">
    <ClientOnly>
      <v-text-field v-model="content" />
      <div>
        {{ ciphertext }}
      </div>
      <div>
        {{ bytes }}
      </div>
    </ClientOnly>
  </v-sheet>
</template>

<script setup>
import CryptoJS from "crypto-js"
const content = ref("")

// Encrypt
const ciphertext = computed(() => {
  return CryptoJS.AES.encrypt(
    content.value,
    import.meta.env.VITE_CRYPTO_KEY
  ).toString()
})

// Decrypt
const bytes = computed(() => {
  return CryptoJS.AES.decrypt(
    ciphertext.value,
    import.meta.env.VITE_CRYPTO_KEY
  ).toString(CryptoJS.enc.Utf8)
})
</script>
