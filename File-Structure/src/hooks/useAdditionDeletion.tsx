import type { ExplorerItem } from "../components/Folder";

export const useAdditionDeletion = () => {
  function insertNode(
    explorerData: ExplorerItem,
    folderId: string,
    currentItem: string,
    isFolder: boolean
  ): ExplorerItem {
    if (explorerData.id === folderId && explorerData.isFolder) {
      explorerData.items.unshift({
        id: String(new Date().getTime()),
        name: currentItem,
        items: [],
        isFolder: isFolder,
      });
      return explorerData;
    }
    let latestNode = [];
    latestNode = explorerData.items.map((obj) => {
      return insertNode(obj, folderId, currentItem, isFolder);
    });
    return {
      ...explorerData,
      items: latestNode,
    };
  }

  function deleteNode(
    explorerData: ExplorerItem,
    folderId: string
  ): ExplorerItem | null {
    if (explorerData.id == folderId) {
      return null;
    }
    const updatedItems = explorerData.items
      .map((item) => deleteNode(item, folderId))
      .filter((item) => item != null);
    return {
      ...explorerData,
      items: updatedItems,
    };
  }

  function updateName(
    explorerData: ExplorerItem,
    folderId: string,
    newName: string
  ) {
    if (explorerData.id == folderId && newName) {
      return {
        ...explorerData,
        name: newName,
      };
    }
    const updatedItems = explorerData.items.map((item) => {
      return updateName(item, folderId, newName);
    });
    return {
      ...explorerData,
      items: updatedItems,
    };
  }
  return {
    insertNode,
    deleteNode,
    updateName,
  };
};
