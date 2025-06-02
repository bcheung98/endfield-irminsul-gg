import { useState } from "react";
import { useLocation } from "react-router";

// Component imports
import Logo from "./Logo";
import Search from "components/Search";
import Settings from "components/Settings";
import Image from "custom/Image";
import RouterLink from "./RouterLink";
import DiscordPopup from "./DiscordPopup";
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
    Menu,
    MenuItem,
    Fade,
    Dialog,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Helper imports
import { NavProps, navStyles } from "./Nav";

const drawerWidth = 240; // px
const iconSize = 32; // px

function NavDesktop({ navItems, linkItems, otherItems }: NavProps) {
    const theme = useTheme();
    const matches_lg_up = useMediaQuery(theme.breakpoints.up("lg"));

    const location = useLocation().pathname;
    const styles = navStyles(location);

    const [drawerOpen, setDrawerOpen] = useState(matches_lg_up);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
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

    const scrollTopStyle: SxProps = {
        width: { xs: "32px", lg: "auto" },
        height: "32px",
        borderRadius: "4px",
        backgroundColor: theme.palette.info.dark,
        color:
            getContrastRatio(theme.palette.info.dark, theme.text.primary) > 4.5
                ? theme.text.primary
                : theme.text.contrast,
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
                    <FlexBox columnGap={matches_lg_up ? "48px" : "16px"}>
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
                            <Logo href="https://irminsul.gg/" />
                        </FlexBox>
                        <FlexBox columnGap={matches_lg_up ? "8px" : "4px"}>
                            <Button
                                disableRipple
                                disableTouchRipple
                                onClick={handleMenuOpen}
                                variant="text"
                                sx={styles.navBarItem()}
                                endIcon={
                                    <KeyboardArrowDownIcon
                                        sx={{
                                            transform: open
                                                ? "rotateZ(-180deg)"
                                                : "rotateZ(0deg)",
                                            transition: "transform 0.25s",
                                        }}
                                    />
                                }
                            >
                                <TextStyled
                                    variant="subtitle1-styled"
                                    sx={{ color: "inherit" }}
                                >
                                    Games
                                </TextStyled>
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                disableScrollLock
                                sx={{
                                    "& .MuiMenu-paper": {
                                        border: `1px solid ${theme.appbar.hover}`,
                                        borderRadius: "16px",
                                    },
                                    "& .MuiMenu-list": {
                                        backgroundColor: theme.background(
                                            2,
                                            "light"
                                        ),
                                    },
                                }}
                            >
                                {linkItems.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        disableRipple
                                        sx={styles.menuItem()}
                                        selected={
                                            import.meta.env.VITE_GAME_TAG ===
                                            item.tag
                                        }
                                    >
                                        <ButtonBase
                                            href={item.link}
                                            disableRipple
                                            disableTouchRipple
                                            sx={{ gap: "16px" }}
                                        >
                                            <Image
                                                src={item.icon}
                                                alt={item.text}
                                                style={{
                                                    width: "32px",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                            <TextStyled
                                                variant="subtitle1-styled"
                                                sx={{ color: "inherit" }}
                                            >
                                                {item.text}
                                            </TextStyled>
                                        </ButtonBase>
                                    </MenuItem>
                                ))}
                            </Menu>
                            {otherItems.map((item, index) => (
                                <RouterLink
                                    key={index}
                                    to={item.link}
                                    openInNewTab
                                >
                                    <Button
                                        variant="text"
                                        disableRipple
                                        disableTouchRipple
                                        sx={styles.navBarItem()}
                                    >
                                        <TextStyled
                                            variant="subtitle1-styled"
                                            sx={{ color: "inherit" }}
                                        >
                                            {item.text}
                                        </TextStyled>
                                    </Button>
                                </RouterLink>
                            ))}
                        </FlexBox>
                    </FlexBox>
                    <FlexBox columnGap={matches_lg_up ? "32px" : "16px"}>
                        <ScrollTopDesktop>
                            {matches_lg_up ? (
                                <Button
                                    variant="contained"
                                    startIcon={<KeyboardArrowUpIcon />}
                                    sx={scrollTopStyle}
                                >
                                    Back to Top
                                </Button>
                            ) : (
                                <IconButton sx={scrollTopStyle}>
                                    <KeyboardArrowUpIcon />
                                </IconButton>
                            )}
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
                            title={!drawerOpen ? "Discord" : null}
                            arrow
                            placement="right"
                        >
                            <ButtonBase
                                onClick={handleDialogOpen}
                                disableRipple
                                disableTouchRipple
                                sx={styles.listItemButtonExtra("#115293")}
                            >
                                <Image
                                    src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg"
                                    alt="Discord"
                                    style={styles.navItem()}
                                />
                                <TextStyled
                                    sx={styles.listItemText(drawerOpen)}
                                >
                                    Discord
                                </TextStyled>
                            </ButtonBase>
                        </StyledTooltip>
                    </Box>
                    <Box sx={{ my: "8px" }} />
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
                                sx={styles.listItemButtonExtra("#1A6499")}
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
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
                disableScrollLock
            >
                <DiscordPopup handleClose={handleDialogClose} />
            </Dialog>
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
