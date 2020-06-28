import { cloneNote } from "../utils";
import { CHANGES_STACK_MAX_SIZE } from "../constants";

export default {
  data() {
    return {
      history: [],
      changeCounter: 0
    };
  },
  computed: {
    canUndo() {
      return this.history.length > 1 && this.changeCounter !== 0;
    },
    canRedo() {
      return this.changeCounter < this.history.length - 1;
    }
  },
  methods: {
    handleChange() {
      if (this.history.length >= CHANGES_STACK_MAX_SIZE) {
        this.history = this.history.slice(1);
      }

      this.changeCounter += 1;
      this.history.splice(this.changeCounter, 0, cloneNote(this.note));
    },

    handleUndo() {
      this.changeCounter -= 1;
      this.note = cloneNote(this.history[this.changeCounter]);
    },

    handleRedo() {
      this.changeCounter += 1;
      this.note = cloneNote(this.history[this.changeCounter]);
    }
  }
};
