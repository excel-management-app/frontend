import { Box, Theme } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useEffect, useMemo, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { makeStyles } from "tss-react/mui";
import { getFileData } from "../../apis/excel";
import { FileData } from "../../apis/types";
import { SheetNameSelect } from "./SheetNamesSelector";
import { VirtuosoTableComponents } from "./VirtuosoTableComponents";

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    height: "100%",
    width: "100%",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
}));

interface Props {
  fileId: string;
}
export const ExcelViewer = ({ fileId }: Props) => {
  const { classes } = useStyles();

  const [data, setData] = useState<FileData>();
  const [sheetName, setSheetName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getFileData({ fileId });
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fileId, sheetName]);

  const {
    sheetNames,
    rows: sheetRows,
    headers: sheetHeaders,
  } = useMemo(() => {
    const currentSheet = data?.sheets.find(
      (sheet) => sheet.sheetName === sheetName
    );
    const headers = currentSheet?.headers || [];
    const rows = currentSheet?.rows || [];
    const sheetNames = data?.sheets.map((sheet) => sheet.sheetName) || [];
    return {
      sheetNames,
      rows,
      headers,
    };
  }, [data?.sheets, sheetName]);
  console.log(data);

  function fixedHeaderContent() {
    return (
      <TableRow>
        {sheetHeaders.map((column) => (
          <TableCell
            key={column}
            variant="head"
            sx={{ backgroundColor: "background.paper" }}
          >
            {column}
          </TableCell>
        ))}
      </TableRow>
    );
  }
  function rowContent(_index: number, row: string[]) {
    return (
      <>
        {sheetHeaders.map((column) => (
          <TableCell key={column}>
            {row[sheetHeaders.indexOf(column)]}
          </TableCell>
        ))}
      </>
    );
  }

  return loading ? (
    <>Loading</>
  ) : (
    <Box className={classes.root}>
      <Box className={classes.buttons}>
        <SheetNameSelect
          sheetNames={sheetNames}
          onChange={setSheetName}
          value={sheetName}
        />
      </Box>
      <Paper style={{ height: "80vh", width: "100%" }}>
        <TableVirtuoso
          data={sheetRows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
};
