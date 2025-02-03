export const useStateStore = defineStore(
  "state",
  () => {
    // AppInfo
    const appInfo = ref("")
    // NavDrawer
    const isNavDrawerShow = ref(false)
    // PuzzleContentLoading
    const isPuzzleContentLoading = ref(false)

    // User
    const userId = ref("")
    const userEmail = ref("")
    const userGroup = ref("")
    const userName = ref("")
    const userIsLeader = ref(false)

    // Group
    const groupName = ref("")
    const groupLeader = ref("")
    const groupMainScore = ref(0)
    const groupSideScore = ref(0)
    const groupScoreTime = ref(null)
    const groupStartTime = ref(null)
    const groupUsedPoints = ref(0)
    const groupAnswerCount = ref([])
    const groupCompleted = ref([])
    const groupOpenTips = ref([])
    const groupMembers = ref([])
    const groupCurrentPoints = ref(0)

    const groupIsSolving = computed(() => (groupStartTime.value ? true : false))

    const puzzles = ref([])
    const puzzleTips = ref([])
    const puzzleMain = ref([])
    const puzzleSide = ref([])
    const puzzleCurrentId = ref(1)

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    function $reset() {
      // user
      userId.value = ""
      userEmail.value = ""
      userGroup.value = ""
      userName.value = ""
      userIsLeader.value = false
      // group
      groupName.value = ""
      groupLeader.value = ""
      groupMainScore.value = 0
      groupSideScore.value = 0
      groupScoreTime.value = null
      groupStartTime.value = null
      groupUsedPoints.value = 0
      groupAnswerCount.value = []
      groupCompleted.value = []
      groupOpenTips.value = []
      groupMembers.value = []
      // puzzles
      puzzles.value = []
      puzzleTips.value = []
      puzzleMain.value = []
      puzzleSide.value = []
      puzzleCurrentId.value = 1
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
        groupScoreTime.value = data[0].scoretime
          ? getBeijingTime(data[0].scoretime)
          : null
        groupStartTime.value = data[0].starttime
          ? getBeijingTime(data[0].starttime)
          : null
        groupUsedPoints.value = data[0].usedpoints
        groupAnswerCount.value = data[0].count
        groupCompleted.value = data[0].completed
        groupOpenTips.value = data[0].opentips
        groupCurrentPoints.value = getCurrentPoints()
        await getPuzzleInfo()
        // appInfo.value = "刷新成功"
      }
    }

    function getCurrentPoints() {
      if (groupStartTime.value) {
        return Math.floor(
          ((new Date() - new Date(groupStartTime.value)) / (1000 * 60)) * 5 -
            groupUsedPoints.value
        )
      } else {
        return 0
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
        await getPuzzleDetail()
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
        puzzles.value[puzzleCurrentId.value - 1].tips = data[0].tips.map(
          (item, n) => {
            if (groupOpenTips.value[puzzleCurrentId.value - 1][n] === 1) {
              item.content = data[0].tipcontent[n]
            } else {
              item.content = ""
            }
            return item
          }
        )
        // appInfo.value = "获取内容成功"
      }
    }

    async function checkPuzzleAnswer(answer) {
      const { data, error } = await supabase
        .from("puzzles")
        .select("answer")
        .eq("id", puzzleCurrentId.value)
      if (error) {
        appInfo.value = error
      } else {
        await updateGroupCount()
        if (answer === data[0].answer) {
          if (groupCompleted.value[puzzleCurrentId.value - 1] === 0) {
            groupCompleted.value[puzzleCurrentId.value - 1] = 1
            const score =
              puzzleCurrentId.value <= 8
                ? { mainscore: groupMainScore.value + 1 }
                : { sidescore: groupSideScore.value + 1 }
            const mainScoreTime =
              puzzleCurrentId.value <= 8 ? new Date() : groupScoreTime.value
            const { error: grouperror } = await supabase
              .from("groups")
              .update({
                ...score,
                ...{ completed: groupCompleted.value },
                ...{ scoretime: mainScoreTime },
              })
              .eq("name", groupName.value)
              .select()
            if (grouperror) {
              appInfo.value = grouperror
            } else {
              await getGroupInfo()
              appInfo.value = "分数更新成功"
            }
          }
          appInfo.value = "答案正确"
        } else {
          appInfo.value = "答案错误"
        }
      }
    }

    async function updateGroupCount() {
      const { error } = await supabase
        .from("groups")
        .update({ count: groupAnswerCount.value })
        .eq("name", groupName.value)
        .select()
      if (error) {
        appInfo.value = error
      } else {
        appInfo.value = "次数更新成功"
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

    async function buyTip(n, price) {
      groupUsedPoints.value += price
      groupOpenTips.value[puzzleCurrentId.value - 1][n] = 1
      const { error } = await supabase
        .from("groups")
        .update({
          usedpoints: groupUsedPoints.value,
          opentips: groupOpenTips.value,
        })
        .eq("name", groupName.value)
        .select()
      if (error) {
        appInfo.value = error
      } else {
        await getGroupInfo()
        // appInfo.value = "刷新成功"
      }
    }

    async function buyAnswerCount() {
      groupUsedPoints.value += 2000
      groupAnswerCount.value[puzzleCurrentId.value - 1] += 1
      const { error } = await supabase
        .from("groups")
        .update({
          usedpoints: groupUsedPoints.value,
          count: groupAnswerCount.value,
        })
        .eq("name", groupName.value)
        .select()
      if (error) {
        appInfo.value = error
      } else {
        appInfo.value = "购买答题次数成功"
      }
    }

    async function getGroupMembers() {
      const { data, error } = await supabase
        .from("users")
        .select("name, group")
        .eq("group", userGroup.value)
      if (error) {
        appInfo.value = error
      } else {
        groupMembers.value = data.map((item) => {
          return item.name
        })
      }
    }

    return {
      appInfo,
      isNavDrawerShow,
      isPuzzleContentLoading,
      $reset,

      userId,
      userEmail,
      userGroup,
      userName,
      userIsLeader,
      getUserInfo,
      getGroupInfo,

      groupName,
      groupLeader,
      groupMainScore,
      groupSideScore,
      groupScoreTime,
      groupStartTime,
      groupIsSolving,
      groupUsedPoints,
      groupCurrentPoints,
      groupAnswerCount,
      groupCompleted,
      groupMembers,

      puzzles,
      puzzleTips,
      puzzleMain,
      puzzleSide,
      puzzleCurrentId,
      getPuzzleDetail,
      checkPuzzleAnswer,

      groupOpenTips,
      buyTip,
      buyAnswerCount,

      getGroupMembers,
      getBeijingTime,
    }
  },
  { persist: true }
)
