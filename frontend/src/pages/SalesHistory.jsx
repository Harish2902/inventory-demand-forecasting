import {
    Alert,
    Box,
    Button,
    Snackbar,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";

import SalesHistoryTable
    from "../components/SalesHistoryTable";

import SalesHistoryDialog
    from "../components/SalesHistoryDialog";

import ConfirmDeleteSalesDialog
    from "../components/ConfirmDeleteSalesDialog";

import SearchBar
    from "../components/SearchBar";

import LoadingSpinner
    from "../components/LoadingSpinner";

import {
    getAllSalesHistory,
    createSalesHistory,
    updateSalesHistory,
    deleteSalesHistory,
} from "../services/salesHistoryService";

import {
    getAllProducts,
} from "../services/productService";


function SalesHistory() {

    // ============================
    // Sales History
    // ============================

    const [salesHistory, setSalesHistory] = useState([]);

    // ============================
    // Products
    // ============================

    const [products, setProducts] = useState([]);

    // ============================
    // Search
    // ============================

    const [searchTerm, setSearchTerm] = useState("");

    // ============================
    // Loading
    // ============================

    const [loading, setLoading] = useState(true);

    // ============================
    // Dialog
    // ============================

    const [openDialog, setOpenDialog] = useState(false);

    const [editMode, setEditMode] = useState(false);

    const [saving, setSaving] = useState(false);

    // ============================
    // Delete Dialog
    // ============================

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [deleting, setDeleting] = useState(false);

    const [selectedSale, setSelectedSale] =
        useState(null);

    // ============================
    // Form
    // ============================

    const [sale, setSale] = useState({
        id: null,
        productId: "",
        productName: "",
        productCode: "",
        saleDate: "",
        quantitySold: "",
    });

    // ============================
    // Snackbar
    // ============================

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    // ============================
    // Load Data
    // ============================

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            setLoading(true);

            const [
                salesResponse,
                productsResponse,
            ] = await Promise.all([
                getAllSalesHistory(),
                getAllProducts(),
            ]);

            /*
             * Sales API returns:
             *
             * {
             *   success: true,
             *   message: "...",
             *   data: [...]
             * }
             */

            const salesData =
                salesResponse.data?.data || [];

            const productsData =
                productsResponse.data || [];

            /*
             * Enrich sales history with
             * product name and product code.
             */

            const enrichedSales =
                salesData.map((saleItem) => {

                    const product =
                        productsData.find(
                            (productItem) =>
                                productItem.id === saleItem.productId
                        );

                    return {
                        ...saleItem,
                        productName:
                            saleItem.productName ||
                            product?.productName ||
                            `Product ${saleItem.productId}`,

                        productCode:
                            saleItem.productCode ||
                            product?.productCode ||
                            "-",
                    };
                });

            setSalesHistory(enrichedSales);

            setProducts(productsData);

        } catch (error) {

            console.error(
                "Error loading sales history:",
                error
            );

            showSnackbar(
                "Failed to load sales history.",
                "error"
            );

        } finally {

            setLoading(false);

        }
    };

    // ============================
    // Snackbar
    // ============================

    const showSnackbar = (
        message,
        severity = "success"
    ) => {

        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const handleSnackbarClose = () => {

        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    // ============================
    // Search
    // ============================

    const filteredSales = salesHistory.filter(
        (saleItem) => {

            const search =
                searchTerm.toLowerCase();

            return (
                String(
                    saleItem.productName || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    saleItem.productCode || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    saleItem.saleDate || ""
                )
                    .toLowerCase()
                    .includes(search)

                ||

                String(
                    saleItem.quantitySold || ""
                )
                    .toLowerCase()
                    .includes(search)
            );
        }
    );

    // ============================
    // Empty Form
    // ============================

    const resetForm = () => {

        setSale({
            id: null,
            productId: "",
            productName: "",
            productCode: "",
            saleDate: "",
            quantitySold: "",
        });

    };

    // ============================
    // Open Add Dialog
    // ============================

    const handleOpenAddDialog = () => {

        resetForm();

        setEditMode(false);

        setOpenDialog(true);

    };

    // ============================
    // Open Edit Dialog
    // ============================

    const handleEdit = (selectedSale) => {

        setSale({
            id: selectedSale.id,
            productId: selectedSale.productId,
            productName:
                selectedSale.productName || "",
            productCode:
                selectedSale.productCode || "",
            saleDate: selectedSale.saleDate,
            quantitySold:
                selectedSale.quantitySold,
        });

        setEditMode(true);

        setOpenDialog(true);

    };

    // ============================
    // Close Dialog
    // ============================

    const handleCloseDialog = () => {

        if (saving) {
            return;
        }

        setOpenDialog(false);

        setEditMode(false);

        resetForm();

    };

    // ============================
    // Save / Update
    // ============================

    const handleSave = async () => {

        if (!sale.productId) {

            showSnackbar(
                "Please select a product.",
                "error"
            );

            return;
        }

        if (!sale.saleDate) {

            showSnackbar(
                "Please select a sale date.",
                "error"
            );

            return;
        }

        if (
            !sale.quantitySold ||
            Number(sale.quantitySold) < 1
        ) {

            showSnackbar(
                "Quantity sold must be greater than zero.",
                "error"
            );

            return;
        }

        const payload = {
            productId: Number(sale.productId),
            saleDate: sale.saleDate,
            quantitySold: Number(
                sale.quantitySold
            ),
        };

        try {

            setSaving(true);

            if (editMode) {

                await updateSalesHistory(
                    sale.id,
                    payload
                );

                showSnackbar(
                    "Sales history updated successfully."
                );

            } else {

                await createSalesHistory(
                    payload
                );

                showSnackbar(
                    "Sales history created successfully."
                );

            }

            setOpenDialog(false);

            setEditMode(false);

            resetForm();

            await loadData();

        } catch (error) {

            console.error(
                "Error saving sales history:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Failed to save sales history.";

            showSnackbar(
                message,
                "error"
            );

        } finally {

            setSaving(false);

        }
    };

    // ============================
    // Delete
    // ============================

    const handleDelete = (selectedSale) => {

        setSelectedSale(selectedSale);

        setDeleteDialogOpen(true);

    };

    // ============================
    // Close Delete Dialog
    // ============================

    const handleCloseDeleteDialog = () => {

        if (deleting) {
            return;
        }

        setDeleteDialogOpen(false);

        setSelectedSale(null);

    };

    // ============================
    // Confirm Delete
    // ============================

    const handleConfirmDelete = async () => {

        if (!selectedSale?.id) {
            return;
        }

        try {

            setDeleting(true);

            await deleteSalesHistory(
                selectedSale.id
            );

            showSnackbar(
                "Sales history deleted successfully."
            );

            setDeleteDialogOpen(false);

            setSelectedSale(null);

            await loadData();

        } catch (error) {

            console.error(
                "Error deleting sales history:",
                error
            );

            const message =
                error.response?.data?.message ||
                "Failed to delete sales history.";

            showSnackbar(
                message,
                "error"
            );

        } finally {

            setDeleting(false);

        }
    };

    // ============================
    // Loading Screen
    // ============================

    if (loading) {

        return (
            <LoadingSpinner
                message="Loading Sales History..."
            />
        );

    }

    // ============================
    // UI
    // ============================

    return (
        <>

            {/* Header */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: "#1E293B" }}
                >
                    Sales History
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                    disableElevation
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 2.5,
                        whiteSpace: "nowrap",
                    }}
                >
                    Add Sale
                </Button>

            </Box>


            {/* Search */}

            <Box sx={{ mb: 3 }}>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search by Product, Code, Date or Quantity..."
                />
            </Box>


            {/* Table */}

            <SalesHistoryTable
                salesHistory={filteredSales}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />


            {/* Add / Edit Dialog */}

            <SalesHistoryDialog
                open={openDialog}
                onClose={handleCloseDialog}
                onSave={handleSave}
                sale={sale}
                setSale={setSale}
                products={products}
                editMode={editMode}
                saving={saving}
            />


            {/* Delete Confirmation */}

            <ConfirmDeleteSalesDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                sale={selectedSale}
                deleting={deleting}
            />


            {/* Snackbar */}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >

                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{
                        width: "100%",
                    }}
                >
                    {snackbar.message}
                </Alert>

            </Snackbar>

        </>
    );
}

export default SalesHistory;