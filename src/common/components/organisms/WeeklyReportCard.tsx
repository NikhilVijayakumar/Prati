import type { ReactElement } from "react";
import { FC } from "react";
import { Box, Typography, useTheme as useMuiTheme } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export interface WeeklyReportCardLabels {
  improvedTitle: string;
  slipsTitle: string;
  risksTitle: string;
  emptyImproved: string;
  emptySlips: string;
  emptyRisks: string;
}

export interface WeeklyReportCardProps {
  owner: string;
  domain: string;
  customMetricLabel?: string;
  customMetricValue?: string;
  improvements: string[];
  slips: string[];
  risks: string[];
  labels: WeeklyReportCardLabels;
}

const renderSectionList = (
  items: string[],
  emptyText: string,
  textColor: string,
): ReactElement => {
  if (items.length === 0) {
    return (
      <Typography
        variant="body2"
        sx={{ color: textColor, fontStyle: "italic" }}
      >
        {emptyText}
      </Typography>
    );
  }

  return (
    <Box
      component="ul"
      sx={{ m: 0, pl: spacing.lg, color: "text.primary", typography: "body2" }}
    >
      {items.map((item, index) => (
        <Box
          key={`${item}-${index}`}
          component="li"
          sx={{ mb: spacing.internal }}
        >
          {item}
        </Box>
      ))}
    </Box>
  );
};

export const WeeklyReportCard: FC<WeeklyReportCardProps> = ({
  owner,
  domain,
  customMetricLabel,
  customMetricValue,
  improvements,
  slips,
  risks,
  labels,
}) => {
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        backgroundColor: muiTheme.palette.background.paper,
        border: 1,
        borderColor: "divider",
        borderRadius: spacing.xs,
        p: spacing.lg,
        display: "flex",
        flexDirection: "column",
        gap: spacing.md,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: spacing.sm,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ color: muiTheme.palette.text.primary }}
          >
            {owner}
          </Typography>
          <Typography
            variant="micro"
            sx={{ color: muiTheme.palette.text.secondary }}
          >
            {domain}
          </Typography>
        </Box>
        {!!customMetricLabel && (
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="micro"
              sx={{
                color: muiTheme.palette.text.secondary,
                textTransform: "uppercase",
              }}
            >
              {customMetricLabel}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: muiTheme.palette.primary.main,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {customMetricValue}
            </Typography>
          </Box>
        )}
      </Box>

      <Box>
        <Typography
          variant="captionBold"
          sx={{
            color: muiTheme.palette.success.main,
            mb: spacing.internal,
            display: "block",
          }}
        >
          {labels.improvedTitle}
        </Typography>
        {renderSectionList(
          improvements,
          labels.emptyImproved,
          muiTheme.palette.text.secondary,
        )}
      </Box>

      <Box>
        <Typography
          variant="captionBold"
          sx={{
            color: muiTheme.palette.warning.main,
            mb: spacing.internal,
            display: "block",
          }}
        >
          {labels.slipsTitle}
        </Typography>
        {renderSectionList(
          slips,
          labels.emptySlips,
          muiTheme.palette.text.secondary,
        )}
      </Box>

      <Box>
        <Typography
          variant="captionBold"
          sx={{
            color: muiTheme.palette.error.main,
            mb: spacing.internal,
            display: "block",
          }}
        >
          {labels.risksTitle}
        </Typography>
        {renderSectionList(
          risks,
          labels.emptyRisks,
          muiTheme.palette.text.secondary,
        )}
      </Box>
    </Box>
  );
};
