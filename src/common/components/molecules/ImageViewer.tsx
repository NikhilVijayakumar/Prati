import { FC, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { useLanguage } from "../../localization/LanguageContext";
import { spacing } from "../../../theme/tokens/spacing";

interface ImageViewerProps {
  fileName: string;
  fileContent?: string;
  fileEncoding?: "text" | "base64";
  mimeType?: string;
}

export const ImageViewer: FC<ImageViewerProps> = ({
  fileName,
  fileContent,
  fileEncoding,
  mimeType,
}) => {
  const { literal } = useLanguage();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const imageSource =
    fileContent && fileEncoding === "base64"
      ? `data:${mimeType || "image/png"};base64,${fileContent}`
      : null;

  const emptyMessage = literal["viewer.empty_image"];

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: 'background.paper',
          borderBottom: `1px solid`,
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {fileName}
        </Typography>
        <Box>
          <IconButton
            size="small"
            onClick={() => setZoom((prev) => Math.min(prev + 0.2, 3))}
          >
            <ZoomInIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.5))}
          >
            <ZoomOutIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setRotation((prev) => (prev + 90) % 360)}
          >
            <RotateRightIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {imageSource ? (
          <Box
            component="img"
            src={imageSource}
            alt={fileName}
            sx={{
              maxWidth: `${zoom * 100}%`,
              maxHeight: `${zoom * 100}%`,
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.2s ease-out",
              objectFit: "contain",
            }}
          />
        ) : (
          <Box
            sx={{
              width: 400,
              height: 300,
              border: `1px solid`,
              borderColor: 'divider',
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              {emptyMessage}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
