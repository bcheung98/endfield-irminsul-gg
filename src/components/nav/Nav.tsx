import { CSSProperties, useEffect, useState } from "react";

// Component imports
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

// Helper imports
import { NavItem, navItems, otherItems } from "./NavItems";

// MUI imports
import { useTheme, useMediaQuery, Theme, SxProps } from "@mui/material";

export interface Website {
    title: string;
    tag: string;
    enabled: boolean;
}

export interface NavProps {
    navItems: NavItem[];
    linkItems: NavItem[];
    otherItems: NavItem[];
}

function Nav() {
    const theme = useTheme();
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const [websites, setWebsites] = useState<Website[]>([]);
    useEffect(() => {
        fetch("https://api.irminsul.gg/main/websites.json")
            .then((response) => response.json())
            .then((data) => {
                setWebsites(data);
            })
            .catch((error) => console.error(error));
    }, []);

    let linkItems: NavItem[] = [];

    websites.forEach(
        (site) =>
            site.enabled &&
            linkItems.push({
                icon: `https://assets.irminsul.gg/main/game-icons/${site.tag}.png`,
                text: site.title,
                link: `https://${site.tag.toLowerCase()}.irminsul.gg/`,
                tag: site.tag,
            })
    );
    linkItems = linkItems.sort((a, b) => a.text.localeCompare(b.text));

    if (linkItems.length > 0) {
        const index = linkItems.findIndex(
            (site) => site.tag === import.meta.env.VITE_GAME_TAG
        );
        linkItems.unshift(linkItems.splice(index, 1)[0]);
    }

    const items = {
        navItems: navItems,
        linkItems: linkItems,
        otherItems: otherItems,
    };

    return (
        <>
            {matches_up_md ? (
                <NavDesktop {...items} />
            ) : (
                <NavMobile {...items} />
            )}
        </>
    );
}

export default Nav;

export const navStyles = (location: string) => ({
    navItem: (size = 32): CSSProperties => ({
        width: size,
        height: "auto",
        padding: "2px",
        color: "rgb(255, 255, 255)",
    }),
    linkItem: (size = 32): CSSProperties => ({
        width: size,
        height: size,
        borderRadius: "4px",
    }),
    listItem:
        (link: string, size = 32): SxProps<Theme> =>
        () => ({
            display: link !== "" ? "block" : "none",
            px: `${(size * 2) / 8}px`,
            color: "white",
        }),
    listIcon:
        (open: boolean, size = 32): SxProps<Theme> =>
        () => ({
            minWidth: size,
            width: size,
            height: size,
            p: "4px",
            transform: open ? "rotateZ(-180deg)" : "rotateZ(0deg)",
            transition: "transform 0.25s",
        }),
    listItemButton:
        (link = "", size = 32): SxProps<Theme> =>
        (theme) => ({
            borderRadius: "4px",
            justifyContent: "left",
            px: `${(size * 2) / 8}px`,
            width: "100%",
            height: `${size * 1.5}px`,
            color: theme.appbar.color,
            backgroundColor:
                link === location
                    ? theme.appbar.hover
                    : theme.appbar.backgroundColor,
            "&:hover": {
                backgroundColor:
                    link === location
                        ? theme.appbar.selectedHover
                        : theme.appbar.hover,
            },
            "&:active": {
                backgroundColor: theme.appbar.selectedHover,
            },
        }),
    listItemButtonExtra:
        (color = "", size = 32): SxProps<Theme> =>
        (theme) => ({
            borderRadius: "4px",
            justifyContent: "left",
            px: `${(size * 2) / 8}px`,
            width: "100%",
            height: `${size * 1.25}px`,
            color: theme.appbar.color,
            backgroundColor: color || "transparent",
        }),
    listItemText:
        (open = true, link = ""): SxProps<Theme> =>
        (theme) => ({
            display: open ? "block" : "none",
            ml: "20px",
            color: link === location ? theme.text.selected : theme.appbar.color,
            textShadow:
                link === location
                    ? `${theme.text.selected} 1px 1px 16px`
                    : "none",
        }),
    navBarItem: (): SxProps<Theme> => (theme) => ({
        color: theme.appbar.color,
        transition: "color 0.25s",
        "&:hover": {
            color: theme.text.selected,
            textShadow: ` ${theme.text.selected} 1px 1px 8px`,
        },
    }),
    menuItem: (): SxProps<Theme> => (theme) => ({
        "&.MuiMenuItem-root": {
            color: theme.text.primary,
            "&:hover": {
                backgroundColor: theme.menu.hover,
                color: theme.text.selected,
                textShadow: `${theme.text.selected} 1px 1px 16px`,
            },
            "&.Mui-focusVisible, &.Mui-selected": {
                backgroundColor: theme.menu.hover,
                color: theme.text.selected,
                textShadow: `${theme.text.selected} 1px 1px 16px`,
                "&:hover": {
                    backgroundColor: theme.menu.hover,
                },
            },
        },
    }),
});
