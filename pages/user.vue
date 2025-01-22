<template>
  <ClientOnly>
    <v-container class="pa-0">
      <v-row>
        <v-col />
        <v-col cols="12" md="4">
          <v-sheet class="d-flex flex-column">
            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-sheet class="text-center font-weight-bold text-h3 my-2">{{
                stateStore.userName + "@" + stateStore.userGroup
              }}</v-sheet>
              <v-sheet class="text-center font-weight-bold text-h4 my-2">
                {{ stateStore.userIsLeader ? "队长" : "队员" }}
              </v-sheet>
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
                :disabled="stateStore.userName"
              />
              <v-btn
                text="更改昵称"
                block
                size="large"
                variant="flat"
                :disabled="stateStore.userName"
                @click="changeName"
              />
            </v-sheet>
            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-text-field
                v-model="groupcode"
                label="输入邀请码"
                variant="outlined"
                :disabled="stateStore.userGroup"
              />
              <v-btn
                block
                size="large"
                variant="flat"
                text="加入组"
                :disabled="stateStore.userGroup"
                @click="joinGroup"
              />
            </v-sheet>
            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-text-field
                v-model="groupname"
                label="组名"
                variant="outlined"
                :disabled="stateStore.userGroup"
              />
              <v-text-field
                v-model="groupcode"
                label="邀请码"
                variant="outlined"
                :disabled="stateStore.userGroup"
              />
              <v-btn
                block
                size="large"
                variant="flat"
                text="创建并加入组"
                :disabled="stateStore.userGroup"
                @click="createGroup"
              />
            </v-sheet>
          </v-sheet>
        </v-col>
        <v-col />
      </v-row>
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
    stateStore.appInfo = error
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
    stateStore.appInfo = error
  } else {
    stateStore.userName = nickname.value
    stateStore.appInfo = "更改昵称成功"
  }
}

async function createGroup() {
  const { error } = await supabase.from("groups").insert({
    name: groupname.value,
    code: groupcode.value,
    leader: stateStore.userId,
  })
  if (error) {
    snackBarText.value = error
    snackBar.value = true
  } else {
    stateStore.appInfo = "创建组成功"
    const { error: error2 } = await supabase
      .from("users")
      .update({ group: groupname.value, isleader: true })
      .eq("id", stateStore.userId)
    if (error2) {
      stateStore.appInfo = error2
    } else {
      stateStore.userGroup = groupname.value
      stateStore.userIsLeader = true
      stateStore.appInfo = "加入组成功"
    }
  }
}

async function joinGroup() {
  const { data, errorSelect } = await supabase
    .from("groups")
    .select()
    .eq("code", groupcode.value)
  if (errorSelect) {
    stateStore.appInfo = errorSelect
  } else if (data.length === 0) {
    stateStore.appInfo = "邀请码无效"
  } else {
    const { error: errorUpdate } = await supabase
      .from("users")
      .update({ group: data[0].name })
      .eq("id", user.value.id)
    if (errorUpdate) {
      stateStore.appInfo = errorUpdate
    } else {
      stateStore.userGroup = data[0].name
      stateStore.appInfo = "加入组成功"
    }
  }
}
</script>
