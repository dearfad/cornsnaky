export default defineNuxtRouteMiddleware(() => {
  const stateStore = useStateStore()
  if (!stateStore.userName || !stateStore.userGroup) {
    return navigateTo("/user")
  }
})
