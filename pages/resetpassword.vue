<template>
  <v-container class="pa-12">
    <v-row>
      <v-col cols="12" md="3" class="mx-auto">
        <v-text-field v-model="email" label="邮箱" variant="outlined"
      /></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" class="mx-auto">
        <v-btn
          text="发送重置密码链接"
          block
          size="large"
          variant="outlined"
          @click="resetPassword"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const email = ref("")
const supabase = useSupabaseClient()
const stateStore = useStateStore()
async function resetPassword() {
  const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: "https://cornsnaky.dearfad.com/changepassword",
  })
  if (error) {
    stateStore.appInfo = error
  } else {
    stateStore.appInfo = "重置密码链接已发送到您的邮箱"
  }
}
</script>
