import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";

// Component imports
import RightHandDrawer from "custom/RightHandDrawer";
import Nav from "./nav/Nav";
import NavBottom from "./nav/NavBottom";
import { TextStyled } from "styled/StyledTypography";
import SEO from "./SEO";

// MUI imports
import { useTheme, Box, Paper } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWidth } from "reducers/settings";

function Layout() {
    const theme = useTheme();

    const width = useAppSelector(selectWidth);

    const location = useLocation().pathname;
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <SEO />
            <Box id="back-to-top-anchor" />
            <Box sx={{ display: "flex" }}>
                <Nav />
                <Box sx={{ minWidth: "0vw", width: "100vw" }}>
                    <Paper
                        sx={{
                            p: 2,
                            mt: { xs: "56px", sm: "64px" },
                            backgroundColor: theme.palette.error.dark,
                            borderRadius: 0,
                        }}
                        elevation={0}
                    >
                        <TextStyled
                            sx={{
                                color: theme.appbar.color,
                                textAlign: "center",
                            }}
                        >
                            Arknights: Endfield is currently in beta, so all
                            information is heavily subject to change and will
                            usually be incomplete and/or inaccurate.
                        </TextStyled>
                    </Paper>
                    <Box
                        sx={{
                            px: "24px",
                            pt: "16px",
                            pb: "48px",
                            // mt: "64px",
                            minHeight: "100vh",
                            width: {
                                xs: "100%",
                                lg: width === "standard" ? "75%" : "100%",
                            },
                            mx: "auto",
                        }}
                    >
                        <Outlet />
                    </Box>
                    <NavBottom />
                </Box>
                <RightHandDrawer />
            </Box>
        </>
    );
}

export default Layout;
