import { FC } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

const ID_COLUMN_WIDTH = 40;
const STATUS_COLUMN_WIDTH = 150;
const CONFIDENCE_COLUMN_WIDTH = 100;

export interface EntityConfidenceRowProps {
  id: string;
  title: string;
  secondaryLabel: string;
  statusTag: string;
  confidence: number;
  confidenceLabel: string;
  showDivider?: boolean;
}

export const EntityConfidenceRow: FC<EntityConfidenceRowProps> = ({
  id,
  title,
  secondaryLabel,
  statusTag,
  confidence,
  confidenceLabel,
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
      <Box sx={{ width: ID_COLUMN_WIDTH }}>
        <Typography
          variant="micro"
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
          {title}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: muiTheme.palette.text.secondary }}
        >
          {secondaryLabel}
        </Typography>
      </Box>
      <Box sx={{ width: STATUS_COLUMN_WIDTH }}>
        <Typography
          variant="captionBold"
          sx={{
            px: spacing.sm,
            py: spacing.internal,
            borderRadius: spacing.internal,
            backgroundColor: `${muiTheme.palette.primary.main}20`,
            color: muiTheme.palette.primary.main,
          }}
        >
          {statusTag.toUpperCase()}
        </Typography>
      </Box>
      <Box sx={{ width: CONFIDENCE_COLUMN_WIDTH, textAlign: "right" }}>
        <Typography
          variant="caption"
          sx={{ color: muiTheme.palette.text.secondary }}
        >
          {confidenceLabel}
        </Typography>
        <Typography
          variant="body2Bold"
          sx={{ color: muiTheme.palette.text.primary }}
        >
          {confidence}%
        </Typography>
      </Box>
    </Box>
  );
};
