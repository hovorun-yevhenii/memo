<template>
  <div class="form">
    <input type="text" v-model="tempNote.title" />
    <div>title: {{ tempNote.title }}</div>

    <div>redo: {{ canRedo }}</div>
    <div>undo: {{ canUndo }}</div>

    <div v-for="(item, index) in tempNote.items" :key="index">
      <input v-model="item.checked" type="checkbox" />
      <input v-model="item.text" spellcheck="false" placeholder="Enter text" />
    </div>

    <button @click="handleUndo" :disabled="!canUndo">undo</button>
    <button @click="handleRedo" :disabled="!canRedo">redo</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_NOTE_SCHEMA, NEW_NOTE_KEY } from "../constants";

export default {
  name: "NoteForm",
  computed: {
    ...mapGetters(["getNoteById", "tempNote"])
  },
  watch: {
    tempNote: {
      handler(note) {
        this.$store.dispatch("updateTempNote", note);
      },
      deep: true
    }
  },
  created() {
    const id = this.$route.params.id;
    const note = id === NEW_NOTE_KEY ? GET_NOTE_SCHEMA() : this.getNoteById(id);

    if (note) {
      this.$store.dispatch("setTempNote", note);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    handleUndo() {
      this.undo();
    },
    handleRedo() {
      this.redo();
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
