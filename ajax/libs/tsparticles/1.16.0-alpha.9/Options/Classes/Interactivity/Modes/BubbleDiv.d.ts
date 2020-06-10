import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { IBubbleDiv } from "../../../Interfaces/Interactivity/Modes/IBubbleDiv";
export declare class BubbleDiv implements IBubbleDiv {
    ids: SingleOrMultiple<string>;
    distance: number;
    duration: number;
    opacity?: number;
    size?: number;
    color?: SingleOrMultiple<OptionsColor>;
    constructor();
    load(data?: RecursivePartial<IBubbleDiv>): void;
}
