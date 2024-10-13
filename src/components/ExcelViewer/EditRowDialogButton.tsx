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
  refetch: () => void;
  rowIndex: number;
  setSearchKey: (key: string) => void;
  listRowIndex: string;
}

export const EditRowDialogButton = ({
  fileId,
  sheetName,
  selectedRowData,
  refetch,
  rowIndex,
  setSearchKey,
  listRowIndex,
}: Props) => {
  const { classes } = useStyles();

  const [editingRow, setEditingRow] = useState(false);

  const onClose = () => {
    setEditingRow(false);
    setSearchKey("");
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setEditingRow(true)}
        className={classes.editRowButton}
        startIcon={<EditOutlinedIcon />}
      >
        Đơn đăng ký
      </Button>
      {editingRow && (
        <MyForm
          fileId={fileId}
          onClose={onClose}
          sheetName={sheetName}
          refetch={refetch}
          selectedRowData={selectedRowData}
          rowIndex={rowIndex}
          setSearchKey={setSearchKey}
          listRowIndex={listRowIndex}
        />
      )}
    </>
  );
};
