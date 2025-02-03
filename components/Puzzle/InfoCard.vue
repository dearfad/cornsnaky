<template>
  <v-sheet class="pa-4" :elevation="2">
    <v-sheet class="my-2">答题队员：{{ stateStore.userName }}</v-sheet>
    <v-sheet class="my-2">所属小队：{{ stateStore.groupName }}</v-sheet>
    <v-sheet class="my-2">开始时间：{{ stateStore.groupStartTime }}</v-sheet>
    <v-sheet class="my-2">
      当前分数：{{ stateStore.groupMainScore }} /
      {{ stateStore.groupSideScore }}
    </v-sheet>
    <v-sheet class="my-2">得分时间：{{ stateStore.groupScoreTime }}</v-sheet>
    <v-sheet class="my-2">已用点数：{{ stateStore.groupUsedPoints }}</v-sheet>
    <v-sheet class="my-2"
      >当前点数：{{ stateStore.groupCurrentPoints }}</v-sheet
    >
    <v-btn
      block
      size="default"
      variant="outlined"
      class="mt-4"
      :loading="isRefreshing"
      @click="refreshGroupInfo"
    >
      刷新小队信息
    </v-btn>
    <v-sheet v-if="stateStore.userIsLeader && !stateStore.groupIsSolving">
      <v-alert
        density="compact"
        type="warning"
        title="队长注意"
        variant="outlined"
        color="primary"
        text="请通知所有队员后点击开始答题！"
        class="my-4"
      />
      <v-btn v-if="false" block size="x-large" class="my-2" @click="startPuzzle"
        ><span class="font-weight-bold">开始答题</span></v-btn
      >
    </v-sheet>
  </v-sheet>
</template>

<script setup>
const supabase = useSupabaseClient()
const stateStore = useStateStore()
const isRefreshing = ref(false)

onMounted(async () => {
  if (!stateStore.groupName) {
    await stateStore.getGroupInfo()
  }
})

async function refreshGroupInfo() {
  isRefreshing.value = true
  await stateStore.getGroupInfo()
  isRefreshing.value = false
}

async function startPuzzle() {
  const { error } = await supabase
    .from("groups")
    .update({ starttime: new Date() })
    .eq("name", stateStore.groupName)
  if (error) {
    stateStore.appInfo = error
  } else {
    await stateStore.getGroupInfo()
    stateStore.appInfo = "小队答题开始"
  }
}
</script>
