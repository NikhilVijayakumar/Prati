import type { ReactElement, ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { ErrorBoundary } from "./ErrorBoundary";
import { spacing } from "../../../theme/tokens/spacing";

export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  'aria-label'?: string;
  cellErrorText?: string;
}

export const DataTable = <T extends Record<string, unknown>>({ columns, data, keyField, 'aria-label': ariaLabel, cellErrorText }: DataTableProps<T>): ReactElement => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Table stickyHeader aria-label={ariaLabel ?? 'data table'}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: 600,
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    px: spacing.md,
                    py: spacing.sm,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={String(row[keyField])}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{ px: spacing.md, py: spacing.sm }}
                    >
                      {column.render ? <ErrorBoundary fallback={cellErrorText ? <Typography variant="caption" color="error.main">{cellErrorText}</Typography> : undefined}>{column.render(row)}</ErrorBoundary> : row[column.id] as React.ReactNode}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
