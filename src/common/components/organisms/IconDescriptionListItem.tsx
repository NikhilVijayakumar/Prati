import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface IconDescriptionListItemProps {
    title: string;
    description: string;
    Icon: LucideIcon;
    index: number;
    t: (key: string) => string;
}

export const IconDescriptionListItem: React.FC<IconDescriptionListItemProps> = ({ title, description, Icon, index, t }) => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: { xs: 2, md: 3 }, 
                    mb: 4, 
                    p: { xs: 2, md: 3 }, 
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'action.hover',
                    '&:hover': {
                        bgcolor: 'action.selected',
                        borderColor: theme.palette.primary.main,
                    },
                    transition: 'all 0.3s ease'
                }}
            >
                <Box sx={{ color: theme.palette.primary.main, mt: 0.5 }}>
                    <Icon size={24} />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                        {t(title)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {t(description)}
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
};
