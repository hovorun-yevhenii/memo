const createMockNote = () => ({
  id: `${Date.now()}_${(Math.random() * 10e6).toFixed()}`,
  title: "This is title",
  items: [
    {
      text: "This is first item",
      checked: false
    },
    {
      text: "This is second item",
      checked: false
    },
    {
      text: "This is third one",
      checked: false
    },
    {
      text: "And this is fourth one",
      checked: false
    }
  ]
});

const createTestNotes = qty =>
  Array(qty)
    .fill("")
    .map(createMockNote);

const getTodoSchema = () => ({
  text: "",
  checked: false
});

const getNoteSchema = () => ({
  id: `${Date.now()}_${(Math.random() * 10e6).toFixed()}`,
  title: "",
  items: [getTodoSchema()]
});

const copyNote = note => {
  if (note) {
    return {
      ...note,
      items: note.items.map(item => ({ ...item }))
    };
  } else {
    return null;
  }
};

const truncate = (text = "", length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export { copyNote, truncate, createTestNotes, getNoteSchema, getTodoSchema };
