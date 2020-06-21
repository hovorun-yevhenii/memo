<template>
  <div class="form">
    <div class="form__title">
      <text-area
        v-model="note.title"
        :max-length="MAX_NOTE_TITLE_LENGTH"
        autofocus
        placeholder="Type note title here..."
      />
    </div>

    <div class="form__todo" v-for="(_, index) in note.items" :key="index">
      <app-checkbox
        class="form__todo-checkbox"
        v-model="note.items[index].checked"
      />
      <text-area
        class="form__todo-text"
        v-model="note.items[index].text"
        placeholder="Type todo text here..."
      />
    </div>
  </div>
</template>

<script>
import AppCheckbox from "../common/AppCheckbox";
import TextArea from "../common/TextArea";
import { MAX_NOTE_TITLE_LENGTH, MAX_TODO_TEXT_LENGTH } from "../../constants";
import { getNoteSchema } from "../../utils";

export default {
  name: "NoteForm",
  components: {
    AppCheckbox,
    TextArea
  },
  props: {
    value: {
      type: Object,
      default: getNoteSchema()
    }
  },
  data() {
    return {
      MAX_NOTE_TITLE_LENGTH,
      MAX_TODO_TEXT_LENGTH
    };
  },
  computed: {
    note: {
      get() {
        return this.value;
      },
      set(note) {
        this.$emit("input", note);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.form {
  margin-bottom: 32px;
  &__title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
  }
  &__todo {
    display: flex;
  }
  &__todo-checkbox {
    flex-shrink: 0;
  }
  &__todo-text {
    flex-grow: 1;
  }
}
</style>
