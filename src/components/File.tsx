import { useDispatch, useSelector } from "react-redux";
import { selectFile } from "../store/file_exp/file_exp_store";
import { IoDocumentTextOutline } from "react-icons/io5";
import type { RootState } from "../store/store";

interface FileProps {
  file: {
    id: string;
    name: string;
    type: string;
    content?: string;
  };
}

const File = (props: FileProps) => {
  const dispatch = useDispatch();
  const fileState = useSelector((state: RootState) => state.fileExp);

  const selectFileHandler = () => {
    dispatch(selectFile(props.file));
  };

  return (
    <div
      onClick={selectFileHandler}
      className="mb-1 flex items-center gap-2 cursor-pointer hover:bg-gray-700"
      style={{
        backgroundColor:
          props.file?.id === fileState.selectedFile?.id ? "#364153" : "",
      }}
    >
      <span>
        <IoDocumentTextOutline />
      </span>
      <span>{props.file.name}</span>
    </div>
  );
};

export default File;
