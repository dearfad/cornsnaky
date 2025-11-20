<template>
  <v-sheet v-if="stateStore.puzzles[stateStore.puzzleCurrentId - 1].file">
    <v-btn
      text="下载附加文件"
      class="font-weight-bold my-4"
      size="large"
      block
      @click="getPuzzleFile"
    />
  </v-sheet>
</template>

<script setup>
const stateStore = useStateStore()
function getPuzzleFile() {
  window.open(stateStore.puzzles[stateStore.puzzleCurrentId - 1].file, "_blank")
}
</script>
