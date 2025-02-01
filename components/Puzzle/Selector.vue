<template>
  <v-container class="pa-0">
    <ClientOnly>
      <v-row>
        <v-col class="pt-3 pb-1">
          <v-btn
            prepend-icon="mdi-star"
            variant="flat"
            size="large"
            block
            color="success"
            :loading="
              stateStore.isPuzzleContentLoading &&
              stateStore.puzzleCurrentId <= 8
            "
          >
            主线任务
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(main, n) in stateStore.puzzleMain" :key="n" class="py-1">
          <v-btn
            v-if="
              main.id <
              3 + stateStore.groupMainScore + stateStore.groupSideScore
                ? true
                : false
            "
            prepend-icon="mdi-star"
            variant="outlined"
            size="large"
            block
            @click="stateStore.puzzleCurrentId = main.id"
          >
            <template #prepend>
              <v-icon color="success" />
            </template>

            <template #append>
              <v-icon
                v-if="stateStore.groupCompleted[n] === 1 ? true : false"
                icon="mdi-check"
                color="red"
              />
            </template>
            {{ main.name }}
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-3 pb-1">
          <v-btn
            prepend-icon="mdi-creation"
            variant="flat"
            size="large"
            block
            color="primary"
            :loading="
              stateStore.isPuzzleContentLoading &&
              stateStore.puzzleCurrentId > 8
            "
          >
            支线任务
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(side, i) in stateStore.puzzleSide" :key="i" class="py-1">
          <v-btn
            v-if="side.id < 9 + stateStore.groupMainScore ? true : false"
            prepend-icon="mdi-creation"
            variant="outlined"
            size="large"
            block
            @click="stateStore.puzzleCurrentId = side.id"
          >
            <template #prepend>
              <v-icon color="primary" />
            </template>
            <template #append>
              <v-icon
                v-if="stateStore.groupCompleted[i + 8] === 1 ? true : false"
                icon="mdi-check"
                color="red"
              />
            </template>
            {{ side.name }}
          </v-btn>
        </v-col>
      </v-row>
    </ClientOnly>
  </v-container>
</template>

<script setup>
const stateStore = useStateStore()
</script>
