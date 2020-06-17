<template>
  <div class="new-note" @click="handleClick">
    Create new note
    <i class="material-icons">add_circle_outline</i>
  </div>
</template>

<script>
export default {
  name: "NewNoteButton",
  methods: {
    handleClick() {
      this.$router.push({ name: "note" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.new-note {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  margin: 16px;
  padding: 16px 8px;
  border-radius: 4px;
  border: 1px dashed $border-color;
  color: $dark-text;
  font-size: 20px;
  font-family: $montserrat;
  opacity: 0.5;
  transition: 0.25s ease;

  cursor: pointer;

  @media (max-width: $breakpoint-phone) {
    margin: 8px;
  }

  .material-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 16px;
    font-size: 72px;
    color: $dark-text;
    transition: 0.25s ease;
  }

  &:hover {
    opacity: 1;
    .material-icons {
      transform: scale(1.1);
      color: $success-color;
    }
  }
}
</style>
