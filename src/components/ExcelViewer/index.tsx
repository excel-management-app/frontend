import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useMemo, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { readFileApi } from "../../apis/read";
import { VirtuosoTableComponents } from "./VirtuosoTableComponents";
import { Box, Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { SheetNameSelect } from "./SheetNamesSelector";

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
export const ExcelViewer = () => {
  const { classes } = useStyles();

  const [jsonData, setJsonData] = useState<{
    data: string[][];
    sheetNames: string[];
  }>();
  const [sheetName, setSheetName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await readFileApi({
          sheetName,
        });
        setJsonData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sheetName]);

  const headers = useMemo<string[]>(() => {
    if (jsonData?.data?.length) {
      return jsonData.data[0];
    } else {
      return [];
    }
  }, [jsonData]);

  const rows = useMemo(() => {
    if (jsonData?.data?.length) {
      return jsonData.data.slice(1);
    } else {
      return [];
    }
  }, [jsonData]);

  function fixedHeaderContent() {
    return (
      <TableRow>
        {headers.map((column) => (
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
        {headers.map((column) => (
          <TableCell key={column}>{row[headers.indexOf(column)]}</TableCell>
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
          sheetNames={jsonData?.sheetNames || []}
          onChange={setSheetName}
          value={sheetName}
        />
      </Box>
      <Paper style={{ height: "80vh", width: "100%" }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </Box>
  );
};
