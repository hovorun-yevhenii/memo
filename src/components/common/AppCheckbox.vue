<template>
  <label class="checkbox" @keypress.enter="checked = !checked">
    <transition name="checkbox" mode="out-in">
      <span class="checkbox__icon" :key="checked">
        <i v-if="checked" class="material-icons checked">
          check_circle_outline
        </i>
        <i v-else class="material-icons">
          panorama_fish_eye
        </i>
      </span>
    </transition>

    <input class="checkbox__input" type="checkbox" v-model="checked" />
  </label>
</template>

<script>
export default {
  name: "AppCheckbox",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.checkbox {
  position: relative;
  width: 36px;
  height: 36px;
  cursor: pointer;
  user-select: none;
  & * {
    & {
      color: $main-blue;
    }
    &.checked {
      color: $main-green;
    }
  }

  &:focus-within {
    outline: 1px solid $main-blue;
  }

  &__icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 24px;
    height: 24px;
    margin: auto;
    flex-grow: 1;
  }

  &__input {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
