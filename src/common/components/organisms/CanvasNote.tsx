import { memo, useState } from 'react';
import { Paper, InputBase, Typography, Box, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';

export interface CanvasNoteProps {
  label: string;
  selected?: boolean;
  onChange?: (val: string) => void;
}

export const CanvasNote = memo(({ label, selected = false, onChange }: CanvasNoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <Paper
      elevation={selected ? 4 : 1}
      sx={{
        width: 250,
        height: 'auto',
        minHeight: 150,
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'warning.light',
        color: 'text.primary',
        borderRadius: 1,
        border: selected
          ? `2px solid ${theme.palette.warning.main}`
          : `1px solid ${theme.palette.warning.main}`,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
      onDoubleClick={handleDoubleClick}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 'bold', mb: 1, color: 'warning.dark' }}
      >
        NOTE
      </Typography>

      <Box sx={{ flexGrow: 1, overflow: 'auto' }} className="nodrag">
        {isEditing ? (
          <InputBase
            multiline
            fullWidth
            autoFocus
            placeholder="Add note here... (Markdown supported)"
            defaultValue={label}
            onChange={(evt) => onChange?.(evt.target.value)}
            onBlur={handleBlur}
            sx={{
              fontSize: '0.9rem',
              fontFamily: 'sans-serif',
              alignItems: 'flex-start',
              height: '100%',
            }}
          />
        ) : (
          <Box
            sx={{
              fontSize: '0.9rem',
              '& p': { m: 0, mb: 1 },
              '& ul, & ol': { m: 0, pl: 2 },
            }}
          >
            {label ? (
              <ReactMarkdown>{label}</ReactMarkdown>
            ) : (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                Double-click to edit
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
});

CanvasNote.displayName = 'CanvasNote';
