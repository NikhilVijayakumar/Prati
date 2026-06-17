import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { useTheme } from '@mui/material';

interface InteractiveStepNodeProps {
  label: string;
  description: string;
  Icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export const InteractiveStepNode: React.FC<InteractiveStepNodeProps> = ({
  label,
  description,
  Icon,
  isActive,
  onClick,
  index,
}) => {
  const theme = useTheme();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        animate={{
          scale: isActive ? 1.2 : 1,
          backgroundColor: isActive ? theme.palette.primary.main : theme.palette.action.hover,
          color: isActive ? theme.palette.primary.contrastText : theme.palette.text.secondary,
          boxShadow: isActive ? `0 0 20px ${theme.palette.primary.main}40` : 'none',
        }}
        style={{
          padding: '1.5rem',
          borderRadius: '50%',
          marginBottom: '1rem',
          border: `1px solid ${isActive ? theme.palette.primary.main : theme.palette.divider}`,
          transition: 'border-color 0.3s ease',
        }}
      >
        <Icon size={32} strokeWidth={1.5} />
      </motion.div>

      <motion.div
        animate={{ opacity: isActive ? 1 : 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <h3 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.1rem',
          fontWeight: 600,
          color: theme.palette.text.primary
        }}>
          {label}
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: '0.85rem', 
          color: theme.palette.text.secondary,
          maxWidth: '140px'
        }}>
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};
