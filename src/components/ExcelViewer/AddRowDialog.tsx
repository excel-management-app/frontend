import { Grid2 } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "tss-react/mui";
import { addRowToSheet } from "../../apis/excel";

const useStyles = makeStyles()(() => ({
  root: {},
}));

interface FormData {
  [k: string]: string;
}

interface AddRowDialogProps {
  onClose: () => void;
  fieldNames: string[];
  fileId: string;
  sheetName: string;
  refetch: () => void;
}

export default function AddRowDialog({
  onClose,
  fieldNames,
  fileId,
  sheetName,
  refetch,
}: AddRowDialogProps) {
  const { classes } = useStyles();

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FormData) => {
    try {
      await addRowToSheet({
        fileId,
        sheetName,
        newRow: data,
      });

      refetch();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open
      onClose={onClose}
      PaperProps={{
        className: classes.root,
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Thêm hàng</DialogTitle>
      <DialogContent>
        <Grid2 container columnSpacing={2}>
          {fieldNames.map((value, key) => (
            <Grid2 key={key} size={4}>
              <Controller<FormData>
                name={value}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label={value}
                    type="text"
                    fullWidth
                  />
                )}
              />
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Thoát</Button>
        <Button type="submit">Thêm hàng</Button>
      </DialogActions>
    </Dialog>
  );
}
