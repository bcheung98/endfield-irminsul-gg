// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card } from "@mui/material";

// Helper imports
import { isUnreleasedContent } from "helpers/utils";

function BetaTag(props: { version: string }) {
    const theme = useTheme();

    if (!isUnreleasedContent(props.version)) {
        return (
            <Card sx={{ p: 2, backgroundColor: theme.palette.error.dark }}>
                <TextStyled>
                    Viewing beta content, all information is subject to change!
                </TextStyled>
            </Card>
        );
    } else {
        return null;
    }
}

export default BetaTag;
