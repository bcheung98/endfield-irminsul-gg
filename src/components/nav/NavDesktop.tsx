import { useState } from "react";
import { useLocation } from "react-router";

// Component imports
import Logo from "./Logo";
import Search from "components/Search";
import Settings from "components/Settings";
import Image from "custom/Image";
import RouterLink from "./RouterLink";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import {
    styled,
    useTheme,
    useMediaQuery,
    useScrollTrigger,
    alpha,
    getContrastRatio,
    Theme,
    CSSObject,
    SxProps,
    Toolbar,
    Box,
    Button,
    IconButton,
    ButtonBase,
    List,
    Divider,
    Collapse,
    Fade,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ExpandMore from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Helper imports
import { NavProps, navStyles } from "./Nav";

const drawerWidth = 240; // px
const iconSize = 32; // px

function NavDesktop({ navItems, linkItems }: NavProps) {
    const theme = useTheme();
    const matches_lg_up = useMediaQuery(theme.breakpoints.up("lg"));

    const location = useLocation().pathname;
    const styles = navStyles(location);

    const [drawerOpen, setDrawerOpen] = useState(matches_lg_up);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const menuButtonStyle: SxProps = {
        borderRadius: "4px",
        px: "2px",
        width: "36px",
        height: "36px",
        color: "white",
        "&:hover": {
            backgroundColor: theme.appbar.hover,
        },
    };

    const menuIconStyle: SxProps = {
        minWidth: "32px",
        width: "32px",
        height: "32px",
        padding: "4px",
        transform: drawerOpen ? "rotateY(0deg)" : "rotateY(180deg)",
        transition: "transform 0.25s",
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: alpha(theme.appbar.backgroundColor, 0.88),
                    backdropFilter: "blur(8px)",
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        pr: "32px",
                        justifyContent: "space-between",
                    }}
                >
                    <FlexBox>
                        <Box sx={{ width: "64px", px: "14px" }}>
                            <IconButton
                                onClick={toggleDrawerState}
                                disableRipple
                                disableTouchRipple
                                sx={menuButtonStyle}
                            >
                                <MenuOpenIcon sx={menuIconStyle} />
                            </IconButton>
                        </Box>
                        <Logo
                            href={
                                location === "/" ? "https://irminsul.gg/" : "/"
                            }
                        />
                    </FlexBox>
                    <FlexBox columnGap="32px">
                        <ScrollTopDesktop>
                            <Button
                                variant="contained"
                                startIcon={<KeyboardArrowUpIcon />}
                                sx={{
                                    height: "32px",
                                    backgroundColor: theme.palette.info.dark,
                                    color:
                                        getContrastRatio(
                                            theme.palette.info.dark,
                                            theme.text.primary
                                        ) > 4.5
                                            ? theme.text.primary
                                            : theme.text.contrast,
                                }}
                            >
                                Back to Top
                            </Button>
                        </ScrollTopDesktop>
                        <Search />
                        <Settings />
                    </FlexBox>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={drawerOpen}
                sx={{
                    boxSizing: "content-box",
                    [`& .MuiDrawer-paper`]: {
                        borderRight: `1px solid ${theme.border.color.primary}`,
                        backgroundColor: theme.appbar.backgroundColor,
                    },
                }}
            >
                {/* Empty toolbar necessary for content to be below app bar */}
                <Toolbar />
                <List>
                    {navItems.map((item, index) => (
                        <Box key={index} sx={styles.listItem(item.link)}>
                            <StyledTooltip
                                title={!drawerOpen ? item.text : null}
                                arrow
                                placement="right"
                            >
                                <RouterLink
                                    to={item.link}
                                    sx={styles.listItemButton(item.link)}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.text}
                                        style={styles.navItem()}
                                    />
                                    <TextStyled
                                        sx={styles.listItemText(
                                            drawerOpen,
                                            item.link
                                        )}
                                    >
                                        {item.text}
                                    </TextStyled>
                                </RouterLink>
                            </StyledTooltip>
                        </Box>
                    ))}
                </List>
                <Divider variant="middle" />
                <List>
                    <Box sx={styles.listItem("_")}>
                        <StyledTooltip
                            title={!drawerOpen ? "Other Games" : null}
                            arrow
                            placement="right"
                        >
                            <IconButton
                                onClick={toggleDropdownState}
                                disableRipple
                                disableTouchRipple
                                sx={styles.listItemButton()}
                            >
                                <ExpandMore
                                    sx={styles.listIcon(dropdownOpen)}
                                />
                                <TextStyled
                                    sx={styles.listItemText(drawerOpen)}
                                >
                                    Other Games
                                </TextStyled>
                            </IconButton>
                        </StyledTooltip>
                    </Box>
                    <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                        {linkItems.map((item, index) => (
                            <Box key={index} sx={styles.listItem(item.link)}>
                                <StyledTooltip
                                    title={!drawerOpen ? item.text : null}
                                    arrow
                                    placement="right"
                                >
                                    <ButtonBase
                                        href={item.link}
                                        disableRipple
                                        disableTouchRipple
                                        sx={styles.listItemButton()}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.text}
                                            style={styles.linkItem()}
                                        />
                                        <TextStyled
                                            sx={styles.listItemText(drawerOpen)}
                                        >
                                            {item.text}
                                        </TextStyled>
                                    </ButtonBase>
                                </StyledTooltip>
                            </Box>
                        ))}
                    </Collapse>
                </List>
                <Divider variant="middle" />
                <List>
                    <Box sx={styles.listItem("_")}>
                        <StyledTooltip
                            title={!drawerOpen ? "Buy me a Ko-Fi" : null}
                            arrow
                            placement="right"
                        >
                            <ButtonBase
                                href="https://ko-fi.com/bcheung"
                                target="_blank"
                                rel="noopener"
                                disableRipple
                                disableTouchRipple
                                sx={styles.listItemButton()}
                            >
                                <Image
                                    src="https://storage.ko-fi.com/cdn/brandasset/v2/kofi_symbol.png"
                                    alt="Ko-Fi"
                                    style={styles.navItem()}
                                />
                                <TextStyled
                                    sx={styles.listItemText(drawerOpen)}
                                >
                                    Buy me a Ko-Fi
                                </TextStyled>
                            </ButtonBase>
                        </StyledTooltip>
                    </Box>
                </List>
                <Toolbar />
            </Drawer>
        </>
    );
}

export default NavDesktop;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `${iconSize * 2}px`,
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme),
            },
        },
    ],
}));

function ScrollTopDesktop({ children }: { children: React.ReactNode }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box onClick={handleClick}>{children}</Box>
        </Fade>
    );
}
