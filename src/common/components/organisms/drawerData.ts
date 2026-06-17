// path src\common\components\navigation\drawerData.ts
import { SvgIconComponent } from '@mui/icons-material';

export type UiFeature = {
  url: string;
};

export interface Features {
  id: number;
  name: string;
  display_order: number;
  icon: SvgIconComponent;
}

export const drawerWidth = 240;

export interface DrawerProps<T extends Features> {
  sortedFeatures: T[] | null;
  UiFeatureList: Record<string, UiFeature>;
  container: (() => HTMLElement) | undefined; 
  onMenuItemClick: (index: number) => void;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}
