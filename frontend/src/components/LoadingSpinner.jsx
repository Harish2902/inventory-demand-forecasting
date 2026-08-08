import { CircularProgress, Box, Typography } from "@mui/material";

function LoadingSpinner({ message = "Loading..." }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                py: 10,
            }}
        >
            <CircularProgress size={48} thickness={4} />

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2, fontWeight: 500 }}
            >
                {message}
            </Typography>
        </Box>
    );
}

export default LoadingSpinner;