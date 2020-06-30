<template>
  <div class="list">
    <transition-group tag="div" name="todo">
      <div
        class="list__todo todo"
        v-for="(todo, index) in todoList"
        :key="todo.id"
      >
        <app-checkbox
          class="todo__checkbox"
          v-model="todo.checked"
          @input="handleChange"
        />

        <text-area
          class="todo__text"
          v-model="todo.text"
          @input="handleChange"
          ref="todoText"
          placeholder="Type todo text here..."
        />

        <icon-button
          icon="close"
          title="Remove todo"
          @click="removeTodoItem(index)"
        />
      </div>
    </transition-group>

    <icon-button
      v-if="todoList.length < TODO_ITEMS_MAX_COUNT"
      class="list__add"
      icon="add"
      title="Add todo"
      @click="addTodoItem"
    />

    <p v-else class="list__exceeded">Exceeded items quantity</p>
  </div>
</template>

<script>
import { TextArea, AppCheckbox, IconButton } from "../../common";
import { getTodoSchema } from "../../../utils";
import { TODO_ITEMS_MAX_COUNT } from "../../../constants";

export default {
  name: "TodoList",
  components: {
    IconButton,
    TextArea,
    AppCheckbox
  },
  props: {
    todoList: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: "todoList"
  },
  data() {
    return {
      TODO_ITEMS_MAX_COUNT
    };
  },
  methods: {
    addTodoItem() {
      const length = this.todoList.push(getTodoSchema());
      this.handleChange();

      this.$nextTick(() => {
        this.$refs.todoText[length - 1].focus();
      });
    },
    removeTodoItem(index) {
      this.todoList.splice(index, 1);
      this.handleChange();
    },
    handleChange() {
      this.$emit("change");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/variables";

.list {
  &__add {
    width: 34px;
  }
  &__exceeded {
    color: $danger-color;
    font-size: 12px;
  }
}

.todo {
  display: flex;
  margin-bottom: 10px;
  &__checkbox {
    position: relative;
    top: 2px;
    flex-shrink: 0;
  }
  &__text {
    flex-grow: 1;
  }
}
</style>
