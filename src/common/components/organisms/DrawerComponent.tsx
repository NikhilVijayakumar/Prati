// package src/common/components/navigation/DrawerComponent.tsx

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Features, DrawerProps, drawerWidth } from './drawerData';


export const DrawerComponent = <T extends Features>(props: DrawerProps<T>) => {
  const {
    sortedFeatures,
    UiFeatureList,
    container,
    // Renamed prop
    onMenuItemClick, // <-- This is the handler passed from useHome
    mobileOpen,
    handleDrawerToggle,
  } = props;

  // The internal handler now just calls the prop directly
  const handleListItemClick = (index: number) => {
    onMenuItemClick(index);
    // handleDrawerToggle(); // This is now handled by onMenuItemClick from useHome
  };

  const loadList = () => {
    if (!sortedFeatures || sortedFeatures.length === 0) {
      return <List />;
    }

    return (
      <List>
        {sortedFeatures.map((feature) => {
          const { id, name, display_order,icon } = feature;
          const uiFeatures = UiFeatureList[name];
          if (uiFeatures) {
            const IconComponent =icon;
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  // Use the updated internal handler for clicks
                  onClick={() => handleListItemClick(display_order - 1)}
                >
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </List>
    );
  };

  const loadDrawer = () => {
    return (
      <div>
        <Toolbar />
        <Divider />
        {loadList()}
      </div>
    );
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {loadDrawer()}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {loadDrawer()}
      </Drawer>
    </Box>
  );
};
