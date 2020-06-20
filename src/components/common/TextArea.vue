<template>
  <div
    contenteditable="true"
    spellcheck="false"
    v-once
    v-text="value"
    @input="handleInput"
  ></div>
</template>

<script>
export default {
  name: "TextArea",
  props: {
    value: {
      type: String,
      default: ""
    },
    maxLength: {
      type: Number,
      default: 5
    }
  },
  watch: {
    value(newValue) {
      if (document.activeElement !== this.$el) {
        this.$el.innerHTML = newValue;
      }
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
        range.setStart(this.$el.childNodes[0], position - 1);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (_) {
        this.$el.blur();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/variables";

div {
  max-width: 100px;
  outline: 1px dashed;
  &:focus {
    outline: 1px solid;
  }
}
</style>
