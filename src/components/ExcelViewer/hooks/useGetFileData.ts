import { useQuery } from "@tanstack/react-query";
import { FileData } from "../../../apis/types";
import { getFileData, GetFileDataProps } from "../../../apis/excel";

const fetchFileData = async (props: GetFileDataProps): Promise<FileData> => {
  return getFileData(props);
};

export function useGetFileData({
  fileId,
  sheetName,
  pagination,
}: GetFileDataProps) {
  const { data, isLoading, refetch } = useQuery<FileData>({
    queryKey: [
      "fileData",
      fileId,
      sheetName,
      pagination.page,
      pagination.pageSize,
    ],
    queryFn: () => fetchFileData({ fileId, sheetName, pagination }),
    enabled: !!fileId,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    gcTime: 1000 * 60 * 5,
  });

  return {
    data,
    loading: isLoading,
    refetch,
  };
}
