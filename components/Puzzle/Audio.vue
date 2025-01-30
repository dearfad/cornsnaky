<template>
  <v-sheet v-if="stateStore.puzzles[stateStore.puzzleCurrentId - 1].audio">
    <audio
      :src="stateStore.puzzles[stateStore.puzzleCurrentId - 1].audio"
      controls
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
    />
  </v-sheet>
</template>

<script setup>
const stateStore = useStateStore()
</script>
