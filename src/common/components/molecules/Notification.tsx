import type { FC, ReactElement } from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';
import { useLanguage } from '../../localization/LanguageContext';

export interface NotificationProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export const Notification: FC<NotificationProps> = ({
  open,
  message,
  severity = 'info',
  onClose,
  autoHideDuration = 4000,
}): ReactElement => {
  const { literal } = useLanguage();
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        closeText={literal['action.close'] ?? 'Close'}
        sx={{
          width: '100%',
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
