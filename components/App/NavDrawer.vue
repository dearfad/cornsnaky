<template>
  <ClientOnly>
    <v-navigation-drawer
      v-model="stateStore.isNavDrawerShow"
      class="pa-4"
      :disable-resize-watcher="false"
    >
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-home-circle-outline"
          class="font-weight-bold text-subtitle-2"
          to="/"
        >
          首页
        </v-list-item>

        <v-list-item
          prepend-icon="mdi-help-box-outline"
          class="font-weight-bold text-subtitle-2"
          to="/guide"
        >
          帮助
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-account-plus-outline"
          class="font-weight-bold text-subtitle-2"
          to="/register"
        >
          注册
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-login"
          class="font-weight-bold text-subtitle-2"
          to="/login"
        >
          登录
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-account-edit"
          class="font-weight-bold text-subtitle-2"
          to="/user"
        >
          用户
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-puzzle-outline"
          class="font-weight-bold text-subtitle-2"
          to="/puzzle"
        >
          谜题
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-chevron-triple-up"
          class="font-weight-bold text-subtitle-2"
          to="/rank"
        >
          排名
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-podium-gold"
          class="font-weight-bold text-subtitle-2"
          to="/"
        >
          奖励
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-vanity-light"
          class="font-weight-bold text-subtitle-2"
          to="/verify"
        >
          结赛
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </ClientOnly>
</template>

<script setup>
const stateStore = useStateStore()
</script>
