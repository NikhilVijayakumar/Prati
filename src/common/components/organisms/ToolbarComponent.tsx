// ToolbarComponent.tsx
import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { ThemeToggle } from "../../theme/ThemeToggle";
import { ToolbarProps } from "./ToolbarData";
import { spacing } from "../../../theme/tokens/spacing";

export const ToolbarComponent: FC<ToolbarProps> = ({
  handleDrawerToggle,
  title,
  themeContext,
}) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: spacing.md, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {title}
        </Typography>
        <ThemeToggle themeContext={themeContext} />
      </Toolbar>
    </AppBar>
  );
};
