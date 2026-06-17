import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export interface SummaryLine {
  text: string;
  variant?: "body2" | "caption";
}

export interface SummaryPanelProps {
  title: string;
  lines: SummaryLine[];
}

export const SummaryPanel: FC<SummaryPanelProps> = ({ title, lines }) => {
  return (
    <Box
      sx={{
        p: spacing.lg,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: 'text.primary', mb: spacing.sm, fontWeight: 600 }}
      >
        {title}
      </Typography>

      {lines.map((line, index) => (
        <Typography
          key={`${line.text}-${index}`}
          variant={line.variant ?? "body2"}
          sx={{
            color: 'text.secondary',
            display: line.variant === "caption" ? "block" : "inline",
          }}
        >
          {line.text}
        </Typography>
      ))}
    </Box>
  );
};
