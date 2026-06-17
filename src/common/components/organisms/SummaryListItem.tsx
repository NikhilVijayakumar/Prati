import { FC } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";
import { SeverityBadge } from "../atoms/SeverityBadge";

export interface SummaryListItemProps {
  id: string;
  summary: string;
  source: string;
  classification: string;
}

export const SummaryListItem: FC<SummaryListItemProps> = ({
  id,
  summary,
  source,
  classification,
}) => {
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        p: spacing.md,
        backgroundColor: muiTheme.palette.background.paper,
        border: 1,
        borderColor: "divider",
        borderRadius: spacing.xs,
        display: "flex",
        alignItems: "center",
        gap: spacing.md,
      }}
    >
      <Box
        sx={{
          background: muiTheme.palette.divider,
          borderRadius: spacing.internal,
          px: spacing.sm,
          py: spacing.internal,
        }}
      >
        <Typography
          variant="monoBody"
          sx={{ color: muiTheme.palette.text.secondary }}
        >
          {id}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2Bold"
          sx={{ color: muiTheme.palette.text.primary }}
        >
          {summary}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: muiTheme.palette.text.secondary }}
        >
          {source}
        </Typography>
      </Box>
      <SeverityBadge level={classification} />
    </Box>
  );
};
