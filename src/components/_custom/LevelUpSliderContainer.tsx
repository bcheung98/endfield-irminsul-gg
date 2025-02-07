// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface LevelUpSliderContainerProps {
    children?: React.ReactNode;
    values: [number | string, number | string];
    threshold?: string;
}

function LevelUpSliderContainer({
    children,
    values,
    threshold = "@100",
}: LevelUpSliderContainerProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid
            container
            spacing={3.5}
            sx={{
                px: {
                    "@": matches_sm_dn ? "16px" : "0px",
                    [threshold]: "16px",
                },
                alignItems: "center",
                width: { xs: "100%", sm: "50%" },
                maxWidth: { lg: "500px" },
            }}
        >
            <Grid
                size={1}
                sx={{
                    display: { "@": "flex", [threshold]: "none" },
                    mb: "24px",
                }}
            >
                <TextStyled>{values[0]}</TextStyled>
            </Grid>
            <Grid size="grow">{children}</Grid>
            <Grid
                size={1}
                sx={{
                    display: { "@": "flex", [threshold]: "none" },
                    mb: "24px",
                }}
            >
                <TextStyled>{values[1]}</TextStyled>
            </Grid>
        </Grid>
    );
}

export default LevelUpSliderContainer;
