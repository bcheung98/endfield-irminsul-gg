import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import ElementIcon from "./ElementIcon";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack, Skeleton } from "@mui/material";
// import Grid from "@mui/material/Grid2";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";

// Type imports
import { Class, Element, Rarity, WeaponType } from "types/_common";

interface InfoCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "weapon";
    rarity?: Rarity;
    variant?: "icon" | "avatar" | "material-card";
    size?: string;
    showName?: boolean;
    info?: {
        opClass?: Class;
        element?: Element;
        weapon?: WeaponType;
    };
    infoSecondary?: { opClass?: Class };
    // materials?: Materials;
    backgroundColor?: string;
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
    imgLoad?: "lazy" | "eager";
}

function InfoCard({
    name,
    displayName = name,
    id = displayName,
    type,
    rarity = 3,
    variant = "avatar",
    size = "128px",
    showName = variant !== "icon",
    info,
    infoSecondary,
    // materials,
    // backgroundColor,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = variant === "material-card",
    loading = false,
    imgLoad = "eager",
}: InfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${variant}-infoCard`;

    const borderWidth = variant !== "icon" ? theme.displayCard.borderWidth : 2;
    const borderRadius = variant === "icon" ? "4px" : "16px";
    const borderColor =
        variant === "icon"
            ? getRarityColor(rarity)
            : theme.border.color.primary;

    size = variant === "icon" ? "64px" : variant === "avatar" ? size : "96px";
    const imgSize =
        variant === "icon" ? `calc(${size} - ${borderWidth * 2}px)` : size;

    let scale = 1.1;
    let imgSrc = "",
        route;
    switch (type) {
        case "character":
            imgSrc = `characters/icons/${name}`;
            route = "operators";
            break;
        case "weapon":
            imgSrc = `weapons/${name}`;
            scale = variant === "avatar" ? 1.05 : 1;
            route = "weapons";
            break;
    }
    const href = !disableLink
        ? `/${route}/${name.split(" ").join("_").toLowerCase()}`
        : "";

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover &&
            zoomImageOnHover({
                direction,
                id: `${id}-img`,
                baseScale: scale,
                zoom: scale + 0.05,
            });
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: variant !== "material-card" ? size : "auto",
        height: variant !== "icon" ? "auto" : size,
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${theme.appbar.backgroundColor})`,
    };

    const cardStyle: SxProps = {
        borderStyle: "solid",
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        width:
            variant === "material-card" ? `calc(${imgSize} * 8 / 3)` : "auto",
        backgroundColor: getBackgroundColor(rarity),
        backgroundSize: "contain",
        backgroundRepeat: variant === "material-card" ? "repeat" : "no-repeat",
    };

    const imageStyle: CSSProperties = {
        width: imgSize,
        height: "100%",
        transform: `scale(${scale})`,
    };

    const infoIconStyle: CSSProperties = {
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: "28px",
        minHeight: "28px",
        padding: "4px",
    };

    return (
        <Card sx={rootStyle} elevation={2}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <StyledTooltip
                            title={!disableTooltip ? displayName : ""}
                            arrow
                            placement="top"
                        >
                            <Box
                                onMouseEnter={() => handleHover("enter")}
                                onMouseLeave={() => handleHover("leave")}
                                sx={imageContainerStyle}
                            >
                                <RouterLink to={href}>
                                    <Image
                                        src={imgSrc}
                                        alt={name}
                                        id={`${id}-img`}
                                        style={imageStyle}
                                        loading={imgLoad}
                                    />
                                </RouterLink>
                                {/* {variant === "material-card" && materials && (
                                    <MaterialGrid
                                        materials={materials}
                                        size={imgSize}
                                    />
                                )} */}
                            </Box>
                        </StyledTooltip>
                        {showName && (
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "8px",
                                    borderTop:
                                        variant === "icon"
                                            ? "none"
                                            : `calc(${imgSize} / 20) solid ${getRarityColor(
                                                  rarity
                                              )}`,
                                }}
                            >
                                <RouterLink to={href} sx={{ mx: "auto" }}>
                                    <TextStyled
                                        onMouseEnter={() =>
                                            handleHover("enter")
                                        }
                                        onMouseLeave={() =>
                                            handleHover("leave")
                                        }
                                        sx={{
                                            color: theme.appbar.color,
                                            textAlign: "center",
                                        }}
                                        variant={
                                            variant === "material-card"
                                                ? "body1-styled"
                                                : "body2-styled"
                                        }
                                    >
                                        {showName && displayName}
                                    </TextStyled>
                                </RouterLink>
                            </Box>
                        )}
                    </Card>
                    {info && (
                        <Stack
                            spacing={0.5}
                            alignItems="center"
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: "-4px",
                                left: "-12px",
                                backgroundColor: theme.appbar.backgroundColor,
                                borderRadius: "4px",
                                pt: "4px",
                            }}
                        >
                            {info.opClass !== undefined && (
                                <Image
                                    src={`classes/${info.opClass}`}
                                    alt={info.opClass}
                                    style={infoIconStyle}
                                    tooltip={info.opClass}
                                />
                            )}
                            {info.element !== undefined && (
                                <ElementIcon
                                    element={info.element}
                                    size="20px"
                                />
                            )}
                            {info.weapon !== undefined && (
                                <Image
                                    src={`weapons/icons/${info.weapon}`}
                                    alt={info.weapon}
                                    style={infoIconStyle}
                                    tooltip={info.weapon}
                                />
                            )}
                        </Stack>
                    )}
                    {infoSecondary && (
                        <Stack
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: "-2%",
                                right: "0",
                                backgroundColor: theme.appbar.backgroundColor,
                                borderRadius: "4px",
                            }}
                        >
                            {infoSecondary.opClass !== undefined && (
                                <Image
                                    src={`classes/${infoSecondary.opClass}`}
                                    alt={infoSecondary.opClass}
                                    style={infoIconStyle}
                                    tooltip={infoSecondary.opClass}
                                />
                            )}
                        </Stack>
                    )}
                </>
            ) : (
                <Skeleton
                    variant="rounded"
                    width={size}
                    height={size}
                    sx={{ borderRadius: borderRadius }}
                />
            )}
        </Card>
    );
}

export default InfoCard;
