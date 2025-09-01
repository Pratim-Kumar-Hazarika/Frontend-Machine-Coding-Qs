import { useState } from "react";
import "./App.css";
import Folder, { type ExplorerItem } from "./components/Folder";
import { explorer } from "./data/data";

function App() {
  const [data] = useState<ExplorerItem>(explorer);
  return (
    <div>
      <h1>File Structure</h1>
      <Folder explorer={data} />
    </div>
  );
}

export default App;
