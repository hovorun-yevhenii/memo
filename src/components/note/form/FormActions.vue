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

    <div>
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
import TextButton from "../../common/TextButton.vue";
import IconButton from "../../common/IconButton.vue";

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
  max-width: 288px;
  padding: 32px 0;
  margin: 0 auto;
  * {
    margin: 8px 8px 0 8px;
    display: flex;
    justify-content: center;
  }
}
</style>
