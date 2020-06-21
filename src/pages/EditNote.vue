<template>
  <div class="edit-note" v-if="note">
    <note-form class="edit-note__form" v-model="note" />

    <div class="edit-note__actions">
      <text-button
        type="default"
        text="undo"
        :disabled="!canUndo"
        @click="handleUndo"
      />

      <text-button
        type="default"
        text="redo"
        :disabled="!canRedo"
        @click="handleRedo"
      />

      <text-button
        type="default"
        text="save"
        :disabled="true"
        @click="handleSave"
      />

      <text-button
        type="default"
        text="revert"
        :disabled="true"
        @click="handleRevert"
      />

      <text-button type="danger" text="remove" @click="handleRemove" />
    </div>
  </div>
</template>

<script>
import NoteForm from "../components/AppNote/NoteForm.vue";
import TextButton from "../components/common/TextButton.vue";
import undoRedo from "../mixins/undoRedo";
import { mapGetters } from "vuex";
import { NEW_NOTE_KEY } from "../constants";
import { getNoteSchema } from "../utils";

export default {
  name: "EditNote",
  mixins: [undoRedo],
  components: {
    NoteForm,
    TextButton
  },
  computed: {
    ...mapGetters({
      getNoteById: "getNoteById",
      note: "editingNote"
    })
  },
  watch: {
    note: {
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
    margin-right: 16px;
    border-radius: 4px;
    border: 1px solid $border-color;
    &:disabled {
      opacity: 0.3;
    }
  }

  @media (max-width: $breakpoint-desktop) {
    padding: 32px 16px;
    margin: 0;
    border: none;
  }
}
</style>
