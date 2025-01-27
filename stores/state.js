export const useStateStore = defineStore(
  "state",
  () => {
    // NavDrawer
    const isNavDrawerShow = ref(false)
    // AppInfo
    const appInfo = ref("")
    // User
    const userId = ref("")
    const userEmail = ref("")
    const userGroup = ref("")
    const userName = ref("")
    const userIsLeader = ref(false)

    const groupName = ref("")
    const groupLeader = ref("")
    const groupMainScore = ref(0)
    const groupSideScore = ref(0)
    const groupScoreTime = ref("")
    const groupStartTime = ref("")
    const groupUsedPoints = ref(0)
    const groupCurrentPoints = computed(() => {
      return Math.floor(
        (new Date() - new Date(groupStartTime.value)) / (1000 * 60 * 100) -
          groupUsedPoints.value
      )
    })
    const groupIsSolving = computed(() => (groupStartTime.value ? true : false))

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
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("name", userGroup.value)
      if (error) {
        appInfo.value = error
      } else {
        groupName.value = data[0].name
        groupLeader.value = data[0].leader
        groupMainScore.value = data[0].mainscore
        groupSideScore.value = data[0].sidescore
        groupScoreTime.value = getBeijingTime(data[0].scoretime)
        groupStartTime.value = getBeijingTime(data[0].starttime)
        groupUsedPoints.value = data[0].usedpoints
        console.log(data[0])
        appInfo.value = "刷新成功"
      }
    }

    function getBeijingTime(time) {
      const utcDate = new Date(time)
      const beijingDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000)
      const beijingTimeStr = beijingDate
        .toISOString()
        .replace("T", " ")
        .substring(0, 19)
      return beijingTimeStr
    }

    function newGroup() {
      groupName.value = ""
      groupLeader.value = ""
      groupMainScore.value = 0
      groupSideScore.value = 0
      groupScoreTime.value = ""
      groupStartTime.value = ""
      groupUsedPoints.value = 0
    }

    return {
      isNavDrawerShow,
      appInfo,

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
      groupMainScore,
      groupSideScore,
      groupScoreTime,
      groupStartTime,
      groupIsSolving,
      groupUsedPoints,
      groupCurrentPoints,
      newGroup,
    }
  },
  { persist: true }
)
