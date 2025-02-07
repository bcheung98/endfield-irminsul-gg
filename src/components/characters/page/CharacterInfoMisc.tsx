// Components
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    Card,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { createDateObject } from "helpers/dates";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMisc({ character }: CharacterProps) {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const { birthday, faction, voiceActors, release } = { ...character };
    const releaseDate =
        release.date !== ""
            ? createDateObject({ date: release.date, region: region }).date
            : "";
    const releaseVersion = release.version;

    const rows = [
        { key: "Faction", value: faction },
        { key: "Birthday", value: birthday || "---" },
        { key: "Release", value: `${releaseDate} (${releaseVersion})` },
        { key: "Voice Actor (EN)", value: voiceActors["en"] || "---" },
        { key: "Voice Actor (JP)", value: voiceActors["jp"] || "---" },
    ];

    return (
        <TableContainer
            component={Card}
            sx={{
                width: "100%",
                py: "8px",
                backgroundColor: theme.background(2),
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
            }}
        >
            <Table size="small">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell
                                align="left"
                                sx={{ border: "none", py: "2px" }}
                            >
                                <TextStyled variant="body2-styled">
                                    {row.key}
                                </TextStyled>
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ border: "none", py: "2px" }}
                            >
                                <Text variant="body2">{row.value}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CharacterInfoMisc;
