import { BaseSyntheticEvent, useRef, useState } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledSwitch } from "styled/StyledSwitch";

// MUI imports
import {
    useTheme,
    SxProps,
    IconButton,
    Dialog,
    Stack,
    Box,
    Divider,
    Collapse,
    Card,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    selectSettings,
    setServer,
    setSettings,
    setSkillDisplay,
    setTheme,
    setWidth,
    SkillDisplay,
    toggleUnreleasedContent,
    Width,
} from "reducers/settings";
import { themeList } from "themes/theme";
import { Region, regions } from "helpers/dates";

// Type imports
import { ThemeNames } from "types/theme";
import { StyledTooltip } from "styled/StyledTooltip";

function Settings() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);
    const themeName = settings.theme;
    const { width, skillDisplay, server, unreleasedContent } = settings;
    const unreleasedContentOld = useRef(unreleasedContent);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const handleSettingsOpen = () => {
        unreleasedContentOld.current = unreleasedContent;
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        dispatch(setSettings(settings));
        if (unreleasedContentOld.current !== unreleasedContent) {
            window.location.reload();
        }
        setSettingsOpen(false);
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleButtonsParams = {
        spacing: 0,
        padding: "4px 12px",
        highlightOnHover: false,
    };

    const settingsBoxStyle: SxProps = {
        display: {
            xs: "block",
            sm: "flex",
        },
        flexGrow: 1,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
    };

    const settingsTextStyle: SxProps = {
        display: {
            xs: "block",
            sm: "flex",
        },
        mb: { xs: "8px", sm: "0px" },
    };

    const settingsList = [
        {
            label: "Theme",
            options: (
                <ToggleButtons
                    buttons={themeButtons}
                    value={themeName}
                    exclusive
                    onChange={(_: BaseSyntheticEvent, newValue: ThemeNames) => {
                        if (newValue !== null) {
                            dispatch(setTheme(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Width",
            options: (
                <ToggleButtons
                    buttons={widthButtons}
                    value={width}
                    exclusive
                    onChange={(_: BaseSyntheticEvent, newValue: Width) => {
                        if (newValue !== null) {
                            dispatch(setWidth(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Skill Display",
            options: (
                <ToggleButtons
                    buttons={skillDisplayButtons}
                    value={skillDisplay}
                    exclusive
                    onChange={(
                        _: BaseSyntheticEvent,
                        newValue: SkillDisplay
                    ) => {
                        if (newValue !== null) {
                            dispatch(setSkillDisplay(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Server",
            options: (
                <ToggleButtons
                    buttons={regionButtons}
                    value={server}
                    exclusive
                    onChange={(_: BaseSyntheticEvent, newValue: Region) => {
                        if (newValue !== null) {
                            dispatch(setServer(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
    ];

    return (
        <>
            <StyledTooltip title="Settings" placement="bottom">
                <IconButton
                    disableRipple
                    disableTouchRipple
                    onClick={handleSettingsOpen}
                    sx={{
                        borderRadius: "8px",
                        px: "2px",
                        width: "36px",
                        height: "36px",
                        color: theme.appbar.color,
                        "&:hover": {
                            backgroundColor: theme.appbar.hover,
                        },
                    }}
                >
                    <SettingsIcon />
                </IconButton>
            </StyledTooltip>
            <Dialog
                open={settingsOpen}
                onClose={handleSettingsClose}
                maxWidth="sm"
                fullWidth
            >
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                    <MainContentBox
                        title="Settings"
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleSettingsClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                        contentProps={{ padding: "16px" }}
                    >
                        <Stack spacing={2} divider={<Divider />}>
                            <Stack spacing={2}>
                                {settingsList.map((setting, index) => (
                                    <Box key={index} sx={settingsBoxStyle}>
                                        <TextStyled sx={settingsTextStyle}>
                                            {setting.label}
                                        </TextStyled>
                                        {setting.options}
                                    </Box>
                                ))}
                            </Stack>
                            {/* TODO: Re-enable in future */}
                            <Box sx={{ display: "none" }}>
                                <Box sx={settingsBoxStyle}>
                                    <Stack direction="row" alignItems="center">
                                        <TextStyled sx={settingsTextStyle}>
                                            Forbidden Knowledge
                                        </TextStyled>
                                        <IconButton
                                            onClick={toggleDropdownState}
                                            disableRipple
                                            disableTouchRipple
                                        >
                                            <HelpIcon
                                                sx={{
                                                    color: theme.text.primary,
                                                }}
                                            />
                                        </IconButton>
                                    </Stack>
                                    <StyledSwitch
                                        checked={unreleasedContent}
                                        onChange={() =>
                                            dispatch(toggleUnreleasedContent())
                                        }
                                    />
                                </Box>
                                <Collapse in={dropdownOpen} timeout="auto">
                                    <Card
                                        sx={{
                                            m: 1,
                                            p: 1,
                                            backgroundColor:
                                                theme.palette.error.dark,
                                        }}
                                    >
                                        <Text component="span" variant="body2">
                                            Enabling this option will allow you
                                            to view content from the game's beta
                                            version.
                                            <br />
                                            Any information from the beta is
                                            heavily subject to change and will
                                            usually be incomplete and/or
                                            inaccurate.
                                            <br />
                                            Please note that updates from the
                                            beta are not done automatically and
                                            may differ from other websites that
                                            you might use.
                                        </Text>
                                    </Card>
                                </Collapse>
                            </Box>
                        </Stack>
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default Settings;

const themeButtons: CustomToggleButtonProps[] = themeList.map((theme) => ({
    value: theme.name,
    label: theme.label,
}));

const widthButtons: CustomToggleButtonProps[] = [
    { value: "standard", label: "Standard" },
    { value: "wide", label: "Wide" },
];

export const skillDisplayButtons: CustomToggleButtonProps[] = [
    { value: "slider", label: "Slider" },
    { value: "table", label: "Table" },
];

const regionButtons: CustomToggleButtonProps[] = objectKeys(regions).map(
    (region) => ({
        value: region,
        label: region,
    })
);
