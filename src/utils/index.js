const copyNote = note => ({
  ...note,
  items: note.items.map(item => ({ ...item }))
});

export { copyNote };
