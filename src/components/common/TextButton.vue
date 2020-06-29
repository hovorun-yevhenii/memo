<template>
  <button
    class="button"
    :class="color"
    v-text="text"
    type="button"
    @click="handleClick"
  />
</template>

<script>
export default {
  name: "TextButton",
  props: {
    color: {
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
  min-width: 85px;
  padding: 8px 16px;
  border: 2px solid $border-color;
  border-radius: 4px;
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: $main-text;
  transition: $transition-duration;

  &.primary {
    background-color: rgba($primary-color, 0.7);
    border-color: darken($primary-color, 20%);
  }
  &.accent {
    background-color: rgba($accent-color, 0.7);
    border-color: darken($accent-color, 20%);
  }
  &.danger {
    background-color: rgba($danger-color, 0.7);
    border-color: darken($danger-color, 20%);
  }
  &:active:hover:not([disabled]) {
    filter: brightness(1.25);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
