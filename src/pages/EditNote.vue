<template>
  <div class="edit-note" v-if="note">
    <note-form class="edit-note__form" ref="form" v-model="note" />

    <div class="edit-note__actions">
      <div>
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

        <text-button type="primary" text="revert" @click="handleRevert" />
      </div>

      <div>
        <text-button type="danger" text="delete" @click="handleRemove" />
        <text-button type="accent" text="save" @click="handleSave" />
      </div>
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
    handleSave() {
      this.$refs.form.validate().then(isValid => {
        console.log(isValid);
      });
    },
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
  margin: 32px 0;

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 500px;
    padding: 32px 0;
    margin: 0 auto;
    * {
      margin: 8px;
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

  @media (max-width: $breakpoint-desktop) {
    margin: 0;
    border: none;
  }
}
</style>
