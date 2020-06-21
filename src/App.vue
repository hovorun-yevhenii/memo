<template>
  <div id="app">
    <app-header />
    <div class="container">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  components: {
    AppHeader
  },
  created() {
    this.$store.dispatch("fetchNotes");
  }
};
</script>

<style lang="scss">
@import "style/global";

[id="app"] {
  min-height: 100vh;
  background-color: $main-dark;
  color: $main-text;
  &,
  & * {
    font-family: $roboto;
    color: $main-text;
    &::selection {
      background-color: rgba($accent-color, 0.35);
    }
  }
}
</style>
