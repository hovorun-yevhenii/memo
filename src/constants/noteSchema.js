export default function() {
  return {
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
      }
    ]
  };
}
