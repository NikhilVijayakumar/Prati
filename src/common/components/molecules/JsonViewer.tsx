import { FC, lazy, Suspense, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

const SyntaxHighlighter = lazy(() =>
  import("react-syntax-highlighter").then((mod) => ({ default: mod.Prism }))
);

const vscDarkPlusPromise = import("react-syntax-highlighter/dist/esm/styles/prism").then((mod) => mod.vscDarkPlus);

interface JsonViewerProps {
  fileName: string;
  fileContent?: string;
}

const normalizeJsonForDisplay = (
  fileName: string,
  fileContent?: string,
  emptyMessage?: string,
): string => {
  if (!fileContent || fileContent.trim().length === 0) {
    return JSON.stringify(
      { message: emptyMessage },
      null,
      2,
    );
  }

  if (fileName.toLowerCase().endsWith(".jsonl")) {
    const lines = fileContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const objects = lines.map((line, index) => {
      try {
        return JSON.parse(line);
      } catch {
        return { line: index + 1, parseError: true, raw: line };
      }
    });

    return JSON.stringify(objects, null, 2);
  }

  try {
    return JSON.stringify(JSON.parse(fileContent), null, 2);
  } catch {
    return JSON.stringify({ parseError: true, raw: fileContent }, null, 2);
  }
};

export const JsonViewer: FC<JsonViewerProps> = ({ fileName, fileContent }) => {
  const { literal } = useLanguage();

  const LoadingFallback = () => (
    <Box sx={{ p: spacing.md, color: 'text.secondary' }}>{literal["msg.loading"]}</Box>
  );

  const emptyMessage = literal["viewer.empty_json"];
  const normalized = normalizeJsonForDisplay(fileName, fileContent, emptyMessage);
  const [style, setStyle] = useState<Record<string, React.CSSProperties> | null>(null);

  if (!style) {
    vscDarkPlusPromise.then(setStyle);
    return <LoadingFallback />;
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          p: spacing.sm,
          backgroundColor: 'background.paper',
          borderBottom: `1px solid`,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {fileName}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: "auto", p: spacing.sm }}>
        <Suspense fallback={<LoadingFallback />}>
          <SyntaxHighlighter
            language="json"
            style={style}
            customStyle={{
              margin: 0,
              padding: spacing.md,
              borderRadius: 1,
              fontSize: "0.75rem",
              fontFamily: '"IBM Plex Mono", "Menlo", monospace',
              backgroundColor: 'background.paper',
            }}
          >
            {normalized}
          </SyntaxHighlighter>
        </Suspense>
      </Box>
    </Box>
  );
};
