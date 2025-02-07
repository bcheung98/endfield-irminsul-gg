import { BaseSyntheticEvent, useState } from "react";

// Component imports
import CharacterTableRow from "./CharacterTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Type imports
import { Character } from "types/character";

export type CharacterRow = Pick<
    Character,
    | "id"
    | "name"
    | "fullName"
    | "rarity"
    | "element"
    | "weapon"
    | "opClass"
    | "faction"
    | "gender"
>;

function CharacterTable({ characters }: { characters: Character[] }) {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState("fullName");

    const handleRequestSort = (_: BaseSyntheticEvent, property: string) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "fullName", label: "Name" },
        { id: "rarity", label: "Rarity" },
        { id: "element", label: "Element" },
        { id: "weapon", label: "Weapon" },
        { id: "opClass", label: "Class" },
        { id: "id", label: "Release Date" },
    ];

    const rows = characters.map((char) => ({
        id: char.id,
        name: char.name,
        fullName: char.fullName,
        rarity: char.rarity,
        element: char.element,
        weapon: char.weapon,
        opClass: char.opClass,
        faction: char.faction,
        gender: char.gender,
        releaseDate: char.release.date,
        version: char.release.version,
    }));

    return (
        <MainContentBox
            title={`${characters.length} ${
                characters.length === 1 ? "Character" : "Characters"
            }`}
            contentProps={{ padding: 0 }}
        >
            <TableContainer>
                <Table>
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumns={headColumns}
                    />
                    <TableBody>
                        {rows.sort(getComparator(order, orderBy)).map((row) => (
                            <CharacterTableRow key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default CharacterTable;
