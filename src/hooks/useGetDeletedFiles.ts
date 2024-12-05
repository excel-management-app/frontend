import { useQuery } from "@tanstack/react-query";
import { FileListOption } from "../utils/types";
import { getDeletedFiles } from "../apis/excel";

const fetchDeletedFiles = async (): Promise<FileListOption[]> => {
  return getDeletedFiles();
};

export function useGetDeletedFiles() {
  const {
    data: files = [],
    isLoading,
    error,
    refetch,
  } = useQuery<FileListOption[]>({
    queryKey: ["deletedFiles"],
    queryFn: fetchDeletedFiles,
  });

  return {
    files,
    isLoading,
    error,
    refetch,
  };
}
