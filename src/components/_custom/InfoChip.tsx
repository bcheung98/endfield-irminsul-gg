// Component imports
import Image from "./Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Chip, ChipProps } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

interface InfoChipProps extends ChipProps {
    src?: string;
    imgSize?: string;
    textVariant?: Variant;
    padding?: string;
}

function InfoChip({
    color = "primary",
    label,
    src,
    imgSize,
    textVariant = "body2",
    padding = "8px",
}: InfoChipProps) {
    const theme = useTheme();

    return (
        <Chip
            icon={
                src ? (
                    <Image
                        src={src}
                        alt={src}
                        style={{
                            width: imgSize || "32px",
                            height: imgSize || "32px",
                            padding: "4px",
                        }}
                    />
                ) : undefined
            }
            label={
                label ? (
                    <TextStyled
                        sx={{ color: theme.appbar.color, ml: src ? "-8px" : 0 }}
                        variant={textVariant}
                    >
                        {label}
                    </TextStyled>
                ) : undefined
            }
            sx={{
                borderRadius: "64px",
                backgroundColor: theme.palette[color].main,
                padding: padding,
            }}
        />
    );
}

export default InfoChip;
