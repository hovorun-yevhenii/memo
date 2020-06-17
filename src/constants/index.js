const LIST_VIEW_ITEMS_COUNT = 3;

const getEmptyNote = () => ({
  id: `${Date.now()}_${Math.random()}`,
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
      text: "And this is third one",
      checked: false
    },
    {
      text: "And this is third one",
      checked: false
    }
  ]
});

export {
  getEmptyNote,
  LIST_VIEW_ITEMS_COUNT
};
