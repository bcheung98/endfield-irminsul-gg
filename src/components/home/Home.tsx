// Component imports
import VersionHighlights from "./VersionHighlights";

// MUI imports
import { Stack } from "@mui/material";

function Home() {
    document.title = `Arknights: Endfield - Irminsul.GG`;

    return (
        <Stack spacing={3}>
            <VersionHighlights />
        </Stack>
    );
}

export default Home;
