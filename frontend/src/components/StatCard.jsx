import { Card, CardContent, Typography, Box } from "@mui/material";

function StatCard({ title, value, icon, color, trend }) {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 4,
                background: color,
                color: "white",
                height: 160,
                transition: "0.3s ease",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
                },
            }}
        >
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600 }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{ fontSize: 36 }}>
                        {icon}
                    </Box>

                </Box>

                <Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            lineHeight: 1.1,
                        }}
                    >
                        {value}
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1,
                            opacity: 0.9,
                        }}
                    >
                        {trend}
                    </Typography>

                </Box>

            </CardContent>
        </Card>
    );
}

export default StatCard;
