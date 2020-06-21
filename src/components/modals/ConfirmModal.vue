<template>
  <modal-wrapper
    class="confirm"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <div class="confirm__title">
      Remove note
      <span class="confirm__note-name">{{ note.title }}</span>
      ?
    </div>
    <div class="confirm__actions">
      <text-button @click="handleCancel" text="cancel" />
      <text-button color="danger" @click="handleConfirm" text="confirm" />
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "./ModalWrapper.vue";
import TextButton from "../common/TextButton.vue";

export default {
  name: "ConfirmModal",
  components: {
    ModalWrapper,
    TextButton
  },
  props: {
    note: {
      type: Object
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleConfirm() {
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.confirm {
  &__title {
    padding: 16px 0;
    font-size: 20px;
  }

  &__note-name {
    color: $primary-color;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
