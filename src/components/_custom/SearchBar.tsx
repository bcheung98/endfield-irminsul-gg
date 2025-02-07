import { BaseSyntheticEvent } from "react";

// MUI imports
import { useTheme, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
    autoFocus?: boolean;
    backgroundColor?: string;
    textColor?: string;
    onChange?: (event: BaseSyntheticEvent) => void;
    value?: string;
    placeholder?: string;
    inputIcon?: React.ReactNode;
    size?: {
        width?: string;
        height?: string;
    };
    params?: any | undefined;
}

function SearchBar({
    autoFocus,
    backgroundColor,
    textColor,
    onChange,
    value,
    placeholder = "Search",
    inputIcon,
    size = {
        width: "100%",
        height: "100%",
    },
    params,
}: SearchBarProps) {
    const theme = useTheme();

    return (
        <TextField
            {...params}
            autoFocus={autoFocus}
            focused
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            fullWidth
            autoComplete="off"
            spellCheck={false}
            sx={{
                "& .MuiOutlinedInput-root": {
                    width: size.width,
                    height: size.height,
                    backgroundColor: backgroundColor || theme.background(2),
                    color: textColor || theme.text.primary,
                    fontFamily: theme.font.styled.family,
                    fontWeight: theme.font.styled.weight,
                    borderRadius: "4px",
                    "& fieldset, &:hover fieldset, &:focus, &.Mui-focused fieldset":
                        { border: 0 },
                },
            }}
            slotProps={{
                input: {
                    ...params?.InputProps,
                    startAdornment: (
                        <>
                            <InputAdornment
                                position="start"
                                sx={{ color: textColor || theme.text.primary }}
                            >
                                {inputIcon || <SearchIcon />}
                            </InputAdornment>
                            {params?.InputProps?.startAdornment}
                        </>
                    ),
                },
            }}
        />
    );
}

export default SearchBar;
