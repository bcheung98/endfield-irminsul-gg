// Component imports
import CharacterSkillScaling from "./CharacterSkillScaling";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Divider, Stack } from "@mui/material";

// Helper imports
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { Element } from "types/_common";
import { CharacterSkillKey, CharacterSkills } from "types/character";
import { SkillWithScaling } from "types/skill";

interface CharacterSkillTabProps {
    mode: "table" | "slider";
    skills: CharacterSkills;
    skillKey: CharacterSkillKey;
    element: Element;
}

export interface CharacterSkillScalingProps {
    mode: "table" | "slider";
    scaling: string[][];
    element: Element;
}

function CharacterSkillTab({
    mode,
    skills,
    skillKey,
    element,
}: CharacterSkillTabProps) {
    const theme = useTheme();

    const skill = skills[skillKey] as SkillWithScaling;

    return (
        <Stack spacing={3} divider={<Divider />} sx={{ pb: "16px" }}>
            <Box>
                <Box sx={{ mb: "24px" }}>
                    <TextStyled
                        sx={{
                            mb: "8px",
                            fontStyle: "italic",
                        }}
                    >
                        {formatSkillKey(skillKey)}
                    </TextStyled>
                    <TextStyled variant="h5-styled" sx={{ mb: "16px" }}>
                        {skill.name}
                    </TextStyled>
                    <Text
                        component="span"
                        sx={{ color: theme.text.description }}
                    >
                        {parseSkillDescription({
                            description: skill.description,
                        })}
                    </Text>
                    <Stack spacing={2} sx={{ mt: "24px" }}>
                        <CharacterSkillScaling
                            mode={mode}
                            scaling={skill.scaling}
                            element={element}
                        />
                    </Stack>
                </Box>
            </Box>
        </Stack>
    );
}

export default CharacterSkillTab;

function formatSkillKey(key: CharacterSkillKey) {
    switch (key) {
        case "basic":
            return "Basic Attack";
        case "skill":
            return "Battle Skill";
        case "combo":
            return "Combo Skill";
        case "ultimate":
            return "Ultimate";
    }
}
