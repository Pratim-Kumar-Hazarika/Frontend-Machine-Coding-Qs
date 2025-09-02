import { useState } from "react";
import "./App.css";
import Folder, { type ExplorerItem } from "./components/Folder";
import { explorer } from "./data/data";
import { useAdditionDeletion } from "./hooks/useAdditionDeletion";

function App() {
  const [data, setData] = useState<ExplorerItem>(explorer);
  const { insertNode, deleteNode, updateName } = useAdditionDeletion();
  const handleInsertNode = (
    folderId: string,
    currentItem: string,
    isFolder: boolean
  ) => {
    const finalData = insertNode(data, folderId, currentItem, isFolder);
    setData(finalData);
  };
  const handleDeleteNode = (folderId: string) => {
    const finalData = deleteNode(data, folderId) as ExplorerItem;
    setData(finalData);
  };
  const handleUpdate = (folderId: string, newName: string) => {
    const finalData = updateName(data, folderId, newName);
    setData(finalData);
  };
  return (
    <div>
      <h1>File Structure</h1>
      <h3>Add Folder/File, Delete Folder/File , Update Names Folder/file</h3>
      <Folder
        explorer={data}
        addFolderFileHandler={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
