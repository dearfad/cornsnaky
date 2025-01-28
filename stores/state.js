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
        ((new Date() - new Date(groupStartTime.value)) / (1000 * 60)) * 5 -
          groupUsedPoints.value
      )
    })
    const groupIsSolving = computed(() => (groupStartTime.value ? true : false))

    const puzzles = ref([
      {
        id: 0,
        name: "谜题1",
      },
      {},
    ])
    const puzzleMain = ref([])
    const puzzleSide = ref([])
    const puzzleCurrentId = ref(1)

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
        await getPuzzleInfo()
        appInfo.value = "刷新成功"
      }
    }

    async function getPuzzleInfo() {
      const { data, error } = await supabase
        .from("puzzles")
        .select("id, name")
        .order("id", { ascending: true })
      if (error) {
        appInfo.value = error
      } else {
        puzzleMain.value = data.slice(0, 8)
        puzzleSide.value = data.slice(8, 12)
        puzzles.value = data.map((item) => {
          item.content = ""
          return item
        })
      }
    }

    async function getPuzzleDetail() {
      const { data, error } = await supabase
        .from("puzzles")
        .select("*")
        .eq("id", puzzleCurrentId.value)
      if (error) {
        appInfo.value = error
      } else {
        puzzles.value[puzzleCurrentId.value - 1].content = data[0].content
        puzzles.value[puzzleCurrentId.value - 1].images = data[0].images
        puzzles.value[puzzleCurrentId.value - 1].file = data[0].file
        puzzles.value[puzzleCurrentId.value - 1].audios = data[0].audios
        console.log(data[0])
        console.log(puzzles.value)
        appInfo.value = "获取内容成功"
      }
    }

    async function checkPuzzleAnswer(answer) {
      console.log("checkPuzzleAnswer: ", answer)
      const { data, error } = await supabase
        .from("puzzles")
        .select("answer")
        .eq("id", puzzleCurrentId.value)
      if (error) {
        appInfo.value = error
      } else {
        if (answer === data[0].answer) {
          // TODO: 更新分数 更新次数
          const score =
            puzzleCurrentId.value <= 8
              ? { mainscore: groupMainScore.value + 1 }
              : { sidescore: groupSideScore.value + 1 }
          const { error: grouperror } = await supabase
            .from("groups")
            .update(score)
            .eq("name", groupName.value)
            .select()
          if (grouperror) {
            appInfo.value = grouperror
          } else {
            await getGroupInfo()
            appInfo.value = "分数更新成功"
          }

          appInfo.value = "答案正确"
        } else {
          appInfo.value = "答案错误"
        }
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

      puzzles,
      puzzleMain,
      puzzleSide,
      puzzleCurrentId,
      getPuzzleDetail,
      checkPuzzleAnswer,
    }
  },
  { persist: true }
)
