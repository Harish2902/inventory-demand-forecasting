import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 250;

const navItems = [
    { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { label: "Products", path: "/products", icon: <Inventory2Icon /> },
    { label: "Sales History", path: "/sales", icon: <TrendingUpIcon /> },
    { label: "Forecast", path: "/forecast", icon: <AutoGraphIcon /> },
];

function Sidebar() {
    const { pathname } = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    marginTop: "64px",
                    height: "calc(100% - 64px)",
                    boxSizing: "border-box",
                    borderRight: "1px solid #E2E8F0",
                    backgroundColor: "#FFFFFF",
                },
            }}
        >
            <Typography
                variant="h6"
                align="center"
                sx={{
                    mt: 3,
                    mb: 2,
                    fontWeight: "bold",
                    color: "#1E293B",
                }}
            >
                📦 Inventory Forecast
            </Typography>

            <Divider />

            <List sx={{ px: 1.5, pt: 1.5 }}>
                {navItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <ListItem
                            key={item.path}
                            disablePadding
                            sx={{ mb: 0.5 }}
                        >
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    color: isActive ? "#FFFFFF" : "#334155",
                                    backgroundColor: isActive
                                        ? "primary.main"
                                        : "transparent",
                                    "&:hover": {
                                        backgroundColor: isActive
                                            ? "primary.dark"
                                            : "#F1F5F9",
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 40,
                                        color: isActive ? "#FFFFFF" : "#64748B",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}

export default Sidebar;