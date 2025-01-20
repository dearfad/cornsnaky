<template>
  <div>
    quest
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
const user = useSupabaseUser()
</script>

<style>

</style>