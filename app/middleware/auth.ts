export default defineNuxtRouteMiddleware(() => {
  const stateStore = useStateStore()
  if (!stateStore.userId) {
    stateStore.appInfo = "请登录后访问！"
    return navigateTo("/login")
  }
})
