import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { spacing } from "../../../theme/tokens/spacing";

export interface FormLayoutProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const FormLayout: FC<FormLayoutProps> = ({ title, children, actions }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing.xl, maxWidth: '600px' }}>
      {title && (
        <Typography variant="h5" color="text.primary">
          {title}
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
        {children}
      </Box>

      {actions && (
        <Box sx={{ display: 'flex', gap: spacing.md, mt: spacing.md, pt: spacing.lg, borderTop: '1px solid', borderColor: 'divider' }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};
