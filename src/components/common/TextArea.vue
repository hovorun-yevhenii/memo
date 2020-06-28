<template>
  <div
    :class="{
      'text-area': true,
      'text-area--empty': value.length === 0,
      'text-area--has-error': hasError
    }"
  >
    <div
      contenteditable="true"
      spellcheck="false"
      class="text-area__field"
      :data-placeholder="placeholder"
      ref="input"
      v-once
      v-text="value"
      v-on="required ? { focus: handleFocus } : {}"
      @input="handleInput"
    ></div>
    <div class="text-area__count">{{ value.length }}/{{ maxLength }}</div>
    <transition name="dialog">
      <div v-if="hasError" class="text-area__error">Field is required</div>
    </transition>
  </div>
</template>

<script>
import { TODO_TEXT_MAX_LENGTH } from "../../constants";

export default {
  name: "TextArea",
  props: {
    value: {
      type: String,
      default: ""
    },
    maxLength: {
      type: Number,
      default: TODO_TEXT_MAX_LENGTH
    },
    placeholder: {
      type: String,
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasError: false
    };
  },
  watch: {
    value(newValue) {
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.textContent = newValue;
      }
    }
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus();
      this.setCaretPosition(this.value.length + 1);
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.textContent;

      if (value.length > this.maxLength) {
        const caretPosition = this.getCaretPosition();

        event.target.textContent = this.value;
        this.setCaretPosition(caretPosition);
      } else {
        this.$emit("input", value);
      }
    },
    handleFocus() {
      this.hasError = false;
    },
    validate() {
      this.hasError = this.value.length === 0;

      return !this.hasError;
    },
    getCaretPosition() {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      return range.endOffset;
    },
    setCaretPosition(position) {
      const range = document.createRange();
      const selection = window.getSelection();

      try {
        range.setStart(this.$refs.input.childNodes[0], position - 1);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (_) {
        this.$refs.input.focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.text-area {
  position: relative;
  display: flex;
  align-items: flex-end;

  &__field {
    flex-grow: 1;
    padding: 7px 9px;
    line-height: 1.3;
    word-break: break-word;
    transition: border $transition-duration / 2;
    cursor: text;
    outline-offset: -1px;
    &:hover {
      outline: 1px dashed $border-color;
    }
    &:focus {
      outline: 1px solid $outline-color;
    }
    &:before {
      display: none;
      content: attr(data-placeholder);
      font-weight: lighter;
      color: $dark-text;
    }
  }

  &--empty & {
    &__field {
      &:before {
        display: block;
      }
    }
  }

  &__count {
    position: absolute;
    top: calc(100% + 1px);
    right: 0;
    visibility: hidden;
    opacity: 0;
    flex-shrink: 0;
    font-size: 10px;
    color: $dark-text;
    font-weight: 400;
    transition: $transition-duration * 2;
  }

  &__field:focus ~ &__count {
    visibility: visible;
    opacity: 1;
  }

  &--has-error &__field {
    outline: 1px solid $danger-color;
    &:hover {
      outline: 1px solid $danger-color;
    }
  }

  &__error {
    position: absolute;
    top: 100%;
    padding: 4px 16px;
    background-color: $danger-color;
    font-weight: 400;
    font-size: 12px;
    z-index: 1;
  }
}
</style>
