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

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    function newUser() {
      userId.value = ""
      userEmail.value = ""
      userGroup.value = ""
      userName.value = ""
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
    }

    return {
      isNavDrawerShow,

      userId,
      userEmail,
      userGroup,
      userName,
      getUserInfo,
      newUser,
    }
  },
  { persist: true }
)
