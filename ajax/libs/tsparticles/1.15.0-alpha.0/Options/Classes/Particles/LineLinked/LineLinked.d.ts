import type { ILineLinked } from "../../../Interfaces/Particles/LineLinked/ILineLinked";
import { LineLinkedShadow } from "./LineLinkedShadow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { AnimatableColor } from "../AnimatableColor";
export declare class LineLinked implements ILineLinked {
    blink: boolean;
    color: AnimatableColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: LineLinkedShadow;
    width: number;
    warp: boolean;
    constructor();
    load(data?: RecursivePartial<ILineLinked>): void;
}
