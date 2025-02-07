<template>
  <v-container>
    <ClientOnly>
      <v-row>
        <v-col />
        <v-col cols="12" md="10" class="text-center text-h4 font-weight-bold">
          2025.2.9 完赛排行
        </v-col>
        <v-col />
      </v-row>
      <v-row>
        <v-col />
        <v-col cols="12" md="10" class="text-center text-h4 font-weight-bold">
          <v-text-field
            v-model="search"
            label="获奖证书校验请填入编号后4位不加前0"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
          />
        </v-col>
        <v-col />
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            items-per-page="-1"
            items-per-page-text="每页显示数量"
            hide-no-data
            multi-sort
            :search="search"
          />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-btn
            block
            size="x-large"
            class="font-weight-bold"
            text="读取排名"
            :loading="isLoading"
            @click="loadGroup"
          />
        </v-col>
      </v-row>
    </ClientOnly>
  </v-container>
</template>

<script setup>
const stateStore = useStateStore()
const supabase = useSupabaseClient()
const search = ref("")
const items = ref([])
const isLoading = ref(false)
const headers = ref([
  { title: "排名", key: "rank", width: "80px" },
  { title: "组名", key: "name", width: "200px" },
  { title: "主线进度", key: "mainscore", width: "100px" },
  { title: "支线进度", key: "sidescore", width: "100px" },
  { title: "ID", key: "id", width: "80px" },
  { title: "完成时间", key: "scoretime", width: "150px" },
  { title: "耗时", key: "costtime", width: "100px" },
  { title: "队长", key: "leader", width: "80px" },
  { title: "人数", key: "number", width: "80px" },
  { title: "成员", key: "members", width: "200px" },
])
const selected = ref()

async function loadGroup() {
  console.log("meta.env: ", import.meta.env.VITE_CRYPTO_KEY)
  console.log("process.env: ", process.env.VITE_CRYPTO_KEY)
  isLoading.value = true
  const { data, error } = await supabase
    .from("groups_202502061655")
    .select("*")
    .order("mainscore", { ascending: false })
    .order("scoretime", { ascending: true })
  if (error) {
    stateStore.appInfo = error
  } else {
    data.forEach((item, index) => {
      item.rank = index
      item.scoretime = item.scoretime
        ? stateStore.getBeijingTime(item.scoretime)
        : null
      if (item.scoretime && item.starttime) {
        const costTime = new Date(item.scoretime) - new Date(item.starttime)
        // 计算小时、分钟和秒
        const totalSeconds = Math.floor(costTime / 1000)
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60
        // 格式化输出
        item.costtime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      }
    })
    items.value = data
    const { data: members, error: memberError } = await supabase
      .from("users_20250207")
      .select("name, group, isleader")
    if (memberError) {
      stateStore.appInfo = memberError
    } else {
      const groupMap = new Map(items.value.map((item) => [item.name, item]))
      members.forEach((member) => {
        const group = groupMap.get(member.group)
        if (group) {
          if (!group.members) {
            group.members = ""
            group.number = 0
          }
          group.members += member.name + "⭐"
          group.number += 1
          if (member.isleader) {
            group.leader = member.name ? member.name : "null"
          }
        }
      })
    }
  }
  isLoading.value = false
}
</script>
