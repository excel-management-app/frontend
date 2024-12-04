import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appendRowsToSheet } from "../../../apis/excel";
import { SheetRowData } from "../../../utils/types";

interface AppendFileProps {
  fileId: string;
  sheetName: string;
}
export function useAppendRowsToSheet({ fileId, sheetName }: AppendFileProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, SheetRowData[]>({
    mutationFn: (newRows) =>
      appendRowsToSheet({
        fileId,
        sheetName,
        newRows,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fileData"],
      });
    },

    onError: (error: Error) => {
      console.error("Append file failed:", error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["fileData"],
      });
    },
  });

  return mutation;
}
