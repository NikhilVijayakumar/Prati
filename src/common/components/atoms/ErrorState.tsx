// src/common/components/atoms/ErrorState.tsx

import type { FC } from "react";
import { Box, Alert } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

interface ErrorStateProps {
  message?: string;
}

export const ErrorState: FC<ErrorStateProps> = ({ message }) => {
  const { literal } = useLanguage();

  const finalMessage = message || literal.unknown_message;

  return (
    <Box role="alert" sx={{ p: spacing.lg, textAlign: "center", mt: spacing.xl }}>
      <Alert severity="error">{finalMessage}</Alert>
    </Box>
  );
};
