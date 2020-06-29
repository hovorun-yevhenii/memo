<template>
  <modal-wrapper
    class="confirm"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <div class="confirm__title">
      <div v-if="type === 'remove'">
        Remove note
        <span class="confirm__note-name">{{ title }}</span>
        ?
      </div>

      <div v-if="type === 'discard'">
        Discard all changes and go to home page?
      </div>

      <div v-if="type === 'revert'">Revert all changes?</div>

      <div v-if="type === 'leave'">Discard all changes and leave the page?</div>
    </div>
    <div class="confirm__actions">
      <text-button @click="handleCancel" text="cancel" />
      <text-button color="danger" @click="handleConfirm" text="confirm" />
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "./ModalWrapper.vue";
import TextButton from "../TextButton.vue";
import { SHORT_TITLE_LENGTH } from "../../../constants";
import { truncate } from "../../../utils";

export default {
  name: "ConfirmDialog",
  components: {
    ModalWrapper,
    TextButton
  },
  props: {
    note: {
      type: Object
    },
    type: {
      type: String,
      default: "remove"
    },
    onConfirm: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    title() {
      return truncate(this.note.title, SHORT_TITLE_LENGTH);
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleConfirm() {
      this.onConfirm();
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.confirm {
  &__title {
    padding: 16px 0;
    font-size: 20px;
  }

  &__note-name {
    color: $primary-color;
    word-break: break-word;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
