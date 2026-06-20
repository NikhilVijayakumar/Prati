import { FC, useState, useMemo } from "react";
import { Box, Typography, TablePagination } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";
import { DataTable, Column } from "./DataTable";
import { parseCsv } from "./parseCsv";

interface CsvViewerProps {
  fileName: string;
  fileContent?: string;
}

type CsvRow = Record<string, string>;

export const CsvViewer: FC<CsvViewerProps> = ({ fileName, fileContent }) => {
  const { literal } = useLanguage();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { headers, rows } = useMemo(() => parseCsv(fileContent ?? ""), [fileContent]);

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
