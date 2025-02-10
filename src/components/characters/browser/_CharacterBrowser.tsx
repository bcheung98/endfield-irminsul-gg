import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";

// Component imports
import CharacterFilters from "./CharacterFilters";
import CharacterTable from "./CharacterTable";
import InfoCard from "custom/InfoCard";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import SearchBar from "custom/SearchBar";
import ActionFab from "custom/ActionFab";
import { TextStyled } from "styled/StyledTypography";
import SEO from "components/SEO";

// MUI imports
import { useTheme, useMediaQuery, Button, Drawer } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
// import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { filterCharacters } from "helpers/filterCharacters";
import { selectCharacters } from "reducers/character";
import {
    clearFilters,
    selectCharacterFilters,
} from "reducers/characterFilters";
import { isRightDrawerOpen, toggleRightDrawer } from "reducers/layout";

function CharacterBrowser() {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );
    const filters = useAppSelector(selectCharacterFilters);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentCharacters = useMemo(
        () => filterCharacters(characters, filters, searchValue),
        [characters, filters, searchValue]
    );

    const drawerOpen = useAppSelector(isRightDrawerOpen);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleDrawerState = () => {
        dispatch(toggleRightDrawer());
    };
    const handleMobileDrawerOpen = () => {
        setMobileDrawerOpen(true);
    };
    const handleMobileDrawerClose = () => {
        setMobileDrawerOpen(false);
    };

    type View = "icon" | "card" | "table";
    const [view, setView] = useState<View>("icon");
    const handleView = (_: BaseSyntheticEvent, newView: View) => {
        if (newView !== null) {
            setView(newView);
        }
    };
    const buttons: CustomToggleButtonProps[] = [
        {
            value: "icon",
            icon: <ViewCompactIcon />,
        },
        // {
        //     value: "card",
        //     icon: <ViewModuleIcon />,
        // },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

    useEffect(() => {
        dispatch(clearFilters());
    }, []);

    useEffect(() => {
        dispatch(toggleRightDrawer(matches_md_up));
    }, [matches_md_up]);

    return (
        <>
            <SEO
                title="Operators"
                description="A list of all Arknights: Endfield Operators"
            />
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5-styled" sx={{ lineHeight: "36px" }}>
                        Operators
                    </TextStyled>
                </Grid>
                <Grid size={{ xs: 6, sm: "auto" }}>
                    <ToggleButtons
                        color="primary"
                        buttons={buttons}
                        value={view}
                        exclusive
                        onChange={handleView}
                        highlightOnHover={false}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <Button
                        onClick={
                            matches_md_up
                                ? toggleDrawerState
                                : handleMobileDrawerOpen
                        }
                        variant="contained"
                        color="primary"
                        disableElevation
                        disableRipple
                        startIcon={
                            matches_md_up && drawerOpen ? (
                                <KeyboardArrowRightIcon />
                            ) : (
                                <TuneIcon />
                            )
                        }
                        sx={{ height: "36px" }}
                    >
                        Filters
                    </Button>
                </Grid>
            </Grid>
            {view === "icon" && (
                <Grid container spacing={3}>
                    {currentCharacters.map((char) => (
                        <InfoCard
                            key={char.id}
                            id={`${char.name}-characterBrowser`}
                            name={char.name}
                            displayName={char.fullName}
                            type="character"
                            rarity={char.rarity}
                            info={{
                                element: char.element,
                                weapon: char.weapon,
                            }}
                            infoSecondary={{
                                opClass: char.opClass,
                            }}
                            backgroundColor={theme.background(1)}
                        />
                    ))}
                </Grid>
            )}
            {/* {view === "card" && (
                <Grid container spacing={3}>
                    {currentCharacters.map((char) => (
                        <InfoCard
                            key={char.id}
                            variant="material-card"
                            id={`${char.name}-characterBrowser`}
                            name={char.name}
                            displayName={char.fullName}
                            type="character"
                            rarity={char.rarity}
                            info={{
                                element: char.element,
                                weapon: char.weapon,
                            }}
                            materials={char.materials}
                        />
                    ))}
                </Grid>
            )} */}
            {view === "table" && (
                <CharacterTable characters={currentCharacters} />
            )}
            <ActionFab
                action={
                    matches_md_up ? toggleDrawerState : handleMobileDrawerOpen
                }
                icon={<TuneIcon />}
                tooltip="Open filters"
                tooltipArrow="left"
            />
            {!matches_md_up && (
                <Drawer
                    sx={theme.styles.drawer(matches_sm_up)}
                    variant="temporary"
                    anchor={matches_sm_up ? "right" : "bottom"}
                    open={mobileDrawerOpen}
                    onClose={handleMobileDrawerClose}
                >
                    <CharacterFilters handleClose={handleMobileDrawerClose} />
                </Drawer>
            )}
        </>
    );
}

export default CharacterBrowser;
