import { FC } from "react";
import { CsvViewer } from "./CsvViewer";
import { MdViewer } from "../molecules/MdViewer";
import { ImageViewer } from "../molecules/ImageViewer";
import { JsonViewer } from "../molecules/JsonViewer";
import { Box, Typography } from "@mui/material";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

interface FileViewerRouterProps {
  fileName: string;
  fileContent?: string;
  fileEncoding?: "text" | "base64";
  mimeType?: string;
}

export const FileViewerRouter: FC<FileViewerRouterProps> = ({
  fileName,
  fileContent,
  fileEncoding,
  mimeType,
}) => {
  const { literal } = useLanguage();
  const ext = fileName.split(".").pop()?.toLowerCase();

  const fallbackTitle = literal["viewer.unsupported"] ?? "⚠️";
  const fallbackExt = literal["viewer.extension"] ?? "📄";

  switch (ext) {
    case "csv":
      return <CsvViewer fileName={fileName} fileContent={fileContent} />;
    case "md":
    case "markdown":
    case "txt":
      return <MdViewer fileName={fileName} fileContent={fileContent} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "webp":
      return (
        <ImageViewer
          fileName={fileName}
          fileContent={fileContent}
          fileEncoding={fileEncoding}
          mimeType={mimeType}
        />
      );
    case "json":
    case "jsonl":
      return <JsonViewer fileName={fileName} fileContent={fileContent} />;
    default:
      return (
        <Box sx={{ p: spacing.lg, textAlign: "center" }}>
          <Typography variant="h4">
            {fallbackTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {fallbackExt}: .{ext}
          </Typography>
        </Box>
      );
  }
};
