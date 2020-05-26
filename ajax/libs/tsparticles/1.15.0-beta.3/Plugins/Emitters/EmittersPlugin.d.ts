import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Emitters } from "./Emitters";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { IEmitterOptions } from "./Options/Interfaces/IEmitterOptions";
declare class EmittersPlugin implements IPlugin {
    readonly id: string;
    constructor();
    getPlugin(container: Container): Emitters;
    needsPlugin(options?: RecursivePartial<IOptions & IEmitterOptions>): boolean;
}
declare const plugin: EmittersPlugin;
export { IEmitterOptions, plugin as EmittersPlugin };
export * from "./Enums";
