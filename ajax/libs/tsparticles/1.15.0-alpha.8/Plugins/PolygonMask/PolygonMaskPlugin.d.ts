import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import type { Container } from "../../Core/Container";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IPolygonMask } from "./Options/Interfaces/IPolygonMask";
declare type IPolygonMaskOptions = IOptions & {
    polygon: IPolygonMask;
};
export declare class PolygonMaskPlugin implements IPlugin {
    readonly id: string;
    constructor();
    getPlugin(container: Container): PolygonMaskInstance;
    needsPlugin(options?: RecursivePartial<IPolygonMaskOptions>): boolean;
}
export {};
