import { MAX_MUTATION_STACK_SIZE } from "../constants";
import { copyNote } from "../utils";

const spyMutation = "UPDATE_EDITING_NOTE";

export default {
  data() {
    return {
      done: [],
      undone: [],
      newMutation: true,
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
    this.$store.subscribe(mutation => {
      if (mutation.type === spyMutation) {
        const { type, payload } = mutation;

        this.done.push({ type, payload: copyNote(payload) });
      }
      if (this.newMutation) {
        this.undone = [];
      }
    });
  },
  methods: {
    redo() {
      // const commit = this.undone.pop();
      // this.newMutation = false;
      //
      // this.$store.commit(commit.type, commit.payload);
      //
      // this.newMutation = true;
    },

    undo() {
      // this.undone.push(this.done.pop());
      // this.newMutation = false;
      //
      // this.newMutation = true;
    }
  }
};
