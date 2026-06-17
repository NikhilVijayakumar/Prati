import React, { useRef, useEffect } from "react";
import { alpha, Box, Typography, IconButton, Slider, useTheme } from "@mui/material";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { spacing } from "../../../theme/tokens/spacing";

interface AudioPlayerBarProps {
  title: string;
  category: string;
  duration: string;
  coverUrl: string;
  audioUrl: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  title,
  category,
  duration,
  coverUrl,
  audioUrl,
  isPlaying,
  onTogglePlay,
}) => {
  const theme = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [audioUrl]);

  return (
    <Box
      component={motion.div}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${theme.palette.divider}`,
        p: spacing.md,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: theme.shadows[4],
      }}
    >
      <audio ref={audioRef} src={audioUrl} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
            gap: spacing.xl,
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {/* Track Info */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: spacing.md,
            minWidth: "200px",
          }}
        >
          <img
            src={coverUrl}
            alt={title}
            style={{
              width: 48,
              height: 48,
              borderRadius: 4,
              objectFit: "cover",
            }}
          />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary }}
            >
              {category} • {duration}
            </Typography>
          </Box>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: spacing.md,
            flex: 1,
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
            <SkipBack size={20} />
          </IconButton>

          <IconButton
            onClick={onTogglePlay}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": { bgcolor: theme.palette.primary.light },
              width: spacing.xxl,
              height: spacing.xxl,
            }}
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" />
            )}
          </IconButton>

          <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
            <SkipForward size={20} />
          </IconButton>
        </Box>

        {/* Volume / Extra */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: spacing.md,
            minWidth: "150px",
          }}
        >
          <Volume2 size={20} color={theme.palette.text.secondary} />
          <Slider
            size="small"
            defaultValue={70}
            sx={{ color: 'action.disabled', width: 100 }}
          />
        </Box>
      </Box>
    </Box>
  );
};
