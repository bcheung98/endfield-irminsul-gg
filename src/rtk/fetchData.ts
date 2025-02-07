import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/endfield/characters.json
const charactersURL = "http://localhost:3000/characters";

// https://api.irminsul.gg/endfield/weapons.json
// const weaponsURL = "https://api.irminsul.gg/endfield/weapons-v2.json";

// const characterBannerURL =
//     "https://api.irminsul.gg/endfield/character-banners.json";
// const weaponBannerURL = "https://api.irminsul.gg/endfield/weapon-banners.json";

export const fetchCharacters = createAsyncThunk(
    "GET/characters",
    async (): Promise<Character[]> => {
        const response = await fetch(charactersURL);
        return await response.json();
    }
);

// export const fetchWeapons = createAsyncThunk(
//     "GET/weapons",
//     async (): Promise<Weapon[]> => {
//         const response = await fetch(weaponsURL);
//         return await response.json();
//     }
// );

// export const fetchCharacterBanners = createAsyncThunk(
//     "GET/characterBanners",
//     async (): Promise<Banner[]> => {
//         const response = await fetch(characterBannerURL);
//         return await response.json();
//     }
// );

// export const fetchWeaponBanners = createAsyncThunk(
//     "GET/weaponBanners",
//     async (): Promise<Banner[]> => {
//         const response = await fetch(weaponBannerURL);
//         return await response.json();
//     }
// );
