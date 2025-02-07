import { CSSProperties, useState } from "react";

// Component imports
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledInput } from "styled/StyledInput";
import { StyledMenuItem } from "styled/StyledMenu";

// MUI imports
import {
    useTheme,
    SxProps,
    Box,
    Select,
    SelectChangeEvent,
    IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Masonry } from "@mui/lab";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { updates } from "data/versions";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

function VersionHighlights() {
    const theme = useTheme();

    const [index, setIndex] = useState(0);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index + 1 < updates.length) {
            setIndex(index + 1);
        }
    };
    const handleIndexChangeRight = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        }
    };

    const buttonStyle: SxProps = {
        color: theme.appbar.color,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.appbar.color,
        },
    };

    const gridStyle: SxProps = {
        minHeight: "280px",
        maxHeight: { xs: "720px", md: "100%" },
        overflowY: "auto",
    };

    const iconStyle: CSSProperties = {
        width: "32px",
        marginRight: "8px",
        backgroundColor: theme.icon.backgroundColor,
        borderRadius: "64px",
    };

    const version = updates[index].version;

    const characters = useAppSelector(selectCharacters)
        .filter((char) => char.release.version === version)
        .sort(
            (a, b) =>
                b.rarity - a.rarity || a.fullName.localeCompare(b.fullName)
        );

    return (
        <MainContentBox
            title="Version Highlights"
            actions={
                <FlexBox>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeLeft}
                            disabled={index >= updates.length - 1}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                    </Box>
                    <Select
                        value={index.toString()}
                        label="Version"
                        onChange={handleIndexChange}
                        input={<StyledInput />}
                        sx={{ mx: "4px", minWidth: "72px" }}
                    >
                        {updates.map((version, index) => (
                            <StyledMenuItem key={index} value={index}>
                                <TextStyled>{version.version}</TextStyled>
                            </StyledMenuItem>
                        ))}
                    </Select>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeRight}
                            disabled={index === 0}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </FlexBox>
            }
            contentProps={{ overflowX: "clip" }}
        >
            <TextStyled variant="h5-styled" sx={{ mb: "20px" }}>
                {updates[index].version} - <i>{updates[index].name}</i>
            </TextStyled>
            <Masonry columns={{ xs: 1, md: 1 }} spacing={4}>
                {characters.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/Character"
                                alt="New Operators"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6-styled">
                                New Operators
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={3} sx={{ px: 2 }}>
                            {characters.map((char, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${char.name}-versionHighlights`}
                                    name={char.name}
                                    displayName={char.displayName}
                                    type="character"
                                    rarity={char.rarity}
                                    info={{
                                        element: char.element,
                                        weapon: char.weapon,
                                    }}
                                    infoSecondary={{
                                        opClass: char.opClass,
                                    }}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Masonry>
        </MainContentBox>
    );
}

export default VersionHighlights;
