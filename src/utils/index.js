export const createMockNote = () => ({
  id: `${Date.now()}_${(Math.random() * 10e6).toFixed()}`,
  title: "This is title",
  todoList: Array(4)
    .fill("")
    .map((_, index) => ({
      text: `This is todo number ${index}`,
      checked: false
    }))
});

export const createTestNotes = qty =>
  Array(qty)
    .fill("")
    .map(createMockNote);

export const getTodoSchema = () => ({
  text: "",
  checked: false
});

export const getNoteSchema = () => ({
  id: `${Date.now()}_${(Math.random() * 10e6).toFixed()}`,
  title: "",
  todoList: [getTodoSchema()]
});

export const cloneNote = note => {
  if (note) {
    return {
      ...note,
      todoList: note.todoList.map(item => ({ ...item }))
    };
  }
};

export const truncate = (text = "", length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
