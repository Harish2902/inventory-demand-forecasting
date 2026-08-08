import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Box,
} from "@mui/material";

function Navbar() {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.12)",
            }}
        >
            <Toolbar sx={{ minHeight: 64 }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", letterSpacing: 0.3 }}
                >
                    📦 Inventory Demand Forecasting
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Avatar
                    sx={{
                        mr: 1.5,
                        width: 36,
                        height: 36,
                        bgcolor: "#FFFFFF",
                        color: "primary.main",
                        fontWeight: "bold",
                    }}
                >
                    H
                </Avatar>

                <Typography sx={{ fontWeight: 500 }}>
                    Harish Raghav
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;