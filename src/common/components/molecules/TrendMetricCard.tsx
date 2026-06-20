import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export type MetricTrend = "up" | "down" | "neutral";

export interface TrendMetricCardProps {
  label: string;
  value: string | number;
  trendValue?: string;
  trend?: MetricTrend;
}

const trendArrow: Record<MetricTrend, string> = {
  up: '▲',
  down: '▼',
  neutral: '—',
};

const trendAriaLabel: Record<MetricTrend, string> = {
  up: 'trending up',
  down: 'trending down',
  neutral: 'no change',
};

export const TrendMetricCard: FC<TrendMetricCardProps> = ({
  label,
  value,
  trendValue,
  trend,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        p: spacing.md,
        backgroundColor: 'background.paper',
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="micro"
        sx={{ color: 'text.secondary' }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: spacing.sm,
          mt: spacing.xs,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </Typography>
        {!!trendValue && (
          <Typography
            component="span"
            variant="caption"
            aria-label={trend ? trendAriaLabel[trend] : undefined}
            sx={{
              color: trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            {trend && (
              <span aria-hidden="true">{trendArrow[trend]}</span>
            )}
            {trendValue}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
