import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadExcelFile,
  uploadMapFile,
  uploadWordFile,
} from "../../../apis/excel";

export function useUploadFile() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, FormData>({
    mutationFn: (formData) => uploadExcelFile(formData),
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

export function useUploadFileWord() {
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

export function useUploadFileMap() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, FormData>({
    mutationFn: (formData) => uploadMapFile(formData),
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
