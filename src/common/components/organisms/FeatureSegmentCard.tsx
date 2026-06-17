import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { spacing } from "../../../theme/tokens/spacing";

interface FeatureSegmentCardProps {
  title: string;
  subTitle: string;
  color: string;
  Icon: LucideIcon;
  tags?: string[];
  index: number;
  t: (key: string) => string;
}

export const FeatureSegmentCard: React.FC<FeatureSegmentCardProps> = ({
  title,
  subTitle,
  color,
  Icon,
  tags = [],
  index,
  t,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          height: "100%",
          p: spacing.xl,
          borderRadius: spacing.md,
          position: "relative",
          overflow: "hidden",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, transparent 100%)`
              : theme.palette.background.paper,
          backdropFilter: "blur(12px)",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[1],
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: theme.shadows[4],
            borderColor: theme.palette.primary.main,
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: `${color}15`,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Icon size={32} strokeWidth={1.5} />
        </Box>

        <Typography
          variant="h6"
          sx={{ color: "text.primary", fontWeight: 700, mb: 1 }}
        >
          {t(title)}
        </Typography>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            mb: 3,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontSize: "0.75rem",
          }}
        >
          {t(subTitle)}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            width: "100%",
          }}
        >
          {tags.map((tag, idx) => (
            <Box
              key={idx}
              sx={{
                py: 1,
                px: 2,
                borderRadius: "4px",
                bgcolor: "action.hover",
                color: "text.primary",
                fontSize: "0.875rem",
              }}
            >
              {t(tag)}
            </Box>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};
