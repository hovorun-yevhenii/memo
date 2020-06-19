<template>
  <transition name="modal" appear>
    <div class="modal" @click.self="handleClick">
      <transition name="dialog" appear>
        <div class="modal__body">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { KEYBOARD_CODES } from "../../constants";

export default {
  name: "ModalWrapper",
  data() {
    return {
      boundKeyHandler: this.handleKeyPress.bind(this)
    };
  },
  created() {
    const { innerWidth } = window;
    const { body, documentElement: html } = document;
    const scrollbarWidth = innerWidth - html.clientWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbarWidth}px`;

    document.addEventListener("keydown", this.boundKeyHandler);
  },
  destroyed() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    document.removeEventListener("keydown", this.boundKeyHandler);
  },
  methods: {
    handleClick() {
      this.$emit("cancel");
    },
    handleKeyPress({ keyCode }) {
      switch (keyCode) {
        case KEYBOARD_CODES.enter:
          this.$emit("confirm");
          break;
        case KEYBOARD_CODES.escape:
          this.$emit("cancel");
          break;
        default:
          return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  padding: 8px;
  background-color: rgba(black, 0.8);

  &__body {
    padding: 16px 32px;
    border-radius: 4px;
    border: 1px solid $border-color;
    background-color: $default-bg;
    margin: auto;
  }
}
</style>
