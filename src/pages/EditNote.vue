<template>
  <div class="edit-note" v-if="note">
    <form class="edit-note__form form">
      <div class="form__title">
        <text-area
          v-model="note.title"
          @input="handleChange"
          :max-length="MAX_NOTE_TITLE_LENGTH"
          autofocus
          required
          ref="title"
          placeholder="Type note title here..."
        />
      </div>

      <div class="form__todo" v-for="(todo, index) in note.items" :key="index">
        <app-checkbox
          class="form__todo-checkbox"
          v-model="todo.checked"
          @input="handleChange"
        />
        <text-area
          class="form__todo-text"
          v-model="todo.text"
          @input="handleChange"
          placeholder="Type todo text here..."
        />
        <icon-button
          icon="close"
          title="Remove item"
          @click="removeTodoItem(index)"
        />
      </div>

      <icon-button
        v-if="note.items.length < MAX_TODO_ITEMS_COUNT"
        class="form__add-todo"
        icon="add_circle_outline"
        title="Add todo item"
        @click="addTodoItem"
      />
    </form>

    <div class="edit-note__actions">
      <div>
        <text-button text="undo" :disabled="!canUndo" @click="handleUndo" />
        <text-button text="redo" :disabled="!canRedo" @click="handleRedo" />
        <text-button color="primary" text="revert" @click="handleRevert" />
      </div>

      <div>
        <text-button
          v-if="!isNewNote"
          color="danger"
          text="delete"
          @click="openConfirmDialog"
        />
        <text-button color="accent" text="save" @click="handleSave" />
      </div>
    </div>

    <confirm-dialog
      v-if="showConfirmDialog"
      :note="note"
      @cancel="closeConfirmDialog"
      @confirm="handleRemove"
    />
  </div>
</template>

<script>
import TextButton from "../components/common/TextButton.vue";
import IconButton from "../components/common/IconButton.vue";
import TextArea from "../components/common/TextArea.vue";
import AppCheckbox from "../components/common/AppCheckbox.vue";
import ConfirmDialog from "../components/common/modals/ConfirmDialog.vue";
import { mapGetters, mapMutations } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import {cloneNote, getNoteSchema, getTodoSchema} from "../utils";
import { SAVE_NOTE, REMOVE_NOTE } from "../store/mutation-types";
import {
  MAX_NOTE_TITLE_LENGTH,
  MAX_TODO_TEXT_LENGTH,
  MAX_TODO_ITEMS_COUNT
} from "../constants";

export default {
  name: "EditNote",
  components: {
    TextButton,
    IconButton,
    TextArea,
    AppCheckbox,
    ConfirmDialog
  },
  data() {
    return {
      note: {},
      history: [],
      showConfirmDialog: false,
      MAX_NOTE_TITLE_LENGTH,
      MAX_TODO_TEXT_LENGTH,
      MAX_TODO_ITEMS_COUNT
    };
  },
  computed: {
    ...mapGetters(["getNoteById"]),
    isNewNote() {
      return this.$route.params.id === NEW_NOTE_KEY;
    },
    canUndo() {
      return this.history.length;
    },
    canRedo() {
      return false;
    }
  },
  created() {
    this.setNote();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    ...mapMutations({
      saveNote: SAVE_NOTE,
      removeNote: REMOVE_NOTE
    }),
    handleChange() {
      this.history.push(cloneNote(this.note));
    },
    handleUndo() {
      this.note = this.history.pop();
    },
    handleRedo() {},
    handleSave() {
      const isValid = this.$refs.title.validate();

      if (isValid) {
        this.saveNote(this.note);
        this.navigateToList();
      }
    },
    handleRevert() {},
    handleRemove() {
      this.removeNote(this.note.id);
      this.closeConfirmDialog();
      this.navigateToList();
    },
    openConfirmDialog() {
      this.showConfirmDialog = true;
    },
    closeConfirmDialog() {
      this.showConfirmDialog = false;
    },
    setNote() {
      const note = this.isNewNote
        ? getNoteSchema()
        : this.getNoteById(this.$route.params.id);

      if (note) {
        this.note = cloneNote({ ...note, version: 1 });
      } else {
        this.navigateToList();
      }
    },
    addTodoItem() {
      this.note.items.push(getTodoSchema());
      this.$emit("change");
    },
    removeTodoItem(index) {
      this.note.items.splice(index, 1);
      this.$emit("change");
    },
    navigateToList() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables";
@import "../style/mixins";

.edit-note {
  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 500px;
    padding: 32px 0;
    margin: 0 auto;
    * {
      margin: 8px 8px 0 8px;
    }
  }
}

.form {
  background-color: $default-bg;
  border: 1px solid $border-color;
  max-width: $breakpoint-phone;
  margin: 48px auto 0;
  padding: 32px 16px 16px;
  box-sizing: border-box;
  &__title {
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: bold;
  }
  &__todo {
    display: flex;
    margin-bottom: 10px;
  }
  &__todo-checkbox {
    flex-shrink: 0;
  }
  &__todo-text {
    flex-grow: 1;
  }
  &__add-todo {
    width: 34px;
  }

  @media (max-width: $breakpoint-phone) {
    margin: 0;
    border-top: none;
    border-right: none;
    border-left: none;
  }
}
</style>
