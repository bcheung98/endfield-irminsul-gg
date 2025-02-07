import { useState } from "react";

// Component imports
import MaterialImage from "custom/MaterialImage";
import LevelUpSliderContainer from "custom/LevelUpSliderContainer";
import { TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import {
    getCharacterLevelCost,
    getCharacterSkillCost,
    getWeaponLevelCost,
} from "helpers/getLevelUpCosts";
import { createMaterialCostData } from "helpers/createMaterialCostData";

// Type imports
import { Element, Rarity } from "types/_common";
import { TotalCostObject } from "types/costs";
import { CostObjectSourceIndex } from "types/costs";
import {
    BossMaterial,
    CommonMaterial,
    EliteMaterial,
    Gemstone,
    LocalMaterial,
    Materials,
    TalentMaterial,
    WeaponAscensionMaterial,
    WeeklyBossMaterial,
} from "types/materials";

export type LevelUpCostSkillKeys = keyof typeof CostObjectSourceIndex;

interface LevelUpCostsProps {
    type: "character" | "weapon";
    skillKey: LevelUpCostSkillKeys;
    rarity?: Rarity;
    element?: Element;
    mats: Materials;
    threshold?: string;
}

function LevelUpCosts({
    type,
    skillKey,
    rarity = 4,
    element,
    mats,
    threshold = "@100",
}: LevelUpCostsProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const levels = getLevels(skillKey);
    const minDistance = 1;
    const maxValue = levels.length;
    const [values, setValues] = useState([1, maxValue]);
    const handleSliderChange = (
        _: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setValues([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setValues([clamped - minDistance, clamped]);
            }
        } else {
            setValues(newValue);
        }
    };

    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <TextStyled
                variant={
                    values.includes(index + 1) ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: values.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </TextStyled>
        ),
    }));

    const costs = getCosts({
        type,
        skillKey,
        rarity,
        element,
        values,
        mats,
    });

    return (
        <Box sx={{ containerType: "inline-size" }}>
            <Grid
                container
                spacing={2}
                sx={{ mb: levels.length > 0 ? "16px" : "0px" }}
            >
                {createMaterialCostData(costs).map((material, index) => (
                    <MaterialImage
                        key={index}
                        name={material.name}
                        rarity={material.rarity}
                        cost={material.cost}
                        imgSrc={material.img}
                    />
                ))}
            </Grid>
            {levels.length > 0 && (
                <LevelUpSliderContainer
                    values={[levels[values[0] - 1], levels[values[1] - 1]]}
                    threshold={threshold}
                >
                    <StyledSlider
                        value={values}
                        marks={marks}
                        min={1}
                        max={maxValue}
                        onChange={handleSliderChange}
                        disableSwap
                        size={matches_sm_dn ? "small" : "medium"}
                        sx={{
                            color: theme.elementColor(element),
                        }}
                    />
                </LevelUpSliderContainer>
            )}
        </Box>
    );
}

export default LevelUpCosts;

function getLevels(skillKey: LevelUpCostsProps["skillKey"]) {
    switch (skillKey) {
        case "level":
            return ["20", "40", "50", "60", "70", "80", "90"];
        case "attack":
        case "skill":
        case "burst":
            return range(1, 10);
        default:
            return [];
    }
}

function getCosts({
    type,
    skillKey,
    rarity,
    element,
    values,
    mats,
}: {
    type: "character" | "weapon";
    skillKey: LevelUpCostSkillKeys;
    rarity: Rarity;
    element?: Element;
    values: number[];
    mats: Materials;
}) {
    let costs, levelUpCost;
    switch (skillKey) {
        case "level":
            if (type === "character") {
                levelUpCost = getCharacterLevelCost({
                    start: values[0],
                    stop: values[1],
                    selected: true,
                    withXP: false,
                });
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    bossMat: {
                        [`${mats.bossMat}` as BossMaterial]:
                            levelUpCost.bossMat.bossMat,
                    },
                    localMat: {
                        [`${mats.localMat}` as LocalMaterial]:
                            levelUpCost.localMat.localMat,
                    },
                    gemstone: {
                        [`${element}1` as Gemstone]:
                            levelUpCost.gemstone.gemstone1,
                        [`${element}2` as Gemstone]:
                            levelUpCost.gemstone.gemstone2,
                        [`${element}3` as Gemstone]:
                            levelUpCost.gemstone.gemstone3,
                        [`${element}4` as Gemstone]:
                            levelUpCost.gemstone.gemstone4,
                    },
                    commonMat: {
                        [`${mats.commonMat}1` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat1,
                        [`${mats.commonMat}2` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat2,
                        [`${mats.commonMat}3` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat3,
                    },
                } as TotalCostObject;
            } else {
                levelUpCost = getWeaponLevelCost({
                    start: values[0],
                    stop: values[1],
                    selected: true,
                    withXP: false,
                    rarity: rarity,
                });
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    weaponAscensionMat: {
                        [`${mats.weaponAscensionMat}1` as WeaponAscensionMaterial]:
                            levelUpCost.weaponAscensionMat.weaponAscensionMat1,
                        [`${mats.weaponAscensionMat}2` as WeaponAscensionMaterial]:
                            levelUpCost.weaponAscensionMat.weaponAscensionMat2,
                        [`${mats.weaponAscensionMat}3` as WeaponAscensionMaterial]:
                            levelUpCost.weaponAscensionMat.weaponAscensionMat3,
                        [`${mats.weaponAscensionMat}4` as WeaponAscensionMaterial]:
                            levelUpCost.weaponAscensionMat.weaponAscensionMat4,
                    },
                    eliteMat: {
                        [`${mats.eliteMat}1` as EliteMaterial]:
                            levelUpCost.eliteMat.eliteMat1,
                        [`${mats.eliteMat}2` as EliteMaterial]:
                            levelUpCost.eliteMat.eliteMat2,
                        [`${mats.eliteMat}3` as EliteMaterial]:
                            levelUpCost.eliteMat.eliteMat3,
                    },
                    commonMat: {
                        [`${mats.commonMat}1` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat1,
                        [`${mats.commonMat}2` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat2,
                        [`${mats.commonMat}3` as CommonMaterial]:
                            levelUpCost.commonMat.commonMat3,
                    },
                } as TotalCostObject;
            }
            break;
        case "attack":
        case "skill":
        case "burst":
            levelUpCost = getCharacterSkillCost({
                start: values[0],
                stop: values[1],
                selected: true,
            });
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                talentBook: {
                    [`${mats.talentBook}1` as TalentMaterial]:
                        levelUpCost.talentBook.talentBook1,
                    [`${mats.talentBook}2` as TalentMaterial]:
                        levelUpCost.talentBook.talentBook2,
                    [`${mats.talentBook}3` as TalentMaterial]:
                        levelUpCost.talentBook.talentBook3,
                },
                commonMat: {
                    [`${mats.commonMat}1` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat1,
                    [`${mats.commonMat}2` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat2,
                    [`${mats.commonMat}3` as CommonMaterial]:
                        levelUpCost.commonMat.commonMat3,
                },
                weeklyBossMat: {
                    [`${mats.weeklyBossMat}` as WeeklyBossMaterial]:
                        levelUpCost.weeklyBossMat.weeklyBossMat,
                },
                crown: {
                    Crown: levelUpCost.crown.crown,
                },
            } as TotalCostObject;
            break;
    }
    return costs;
}
