import type { ILineLinkedTriangle } from "../../../Interfaces/Particles/LineLinked/ILineLinkedTriangle";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class LineLinkedTriangle implements ILineLinkedTriangle {
    color?: OptionsColor;
    enable: boolean;
    opacity?: number;
    constructor();
    load(data?: RecursivePartial<ILineLinkedTriangle>): void;
}
