import { classes, elements, rarities, weapons } from "data/common";

// Taken from:
// https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2
export type NestedKeyOf<T extends object> = {
    [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | keyof T[K]
        : `${K}`;
}[keyof T & (string | number)];

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Class = (typeof classes)[number];
export type Element = (typeof elements)[number];
export type WeaponType = (typeof weapons)[number];
export type Rarity = (typeof rarities)[number];
