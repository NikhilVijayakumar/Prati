// ToolbarData.ts
import type { ThemeContextValue } from "../../theme/themeData";

export interface ToolbarProps {
  handleDrawerToggle: () => void;
  title: string;
  themeContext: ThemeContextValue;
}
