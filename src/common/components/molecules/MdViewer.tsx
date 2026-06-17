import { FC, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

interface MdViewerProps {
  fileName: string;
  fileContent?: string;
}

const Markdown = lazy(() => import("react-markdown").then(module => ({ default: module.default })));

export const MdViewer: FC<MdViewerProps> = ({ fileName, fileContent }) => {
  const { literal } = useLanguage();

  const LoadingFallback = () => (
    <Box sx={{ p: spacing.md, color: 'text.secondary' }}>{literal["msg.loading"]}</Box>
  );
  const emptyMessage = literal["viewer.empty_markdown"];
  const content =
    fileContent && fileContent.trim().length > 0
      ? fileContent
      : `_${emptyMessage}_`;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: spacing.xl,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        overflowY: "auto",
      }}
    >
      <Typography variant="h3" sx={{ mb: spacing.sm, fontWeight: 600 }}>
        {fileName}
      </Typography>
      <Divider sx={{ mb: spacing.md }} />

      <Box
        sx={{
          "& h1, & h2, & h3": {
            color: 'primary.main',
            mt: spacing.md,
            mb: spacing.xs,
          },
          "& p": { mb: spacing.sm, lineHeight: 1.6 },
          "& ul, & ol": { pl: spacing.lg, mb: spacing.sm },
          "& blockquote": {
            borderLeft: `4px solid`,
            borderColor: 'primary.main',
            pl: spacing.md,
            py: spacing.internal,
            my: spacing.md,
            backgroundColor: 'action.hover',
            fontStyle: "italic",
          },
          "& hr": { my: spacing.lg, opacity: 0.1 },
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Markdown>{content}</Markdown>
        </Suspense>
      </Box>
    </Box>
  );
};
