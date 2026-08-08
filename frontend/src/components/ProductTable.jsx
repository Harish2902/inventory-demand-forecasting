import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";

const headerCellSx = {
    color: "#FFFFFF",
    fontWeight: 600,
    letterSpacing: 0.2,
};

function ProductTable({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return (
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    borderRadius: 3,
                    textAlign: "center",
                    border: "1px solid #E2E8F0",
                }}
            >
                <Inventory2OutlinedIcon
                    sx={{ fontSize: 64, color: "#CBD5E1" }}
                />

                <Typography variant="h6" fontWeight="bold" mt={2} sx={{ color: "#1E293B" }}>
                    No Products Found
                </Typography>

                <Typography color="text.secondary" mt={0.5}>
                    Click "Add Product" to create your first product.
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                overflowX: "auto",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "primary.main" }}>
                        <TableCell sx={headerCellSx}>Product Code</TableCell>
                        <TableCell sx={headerCellSx}>Product Name</TableCell>
                        <TableCell sx={headerCellSx}>Category</TableCell>
                        <TableCell align="center" sx={headerCellSx}>Stock</TableCell>
                        <TableCell align="center" sx={headerCellSx}>Lead Time</TableCell>
                        <TableCell align="center" sx={headerCellSx}>Safety Stock</TableCell>
                        <TableCell align="center" sx={headerCellSx}>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.map((product, index) => (
                        <TableRow
                            key={product.id}
                            hover
                            sx={{
                                backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                            }}
                        >
                            <TableCell sx={{ fontWeight: 500 }}>
                                {product.productCode}
                            </TableCell>

                            <TableCell>{product.productName}</TableCell>

                            <TableCell>{product.category}</TableCell>

                            <TableCell align="center">{product.currentStock}</TableCell>

                            <TableCell align="center">{product.leadTime}</TableCell>

                            <TableCell align="center">{product.safetyStock}</TableCell>

                            <TableCell align="center">
                                <Tooltip title="Edit Product">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={() => onEdit(product)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete Product">
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => onDelete(product)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductTable;