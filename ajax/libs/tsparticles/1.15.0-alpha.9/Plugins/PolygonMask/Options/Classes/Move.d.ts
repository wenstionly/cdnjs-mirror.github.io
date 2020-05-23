import type { IPolygonMaskMove } from "../Interfaces/IPolygonMaskMove";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { PolygonMaskMoveType } from "../../Enums/PolygonMaskMoveType";
export declare class Move implements IPolygonMaskMove {
    radius: number;
    type: PolygonMaskMoveType;
    constructor();
    load(data?: RecursivePartial<IPolygonMaskMove>): void;
}
