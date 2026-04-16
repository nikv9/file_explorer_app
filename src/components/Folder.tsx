import React, { useState } from "react";
import File from "./File";
import { useDispatch } from "react-redux";
import {
  addFile,
  addFolder,
  toggleFolder,
  expandFolder,
  deleteItem,
  renameItem
} from "../store/file_exp/file_exp_store";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { HiOutlineFolderAdd, HiOutlineDocumentAdd, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import type { FolderNode } from "../types";
import InlineInput from "./InlineInput";

interface FolderProps {
  folder: FolderNode;
  level?: number;
}

const Folder: React.FC<FolderProps> = ({ folder, level = 0 }) => {
  const dispatch = useDispatch();
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  const toggleFolderHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFolder(folder.id));
  };

  const handleAddFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(expandFolder(folder.id));
    setIsAddingFolder(true);
    setIsAddingFile(false);
  };

  const handleAddFileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(expandFolder(folder.id));
    setIsAddingFile(true);
    setIsAddingFolder(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteItem(folder.id));
  };

  const submitNewFolder = (name: string) => {
    dispatch(addFolder({ name, parentId: folder.id }));
    setIsAddingFolder(false);
  };

  const submitNewFile = (name: string) => {
    dispatch(addFile({ name, parentId: folder.id }));
    setIsAddingFile(false);
  };

  const handleRenameSubmit = (newName: string) => {
    dispatch(renameItem({ id: folder.id, name: newName }));
    setIsRenaming(false);
  };

  if (isRenaming) {
    return (
      <InlineInput
        type="folder"
        initialValue={folder.name}
        level={level}
        onSubmit={handleRenameSubmit}
        onCancel={() => setIsRenaming(false)}
      />
    );
  }

  return (
    <div className="select-none cursor-pointer w-full text-[13.5px]">
      <div
        className="group flex items-center justify-between py-1.5 pr-2 w-full hover:bg-gray-200/50 text-gray-700 transition-colors"
        onClick={toggleFolderHandler}
        style={{ paddingLeft: `${level * 14 + 14}px` }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {folder.expanded ? (
            <FaFolderOpen className="text-yellow-400 text-[16px] shrink-0 drop-shadow-sm" />
          ) : (
            <FaFolder className="text-yellow-400 text-[16px] shrink-0 drop-shadow-sm" />
          )}
          {/* VERY IMPORTANT for preventing ugly text overflow */}
          <span className="truncate flex-1 min-w-0">{folder.name}</span>
        </div>

        {/* Hover Actions */}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 shrink-0 pl-1 mr-1 bg-gradient-to-l from-gray-100 via-gray-100 to-transparent">
          <button onClick={handleAddFileClick} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-white rounded shadow-sm transition" title="New File">
            <HiOutlineDocumentAdd size={15} />
          </button>
          <button onClick={handleAddFolderClick} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-white rounded shadow-sm transition" title="New Folder">
            <HiOutlineFolderAdd size={15} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsRenaming(true); }} className="p-1 text-gray-400 hover:text-gray-800 hover:bg-white rounded shadow-sm transition" title="Rename">
            <HiOutlinePencil size={15} />
          </button>
          <button onClick={handleDelete} className="p-1 text-gray-400 hover:text-red-500 hover:bg-white rounded shadow-sm transition" title="Delete">
            <HiOutlineTrash size={15} />
          </button>
        </div>
      </div>

      {folder.expanded && (
        <div className="flex flex-col w-full">
          {isAddingFolder && (
            <InlineInput
              type="folder"
              level={level + 1}
              onSubmit={submitNewFolder}
              onCancel={() => setIsAddingFolder(false)}
            />
          )}
          {isAddingFile && (
            <InlineInput
              type="file"
              level={level + 1}
              onSubmit={submitNewFile}
              onCancel={() => setIsAddingFile(false)}
            />
          )}
          {folder.children.map((child) =>
            child.type === "folder" ? (
              <Folder key={child.id} folder={child as FolderNode} level={level + 1} />
            ) : (
              <File key={child.id} file={child} level={level + 1} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Folder;
