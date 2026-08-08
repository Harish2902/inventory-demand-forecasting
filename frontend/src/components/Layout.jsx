import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const drawerWidth = 250;

function Layout() {
    return (
        <>
            <Navbar />
            <Sidebar />

            <Box
                component="main"
                sx={{
                    marginLeft: `${drawerWidth}px`,
                    marginTop: "64px",
                    minHeight: "calc(100vh - 64px)",
                    backgroundColor: "#F8FAFC",
                    p: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Outlet />
            </Box>
        </>
    );
}

export default Layout;