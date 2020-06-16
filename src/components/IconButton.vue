<template>
  <!--    add_circle_outline-->
  <!--    check_circle_outline-->
  <!--    panorama_fish_eye === checked-->
  <!--    delete_outline-->
  <!--    create === edit-->
  <!--    save-->
  <!--    undo-->
  <!--    redo-->
  <button class="icon-button" :class="type" :title="title" @click="handleClick">
    <i class="material-icons">{{ icon }}</i>
  </button>
</template>

<script>
export default {
  name: "IconButton",
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "Click"
    },
    type: {
      type: String,
      default: "default"
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
@import "../style/global";

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.35s;
  &.default * {
    color: $main-blue;
  }
  &.danger * {
    color: $danger-color;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgba(black, 0.7);
  }
}
</style>
