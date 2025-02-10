import { useParams } from "react-router";

// Component imports
import CharacterImage from "./CharacterImage";
import CharacterInfoMain from "./CharacterInfoMain";
import CharacterInfoMisc from "./CharacterInfoMisc";
import CharacterStats from "./CharacterStats";
import CharacterSkills from "./skills/CharacterSkills";
import CharacterPassives from "./CharacterPassives";
import CharacterPotential from "./CharacterPotential";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";
import SEO from "components/SEO";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

function CharacterPage() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const params = useParams<{ name: string }>();
    const character = useAppSelector(selectCharacters).find(
        (char) => char.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (character !== undefined) {
        const betaTag = <BetaTag version={character.release.version} />;

        const charSplash = <CharacterImage character={character} />;
        const infoMain = <CharacterInfoMain character={character} />;
        const infoMisc = <CharacterInfoMisc character={character} />;
        const stats = <CharacterStats character={character} />;

        return (
            <>
                <SEO
                    title={character.fullName}
                    description={character.description}
                />
                <Stack spacing={2}>
                    {matches_md_up ? (
                        <Grid container spacing={3}>
                            <Grid size={4}>
                                <Stack spacing={2}>
                                    {charSplash}
                                    {infoMisc}
                                </Stack>
                            </Grid>
                            <Grid size="grow">
                                <Stack spacing={2}>
                                    {betaTag}
                                    {infoMain}
                                    {stats}
                                </Stack>
                            </Grid>
                        </Grid>
                    ) : (
                        <>
                            {betaTag}
                            {infoMain}
                            {charSplash}
                            {stats}
                            {infoMisc}
                        </>
                    )}
                    <CharacterSkills character={character} />
                    <CharacterPassives character={character} />
                    <CharacterPotential character={character} />
                </Stack>
            </>
        );
    } else {
        return <PageNotFound />;
    }
}

export default CharacterPage;
