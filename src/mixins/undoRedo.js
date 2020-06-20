import { MAX_MUTATION_STACK_SIZE, EDIT_NOTE_MUTATION } from "../constants";
import { copyNote } from "../utils";

export default {
  data() {
    return {
      done: [],
      undone: [],
      newMutation: true,
      unsubscribe: null,
      MAX_MUTATION_STACK_SIZE
    };
  },
  computed: {
    canRedo() {
      return this.undone.length;
    },
    canUndo() {
      return this.done.length;
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe(mutation => {
      if (mutation.type === EDIT_NOTE_MUTATION) {
        const { type, payload } = mutation;

        this.done.push({ type, payload: copyNote(payload) });
      }
      if (this.newMutation) {
        this.undone = [];
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    handleUndo() {
    },

    handleRedo() {
    }
  }
};
