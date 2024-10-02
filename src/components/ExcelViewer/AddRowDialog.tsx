import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { SheetRowData } from "../../utils/types";

interface AddRowDialogProps {
  onClose: () => void;
  row: SheetRowData;
}
export default function AddRowDialog({ onClose, row }: AddRowDialogProps) {
  const renderFormFields = () => {
    return Object.entries(row).map(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        return (
          <TextField
            key={key}
            margin="dense"
            label={key}
            defaultValue={value}
            type={typeof value === "number" ? "number" : "text"}
            fullWidth
            name={key}
          />
        );
      } else if (typeof value === "boolean") {
        return (
          <TextField
            key={key}
            margin="dense"
            label={key}
            type="checkbox"
            defaultChecked={value}
            name={key}
            fullWidth
          />
        );
      } else {
        return (
          <TextField
            key={key}
            margin="dense"
            label={key}
            defaultValue=""
            fullWidth
            name={key}
          />
        );
      }
    });
  };
  return (
    <Dialog
      open
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson);
          onClose();
        },
      }}
    >
      <DialogTitle>Row Data</DialogTitle>
      <DialogContent>{renderFormFields()}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
