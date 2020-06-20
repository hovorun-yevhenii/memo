<template>
  <div class="edit-note" v-if="editingNote">
    <note-form v-model="editingNote" />

    <button @click="handleUndo" :disabled="!canUndo">undo</button>
    <button @click="handleRedo" :disabled="!canRedo">redo</button>
    <button @click="handleSave" :disabled="true">save</button>
    <button @click="handleRevert" :disabled="true">revert</button>
    <button @click="handleRemove">remove</button>
  </div>
</template>

<script>
import NoteForm from "../components/AppNote/NoteForm.vue";
import undoRedo from "../mixins/undoRedo";
import { mapGetters } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import { getNoteSchema } from "../utils";

export default {
  name: "EditNote",
  mixins: [undoRedo],
  components: {
    NoteForm
  },
  computed: {
    ...mapGetters(["getNoteById", "editingNote"])
  },
  watch: {
    editingNote: {
      handler(note, oldValue) {
        if (oldValue) {
          this.$store.commit("EDIT_NOTE", note);
        }
      },
      deep: true
    }
  },
  created() {
    this.setNote();
  },
  beforeDestroy() {
    this.$store.commit("SET_EDITING_NOTE", null);
  },
  methods: {
    handleSave() {},
    handleRevert() {},
    handleRemove() {},
    setNote() {
      const id = this.$route.params.id;
      const note = id === NEW_NOTE_KEY ? getNoteSchema() : this.getNoteById(id);

      if (note) {
        this.$store.commit("SET_EDITING_NOTE", note);
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/variables";
@import "../style/mixins";

.edit-note {
  padding: 32px;
  margin: 32px 0;
  background-color: $default-bg;
  border: 1px solid $border-color;

  button {
    @include empty-button;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid $border-color;
    &:disabled {
      opacity: 0.3;
    }
  }

  @media (max-width: $breakpoint-desktop) {
    padding: 8px;
    margin: 0;
    border: none;
  }
}
</style>
