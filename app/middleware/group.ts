export default defineNuxtRouteMiddleware(() => {
  const stateStore = useStateStore();
  // 已完赛
  stateStore.appInfo = "已完赛，注册停止，请访问谜题页面。";
  return navigateTo("/puzzle");
  //
  // if (!stateStore.userName || !stateStore.userGroup) {
  //   return navigateTo("/user")
  // }
});
