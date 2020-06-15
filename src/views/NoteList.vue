<template>
  <div id="nav">
    <router-link :to="{ name: 'note', params: { id: 1 } }">1</router-link>
    <br />
    <router-link :to="{ name: 'note', params: { id: 2 } }">2</router-link>
  </div>
</template>

<script>
export default {
  name: "AppHome"
};
</script>

<style lang="scss" scoped>
@import "../style/variables";

a {
  display: inline-flex;
  padding: 64px;
  border: 2px solid $border-color;
  border-radius: 4px;
}
</style>
