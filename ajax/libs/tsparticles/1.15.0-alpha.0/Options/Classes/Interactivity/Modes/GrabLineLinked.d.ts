import type { IGrabLineLinked } from "../../../Interfaces/Interactivity/Modes/IGrabLineLinked";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
export declare class GrabLineLinked implements IGrabLineLinked {
    opacity: number;
    color?: OptionsColor;
    constructor();
    load(data?: RecursivePartial<IGrabLineLinked>): void;
}
