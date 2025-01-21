export const useStateStore = defineStore(
  "state",
  () => {
    // NavDrawer
    const isNavDrawerShow = ref(false)
    // User
    const userId = ref("")
    const userEmail = ref("")
    const userGroup = ref("")
    const userName = ref("")
    const userIsLeader = ref(false)

    const groupName = ref("")
    const groupLeader = ref("")
    const groupMainscore = ref(0)
    const groupSidescore = ref(0)
    const groupScoretime = ref("")
    const groupStarttime = ref("")

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    function newUser() {
      userId.value = ""
      userEmail.value = ""
      userGroup.value = ""
      userName.value = ""
      userIsLeader.value = false
    }

    async function getUserInfo() {
      userId.value = user.value.id
      userEmail.value = user.value.email
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.value.id)
      userGroup.value = data[0].group
      userName.value = data[0].name
      userIsLeader.value = data[0].isleader
    }

    async function getGroupInfo() {
      const { data } = await supabase
        .from("groups")
        .select("*")
        .eq("name", userGroup.value)
      groupName.value = data[0].name
      groupLeader.value = data[0].leader
      groupMainscore.value = data[0].mainscore
      groupSidescore.value = data[0].sidescore
      groupScoretime.value = data[0].scoretime
      groupStarttime.value = data[0].starttime
    }

    function newGroup() {
      groupName.value = ""
      groupLeader.value = ""
      groupMainscore.value = 0
      groupSidescore.value = 0
      groupScoretime.value = ""
      groupStarttime.value = ""
    }

    return {
      isNavDrawerShow,

      userId,
      userEmail,
      userGroup,
      userName,
      userIsLeader,
      getUserInfo,
      getGroupInfo,
      newUser,

      groupName,
      groupLeader,
      groupMainscore,
      groupSidescore,
      groupScoretime,
      groupStarttime,
      newGroup,
    }
  },
  { persist: true }
)
