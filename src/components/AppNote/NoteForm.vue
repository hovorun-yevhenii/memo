<template>
  <form class="form">
    <div class="form__title">
      <text-area
        v-model="note.title"
        :max-length="MAX_NOTE_TITLE_LENGTH"
        autofocus
        required
        ref="title"
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
  </form>
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
      MAX_TODO_TEXT_LENGTH,
      rules: {}
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
  },
  methods: {
    validate() {
      return new Promise(resolve => {
        resolve(this.$refs.title.validate());
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.form {
  background-color: $default-bg;
  border: 1px solid $border-color;
  padding: 32px 16px;
  max-width: 500px;
  margin: 0 auto;
  &__title {
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: bold;
  }
  &__todo {
    display: flex;
    margin-bottom: 12px;
  }
  &__todo-checkbox {
    flex-shrink: 0;
  }
  &__todo-text {
    flex-grow: 1;
  }
}
</style>
