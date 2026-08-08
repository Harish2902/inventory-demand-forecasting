import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";

function SearchBar({ searchTerm, setSearchTerm, placeholder }) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: "#94A3B8" }} />
                        </InputAdornment>
                    ),
                },
            }}
            sx={{
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                },
            }}
        />
    );
}

export default SearchBar;