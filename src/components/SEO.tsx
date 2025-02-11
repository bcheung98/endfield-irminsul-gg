import { Helmet } from "react-helmet-async";

const TITLE = `${import.meta.env.VITE_GAME_NAME} - Irminsul.GG`;
const DESCRIPTION = `The ${
    import.meta.env.VITE_GAME_NAME
} branch of Irminsul.GG - a database and companion website for various gacha games.`;
const NAME = `Irminsul.GG`;
const ICON = `https://assets.irminsul.gg/main/icons/${
    import.meta.env.VITE_GAME_TAG
}.png`;

interface SEOProps {
    title?: string;
    description?: string;
    name?: string;
    icon?: string;
}

function SEO({
    title,
    description = DESCRIPTION,
    name = NAME,
    icon,
}: SEOProps) {
    if (title) {
        title = `${title} - ${TITLE}`;
    } else {
        title = TITLE;
    }

    if (icon) {
        icon = `https://assets.irminsul.gg/${import.meta.env.VITE_GAME_TAG.toLowerCase()}/${icon}.png`;
    } else {
        icon = ICON;
    }

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={icon} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={icon} />
        </Helmet>
    );
}

export default SEO;
