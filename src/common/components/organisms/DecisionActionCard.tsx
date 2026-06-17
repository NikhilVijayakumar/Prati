import { FC } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme as useMuiTheme,
} from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

export interface DecisionAction {
  label: string;
  variant: "contained" | "outlined" | "text";
  color?: "primary" | "success" | "error";
  disabled?: boolean;
  onClick?: () => void;
}

export interface DecisionActionCardProps {
  source: string;
  description: string;
  expiryText: string;
  actions: DecisionAction[];
}

export const DecisionActionCard: FC<DecisionActionCardProps> = ({
  source,
  description,
  expiryText,
  actions,
}) => {
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        p: spacing.md,
        backgroundColor: muiTheme.palette.background.paper,
        border: 1,
        borderColor: "divider",
        borderRadius: spacing.xs,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: spacing.md,
        }}
      >
        <Box>
          <Typography
            variant="body2Bold"
            sx={{ color: muiTheme.palette.text.primary }}
          >
            {source}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: muiTheme.palette.text.secondary, mt: spacing.xs }}
          >
            {description}
          </Typography>
        </Box>
        <Typography
          variant="monoBody"
          sx={{ color: muiTheme.palette.error.main }}
        >
          {expiryText}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: spacing.sm }}>
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            size="small"
            color={action.color}
            disabled={action.disabled}
            onClick={action.onClick}
            sx={
              action.variant === "text"
                ? { color: muiTheme.palette.text.secondary }
                : undefined
            }
          >
            {action.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
