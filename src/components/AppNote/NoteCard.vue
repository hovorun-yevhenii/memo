<template>
  <div class="note">
    <div class="note__header">
      <div class="note__title">{{ note.title }}</div>

      <note-card-actions
        :note="note"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </div>

    <div v-for="(item, index) in itemsToDisplay" :key="index" class="todo">
      <app-checkbox class="todo__checkbox" v-model="item.checked" />
      <div class="todo__text">{{ item.text }}</div>
    </div>
    <div v-if="restItemsCount" class="todo__rest">
      and {{ restItemsCount }} more
    </div>
  </div>
</template>

<script>
import AppCheckbox from "../common/AppCheckbox.vue";
import NoteCardActions from "./NoteCardActions.vue";
import { LIST_VIEW_ITEMS_COUNT } from "../../constants";

export default {
  name: "NoteCard",
  components: {
    AppCheckbox,
    NoteCardActions
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  computed: {
    itemsToDisplay() {
      return this.note.items.slice(0, LIST_VIEW_ITEMS_COUNT);
    },
    restItemsCount() {
      return this.note.items.length - this.itemsToDisplay.length;
    }
  },
  methods: {
    handleEdit(note) {
      this.$emit("edit", note);
    },
    handleRemove(note) {
      this.$emit("remove", note);
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
    word-break: break-word;
  }
  &__checkbox {
    flex-shrink: 0;
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
