import React from 'react';
import { Box, Typography, useTheme, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface ProfileRevealCardProps {
    name: string;
    nameKey: string;
    role: string;
    bio: string;
    imageUrl: string;
    themeColor: string;
    primaryBadge?: string;
    secondaryMetadata?: string;
    t: (key: string) => string;
}

export const ProfileRevealCard: React.FC<ProfileRevealCardProps> = ({ name, nameKey, role, bio, imageUrl, themeColor, primaryBadge, secondaryMetadata, t }) => {
    const theme = useTheme();
    return (
        <motion.div
            className="profile-reveal-card"
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '2/3',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: theme.palette.background.paper, 
            }}
        >
            {/* Background Image */}
            <motion.img
                src={imageUrl}
                alt={name}
                variants={{
                    rest: { scale: 1, filter: 'brightness(0.8) grayscale(0.2)' },
                    hover: { scale: 1.1, filter: 'brightness(1) grayscale(0)' }
                }}
                transition={{ duration: 0.4 }}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />

            {/* Content Container */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, md: 3 },
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    background: `linear-gradient(to top, ${theme.palette.background.paper} 0%, transparent 100%)`, 
                    backdropFilter: 'blur(4px)',
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}
            >
                 <motion.div
                    variants={{
                        rest: { y: 20 },
                        hover: { y: 0 }
                    }}
                    transition={{ duration: 0.3 }}
                 >
                    {/* Name & Role */}
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 700, 
                            color: theme.palette.text.primary, 
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                        }}
                    >
                        {t(nameKey)}
                    </Typography>
                    
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            color: themeColor, 
                            fontWeight: 600, 
                            mb: 2,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        {t(role)}
                    </Typography>

                    {/* Reveal Content */}
                    <motion.div
                        variants={{
                            rest: { opacity: 0, height: 0 },
                            hover: { opacity: 1, height: 'auto' }
                        }}
                        transition={{ duration: 0.3 }}
                    >
                         <Typography 
                            variant="body2" 
                            sx={{ 
                                color: theme.palette.text.secondary, 
                                mb: 2,
                                lineHeight: 1.6
                            }}
                        >
                            {t(bio)}
                        </Typography>

                        {/* Primary Badge & Secondary Metadata */}
                        {primaryBadge && (
                            <Box sx={{ mb: 1 }}>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: themeColor, 
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                        display: 'inline-block',
                                        px: 1.5,
                                        py: 0.5,
                                        border: `1px solid ${themeColor}`,
                                        borderRadius: 1,
                                        backgroundColor: `${themeColor}20`
                                    }}
                                >
                                    {t(primaryBadge)}
                                </Typography>
                            </Box>
                        )}
                        
                        {secondaryMetadata && (
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: theme.palette.text.disabled, 
                                    mb: 2,
                                    display: 'block',
                                    fontStyle: 'italic'
                                }}
                            >
                                {t(secondaryMetadata)}
                            </Typography>
                        )}

                        {/* Audio Button (Mock) */}
                        <Tooltip title={t('common.voice_coming_soon')} arrow>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, opacity: 0.7, cursor: 'not-allowed' }}>
                                <Box 
                                    sx={{ 
                                        width: 32, 
                                        height: 32, 
                                        borderRadius: '50%', 
                                        bgcolor: 'rgba(255,255,255,0.1)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}
                                >
                                    <Play size={14} fill="white" />
                                </Box>
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                                    {t('common.voice_preview')}
                                </Typography>
                            </Box>
                        </Tooltip>
                    </motion.div>
                 </motion.div>
            </Box>
        </motion.div>
    );
};
