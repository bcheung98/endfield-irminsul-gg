// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useScrollTrigger,
    Fab,
    Fade,
    Box,
    FabProps,
    TooltipProps,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { StyledTooltip } from "styled/StyledTooltip";

interface ActionFabProps {
    action?: (args: any) => void;
    hysteresis?: boolean;
    threshold?: number;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    tooltip?: string;
    tooltipArrow?: TooltipProps["placement"];
    color?: FabProps["color"];
    position?: {
        top?: string | number;
        right?: string | number;
        bottom?: string | number;
        left?: string | number;
    };
}

function ActionFab({
    action,
    hysteresis = false,
    threshold = 100,
    icon,
    label,
    tooltip = "",
    tooltipArrow = "top",
    color = "primary",
    position = {
        top: 90,
        right: 20,
    },
}: ActionFabProps) {
    const trigger = useScrollTrigger({
        disableHysteresis: !hysteresis,
        threshold: threshold,
    });

    return (
        <Fade in={trigger}>
            <Box onClick={action} sx={[{ position: "fixed" }, { ...position }]}>
                <StyledTooltip title={tooltip} arrow placement={tooltipArrow}>
                    <Fab
                        color={color}
                        size="small"
                        disableRipple
                        sx={{
                            width: "100%",
                            p: 1,
                            borderRadius: "4px",
                            color: "white",
                        }}
                    >
                        {icon || <KeyboardArrowLeftIcon />}
                        {label && (
                            <TextStyled
                                variant="body2-styled"
                                sx={{ ml: "4px" }}
                            >
                                {label}
                            </TextStyled>
                        )}
                    </Fab>
                </StyledTooltip>
            </Box>
        </Fade>
    );
}

export default ActionFab;
