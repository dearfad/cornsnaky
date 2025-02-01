<template>
  <v-container class="pa-12">
    <ClientOnly>
      <v-row>
        <v-col cols="12" md="3" class="mx-auto">
          <v-text-field
            v-model="email"
            label="邮箱"
            variant="outlined"
            :disabled="stateStore.userId ? true : false"
        /></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="mx-auto">
          <v-text-field
            v-model="password"
            label="密码"
            type="password"
            variant="outlined"
            :disabled="stateStore.userId ? true : false"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="mx-auto">
          <v-btn
            size="large"
            block
            :disabled="stateStore.userId ? true : false"
            :loading="isLogging"
            @click="signInWithPassword"
            >登录</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="mx-auto">
          <v-btn
            size="large"
            block
            to="/resetpassword"
            :disabled="stateStore.userId ? true : false"
            >忘记密码</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="mx-auto">
          <v-btn size="large" block to="/register">注册</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="mx-auto">
          <v-btn
            size="large"
            block
            :disabled="stateStore.userId ? false : true"
            @click="signOut"
            >退出</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3" class="mx-auto">
          <v-btn size="large" block to="/">返回首页</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="user">
        <v-col cols="12" md="3" class="mx-auto text-center">
          当前登录：{{ user.email }}
        </v-col>
      </v-row>
    </ClientOnly>
  </v-container>
</template>
<script setup>
const supabase = useSupabaseClient()
const email = ref("")
const password = ref("")
const router = useRouter()
const stateStore = useStateStore()
const isLogging = ref(false)
const user = useSupabaseUser()

const signInWithPassword = async () => {
  isLogging.value = true
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    switch (error.code) {
      case "invalid_credentials":
        stateStore.appInfo = "认证失败：登录凭证无效"
        break
      case "validation_failed":
        stateStore.appInfo = "认证失败：请填写邮箱和密码"
        break
      default:
        stateStore.appInfo = error
    }
    isLogging.value = false
  } else {
    await stateStore.getUserInfo()
    isLogging.value = false
    router.push("/user")
  }
}

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    stateStore.appInfo = error
  } else {
    stateStore.newUser()
    stateStore.appInfo = "退出成功"
  }
}
</script>
