import { BaseSyntheticEvent } from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import RarityStars from "custom/RarityStars";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
// import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
// import { selectUnreleasedContent } from "reducers/settings";
import {
    activeCharacterFilters,
    clearFilters,
    selectCharacterFilters,
    setClass,
    setElement,
    setRarity,
    setWeapon,
} from "reducers/characterFilters";
import { elements, weapons, rarities, classes } from "data/common";

// Type imports
import { Class, Element, WeaponType, Rarity } from "types/_common";
import { elementBackgroundColor } from "helpers/elementBackgroundColor";

function CharacterFilters({
    handleClose,
}: {
    handleClose: (arg0: any) => void;
}) {
    const theme = useTheme();

    const filters = useAppSelector(selectCharacterFilters);
    const dispatch = useAppDispatch();

    // const showUnrelased = useAppSelector(selectUnreleasedContent);

    const filterGroups = [
        {
            name: "Element",
            value: filters.element,
            onChange: (_: BaseSyntheticEvent, newValues: Element[]) =>
                dispatch(setElement(newValues)),
            buttons: createButtons(elements, "elements"),
        },
        {
            name: "Weapon",
            value: filters.weapon,
            onChange: (_: BaseSyntheticEvent, newValues: WeaponType[]) =>
                dispatch(setWeapon(newValues)),
            buttons: createButtons(weapons, "weapons/icons"),
        },
        {
            name: "Class",
            value: filters.class,
            onChange: (_: BaseSyntheticEvent, newValues: Class[]) =>
                dispatch(setClass(newValues)),
            buttons: createButtons(classes, "classes"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: rarities.slice(0, -3).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6-styled" />,
            })),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeCharacterFilters)}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    startIcon={<RestartAltIcon />}
                    sx={{
                        height: "32px",
                        "&.Mui-disabled": {
                            opacity: 0.35,
                            color: theme.appbar.color,
                        },
                    }}
                >
                    Reset
                </Button>
                <IconButton
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <List sx={{ px: "16px" }}>
                {filterGroups.map((filter, index) => (
                    <Dropdown
                        key={index}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? theme.text.selected
                                : theme.appbar.color
                        }
                        contentPadding="4px 0px 4px 24px"
                    >
                        <ToggleButtons
                            color="secondary"
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={"label" in filter.buttons[0] ? "0 8px" : 0}
                        />
                    </Dropdown>
                ))}
            </List>
        </>
    );
}

export default CharacterFilters;

function createButtons<T>(items: readonly T[], url: string) {
    return items.map((item) => ({
        value: item,
        icon: url && (
            <Image
                src={`${url}/${item}${
                    ["materials/talent", "materials/common"].includes(url)
                        ? "3"
                        : ""
                }`}
                alt={`${item}`}
                style={{
                    width: "32px",
                    padding: "4px",
                    borderRadius: "4px",
                    backgroundColor:
                        url === "elements"
                            ? elementBackgroundColor(item as Element)
                            : null,
                }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function getTooltip<T>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("materials/common")) {
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
