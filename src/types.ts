export type ItemType = "folder" | "file";

export interface FileNode {
  id: string;
  name: string;
  type: "file";
  content?: string;
}

export interface FolderNode {
  id: string;
  name: string;
  type: "folder";
  expanded: boolean;
  children: (FileNode | FolderNode)[];
}

export type FileSystemItem = FileNode | FolderNode;

export interface FileExplorerState {
  fileData: FileSystemItem[];
  selectedFile: FileNode | null;
}
