// Component imports
import ElementIcon from "custom/ElementIcon";
import InfoChip from "custom/InfoChip";
import RarityStars from "custom/RarityStars";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Card, Divider, Stack } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const { fullName, title, rarity, opClass, element, weapon, description } =
        character;

    return (
        <Card
            sx={{
                p: "16px 24px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "24px", rowGap: "8px" }}
                >
                    <ElementIcon element={element} padding="4px" />
                    <Box>
                        <Box sx={{ mb: "8px" }}>
                            <TextStyled variant="h4-styled">
                                {fullName}
                            </TextStyled>
                            {title && (
                                <TextStyled
                                    sx={{ mt: "4px", fontStyle: "italic" }}
                                >
                                    {title}
                                </TextStyled>
                            )}
                        </Box>
                        <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                            <InfoChip
                                color="tertiary"
                                label={
                                    <RarityStars
                                        rarity={rarity}
                                        variant="h5-styled"
                                    />
                                }
                                padding="0px"
                            />
                            <InfoChip
                                color="tertiary"
                                src={`classes/${opClass}`}
                                label={opClass}
                            />
                            <InfoChip
                                color="tertiary"
                                src={`weapons/icons/${weapon}`}
                                label={weapon}
                            />
                        </FlexBox>
                    </Box>
                </FlexBox>
                {description && (
                    <TextStyled
                        variant="subtitle1-styled"
                        sx={{ fontStyle: "italic" }}
                    >
                        {description}
                    </TextStyled>
                )}
            </Stack>
        </Card>
    );
}

export default CharacterInfoMain;
