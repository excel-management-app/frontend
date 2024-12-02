import { DialogProps, Dialog as MUIDialog } from "@mui/material";
import React from "react";

interface Props extends Omit<DialogProps, "disableBackdropClick"> {
  onClose?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  disableBackdropClick?: boolean;
}

export const Dialog = React.forwardRef<HTMLDivElement, Props>(
  ({ onClose, onKeyDown, disableBackdropClick, ...props }, ref) => {
    return (
      <MUIDialog
        onClose={(_event, reason) => {
          if (
            onClose &&
            (!disableBackdropClick || reason !== "backdropClick")
          ) {
            onClose();
          }
        }}
        onKeyDown={(e) => (onKeyDown ? onKeyDown(e) : e.stopPropagation())}
        ref={ref}
        {...props}
      >
        {props.children}
      </MUIDialog>
    );
  },
);
