<template>
  <div class="list">
    <empty-box v-if="!notes.length" />

    <template v-if="notes.length">
      <app-note v-for="note in notes" :key="note.id" :note="note" />
    </template>
  </div>
</template>

<script>
import EmptyBox from "../components/EmptyBox.vue";
import AppNote from "../components/AppNote.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NoteList",
  components: {
    EmptyBox,
    AppNote
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
    ...mapActions(["fetchNotes"])
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
