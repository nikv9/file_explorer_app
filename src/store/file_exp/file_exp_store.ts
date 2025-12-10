import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { initialState } from "../../initialFileData.ts";

const addItemToParticularFolder = (items, parentId, newItem) => {
  const newCreatedItem = items.map((i) => {
    if (i.type === "folder") {
      if (i.id === parentId) {
        return { ...i, children: [...i.children, newItem] };
      } else if (i.children && i.children.length > 0) {
        return {
          ...i,
          children: addItemToParticularFolder(i.children, parentId, newItem),
        };
      }
    }
    return i;
  });

  return newCreatedItem;
};

const toggleFolderRecursive = (items, folderId) => {
  return items.map((item) => {
    if (item.type === "folder") {
      if (item.id === folderId) {
        return { ...item, expanded: !item.expanded };
      }

      if (item.children?.length > 0) {
        return {
          ...item,
          children: toggleFolderRecursive(item.children, folderId),
        };
      }
    }
    return item;
  });
};

const fileExpSlice = createSlice({
  name: "fileExp",
  initialState: initialState,
  reducers: {
    toggleFolder: (state, action) => {
      state.fileData = toggleFolderRecursive(state.fileData, action.payload);
    },

    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },

    addFolder: (state, action) => {
      const newFolder = {
        id: uuidv4(),
        name: action.payload.name,
        type: "folder",
        expanded: false,
        children: [],
      };
      if (action.payload.parentId) {
        state.fileData = addItemToParticularFolder(
          state.fileData,
          action.payload.parentId,
          newFolder
        );
      } else {
        state.fileData.push(newFolder);
      }
    },

    addFile: (state, action) => {
      const newFile = {
        id: uuidv4(),
        name: action.payload.name,
        type: "file",
        expanded: false,
        content: action.payload.content,
        children: [],
      };

      if (action.payload.parentId) {
        state.fileData = addItemToParticularFolder(
          state.fileData,
          action.payload.parentId,
          newFile
        );
      } else {
        state.fileData.push(newFile);
      }
    },
  },
});

export const { toggleFolder, selectFile, addFolder, addFile } =
  fileExpSlice.actions;

export default fileExpSlice.reducer;
