import { cloneNote } from "../utils";
import { CHANGES_STACK_MAX_SIZE, KEYBOARD_CODES } from "../constants";

export default {
  data() {
    return {
      done: [],
      changeCounter: 0,
      boundKeyHandler: this.handleKeydown.bind(this)
    };
  },
  computed: {
    canUndo() {
      return this.done.length > 1 && this.changeCounter !== 0;
    },
    canRedo() {
      return this.changeCounter < this.done.length - 1;
    }
  },
  created() {
    document.addEventListener("keydown", this.boundKeyHandler);
  },
  destroyed() {
    document.removeEventListener("keydown", this.boundKeyHandler);
  },
  methods: {
    handleChange() {
      if (this.done.length >= CHANGES_STACK_MAX_SIZE) {
        this.done = this.done.slice(1);
      }
      this.done.push(cloneNote(this.note));
      this.changeCounter = this.done.length - 1;
    },

    handleUndo() {
      this.changeCounter -= 1;
      this.note = cloneNote(this.done[this.changeCounter]);
    },

    handleRedo() {
      this.changeCounter += 1;
      this.note = cloneNote(this.done[this.changeCounter]);
    },

    handleKeydown(event) {
      if (!KEYBOARD_CODES.z.includes(event.code || event.keyCode)) {
        return;
      }

      const { metaKey, ctrlKey, shiftKey: shift } = event;
      const ctrl = metaKey || ctrlKey;

      if (ctrl || shift) {
        event.preventDefault();
      }
      if (ctrl && !shift && this.canUndo) {
        this.handleUndo();
      }
      if (ctrl && shift && this.canRedo) {
        this.handleRedo();
      }
    }
  }
};
