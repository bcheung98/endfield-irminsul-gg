import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "rtk/store";

export interface LayoutState {
    rightDrawerOpen: boolean;
}

const initialState: LayoutState = {
    rightDrawerOpen: false,
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        toggleRightDrawer: (
            state,
            action: PayloadAction<boolean | undefined>
        ) => {
            if (action.payload !== undefined) {
                state.rightDrawerOpen = action.payload;
            } else {
                state.rightDrawerOpen = !state.rightDrawerOpen;
            }
        },
    },
});

export const { toggleRightDrawer } = layoutSlice.actions;

export const isRightDrawerOpen = (state: RootState): boolean =>
    state.layout.rightDrawerOpen;

export default layoutSlice.reducer;
