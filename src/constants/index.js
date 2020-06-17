const LIST_VIEW_ITEMS_COUNT = 3;

const VUEX_PERSIST_KEY = "memoNotes";

const NEW_NOTE_KEY = "new";

const createNote = () => ({
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
    .map(createNote);

const GET_NOTE_SCHEMA = () => ({
  id: `${Date.now()}_${(Math.random() * 10e6).toFixed()}`,
  title: "",
  items: [
    {
      text: "",
      checked: false
    }
  ]
});

export {
  createTestNotes,
  GET_NOTE_SCHEMA,
  NEW_NOTE_KEY,
  LIST_VIEW_ITEMS_COUNT,
  VUEX_PERSIST_KEY
};
