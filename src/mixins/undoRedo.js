import { MAX_MUTATION_STACK_SIZE, EDIT } from "../constants";
import { copyNote } from "../utils";

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
      if (mutation.type === EDIT) {
        const { type, payload } = mutation;
        console.log(mutation)
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
