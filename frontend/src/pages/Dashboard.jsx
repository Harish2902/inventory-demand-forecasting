import { useEffect, useState } from "react";

import {
    Grid,
    Typography,
    Box,
    Paper,
    CircularProgress,
    Alert,
} from "@mui/material";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


function Dashboard() {

    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [forecasts, setForecasts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // Extract API Data
    // ==========================================

    const extractData = (json) => {

        if (Array.isArray(json?.data)) {
            return json.data;
        }

        if (Array.isArray(json)) {
            return json;
        }

        return [];
    };


    // ==========================================
    // Fetch Dashboard Data
    // ==========================================

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                setLoading(true);
                setError("");


                // ==================================
                // Fetch Products
                // ==================================

                const productsResponse = await fetch(
                    "http://localhost:8080/products"
                );

                if (!productsResponse.ok) {

                    throw new Error(
                        `Products API failed with status ${productsResponse.status}`
                    );

                }

                const productsJson =
                    await productsResponse.json();

                console.log(
                    "Products API Response:",
                    productsJson
                );

                const productsData =
                    extractData(productsJson);

                console.log(
                    "Products Data:",
                    productsData
                );

                setProducts(productsData);


                // ==================================
                // Fetch Sales History
                // ==================================

                const salesResponse = await fetch(
                    "http://localhost:8080/sales"
                );

                if (!salesResponse.ok) {

                    throw new Error(
                        `Sales API failed with status ${salesResponse.status}`
                    );

                }

                const salesJson =
                    await salesResponse.json();

                console.log(
                    "Sales API Response:",
                    salesJson
                );

                const salesData =
                    extractData(salesJson);

                console.log(
                    "Sales Data:",
                    salesData
                );

                setSales(salesData);


                // ==================================
                // Fetch Forecasts
                // ==================================

                if (productsData.length > 0) {

                    const forecastPromises =
                        productsData.map(
                            async (product) => {

                                try {

                                    const response =
                                        await fetch(
                                            `http://localhost:8080/forecast/${product.id}`
                                        );

                                    if (!response.ok) {

                                        console.warn(
                                            `Forecast failed for product ${product.id}`
                                        );

                                        return null;

                                    }

                                    const json =
                                        await response.json();

                                    return (
                                        json?.data ||
                                        json
                                    );

                                } catch (error) {

                                    console.error(
                                        `Forecast failed for product ${product.id}:`,
                                        error
                                    );

                                    return null;

                                }

                            }
                        );


                    const forecastResults =
                        await Promise.all(
                            forecastPromises
                        );


                    const validForecasts =
                        forecastResults.filter(
                            (forecast) =>
                                forecast !== null
                        );


                    console.log(
                        "Forecast Data:",
                        validForecasts
                    );

                    setForecasts(
                        validForecasts
                    );

                } else {

                    setForecasts([]);

                }


            } catch (error) {

                console.error(
                    "Error loading dashboard data:",
                    error
                );

                setError(
                    "Unable to load dashboard data. Please make sure the backend is running."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchDashboardData();

    }, []);


    // ==========================================
    // Dashboard Calculations
    // ==========================================

    const totalProducts =
        products.length;


    const totalUnitsSold =
        sales.reduce(
            (total, sale) => {

                return total +
                    Number(
                        sale.quantitySold || 0
                    );

            },
            0
        );


    // ==========================================
    // Healthy Stock Products
    // ==========================================

    const healthyStockProducts =
        products.filter(
            (product) => {

                const currentStock =
                    Number(
                        product.currentStock || 0
                    );

                const safetyStock =
                    Number(
                        product.safetyStock || 0
                    );

                return (
                    currentStock >
                    safetyStock
                );

            }
        );


    // ==========================================
    // Low Stock Products
    // ==========================================

    const lowStockProducts =
        products.filter(
            (product) => {

                const currentStock =
                    Number(
                        product.currentStock || 0
                    );

                const safetyStock =
                    Number(
                        product.safetyStock || 0
                    );

                return (
                    currentStock > 0 &&
                    currentStock <=
                        safetyStock
                );

            }
        );


    // ==========================================
    // Out Of Stock Products
    // ==========================================

    const outOfStockProducts =
        products.filter(
            (product) => {

                return Number(
                    product.currentStock || 0
                ) === 0;

            }
        );


    // ==========================================
    // Reorder Required
    // ==========================================

    const reorderRequired =
        forecasts.filter(
            (forecast) =>
                forecast.recommendation ===
                "REORDER NOW"
        );


    // ==========================================
    // Stock Status Pie Chart Data
    // ==========================================

    const stockStatusData = [

        {
            name: "Healthy Stock",
            value:
                healthyStockProducts.length,
            products:
                healthyStockProducts,
        },

        {
            name: "Low Stock",
            value:
                lowStockProducts.length,
            products:
                lowStockProducts,
        },

        {
            name: "Out of Stock",
            value:
                outOfStockProducts.length,
            products:
                outOfStockProducts,
        },

    ].filter(
        (item) =>
            item.value > 0
    );


    // ==========================================
    // Sales By Product
    // ==========================================

    const salesByProductMap = {};


    sales.forEach(
        (sale) => {

            const productName =
                sale.productName ||
                `Product ${sale.productId}`;


            if (
                !salesByProductMap[
                    productName
                ]
            ) {

                salesByProductMap[
                    productName
                ] = 0;

            }


            salesByProductMap[
                productName
            ] += Number(
                sale.quantitySold || 0
            );

        }
    );


    const salesByProductData =
        Object.entries(
            salesByProductMap
        ).map(
            ([name, value]) => ({

                name,
                value,

            })
        );


    // ==========================================
    // Pie Chart Colors
    // ==========================================

    const stockColors = [

        "#22C55E",
        "#F59E0B",
        "#EF4444",

    ];


    const salesColors = [

        "#2563EB",
        "#7C3AED",
        "#059669",
        "#EA580C",
        "#DB2777",
        "#0891B2",

    ];


    // ==========================================
    // Custom Stock Tooltip
    // ==========================================

    const StockStatusTooltip = ({
        active,
        payload,
    }) => {

        if (
            !active ||
            !payload ||
            payload.length === 0
        ) {

            return null;

        }


        const data =
            payload[0]?.payload;


        if (!data) {
            return null;
        }


        return (

            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    border:
                        "1px solid #E2E8F0",
                    borderRadius: 2,
                    boxShadow:
                        "0 4px 12px rgba(0,0,0,0.15)",
                    padding:
                        "12px 16px",
                    minWidth: "200px",
                }}
            >

                <Typography
                    sx={{
                        fontWeight: "bold",
                        color: "#1E293B",
                        mb: 1,
                    }}
                >
                    {data.name}: {data.value}
                </Typography>


                {data.products &&
                data.products.length > 0 ? (

                    <Box>

                        {data.products.map(
                            (product) => (

                                <Typography
                                    key={
                                        product.id
                                    }
                                    variant="body2"
                                    sx={{
                                        color:
                                            "#475569",
                                        mb: 0.5,
                                    }}
                                >
                                    •{" "}
                                    {
                                        product.productName
                                    }
                                </Typography>

                            )
                        )}

                    </Box>

                ) : (

                    <Typography
                        variant="body2"
                        sx={{
                            color:
                                "#64748B",
                        }}
                    >
                        No products
                    </Typography>

                )}

            </Box>

        );

    };


    // ==========================================
    // Loading State
    // ==========================================

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    minHeight:
                        "60vh",
                }}
            >

                <CircularProgress />

            </Box>

        );

    }


    // ==========================================
    // Dashboard UI
    // ==========================================

    return (

        <Box>

            {/* =====================================
                Dashboard Header
            ===================================== */}

            <Box mb={4}>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight:
                            "bold",
                        color:
                            "#1E293B",
                    }}
                >
                    Dashboard
                </Typography>


                <Typography
                    variant="body1"
                    sx={{
                        mt: 1,
                        color:
                            "#64748B",
                    }}
                >
                    Welcome back, Harish 👋
                    Here is your inventory
                    overview.
                </Typography>

            </Box>


            {/* =====================================
                Error Message
            ===================================== */}

            {error && (

                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                    }}
                >
                    {error}
                </Alert>

            )}


            {/* =====================================
                Charts
            ===================================== */}

            <Grid
                container
                spacing={3}
            >

                {/* =================================
                    Product Stock Status
                ================================= */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >

                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            height: 500,
                        }}
                    >

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight:
                                    500,
                            }}
                        >
                            Product Stock Status
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "#64748B",
                                mt: 0.5,
                            }}
                        >
                            Current inventory health
                        </Typography>


                        <Box
                            sx={{
                                width:
                                    "100%",
                                height: 390,
                                mt: 1,
                            }}
                        >

                            {stockStatusData.length >
                            0 ? (

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <PieChart>

                                        <Pie
                                            data={
                                                stockStatusData
                                            }
                                            cx="50%"
                                            cy="45%"
                                            outerRadius={
                                                125
                                            }
                                            dataKey="value"
                                            nameKey="name"
                                            label={({
                                                name,
                                                value,
                                            }) =>
                                                `${name}: ${value}`
                                            }
                                        >

                                            {stockStatusData.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (

                                                    <Cell
                                                        key={
                                                            `stock-${index}`
                                                        }
                                                        fill={
                                                            stockColors[
                                                                index
                                                            ]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>


                                        {/* Custom Tooltip */}

                                        <Tooltip
                                            content={
                                                <StockStatusTooltip />
                                            }
                                        />


                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                        />

                                    </PieChart>

                                </ResponsiveContainer>

                            ) : (

                                <Box
                                    sx={{
                                        height:
                                            "100%",
                                        display:
                                            "flex",
                                        justifyContent:
                                            "center",
                                        alignItems:
                                            "center",
                                    }}
                                >

                                    <Typography
                                        color="text.secondary"
                                    >
                                        No product
                                        stock data
                                        available
                                    </Typography>

                                </Box>

                            )}

                        </Box>

                    </Paper>

                </Grid>


                {/* =================================
                    Sales By Product
                ================================= */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >

                    <Paper
                        elevation={3}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            height: 500,
                        }}
                    >

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight:
                                    500,
                            }}
                        >
                            Sales by Product
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "#64748B",
                                mt: 0.5,
                            }}
                        >
                            Distribution of total units sold
                        </Typography>


                        <Box
                            sx={{
                                width:
                                    "100%",
                                height: 390,
                                mt: 1,
                            }}
                        >

                            {salesByProductData.length >
                            0 ? (

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <PieChart>

                                        <Pie
                                            data={
                                                salesByProductData
                                            }
                                            cx="50%"
                                            cy="45%"
                                            outerRadius={
                                                125
                                            }
                                            dataKey="value"
                                            nameKey="name"
                                            label={({
                                                name,
                                                value,
                                            }) =>
                                                `${name}: ${value}`
                                            }
                                        >

                                            {salesByProductData.map(
                                                (
                                                    entry,
                                                    index
                                                ) => (

                                                    <Cell
                                                        key={
                                                            `sales-${index}`
                                                        }
                                                        fill={
                                                            salesColors[
                                                                index %
                                                                salesColors.length
                                                            ]
                                                        }
                                                    />

                                                )
                                            )}

                                        </Pie>


                                        <Tooltip
                                            formatter={(
                                                value,
                                                name
                                            ) => [
                                                value,
                                                name,
                                            ]}
                                        />


                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                        />

                                    </PieChart>

                                </ResponsiveContainer>

                            ) : (

                                <Box
                                    sx={{
                                        height:
                                            "100%",
                                        display:
                                            "flex",
                                        justifyContent:
                                            "center",
                                        alignItems:
                                            "center",
                                    }}
                                >

                                    <Typography
                                        color="text.secondary"
                                    >
                                        No sales data
                                        available
                                    </Typography>

                                </Box>

                            )}

                        </Box>

                    </Paper>

                </Grid>

            </Grid>


            {/* =====================================
                Dashboard Summary
            ===================================== */}

            <Grid
                container
                spacing={3}
                sx={{
                    mt: 1,
                }}
            >

                {/* =================================
                    Total Products
                ================================= */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign:
                                "center",
                            borderTop:
                                "4px solid #2563EB",
                        }}
                    >

                        <Typography
                            variant="body1"
                            sx={{
                                color:
                                    "#64748B",
                                mb: 1,
                            }}
                        >
                            Total Products
                        </Typography>


                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight:
                                    "bold",
                                color:
                                    "#2563EB",
                            }}
                        >
                            {totalProducts}
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "#94A3B8",
                                mt: 1,
                            }}
                        >
                            Products in inventory
                        </Typography>

                    </Paper>

                </Grid>


                {/* =================================
                    Total Units Sold
                ================================= */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign:
                                "center",
                            borderTop:
                                "4px solid #059669",
                        }}
                    >

                        <Typography
                            variant="body1"
                            sx={{
                                color:
                                    "#64748B",
                                mb: 1,
                            }}
                        >
                            Total Units Sold
                        </Typography>


                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight:
                                    "bold",
                                color:
                                    "#059669",
                            }}
                        >
                            {totalUnitsSold}
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "#94A3B8",
                                mt: 1,
                            }}
                        >
                            Based on sales history
                        </Typography>

                    </Paper>

                </Grid>


                {/* =================================
                    Low Stock
                ================================= */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign:
                                "center",
                            borderTop:
                                "4px solid #EA580C",
                        }}
                    >

                        <Typography
                            variant="body1"
                            sx={{
                                color:
                                    "#64748B",
                                mb: 1,
                            }}
                        >
                            Low Stock
                        </Typography>


                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight:
                                    "bold",
                                color:
                                    "#EA580C",
                            }}
                        >
                            {
                                lowStockProducts.length
                            }
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "#94A3B8",
                                mt: 1,
                            }}
                        >
                            Needs attention
                        </Typography>

                    </Paper>

                </Grid>


                {/* =================================
                    Reorder Required
                ================================= */}

                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 3,
                    }}
                >

                    <Paper
                        elevation={2}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            textAlign:
                                "center",
                            borderTop:
                                "4px solid #7C3AED",
                        }}
                    >

                        <Typography
                            variant="body1"
                            sx={{
                                color:
                                    "#64748B",
                                mb: 1,
                            }}
                        >
                            Reorder Required
                        </Typography>


                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight:
                                    "bold",
                                color:
                                    "#7C3AED",
                            }}
                        >
                            {
                                reorderRequired.length
                            }
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "#94A3B8",
                                mt: 1,
                            }}
                        >
                            Based on forecast
                        </Typography>

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    );

}


export default Dashboard;