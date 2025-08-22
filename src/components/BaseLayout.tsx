import React, { ReactNode, useState } from "react";
import { useMediaQuery, useTheme, ListItemButton, Drawer, List, ListItem, ListItemText, Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface BaseLayoutProps {
 children: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
 const theme = useTheme();
 const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
const [open, setOpen] = useState(false);

 const toggleDrawer = () => {
  setOpen(!open);
 };

 return (
  <Box sx={{ display: "flex" }}>
   <Navbar onToggleSidebar={toggleDrawer} />


        <Drawer
          variant="persistent"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              transition: "transform 0.3s ease-in-out",
            },
          }}
        >



    <Toolbar sx={{ minHeight: 64 }} />

    <Box sx={{ padding: 2 }}>
     <List>
      <ListItemButton>
       <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/parameter">
       <ListItemText primary="Parameter" />
      </ListItemButton>
      <ListItemButton>
       <ListItemText primary="Parameters" />
      </ListItemButton>
     </List>
    </Box>
   </Drawer>

   <Box
    component="main"
    sx={{
     flexGrow: 1,
     padding: 3,
     transition: "margin 0.3s ease-in-out",
     marginLeft: isDesktop && open ? `${drawerWidth}px` : 0,
    }}
   >
    <Toolbar />
    {children}
   </Box>
  </Box>
 );
};

export default BaseLayout;
