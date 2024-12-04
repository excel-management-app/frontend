import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Button, DialogContent, Typography } from "@mui/material";
import { toast } from "react-toastify";
import * as xlsx from "xlsx";
import { SheetRowData } from "../../../utils/types";
import { Dialog } from "../../ui/Dialog";
import DialogTitle from "../../ui/DialogTitle";
import { FileUploadButton } from "../../ui/FileUploadButton";
import { useSheetContext } from "../contexts/SheetContext";
import { useAppendRowsToSheet } from "./useAppendRowsToSheet";

interface Props {
  onClose: () => void;
}

export const AppendRowsDialog = ({ onClose }: Props) => {
  const { fileId, sheetName, sheetHeaders } = useSheetContext();

  const downloadTemplate = () => {
    const ws = xlsx.utils.aoa_to_sheet([sheetHeaders]);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, sheetName);
    xlsx.writeFile(wb, `${sheetName}_template.xlsx`);
  };
  const { mutate, isPending } = useAppendRowsToSheet({
    fileId,
    sheetName,
  });

  const uploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryStr = e.target?.result;
        const workbook = xlsx.read(binaryStr, { type: "array" });
        const sheet = workbook.Sheets[sheetName];
        const jsonData: any[][] = xlsx.utils.sheet_to_json(sheet, {
          header: 1,
          defval: "",
          blankrows: false,
          raw: true,
        });

        if (jsonData.length === 0) {
          throw new Error("Sheet is empty");
        }

        const headers = jsonData[0].map(
          (header, index) => header || jsonData[2][index],
        );

        // Transform raw data into row objects
        const newRows: SheetRowData[] = jsonData
          .slice(1)
          .filter((row) => row.some((cell) => cell !== ""))
          .map((row) => {
            const rowObject: Record<string, any> = {};
            headers.forEach((header, index) => {
              if (row[index] !== "") {
                rowObject[header] = row[index];
              }
            });
            rowObject.tamY = `${rowObject.soHieuToBanDo}_${rowObject.soThuTuThua}`;
            return rowObject;
          });
        mutate(newRows);
        toast.success("Thêm hàng thành công");
      } catch (error) {
        console.error(error);
        toast.error("Tải file thất bại");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Dialog fullWidth open onClose={onClose}>
      <DialogTitle onClose={onClose}>Thêm nhiều hàng vào sheet</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body2" gutterBottom>
            Bạn có thể tải file template để thêm dữ liệu mới vào sheet hiện tại.
          </Typography>

          <Button
            onClick={downloadTemplate}
            variant="text"
            color="primary"
            startIcon={<SaveOutlinedIcon />}
          >
            Tải file template
          </Button>
        </Box>
        <Box>
          <Typography variant="body2" gutterBottom>
            Sau khi thêm dữ liệu vào file template, hãy tải file mới lên để cập
            nhật sheet.
          </Typography>
          <FileUploadButton
            onUpload={uploadFile}
            title="Tải file mới"
            isPending={isPending}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
