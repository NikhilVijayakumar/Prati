import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

import type { SxProps, Theme } from '@mui/material';

interface VerticalStepIndicatorProps {
    activeIndex: number;
    totalSteps: number;
    sx?: SxProps<Theme>;
}

export const VerticalStepIndicator: React.FC<VerticalStepIndicatorProps> = ({ activeIndex, totalSteps, sx }) => {
    const theme = useTheme();

    return (
        <Box 
            sx={{ 
                position: 'absolute', 
                left: { xs: 20, md: 60 }, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                height: '400px', 
                width: '2px', 
                bgcolor: theme.palette.divider,
                zIndex: 10,
                display: { xs: 'none', lg: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                ...sx
            }}
        >
            {/* Active Indicator Line */}
            <motion.div
                animate={{ height: `${((activeIndex + 1) / totalSteps) * 100}%` }}
                style={{
                    position: 'absolute',
                    top: 0,
                    width: '2px',
                    background: theme.palette.primary.main,
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                    zIndex: 1
                }}
            />

            {/* Step Dots */}
            {Array.from({ length: totalSteps }).map((_, i) => (
                <Box 
                    key={i}
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: i <= activeIndex ? 'primary.main' : theme.palette.action.disabled,
                        zIndex: 2,
                        transition: 'background-color 0.3s ease',
                        boxShadow: i === activeIndex ? `0 0 10px ${theme.palette.primary.main}` : 'none'
                    }}
                />
            ))}
        </Box>
    );
};
