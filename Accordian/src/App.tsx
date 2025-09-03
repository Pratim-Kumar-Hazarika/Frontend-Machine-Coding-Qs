import Accordian from "./components/Accordian";

function App() {
  const items = [
    {
      title: "React Basics",
      content: "Understand components, props, and state in React",
    },
    {
      title: "TypeScript Fundamentals",
      content: "Learn about types, interfaces, and generics in TypeScript",
    },
    {
      title: "CSS Flexbox",
      content: "Master layout techniques using CSS Flexbox",
    },
  ];
  return (
    <div>
      <h1>Accordian</h1>
      <Accordian items={items} />
    </div>
  );
}

export default App;
