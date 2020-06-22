<template>
  <button class="actions">
    <span class="actions__wrapper">
      <icon-button
        class="actions__more"
        icon="more_horiz"
        color="primary"
        disabled
      />
      <icon-button
        class="actions__edit"
        icon="create"
        color="accent"
        title="Edit"
        @click="handleEdit"
      />
      <icon-button
        class="actions__remove"
        icon="delete_outline"
        color="danger"
        title="Remove"
        @click="handleRemove"
      />
    </span>
  </button>
</template>

<script>
import IconButton from "../common/IconButton.vue";
export default {
  name: "NoteCardActions",
  props: {
    note: {
      type: Object
    }
  },
  components: {
    IconButton
  },
  methods: {
    handleEdit() {
      this.$emit("edit", this.note);
    },
    handleRemove() {
      this.$emit("remove", this.note);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";
@import "../../style/mixins";

$padding: 18px;

.actions {
  @include empty-button;
  position: relative;
  top: 3px;
  width: 36px;
  height: 34px;
  pointer-events: auto;

  &__wrapper {
    position: absolute;
    top: -$padding;
    right: -$padding;
    width: calc(100% + #{$padding} * 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * {
      position: absolute;
      top: 0;
      margin: auto;
      opacity: 0;
      transition: $transition-duration ease-in-out;
    }
  }

  &__more {
    top: $padding;
    opacity: 1;
    z-index: 1;
  }

  &:hover &,
  &:focus &,
  &:focus-within & {
    &__more:hover {
      background-color: transparent;
    }
    &__edit {
      opacity: 1;
      top: $padding * 3;
    }
    &__remove {
      opacity: 1;
      top: $padding * 5;
    }
    &__wrapper {
      height: $padding * 8;
    }
  }
}
</style>
