// Component imports
import Image from "./Image";

// Helper imports
import { elementBackgroundColor } from "helpers/elementBackgroundColor";

// Type imports
import { Element } from "types/_common";

interface ElementIconProps {
    element: Element;
    size?: string;
    padding?: string;
    borderRadius?: string;
    disableTooltip?: boolean;
}

function ElementIcon({
    element,
    size = "64px",
    padding = "0px",
    borderRadius = "4px",
    disableTooltip,
}: ElementIconProps) {
    return (
        <Image
            src={`elements/${element}`}
            alt={element}
            style={{
                width: size,
                height: size,
                padding: padding,
                backgroundColor: elementBackgroundColor(element),
                borderRadius: borderRadius,
            }}
            tooltip={!disableTooltip ? element : ""}
        />
    );
}

export default ElementIcon;
