<template>
  <v-sheet
    v-if="stateStore.puzzles[stateStore.puzzleCurrentId - 1].audio"
    class="py-4"
  >
    <audio
      style="width: 100%"
      :src="stateStore.puzzles[stateStore.puzzleCurrentId - 1].audio"
      controls
    />
  </v-sheet>
</template>

<script setup>
const stateStore = useStateStore()
</script>
