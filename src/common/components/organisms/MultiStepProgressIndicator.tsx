import type { FC } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { spacing } from "../../../theme/tokens/spacing";

export type StepStatus =
  | "not-started"
  | "in-progress"
  | "completed"
  | "blocked";

export interface ProgressStep {
  id: string;
  label: string;
  shortLabel?: string;
  status?: StepStatus;
}

export interface MultiStepProgressIndicatorProps {
  steps: ProgressStep[];
  currentStepId: string;
}

const statusColorByTone = (
  status: StepStatus,
  palette: Theme["palette"],
): string => {
  switch (status) {
    case "completed":
      return palette.success.main;
    case "in-progress":
      return palette.info.main;
    case "blocked":
      return palette.error.main;
    default:
      return palette.grey[500];
  }
};

export const MultiStepProgressIndicator: FC<
  MultiStepProgressIndicatorProps
> = ({ steps, currentStepId }) => {
  const muiTheme = useMuiTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.sm,
          flexWrap: "wrap",
        }}
      >
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStepId;
          const status =
            step.status ?? (isCurrent ? "in-progress" : "not-started");
          const pointColor = statusColorByTone(status, muiTheme.palette);

          return (
            <Box
              key={step.id}
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                minWidth: 160,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: spacing.xs }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: pointColor,
                    boxShadow: isCurrent
                      ? `0 0 0 3px ${muiTheme.palette.action.hover}`
                      : "none",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: isCurrent
                      ? muiTheme.palette.text.primary
                      : muiTheme.palette.text.secondary,
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {step.shortLabel ?? step.label}
                </Typography>
              </Box>

              {index < steps.length - 1 && (
                <Box
                  aria-hidden
                  sx={{
                    flex: 1,
                    height: 1,
                    ml: spacing.sm,
                    mr: spacing.sm,
                    backgroundColor: muiTheme.palette.divider,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
