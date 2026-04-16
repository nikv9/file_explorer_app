import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { initialState } from "../../initialFileData";
import type { FileSystemItem, FileNode, FolderNode, FileExplorerState } from "../../types";

const addItemRecursive = (
  items: FileSystemItem[],
  parentId: string,
  newItem: FileSystemItem
): FileSystemItem[] => {
  return items.map((item) => {
    if (item.type === "folder") {
      if (item.id === parentId) {
        return { ...item, expanded: true, children: [...item.children, newItem] };
      } else if (item.children && item.children.length > 0) {
        return { ...item, children: addItemRecursive(item.children, parentId, newItem) };
      }
    }
    return item;
  });
};

const toggleFolderRecursive = (
  items: FileSystemItem[],
  folderId: string,
  forceExpand?: boolean
): FileSystemItem[] => {
  return items.map((item) => {
    if (item.type === "folder") {
      if (item.id === folderId) {
        return { ...item, expanded: forceExpand !== undefined ? forceExpand : !item.expanded };
      }
      if (item.children?.length > 0) {
        return { ...item, children: toggleFolderRecursive(item.children, folderId, forceExpand) };
      }
    }
    return item;
  });
};

const deleteItemRecursive = (items: FileSystemItem[], itemId: string): FileSystemItem[] => {
  return items
    .filter((item) => item.id !== itemId)
    .map((item) => {
      if (item.type === "folder" && item.children) {
        return { ...item, children: deleteItemRecursive(item.children, itemId) };
      }
      return item;
    });
};

const renameItemRecursive = (items: FileSystemItem[], itemId: string, newName: string): FileSystemItem[] => {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, name: newName };
    }
    if (item.type === "folder" && item.children) {
      return { ...item, children: renameItemRecursive(item.children, itemId, newName) };
    }
    return item;
  });
};

const fileExpSlice = createSlice({
  name: "fileExp",
  initialState: initialState as FileExplorerState,
  reducers: {
    toggleFolder: (state, action: PayloadAction<string>) => {
      state.fileData = toggleFolderRecursive(state.fileData, action.payload);
    },
    expandFolder: (state, action: PayloadAction<string>) => {
      state.fileData = toggleFolderRecursive(state.fileData, action.payload, true);
    },
    selectFile: (state, action: PayloadAction<FileNode>) => {
      state.selectedFile = action.payload;
    },
    addFolder: (state, action: PayloadAction<{ name: string; parentId?: string }>) => {
      const newFolder: FolderNode = {
        id: uuidv4(),
        name: action.payload.name,
        type: "folder",
        expanded: false,
        children: [],
      };
      if (action.payload.parentId) {
        state.fileData = addItemRecursive(state.fileData, action.payload.parentId, newFolder);
      } else {
        state.fileData.push(newFolder);
      }
    },
    addFile: (state, action: PayloadAction<{ name: string; parentId?: string }>) => {
      const newFile: FileNode = {
        id: uuidv4(),
        name: action.payload.name,
        type: "file",
        content: "// Start typing your code...",
      };

      if (action.payload.parentId) {
        state.fileData = addItemRecursive(state.fileData, action.payload.parentId, newFile);
      } else {
        state.fileData.push(newFile);
      }
      state.selectedFile = newFile;
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.fileData = deleteItemRecursive(state.fileData, action.payload);
      if (state.selectedFile?.id === action.payload) {
        state.selectedFile = null;
      }
    },
    renameItem: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.fileData = renameItemRecursive(state.fileData, action.payload.id, action.payload.name);
      if (state.selectedFile?.id === action.payload.id) {
        state.selectedFile.name = action.payload.name;
      }
    },
    updateFileContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      // Find the file iteratively or recursively and update it. Or easier - just update selectedFile, then we can sync later if needed.
      if (state.selectedFile && state.selectedFile.id === action.payload.id) {
        state.selectedFile.content = action.payload.content;
        // ALSO update in file tree
        const updateRecursive = (items: FileSystemItem[]): FileSystemItem[] => {
          return items.map((item) => {
            if (item.id === action.payload.id && item.type === "file") {
              return { ...item, content: action.payload.content };
            }
            if (item.type === "folder" && item.children) {
              return { ...item, children: updateRecursive(item.children) };
            }
            return item;
          });
        };
        state.fileData = updateRecursive(state.fileData);
      }
    }
  },
});

export const {
  toggleFolder,
  expandFolder,
  selectFile,
  addFolder,
  addFile,
  deleteItem,
  renameItem,
  updateFileContent
} = fileExpSlice.actions;

export default fileExpSlice.reducer;
