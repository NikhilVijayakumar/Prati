import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";
import { fonts } from "../../../theme/tokens/typography";

export interface LogEntry {
  id: string | number;
  timestamp: string;
  level: string;
  message: string;
}

export interface TerminalViewerProps {
  logs: LogEntry[];
  emptyMessage?: string;
  bottomRef?: React.RefObject<HTMLDivElement>;
}

const levelColorMap: Record<string, string> = {
  ERROR: 'error.main',
  WARN: 'warning.main',
  INFO: 'success.main',
};

export const TerminalViewer: React.FC<TerminalViewerProps> = ({
  logs,
  emptyMessage,
  bottomRef,
}) => {
  const { literal } = useLanguage();
  const defaultMessage = literal["viewer.waiting_logs"];
  const displayMessage = emptyMessage || defaultMessage;
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        bgcolor: 'background.paper',
        color: 'text.primary',
        p: spacing.md,
        overflow: "auto",
        fontFamily: fonts.mono,
        border: `1px solid`,
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      {logs.length === 0 && (
        <Typography sx={{ color: 'text.disabled', fontStyle: "italic" }}>
          {displayMessage}
        </Typography>
      )}
      {logs.map((log) => (
        <Box
          key={log.id}
          sx={{ display: "flex", gap: spacing.md, mb: spacing.xs }}
        >
          <Typography
            component="span"
            sx={{ color: 'text.secondary', minWidth: 90, opacity: 0.7 }}
          >
            {log.timestamp}
          </Typography>
          <Typography
            component="span"
            sx={{
              color: levelColorMap[log.level] || 'text.secondary',
              fontWeight: "bold",
              minWidth: 60,
            }}
          >
            {log.level}
          </Typography>
          <Typography component="span" sx={{ whiteSpace: "pre-wrap", flex: 1 }}>
            {log.message}
          </Typography>
        </Box>
      ))}
      {bottomRef && <div ref={bottomRef} />}
    </Paper>
  );
};
