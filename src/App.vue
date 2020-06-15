<template>
  <div id="app">
    <app-header />
    <transition name="page" mode="in-uot">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader
  }
};
</script>

<style lang="scss">
@import "style/global";

[id="app"] {
  min-height: 100vh;
  background-color: $main-dark;
  background-image: url(https://www.transparenttextures.com/patterns/black-linen.png);
  color: $main-text;
  &,
  & * {
    font-family: $roboto;
    color: $main-text;
    &::selection {
      background-color: rgba(255, 214, 0, 0.35);
    }
  }
}
</style>
