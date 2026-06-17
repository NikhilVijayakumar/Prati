import { FC } from "react";
import { Typography } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export type SeverityLevel =
  | "CRITICAL"
  | "WARNING"
  | "URGENT"
  | "INFO"
  | "SUCCESS";

export interface SeverityBadgeProps {
  level: SeverityLevel | string;
}

export const SeverityBadge: FC<SeverityBadgeProps> = ({ level }) => {
  const colorMap: Record<string, string> = {
    CRITICAL: 'error.main',
    ERROR: 'error.main',
    WARNING: 'warning.main',
    URGENT: 'warning.main',
    SUCCESS: 'success.main',
    INFO: 'info.main',
  };
  const tone = colorMap[level] || 'info.main';

  return (
    <Typography
      variant="micro"
      sx={{
        px: spacing.sm,
        py: spacing.internal,
        borderRadius: 1,
        backgroundColor: `${tone}15`,
        color: tone,
      }}
    >
      {level}
    </Typography>
  );
};
