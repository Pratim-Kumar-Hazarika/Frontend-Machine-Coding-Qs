import { useState } from "react";

export type ExplorerItem = {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerItem[];
};
type FolderProps = {
  explorer: ExplorerItem;
};
function Folder({ explorer }: FolderProps) {
  const [expand, setExpand] = useState(false);
  if (explorer.isFolder) {
    return (
      <div
        className="folder"
        onClick={(e) => {
          setExpand(!expand);
          e.stopPropagation();
        }}
      >
        <div>🗂️ {explorer.name}</div>
        <div
          style={{
            display: expand ? "block" : "none",
          }}
        >
          {explorer.items.map((item) => (
            <Folder explorer={item} />
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="file"> 📄{explorer.name}</div>;
  }
}

export default Folder;
