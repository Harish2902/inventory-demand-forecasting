import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";

function SalesHistoryDialog({
    open,
    onClose,
    onSave,
    sale,
    setSale,
    products,
    editMode,
    saving,
}) {
    const handleChange = (event) => {
        const { name, value } = event.target;

        setSale({
            ...sale,
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
                {editMode ? "Update Sales History" : "Add Sales History"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2.5} mt={1}>
                    <TextField
                        select
                        label="Product"
                        name="productId"
                        value={sale.productId}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.productName} ({product.productCode})
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Sale Date"
                        name="saleDate"
                        type="date"
                        value={sale.saleDate}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Quantity Sold"
                        name="quantitySold"
                        type="number"
                        value={sale.quantitySold}
                        onChange={handleChange}
                        fullWidth
                        required
                        inputProps={{ min: 1 }}
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
                        : editMode
                            ? "Update Sale"
                            : "Save Sale"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SalesHistoryDialog;