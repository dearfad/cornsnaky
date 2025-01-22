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
async function resetPassword() {
  await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: "https://cornsnaky.dearfad.com/changepassword",
  })
}
</script>
