import { useState } from "react";
import { useLocation } from "react-router";

// Component imports
import Search from "components/Search";
import Settings from "components/Settings";
import RouterLink from "./RouterLink";
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import Logo from "./Logo";

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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { NavProps, navStyles } from "./Nav";

function NavMobile({ navItems, linkItems }: NavProps) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const location = useLocation().pathname;
    const styles = navStyles(location);

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

    const [dropdownOpen, setDropdownOpen] = useState(true);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <ClickAwayListener onClickAway={handleMenuClose}>
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
                        }}
                    >
                        {navItems.map((item, index) => (
                            <Box key={index} sx={styles.listItem(item.link)}>
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
                        <Box onClick={toggleDropdownState} sx={{ px: "16px" }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <TextStyled sx={{ color: theme.appbar.color }}>
                                    Other Games
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
                                            transition: "transform 0.25s",
                                        }}
                                    />
                                </IconButton>
                            </Stack>
                            <Collapse in={dropdownOpen} timeout="auto">
                                <Stack
                                    sx={{
                                        mt: "16px",
                                        borderLeft: `1px solid ${theme.border.color.primary}`,
                                    }}
                                >
                                    {linkItems.map((item, index) => (
                                        <Box key={index} sx={{ px: "16px" }}>
                                            <ButtonBase
                                                href={item.link}
                                                sx={styles.listItemButton()}
                                            >
                                                <Image
                                                    src={item.icon}
                                                    alt={item.text}
                                                    style={styles.linkItem()}
                                                />
                                                <TextStyled
                                                    sx={styles.listItemText()}
                                                >
                                                    {item.text}
                                                </TextStyled>
                                            </ButtonBase>
                                        </Box>
                                    ))}
                                </Stack>
                            </Collapse>
                        </Box>
                        <Divider sx={{ mt: "16px", mx: "8px" }} />
                        <List>
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
        </ClickAwayListener>
    );
}

export default NavMobile;
