<template>
  <!--    add_circle_outline-->
  <!--    delete_outline-->
  <!--    create === edit-->
  <!--    save-->
  <!--    undo-->
  <!--    redo-->
  <!--    more_horiz-->
  <button class="icon-button" :class="type" :title="title" @click="handleClick">
    <i v-if="isCheckbox && checked" class="material-icons">
      check_circle_outline
    </i>
    <i v-if="isCheckbox && !checked" class="material-icons">
      panorama_fish_eye
    </i>
    <i v-else class="material-icons">{{ icon }}</i>
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String
    },
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "default"
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCheckbox() {
      return this.type === "checkbox";
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
  &.default *,
  &.checkbox * {
    color: $main-blue;
  }
  &.danger * {
    color: $danger-color;
  }
  &.success * {
    color: $success-color;
  }
  &:hover {
    background-color: rgba(black, 0.7);
  }
}
</style>
