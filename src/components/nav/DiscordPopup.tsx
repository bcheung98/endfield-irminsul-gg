// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DiscordPopup({ handleClose }: { handleClose: () => void }) {
    const theme = useTheme();

    return (
        <MainContentBox
            title="Join the Discord!"
            actions={
                <IconButton
                    disableRipple
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            }
            contentProps={{ padding: "16px" }}
        >
            <TextStyled variant="subtitle1-styled">
                Join the IRMINSUL.GG Discord server if you want to receive
                notifications for updates on the website, want to provide
                feedback and suggestions, or have any other questions!
                <br />
                <br />
                <i>
                    NOTE: You must have a verified email on your Discord account
                    to join the server.
                </i>
            </TextStyled>
            <br />
            <br />
            <Button
                href="https://discord.gg/QGehvhYdAz"
                target="_blank"
                rel="noopener"
                variant="contained"
                disableElevation
                startIcon={
                    <Image
                        src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg"
                        alt="Discord"
                        style={{
                            height: "16px",
                            width: "auto",
                        }}
                    />
                }
                sx={{
                    backgroundColor: "#00863A",
                    color: theme.text.primary,
                    height: "32px",
                }}
            >
                Join
            </Button>
        </MainContentBox>
    );
}

export default DiscordPopup;
