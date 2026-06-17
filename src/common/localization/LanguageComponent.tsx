//src\common\components\LanguageComponent.tsx
import React, { useState } from 'react';
import { useLanguage } from '../localization/LanguageContext';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, availableLanguages } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    handleClose();
  };

  const currentLanguageLabel =
    availableLanguages.find((lang) => lang.code === currentLanguage)?.label ?? '';

  return (
     <Box>
      <Button
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        color="inherit"
      >
        {currentLanguageLabel}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="language-button"
      >
        {availableLanguages.map((lang) => (
          <MenuItem
        key={lang.code}
        selected={lang.code === currentLanguage}
        onClick={() => handleLanguageChange(lang.code)}
          >
        {lang.label}
          </MenuItem>
        ))}
      </Menu>
     </Box>
  );
};
