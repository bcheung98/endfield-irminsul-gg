import { CSSProperties, useState } from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, ButtonBase, Collapse, Box } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Image from "./Image";
import { combineStyles } from "helpers/utils";

interface DropdownProps {
    children?: React.ReactNode;
    title?: string;
    titleColor?: string;
    img?: string;
    imgStyle?: CSSProperties;
    iconColor?: string;
    contentPadding?: string | number;
    unmountOnExit?: boolean;
}

function Dropdown({
    children,
    title = "",
    titleColor,
    img,
    imgStyle,
    iconColor,
    contentPadding = "4px 24px",
    unmountOnExit = false,
}: DropdownProps) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const toggleDropdownState = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ mb: "8px" }}>
            <ButtonBase
                onClick={toggleDropdownState}
                disableRipple
                disableTouchRipple
                sx={{
                    maxWidth: "100%",
                    pl: 0,
                    mb: "4px",
                    justifyContent: "left",
                }}
            >
                <ExpandMore
                    sx={{
                        mr: "4px",
                        color: iconColor || theme.border.color.primary,
                        transform: open ? "rotateZ(0deg)" : "rotateZ(-90deg)",
                        transition: "transform 0.25s",
                    }}
                />
                {img && (
                    <Image
                        src={img}
                        style={combineStyles(
                            {
                                width: "32px",
                                height: "32px",
                                marginRight: "8px",
                            },
                            imgStyle
                        )}
                    />
                )}
                <TextStyled
                    sx={{ color: titleColor || theme.text.primary }}
                    noWrap
                >
                    {title}
                </TextStyled>
            </ButtonBase>
            <Collapse in={open} timeout="auto" unmountOnExit={unmountOnExit}>
                <Box sx={{ p: { xs: "8px 0", md: contentPadding } }}>
                    {children}
                </Box>
            </Collapse>
        </Box>
    );
}

export default Dropdown;
