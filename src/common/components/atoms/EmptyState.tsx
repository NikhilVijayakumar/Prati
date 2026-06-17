// src/common/components/EmptyState.tsx
import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

const EmptyState: FC = () => {
  const { literal } = useLanguage();

  return (
    <Box sx={{ p: spacing.lg, textAlign: "center", mt: spacing.xl }}>
      <Typography variant="body1" color="text.secondary">
        {literal.no_data_found}
      </Typography>
    </Box>
  );
};

export default EmptyState;
