<template>
  <div class="note__actions actions">
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

.actions {
  position: relative;
  width: 36px;
  pointer-events: auto;

  & > * {
    position: absolute;
    top: 0;
    transition: 0.25s ease-in-out;
    opacity: 0;
  }

  &__more {
    opacity: 0.7;
  }

  &:hover {
    .actions__more {
      opacity: 0.25;
    }
    .actions__edit {
      opacity: 1;
      top: 36px;
    }
    .actions__delete {
      opacity: 1;
      top: 72px;
    }
  }
}
</style>
