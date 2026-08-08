import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Paper,
    Grid,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import LoadingSpinner from "../components/LoadingSpinner";
import ForecastResult from "../components/ForecastResult";

import { getAllProducts } from "../services/productService";
import { getForecastByProductId } from "../services/forecastService";
import { getAllSales } from "../services/salesService";


function Forecast() {

    const [products, setProducts] = useState([]);

    const [selectedProductId, setSelectedProductId] = useState("");

    const [forecast, setForecast] = useState(null);

    const [salesHistory, setSalesHistory] = useState([]);

    const [loadingProducts, setLoadingProducts] = useState(true);

    const [loadingForecast, setLoadingForecast] = useState(false);

    const [error, setError] = useState("");


    // ============================
    // Load Products
    // ============================

    useEffect(() => {

        loadProducts();

    }, []);


    const loadProducts = async () => {

        try {

            setLoadingProducts(true);

            setError("");

            const response = await getAllProducts();

            setProducts(response.data);

        } catch (error) {

            console.error(
                "Error loading products:",
                error
            );

            setError(
                "Unable to load products. Please try again."
            );

        } finally {

            setLoadingProducts(false);

        }

    };


    // ============================
    // Product Selection
    // ============================

    const handleProductChange = (event) => {

        setSelectedProductId(event.target.value);

        setForecast(null);

        setSalesHistory([]);

        setError("");

    };


    // ============================
    // Generate Forecast
    // ============================

    const handleGenerateForecast = async () => {

        if (!selectedProductId) {

            setError(
                "Please select a product first."
            );

            return;

        }


        try {

            setLoadingForecast(true);

            setError("");

            setForecast(null);

            setSalesHistory([]);


            // =====================================
            // Fetch Forecast
            // =====================================

            const forecastResponse =
                await getForecastByProductId(
                    selectedProductId
                );


            const forecastData =
                forecastResponse.data.data;


            setForecast(forecastData);


            // =====================================
            // Fetch Sales History
            // =====================================

            const salesResponse =
                await getAllSales();


            const salesData =
                salesResponse.data.data;


            // =====================================
            // Filter Sales For Selected Product
            // =====================================

            const productSales =
                salesData
                    .filter(
                        (sale) =>
                            Number(sale.productId) ===
                            Number(selectedProductId)
                    )
                    .sort(
                        (a, b) =>
                            new Date(a.saleDate) -
                            new Date(b.saleDate)
                    );


            setSalesHistory(productSales);


        } catch (error) {

            console.error(
                "Error generating forecast:",
                error
            );


            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    "Unable to generate forecast. Please try again."
                );

            }

        } finally {

            setLoadingForecast(false);

        }

    };


    // ============================
    // Prepare Chart Data
    // ============================

    const chartData =
        salesHistory.map(
            (sale) => ({

                date: sale.saleDate,

                actualDemand:
                    Number(
                        sale.quantitySold || 0
                    ),

                forecastDemand: null,

            })
        );


    // ==========================================
    // Add Forecast Point
    // ==========================================

    if (
        forecast &&
        salesHistory.length > 0
    ) {

        chartData.push({

            date: "Forecast",

            actualDemand: null,

            forecastDemand:
                Number(
                    forecast.predictedDemand || 0
                ),

        });

    }


    // ============================
    // Loading Products
    // ============================

    if (loadingProducts) {

        return (

            <LoadingSpinner
                message="Loading Products..."
            />

        );

    }


    return (

        <Box>

            {/* ==========================
                Page Header
            ========================== */}

            <Box
                display="flex"
                alignItems="center"
                gap={1}
                mb={1}
            >

                <TrendingUpIcon
                    color="primary"
                    fontSize="large"
                />

                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    Demand Forecast
                </Typography>

            </Box>


            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                Select a product to generate its future
                demand forecast and reorder recommendation.
            </Typography>


            {/* ==========================
                Error Message
            ========================== */}

            {error && (

                <Alert
                    severity="error"
                    onClose={() => setError("")}
                    sx={{ mb: 3 }}
                >

                    {error}

                </Alert>

            )}


            {/* ==========================
                Product Selection
            ========================== */}

            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    mb: 3,
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                >
                    Generate Forecast
                </Typography>


                <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                    flexWrap="wrap"
                >

                    <FormControl
                        sx={{
                            minWidth: 300,
                        }}
                    >

                        <InputLabel>
                            Select Product
                        </InputLabel>


                        <Select
                            value={selectedProductId}
                            label="Select Product"
                            onChange={
                                handleProductChange
                            }
                        >

                            <MenuItem value="">
                                <em>
                                    Select a product
                                </em>
                            </MenuItem>


                            {products.map(
                                (product) => (

                                    <MenuItem
                                        key={product.id}
                                        value={product.id}
                                    >

                                        {product.productCode}
                                        {" - "}
                                        {product.productName}

                                    </MenuItem>

                                )
                            )}

                        </Select>

                    </FormControl>


                    <Button
                        variant="contained"
                        size="large"
                        startIcon={
                            <TrendingUpIcon />
                        }
                        onClick={
                            handleGenerateForecast
                        }
                        disabled={
                            !selectedProductId ||
                            loadingForecast
                        }
                    >

                        {loadingForecast
                            ? "Generating..."
                            : "Generate Forecast"}

                    </Button>

                </Box>

            </Paper>


            {/* ==========================
                Forecast Loading
            ========================== */}

            {loadingForecast && (

                <LoadingSpinner
                    message="Generating Demand Forecast..."
                />

            )}


            {/* ==========================
                Forecast Result
            ========================== */}

            {!loadingForecast &&
                forecast && (

                    <Box>

                        {/* ======================
                            Historical Sales Chart
                        ====================== */}

                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                mb: 3,
                            }}
                        >

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >
                                Demand Trend
                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mb={2}
                            >
                                Historical sales and predicted
                                future demand
                            </Typography>


                            {chartData.length > 0 ? (

                                <Box
                                    sx={{
                                        width: "100%",
                                        height: 400,
                                    }}
                                >

                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >

                                        <LineChart
                                            data={chartData}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 10,
                                                bottom: 20,
                                            }}
                                        >

                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                            />


                                            <XAxis
                                                dataKey="date"
                                            />


                                            <YAxis
                                                allowDecimals={false}
                                            />


                                            <Tooltip
                                                formatter={(
                                                    value,
                                                    name
                                                ) => [

                                                    value,
                                                    name ===
                                                        "actualDemand"
                                                        ? "Actual Sales"
                                                        : "Predicted Demand",

                                                ]}
                                            />


                                            <Legend />


                                            <Line
                                                type="monotone"
                                                dataKey="actualDemand"
                                                name="Actual Sales"
                                                stroke="#2563EB"
                                                strokeWidth={3}
                                                dot={{
                                                    r: 5,
                                                }}
                                                connectNulls={false}
                                            />


                                            <Line
                                                type="monotone"
                                                dataKey="forecastDemand"
                                                name="Predicted Demand"
                                                stroke="#7C3AED"
                                                strokeWidth={3}
                                                strokeDasharray="8 5"
                                                dot={{
                                                    r: 7,
                                                }}
                                            />

                                        </LineChart>

                                    </ResponsiveContainer>

                                </Box>

                            ) : (

                                <Box
                                    sx={{
                                        py: 8,
                                        textAlign: "center",
                                    }}
                                >

                                    <Typography
                                        color="text.secondary"
                                    >
                                        No sales history available
                                        for this product.
                                    </Typography>

                                </Box>

                            )}

                        </Paper>


                        {/* ======================
                            Forecast Details
                        ====================== */}

                        <ForecastResult
                            forecast={forecast}
                        />

                    </Box>

                )}


            {/* ==========================
                Empty State
            ========================== */}

            {!loadingForecast &&
                !forecast &&
                !error && (

                    <Box
                        mt={4}
                        textAlign="center"
                        sx={{
                            py: 8,
                            px: 3,
                            borderRadius: 3,
                            backgroundColor:
                                "#f5f7fa",
                        }}
                    >

                        <TrendingUpIcon
                            sx={{
                                fontSize: 60,
                                color:
                                    "text.secondary",
                                mb: 2,
                            }}
                        />


                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="text.secondary"
                        >
                            No Forecast Generated
                        </Typography>


                        <Typography
                            variant="body2"
                            color="text.secondary"
                            mt={1}
                        >

                            Select a product and click{" "}

                            <strong>
                                Generate Forecast
                            </strong>

                            {" "}
                            to view the prediction.

                        </Typography>

                    </Box>

                )}

        </Box>

    );

}


export default Forecast;