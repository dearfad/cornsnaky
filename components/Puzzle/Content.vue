<template>
  <v-card class="px-4 mt-8" hover>
    <v-card-item>
      <v-card-title class="text-h5 font-weight-black">
        {{ stateStore.puzzles[stateStore.puzzleCurrentId - 1].name }}
      </v-card-title>
      <v-card-subtitle>
        {{ stateStore.puzzleCurrentId > 8 ? "支线任务" : "主线任务" }}
      </v-card-subtitle>
    </v-card-item>
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
    <v-sheet>
      <v-btn
        text="下载附加文件"
        class="font-weight-bold my-4"
        size="large"
        block
        @click="getPuzzleFile"
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
      <v-text-field
        v-model="puzzleAnswer"
        label="请输入答案"
        variant="outlined"
      />
      <v-btn
        text="提交答案"
        class="font-weight-bold"
        size="x-large"
        block
        @click="sendPuzzleAnswer"
      />
    </v-sheet>
  </v-card>
</template>

<script setup>
const isTipShow = ref(false)
const puzzleAnswer = ref("")
const stateStore = useStateStore()

onMounted(async () => {
  if (!stateStore.puzzles) {
    await stateStore.getGroupInfo()
  }
  await getPuzzleContent()
})

watch(
  () => stateStore.puzzleCurrentId,
  async () => {
    await getPuzzleContent()
  }
)

async function getPuzzleContent() {
  if (!stateStore.puzzles[stateStore.puzzleCurrentId - 1].content) {
    await stateStore.getPuzzleDetail()
  }
}

function getPuzzleFile() {
  window.open(stateStore.puzzles[stateStore.puzzleCurrentId - 1].file, "_blank")
}

async function sendPuzzleAnswer() {
  await stateStore.checkPuzzleAnswer(puzzleAnswer.value)
}
</script>
