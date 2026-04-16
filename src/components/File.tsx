import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFile, deleteItem, renameItem } from "../store/file_exp/file_exp_store";
import { HiOutlineDocumentText, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import type { RootState } from "../store/store";
import type { FileNode } from "../types";
import InlineInput from "./InlineInput";

interface FileProps {
  file: FileNode;
  level?: number;
}

const File: React.FC<FileProps> = ({ file, level = 0 }) => {
  const dispatch = useDispatch();
  const fileState = useSelector((state: RootState) => state.fileExp);
  const [isRenaming, setIsRenaming] = useState(false);

  const isSelected = file.id === fileState.selectedFile?.id;

  const selectFileHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(selectFile(file));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteItem(file.id));
  };

  const handleRenameSubmit = (newName: string) => {
    dispatch(renameItem({ id: file.id, name: newName }));
    setIsRenaming(false);
  };

  if (isRenaming) {
    return (
      <InlineInput
        type="file"
        initialValue={file.name}
        level={level}
        onSubmit={handleRenameSubmit}
        onCancel={() => setIsRenaming(false)}
      />
    );
  }

  return (
    <div
      onClick={selectFileHandler}
      className={`group flex items-center justify-between cursor-pointer py-1.5 pr-2 w-full transition-colors text-[13.5px]
        ${isSelected 
            ? "bg-blue-600 text-white font-medium shadow-[inset_4px_0_0_0_#60a5fa]" 
            : "text-gray-600 hover:bg-gray-200/60"}
      `}
      style={{ paddingLeft: `${level * 14 + 14}px` }}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <HiOutlineDocumentText className={`text-[16px] shrink-0 ${isSelected ? "text-white" : "text-gray-400"}`} />
        <span className="truncate flex-1 min-w-0">{file.name}</span>
      </div>

      {/* Actions: Appear on hover */}
      <div className={`flex items-center gap-0.5 shrink-0 pl-1 mr-1 ${isSelected ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 ${isSelected ? '' : 'bg-gradient-to-l from-gray-100 via-gray-100 to-transparent'}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsRenaming(true);
          }}
          className={`p-1 rounded shadow-sm transition ${isSelected ? "text-white hover:bg-blue-500 hover:text-white" : "text-gray-400 hover:text-gray-800 hover:bg-white"}`}
          title="Rename"
        >
          <HiOutlinePencil size={14} />
        </button>
        <button
          onClick={handleDelete}
          className={`p-1 rounded shadow-sm transition ${isSelected ? "text-white hover:text-red-200 hover:bg-blue-500" : "text-gray-400 hover:text-red-500 hover:bg-white"}`}
          title="Delete"
        >
          <HiOutlineTrash size={14} />
        </button>
      </div>
    </div>
  );
};

export default File;
