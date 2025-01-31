<template>
  <v-sheet
    v-if="stateStore.puzzles[stateStore.puzzleCurrentId - 1].audios"
    class="py-4"
  >
    <v-list>
      <v-list-item
        v-for="audio in stateStore.puzzles[stateStore.puzzleCurrentId - 1]
          .audios"
        :key="audio"
      >
        <audio style="width: 100%" :src="audio" controls /> </v-list-item
    ></v-list>
  </v-sheet>
</template>

<script setup>
const stateStore = useStateStore()
</script>
