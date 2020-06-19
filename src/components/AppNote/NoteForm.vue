<template>
  <div class="form">
    <input type="text" v-model="note.title" />

    <div v-for="(_, index) in note.items" :key="index">
      <input v-model="note.items[index].checked" type="checkbox" />
      <input
        v-model="note.items[index].text"
        spellcheck="false"
        placeholder="Enter text"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteForm",
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    note: {
      get() {
        return this.value;
      },
      set(note) {
        this.$emit("input", note);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.form {
  padding: 12px;
  background-color: $default-bg;

  input {
    background-color: transparent;
  }
}
</style>
