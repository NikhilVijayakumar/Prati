import { FC, useState } from "react";
import { Box, Typography, TablePagination } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";
import { DataTable, Column } from "./DataTable";

interface CsvViewerProps {
  fileName: string;
  fileContent?: string;
}

type CsvRow = Record<string, string>;

const parseCsv = (content: string): { headers: string[]; rows: string[][] } => {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(delimiter).map((item) => item.trim());
  const rows = lines
    .slice(1)
    .map((line) => line.split(delimiter).map((item) => item.trim()));
  return { headers, rows };
};

export const CsvViewer: FC<CsvViewerProps> = ({ fileName, fileContent }) => {
  const { literal } = useLanguage();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { headers, rows } = parseCsv(fileContent ?? "");

  const columns: Column<CsvRow>[] = headers.map((h) => ({
    id: h,
    label: h,
    minWidth: 100,
  }));

  const tableData: CsvRow[] = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, idx) =>
      headers.reduce<CsvRow>(
        (acc, h, i) => ({ ...acc, [h]: row[i] ?? "" }),
        { __key: String(page * rowsPerPage + idx) }
      )
    );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: spacing.md,
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: spacing.md, color: "text.primary" }}
      >
        {fileName}
      </Typography>

      {headers.length === 0 ? (
        <Typography variant="body2" sx={{ mb: spacing.md, color: "text.secondary" }}>
          {literal["viewer.empty_csv"]}
        </Typography>
      ) : (
        <DataTable<CsvRow>
          columns={columns}
          data={tableData}
          keyField="__key"
          aria-label={`${fileName} data`}
        />
      )}

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};
