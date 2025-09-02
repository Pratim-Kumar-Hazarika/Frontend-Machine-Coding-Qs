import { useState } from "react";

export type ExplorerItem = {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerItem[];
};

type FolderProps = {
  explorer: ExplorerItem;
  addFolderFileHandler: (
    folderId: string,
    currentItem: string,
    isFolder: boolean
  ) => void;
  handleDeleteNode: (folderId: string) => void;
  handleUpdate: (folderId: string, newName: string) => void;
};

function Folder({
  explorer,
  addFolderFileHandler,
  handleDeleteNode,
  handleUpdate,
}: FolderProps) {
  const [expand, setExpand] = useState(false);

  const [showInput, setShowInput] = useState<{
    visible: boolean;
    isFolder: null | boolean;
  }>({
    visible: false,
    isFolder: null,
  });

  const [updateNameInput, setUpdateNameInput] = useState(false);

  function handleNewFolder(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  }

  function onAddFolder(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && e.currentTarget.value) {
      addFolderFileHandler(
        explorer.id,
        e.currentTarget.value,
        showInput.isFolder as boolean
      );
      setShowInput({ ...showInput, visible: false });
    }
  }

  function updateFolderName(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && e.currentTarget.value) {
      handleUpdate(explorer.id, e.currentTarget.value);
      setUpdateNameInput(false);
    }
  }

  function handleDeleteHandler() {
    handleDeleteNode(explorer.id);
  }

  function handleUpdateNameHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    setUpdateNameInput(true);
  }

  if (explorer.isFolder) {
    return (
      <div
        className="folder"
        onClick={(e) => {
          setExpand(!expand);
          e.stopPropagation();
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "50px",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
            }}
          >
            🗂️
            {!updateNameInput ? (
              explorer.name
            ) : (
              <div>
                <input
                  type="text"
                  autoFocus
                  onKeyDown={updateFolderName}
                  onBlur={(e) => {
                    e.stopPropagation();
                    setUpdateNameInput(false);
                  }}
                />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "5px",
            }}
          >
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            {explorer.id !== "1" && (
              <button onClick={() => handleDeleteHandler()}>🗑️ +</button>
            )}
            <button onClick={(e) => handleUpdateNameHandler(e)}>
              Update Name +
            </button>
          </div>
        </div>
        {showInput.visible && (
          <div>
            <span>{showInput.isFolder ? "🗂️ " : " 📄"}</span>
            <input
              type="text"
              autoFocus
              onKeyDown={(e) => onAddFolder(e)}
              onBlur={(e) => {
                e.stopPropagation();
                setShowInput({ ...showInput, visible: false });
              }}
            />
          </div>
        )}
        <div
          style={{
            display: expand ? "block" : "none",
          }}
        >
          {explorer.items.map((item) => (
            <Folder
              explorer={item}
              addFolderFileHandler={addFolderFileHandler}
              handleDeleteNode={handleDeleteNode}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        {" "}
        📄
        {!updateNameInput ? (
          explorer.name
        ) : (
          <div>
            <input
              type="text"
              autoFocus
              onKeyDown={updateFolderName}
              onBlur={(e) => {
                e.stopPropagation();
                setUpdateNameInput(false);
              }}
            />
          </div>
        )}
        <button onClick={() => handleDeleteHandler()}>🗑️ +</button>
        <button onClick={(e) => handleUpdateNameHandler(e)}>
          Update Name +
        </button>
      </div>
    );
  }
}

export default Folder;
