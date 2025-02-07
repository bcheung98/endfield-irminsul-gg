import { TextStyled } from "styled/StyledTypography";
import { TypographyProps } from "@mui/material";
import { range } from "helpers/utils";
import { Rarity } from "types/_common";

function RarityStars({
    rarity,
    variant = "body1-styled",
}: {
    rarity: Rarity;
    variant?: TypographyProps["variant"];
}) {
    return (
        <TextStyled
            component="span"
            variant={variant}
            sx={(theme) => ({
                color: theme.text.star,
                textShadow: "#e3721b 1px 1px 16px",
                userSelect: "none",
            })}
        >
            {range(rarity).map((_) => "★")}
        </TextStyled>
    );
}

export default RarityStars;
