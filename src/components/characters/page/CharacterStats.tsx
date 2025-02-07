import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons from "custom/ToggleButtons";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { skillDisplayButtons } from "components/Settings";

// Type imports
import { CharacterProps } from "types/character";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

function CharacterStats({ character }: CharacterProps) {
    const theme = useTheme();

    const { stats, element } = character;

    const currentSkillDisplay = useAppSelector(selectSkillDisplay);
    const [mode, setMode] = useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    // const levels = ["1", "20", "20+", "40", "40+", "60", "60+", "70", "70+", "80"]
    const levels = ["1", "20", "40", "60", "70", "80"];

    const data = [
        ["Level", ...levels],
        [
            "HP",
            ...levels.map((_, index) =>
                (stats.hp[index] || 0).toLocaleString()
            ),
        ],
        [
            "ATK",
            ...levels.map((_, index) =>
                (stats.atk[index] || 0).toLocaleString()
            ),
        ],
        [
            formatStat("STR", mode),
            ...levels.map((_, index) =>
                (stats.str[index] || 0).toLocaleString()
            ),
        ],
        [
            formatStat("AGL", mode),
            ...levels.map((_, index) =>
                (stats.agl[index] || 0).toLocaleString()
            ),
        ],
        [
            formatStat("INT", mode),
            ...levels.map((_, index) =>
                (stats.int[index] || 0).toLocaleString()
            ),
        ],
        [
            formatStat("WIL", mode),
            ...levels.map((_, index) =>
                (stats.wil[index] || 0).toLocaleString()
            ),
        ],
    ];

    useEffect(() => {
        setMode(currentSkillDisplay);
    }, [currentSkillDisplay]);

    return (
        <MainContentBox
            title="Stats"
            actions={
                <ToggleButtons
                    color="secondary"
                    buttons={skillDisplayButtons}
                    value={mode}
                    exclusive
                    onChange={handleMode}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
            }
        >
            <StatsTable
                mode={mode}
                levels={levels}
                data={data}
                orientation="column"
                sliderProps={{
                    sx: {
                        minWidth: "100px",
                        maxWidth: "50%",
                        ml: "8px",
                        color: theme.elementColor(element),
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "50%" }
                                : "100%",
                    },
                }}
            />
        </MainContentBox>
    );
}

export default CharacterStats;

function formatStat(stat: string, display: SkillDisplay) {
    if (display === "table") {
        return stat;
    } else {
        switch (stat) {
            case "STR":
                return "Strength";
            case "AGL":
                return "Agility";
            case "INT":
                return "Intellect";
            case "WIL":
                return "Will";
            default:
                return stat;
        }
    }
}
