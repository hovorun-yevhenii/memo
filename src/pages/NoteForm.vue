<template>
  <div class="form">
    <input type="text" v-model="editingNote.title" />
    <div>title: {{ editingNote.title }}</div>

    <div>redo: {{ canRedo }}</div>
    <div>undo: {{ canUndo }}</div>

    <div v-for="(item, index) in editingNote.items" :key="index">
      <input v-model="item.checked" type="checkbox" />
      <input v-model="item.text" spellcheck="false" placeholder="Enter text" />
    </div>

    <button @click="undo" :disabled="!canUndo">undo</button>
    <button @click="redo" :disabled="!canRedo">redo</button>
  </div>
</template>

<script>
import undoRedo from "../mixins/undoRedo";
import { mapGetters } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import { getNoteSchema } from "../utils";

export default {
  name: "NoteForm",
  mixins: [undoRedo],
  computed: {
    ...mapGetters(["getNoteById", "editingNote"])
  },
  watch: {
    editingNote: {
      handler(note) {
        this.$store.dispatch("updateEditingNote", note);
      },
      deep: true
    }
  },
  created() {
    this.setEditingNote();
  },
  methods: {
    setEditingNote() {
      const id = this.$route.params.id;
      const note = id === NEW_NOTE_KEY ? getNoteSchema() : this.getNoteById(id);

      if (note) {
        this.$store.dispatch("setEditingNote", note);
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

.form {
  padding: 32px;

  input {
    background-color: transparent;
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

  @media (max-width: $breakpoint-phone) {
    padding: 16px;
  }
}
</style>
