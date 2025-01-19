export const useStateStore = defineStore(
  "state",
  () => {
    const userId = ref("")
    const userEmail = ref("")
    const userGroup = ref("")
    const userName = ref("")
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    async function getGroup() {
      const { data } = await supabase
        .from("users")
        .select("group")
        .eq("id", user.value.id)
      console.log(data[0].group)
      userGroup.value = data[0].group
    }

    return {
      userId,
      userEmail,
      userGroup,
      userName,
      getGroup,
    }
  },
  { persist: true }
)
