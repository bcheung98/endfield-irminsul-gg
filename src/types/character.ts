import { Class, Element, Rarity, WeaponType } from "./_common";
import { Skill, SkillWithScaling } from "./skill";
import { VersionWithDate } from "./version";

export interface CharacterProps {
    character: Character;
}

export interface Character {
    id: number;
    name: string;
    displayName: string;
    fullName: string;
    title?: string;
    rarity: Rarity;
    opClass: Class;
    element: Element;
    weapon: WeaponType;
    skills: CharacterSkills;
    passives: CharacterPassive[];
    potential: CharacterPotentials;
    stats: CharacterStats;
    materials: {};
    description: string;
    birthday: string;
    gender: "Male" | "Female" | "Adaptive";
    faction: string;
    outfits: CharacterOutfit[];
    voiceActors: {
        en: string;
        jp: string;
    };
    release: VersionWithDate;
}

export type CharacterSkillKey = keyof CharacterSkills;
export interface CharacterSkills {
    basic: SkillWithScaling;
    skill: SkillWithScaling;
    combo: SkillWithScaling;
    ultimate: SkillWithScaling;
}

export type CharacterPassiveType = "combat" | "base" | "";
export interface CharacterPassive extends SkillWithScaling {
    type: CharacterPassiveType;
}

export type CharacterPotentialKey = keyof CharacterPotentials;
export interface CharacterPotentials {
    p1: Skill;
    p2: Skill;
    p3: Skill;
    p4: Skill;
    p5: Skill;
}

export type CharacterAttribute = "str" | "agl" | "int" | "wil";
export interface CharacterStats {
    attributes: [CharacterAttribute, CharacterAttribute];
    hp: number[];
    atk: number[];
    str: number[];
    agl: number[];
    int: number[];
    wil: number[];
}

export interface CharacterOutfit {
    name: string;
    displayName: string;
    rarity: Rarity;
    description: string;
}
