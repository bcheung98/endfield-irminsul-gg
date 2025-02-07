import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, Card } from "@mui/material";

// Helper imports
import { pxToInt } from "helpers/utils";

// Type imports
import { Rarity } from "types/_common";

interface MaterialImageProps {
    name: string;
    rarity: Rarity;
    cost: number;
    imgSrc: string;
    size?: string;
    labelColor?: string;
}

function MaterialImage({
    name,
    rarity,
    cost,
    imgSrc,
    size = "64px",
    labelColor,
}: MaterialImageProps) {
    const theme = useTheme();

    size = useMediaQuery(theme.breakpoints.up("sm"))
        ? size
        : `${pxToInt(size) - 8}px`;

    const intSize = pxToInt(size) / 4;
    const fontSize =
        cost.toLocaleString().length < 8
            ? intSize - 4
            : intSize - (cost.toLocaleString().length - 4);

    const cardStyle: CSSProperties = {
        width: size,
        backgroundColor: theme.appbar.backgroundColor,
    };

    const imgStyle: CSSProperties = {
        width: size,
        height: size,
        backgroundImage: `url(https://assets.irminsul.gg/endfield/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "contain",
        borderRadius: "0px 0px 8px 0px",
    };

    const labelStyle: CSSProperties = {
        padding: "0px 0px 4px",
        textAlign: "center",
        backgroundColor: labelColor || theme.appbar.backgroundColor,
    };

    return (
        <Card sx={cardStyle}>
            <Image
                src={`materials/${imgSrc}`}
                alt={name}
                style={imgStyle}
                tooltip={name}
            />
            <Box sx={labelStyle}>
                <TextStyled
                    sx={{
                        fontSize: `${fontSize}px !important`,
                        color: theme.appbar.color,
                    }}
                >
                    {cost.toLocaleString()}
                </TextStyled>
            </Box>
        </Card>
    );
}

export default MaterialImage;
