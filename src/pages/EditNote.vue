<template>
  <div class="form" v-if="note">
    <note-form v-model="note" />

    <button @click="undo" :disabled="!canUndo">undo</button>
    <button @click="redo" :disabled="!canRedo">redo</button>
    <button @click="save" :disabled="true">save</button>
    <button @click="revert" :disabled="true">revert</button>
    <button @click="remove" :disabled="true">remove</button>
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
    ...mapGetters(["getNoteById", "note"])
  },
  watch: {
    note: {
      handler(note, oldValue) {
        if (oldValue) {
          this.$store.dispatch("editNote", note);
        }
      },
      deep: true
    }
  },
  created() {
    this.setNote();
  },
  beforeDestroy() {
    this.$store.dispatch("setNote", null);
  },
  methods: {
    save() {},
    revert() {},
    remove() {},
    setNote() {
      const id = this.$route.params.id;
      const note = id === NEW_NOTE_KEY ? getNoteSchema() : this.getNoteById(id);

      if (note) {
        this.$store.dispatch("setNote", note);
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
