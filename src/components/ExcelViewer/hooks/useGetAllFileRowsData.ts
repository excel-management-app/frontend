import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../../apis/axiosClient";
import { SheetRowData } from "../../../utils/types";

interface Props {
  fileId: string;
  sheetName: string;
}

const fetchFileData = async (props: Props): Promise<SheetRowData[]> => {
  return await axiosClient.get(
    `/files/${props.fileId}/sheets/${props.sheetName}/all`
  );
};

export function useGetAllFileRowsData({ fileId, sheetName }: Props) {
  const { data, isLoading, refetch } = useQuery<SheetRowData[]>({
    queryKey: ["fileRowsData", fileId, sheetName],
    queryFn: () => fetchFileData({ fileId, sheetName }),
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
