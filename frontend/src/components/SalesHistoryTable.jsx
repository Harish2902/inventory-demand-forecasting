import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

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

function SalesHistoryTable({ salesHistory, onEdit, onDelete }) {
    if (salesHistory.length === 0) {
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
                <ReceiptLongOutlinedIcon
                    sx={{ fontSize: 64, color: "#CBD5E1" }}
                />

                <Typography variant="h6" fontWeight="bold" mt={2} sx={{ color: "#1E293B" }}>
                    No Sales History Found
                </Typography>

                <Typography color="text.secondary" mt={0.5}>
                    Click "Add Sale" to record your first sale.
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
                        <TableCell sx={headerCellSx}>Product</TableCell>
                        <TableCell sx={headerCellSx}>Product Code</TableCell>
                        <TableCell align="center" sx={headerCellSx}>Sale Date</TableCell>
                        <TableCell align="center" sx={headerCellSx}>Quantity Sold</TableCell>
                        <TableCell align="center" sx={headerCellSx}>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {salesHistory.map((sale, index) => (
                        <TableRow
                            key={sale.id}
                            hover
                            sx={{
                                backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                            }}
                        >
                            <TableCell sx={{ fontWeight: 500 }}>
                                {sale.productName || `Product ${sale.productId}`}
                            </TableCell>

                            <TableCell>{sale.productCode || "-"}</TableCell>

                            <TableCell align="center">{sale.saleDate}</TableCell>

                            <TableCell align="center">{sale.quantitySold}</TableCell>

                            <TableCell align="center">
                                <Tooltip title="Edit Sale">
                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={() => onEdit(sale)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete Sale">
                                    <IconButton
                                        color="error"
                                        size="small"
                                        onClick={() => onDelete(sale)}
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

export default SalesHistoryTable;