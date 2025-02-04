<template>
  <v-card v-if="isReady" class="px-4 mt-8" hover>
    <ClientOnly>
      <v-card-item>
        <v-card-title class="text-h5 font-weight-black">
          {{ stateStore.puzzles[stateStore.puzzleCurrentId - 1].name }}
        </v-card-title>
        <v-card-subtitle>
          {{ stateStore.puzzleCurrentId > 8 ? "支线任务" : "主线任务" }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text
        v-if="
          stateStore.groupCompleted[stateStore.puzzleCurrentId - 1] === 1
            ? true
            : false
        "
        class="pt-4 text-body-1 font-weight-bold"
      >
        {{ stateStore.puzzles[stateStore.puzzleCurrentId - 1].story }}
      </v-card-text>
      <v-card-text class="pt-4 text-body-1">
        {{ stateStore.puzzles[stateStore.puzzleCurrentId - 1].content }}
      </v-card-text>
      <v-container class="px-3">
        <v-row>
          <v-col
            v-for="(puzzleImage, n) in stateStore.puzzles[
              stateStore.puzzleCurrentId - 1
            ].images"
            :key="n"
          >
            <v-img :src="puzzleImage" />
          </v-col>
        </v-row>
      </v-container>

      <PuzzleFile />
      <PuzzleAudio />
      <PuzzleTips />

      <v-sheet>
        <v-btn
          text="购买答题次数（1000点10次）"
          block
          class="my-4 font-weight-bold"
          size="large"
          @click="buyAnswerCount"
        />
      </v-sheet>

      <v-card title="小队已提交过的答案">
        <v-card-text>
          <v-chip
            v-for="(log, i) in stateStore.groupAnswerLog[
              stateStore.puzzleCurrentId - 1
            ]"
            :key="i"
            variant="elevated"
            class="font-weight-bold"
          >
            {{ log }}
          </v-chip>
        </v-card-text>
      </v-card>

      <v-sheet class="py-4">
        <v-text-field
          v-model="puzzleAnswer"
          :label="
            '剩余答题次数：' +
            stateStore.groupAnswerCount[stateStore.puzzleCurrentId - 1]
          "
          variant="outlined"
          maxlength="50"
          :counter="50"
          :rules="[(v) => v.length <= 50 || '最多只能输入50个字符']"
        />
        <v-btn
          text="提交答案"
          class="font-weight-bold"
          size="x-large"
          block
          :loading="isSending"
          @click="sendPuzzleAnswer"
        />
      </v-sheet>
    </ClientOnly>
  </v-card>
</template>

<script setup>
const isReady = ref(false)
const puzzleAnswer = ref("")
const stateStore = useStateStore()
const isSending = ref(false)

onBeforeMount(async () => {
  if (stateStore.puzzles.length === 0) {
    await stateStore.getGroupInfo()
  }
  await getPuzzleContent()
  isReady.value = true
})

watch(
  () => stateStore.puzzleCurrentId,
  async () => {
    stateStore.isPuzzleContentLoading = true
    await getPuzzleContent()
    stateStore.isPuzzleContentLoading = false
  }
)

async function getPuzzleContent() {
  if (!stateStore.puzzles[stateStore.puzzleCurrentId - 1].content) {
    await stateStore.getPuzzleDetail()
  }
}

async function sendPuzzleAnswer() {
  isSending.value = true
  if (stateStore.groupAnswerCount[stateStore.puzzleCurrentId - 1] >= 1) {
    if (stateStore.groupCompleted[stateStore.puzzleCurrentId - 1] != 1) {
      stateStore.groupAnswerCount[stateStore.puzzleCurrentId - 1] -= 1
      stateStore.groupAnswerLog[stateStore.puzzleCurrentId - 1].push(
        puzzleAnswer.value
      )
    }
    await stateStore.checkPuzzleAnswer(puzzleAnswer.value)
  } else {
    stateStore.appInfo = "答题次数已经耗尽，请购买次数或者放弃！"
  }
  isSending.value = false
}

async function buyAnswerCount() {
  if (stateStore.groupCurrentPoints >= 1000) {
    await stateStore.buyAnswerCount()
  } else {
    stateStore.appInfo = "点数不足，请充值！"
  }
}
</script>
