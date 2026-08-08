import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

function ConfirmDeleteSalesDialog({
    open,
    onClose,
    onConfirm,
    sale,
    deleting,
}) {
    return (
        <Dialog
            open={open}
            onClose={deleting ? undefined : onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{ sx: { borderRadius: 3 } }}
        >
            <DialogTitle sx={{ fontWeight: "bold" }}>
                Delete Sales Record
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the sales record for{" "}
                    <strong>{sale?.productName || "this product"}</strong>?
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2.5 }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                    disabled={deleting}
                    sx={{ textTransform: "none", borderRadius: 2 }}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                    disabled={deleting}
                    disableElevation
                    sx={{ textTransform: "none", borderRadius: 2, px: 3 }}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDeleteSalesDialog;