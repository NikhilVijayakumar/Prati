import { motion } from "framer-motion";
import { useTheme, Paper, Typography, Box, Chip } from "@mui/material";
import { spacing } from "../../../theme/tokens/spacing";

interface TimelineNodeProps {
  phase: string;
  title: string;
  description: string;
  category: string;
  status: string;
  tags?: string[];
  alignRight?: boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const TimelineNode = ({
  phase,
  title,
  description,
  category,
  status,
  tags,
  alignRight = false,
  t,
}: TimelineNodeProps) => {
  const theme = useTheme();

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "planned":
        return "primary";
      case "vision":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "4rem",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "flex-start",
            md: alignRight ? "flex-end" : "flex-start",
          },
          width: "100%",
          position: "relative",
          pl: { xs: 6, md: alignRight ? "50%" : 0 },
          pr: { xs: 0, md: alignRight ? 0 : "50%" },
          boxSizing: "border-box",
        }}
      >
        {/* Center Line Dot */}
        <Box
          sx={{
            position: "absolute",
            top: 20,
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: !alignRight ? "primary.main" : "secondary.main",
            boxShadow: `0 0 10px ${theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.common.black}`,
            zIndex: 2,
            left: { xs: -28, md: "50%" },
            transform: { xs: "none", md: "translateX(-50%)" },
          }}
        />

        <Paper
          elevation={4}
          sx={{
            width: { xs: "auto", md: "80%" },
            maxWidth: { xs: "100%", md: 450 },
            p: spacing.lg,
            bgcolor: "background.paper",
            borderLeft: {
              xs: `4px solid ${theme.palette.primary.main}`,
              md: !alignRight
                ? `4px solid ${theme.palette.primary.main}`
                : "none",
            },
            borderRight: {
              xs: "none",
              md: alignRight
                ? `4px solid ${theme.palette.secondary.main}`
                : "none",
            },
            borderRadius: spacing.internal,
            position: "relative",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
            ml: { xs: 0, md: !alignRight ? "auto" : 0 },
            mr: { xs: 0, md: alignRight ? "auto" : 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.1em" }}
            >
              {phase} •{" "}
              {t(`category.${category.toLowerCase()}`) ||
                category.toUpperCase()}
            </Typography>
            <Chip
              label={t(`common.status_${status.toLowerCase()}`).toUpperCase()}
              color={getStatusColor(status) as any}
              size="small"
              sx={{ letterSpacing: "0.05em", height: 20 }}
            />
          </Box>
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: 800, my: 1, fontFamily: '"Outfit", sans-serif' }}
          >
            {t(title)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {t(description)}
          </Typography>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={t(tag)}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </motion.div>
  );
};
