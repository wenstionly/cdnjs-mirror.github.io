import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Absorbers } from "./Absorbers";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { IAbsorberOptions } from "./Options/Interfaces/IAbsorberOptions";
import { IOptions } from "../../Options/Interfaces/IOptions";
declare class AbsorbersPlugin implements IPlugin {
    readonly id: string;
    constructor();
    getPlugin(container: Container): Absorbers;
    needsPlugin(options?: RecursivePartial<IOptions & IAbsorberOptions>): boolean;
}
declare const plugin: AbsorbersPlugin;
export { IAbsorberOptions, plugin as AbsorbersPlugin };
export * from "./Enums";
