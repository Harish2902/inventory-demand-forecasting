import { Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";

import ProductTable from "../components/ProductTable";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductDialog from "../components/ProductDialog";
import ConfirmDeleteDialog from "../components/ConfirmDeleteSalesDialog";
import SnackbarAlert from "../components/SnackbarAlert";

import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../services/ProductService";

function Products() {

    const emptyProduct = {
        id: null,
        productCode: "",
        productName: "",
        category: "",
        currentStock: "",
        leadTime: "",
        safetyStock: "",
    };

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [product, setProduct] = useState(emptyProduct);

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    // ==========================
    // Snackbar
    // ==========================

    const showSnackbar = (severity, message) => {

        setSnackbar({
            open: true,
            severity,
            message,
        });

    };

    const handleCloseSnackbar = () => {

        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));

    };

    // ==========================
    // Load Products
    // ==========================

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const response = await getAllProducts();

            setProducts(response.data);

        } catch (error) {

            console.error(error);

            showSnackbar(
                "error",
                "Unable to load products."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Search
    // ==========================

    const filteredProducts = products.filter((p) =>
        p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ==========================
    // Dialog
    // ==========================

    const handleOpenDialog = () => {

        setProduct(emptyProduct);

        setOpenDialog(true);

    };

    const handleEdit = (selectedProduct) => {

        setProduct(selectedProduct);

        setOpenDialog(true);

    };

    const handleCloseDialog = () => {

        setOpenDialog(false);

        setProduct(emptyProduct);

    };

    // ==========================
    // Save Product
    // ==========================

    const handleSave = async () => {

        if (
            !product.productCode ||
            !product.productName ||
            !product.category
        ) {

            showSnackbar(
                "warning",
                "Please fill all mandatory fields."
            );

            return;

        }

        try {

            setSaving(true);

            if (product.id) {

                await updateProduct(
                    product.id,
                    product
                );

                showSnackbar(
                    "success",
                    "Product updated successfully."
                );

            } else {

                await createProduct(product);

                showSnackbar(
                    "success",
                    "Product created successfully."
                );

            }

            handleCloseDialog();

            await loadProducts();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "error",
                "Unable to save product."
            );

        } finally {

            setSaving(false);

        }

    };

    // ==========================
    // Delete
    // ==========================

    const handleDelete = (product) => {

        setSelectedProduct(product);

        setDeleteDialogOpen(true);

    };

    const handleCloseDeleteDialog = () => {

        setDeleteDialogOpen(false);

        setSelectedProduct(null);

    };

    const handleConfirmDelete = async () => {

        try {

            await deleteProduct(selectedProduct.id);

            showSnackbar(
                "success",
                "Product deleted successfully."
            );

            handleCloseDeleteDialog();

            await loadProducts();

        } catch (error) {

            console.error(error);

            showSnackbar(
                "error",
                "Unable to delete product."
            );

        }

    };

    if (loading) {

        return (
            <LoadingSpinner
                message="Loading Products..."
            />
        );

    }

    return (

        <>

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
                    Products
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                    disableElevation
                    sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 2.5,
                        whiteSpace: "nowrap",
                    }}
                >
                    Add Product
                </Button>

            </Box>

            <Box sx={{ mb: 3 }}>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    placeholder="Search by Product Code, Name or Category..."
                />
            </Box>

            <ProductTable
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ProductDialog
                open={openDialog}
                onClose={handleCloseDialog}
                product={product}
                setProduct={setProduct}
                onSave={handleSave}
                saving={saving}
            />

            <ConfirmDeleteDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                sale={selectedProduct}
                deleting={saving}
            />

            <SnackbarAlert
                open={snackbar.open}
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
                message={snackbar.message}
            />

        </>

    );

}

export default Products;