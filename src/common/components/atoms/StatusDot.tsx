import { FC } from 'react';
import { Box } from '@mui/material';

export type StatusDotTone = 'ok' | 'warning' | 'error' | 'executing' | 'waiting' | 'default';

export interface StatusDotProps {
  tone: StatusDotTone;
  size?: number;
}

const toneColorMap: Record<StatusDotTone, string> = {
  ok: 'success.main',
  warning: 'warning.main',
  error: 'error.main',
  executing: 'info.main',
  waiting: 'warning.main',
  default: 'text.secondary',
};

export const StatusDot: FC<StatusDotProps> = ({ tone, size = 10 }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: toneColorMap[tone] || toneColorMap.default,
      }}
    />
  );
};
