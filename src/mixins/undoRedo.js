import { cloneNote } from "../utils";
import { CHANGES_STACK_MAX_SIZE } from "../constants";

export default {
  data() {
    return {
      history: [],
      changeIndex: 0
    };
  },
  computed: {
    canUndo() {
      return this.changeIndex > 0;
    },
    canRedo() {
      return this.changeIndex < this.history.length - 1;
    }
  },
  methods: {
    handleChange() {
      if (this.history.length >= CHANGES_STACK_MAX_SIZE) {
        this.history = this.history.slice(1);
      }

      this.changeIndex += 1;
      this.history.splice(this.changeIndex, 0, cloneNote(this.note));
    },

    handleUndo() {
      this.changeIndex -= 1;
      this.note = cloneNote(this.history[this.changeIndex]);
    },

    handleRedo() {
      this.changeIndex += 1;
      this.note = cloneNote(this.history[this.changeIndex]);
    }
  }
};
