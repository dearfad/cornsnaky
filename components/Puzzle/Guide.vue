<template>
  <v-container class="pa-4 ma-4">
    <v-row>
      <v-col cols="12" md="4" class="px-8">
        <MDC :value="helpAnswer" />
      </v-col>
      <v-col cols="12" md="4" class="px-8">
        <MDC :value="helpScore" />
      </v-col>
      <v-col cols="12" md="4" class="px-8">
        <MDC :value="helpWin" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const helpAnswer = ref(`
**答题**
- 左侧主线任务8题，右侧支线任务4题
- Group 0 主线2题。支线不显示
- 选择题时出现题干，然后回答，回答对准，限20次，整个队伍。组队后，组长选择开始答题，每分钟10点，购买答题点，购买次数，都可以买答题次数。有提示答题点数，剩余次数。 
`)
const helpScore = ref(`
**积分**
- 答对一道增加1分。队伍都不用再答。
- 支线是主线分数 4或 a主线对题数
- 支线对题B 主线显示题 min(8, 2+a+b) 
`)
const helpWin = ref(`
**获胜**
- 主线都答对。 
- 截止时间点。
`)
</script>
