import { Character } from "types/character";
import { CharacterFilterState } from "reducers/characterFilters";

export function filterCharacters(
    characters: Character[],
    filters: CharacterFilterState,
    searchValue: string
) {
    let chars = [...characters];
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.weapon.length > 0) {
        chars = chars.filter((char) => filters.weapon.includes(char.weapon));
    }
    if (filters.class.length > 0) {
        chars = chars.filter((char) => filters.class.includes(char.opClass));
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (searchValue !== "") {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                char.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    return chars;
}
