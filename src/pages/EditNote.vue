<template>
  <form class="form" v-if="note">
    <div class="form__body">
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

      <todo-list v-model="note.todoList" @change="handleChange" />
    </div>

    <div class="form__actions">
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
  </form>
</template>

<script>
import TodoList from "../components/note/form/TodoList.vue";
import TextButton from "../components/common/TextButton.vue";
import TextArea from "../components/common/TextArea.vue";
import ConfirmDialog from "../components/common/modals/ConfirmDialog.vue";
import { mapGetters, mapMutations } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import { cloneNote, getNoteSchema } from "../utils";
import { SAVE_NOTE, REMOVE_NOTE } from "../store/mutation-types";
import {
  MAX_NOTE_TITLE_LENGTH,
  MAX_TODO_TEXT_LENGTH,
  MAX_TODO_ITEMS_COUNT
} from "../constants";

export default {
  name: "EditNote",
  components: {
    TodoList,
    TextButton,
    TextArea,
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
        this.note = cloneNote(note);
      } else {
        this.navigateToList();
      }
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

.form {
  &__body {
    background-color: $default-bg;
    border: 1px solid $border-color;
    max-width: $breakpoint-phone;
    margin: 48px auto 0;
    padding: 32px 16px 16px;
    box-sizing: border-box;

    @media (max-width: $breakpoint-phone) {
      margin: 0;
      border-top: none;
      border-right: none;
      border-left: none;
    }
  }
  &__title {
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: bold;
  }
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
</style>
