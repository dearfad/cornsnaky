<template>
  <v-container class="pa-12">
    <v-row>
      <v-col cols="12" md="3" class="mx-auto">
        <v-text-field v-model="password" label="密码" variant="outlined"
      /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" class="mx-auto">
        <v-btn
          text="更新密码"
          block
          size="large"
          variant="flat"
          @click="changePassword"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const password = ref("")
const supabase = useSupabaseClient()
const stateStore = useStateStore()
async function changePassword() {
  const { error } = await supabase.auth.updateUser({ password: password.value })
  if (error) {
    stateStore.appInfo = error
  } else {
    stateStore.appInfo = "密码更新成功"
  }
}
</script>
