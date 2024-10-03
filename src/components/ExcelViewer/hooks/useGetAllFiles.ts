import { useQuery } from "@tanstack/react-query"; // Import React Query's useQuery
import { FileListOption } from "../../../utils/types";
import { getAllFiles } from "../../../apis/excel";

const fetchAllFiles = async (): Promise<FileListOption[]> => {
  return getAllFiles();
};

export function useGetAllFiles() {
  const {
    data: files = [],
    isLoading,
    error,
    refetch,
  } = useQuery<FileListOption[]>({
    queryKey: ["allFiles"],
    queryFn: fetchAllFiles,
  });

  return {
    files,
    isLoading,
    error,
    refetch,
  };
}
