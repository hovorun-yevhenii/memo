<template>
  <div class="actions">
    <div>
      <icon-button
        icon="undo"
        color="primary"
        title="Undo"
        :disabled="!canUndo"
        @click="$emit('undo')"
      />
      <text-button
        class="actions__revert"
        text="revert"
        :disabled="!canRevert"
        @click="$emit('revert')"
      />
      <icon-button
        icon="redo"
        color="primary"
        title="Redo"
        :disabled="!canRedo"
        @click="$emit('redo')"
      />
    </div>

    <div class="space-evenly">
      <text-button
        v-if="!isNewNote"
        color="danger"
        text="delete"
        @click="$emit('remove')"
      />
      <text-button text="discard" @click="$emit('discard')" />
      <text-button color="accent" text="save" @click="$emit('save')" />
    </div>
  </div>
</template>

<script>
import { TextButton, IconButton } from "../../common";

export default {
  name: "FormActions",
  components: {
    TextButton,
    IconButton
  },
  props: ["canUndo", "canRedo", "canRevert", "isNewNote"]
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 320px;
  padding: 32px 0;
  margin: 0 auto;
  &__revert {
    margin: 16px;
  }
  > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .space-evenly {
    justify-content: space-evenly;
  }
}
</style>
