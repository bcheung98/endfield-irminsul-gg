import { CSSProperties, SyntheticEvent } from "react";

// Component imports
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import { SxProps, TooltipProps } from "@mui/material";
import { combineStyles, zoomImageOnHover } from "helpers/utils";

interface ImageProps {
    src: string;
    fallbackSrc?: string;
    alt?: string;
    id?: string;
    loading?: "lazy" | "eager";
    style?: CSSProperties | SxProps;
    tooltip?: React.ReactNode;
    tooltipArrow?: TooltipProps["placement"];
    zoomOnHover?: boolean;
    onClick?: () => void;
}

function Image({
    src,
    fallbackSrc = "images/Unknown",
    alt = "",
    id = src,
    loading = "lazy",
    style,
    tooltip = "",
    tooltipArrow = "top",
    zoomOnHover = false,
    onClick,
}: ImageProps) {
    const defaultImageStyle: CSSProperties = {
        width: "auto",
        height: "auto",
    };

    // If the src doesn't have a specified file extension (ex: `.gif`), append `.png` to the src
    const ext = src.match(/\.[0-9a-z]+$/i) ? "" : ".png";

    if (!src.startsWith("https")) {
        src = `https://assets.irminsul.gg/endfield/${src
            .split(" ")
            .join("_")}${ext}`;
    }

    const imgStyle = combineStyles(defaultImageStyle, style as CSSProperties);

    const handleHover = (direction: "enter" | "leave") => {
        zoomOnHover && zoomImageOnHover({ direction, id });
    };

    return (
        <StyledTooltip title={tooltip} arrow placement={tooltipArrow}>
            <img
                src={src}
                alt={alt}
                id={id}
                loading={loading}
                style={imgStyle}
                onError={(event: SyntheticEvent<HTMLImageElement, Event>) => {
                    event.currentTarget.src = `https://assets.irminsul.gg/endfield/${fallbackSrc}.png`;
                    onerror = null;
                }}
                onClick={onClick}
                onMouseEnter={() => handleHover("enter")}
                onMouseLeave={() => handleHover("leave")}
            />
        </StyledTooltip>
    );
}

export default Image;
