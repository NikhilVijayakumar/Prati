import { FC } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";
import { StatusDot, StatusDotTone } from "../atoms/StatusDot";

const DOMAIN_COLUMN_WIDTH = 150;

export interface StatusListRowProps {
  domain: string;
  statusLine: string;
  health: StatusDotTone;
  showDivider?: boolean;
}

export const StatusListRow: FC<StatusListRowProps> = ({
  domain,
  statusLine,
  health,
  showDivider = false,
}) => {
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: spacing.md,
        borderTop: showDivider ? 1 : 0,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="body2Medium"
        sx={{
          width: DOMAIN_COLUMN_WIDTH,
          color: muiTheme.palette.text.primary,
        }}
      >
        {domain}
      </Typography>
      <Typography
        variant="body2"
        sx={{ flexGrow: 1, color: muiTheme.palette.text.secondary }}
      >
        {statusLine}
      </Typography>
      <StatusDot tone={health} size={8} />
    </Box>
  );
};
