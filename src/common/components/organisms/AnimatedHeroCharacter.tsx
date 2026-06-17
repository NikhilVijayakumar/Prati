import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useTheme, Box, Typography } from '@mui/material';

interface Props {
    char: string;
    title?: string;
    subtitle?: string;
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
    index: number;
    zIndex: number;
    t: (key: string) => string;
}

export const AnimatedHeroCharacter = ({ char, title, subtitle, mouseX, mouseY, index, zIndex, t }: Props) => {
    const theme = useTheme();

    // Physics: Different depth based on index (Parallax)
    const depth = index % 2 === 0 ? 0.02 : 0.05;

    // Map mouse position (-window width to +window width) to small movements
    const x = useTransform(mouseX, (value: number) => value * depth);
    const y = useTransform(mouseY, (value: number) => value * depth);

    // Add spring physics for "weight"
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    return (
        <motion.div
            style={{
                zIndex, // Applied dynamic z-index
                display: 'inline-block',
                cursor: 'pointer',
                position: 'relative',
                x: springX,
                y: springY
            }}
            data-testid="animated-hero-character"
            initial="idle"
            whileHover="hover"
        >
            <Box
                component={motion.h1}
                animate={{
                    y: [0, -15, 0],
                    opacity: [1, 0.8, 1]
                }}
                transition={{
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                    },

                    opacity: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                    },
                    default: { duration: 0.2 } // snappy hover
                }}
                variants={{
                    idle: { scale: 1, opacity: 1 },
                    hover: { scale: 1.05, opacity: 0.9 }
                }}
                sx={{
                    ...theme.typography.h1,
                    fontSize: { xs: '4rem', sm: '6rem', md: '10rem' }, // Responsive font size
                    margin: 0,
                    color: theme.palette.text.primary,
                    textShadow: theme.palette.mode === 'dark'
                        ? '0px 0px 30px rgba(255,255,255,0.2)'
                        : 'none'
                }}
            >
                {char}
            </Box>

            {/* Micro-Interaction: Reveal Details */}
            <motion.div
                variants={{
                    idle: { opacity: 0, y: 10 },
                    hover: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'absolute',
                    top: '-3rem',
                    width: '100%',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {title && (
                    <Typography variant="h4" sx={{
                        letterSpacing: '0.1em',
                        color: 'text.secondary',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                    }}>
                        {t(title)}
                    </Typography>
                )}
            </motion.div>

            <motion.div
                variants={{
                    idle: { opacity: 0, y: -10 },
                    hover: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.2 }}
                style={{
                    position: 'absolute',
                    bottom: '-4.5rem',
                    width: '300px', // Allow wrapping for meaning
                    left: '50%',
                    marginLeft: '-150px', // center horizontally
                    textAlign: 'center',
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                {subtitle && (
                    <Typography variant="h2" sx={{
                        letterSpacing: '0.2em',
                        color: 'primary.main',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                    }}>
                        {t(subtitle)}
                    </Typography>
                )}
            </motion.div>
        </motion.div>
    );
};
