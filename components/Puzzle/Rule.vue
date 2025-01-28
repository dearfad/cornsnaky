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
- 主线任务8题，支线任务4题
- 初始显示主线任务2题
- 主线任务完成数为a，支线任务完成数为b
- 主线任务显示题数为 min(8, 2+a+b)，支线任务显示题数为a 
- 选择题时出现题干，然后回答，回答对准，限20次，整个队伍。组队后，组长选择开始答题，每分钟10点，购买答题点，购买次数，都可以买答题次数。有提示答题点数，剩余次数。 
- 支线是主线分数 4或 a主线对题数
`)
const helpScore = ref(`
**得分**
- 任意队员答对题目增加1分，同队队员再次答对不得分。
`)
const helpWin = ref(`
**获胜**
- 主线都答对。 
- 截止时间点。
`)
</script>
