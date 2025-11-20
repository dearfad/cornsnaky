<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(tip, n) in stateStore.puzzles[stateStore.puzzleCurrentId - 1]
        .tips"
      :key="n"
    >
      <v-expansion-panel-title>
        <v-dialog width="auto">
          <template #activator="{ props: activatorTips }">
            <v-btn
              :text="tip.price + '点购买'"
              :disabled="
                stateStore.groupOpenTips[stateStore.puzzleCurrentId - 1][n] ===
                1
                  ? true
                  : false
              "
              v-bind="activatorTips"
              :loading="isTipBuying"
            />
          </template>
          <template #default="{ isActive }">
            <v-card>
              <v-card-title>
                <span class="text-h5 font-weight-bold">提示</span>
              </v-card-title>
              <v-card-text>
                确定花费{{ tip.price }}点数购买提示么？
              </v-card-text>
              <template #actions>
                <v-spacer />
                <v-btn text="取消" @click="isActive.value = false" />
                <v-btn
                  text="确认"
                  @click=";(isActive.value = false), buyTip(n, tip.price)"
                />
              </template>
            </v-card>
          </template>
        </v-dialog>
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
const isTipBuying = ref(false)

async function buyTip(n, price) {
  isTipBuying.value = true
  if (stateStore.groupCurrentPoints >= price) {
    await stateStore.buyTip(n, price)
  } else {
    stateStore.appInfo = "当前点数不足，无法购买！"
  }
  isTipBuying.value = false
}
</script>
