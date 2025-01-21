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

    <v-snackbar v-model="snackBar" timeout="2000"
      ><div class="text-center">{{ snackBarText }}</div></v-snackbar
    >
  </v-container>
</template>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const stateStore = useStateStore()
const router = useRouter()
const email = ref("")
const password = ref("")
const snackBar = ref(false)
const snackBarText = ref("")
const isRegistering = ref(false)

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  } else {
    stateStore.newUser()
    snackBarText.value = "退出成功"
    snackBar.value = true
  }
}

const signUpNewUser = async () => {
  isRegistering.value = true
  stateStore.newUser()
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })
  if (error) {
    snackBarText.value = error
    snackBar.value = true
    isRegistering.value = false
  } else {
    const { error: errorInsert } = await supabase
      .from("users")
      .insert([{ id: data.user.id, name: data.user.email }])
      .select()
    if (errorInsert) {
      snackBarText.value = errorInsert
      snackBar.value = true
      isRegistering.value = false
    } else {
      snackBarText.value = "注册成功"
      snackBar.value = true
      await stateStore.getUserInfo()
      isRegistering.value = false
      router.push("/user")
    }
  }
}
</script>
