import {
    styled,
    TableRow,
    TableCell,
    tableCellClasses,
    tableRowClasses,
} from "@mui/material";
import { variantMap } from "themes/theme";
import { ColorVariants } from "types/theme";

interface CustomTableRowProps {
    color?: ColorVariants;
}

export const StyledTableRow = styled(TableRow)<CustomTableRowProps>(
    ({ theme, color = "tertiary" }) => ({
        backgroundColor: theme.background(
            variantMap[color as keyof typeof variantMap]
        ),
        [`&.${tableRowClasses.hover}`]: {
            "&:hover": {
                backgroundColor: theme.background(
                    variantMap[color as keyof typeof variantMap],
                    "dark"
                ),
            },
        },
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    })
);

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.border.color.primary,
    padding: "8px 16px",
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.appbar.backgroundColor,
    },
}));
