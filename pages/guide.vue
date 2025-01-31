<template>
  <v-container>
    <v-row>
      <v-col />
      <v-col cols="12" md="6">
        <v-sheet class="d-flex flex-column">
          <v-sheet class="text-center font-weight-bold text-h5"
            >流程及规则</v-sheet
          >
          <v-card class="my-4">
            <v-card-title class="font-weight-bold">1、注册用户</v-card-title>
            <v-card-text>
              <ul class="px-4 text-body-1">
                <li>输入常用邮箱和密码注册用户</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card class="my-4">
            <v-card-title class="font-weight-bold">2、更改昵称</v-card-title>
            <v-card-text>
              <ul class="px-4 text-body-1">
                <li>在用户页面起一个自己喜欢的昵称</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card class="my-4">
            <v-card-title class="font-weight-bold"
              >3、创建或加入组</v-card-title
            >
            <v-card-text>
              <ul class="px-4 text-body-1">
                <li>通过获取的邀请码加入组，如何没有合适的组可以自己创建</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card class="my-4">
            <v-card-title class="font-weight-bold">4、解答谜题</v-card-title>
            <v-card-text>
              <ul class="px-4 text-body-1">
                <li>注册或者登录后进入谜题页面解答问题，答对将增加小队积分</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card class="my-4">
            <v-card-title class="font-weight-bold">5、小组排名</v-card-title>
            <v-card-text>
              <ul class="px-4 text-body-1">
                <li>通过积分进行排名</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card class="my-4">
            <v-card-title class="font-weight-bold">答题规则</v-card-title>
            <v-card-text>
              <ul class="px-4 text-body-1">
                <li>组队后由队长点击开始答题并计时，否则无法答题</li>
                <li>主线任务共8题，支线任务共4题，每题1分</li>
                <li>主线任务完成分数为 a ，支线任务完成分数为 b</li>
                <li>
                  初始显示主线任务2题，主线任务显示题数为 min(8, 2+a+b)
                  ，支线任务显示题数为 a
                </li>
                <li>小组内任意队员答题，无论对错即扣除1次答题次数</li>
                <li>小组内任意队员答对题目，即增加得分，后续队员答对不得分</li>
                <li>每道题队伍限答20次，超过次数后无法继续答该题</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card class="my-4">
            <v-card-title class="font-weight-bold">提示规则</v-card-title>
            <v-card-text>
              <ul class="px-4 text-body-1">
                <li>对长点击开始答题后，点数每分钟增加5点</li>
                <li>可以通过点数购买题目次数，每次2000点</li>
                <li>可以通过点数购买题目提示，提示点数需求不同</li>
              </ul>
            </v-card-text>
          </v-card>
          <v-card class="my-4">
            <v-card-title class="font-weight-bold">排名规则</v-card-title>
            <v-card-text>
              <ol class="px-4 text-body-1">
                <li>主线分数</li>
                <li>支线分数</li>
              </ol>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col />
    </v-row>
  </v-container>
</template>

<script setup></script>
