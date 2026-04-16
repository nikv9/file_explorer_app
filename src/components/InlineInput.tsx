import React, { useState, useEffect, useRef } from "react";
import type { ItemType } from "../types";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaFolder } from "react-icons/fa";

interface InlineInputProps {
  type: ItemType;
  initialValue?: string;
  level?: number;
  onSubmit: (name: string) => void;
  onCancel: () => void;
}

const InlineInput: React.FC<InlineInputProps> = ({ type, initialValue = "", level = 0, onSubmit, onCancel }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // select all text on rename for easy overwrite
      inputRef.current.select();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value.trim());
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div
      className="flex items-center gap-1.5 py-1.5 pr-2 my-0.5 bg-blue-50/50 w-full group transition-colors"
      style={{ paddingLeft: `${level * 14 + 14}px` }}
    >
      <span className="text-gray-400 flex-shrink-0">
        {type === "folder" ? <FaFolder className="text-yellow-400 text-[16px]" /> : <HiOutlineDocumentText className="text-gray-400 text-[16px]" />}
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (value.trim()) onSubmit(value.trim());
          else onCancel();
        }}
        className="bg-white border border-blue-400 outline-none focus:ring-2 focus:ring-blue-400/20 rounded shadow-sm text-gray-800 px-1.5 py-0.5 text-sm w-full placeholder-gray-400 flex-1 min-w-0"
        placeholder={`New ${type}...`}
      />
    </div>
  );
};

export default InlineInput;
