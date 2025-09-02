import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import ProgressBarTwo from "./components/ProgressBarTwo";

function App() {
  //Progress bar 1
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setValue((val) => val + 1);
    }, 100);
  }, []);

  ///Progress bar 2
  const bars = [0, 5, 10, 30, 50, 70, 90, 100];
  return (
    <div className="app">
      <h1>Progress bar 1</h1>
      <ProgressBar value={value} onComplete={() => setSuccess(true)} />
      <div>{success ? "Complete" : "Loading..  "}</div>
      <br />
      <h1>Progress bar 2</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {bars.map((value) => (
          <ProgressBarTwo value={value} />
        ))}
      </div>
    </div>
  );
}

export default App;
