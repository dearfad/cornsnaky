<template>
  <ClientOnly>
    <v-container class="pa-0">
      <v-row>
        <v-col />
        <v-col cols="12" md="4">
          <v-sheet class="d-flex flex-column">
            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-sheet class="text-center font-weight-bold text-h5 my-2">{{
                stateStore.userName + "@" + stateStore.userGroup
              }}</v-sheet>
              <v-btn
                text="退出登录"
                block
                size="large"
                variant="flat"
                @click="signOut"
              />
            </v-sheet>
            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-text-field
                v-model="nickname"
                label="昵称"
                variant="outlined"
              />
              <v-btn
                text="更改昵称"
                block
                size="large"
                variant="flat"
                @click="changeName"
              />
            </v-sheet>
            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-text-field
                v-model="groupcode"
                label="输入邀请码"
                variant="outlined"
              />
              <v-btn
                block
                size="large"
                variant="flat"
                text="加入组"
                @click="joinGroup"
              />
            </v-sheet>
            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-text-field
                v-model="groupname"
                label="组名"
                variant="outlined"
              />
              <v-text-field
                v-model="groupcode"
                label="邀请码"
                variant="outlined"
              />
              <v-btn
                block
                size="large"
                variant="flat"
                text="创建组"
                @click="createGroup"
              />
            </v-sheet>
          </v-sheet>
        </v-col>
        <v-col />
      </v-row>
      <v-snackbar v-model="snackBar" timeout="2000"
        ><div class="text-center">{{ snackBarText }}</div></v-snackbar
      >
    </v-container>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
})
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const snackBar = ref(false)
const snackBarText = ref("")
const nickname = ref("")
const groupname = ref("")
const groupcode = ref("")
const stateStore = useStateStore()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  } else {
    stateStore.newUser()
    router.push("/")
  }
}

const changeName = async () => {
  const { error } = await supabase
    .from("users")
    .update({
      name: nickname.value,
    })
    .eq("id", user.value.id)
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  } else {
    stateStore.userName = nickname.value
    snackBarText.value = "更改昵称成功"
    snackBar.value = true
  }
}

async function createGroup() {
  const { error } = await supabase.from("groups").insert({
    name: groupname.value,
    code: groupcode.value,
  })
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  } else {
    snackBarText.value = "创建组成功"
    snackBar.value = true
  }
}

async function joinGroup() {
  const { data, error } = await supabase
    .from("groups")
    .select()
    .eq("code", groupcode.value)
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  } else if (data.length === 0) {
    snackBarText.value = "邀请码无效"
    snackBar.value = true
  } else {
    const { error: error2 } = await supabase
      .from("users")
      .update({ group: data[0].name })
      .eq("id", user.value.id)
    if (error2) {
      snackBarText.value = error2
      snackBar.value = true
    } else {
      stateStore.userGroup = data[0].name
      snackBarText.value = "加入组成功"
      snackBar.value = true
    }
  }
}
</script>
