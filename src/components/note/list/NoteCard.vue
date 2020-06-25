<template>
  <div class="note">
    <div class="note__header">
      <div class="note__title">{{ title }}</div>

      <note-card-actions
        :note="note"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </div>

    <div v-for="(todo, index) in itemsToDisplay" :key="index" class="todo">
      <app-checkbox class="todo__checkbox" :value="todo.checked" disabled />
      <div class="todo__text">{{ todo.text }}</div>
    </div>
    <div v-if="restItemsCount" class="todo__rest">
      and {{ restItemsCount }} more
    </div>
  </div>
</template>

<script>
import AppCheckbox from "../../common/AppCheckbox.vue";
import NoteCardActions from "./NoteCardActions.vue";
import { truncate } from "../../../utils";
import {
  LIST_VIEW_MAX_TODO_COUNT,
  SHORT_TITLE_LENGTH,
  SHORT_TEXT_LENGTH
} from "../../../constants";

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
      return this.note.todoList
        .slice(0, LIST_VIEW_MAX_TODO_COUNT)
        .map(todo => ({
          ...todo,
          text: truncate(todo.text, SHORT_TEXT_LENGTH)
        }));
    },
    title() {
      return truncate(this.note.title, SHORT_TITLE_LENGTH);
    },
    restItemsCount() {
      return this.note.todoList.length - this.itemsToDisplay.length;
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
@import "../../../style/variables";

.note {
  display: flex;
  flex-direction: column;
  min-height: 124px;
  width: 280px;
  margin: 16px;
  padding: 8px;
  background: $default-bg;
  border: 1px solid $border-color;
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: $breakpoint-phone) {
    margin: 8px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__title {
    width: calc(100% - 32px);
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
    width: calc(100% - 64px);
    padding-top: 9px;
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
