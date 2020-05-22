import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Emitters } from "./Emitters";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { Emitter } from "./Options/Classes/Emitter";
declare type EmitterOptions = IOptions & {
    emitters: SingleOrMultiple<Emitter>;
};
export declare class EmittersPlugin implements IPlugin {
    readonly id: string;
    constructor();
    getPlugin(container: Container): Emitters;
    needsPlugin(options?: RecursivePartial<EmitterOptions>): boolean;
}
export {};
