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

      <PuzzleTips />

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
    </ClientOnly>
  </v-card>
</template>

<script setup>
const isReady = ref(false)
const puzzleAnswer = ref("")
const stateStore = useStateStore()

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
