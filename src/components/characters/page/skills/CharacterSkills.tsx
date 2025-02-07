import { BaseSyntheticEvent, CSSProperties, useEffect, useState } from "react";

// Component imports
import CharacterSkillTab from "./CharacterSkillTab";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

// Helper imports
import { objectKeys } from "helpers/utils";
import { skillDisplayButtons } from "components/Settings";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

// Type imports
import { CharacterProps } from "types/character";

function CharacterSkills({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { name, element, weapon, skills } = character;

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const currentSkillDisplay = useAppSelector(selectSkillDisplay);
    const [mode, setMode] = useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    const skillIcon = (index: number): CSSProperties => {
        const selected = index === tabValue;
        return {
            width: matches_sm_up ? "48px" : "40px",
            height: matches_sm_up ? "48px" : "40px",
            margin: "4px 0",
            padding: "4px",
            backgroundColor: theme.appbar.backgroundColor,
            borderWidth: selected ? "thick" : "3px",
            borderStyle: selected ? "double" : "solid",
            borderColor: theme.elementColor(element),
            borderRadius: "8px",
            boxShadow: selected
                ? `0 0 12px 4px ${theme.elementColor(element)}`
                : "none",
            transition: "box-shadow 250ms",
            objectFit: "cover",
        };
    };

    useEffect(() => {
        setMode(currentSkillDisplay);
    }, [currentSkillDisplay]);

    return (
        <MainContentBox
            title="Skills"
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
            contentProps={{ padding: 0 }}
        >
            <StyledTabs
                variant="scrollable"
                value={tabValue}
                onChange={handleTabChange}
                scrollButtons="auto"
                allowScrollButtonsMobile={!matches_sm_up}
                sx={{
                    height: "100%",
                    "& .MuiTabScrollButton-root": {
                        color: theme.text.primary,
                        backgroundColor: theme.background(2),
                    },
                    ".MuiTabs-scrollButtons.Mui-disabled": {
                        opacity: 0.3,
                    },
                    "& .MuiTabs-indicatorSpan": {
                        width: "100%",
                        backgroundColor: theme.elementColor(element),
                    },
                }}
            >
                {objectKeys(skills).map((key, index) => (
                    <StyledTab
                        key={key}
                        icon={
                            <Image
                                src={
                                    key === "basic"
                                        ? `weapons/attack_icons/${weapon}`
                                        : `characters/skills/${name.toLowerCase()}_${key}`
                                }
                                alt={key}
                                style={skillIcon(index)}
                            />
                        }
                        sx={{ px: 0 }}
                    />
                ))}
            </StyledTabs>
            {objectKeys(skills).map((key, index) => (
                <TabPanel key={key} index={index} value={tabValue}>
                    <CharacterSkillTab
                        mode={mode}
                        skills={skills}
                        skillKey={key}
                        element={element}
                    />
                </TabPanel>
            ))}
        </MainContentBox>
    );
}

export default CharacterSkills;
