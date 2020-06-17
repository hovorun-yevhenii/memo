<template>
  <div class="note" :class="{ 'note--editable': isEditable }">
    <div class="note__header">
      <div class="note__title">{{ note.title }}</div>

      <view-mode-actions
        v-if="!isEditable"
        :note="note"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <div v-for="(item, index) in itemsToDisplay" :key="index" class="todo">
      <div class="todo__checkbox">
        <icon-button type="checkbox" :checked="item.checked" />
      </div>
      <div class="todo__text">{{ item.text }}</div>
    </div>
    <div v-if="restItemsCount" class="todo__rest">
      and {{ restItemsCount }} more
    </div>
  </div>
</template>

<script>
import IconButton from "../IconButton.vue";
import ViewModeActions from "../AppNote/ViewModeActions.vue";
import { LIST_VIEW_ITEMS_COUNT } from "../../constants";

export default {
  name: "AppNote",
  components: {
    IconButton,
    ViewModeActions
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemsToDisplay() {
      const limit = this.isEditable
        ? this.note.items.length
        : LIST_VIEW_ITEMS_COUNT;

      return this.note.items.slice(0, limit);
    },
    restItemsCount() {
      return this.note.items.length - this.itemsToDisplay.length;
    }
  },
  methods: {
    handleEdit(note) {
      this.$emit("edit", note);
    },
    handleDelete(note) {
      this.$emit("delete", note);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.note {
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 16px;
  padding: 8px;
  background: $default-bg;
  border: 1px solid $border-color;
  border-radius: 4px;
  pointer-events: none;

  &--editable {
    pointer-events: auto;
  }

  @media (max-width: $breakpoint-phone) {
    margin: 8px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__title {
    padding: 8px;
    font-size: 18px;
    font-family: $montserrat;
    font-weight: bold;
    word-break: break-word;
  }

  &__actions {
    margin-left: 8px;
  }
}

.todo {
  display: flex;
  &__text {
    padding-top: 11px;
    font-size: 14px;
    color: $dark-text;
  }
  &__checkbox {
    margin-right: 4px;
  }
  &__rest {
    font-size: 12px;
    padding: 8px 40px;
    color: $dark-text;
    opacity: 0.7;
  }
}
</style>
