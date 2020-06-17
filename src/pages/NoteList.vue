<template>
  <div>
    <transition-group tag="div" name="list" class="list">
      <new-note-button key="new-note" />

      <app-note
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :is-editable="false"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </transition-group>

    <confirm-modal
      key="modal"
      v-if="showConfirmModal"
      :note="noteToDelete"
      @cancel="closeConfirmModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import AppNote from "../components/AppNote/AppNote.vue";
import NewNoteButton from "../components/AppNote/NewNoteButton.vue";
import ConfirmModal from "../components/modals/ConfirmModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NoteList",
  components: {
    AppNote,
    NewNoteButton,
    ConfirmModal
  },
  data() {
    return {
      showConfirmModal: false,
      noteToDelete: null
    };
  },
  computed: {
    ...mapGetters({
      notes: "getNotes"
    })
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    ...mapActions(["fetchNotes", "deleteNote"]),
    handleEdit({ id }) {
      this.$router.push({
        name: "note",
        params: { id }
      });
    },
    handleDelete(note) {
      this.noteToDelete = note;
      this.showConfirmModal = true;
    },
    confirmDelete() {
      this.deleteNote(this.noteToDelete);
      this.closeConfirmModal();
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      this.noteToDelete = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/variables";

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 32px 0;

  @media (max-width: $breakpoint-phone) {
    padding: 16px 0;
  }
}
</style>
