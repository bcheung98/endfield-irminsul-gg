import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { objectKeys } from "helpers/utils";
import { Class, Element, Rarity, WeaponType } from "types/_common";

export interface CharacterFilterState {
    element: Element[];
    weapon: WeaponType[];
    rarity: Rarity[];
    class: Class[];
}

const initialState: CharacterFilterState = {
    element: [],
    weapon: [],
    class: [],
    rarity: [],
};

export const characterFilterSlice = createSlice({
    name: "characterFilters",
    initialState,
    reducers: {
        setElement: (state, action: PayloadAction<Element[]>) => {
            state.element = action.payload;
        },
        setWeapon: (state, action: PayloadAction<WeaponType[]>) => {
            state.weapon = action.payload;
        },
        setClass: (state, action: PayloadAction<Class[]>) => {
            state.class = action.payload;
        },
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<keyof CharacterFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
    selectors: {
        selectCharacterFilters: (state): CharacterFilterState => state,
        activeCharacterFilters: (state): boolean =>
            objectKeys(state).filter((filter) => state[filter].length).length >
            0,
    },
});

export const { setElement, setWeapon, setClass, setRarity, clearFilters } =
    characterFilterSlice.actions;

export const { selectCharacterFilters, activeCharacterFilters } =
    characterFilterSlice.selectors;

export default characterFilterSlice.reducer;
