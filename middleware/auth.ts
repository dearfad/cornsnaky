export default defineNuxtRouteMiddleware(() => {
  const stateStore = useStateStore()
  if (!stateStore.userId) {
    return navigateTo("/login")
  }
})
