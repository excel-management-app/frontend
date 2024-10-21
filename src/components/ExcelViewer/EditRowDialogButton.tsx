import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { colors } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { SheetRowData } from "../../utils/types";
import MyForm from "../Form";

const useStyles = makeStyles()(() => ({
  exitButton: {
    height: 40,
    backgroundColor: colors.grey["100"],
    color: colors.grey["900"],
  },
  updateButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
    color: colors.grey["100"],
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editRowButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
}));
interface Props {
  fileId: string;
  sheetName: string;
  selectedRowData: SheetRowData | null;
  title?: string;
  listTamY: string;
  clearSelection: () => void;
  refetch: () => void;
}

export const EditRowDialogButton = ({
  fileId,
  sheetName,
  selectedRowData,
  title = "Đơn đăng ký",
  listTamY,
  clearSelection,
  refetch,
}: Props) => {
  const { classes } = useStyles();

  const [editingRow, setEditingRow] = useState(false);

  const onClose = () => {
    setEditingRow(false);

    clearSelection();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setEditingRow(true)}
        className={classes.editRowButton}
        startIcon={<EditOutlinedIcon />}
      >
        {title}
      </Button>
      {editingRow && (
        <MyForm
          fileId={fileId}
          onClose={onClose}
          sheetName={sheetName}
          refetch={refetch}
          selectedRowData={selectedRowData}
          listTamY={listTamY}
        />
      )}
    </>
  );
};
