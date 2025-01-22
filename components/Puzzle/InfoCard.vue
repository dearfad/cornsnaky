<template>
  <v-sheet>
    <v-btn block size="x-large" @click="refreshGroupInfo">刷新小队信息</v-btn>
    <v-sheet>
      主线分数：{{ stateStore.groupMainScore }} / 支线分数：{{
        stateStore.groupSideScore
      }}
    </v-sheet>
    <v-sheet>
      小队开始时间：{{ stateStore.groupStartTime }} / 最近主线得分时间：{{
        stateStore.groupScoreTime
      }}
    </v-sheet>
    <v-sheet v-if="stateStore.userIsLeader && !stateStore.groupIsSolving">
      <v-alert
        density="compact"
        type="warning"
        title="注意"
        variant="outlined"
        color="primary"
        text="小队队长点击开始答题后，计时开始！"
      />
      <v-btn block size="x-large" @click="startPuzzle">开始答题</v-btn>
    </v-sheet>
  </v-sheet>
</template>

<script setup>
const stateStore = useStateStore()
const supabase = useSupabaseClient()
async function refreshGroupInfo() {
  await stateStore.getGroupInfo()
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
