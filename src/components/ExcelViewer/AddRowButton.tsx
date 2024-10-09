import { Button, colors } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import AddRowDialog from "./AddRowDialog";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles()(() => ({
  addRowButton: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
}));
interface Props {
  fileId: string;
  refetch: () => void;
  selectedSheetName: string;
}

export const AddRowButton = ({ fileId, selectedSheetName, refetch }: Props) => {
  const { classes } = useStyles();
  const [addingRow, setAddingRow] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setAddingRow(true)}
        className={classes.addRowButton}
        startIcon={<AddIcon />}
      >
        Thêm hàng
      </Button>
      {addingRow && (
        <AddRowDialog
          onClose={() => setAddingRow(false)}
          fileId={fileId}
          sheetName={selectedSheetName}
          refetch={refetch}
        />
      )}
    </>
  );
};
