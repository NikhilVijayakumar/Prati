import type { FC } from "react";
import { Typography } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export type SeverityLevel =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "ERROR";

export interface SeverityBadgeProps {
  level: SeverityLevel | string;
}

export const SeverityBadge: FC<SeverityBadgeProps> = ({ level }) => {
  const colorMap: Record<string, string> = {
    CRITICAL: 'error.main',
    HIGH:     'error.main',
    ERROR:    'error.main',
    MEDIUM:   'warning.main',
    WARNING:  'warning.main',
    LOW:      'info.main',
    INFO:     'info.main',
    SUCCESS:  'success.main',
  };
  const tone = colorMap[level?.toString().toUpperCase()] || 'text.secondary';

  return (
    <Typography
      variant="micro"
      sx={{
        px: spacing.sm,
        py: spacing.internal,
        borderRadius: 1,
        backgroundColor: `${tone}15`,
        color: tone,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {level}
    </Typography>
  );
};
