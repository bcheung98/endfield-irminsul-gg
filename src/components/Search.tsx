import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { matchSorter } from "match-sorter";

// Component imports
import MainContentBox from "custom/MainContentBox";
import SearchBar from "custom/SearchBar";
import Image from "custom/Image";
import RouterLink from "./nav/RouterLink";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledMenuItem } from "styled/StyledMenu";
import { StyledTooltip } from "styled/StyledTooltip";
import { Virtuoso } from "react-virtuoso";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Button,
    Dialog,
    Box,
    IconButton,
    Stack,
    MenuList,
    Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

type Category = "Operators" | "Weapons";

interface Data {
    name: string;
    displayName: string;
    category: Category;
}

function Search() {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const navigate = useNavigate();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );

    const data: Data[] = [
        ...characters.map((char) => ({
            name: char.name,
            displayName: char.fullName,
            category: "Operators" as Category,
        })),
    ];

    const storedPinnedSearches =
        localStorage.getItem("search/pinned") || "null";
    const [pinnedSearches, setPinnedSearches] = useState<Data[]>(
        storedPinnedSearches !== "null" ? JSON.parse(storedPinnedSearches) : []
    );

    const storedRecentSearches =
        localStorage.getItem("search/recent") || "null";
    const [recentSearches, setRecentSearches] = useState<Data[]>(
        storedRecentSearches !== "null" ? JSON.parse(storedRecentSearches) : []
    );

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => {
        setFocus(-1);
        setSearchValue("");
        setSearchOpen(true);
    };
    const handleSearchClose = () => setSearchOpen(false);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setFocus(-1);
        setSearchValue(event.target.value);
    };

    const handleSelect = (option: Data, keyPress = false) => {
        setSearchOpen(false);
        const draft = [...recentSearches];
        if (!JSON.stringify(pinnedSearches).includes(JSON.stringify(option))) {
            if (
                JSON.stringify(recentSearches).includes(JSON.stringify(option))
            ) {
                const index = draft.findIndex(
                    (data) => data.name === option.name
                );
                draft.splice(index, 1);
            }
            draft.unshift(option);
            if (draft.length > 10) {
                draft.pop();
            }
        }
        if (keyPress) {
            navigate(getURL(option));
        }
        setRecentSearches(draft);
        window.location.reload(); // Prevents hook render error
        window.scrollTo(0, 0);
    };

    const removeRecentSearch = (option?: Data) => () => {
        if (option) {
            const draft = [...recentSearches];
            const index = draft.findIndex(
                (data) =>
                    `${data.name} ${data.category}` ===
                    `${option.name} ${option.category}`
            );
            draft.splice(index, 1);
            setRecentSearches(draft);
        } else {
            setRecentSearches([]);
        }
    };

    const addPinnedSearch = (option: Data) => () => {
        const draftPinned = [...pinnedSearches];
        draftPinned.unshift(option);
        setPinnedSearches(draftPinned);

        const draftRecent = [...recentSearches];
        const index = draftRecent.findIndex(
            (data) => data.name === option.name
        );
        draftRecent.splice(index, 1);
        setRecentSearches(draftRecent);
    };

    const removePinnedSearch = (option: Data) => () => {
        const draft = [...pinnedSearches];
        const index = draft.findIndex(
            (data) =>
                `${data.name} ${data.category}` ===
                `${option.name} ${option.category}`
        );
        draft.splice(index, 1);
        setPinnedSearches(draft);
    };

    const hits = useMemo(
        () => filterOptions(data, searchValue),
        [data, searchValue]
    );

    const history = useMemo(
        () => [...pinnedSearches, ...recentSearches],
        [pinnedSearches, recentSearches]
    );

    useEffect(() => {
        localStorage.setItem("search/pinned", JSON.stringify(pinnedSearches));
        localStorage.setItem("search/recent", JSON.stringify(recentSearches));
    }, [pinnedSearches, recentSearches]);

    const [focus, setFocus] = useState(-1);
    const handleFocusChange = (index: number) => {
        setFocus(index);
    };
    const handleFocusChangeKey = (
        values: Data[],
        direction: "ArrowUp" | "ArrowDown"
    ) => {
        let index;
        if (direction === "ArrowUp") {
            index = focus - 1;
            if (index < 0) {
                index = values.length - 1;
            }
        } else {
            index = focus + 1;
            if (index > values.length - 1) {
                index = 0;
            }
        }
        setFocus(index);
        document
            .getElementById(getURL(values[index]))
            ?.scrollIntoView({ behavior: "instant", block: "center" });
    };

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === "k") {
            event.preventDefault();
            if (!searchOpen) {
                handleSearchOpen();
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);
    }, []);

    const subHeaderTextStyle = {
        alignItems: "center",
        justifyContent: "space-between",
        rowGap: "8px",
        px: {
            xs: "12px",
            sm: "24px",
        },
    };

    const buttonStyle = {
        p: "4px",
        color: theme.text.primary,
        "&:hover": {
            backgroundColor: theme.menu.selected,
        },
    };

    // Render the option item
    function renderOptionItem({
        index = 0,
        option,
        buttons,
    }: {
        index?: number;
        option: Data;
        buttons?: {
            addPin?: boolean;
            removePin?: boolean;
            removeRecent?: boolean;
        };
    }) {
        return (
            <StyledMenuItem
                id={getURL(option)}
                key={getURL(option)}
                selected={focus === index}
                disableRipple
                onMouseMove={() => handleFocusChange(index)}
                sx={{
                    px: { xs: 1, sm: 2 },
                    mx: { xs: "8px", sm: "24px" },
                    my: "8px",
                    borderRadius: "4px",
                    minHeight: { xs: "56px", sm: "64px" },
                    "&.MuiMenuItem-root": {
                        "&:hover": {
                            backgroundColor: theme.menu.primary,
                        },
                        "&.Mui-focusVisible, &.Mui-selected": {
                            backgroundColor: theme.menu.hover,
                            "&:hover": {
                                backgroundColor: theme.menu.hover,
                            },
                        },
                    },
                }}
            >
                <FlexBox
                    sx={{
                        flexGrow: 1,
                        flexWrap: "wrap",
                        rowGap: "8px",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{ flex: "1 0 auto" }}
                        onClick={() => handleSelect(option)}
                    >
                        <RouterLink
                            to={getURL(option)}
                            sx={{
                                justifyContent: "flex-start",
                                width: "100%",
                            }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={{ xs: 1, sm: 2 }}
                            >
                                <Image
                                    src={getImageIcon(
                                        option.category,
                                        option.name
                                    )}
                                    alt={option.name}
                                    style={{
                                        width: matches_up_sm ? "48px" : "40px",
                                        height: "auto",
                                        borderRadius: "4px",
                                        border: `2px solid ${theme.border.color.primary}`,
                                        backgroundColor: theme.background(2),
                                    }}
                                />
                                <Stack spacing={0.5}>
                                    <TextStyled noWrap>
                                        {option.displayName}
                                    </TextStyled>
                                    <TextStyled variant="subtitle2-styled">
                                        {option.category}
                                    </TextStyled>
                                </Stack>
                            </Stack>
                        </RouterLink>
                    </Box>
                    <Stack
                        spacing={{ xs: 0, sm: 1 }}
                        direction="row"
                        alignItems="center"
                    >
                        {buttons?.addPin && (
                            <StyledTooltip
                                title="Save this search"
                                placement="top"
                            >
                                <Rating
                                    onClick={addPinnedSearch(option)}
                                    max={1}
                                    icon={<StarIcon fontSize="small" />}
                                    emptyIcon={
                                        <StarOutlineIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.text.primary,
                                            }}
                                        />
                                    }
                                    sx={{
                                        "& .MuiRating-labelEmptyValueActive": {
                                            outline: `1px solid ${theme.border.color.primary}`,
                                            borderRadius: "4px",
                                        },
                                    }}
                                />
                            </StyledTooltip>
                        )}
                        {buttons?.removePin && (
                            <StyledTooltip
                                title="Remove this search from favorites"
                                placement="top"
                            >
                                <IconButton
                                    disableRipple
                                    onClick={removePinnedSearch(option)}
                                    sx={buttonStyle}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </StyledTooltip>
                        )}
                        {buttons?.removeRecent && (
                            <StyledTooltip
                                title="Remove this search from history"
                                placement="top"
                            >
                                <IconButton
                                    disableRipple
                                    onClick={removeRecentSearch(option)}
                                    sx={buttonStyle}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </StyledTooltip>
                        )}
                    </Stack>
                </FlexBox>
            </StyledMenuItem>
        );
    }

    // Render the list of options
    function renderOptionList({
        index = 0,
        options,
        buttons,
    }: {
        index?: number;
        options: Data[];
        buttons?: {
            addPin?: boolean;
            removePin?: boolean;
            removeRecent?: boolean;
        };
    }) {
        return options.map((option, i) =>
            renderOptionItem({ index: index + i, option, buttons })
        );
    }

    return (
        <>
            {/* Navbar component */}
            {matches_up_sm ? (
                <Button
                    onClick={handleSearchOpen}
                    variant="contained"
                    disableRipple
                    startIcon={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <SearchIcon sx={{ color: theme.text.primary }} />
                            <TextStyled variant="body2-styled">
                                Search...
                            </TextStyled>
                        </Stack>
                    }
                    endIcon={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <TextStyled
                                variant="subtitle2-styled"
                                sx={{
                                    fontSize: `${theme.typography.pxToRem(
                                        12
                                    )} !important`,
                                    backgroundColor: theme.menu.selectedHover,
                                    border: `1px solid ${theme.border.color.primary}`,
                                    borderRadius: "4px",
                                    px: "8px",
                                }}
                            >
                                <code>Ctrl+K</code>
                            </TextStyled>
                        </Stack>
                    }
                    sx={{
                        justifyContent: "space-between",
                        height: "32px",
                        width: "240px",
                        border: `1px solid ${theme.border.color.primary}`,
                        backgroundColor: theme.menu.primary,
                        "&:hover": {
                            backgroundColor: theme.menu.hover,
                        },
                    }}
                />
            ) : (
                <IconButton
                    disableRipple
                    disableTouchRipple
                    onClick={handleSearchOpen}
                    sx={{
                        borderRadius: "8px",
                        px: "2px",
                        width: "36px",
                        height: "36px",
                        color: theme.appbar.color,
                        "&:hover": {
                            backgroundColor: theme.appbar.hover,
                        },
                    }}
                >
                    <SearchIcon />
                </IconButton>
            )}
            {/* Search popup */}
            <Dialog
                open={searchOpen}
                onClose={handleSearchClose}
                maxWidth="sm"
                fullWidth
                fullScreen={!matches_up_sm}
                scroll={hits ? "paper" : "body"}
                sx={{ backdropFilter: "blur(4px)" }}
                onKeyDown={(event) => {
                    const arr = hits || history;
                    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                        event.preventDefault();
                        handleFocusChangeKey(arr, event.key);
                    }
                    if (event.key === "Enter") {
                        if (focus !== -1) {
                            event.preventDefault();
                            handleSelect(arr[focus], true);
                        }
                    }
                }}
            >
                <MainContentBox
                    title={
                        <Box sx={{ width: "75%" }}>
                            <SearchBar
                                autoFocus
                                placeholder="Search Irminsul..."
                                value={searchValue}
                                onChange={handleInputChange}
                                textColor={theme.appbar.color}
                                backgroundColor={theme.appbar.backgroundColor}
                            />
                        </Box>
                    }
                    actions={
                        <IconButton
                            disableRipple
                            onClick={handleSearchClose}
                            sx={{ color: theme.appbar.color }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    headerProps={{ padding: "0px 6px 0px 0px", dense: true }}
                    contentProps={{ padding: "0px" }}
                >
                    <Box
                        sx={{
                            minHeight: { sm: "96px" },
                            maxHeight: { sm: "640px" },
                            overflowY: hits ? "clip" : "auto",
                            py: { xs: "8px", sm: "16px" },
                        }}
                    >
                        {hits && hits.length > 0 ? (
                            <Virtuoso
                                style={{
                                    height: matches_up_sm ? "480px" : "90vh",
                                    scrollbarWidth: "none",
                                }}
                                data={hits}
                                itemContent={(index, option) =>
                                    renderOptionItem({ index, option })
                                }
                            />
                        ) : searchValue !== "" ? (
                            <TextStyled
                                sx={{ textAlign: "center", py: "16px" }}
                            >
                                No results for "{searchValue}"
                            </TextStyled>
                        ) : history.length > 0 ? (
                            <MenuList disablePadding variant="menu">
                                <Stack spacing={2}>
                                    {pinnedSearches.length > 0 && (
                                        <Box>
                                            <FlexBox sx={subHeaderTextStyle}>
                                                <TextStyled sx={{ mb: "8px" }}>
                                                    Favorites
                                                </TextStyled>
                                            </FlexBox>
                                            {renderOptionList({
                                                options: pinnedSearches,
                                                buttons: { removePin: true },
                                            })}
                                        </Box>
                                    )}
                                    {recentSearches.length > 0 && (
                                        <Box>
                                            <FlexBox sx={subHeaderTextStyle}>
                                                <TextStyled sx={{ mb: "8px" }}>
                                                    Recents
                                                </TextStyled>
                                                <Button
                                                    onClick={removeRecentSearch()}
                                                    variant="contained"
                                                    disableRipple
                                                    sx={{
                                                        height: "32px",
                                                    }}
                                                >
                                                    <TextStyled
                                                        variant="subtitle2-styled"
                                                        sx={{
                                                            color: theme.appbar
                                                                .color,
                                                        }}
                                                    >
                                                        Clear All
                                                    </TextStyled>
                                                </Button>
                                            </FlexBox>
                                            {renderOptionList({
                                                index: pinnedSearches.length,
                                                options: recentSearches,
                                                buttons: {
                                                    addPin: true,
                                                    removeRecent: true,
                                                },
                                            })}
                                        </Box>
                                    )}
                                </Stack>
                            </MenuList>
                        ) : (
                            <TextStyled
                                sx={{ textAlign: "center", py: "32px" }}
                            >
                                No recent searches
                            </TextStyled>
                        )}
                    </Box>
                    <Box
                        sx={{
                            borderTop: `1px solid ${theme.border.color.primary}`,
                            backgroundColor: theme.background(2),
                            height: "48px",
                        }}
                    />
                </MainContentBox>
            </Dialog>
        </>
    );
}

export default Search;

function filterOptions(data: Data[], searchValue: string) {
    if (searchValue !== "") {
        return matchSorter(data, searchValue, {
            keys: ["displayName", "name"],
            threshold: matchSorter.rankings.WORD_STARTS_WITH,
        });
    } else {
        return null;
    }
}

function getImageIcon(category: Category, name: string) {
    switch (category) {
        case "Operators":
            return `characters/icons/${name}`;
        case "Weapons":
            return `weapons/${name}`;
    }
}

function getURL(option: Data) {
    return `${option.category.toLowerCase()}/${option.name
        .toLowerCase()
        .split(" ")
        .join("_")}`;
}
