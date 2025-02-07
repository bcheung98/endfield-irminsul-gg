import { useLocation } from "react-router";

// Component imports
import CharacterFilters from "components/characters/browser/CharacterFilters";
// import WeaponFilters from "components/weapons/browser/WeaponFilters";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    styled,
    CSSObject,
    Theme,
    Drawer as MuiDrawer,
    Toolbar,
} from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { isRightDrawerOpen, toggleRightDrawer } from "reducers/layout";

const width = 320; // px

function RightHandDrawer() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();
    const open = useAppSelector(isRightDrawerOpen);

    const handleDrawerClose = () => {
        dispatch(toggleRightDrawer(false));
    };

    const location = useLocation().pathname;
    const isOpen =
        ["/operators/", "/weapons/"].includes(location) && matches_md_up;

    let component: React.ReactNode;
    switch (location) {
        case "/operators/":
            component = <CharacterFilters handleClose={handleDrawerClose} />;
            break;
        case "/weapons/":
            // component = <WeaponFilters handleClose={handleDrawerClose} />;
            component = null;
            break;
        default:
            component = null;
            break;
    }

    return (
        <>
            {matches_md_up ? (
                <Drawer
                    variant="permanent"
                    anchor="right"
                    open={open}
                    onClose={handleDrawerClose}
                    sx={{
                        display: isOpen ? "block" : "none",
                        width: open ? width : 0,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: open ? width : 0,
                            borderLeft: `1px solid ${theme.border.color.primary}`,
                            backgroundColor: theme.appbar.backgroundColor,
                            pb: 2.5,
                            scrollbarWidth: "none",
                        },
                    }}
                >
                    {/* 
                    Empty toolbars necessary on desktop for content to be below the app bar
                    */}
                    {matches_md_up && <Toolbar />}
                    {component}
                    {matches_md_up && <Toolbar />}
                </Drawer>
            ) : null}
        </>
    );
}

export default RightHandDrawer;

const openedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: width,
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: width,
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: width,
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
