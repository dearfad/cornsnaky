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
          >
            主线任务
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(main, n) in stateStore.puzzleMain" :key="n" class="py-1">
          <v-btn
            prepend-icon="mdi-star"
            variant="outlined"
            size="large"
            block
            :disabled="
              main.id <
              3 + stateStore.groupMainScore + stateStore.groupSideScore
                ? false
                : true
            "
            @click="stateStore.puzzleCurrentId = main.id"
          >
            <template #prepend>
              <v-icon color="success" />
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
          >
            支线任务
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(side, n) in stateStore.puzzleSide" :key="n" class="py-1">
          <v-btn
            prepend-icon="mdi-creation"
            variant="outlined"
            size="large"
            block
            :disabled="side.id < 9 + stateStore.groupMainScore ? false : true"
            @click="stateStore.puzzleCurrentId = side.id"
          >
            <template #prepend>
              <v-icon color="primary" />
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
