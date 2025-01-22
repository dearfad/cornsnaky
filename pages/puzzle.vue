<template>
  <v-sheet class="d-flex flex-column">
    <PuzzleInfoCard />
    <PuzzleContent />
  </v-sheet>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
})
// const stateStore = useStateStore()
</script>
