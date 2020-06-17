<template>
  <button class="button" :class="type" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "TextButton",
  props: {
    type: String
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/variables";
@import "../style/mixins";

.button {
  @include empty-button;
  min-width: 90px;
  padding: 8px 16px;
  border: 2px solid $border-color;
  border-radius: 4px;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  transition: 0.25s;

  &.danger {
    background-color: rgba($danger-color, 0.7);
    border-color: darken($danger-color, 20%);
  }
  &:hover {
    filter: brightness(1.25);
  }
}
</style>
