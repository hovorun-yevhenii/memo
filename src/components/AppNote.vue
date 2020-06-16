<template>
  <div class="note">
    <div class="note__header">
      <div class="note__title">{{ note.title }}</div>

      <div class="note__actions actions">
        <icon-button class="actions__more" icon="more_horiz" />
        <icon-button
          class="actions__edit"
          icon="create"
          type="success"
          title="Edit"
          @click="handleEdit(note.id)"
        />
        <icon-button
          class="actions__delete"
          icon="delete_outline"
          type="danger"
          title="Delete"
        />
      </div>
    </div>

    <div v-for="(item, index) in note.items" :key="index" class="todo">
      <div class="todo__checkbox">
        <icon-button type="checkbox" :checked="item.checked" />
      </div>
      <div class="todo__text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import IconButton from "../components/IconButton.vue";
export default {
  name: "AppNote",
  components: {
    IconButton
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleEdit(id) {
      this.$router.push({
        name: "note",
        params: { id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/variables";

.note {
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 16px;
  padding: 8px;
  background: $default-bg;
  border: 1px solid $border-color;
  border-radius: 4px;

  @media (max-width: $breakpoint-phone) {
    margin: 8px;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__title {
    padding: 8px;
    font-size: 18px;
    font-family: $montserrat;
    font-weight: bold;
    word-break: break-word;
  }

  &__actions {
    margin-left: 8px;
  }
}

.todo {
  display: flex;
  &__text {
    padding-top: 11px;
    font-size: 14px;
    color: $dark-text;
  }
  &__checkbox {
    margin-right: 4px;
  }
}

.actions {
  position: relative;
  width: 36px;

  & > * {
    position: absolute;
    top: 0;
    transition: 0.25s ease-in-out;
    opacity: 0;
  }

  &__more {
    opacity: 0.7;
  }

  &:hover {
    .actions__more {
      opacity: 0.25;
    }
    .actions__edit {
      opacity: 1;
      top: 36px;
    }
    .actions__delete {
      opacity: 1;
      top: 72px;
    }
  }
}
</style>
