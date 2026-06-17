import { FC, ReactNode, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { spacing } from "../../../theme/tokens/spacing";
import { colors } from "../../../theme/tokens/colors";

export type AnimationVariant =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "stagger-fade"
  | "typewriter";

export interface HeroSectionProps {
  headline: string;
  description?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  children?: ReactNode;
  enableAnimation?: boolean;
  animationVariant?: AnimationVariant;
  animationDuration?: number;
  animationDelay?: number;
  animationStagger?: number;
}

const animationConfigs = {
  "fade-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-in": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "slide-left": {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  "scale-up": {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  "stagger-fade": {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
  typewriter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
} as const;

const TypewriterHeadline: FC<{ text: string; duration: number; delay: number }> = ({
  text,
  duration,
  delay,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const charCount = text.length;
  const charDuration = duration / charCount;

  useEffect(() => {
    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));
        if (currentIndex >= charCount) {
          clearInterval(interval);
        }
      }, charDuration);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, charCount, charDuration, delay]);

  return (
    <Typography
      variant="h1"
      fontWeight={600}
      color="text.primary"
      sx={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </Typography>
  );
};

export const HeroSection: FC<HeroSectionProps> = ({
  headline,
  description,
  primaryActionLabel,
  onPrimaryAction,
  children,
  enableAnimation = true,
  animationVariant = "fade-up",
  animationDuration = 600,
  animationDelay = 0,
  animationStagger: _animationStagger = 100,
}) => {
  const config = animationConfigs[animationVariant];
  const shouldAnimate = enableAnimation && config;
  const isTypewriter = animationVariant === "typewriter";

  const transition = {
    duration: animationDuration / 1000,
    ease: "easeOut" as const,
    delay: animationDelay / 1000,
  };

  return (
    <Box
      sx={{
        py: spacing.xxl,
        px: spacing.xl,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: spacing.lg,
        maxWidth: "800px",
      }}
    >
      {shouldAnimate && !isTypewriter ? (
        <motion.div initial={config.initial} animate={config.animate} transition={transition}>
          <Typography
            variant="h1"
            fontWeight={600}
            color="text.primary"
            sx={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
          >
            {headline}
          </Typography>
        </motion.div>
      ) : isTypewriter ? (
        <TypewriterHeadline text={headline} duration={animationDuration} delay={animationDelay} />
      ) : (
        <Typography
          variant="h1"
          fontWeight={600}
          color="text.primary"
          sx={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
        >
          {headline}
        </Typography>
      )}

      {description && (
        shouldAnimate && !isTypewriter ? (
          <motion.div
            initial={config.initial}
            animate={config.animate}
            transition={{ ...transition, delay: (animationDelay + animationDuration) / 1000 }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: "600px", lineHeight: 1.6 }}
            >
              {description}
            </Typography>
          </motion.div>
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "600px", lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        )
      )}

      {primaryActionLabel && (
        shouldAnimate ? (
          <motion.div
            initial={config.initial}
            animate={config.animate}
            transition={{ ...transition, delay: (animationDelay + animationDuration * 1.5) / 1000 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onPrimaryAction}
              disableElevation
              sx={{
                backgroundColor: colors.primary,
                color: "#fff",
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: colors.primaryHover,
                },
              }}
            >
              {primaryActionLabel}
            </Button>
          </motion.div>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onPrimaryAction}
            disableElevation
            sx={{
              backgroundColor: colors.primary,
              color: "#fff",
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: colors.primaryHover,
              },
            }}
          >
            {primaryActionLabel}
          </Button>
        )
      )}

      {children && (
        shouldAnimate ? (
          <motion.div
            initial={config.initial}
            animate={config.animate}
            transition={{ ...transition, delay: (animationDelay + animationDuration * 2) / 1000 }}
            style={{ marginTop: spacing.xs, width: "100%" }}
          >
            {children}
          </motion.div>
        ) : (
          <Box sx={{ mt: spacing.xs, width: "100%" }}>{children}</Box>
        )
      )}
    </Box>
  );
};
