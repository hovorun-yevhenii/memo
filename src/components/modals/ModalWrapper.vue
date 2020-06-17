<template>
  <transition name="modal" appear>
    <div class="modal" @click.self="handleClick">
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalWrapper",
  created() {
    const { innerWidth } = window;
    const { body, documentElement: html } = document;
    const scrollbarWidth = innerWidth - html.clientWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbarWidth}px`;
  },
  destroyed() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
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
