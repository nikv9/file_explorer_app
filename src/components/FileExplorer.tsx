import { useDispatch, useSelector } from "react-redux";
import Folder from "./Folder";
import File from "./File";
import { addFile, addFolder } from "../store/file_exp/file_exp_store";
import { toast } from "react-toastify";
import type { RootState } from "../store/store";

const FileExplorer = () => {
  const fileState = useSelector((state:RootState) => state.fileExp);
  const dispatch = useDispatch();

  const addFolderHandler = () => {
    const name = prompt("enter folder name");
    if (!name) {
      return toast.error("Please add folder name");
    }

    dispatch(addFolder({ name: name }));
  };

  const addFileHandler = () => {
    const name = prompt("enter file name");
    if (!name) {
      return toast.error("Please add file name");
    }
    const content = prompt("enter file content");
    if (!content) {
      return toast.error("Please add content");
    }

    dispatch(addFile({ name: name, content: content }));
  };

  return (
    <div className="flex">
      <div className="file_left flex-1">
        <div className="relative">
          <div className="flex items-center gap-4 mb-4!">
            <span
              className="flex-1 bg-[blue] px-1 py-1.5 font-semibold cursor-pointer text-sm"
              onClick={addFolderHandler}
            >
              Add Folder
            </span>
            <span
              className="flex-1 bg-[crimson] px-1 py-1.5 font-semibold cursor-pointer text-sm"
              onClick={addFileHandler}
            >
              Add File
            </span>
          </div>
        </div>

        {fileState.fileData.map((i) =>
          i.type === "folder" ? (
            <Folder key={i.id} folder={i} />
          ) : (
            <File key={i.id} file={i} />
          )
        )}
      </div>

      <div className="file_right flex-4 p-4">
        {fileState.selectedFile && (
          <div className="flex flex-col justify-center items-center">
            <h4 className="text-center">{fileState.selectedFile.name}</h4>

            <p className="p-5 shadow-2xl border border-gray-700 rounded-lg w-[50%] mt-8!">
              {fileState.selectedFile.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
