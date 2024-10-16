import { createContext, useContext, useMemo } from "react";
import { SheetRowData } from "../../../utils/types";

interface SheetContext {
  sheetName: string;
  fileId: string;
  sheetHeaders: string[];
  rows: SheetRowData[];
}

const SheetContext = createContext<SheetContext | undefined>(undefined);

export const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("useSheetContext must be used within a SheetContext");
  }
  return context;
};

interface Props {
  sheetName: string;
  fileId: string;
  sheetHeaders: string[];
  rows: SheetRowData[];
  children: React.ReactNode;
}
export const SheetContextProvider = ({
  sheetName,
  fileId,
  sheetHeaders,
  rows,
  children,
}: Props) => {
  const contextValue = useMemo(
    () => ({ sheetName, fileId, sheetHeaders, rows }),
    [sheetName, fileId, sheetHeaders, rows],
  );

  return (
    <SheetContext.Provider value={contextValue}>
      {children}
    </SheetContext.Provider>
  );
};
