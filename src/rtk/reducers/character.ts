import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { startAppListening } from "helpers/hooks";
import { fetchCharacters, LoadingStatus } from "rtk/fetchData";
import { Character } from "types/character";

export interface CharacterState {
    status: LoadingStatus;
    characters: Character[];
}

const storedCharacters = localStorage.getItem("data/characters") || "null";

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: CharacterState = {
    status: "idle",
    characters: storedCharacters !== "null" ? JSON.parse(storedCharacters) : [],
};

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            let payload = action.payload;
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(payload) !== storedCharacters) {
                state.characters = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.status = "error";
        });
    },
    selectors: {
        selectCharacters: (state): Character[] => state.characters,
    },
});

export const { selectCharacters } = characterSlice.selectors;

export default characterSlice.reducer;

startAppListening({
    actionCreator: fetchCharacters.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedCharacters) {
            localStorage.setItem("data/characters", data);
        }
    },
});
