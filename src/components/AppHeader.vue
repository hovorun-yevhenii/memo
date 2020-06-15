<template>
  <div class="header">
    <app-logo />
  </div>
</template>

<script>
import AppLogo from "./AppLogo.vue";

export default {
  name: "AppHeader",
  components: {
    AppLogo
  }
};
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

.header {
  padding: 24px;
  background-color: $default-bg;
}
</style>
