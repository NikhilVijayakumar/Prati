import React, { memo } from 'react';
import { Box, useTheme } from '@mui/material';

export interface CanvasGroupProps {
  label: string;
  description: string;
  selected?: boolean;
  onChangeLabel?: (val: string) => void;
  onChangeDescription?: (val: string) => void;
  children?: React.ReactNode;
}

export const CanvasGroup = memo(({
  label,
  description,
  selected = false,
  onChangeLabel,
  onChangeDescription,
  children
}: CanvasGroupProps) => {
  const theme = useTheme();

  return (
    <>
      {children}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.04)',
          border: selected
            ? `2px dashed ${theme.palette.text.secondary}`
            : `1px dashed ${theme.palette.divider}`,
          borderRadius: 2,
          padding: 2,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -30,
            left: 0,
            padding: '4px 12px',
            borderRadius: 4,
            backgroundColor: theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.grey[200],
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <input
            defaultValue={label || 'Group'}
            onChange={(evt) => onChangeLabel?.(evt.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontWeight: 'bold',
              fontSize: '14px',
              outline: 'none',
              width: '100%',
              color: 'inherit',
            }}
            className="nodrag"
          />
        </Box>

        {/* Description Field */}
        <Box sx={{ mt: 4, height: 'calc(100% - 32px)', overflow: 'hidden' }}>
          <textarea
            placeholder="Description..."
            defaultValue={description || ''}
            onChange={(evt) => onChangeDescription?.(evt.target.value)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '12px',
              color: 'inherit',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              opacity: 0.7,
            }}
            className="nodrag"
          />
        </Box>
      </Box>
    </>
  );
});

CanvasGroup.displayName = 'CanvasGroup';
