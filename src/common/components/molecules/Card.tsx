import { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export interface CardProps {
  title?: string;
  supportingText?: string;
  children?: ReactNode;
  action?: ReactNode;
}

export const Card = ({
  title,
  supportingText,
  children,
  action,
}: CardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: spacing.lg,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        display: "flex",
        flexDirection: "column",
        gap: spacing.xs,
      }}
    >
      {(title || supportingText || action) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            {title && (
              <Typography
                variant="h4"
                color="text.primary"
              >
                {title}
              </Typography>
            )}
            {supportingText && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: spacing.internal }}
              >
                {supportingText}
              </Typography>
            )}
          </Box>
          {action && <Box>{action}</Box>}
        </Box>
      )}
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Paper>
  );
};
