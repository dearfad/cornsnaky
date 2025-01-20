<template>
  <div>
    1、 左8 右4栏 2、 Group 0 主线2题。支线不显示 3、
    选择题时出现题干，然后回答，回答对准，限20次，整个队伍。组队后，组长选择开始答题，每分钟10点，购买答题点，购买次数，都可以买答题次数。
    有提示答题点数，剩余次数。 4、 答对一道增加1分。队伍都不用再答。 5、
    支线是主线分数 4或 a主线对题数 6、 支线对题B 主线显示题 min(8, 2+a+b) 7、
    主线都答对。 8、 截止时间点。
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
})
const user = useSupabaseUser()
</script>

<style></style>
