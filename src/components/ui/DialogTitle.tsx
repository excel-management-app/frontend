import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Tooltip,
  DialogTitle as MuiDialogTitle,
  DialogTitleProps,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import { makeStyles, withStyles } from "tss-react/mui";
import React from "react";

const useStyles = makeStyles()(() => ({}));

const styles = (theme: Theme) => {
  return {
    root: {
      minHeight: "58px",
      padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
      display: "flex",
      flexDirection: "row" as const,
      justifyContent: "space-between",
    },
    title: {
      padding: `${theme.spacing(1)} 0`,
    },
    subtitle: {
      fontWeight: 500,
    },
    startActions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    endActions: {
      marginRight: theme.spacing(-2),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
      display: "flex",
      flexDirection: "row" as const,
      alignItems: "center",
      justifyContent: "center",
    },
    actionsItem: {
      marginLeft: theme.spacing(0.5),
    },
  };
};
type Props = DialogTitleProps & {
  children?: React.ReactNode;
  subTitle?: React.ReactNode;
  onClose?: () => void;
  loading?: boolean;
  startActions?: JSX.Element;
  endActions?: JSX.Element;
  disabled?: boolean;
  closeTitle?: string;
  stopPropogation?: boolean;
  classes?: Partial<
    Record<
      | "root"
      | "title"
      | "subtitle"
      | "actionsItem"
      | "startActions"
      | "endActions",
      string
    >
  >;
};

const DialogTitle = withStyles((props: Props) => {
  const {
    children,
    subTitle,
    startActions,
    endActions,
    onClose,
    className,
    loading,
    disabled,
    closeTitle,
    stopPropogation,
    ...dialogTitleProps
  } = props;

  const classes = withStyles.getClasses(dialogTitleProps);
  const { cx } = useStyles();

  return (
    <MuiDialogTitle
      className={cx(classes.root, className)}
      {...dialogTitleProps}
    >
      <Box display="flex" flexDirection="row" alignItems="center" flex={1}>
        <Box display="flex" alignItems="left" flexDirection="column">
          <Typography variant="h5" className={classes.title}>
            {children}
          </Typography>
          {subTitle && (
            <Typography variant="body2" className={classes.subtitle}>
              {subTitle}
            </Typography>
          )}
        </Box>
        {startActions && (
          <Box className={cx(classes.actionsItem, classes.startActions)}>
            {startActions}
          </Box>
        )}
      </Box>
      <Box className={classes.endActions}>
        {endActions && <Box className={classes.actionsItem}>{endActions}</Box>}
        {onClose && (
          <Tooltip title={closeTitle ?? ""}>
            <span>
              <IconButton
                aria-label="close"
                className={classes.actionsItem}
                onClick={(e) => {
                  if (stopPropogation) {
                    e.stopPropagation();
                    e.preventDefault();
                  }
                  onClose();
                }}
                disabled={loading || disabled}
                size="large"
                data-testid="btn-close-dialog"
              >
                <CloseIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Box>
    </MuiDialogTitle>
  );
}, styles);

export default DialogTitle;
