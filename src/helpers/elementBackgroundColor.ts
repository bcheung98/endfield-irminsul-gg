import { Element } from "types/_common";

export function elementBackgroundColor(element: Element) {
    switch (element) {
        case "Cryo":
            return "rgb(15, 152, 165)";
        case "Electric":
            return "rgb(196, 156, 13)";
        case "Heat":
            return "rgb(255, 88, 63)";
        case "Nature":
            return "rgb(104, 145, 3)";
        case "Physical":
        default:
            return "rgb(133, 133, 133)";
    }
}
