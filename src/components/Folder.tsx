import File from "./File";
import { useDispatch } from "react-redux";
import {
  addFile,
  addFolder,
  toggleFolder, 
} from "../store/file_exp/file_exp_store.ts";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const Folder = (props) => {
  const dispatch = useDispatch();
  const level = props.level || 0; // default 0

  const toggleFolderHandler = () => {
    dispatch(toggleFolder(props.folder.id));
  };

  const addFolderHandler = () => {
    const name = prompt("enter folder name");
    if (name) {
      dispatch(addFolder({ name, parentId: props.folder.id }));
    }
  };

  const addFileHandler = () => {
    const name = prompt("enter file name");
    if (!name) return;
    const content = prompt("enter file content");
    if (!content) return;

    dispatch(addFile({ name, content, parentId: props.folder.id }));
  };

  return (
    <div
      className="folder_container"
      style={{ paddingLeft: `${level * 20}px` }}
    >
      <div
        className="mb-1 flex items-center gap-2 cursor-pointer 
                   bg-[#1e2733] hover:bg-[#2f3a4a] p-1 rounded"
        onClick={toggleFolderHandler}
        style={{ color: "#ffd95b" }}
      >
        <span>{props.folder.expanded ? <FaFolderOpen /> : <FaFolder />}</span>
        <span>{props.folder.name}</span>
      </div>

      {props.folder.expanded && (
        <div className="ml-2">
          {props.folder.children.map((i) =>
            i.type === "folder" ? (
              <Folder key={i.id} folder={i} level={level + 1} />
            ) : (
              <File key={i.id} file={i} />
            )
          )}

          <div className="flex items-center gap-4 my-2">
            <span
              className="flex items-center gap-1 cursor-pointer text-red-400"
              onClick={addFolderHandler}
            >
              <FaPlus /> Folder
            </span>

            <span
              className="flex items-center gap-1 cursor-pointer text-blue-400"
              onClick={addFileHandler}
            >
              <FaPlus /> File
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
