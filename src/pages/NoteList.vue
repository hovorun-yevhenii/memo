<template>
  <div>
    <transition-group tag="div" name="list" class="list">
      <new-note key="new-note" />

      <note-view
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </transition-group>

    <confirm-modal
      v-if="showConfirmModal"
      :note="noteToDelete"
      @cancel="closeConfirmModal"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script>
import NoteView from "../components/AppNote/NoteView.vue";
import NewNote from "../components/AppNote/NewNote.vue";
import ConfirmModal from "../components/modals/ConfirmModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NoteList",
  components: {
    NoteView,
      NewNote,
    ConfirmModal
  },
  data() {
    return {
      showConfirmModal: false,
      noteToDelete: null
    };
  },
  computed: {
    ...mapGetters(["notes"])
  },
  methods: {
    ...mapActions(["deleteNote"]),
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
