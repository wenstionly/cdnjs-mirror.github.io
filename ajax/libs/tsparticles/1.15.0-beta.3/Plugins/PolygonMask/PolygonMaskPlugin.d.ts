import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import { PolygonMaskInstance } from "./PolygonMaskInstance";
import type { Container } from "../../Core/Container";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { IPolygonMaskOptions } from "./Options/Interfaces/IPolygonMaskOptions";
declare class PolygonMaskPlugin implements IPlugin {
    readonly id: string;
    constructor();
    getPlugin(container: Container): PolygonMaskInstance;
    needsPlugin(options?: RecursivePartial<IOptions & IPolygonMaskOptions>): boolean;
}
declare const plugin: PolygonMaskPlugin;
export { IPolygonMaskOptions, plugin as PolygonMaskPlugin };
export * from "./Enums";
