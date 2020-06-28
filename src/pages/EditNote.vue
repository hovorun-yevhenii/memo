<template>
  <form class="form" v-if="note">
    <div class="form__body">
      <div class="form__title">
        <text-area
          v-model="note.title"
          @input="handleChange"
          :max-length="NOTE_TITLE_MAX_LENGTH"
          autofocus
          required
          ref="title"
          placeholder="Type note title here..."
        />
      </div>

      <todo-list v-model="note.todoList" @change="handleChange" />
    </div>

    <form-actions
      :canUndo="canUndo"
      :canRedo="canRedo"
      :canRevert="canRevert"
      :isNewNote="isNewNote"
      @undo="handleUndo"
      @redo="handleRedo"
      @discard="handleDiscard"
      @revert="handleRevert"
      @remove="handleRemove"
      @save="handleSave"
    />

    <confirm-dialog
      v-if="showConfirmDialog"
      :note="note"
      :type="confirmType"
      :on-confirm="onConfirm"
      @cancel="closeConfirmDialog"
    />
  </form>
</template>

<script>
import TodoList from "../components/note/form/TodoList.vue";
import FormActions from "../components/note/form/FormActions.vue";
import TextArea from "../components/common/TextArea.vue";
import ConfirmDialog from "../components/common/modals/ConfirmDialog.vue";

import undoRedo from "../mixins/undoRedo";

import { mapGetters, mapMutations } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import { cloneNote, getNoteSchema } from "../utils";
import { SAVE_NOTE, REMOVE_NOTE } from "../store/mutation-types";
import {
  NOTE_TITLE_MAX_LENGTH,
  TODO_TEXT_MAX_LENGTH,
  TODO_ITEMS_MAX_COUNT
} from "../constants";

export default {
  name: "EditNote",
  components: {
    TodoList,
    FormActions,
    TextArea,
    ConfirmDialog
  },
  mixins: [undoRedo],
  data() {
    return {
      note: {},
      confirmType: "",
      onConfirm: null,
      showConfirmDialog: false,
      NOTE_TITLE_MAX_LENGTH,
      TODO_TEXT_MAX_LENGTH,
      TODO_ITEMS_MAX_COUNT
    };
  },
  computed: {
    ...mapGetters(["getNoteById"]),
    isNewNote() {
      return this.$route.params.id === NEW_NOTE_KEY;
    },
    canRevert() {
      return true;
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

    handleDiscard() {
      this.confirmType = "discard";
      this.showConfirmDialog = true;

      this.onConfirm = () => {
        this.closeConfirmDialog();
        this.navigateToList();
      };
    },
    handleRevert() {
      this.confirmType = "revert";
      this.showConfirmDialog = true;

      this.onConfirm = () => {
        this.closeConfirmDialog();
        this.done = [];
      };
    },

    handleSave() {
      const isValid = this.$refs.title.validate();

      if (isValid) {
        this.saveNote(this.note);
        this.navigateToList();
      }
    },

    handleRemove() {
      this.confirmType = "remove";
      this.showConfirmDialog = true;

      this.onConfirm = () => {
        this.removeNote(this.note.id);
        this.closeConfirmDialog();
        this.navigateToList();
      };
    },

    closeConfirmDialog() {
      this.showConfirmDialog = false;
      this.confirmType = "";
      this.onConfirm = null;
    },

    setNote() {
      const note = this.isNewNote
        ? getNoteSchema()
        : this.getNoteById(this.$route.params.id);

      if (note) {
        this.note = cloneNote(note);
        this.done.push(cloneNote(this.note));
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
}
</style>
