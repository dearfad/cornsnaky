<template>
  <v-sheet class="d-flex flex-column">
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <PuzzleInfoCard />
        </v-col>
        <v-col cols="12" md="9">
          <PuzzleGuide />
        </v-col>
      </v-row>
    </v-container>
    <PuzzleContent />
  </v-sheet>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
})
// const stateStore = useStateStore()
</script>
