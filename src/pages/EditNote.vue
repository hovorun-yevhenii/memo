<template>
  <div class="edit-note" v-if="note">
    <note-form class="edit-note__form" ref="form" v-model="note" />

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

    <confirm-modal
      v-if="showConfirmModal"
      :note="note"
      @cancel="closeConfirmDialog"
      @confirm="handleRemove"
    />
  </div>
</template>

<script>
import NoteForm from "../components/AppNote/NoteForm.vue";
import TextButton from "../components/common/TextButton.vue";
import ConfirmModal from "../components/modals/ConfirmModal.vue";
import undoRedo from "../mixins/undoRedo";
import { mapGetters, mapMutations } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import { getNoteSchema } from "../utils";
import {
  UPDATE_NOTE,
  SET_EDITING_NOTE,
  SAVE_NOTE,
  REMOVE_NOTE
} from "../store/mutation-types";

export default {
  name: "EditNote",
  mixins: [undoRedo],
  components: {
    NoteForm,
    TextButton,
    ConfirmModal
  },
  data() {
    return {
      showConfirmModal: false
    };
  },
  computed: {
    ...mapGetters({
      getNoteById: "getNoteById",
      note: "editingNote"
    }),
    isNewNote() {
      return this.$route.params.id === NEW_NOTE_KEY;
    }
  },
  watch: {
    note: {
      handler(note, oldValue) {
        if (oldValue) {
          this.updateNote(note);
        }
      },
      deep: true
    }
  },
  created() {
    this.setNote();
  },
  beforeDestroy() {
    this.setEditingNote(null);
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  methods: {
    ...mapMutations({
      setEditingNote: SET_EDITING_NOTE,
      updateNote: UPDATE_NOTE,
      saveNote: SAVE_NOTE,
      removeNote: REMOVE_NOTE
    }),
    handleSave() {
      this.$refs.form.validate().then(isValid => {
        if (isValid) {
          this.saveNote();
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
      this.showConfirmModal = true;
    },
    closeConfirmDialog() {
      this.showConfirmModal = false;
    },
    setNote() {
      const note = this.isNewNote
        ? getNoteSchema()
        : this.getNoteById(this.$route.params.id);

      if (note) {
        this.setEditingNote(note);
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
    button {
      @include empty-button;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid $border-color;
      &:disabled {
        opacity: 0.3;
      }
    }
  }

  @media (max-width: $breakpoint-phone) {
  }
}
</style>
