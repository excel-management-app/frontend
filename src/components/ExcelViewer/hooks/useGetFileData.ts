import { useEffect, useState } from "react";
import { FileData } from "../../../apis/types";
import { getFileData } from "../../../apis/excel";

export function useGetFileData(fileId: string) {
  const [data, setData] = useState<FileData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fileId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getFileData({ fileId });
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fileId]);
  return {
    data,
    loading,
  };
}
