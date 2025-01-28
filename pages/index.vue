<template>
  <v-container>
    <v-row>
      <v-col />
      <v-col cols="10">
        <v-img
          max-width="350"
          min-height="280"
          class="mx-auto my-8"
          src="/heroimage.jpg"
          rounded="circle"
        />
      </v-col>
      <v-col />
    </v-row>
    <v-row>
      <v-col class="text-h6 text-center font-weight-bold">
        Cornsnaky's Snakeyear
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-h4 text-center font-weight-bold"> PUZZLE HUNT</v-col>
    </v-row>
    <v-row>
      <v-col cols="8" md="2" class="mx-auto mt-4">
        <v-btn
          size="x-large"
          block
          to="/puzzle"
          class="font-weight-bold text-h5"
          variant="outlined"
          >开始</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
