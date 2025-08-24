import React, { ReactNode } from 'react';
import {
  useTheme,
  Drawer,
  ListItemButton,
  Box,
  Toolbar,
  styled,
  CSSObject,
  Theme,
  alpha,
} from '@mui/material';
import Navbar from './Navbar';
import DrawerContent from './DrawerContent';
import { useDrawer } from './useDrawer';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  '&.Mui-selected': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.3),
    },
  },
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const {
    open,
    mobileOpen,
    isDesktop,
    isMobile,
    handleDrawerToggle,
    handleDrawerClose,
  } = useDrawer();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <Navbar onToggleSidebar={handleDrawerToggle} />

      {/* Drawer Section */}
      <Box component="nav">
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent
            open={open}
            onToggle={handleDrawerToggle}
            onClose={handleDrawerClose}
          />
        </Drawer>

        {/* Desktop drawer */}
        <StyledDrawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
            },
          }}
        >
          <DrawerContent
            open={open}
            onToggle={handleDrawerToggle}
            onClose={handleDrawerClose}
          />
        </StyledDrawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          ml: { sm: open ? 0 : `${theme.spacing(7)} + 1px` },
          width: {
            sm: `calc(100% - ${open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`}px)`,
          },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );							  
				 
};

export default BaseLayout;