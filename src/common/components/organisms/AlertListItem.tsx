import { FC } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";
import { SeverityBadge } from "../atoms/SeverityBadge";
import { StatusDot } from "../atoms/StatusDot";

const SEVERITY_COLUMN_WIDTH = 100;

export interface AlertListItemProps {
  id: string;
  source: string;
  timestamp: string;
  message: string;
  severity: "CRITICAL" | "WARNING" | "INFO";
  read: boolean;
}

export const AlertListItem: FC<AlertListItemProps> = ({
  source,
  timestamp,
  message,
  severity,
  read,
}) => {
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        p: spacing.md,
        backgroundColor: read
          ? "transparent"
          : muiTheme.palette.background.paper,
        border: 1,
        borderColor: read ? "transparent" : "divider",
        borderRadius: spacing.xs,
        opacity: read ? 0.7 : 1,
        transition: muiTheme.transitions.create("all", {
          duration: muiTheme.transitions.duration.shorter,
          easing: muiTheme.transitions.easing.easeInOut,
        }),
      }}
    >
      <Box sx={{ width: 40, mt: spacing.internal }}>
        <StatusDot
          tone={
            severity === "CRITICAL"
              ? "error"
              : severity === "WARNING"
                ? "warning"
                : "executing"
          }
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", gap: spacing.md, mb: spacing.internal }}>
          <Typography
            variant="body2Bold"
            sx={{ color: muiTheme.palette.text.primary }}
          >
            {source}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: muiTheme.palette.text.secondary }}
          >
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ color: muiTheme.palette.text.primary }}
        >
          {message}
        </Typography>
      </Box>
      <Box sx={{ width: SEVERITY_COLUMN_WIDTH, textAlign: "right" }}>
        <SeverityBadge level={severity} />
      </Box>
    </Box>
  );
};
