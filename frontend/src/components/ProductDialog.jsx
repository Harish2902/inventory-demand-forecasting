import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

function ProductDialog({
    open,
    onClose,
    product,
    setProduct,
    onSave,
    saving,
}) {
    const handleChange = (event) => {
        const { name, value } = event.target;

        setProduct({
            ...product,
            [name]: value,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={saving ? undefined : onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: 3 } }}
        >
            <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>
                {product.id ? "Update Product" : "Add Product"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2.5} mt={1}>
                    <TextField
                        label="Product Code"
                        name="productCode"
                        value={product.productCode}
                        onChange={handleChange}
                        fullWidth
                        disabled={saving}
                        required
                    />

                    <TextField
                        label="Product Name"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                        fullWidth
                        disabled={saving}
                        required
                    />

                    <TextField
                        label="Category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        fullWidth
                        disabled={saving}
                        required
                    />

                    <TextField
                        label="Current Stock"
                        name="currentStock"
                        type="number"
                        value={product.currentStock}
                        onChange={handleChange}
                        fullWidth
                        disabled={saving}
                    />

                    <TextField
                        label="Lead Time"
                        name="leadTime"
                        type="number"
                        value={product.leadTime}
                        onChange={handleChange}
                        fullWidth
                        disabled={saving}
                    />

                    <TextField
                        label="Safety Stock"
                        name="safetyStock"
                        type="number"
                        value={product.safetyStock}
                        onChange={handleChange}
                        fullWidth
                        disabled={saving}
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                    disabled={saving}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={onSave}
                    disabled={saving}
                    disableElevation
                    sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
                >
                    {saving
                        ? "Saving..."
                        : product.id
                            ? "Update Product"
                            : "Save Product"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProductDialog;