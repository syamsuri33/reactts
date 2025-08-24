import React from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledListItemButton } from './BaseLayout';

interface DrawerContentProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ open, onToggle, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Parameter', icon: <SettingsIcon />, path: '/parameter' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          px: 1,
        }}
      >
        {open && (
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            My App
          </Typography>
        )}
        <IconButton onClick={onToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <StyledListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              justifyContent: open ? 'initial' : 'center',
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                opacity: open ? 1 : 0,
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                },
              }}
            />
          </StyledListItemButton>
        ))}
      </List>
    </div>
  );
};

export default DrawerContent;