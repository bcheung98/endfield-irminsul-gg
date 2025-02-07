import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";
import { Text } from "styled/StyledTypography";
import { useTheme, TypographyProps } from "@mui/material";

export function parseSkillDescription({
    description,
    textVariant = "body1",
    targetClassName = "text-value",
    newClassName,
}: {
    description: string;
    textVariant?: TypographyProps["variant"];
    targetClassName?: string;
    newClassName?: string;
}) {
    const theme = useTheme();
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <Text
                            variant={textVariant}
                            component="span"
                            className={
                                className === targetClassName
                                    ? newClassName
                                    : className
                            }
                            sx={{
                                color: theme.text[
                                    tag as keyof typeof theme.text
                                ],
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.highlight.weight
                                        : theme.font.element.weight,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Text>
                    );
                }
            }
        },
    };

    return parse(description, options);
}
