<template>
  <div id="app">
    <app-header />
    <div class="container">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/header/AppHeader.vue";

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
</style>
