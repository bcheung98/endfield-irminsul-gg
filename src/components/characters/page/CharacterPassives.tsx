import { useEffect, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { FlexBox } from "styled/StyledBox";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import {
    CharacterPassive,
    CharacterPassiveType,
    CharacterProps,
} from "types/character";
import InfoChip from "custom/InfoChip";

function CharacterPassives({ character }: CharacterProps) {
    const theme = useTheme();

    const { passives } = character;

    const [values, setValues] = useState<number[]>(range(1, 4));
    const handleChange = (value: number) => {
        let newValues: number[] = [];
        if (value === values.length) {
            newValues = values.slice(0, value - 1);
        } else {
            newValues = range(1, value);
        }
        setValues(newValues);
    };

    const buttons = range(1, 4).map((index) => (
        <IconButton
            disableRipple
            key={`Elite ${index}`}
            sx={{
                p: 0,
                borderRadius: "4px",
                backgroundColor: theme.palette.secondary.main,
                opacity: values.includes(index) ? 1 : 0.5,
                "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                },
            }}
            onClick={() => handleChange(index)}
        >
            <Image
                src={`icons/Elite${index}`}
                alt={`Elite ${index}`}
                style={{
                    width: "32px",
                    height: "32px",
                    padding: "4px",
                    border: `1px solid ${theme.border.color.primary}`,
                    borderRadius: "4px",
                }}
                tooltip={`Elite ${index}`}
            />
        </IconButton>
    ));

    return (
        <MainContentBox
            title={
                <FlexBox
                    sx={{ columnGap: "16px", rowGap: "8px", flexWrap: "wrap" }}
                >
                    <TextStyled variant="h6" sx={{ color: theme.appbar.color }}>
                        Talents
                    </TextStyled>
                    <Stack direction="row" spacing={1}>
                        {buttons}
                    </Stack>
                </FlexBox>
            }
        >
            <Grid container spacing={3}>
                {passives.map((passive, index) => (
                    <Grid
                        key={index}
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            p: 2,
                            backgroundColor: theme.background(1, "light"),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <CharacterPassiveCard
                            value={values.slice(-1)[0]}
                            passive={passive}
                            index={index}
                        />
                    </Grid>
                ))}
            </Grid>
        </MainContentBox>
    );
}

export default CharacterPassives;

interface CharacterPassiveCardProps {
    value: number;
    passive: CharacterPassive;
    index: number;
}

function CharacterPassiveCard({
    value,
    passive,
    index,
}: CharacterPassiveCardProps) {
    const theme = useTheme();

    const [active, setActive] = useState(true);

    const isActive = () => {
        if (index % 2 === 0) {
            return value >= 1;
        } else {
            return value >= 2;
        }
    };

    const getScalingIndex = () => {
        if (passive.type === "combat") {
            if (index % 2 === 0) {
                return value >= 2 ? 1 : 0;
            } else {
                return value >= 3 ? 1 : 0;
            }
        } else {
            if (index % 2 === 0) {
                return value >= 3 ? 1 : 0;
            } else {
                return value >= 4 ? 1 : 0;
            }
        }
    };

    const getOpacity = (bool: boolean) => (bool ? 1 : 0.35);
    const opacity = getOpacity(active);

    const targets = document.getElementsByClassName(
        `character-${passive.type}-passive-${index}-value`
    );
    useEffect(() => {
        passive.scaling.forEach((subScaling: string[], index: number) => {
            let target = targets[index];
            if (target) {
                target.innerHTML = subScaling[getScalingIndex()];
            }
        });
        setActive(isActive());
    }, [value]);

    return (
        <Stack direction={{ xs: "column-reverse", sm: "column" }} spacing={1}>
            <Stack spacing={1} sx={{ opacity: opacity }}>
                <Box>
                    <TextStyled
                        variant="h6-styled"
                        sx={{ width: { xs: "100%", sm: "auto" } }}
                    >
                        {passive.name}
                    </TextStyled>
                    <TextStyled sx={{ fontStyle: "italic" }}>
                        {formatPassiveKey(passive.type)}
                    </TextStyled>
                </Box>
                <Text component="span" sx={{ color: theme.text.description }}>
                    {parseSkillDescription({
                        description: passive.description,
                        newClassName: `character-${passive.type}-passive-${index}-value`,
                    })}
                </Text>
            </Stack>
            {!active && (
                <Box>
                    <InfoChip
                        label={`Requires Elite ${(index % 2) + 1}`}
                        src={`icons/Elite${(index % 2) + 1}`}
                        padding="8px 8px 10px"
                    />
                </Box>
            )}
        </Stack>
    );
}

function formatPassiveKey(type: CharacterPassiveType) {
    switch (type) {
        case "combat":
            return "Combat Talent";
        case "base":
            return "Base Talent";
        case "":
        default:
            return "Passive Talent";
    }
}
