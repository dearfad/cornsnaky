<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(tip, i) in stateStore.puzzles[stateStore.puzzleCurrentId - 1]
        .tips"
      :key="i"
    >
      <v-expansion-panel-title>
        <v-btn :text="'购买提示费用' + tip.price" />
        <v-sheet class="pl-4">{{ tip.title }}</v-sheet>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </v-expansion-panel-text>
    </v-expansion-panel>
    {{ stateStore.puzzles[stateStore.puzzleCurrentId - 1].tips }}
  </v-expansion-panels>
</template>

<script setup>
const stateStore = useStateStore()
</script>
