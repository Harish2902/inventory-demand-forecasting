import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import InventoryIcon from "@mui/icons-material/Inventory";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SecurityIcon from "@mui/icons-material/Security";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlagIcon from "@mui/icons-material/Flag";

function ForecastResult({ forecast }) {

    if (!forecast) {
        return null;
    }

    const currentStock = Number(forecast.currentStock || 0);
    const reorderPoint = Number(forecast.reorderPoint || 0);

    const isReorderRequired =
        currentStock < reorderPoint;

    const getRecommendationColor = () => {

        if (!forecast.recommendation) {
            return "default";
        }

        const recommendation =
            forecast.recommendation.toLowerCase();

        if (
            recommendation.includes("reorder") ||
            recommendation.includes("order")
        ) {
            return "error";
        }

        if (
            recommendation.includes("monitor") ||
            recommendation.includes("watch")
        ) {
            return "warning";
        }

        return "success";
    };

    const getRecommendationIcon = () => {

        if (isReorderRequired) {
            return <WarningAmberIcon />;
        }

        return <CheckCircleIcon />;
    };

    // ============================
    // Metric Card
    // ============================

    const MetricCard = ({
        icon,
        title,
        value,
        subtitle,
        highlight = false,
    }) => {

        return (
            <Card
                elevation={highlight ? 4 : 2}
                sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: highlight
                        ? "1px solid"
                        : "1px solid transparent",
                    borderColor: highlight
                        ? "primary.main"
                        : "transparent",
                    transition: "0.2s",

                    "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: 6,
                    },
                }}
            >

                <CardContent>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                    >

                        <Box
                            sx={{
                                width: 38,
                                height: 38,
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: highlight
                                    ? "#DBEAFE"
                                    : "#F1F5F9",
                            }}
                        >
                            {icon}
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            fontWeight={500}
                        >
                            {title}
                        </Typography>

                    </Box>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            color: highlight
                                ? "primary.main"
                                : "#1E293B",
                        }}
                    >
                        {value}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                    >
                        {subtitle}
                    </Typography>

                </CardContent>

            </Card>
        );
    };


    return (

        <Box mt={4}>

            {/* =====================================
                Product Header
            ===================================== */}

            <Card
                elevation={3}
                sx={{
                    borderRadius: 3,
                    mb: 3,
                    background:
                        "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)",
                }}
            >

                <CardContent sx={{ p: 3 }}>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={2}
                    >

                        <Box>

                            <Typography
                                variant="overline"
                                color="primary"
                                fontWeight="bold"
                            >
                                FORECAST RESULT
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                sx={{
                                    color: "#1E293B",
                                }}
                            >
                                {forecast.productName}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={0.5}
                            >
                                Product Code:{" "}
                                <strong>
                                    {forecast.productCode}
                                </strong>
                            </Typography>

                        </Box>

                        <TrendingUpIcon
                            sx={{
                                fontSize: 55,
                                color: "primary.main",
                                opacity: 0.8,
                            }}
                        />

                    </Box>

                </CardContent>

            </Card>


            {/* =====================================
                Forecast Metrics
            ===================================== */}

            <Grid
                container
                spacing={3}
            >

                {/* Predicted Demand */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <MetricCard
                        icon={
                            <TrendingUpIcon
                                color="primary"
                            />
                        }
                        title="Predicted Demand"
                        value={
                            forecast.predictedDemand !== undefined
                                ? forecast.predictedDemand.toFixed(2)
                                : "0.00"
                        }
                        subtitle="Expected future demand"
                        highlight={true}
                    />

                </Grid>


                {/* Current Stock */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <MetricCard
                        icon={
                            <InventoryIcon
                                color="primary"
                            />
                        }
                        title="Current Stock"
                        value={currentStock}
                        subtitle="Units currently available"
                    />

                </Grid>


                {/* Lead Time */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <MetricCard
                        icon={
                            <ScheduleIcon
                                color="primary"
                            />
                        }
                        title="Lead Time"
                        value={forecast.leadTime}
                        subtitle="Days required for replenishment"
                    />

                </Grid>


                {/* Safety Stock */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <MetricCard
                        icon={
                            <SecurityIcon
                                color="primary"
                            />
                        }
                        title="Safety Stock"
                        value={forecast.safetyStock}
                        subtitle="Minimum inventory buffer"
                    />

                </Grid>

            </Grid>


            {/* =====================================
                Reorder Analysis
            ===================================== */}

            <Card
                elevation={3}
                sx={{
                    borderRadius: 3,
                    mt: 3,
                }}
            >

                <CardContent sx={{ p: 3 }}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        mb={2}
                    >

                        <FlagIcon
                            color="primary"
                        />

                        <Typography
                            variant="h6"
                            fontWeight="bold"
                        >
                            Reorder Analysis
                        </Typography>

                    </Box>

                    <Divider sx={{ mb: 3 }} />


                    <Grid
                        container
                        spacing={3}
                        alignItems="center"
                    >

                        {/* Reorder Point */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Reorder Point
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                sx={{
                                    color: "#1E293B",
                                    mt: 0.5,
                                }}
                            >
                                {reorderPoint}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Units
                            </Typography>

                        </Grid>


                        {/* Current vs Reorder */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                Inventory Status
                            </Typography>

                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    backgroundColor:
                                        isReorderRequired
                                            ? "#FEF2F2"
                                            : "#F0FDF4",
                                }}
                            >

                                <Typography
                                    variant="body1"
                                    fontWeight="bold"
                                    sx={{
                                        color:
                                            isReorderRequired
                                                ? "#DC2626"
                                                : "#16A34A",
                                    }}
                                >
                                    Current Stock: {currentStock}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={0.5}
                                >
                                    Reorder Point: {reorderPoint}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Difference:{" "}
                                    {currentStock - reorderPoint}
                                    {" "}units
                                </Typography>

                            </Box>

                        </Grid>


                        {/* Recommendation */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 4,
                            }}
                        >

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={1}
                            >
                                Recommendation
                            </Typography>

                            <Chip
                                icon={getRecommendationIcon()}
                                label={
                                    forecast.recommendation ||
                                    "No recommendation"
                                }
                                color={getRecommendationColor()}
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "0.95rem",
                                    px: 1.5,
                                    py: 2.5,
                                    width: "100%",
                                    justifyContent: "flex-start",
                                }}
                            />

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>


            {/* =====================================
                Recommendation Message
            ===================================== */}

            <Box
                mt={2}
                p={2}
                sx={{
                    borderRadius: 2,
                    backgroundColor:
                        isReorderRequired
                            ? "#FFF7ED"
                            : "#F0FDF4",
                    border: "1px solid",
                    borderColor:
                        isReorderRequired
                            ? "#FED7AA"
                            : "#BBF7D0",
                }}
            >

                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >

                    {isReorderRequired ? (
                        <WarningAmberIcon
                            sx={{
                                color: "#EA580C",
                            }}
                        />
                    ) : (
                        <CheckCircleIcon
                            sx={{
                                color: "#16A34A",
                            }}
                        />
                    )}

                    <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                            color:
                                isReorderRequired
                                    ? "#9A3412"
                                    : "#166534",
                        }}
                    >
                        {isReorderRequired
                            ? "Current stock is below the calculated reorder point. Inventory replenishment is recommended."
                            : "Current stock is above the calculated reorder point. No immediate replenishment is required."
                        }
                    </Typography>

                </Box>

            </Box>

        </Box>
    );
}

export default ForecastResult;