import type { IPolygonMaskDrawStroke } from "../Interfaces/IPolygonMaskDrawStroke";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../../../Options/Classes/OptionsColor";
export declare class PolygonMaskDrawStroke implements IPolygonMaskDrawStroke {
    color: OptionsColor;
    width: number;
    opacity: number;
    constructor();
    load(data?: RecursivePartial<IPolygonMaskDrawStroke>): void;
}
