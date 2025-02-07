// Component imports
import MainContentBox from "custom/MainContentBox";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { objectKeys } from "helpers/utils";
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { CharacterProps } from "types/character";

function CharacterPotential({ character }: CharacterProps) {
    const theme = useTheme();

    const { potential } = character;

    return (
        <MainContentBox title="Potential">
            <Grid container spacing={3}>
                {objectKeys(potential).map((key, index) => (
                    <Grid
                        key={key}
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            p: 2,
                            backgroundColor: theme.background(1, "light"),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <TextStyled variant="h6-styled" sx={{ mb: "4px" }}>
                            {`P${index + 1}. ${potential[key].name}`}
                        </TextStyled>
                        <Text
                            component="span"
                            sx={{ color: theme.text.description }}
                        >
                            {parseSkillDescription({
                                description: potential[key].description,
                            })}
                        </Text>
                    </Grid>
                ))}
            </Grid>
        </MainContentBox>
    );
}

export default CharacterPotential;
