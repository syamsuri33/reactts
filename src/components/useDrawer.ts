import { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

export const useDrawer = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [open, setOpen] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleDrawerClose = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  return {
    open,
    mobileOpen,
    isDesktop,
    isMobile,
    handleDrawerToggle,
    handleDrawerClose,
  };
};