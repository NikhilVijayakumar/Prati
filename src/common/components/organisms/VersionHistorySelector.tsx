import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export interface HistoryEntry {
  version: number;
  createdAt: string;
}

export interface VersionHistorySelectorProps {
  entries: HistoryEntry[];
  selectedVersion: number;
  latestVersion: number;
  onVersionChange: (version: number) => void;
  versionPrefix?: string;
  versionLabel?: string;
  versionsLabel?: string;
  latestLabel?: string;
  availableLabel?: string;
  locale?: string;
}

export const VersionHistorySelector: React.FC<VersionHistorySelectorProps> = ({
  entries,
  selectedVersion,
  latestVersion,
  onVersionChange,
  versionPrefix = "v",
  versionLabel,
  versionsLabel,
  latestLabel,
  availableLabel,
  locale,
}): React.ReactElement | null => {
  if (!entries || entries.length <= 1) {
    return null;
  }

  const sortedEntries = [...entries].sort((a, b) => b.version - a.version);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: spacing.md,
        p: spacing.sm,
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      {versionLabel && (
        <Typography variant="body2" fontWeight="medium">
          {versionLabel}
        </Typography>
      )}
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <Select
          value={selectedVersion}
          onChange={(e) => onVersionChange(Number(e.target.value))}
          sx={{ fontSize: "0.875rem" }}
        >
          {sortedEntries.map((entry) => (
            <MenuItem key={entry.version} value={entry.version}>
              <Box>
                <Typography variant="body2">
                  {versionPrefix}
                  {entry.version}
                  {entry.version === latestVersion && (
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ ml: 1, color: "success.main", fontWeight: "bold" }}
                    >
                      ({latestLabel})
                    </Typography>
                  )}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(entry.createdAt)}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="caption" color="text.secondary">
        {sortedEntries.length}{versionsLabel ? ` ${versionsLabel}` : ''}{availableLabel ? ` ${availableLabel}` : ''}
      </Typography>
    </Box>
  );
};
