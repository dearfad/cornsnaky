<template>
  <v-card class="px-4 mt-8" hover>
    <v-card-item>
      <v-card-title class="text-h5 font-weight-black">
        汉字听写大会
      </v-card-title>
      <v-card-subtitle> 主线任务 </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pt-4 text-body-1">
      活动目的：通过汉字听写的形式，激发学生对汉字文化的兴趣，提高汉字书写能力，传承和弘扬中华优秀传统文化。
      活动时间：[具体日期] 活动地点：[具体地点] 活动对象：[年级]学生 活动流程：
      开场致辞：主持人介绍活动目的和规则。
      听写环节：主持人念出汉字，学生在规定时间内书写。
      评分环节：评委根据书写规范和准确性进行评分。
      颁奖环节：为优秀学生颁发奖状和奖品。
      活动意义：汉字是中华文化的瑰宝，通过听写大会，让学生在书写中感受汉字的魅力，增强文化自信，为传承中华文化贡献力量。
    </v-card-text>
    <v-container class="px-3">
      <v-row>
        <v-col v-for="n in 7" :key="n">
          <v-sheet color="blue-lighten-4" height="200" width="300" rounded />
        </v-col>
      </v-row>
    </v-container>
    <v-sheet>
      <v-btn
        text="下载附加文件"
        class="font-weight-bold my-4"
        size="large"
        block
      />
    </v-sheet>
    <v-card-actions>
      <v-btn
        text="购买提示"
        variant="flat"
        color="red"
        elevation="2"
        width="100"
      />
      <v-spacer />
      <v-btn
        :icon="isTipShow ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="isTipShow = !isTipShow"
      />
    </v-card-actions>
    <v-expand-transition>
      <div v-show="isTipShow">
        <v-divider />
        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-sheet class="py-4">
      <v-text-field label="请输入答案" variant="outlined" />
      <v-btn text="提交答案" class="font-weight-bold" size="x-large" block />
    </v-sheet>
  </v-card>
</template>

<script setup>
const isTipShow = ref(false)
</script>
