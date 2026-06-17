import type { FC, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export interface EntryLayoutFrameProps {
  children: ReactNode;
  titleText?: string;
  enableDragRegion?: boolean;
}

export const EntryLayoutFrame: FC<EntryLayoutFrameProps> = ({
  children,
  titleText = "Authentication",
  enableDragRegion = false,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 40,
          px: spacing.md,
          display: "flex",
          alignItems: "center",
          borderBottom: 1,
          borderColor: "divider",
          ...(enableDragRegion ? { WebkitAppRegion: "drag" } : {}),
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ letterSpacing: 0.2 }}
        >
          {titleText}
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: spacing.lg,
          py: spacing.xl,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
