<template>
  <div class="actions">
    <div class="actions__wrapper">
      <icon-button class="actions__more" icon="more_horiz" />
      <icon-button
        class="actions__edit"
        icon="create"
        type="success"
        title="Edit"
        @click="handleEdit"
      />
      <icon-button
        class="actions__delete"
        icon="delete_outline"
        type="danger"
        title="Delete"
        @click="handleDelete"
      />
    </div>
  </div>
</template>

<script>
import IconButton from "../buttons/IconButton.vue";
export default {
  name: "ViewModeActions",
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
    handleDelete() {
      this.$emit("delete", this.note);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

$padding: 18px;

.actions {
  position: relative;
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

  &:hover & {
    &__more {
      opacity: 0.5;
    }
    &__edit {
      opacity: 1;
      top: $padding * 3;
    }
    &__delete {
      opacity: 1;
      top: $padding * 5;
    }
    &__wrapper {
      height: $padding * 8;
    }
  }
}
</style>
