export default defineNuxtRouteMiddleware(() => {
  const stateStore = useStateStore();
  // 已完赛
  stateStore.appInfo = "已完赛，禁止登录。";
  return navigateTo("/login");
  //
  // if (!stateStore.userId) {
  //   stateStore.appInfo = "请登录后访问！";
  //   return navigateTo("/login");
  // }
});
