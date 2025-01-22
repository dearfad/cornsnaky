<template>
  <v-container class="pa-12">
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
          block
          size="large"
          :disabled="stateStore.userId ? true : false"
          :loading="isRegistering"
          @click="signUpNewUser"
          >注册</v-btn
        >
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
  </v-container>
</template>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const stateStore = useStateStore()
const router = useRouter()
const email = ref("")
const password = ref("")
const isRegistering = ref(false)

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    stateStore.appInfo = error
  } else {
    stateStore.newUser()
    stateStore.appInfo = "退出成功"
  }
}

const signUpNewUser = async () => {
  isRegistering.value = true
  stateStore.newUser()
  const { data, error: errorSignUp } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  if (errorSignUp) {
    stateStore.appInfo = error
    isRegistering.value = false
  } else {
    const { error: errorInsert } = await supabase
      .from("users")
      .insert([{ id: data.user.id }])
      .select()
    if (errorInsert) {
      stateStore.appInfo = errorInsert
      isRegistering.value = false
    } else {
      stateStore.appInfo = "注册成功"
      await stateStore.getUserInfo()
      isRegistering.value = false
      router.push("/user")
    }
  }
}
</script>
