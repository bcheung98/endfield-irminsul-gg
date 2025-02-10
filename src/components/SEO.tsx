import { Helmet } from "react-helmet-async";

const DOCTITLE = "Arknights: Endfield - Irminsul.GG";
const DESCRIPTION =
    "The Arknights: Endfield branch of Irminsul.GG - a database and companion website for various gacha games.";
const NAME = "endfield.irminsul.gg";

interface SEOProps {
    title?: string;
    description?: string;
    name?: string;
}

function SEO({ title, description = DESCRIPTION, name = NAME }: SEOProps) {
    if (title) {
        title = `${title} - ${DOCTITLE}`;
    } else {
        title = DOCTITLE;
    }

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="website" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
}

export default SEO;
