import type { FC } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";
import { StatusDot } from "../atoms/StatusDot";
import type { StatusDotTone } from "../atoms/StatusDot";

export type HealthTone = StatusDotTone;

export interface HealthSummaryItem {
  label: string;
  value: string;
  tone?: HealthTone;
}

export interface HealthAction {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface OperationHealthPanelProps {
  title: string;
  subtitle?: string;
  summaryItems: HealthSummaryItem[];
  actions?: HealthAction[];
  footerText?: string;
  isBusy?: boolean;
}

export const OperationHealthPanel: FC<OperationHealthPanelProps> = ({
  title,
  subtitle,
  summaryItems,
  actions = [],
  footerText,
  isBusy = false,
}) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        p: spacing.lg,
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={spacing.md}>
        <Box>
          <Typography variant="h6" sx={{ mb: spacing.xs }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        <Stack spacing={spacing.sm}>
          {summaryItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: spacing.md,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: spacing.xs }}
              >
                <StatusDot tone={item.tone ?? "default"} size={8} />
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>

        {actions.length > 0 && (
          <>
            <Divider />
            <Box sx={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
              {actions.map((action) => (
                <Button
                  key={action.id}
                  variant="outlined"
                  size="small"
                  onClick={action.onClick}
                  disabled={isBusy || action.disabled}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          </>
        )}

        {footerText && (
          <Typography variant="caption" color="text.secondary">
            {footerText}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};
