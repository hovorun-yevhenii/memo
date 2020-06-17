const EMPTY_STATE = "RESET_TEMP_NOTE";
const spyMutations = ["UPDATE_TEMP_NOTE"];

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          done: [],
          undone: [],
          newMutation: true,
          spyMutations
        };
      },
      created() {
        if (this.$store) {
          this.$store.subscribe(mutation => {
            if (
              mutation.type !== EMPTY_STATE &&
              spyMutations.includes(mutation.type)
            ) {
              this.done.push(mutation);
            }
            if (this.newMutation) {
              this.undone = [];
            }
          });
        }
      },
      computed: {
        canRedo() {
          return this.undone.length;
        },
        canUndo() {
          return this.done.length;
        }
      },
      methods: {
        redo() {
          let commit = this.undone.pop();
          this.newMutation = false;
          switch (typeof commit.payload) {
            case "object":
              this.$store.commit(
                `${commit.type}`,
                Object.assign({}, commit.payload)
              );
              break;
            default:
              this.$store.commit(`${commit.type}`, commit.payload);
          }
          this.newMutation = true;
        },
        undo() {
          this.undone.push(this.done.pop());
          this.newMutation = false;
          this.$store.commit(EMPTY_STATE);
          this.done.forEach(mutation => {
            switch (typeof mutation.payload) {
              case "object":
                this.$store.commit(
                  `${mutation.type}`,
                  Object.assign({}, mutation.payload)
                );
                break;
              default:
                this.$store.commit(`${mutation.type}`, mutation.payload);
            }
            this.done.pop();
          });
          this.newMutation = true;
        }
      }
    });
  }
};
