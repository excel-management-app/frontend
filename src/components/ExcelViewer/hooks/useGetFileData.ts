import { useQuery } from "@tanstack/react-query";
import { FileData } from "../../../apis/types";
import { getFileData } from "../../../apis/excel";

const fetchFileData = async (fileId: string): Promise<FileData> => {
  if (!fileId) throw new Error("File ID is required");
  return getFileData({ fileId });
};

export function useGetFileData(fileId: string) {
  const { data, isLoading, refetch } = useQuery<FileData>({
    queryKey: ["fileData", fileId],
    queryFn: () => fetchFileData(fileId),
    enabled: !!fileId,
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    gcTime: 1000 * 60 * 5,
  });

  return {
    data,
    loading: isLoading,
    refetch,
  };
}
