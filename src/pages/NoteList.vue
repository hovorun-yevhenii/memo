<template>
  <div>
    <transition-group tag="div" name="list" class="list">
      <new-note-card key="new-note" />

      <note-card
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @edit="handleEdit"
        @remove="handleRemove"
      />
    </transition-group>

    <confirm-modal
      v-if="showConfirmModal"
      :note="noteToRemove"
      @cancel="closeConfirmModal"
      @confirm="confirmRemove"
    />
  </div>
</template>

<script>
import NoteCard from "../components/AppNote/NoteCard.vue";
import NewNoteCard from "../components/AppNote/NewNoteCard.vue";
import ConfirmModal from "../components/modals/ConfirmModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NoteList",
  components: {
    NoteCard,
    NewNoteCard,
    ConfirmModal
  },
  data() {
    return {
      showConfirmModal: false,
      noteToRemove: null
    };
  },
  computed: {
    ...mapGetters(["notes"])
  },
  methods: {
    ...mapActions(["removeNote"]),
    handleEdit({ id }) {
      this.$router.push({
        name: "note",
        params: { id }
      });
    },
    handleRemove(note) {
      this.noteToRemove = note;
      this.showConfirmModal = true;
    },
    confirmRemove() {
      this.removeNote(this.noteToRemove);
      this.closeConfirmModal();
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
      this.noteToRemove = null;
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
