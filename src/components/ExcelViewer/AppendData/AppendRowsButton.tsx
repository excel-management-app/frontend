import { Button, colors } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { AppendRowsDialog } from "./AppendRowsDialog";
import AddIcon from "@mui/icons-material/Add";

const useStyles = makeStyles()(() => ({
  button: {
    height: 40,
    backgroundColor: colors.grey["900"],
  },
}));
export const AppendRowsButton = () => {
  const { classes } = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Thêm nhiều hàng
      </Button>
      {open && <AppendRowsDialog onClose={handleClose} />}
    </>
  );
};
