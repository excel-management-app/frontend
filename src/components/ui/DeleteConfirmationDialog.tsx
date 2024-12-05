import {
  Alert,
  AlertTitle,
  Box,
  DialogProps,
  Divider,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React, { FormEvent, ReactNode, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Dialog } from "./Dialog";
import DialogTitle from "./DialogTitle";

const useDeleteConfirmDialogStyles = makeStyles()((theme) => {
  return {
    contentText: {
      color: theme.palette.common.black,
      marginBottom: theme.spacing(2),
    },
  };
});

interface DeleteConfirmDialogProps {
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  validConfirmation: string;
  onConfirmed: () => Promise<void>;
  banner?: React.ReactNode;
  alert?: { content?: ReactNode; title?: ReactNode };
  maxWidth?: DialogProps["maxWidth"];
  contentClassName?: string;
  confirmDeletePrefixText?: string;
  loadingContent?: boolean;
  deleteButtonText?: string;
}

export default function DeleteConfirmDialog({
  onClose,
  title,
  content,
  validConfirmation,
  onConfirmed,
  maxWidth = "xs",
  banner,
  alert,
  contentClassName,
  confirmDeletePrefixText,
  loadingContent = false,
  deleteButtonText = title,
}: DeleteConfirmDialogProps) {
  const { classes } = useDeleteConfirmDialogStyles();

  const [deleting, setDeleting] = useState<boolean>(false);
  const [confirmationText, setConfirmationText] = useState<string>("");
  const isValidConfirmationText =
    validConfirmation.toLowerCase() === confirmationText.toLowerCase();

  const onConfirmHandler = async () => {
    setDeleting(true);
    await onConfirmed();
    setDeleting(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isValidConfirmationText && !deleting) {
      void onConfirmHandler();
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      disableEscapeKeyDown={deleting}
      disableBackdropClick={deleting}
    >
      <DialogTitle onClose={onClose} loading={deleting}>
        {title}
      </DialogTitle>
      {banner && (
        <Box>
          <Divider />
          {banner}
        </Box>
      )}
      {alert && (
        <Alert severity="warning">
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.content}
        </Alert>
      )}
      <DialogContent className={contentClassName}>
        <DialogContentText className={classes.contentText}>
          {content}
        </DialogContentText>
        {!loadingContent && (
          <>
            <DialogContentText className={classes.contentText}>
              {`${
                confirmDeletePrefixText ?? ""
              }Để xác nhận, hãy nhập "${validConfirmation}" vào ô bên dưới.`}
            </DialogContentText>

            <form onSubmit={submit}>
              <TextField
                autoFocus
                variant="outlined"
                value={confirmationText}
                placeholder={`Nhập "${validConfirmation}" vào đây`}
                onChange={(event) => {
                  setConfirmationText(event.target.value);
                }}
              />
            </form>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={deleting}>
          Huỷ
        </Button>
        <Button
          onClick={onConfirmHandler}
          variant="contained"
          color="primary"
          disabled={!isValidConfirmationText || deleting || loadingContent}
        >
          {deleteButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
