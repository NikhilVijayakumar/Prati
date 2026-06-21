import React, { memo } from 'react';
import { Box, useTheme } from '@mui/material';

export interface CanvasGroupProps {
  label: string;
  description: string;
  selected?: boolean;
  onChangeLabel?: (val: string) => void;
  onChangeDescription?: (val: string) => void;
  children?: React.ReactNode;
  t?: (key: string) => string;
}

export const CanvasGroup = memo(({
  label,
  description,
  selected = false,
  onChangeLabel,
  onChangeDescription,
  children,
  t = (k) => k,
}: CanvasGroupProps): React.ReactElement => {
  const theme = useTheme();

  return (
    <>
      {children}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.action.hover,
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
            py: 0.5,
          px: 1.5,
            borderRadius: 4,
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <input
            defaultValue={label || 'Group'}
            onChange={(evt) => onChangeLabel?.(evt.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontWeight: theme.typography.fontWeightBold,
              fontSize: theme.typography.body2.fontSize,
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
            placeholder={t('canvas.group.placeholder')}
            defaultValue={description || ''}
            onChange={(evt) => onChangeDescription?.(evt.target.value)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: theme.typography.caption.fontSize,
              color: 'inherit',
              resize: 'none',
              outline: 'none',
              fontFamily: theme.typography.fontFamily,
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
