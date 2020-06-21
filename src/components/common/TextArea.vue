<template>
  <div class="text-area" :class="{ 'text-area--empty': value.length === 0 }">
    <div
      contenteditable="true"
      spellcheck="false"
      class="text-area__field"
      ref="input"
      v-once
      v-text="value"
      :data-placeholder="placeholder"
      @input="handleInput"
    ></div>
    <div class="text-area__count">{{ value.length }}/{{ maxLength }}</div>
  </div>
</template>

<script>
import { MAX_TODO_TEXT_LENGTH } from "../../constants";

export default {
  name: "TextArea",
  props: {
    value: {
      type: String,
      default: ""
    },
    maxLength: {
      type: Number,
      default: MAX_TODO_TEXT_LENGTH
    },
    placeholder: {
      type: String,
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newValue) {
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.innerHTML = newValue;
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
        this.setCaretPosition(this.value.length + 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

.text-area {
  display: flex;
  align-items: flex-end;

  &__field {
    flex-grow: 1;
    padding: 7px 9px;
    margin-right: 44px;
    border: 1px solid transparent;
    border-radius: 4px;
    line-height: 1.3;
    transition: border $transition-duration / 2;
    &:hover {
      border: 1px dashed $border-color;
    }
    &:focus {
      outline: none;
      border: 1px solid $main-blue;
      margin-right: 4px;
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
    display: none;
    flex-shrink: 0;
    width: 40px;
    font-size: 10px;
    color: $dark-text;
    font-weight: 400;
  }

  &__field:focus ~ &__count {
    display: block;
  }
}
</style>
