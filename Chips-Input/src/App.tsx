import { useState } from "react";

function App() {
  const [chipsInput, setChipsInput] = useState("");
  const [chips, setChips] = useState<string[]>([]);

  function onkeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && chipsInput) {
      setChips((prev) => [...prev, chipsInput]);
      setChipsInput("");
    }
  }

  function deleteHandler(index: number) {
    const copy = [...chips];
    copy.splice(index, 1);
    setChips(copy);
  }
  return (
    <div>
      <h1>Chips Input</h1>
      <input
        type="text"
        value={chipsInput}
        onKeyDown={(e) => onkeyDownHandler(e)}
        onChange={(e) => setChipsInput(e.target.value)}
        placeholder="Enter name.."
      />
      <div
        style={{
          display: "flex",
          gap: "5px",
          marginTop: "10px",
        }}
      >
        {chips.map((item, index) => {
          return (
            <div
              style={{
                backgroundColor: "wheat",
                padding: "5px",
                borderRadius: "10px",
                display: "flex",
                gap: "10px",
              }}
              key={index}
            >
              <span>{item}</span>
              <button onClick={() => deleteHandler(index)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
