import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlayableMediaCardProps {
    title: string;
    artist?: string;
    category: string;
    duration: string;
    coverUrl: string;
    isPlaying: boolean;
    onPlay: () => void;
    t: (key: string) => string;
}

export const PlayableMediaCard: React.FC<PlayableMediaCardProps> = ({ title, artist, category, duration, coverUrl, isPlaying, onPlay, t }) => {
    const theme = useTheme();
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onPlay}
            style={{ cursor: 'pointer' }}
        >
            <Box 
                sx={{ 
                    position: 'relative', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    aspectRatio: '1/1',
                    mb: 2,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                }}
            >
                <img 
                    src={coverUrl} 
                    alt={title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                
                {/* Overlay with Play Button */}
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        inset: 0, 
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        opacity: isPlaying ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                        '&:hover': { opacity: 1 }
                    }}
                >
                    <Box 
                        sx={{ 
                            width: 48, 
                            height: 48, 
                            borderRadius: '50%', 
                            bgcolor: theme.palette.action.hover, 
                            backdropFilter: 'blur(10px)',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: `1px solid ${theme.palette.divider}`
                        }}
                    >
                        <Play size={20} fill={theme.palette.common.white} color={theme.palette.common.white} />
                    </Box>
                </Box>
            </Box>

            <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>
                {t(title)}
            </Typography>
            {artist && (
                <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.main, fontSize: '0.85rem', mb: 0.5, fontWeight: 500 }}>
                    {t(artist)}
                </Typography>
            )}
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                {category} • {duration}
            </Typography>
        </motion.div>
    );
};
