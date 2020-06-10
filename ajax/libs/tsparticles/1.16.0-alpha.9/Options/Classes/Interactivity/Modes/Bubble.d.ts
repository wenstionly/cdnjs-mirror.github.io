import type { IBubble } from "../../../Interfaces/Interactivity/Modes/IBubble";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { BubbleDiv } from "./BubbleDiv";
export declare class Bubble implements IBubble {
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
    color?: SingleOrMultiple<OptionsColor>;
    divs?: SingleOrMultiple<BubbleDiv>;
    constructor();
    load(data?: RecursivePartial<IBubble>): void;
}
