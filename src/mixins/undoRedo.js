import { cloneNote } from "../utils";
import { CHANGES_STACK_MAX_SIZE } from "../constants";

export default {
  data() {
    return {
      done: [],
      changeCounter: 0
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
    }
  }
};
