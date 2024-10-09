import { Control } from "react-hook-form";
import { SheetRowData } from "../../utils/types";

export interface IFormData {
  [k: string]: string | number;
}

export interface IFormProps {
  fileId: string;
  sheetName: string;
  selectedRowData?: SheetRowData;
  rowIndex?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormData, any>;
  refetch: () => void;
  onClose: () => void;
}
