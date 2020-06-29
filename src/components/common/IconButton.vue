<template>
  <button class="icon-button" :class="color" type="button" @click="handleClick">
    <component :is="`svg-${icon}`" />
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String
    },
    color: {
      type: String
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss">
@import "../../style/global";
@import "../../style/mixins";

.icon-button {
  @include empty-button;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: background-color $transition-duration;

  & * {
    width: 100%;
    color: $border-color;
  }

  &.primary * {
    color: $primary-color;
  }

  &.accent * {
    color: $accent-color;
  }

  &.danger * {
    color: $danger-color;
  }

  &:disabled * {
    cursor: not-allowed;
    color: $border-color;
  }

  &:hover:not(:disabled) {
    background-color: rgba(black, 0.7);
  }
}
</style>
