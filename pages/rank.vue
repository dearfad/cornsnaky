<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="6">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          items-per-page-text="每页显示数量"
          hide-no-data
        />
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="6">
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
const supabase = useSupabaseClient()
const snackBar = ref(false)
const snackBarText = ref("")
const items = ref([])
const isLoading = ref(false)
const headers = ref([
  { title: "排名", key: "rank" },
  { title: "组名", key: "name" },
  { title: "积分", key: "mainscore" },
  { title: "小分", key: "sidescore" },
])
const selected = ref()

async function loadGroup() {
  isLoading.value = true
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .order("mainscore", { ascending: false })
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  }
  data.forEach((item, index) => {
    item.rank = index + 1
  })
  items.value = data
  isLoading.value = false
}
</script>

<style></style>
