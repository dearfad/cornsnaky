<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <PuzzleInfoCard />
      </v-col>
      <v-col v-if="stateStore.groupStartTime ? true : false" cols="12" md="9">
        <PuzzleSelector />
        <PuzzleContent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
})
const stateStore = useStateStore()
</script>
