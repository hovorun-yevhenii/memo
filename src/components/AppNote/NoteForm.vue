<template>
  <div class="form">
    <div class="form__title">
      <text-area v-model="note.title" :max-length="MAX_NOTE_TITLE_LENGTH" />
    </div>

    <div class="form__todo" v-for="(_, index) in note.items" :key="index">
      <app-checkbox
        class="form__todo-checkbox"
        v-model="note.items[index].checked"
      />
      <text-area
        class="form__todo-text"
        v-model="note.items[index].text"
        :max-length="MAX_TODO_TEXT_LENGTH"
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
}
</style>
