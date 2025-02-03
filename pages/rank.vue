<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          items-per-page="-1"
          items-per-page-text="每页显示数量"
          hide-no-data
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
    <v-snackbar v-model="snackBar" timeout="2000"
      ><div class="text-center">{{ snackBarText }}</div></v-snackbar
    >
  </v-container>
</template>

<script setup>
const stateStore = useStateStore()
const supabase = useSupabaseClient()
const snackBar = ref(false)
const snackBarText = ref("")
const items = ref([])
const isLoading = ref(false)
const headers = ref([
  { title: "排名", key: "rank" },
  { title: "组名", key: "name" },
  { title: "主线进度", key: "mainscore" },
  { title: "支线进度", key: "sidescore" },
  { title: "完成时间", key: "scoretime" },
  { title: "队长", key: "leader" },
  { title: "成员", key: "members" },
])
const selected = ref()

async function loadGroup() {
  isLoading.value = true
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .order("mainscore", { ascending: false })
    .order("sidescore", { ascending: false })
    .order("scoretime", { ascending: true })
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  } else {
    data.forEach((item, index) => {
      item.rank = index + 1
    })
    items.value = data
    const { data: members, error: memberError } = await supabase
      .from("users")
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
          }
          group.members += member.name + " "
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
