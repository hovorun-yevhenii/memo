<template>
  <label class="checkbox">
    <transition name="checkbox" mode="out-in">
      <span :key="checked">
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

  &__input {
    display: none;
  }
}
</style>
