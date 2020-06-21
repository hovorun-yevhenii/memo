<template>
  <button class="button" :class="type" v-text="text" @click="handleClick" />
</template>

<script>
export default {
  name: "TextButton",
  props: {
    type: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";
@import "../../style/mixins";

.button {
  @include empty-button;
  min-width: 60px;
  padding: 8px 16px;
  border: 2px solid $border-color;
  border-radius: 4px;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  transition: $transition-duration;

  &.danger {
    background-color: rgba($danger-color, 0.7);
    border-color: darken($danger-color, 20%);
  }
  &.primary {
    background-color: rgba($main-blue, 0.7);
    border-color: darken($main-blue, 20%);
  }
  &.accent {
    background-color: rgba($main-green, 0.7);
    border-color: darken($main-green, 20%);
  }
  &:hover {
    filter: brightness(1.25);
  }
}
</style>
