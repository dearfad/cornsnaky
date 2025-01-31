<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(tip, n) in stateStore.puzzles[stateStore.puzzleCurrentId - 1]
        .tips"
      :key="n"
    >
      <v-expansion-panel-title>
        <v-btn :text="tip.price + '点购买'" @click="buyTip(n, tip.price)" />
        <v-sheet class="pl-4">{{ tip.title }}</v-sheet>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        {{ tip.content }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
const stateStore = useStateStore()

async function buyTip(n, price) {
  if (stateStore.groupCurrentPoints >= price) {
    await stateStore.buyTip(n, price)
  } else {
    stateStore.appInfo = "当前点数不足，无法购买！"
  }
}
</script>
