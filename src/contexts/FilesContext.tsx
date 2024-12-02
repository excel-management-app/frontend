import { createContext, useContext, useMemo } from "react";
import { FileListOption } from "../utils/types";
import { useGetAllFiles } from "../hooks/useGetAllFiles";

interface FilesContext {
  files: FileListOption[];
  loading: boolean;
  refetch: () => void;
}

const FilesContext = createContext<FilesContext | undefined>(undefined);

export const useFilesContext = (): FilesContext => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFilesContext must be used within a FilesProvider");
  }
  return context;
};

interface FilesProviderProps {
  children: React.ReactNode;
}

export const FilesProvider = ({ children }: FilesProviderProps) => {
  const { files, isLoading, refetch } = useGetAllFiles();
  const value = useMemo(
    () => ({ files, loading: isLoading, refetch }),
    [files, isLoading, refetch],
  );

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
};
