import { useEffect, useState } from "react";
import { FileListOption } from "../../../utils/types";
import { getAllFiles } from "../../../apis/excel";

export function useGetAllFiles() {
  const [files, setFiles] = useState<FileListOption[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const filesData = await getAllFiles();

      setFiles(filesData);
    };

    fetchFiles().catch(console.error);
  }, []);

  return {
    files,
  };
}
