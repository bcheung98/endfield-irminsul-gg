import { styled, Tabs, Tab, Box, TabsProps, TabProps } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div hidden={value !== index} {...other}>
            {value === index && <Box sx={{ px: 3, py: 1.5 }}>{children}</Box>}
        </div>
    );
}

export const StyledTabs = styled((props: TabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{
            children: <span className="MuiTabs-indicatorSpan" />,
        }}
    />
))(({ theme }) => ({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        width: "100%",
        backgroundColor: theme.text.selected,
    },
}));

export const StyledTab = styled((props: TabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: "none",
    "&.Mui-selected": {
        color: theme.text.selected,
    },
}));
