// Component imports
import SEO from "components/SEO";
import VersionHighlights from "./VersionHighlights";

// MUI imports
import { Stack } from "@mui/material";

function Home() {
    return (
        <>
            <SEO />
            <Stack spacing={3}>
                <VersionHighlights />
            </Stack>
        </>
    );
}

export default Home;
