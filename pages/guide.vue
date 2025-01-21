<template>
  <v-timeline side="end">
    <v-timeline-item
      v-for="item in items"
      :key="item.id"
      dot-color="green"
      :icon="item.icon"
    >
      <v-card
        :title="item.title"
        :subtitle="item.text"
        variant="flat"
        :to="item.link"
    /></v-timeline-item>
  </v-timeline>
</template>

<script setup>
const items = [
  {
    id: useId(),
    title: "第一步：注册用户",
    text: "输入常用邮箱和密码注册用户",
    icon: "mdi-account-plus-outline",
    link: "/register",
  },
  {
    id: useId(),
    title: "第二步：更改昵称",
    text: "在用户页面起一个自己喜欢的昵称",
    icon: "mdi-account-edit",
    link: "/user",
  },
  {
    id: useId(),
    title: "第三步：加入组",
    text: "通过获取的邀请码加入组，如何没有合适的组可以自己创建",
    icon: "mdi-account-multiple-plus-outline",
    link: "/user",
  },
  {
    id: useId(),
    title: "第四步：解答谜题",
    text: "注册或者登录后进入谜题页面解答问题，答对将增加小组积分",
    icon: "mdi-puzzle-outline",
    link: "/puzzle",
  },
  {
    id: useId(),
    title: "第五步：小组排名",
    text: "通过小组积分进行排名",
    icon: "mdi-chevron-triple-up",
    link: "/rank",
  },
]
</script>
