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
              <v-sheet class="text-center font-weight-bold text-h6 my-2">
                {{ stateStore.userIsLeader ? "队长" : "队员" }}
              </v-sheet>
              <v-sheet class="text-center font-weight-bold text-h6 my-2">
                {{ stateStore.groupCode }}
              </v-sheet>
              <v-btn
                text="小队密钥"
                block
                size="large"
                variant="flat"
                :loading="isCodeLoading"
                @click="getGroupCode"
              />
              <v-btn
                text="退出登录"
                block
                size="large"
                variant="flat"
                @click="signOut"
              />
              <v-btn
                text="开始答题"
                block
                size="large"
                variant="flat"
                to="/puzzle"
                :disabled="!(stateStore.userGroup && stateStore.userName)"
              />
            </v-sheet>
            <v-sheet
              v-if="!stateStore.userGroup || !stateStore.userName"
              class="ma-2 pa-4 text-center"
              elevation="2"
              color="grey-lighten-3"
            >
              <v-icon
                class="mb-4"
                color="red"
                icon="mdi-alert-outline"
                size="40"
              />
              <p class="font-weight-bold">更改昵称及入队后可以开始答题</p>
            </v-sheet>

            <v-sheet :elevation="1" class="pa-4 ma-2">
              <span class="font-weight-bold">{{ stateStore.userGroup }}</span>
              小队成员
              <v-list>
                <v-list-item
                  v-for="member in stateStore.groupMembers"
                  :key="member"
                  :title="member"
                />
              </v-list>
              <v-btn
                block
                size="large"
                variant="flat"
                text="刷新小队成员"
                :isloading="isGroupMembersLoading"
                @click="refreshGroupMembers"
              />
            </v-sheet>

            <v-sheet :elevation="1" class="pa-4 ma-2">
              <v-text-field
                v-model="nickname"
                label="昵称"
                variant="outlined"
                maxlength="50"
                :counter="50"
                :rules="[(v) => v.length <= 50 || '最多只能输入50个字符']"
              />
              <v-btn
                text="更改昵称"
                block
                size="large"
                variant="flat"
                :loading="isNameChanging"
                @click="changeName"
              />
            </v-sheet>
            <v-sheet
              v-if="stateStore.userGroup ? true : false"
              :elevation="1"
              class="pa-4 ma-2"
            >
              <v-text-field
                v-model="newGroupName"
                label="更改小队名称"
                variant="outlined"
                maxlength="50"
                :counter="50"
                :rules="[(v) => v.length <= 50 || '最多只能输入50个字符']"
              />
              <v-btn
                text="更改小队名称"
                block
                size="large"
                variant="flat"
                :loading="isGroupNameChanging"
                @click="changeGroupName"
              />
            </v-sheet>
            <v-sheet
              v-if="stateStore.userGroup ? false : true"
              :elevation="1"
              class="pa-4 ma-2"
            >
              <v-text-field
                v-model="groupcode"
                label="输入小队密钥"
                variant="outlined"
                maxlength="30"
                :counter="30"
                :rules="[(v) => v.length <= 30 || '最多只能输入30个字符']"
              />
              <v-btn
                block
                size="large"
                variant="flat"
                text="加入小队"
                :loading="isGroupJoining"
                @click="joinGroup"
              />
            </v-sheet>
            <v-sheet
              v-if="stateStore.userGroup ? false : true"
              :elevation="1"
              class="pa-4 ma-2"
            >
              <v-text-field
                v-model="groupname"
                label="队名"
                variant="outlined"
                maxlength="50"
                :counter="50"
                :rules="[(v) => v.length <= 50 || '最多只能输入50个字符']"
              />
              <v-text-field
                v-model="groupcode"
                label="小队密钥"
                variant="outlined"
                maxlength="30"
                :counter="30"
                :rules="[(v) => v.length <= 30 || '最多只能输入30个字符']"
              />
              <v-btn
                block
                size="large"
                variant="flat"
                text="创建并加入小队"
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
const stateStore = useStateStore()
const router = useRouter()
const nickname = ref("")
const groupname = ref("")
const groupcode = ref("")
const newGroupName = ref("")
const isGroupMembersLoading = ref(false)
const isNameChanging = ref(false)
const isGroupNameChanging = ref(false)
const isGroupJoining = ref(false)
const isCodeLoading = ref(false)

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    stateStore.appInfo = error
  } else {
    stateStore.$reset()
    router.push("/")
  }
}

async function changeName() {
  isNameChanging.value = true
  const { error } = await supabase
    .from("users")
    .update({
      name: nickname.value,
    })
    .eq("id", user.value.id)
  if (error) {
    if (error.code === "23505") {
      stateStore.appInfo = "昵称已存在"
    } else {
      stateStore.appInfo = error
    }
  } else {
    stateStore.userName = nickname.value
    stateStore.appInfo = "更改昵称成功"
  }
  isNameChanging.value = false
}

async function changeGroupName() {
  isGroupNameChanging.value = true
  if (groupname.value === "") {
    stateStore.appInfo = "请填写队名"
    return
  }
  const { data, error } = await supabase
    .from("groups")
    .update({ name: newGroupName.value })
    .eq("leader", user.value.id)
    .select()
  if (error) {
    if (error.code === "23505") {
      stateStore.appInfo = "小队名已存在"
    } else {
      stateStore.appInfo = error
    }
  } else {
    if (data.length === 0) {
      stateStore.appInfo = "队员不可更改小队名！"
    } else {
      const { errorUpdateMembers } = await supabase
        .from("users")
        .update({ group: newGroupName.value })
        .eq("group", stateStore.userGroup)
      if (errorUpdateMembers) {
        stateStore.appInfo = errorUpdateMembers
      } else {
        stateStore.userGroup = newGroupName.value
        stateStore.appInfo = "更改组名成功"
      }
    }
  }
  isGroupNameChanging.value = false
}

async function createGroup() {
  if (groupname.value === "" || groupcode.value === "") {
    stateStore.appInfo = "请填写队名和小队密钥"
    return
  }
  const { error } = await supabase
    .from("groups")
    .insert({
      name: groupname.value,
      code: groupcode.value,
      leader: stateStore.userId,
    })
    .select()
  if (error) {
    if (error.code === "23505") {
      stateStore.appInfo = "组名或小队密钥已存在"
    } else {
      stateStore.appInfo = error
    }
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
  isGroupJoining.value = true
  if (groupcode.value === "") {
    stateStore.appInfo = "请填写小队密钥"
    return
  }
  const { data, errorSelect } = await supabase
    .from("groups")
    .select()
    .eq("code", groupcode.value)
  if (errorSelect) {
    stateStore.appInfo = errorSelect
  } else if (data.length === 0) {
    stateStore.appInfo = "小队密钥无效"
  } else {
    if (data[0].starttime) {
      stateStore.appInfo = "该队已开始比赛，无法加入！"
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
  isGroupJoining.value = false
}

async function refreshGroupMembers() {
  isGroupMembersLoading.value = true
  await stateStore.getGroupMembers()
  isGroupMembersLoading.value = false
}

async function getGroupCode() {
  isCodeLoading.value = true
  const { data, error } = await supabase
    .from("groups")
    .select("code")
    .eq("name", stateStore.userGroup)
  if (error) {
    stateStore.appInfo = error
  } else {
    stateStore.groupCode = data[0].code
  }
  isCodeLoading.value = false
}
</script>
