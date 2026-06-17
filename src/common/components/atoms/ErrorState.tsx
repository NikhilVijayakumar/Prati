// src/common/components/ErrorState.tsx

import { FC } from "react";
import { Box, Alert } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

interface ErrorStateProps {
  message?: string;
}

const ErrorState: FC<ErrorStateProps> = ({ message }) => {
  const { literal } = useLanguage();

  const finalMessage = message || literal.unknown_message;

  return (
    <Box sx={{ p: spacing.lg, textAlign: "center", mt: spacing.xl }}>
      <Alert severity="error">{finalMessage}</Alert>
    </Box>
  );
};

export default ErrorState;
