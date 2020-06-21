<template>
  <div>
    <transition-group tag="div" name="list" class="list">
      <new-note-button key="new-note" />

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
import NewNoteButton from "../components/AppNote/NewNoteButton.vue";
import ConfirmModal from "../components/modals/ConfirmModal.vue";
import { mapGetters, mapMutations } from "vuex";
import { REMOVE_NOTE } from "../store/mutation-types";

export default {
  name: "NoteList",
  components: {
    NoteCard,
    NewNoteButton,
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
    ...mapMutations({
      removeNote: REMOVE_NOTE
    }),
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
