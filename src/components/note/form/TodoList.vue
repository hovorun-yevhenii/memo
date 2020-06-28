<template>
  <div class="list">
    <div class="list__todo todo" v-for="(todo, index) in todoList" :key="index">
      <app-checkbox
        class="todo__checkbox"
        v-model="todo.checked"
        @input="handleChange"
      />

      <text-area
        class="todo__text"
        v-model="todo.text"
        @input="handleChange"
        placeholder="Type todo text here..."
      />

      <icon-button
        icon="close"
        title="Remove todo"
        @click="removeTodoItem(index)"
      />
    </div>

    <icon-button
      v-if="todoList.length < TODO_ITEMS_MAX_COUNT"
      class="list__add"
      icon="add_circle_outline"
      title="Add todo"
      @click="addTodoItem"
    />
  </div>
</template>

<script>
import IconButton from "../../common/IconButton.vue";
import TextArea from "../../common/TextArea.vue";
import AppCheckbox from "../../common/AppCheckbox.vue";
import { getTodoSchema } from "../../../utils";

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
      TODO_ITEMS_MAX_COUNT: 20
    };
  },
  methods: {
    addTodoItem() {
      this.todoList.push(getTodoSchema());
      this.handleChange();
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
}

.todo {
  display: flex;
  margin-bottom: 10px;
  &__checkbox {
    flex-shrink: 0;
  }
  &__text {
    flex-grow: 1;
  }
}
</style>
