import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadWordFile } from "../../../apis/excel";

export function useUploadWordTemplate() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, FormData>({
    mutationFn: (formData) => uploadWordFile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allFiles"],
      });
    },

    onError: (error: Error) => {
      console.error("File upload failed:", error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["allFiles"],
      });
    },
  });

  return mutation;
}
