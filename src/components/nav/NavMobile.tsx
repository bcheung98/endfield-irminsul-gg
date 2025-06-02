import { useState } from "react";
import { useLocation } from "react-router";

// Component imports
import Search from "components/Search";
import Settings from "components/Settings";
import RouterLink from "./RouterLink";
import Image from "custom/Image";
import DiscordPopup from "./DiscordPopup";
import Logo from "./Logo";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    AppBar,
    Toolbar,
    IconButton,
    Box,
    List,
    ButtonBase,
    Divider,
    Stack,
    ClickAwayListener,
    Collapse,
    Dialog,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { NavProps, navStyles } from "./Nav";

function NavMobile({ navItems, linkItems, otherItems }: NavProps) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const location = useLocation().pathname;
    const styles = navStyles(location);

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenuState = () => {
        setMenuOpen(!menuOpen);
    };
    const handleMenuClose = () => {
        setMenuOpen(false);
    };
    const handleMenuKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <ClickAwayListener onClickAway={handleMenuClose}>
            <>
                <AppBar
                    position="fixed"
                    onKeyDown={handleMenuKeyDown}
                    sx={{ containerType: "inline-size" }}
                >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Box>
                            <Logo
                                href={
                                    menuOpen || location === "/"
                                        ? "https://irminsul.gg/"
                                        : "/"
                                }
                                size={matches_up_sm ? "48px" : "40px"}
                            />
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Search />
                            <Settings />
                            <IconButton
                                onClick={toggleMenuState}
                                disableRipple
                                disableTouchRipple
                                sx={{
                                    color: theme.appbar.color,
                                    borderRadius: "8px",
                                    px: "2px",
                                    width: "36px",
                                    height: "36px",
                                    "&:hover": {
                                        backgroundColor: theme.appbar.hover,
                                    },
                                }}
                            >
                                {!menuOpen ? <MenuIcon /> : <CloseIcon />}
                            </IconButton>
                        </Stack>
                    </Toolbar>
                    <Collapse
                        in={menuOpen}
                        timeout="auto"
                        sx={{
                            borderTop: `1px solid ${theme.appbar.hover}`,
                        }}
                    >
                        <List
                            sx={{
                                p: 1,
                                maxHeight: "85vh",
                                overflowY: "auto",
                                scrollbarWidth: "none",
                            }}
                        >
                            {navItems.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={styles.listItem(item.link)}
                                >
                                    <RouterLink
                                        to={item.link}
                                        sx={styles.listItemButton(item.link)}
                                        onClick={toggleMenuState}
                                    >
                                        <Image
                                            src={item.icon}
                                            alt={item.text}
                                            style={styles.navItem()}
                                        />
                                        <TextStyled
                                            sx={styles.listItemText(
                                                true,
                                                item.link
                                            )}
                                        >
                                            {item.text}
                                        </TextStyled>
                                    </RouterLink>
                                </Box>
                            ))}
                            <Divider sx={{ my: "16px", mx: "8px" }} />
                            <Stack spacing={1}>
                                <Box
                                    onClick={toggleDropdownState}
                                    sx={{ px: "16px" }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <TextStyled
                                            sx={{ color: theme.appbar.color }}
                                        >
                                            Games
                                        </TextStyled>
                                        <IconButton
                                            disableRipple
                                            disableTouchRipple
                                            sx={{
                                                color: theme.appbar.color,
                                                p: 0,
                                            }}
                                        >
                                            <ExpandMoreIcon
                                                sx={{
                                                    color: theme.text.selected,
                                                    transform: dropdownOpen
                                                        ? "rotateZ(-180deg)"
                                                        : "rotateZ(0deg)",
                                                    transition:
                                                        "transform 0.25s",
                                                }}
                                            />
                                        </IconButton>
                                    </Stack>
                                    <Collapse in={dropdownOpen} timeout="auto">
                                        <Stack
                                            sx={{
                                                mt: "8px",
                                                borderLeft: `1px solid ${theme.border.color.primary}`,
                                            }}
                                        >
                                            {linkItems.map((item, index) => (
                                                <Box
                                                    key={index}
                                                    sx={{ px: "16px" }}
                                                >
                                                    <ButtonBase
                                                        href={item.link}
                                                        sx={styles.listItemButton(
                                                            import.meta.env
                                                                .VITE_GAME_TAG ===
                                                                item.tag
                                                                ? location
                                                                : "_"
                                                        )}
                                                    >
                                                        <Image
                                                            src={item.icon}
                                                            alt={item.text}
                                                            style={styles.linkItem()}
                                                        />
                                                        <TextStyled
                                                            sx={styles.listItemText(
                                                                true,
                                                                import.meta.env
                                                                    .VITE_GAME_TAG ===
                                                                    item.tag
                                                                    ? location
                                                                    : "_"
                                                            )}
                                                        >
                                                            {item.text}
                                                        </TextStyled>
                                                    </ButtonBase>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Collapse>
                                </Box>
                                <Stack spacing={1} sx={{ px: "8px" }}>
                                    {otherItems.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={styles.listItem(item.link)}
                                        >
                                            <RouterLink
                                                key={index}
                                                to={item.link}
                                                openInNewTab
                                            >
                                                <TextStyled
                                                    sx={{ color: "inherit" }}
                                                >
                                                    {item.text}
                                                </TextStyled>
                                            </RouterLink>
                                        </Box>
                                    ))}
                                </Stack>
                            </Stack>
                            <Divider sx={{ mt: "16px", mx: "8px" }} />
                            <List>
                                <Box sx={styles.listItem("_")}>
                                    <ButtonBase
                                        onClick={handleDialogOpen}
                                        sx={styles.listItemButton("")}
                                    >
                                        <Image
                                            src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg"
                                            alt="Discord"
                                            style={styles.navItem()}
                                        />
                                        <TextStyled
                                            sx={styles.listItemText(true, "_")}
                                        >
                                            Discord
                                        </TextStyled>
                                    </ButtonBase>
                                </Box>
                                <Box sx={styles.listItem("_")}>
                                    <ButtonBase
                                        href="https://ko-fi.com/bcheung"
                                        target="_blank"
                                        rel="noopener"
                                        sx={styles.listItemButton("")}
                                    >
                                        <Image
                                            src="https://storage.ko-fi.com/cdn/brandasset/v2/kofi_symbol.png"
                                            alt="Ko-Fi"
                                            style={styles.navItem()}
                                        />
                                        <TextStyled
                                            sx={styles.listItemText(true, "_")}
                                        >
                                            Buy me a Ko-Fi
                                        </TextStyled>
                                    </ButtonBase>
                                </Box>
                            </List>
                        </List>
                    </Collapse>
                </AppBar>
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
        </ClickAwayListener>
    );
}

export default NavMobile;
