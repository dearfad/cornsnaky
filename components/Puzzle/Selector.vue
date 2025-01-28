<template>
  <v-container class="pa-0">
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
      <v-col v-for="n in 8" :key="n" class="py-1">
        <v-btn prepend-icon="mdi-star" variant="outlined" size="large" block>
          <template #prepend>
            <v-icon color="success" />
          </template>
          汉字听写大会
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
      <v-col v-for="n in 4" :key="n" class="py-1">
        <v-btn
          prepend-icon="mdi-creation"
          variant="outlined"
          size="large"
          block
        >
          <template #prepend>
            <v-icon color="primary" />
          </template>
          你是什么火
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>

<style></style>
