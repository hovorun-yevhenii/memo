<template>
  <div class="edit-note" v-if="note">
    <note-form
      class="edit-note__form"
      ref="form"
      v-model="note"
      @change="handleChange"
    />

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
import NoteForm from "../components/note/NoteForm.vue";
import TextButton from "../components/common/TextButton.vue";
import ConfirmDialog from "../components/common/modals/ConfirmDialog.vue";
import { mapGetters, mapMutations } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import { cloneNote, getNoteSchema } from "../utils";
import { SAVE_NOTE, REMOVE_NOTE } from "../store/mutation-types";

export default {
  name: "EditNote",
  components: {
    NoteForm,
    TextButton,
    ConfirmDialog
  },
  data() {
    return {
      note: {},
      history: [],
      showConfirmDialog: false
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
      this.$refs.form.validate().then(isValid => {
        if (isValid) {
          this.saveNote(this.note);
          this.navigateToList();
        }
      });
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
</style>
