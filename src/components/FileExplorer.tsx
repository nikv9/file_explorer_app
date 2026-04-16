import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Folder from "./Folder";
import File from "./File";
import { addFile, addFolder, updateFileContent } from "../store/file_exp/file_exp_store";
import type { RootState } from "../store/store";
import { HiOutlineDocumentAdd, HiOutlineFolderAdd, HiOutlineDocumentText } from "react-icons/hi";
import InlineInput from "./InlineInput";
import type { FolderNode } from "../types";

const FileExplorer: React.FC = () => {
  const fileState = useSelector((state: RootState) => state.fileExp);
  const dispatch = useDispatch();

  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  const submitNewFolder = (name: string) => {
    dispatch(addFolder({ name }));
    setIsAddingFolder(false);
  };

  const submitNewFile = (name: string) => {
    dispatch(addFile({ name }));
    setIsAddingFile(false);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (fileState.selectedFile) {
      dispatch(updateFileContent({ id: fileState.selectedFile.id, content: e.target.value }));
    }
  };

  return (
    <div className="flex w-full h-full text-[14px]">
      
      {/* Sidebar - Fix width and overflow behavior completely */}
      <div className="w-[280px] min-w-[280px] bg-[#fafafa] border-r border-gray-200 flex flex-col h-full relative z-0">
        <div className="px-4 py-3 flex items-center justify-between text-xs font-bold text-gray-400 tracking-widest uppercase border-b border-gray-200">
          <span>Files</span>
          <div className="flex gap-1">
            <button onClick={() => {setIsAddingFile(true); setIsAddingFolder(false)}} className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-900 transition-colors" title="New File">
              <HiOutlineDocumentAdd size={18} />
            </button>
            <button onClick={() => {setIsAddingFolder(true); setIsAddingFile(false)}} className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-900 transition-colors" title="New Folder">
              <HiOutlineFolderAdd size={18} />
            </button>
          </div>
        </div>
        
        {/* Force overflow-x-hidden to never break layout horizontally */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2" id="sidebar-scroll">
          {isAddingFolder && (
            <InlineInput type="folder" onSubmit={submitNewFolder} onCancel={() => setIsAddingFolder(false)} />
          )}
          {isAddingFile && (
            <InlineInput type="file" onSubmit={submitNewFile} onCancel={() => setIsAddingFile(false)} />
          )}

          {fileState.fileData.map((node) =>
            node.type === "folder" ? (
              <Folder key={node.id} folder={node as FolderNode} />
            ) : (
              <File key={node.id} file={node} />
            )
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white flex flex-col h-full relative min-w-0 z-10 w-full shadow-[-4px_0_15px_rgba(0,0,0,0.02)]">
        {fileState.selectedFile ? (
          <>
            <div className="h-12 border-b border-gray-100 flex items-center px-6 bg-white shrink-0 shadow-sm z-20">
              <span className="font-semibold text-gray-800 text-[15px]">{fileState.selectedFile.name}</span>
            </div>
            <div className="flex-1 w-full h-full relative p-6 overflow-hidden bg-white">
              <textarea
                className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-[14px] leading-relaxed text-gray-700"
                value={fileState.selectedFile.content || ""}
                onChange={handleContentChange}
                spellCheck={false}
                placeholder="Write your code here..."
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <HiOutlineDocumentText size={64} className="mb-4 text-gray-200 stroke-1" />
            <p className="text-gray-500 font-medium">Select a file from the sidebar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
