import { FC } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

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
}) => {
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
