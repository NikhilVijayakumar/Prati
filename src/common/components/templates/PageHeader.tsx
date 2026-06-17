import { FC, ReactNode } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export interface HeaderActionConfig {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  primaryAction?: HeaderActionConfig;
  secondaryAction?: HeaderActionConfig;
  leadingMeta?: ReactNode;
  trailingMeta?: ReactNode;
}

const renderAction = (action: HeaderActionConfig): ReactNode => (
  <Button
    variant={action.variant ?? "outlined"}
    size={action.size ?? "small"}
    onClick={action.onClick}
    disabled={action.disabled}
    sx={{
      borderRadius: 1,
      textTransform: 'none',
    }}
  >
    {action.label}
  </Button>
);

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  leadingMeta,
  trailingMeta,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: spacing.xl,
        gap: spacing.md,
        flexWrap: "wrap",
      }}
    >
      <Box>
        <Typography
          variant="h2"
          sx={{ color: 'text.primary', mb: spacing.xs, fontWeight: 600 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary' }}
          >
            {subtitle}
          </Typography>
        )}
        {leadingMeta}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: spacing.md,
          flexWrap: "wrap",
        }}
      >
        {trailingMeta}
        {secondaryAction && renderAction(secondaryAction)}
        {primaryAction && renderAction(primaryAction)}
      </Box>
    </Box>
  );
};
