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
