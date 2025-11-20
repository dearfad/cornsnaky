<template>
  <v-snackbar v-model="snackbar" :timeout="timeout">
    {{ stateStore.appInfo }}
    <template #actions>
      <v-btn variant="text" @click="snackbarClose"> 关闭 </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
const snackbar = ref(false)
const timeout = ref(2000)
const stateStore = useStateStore()
const appInfoWatcher = watch(
  () => stateStore.appInfo,
  () => {
    if (stateStore.appInfo) {
      snackbar.value = true
    }
  }
)

// 设置timeout时间，关闭后自动清除信息
watch(snackbar, () => {
  if (!snackbar.value) {
    appInfoWatcher.pause()
    stateStore.appInfo = ""
    appInfoWatcher.resume()
  }
})

function snackbarClose() {
  snackbar.value = false
}
</script>
