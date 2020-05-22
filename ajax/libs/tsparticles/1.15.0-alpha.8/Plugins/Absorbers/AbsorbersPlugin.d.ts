import type { IPlugin } from "../../Core/Interfaces/IPlugin";
import type { Container } from "../../Core/Container";
import { Absorbers } from "./Absorbers";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { Absorber } from "./Options/Classes/Absorber";
import { IInteractivity } from "../../Options/Interfaces/Interactivity/IInteractivity";
import { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes";
declare type AbsorberOptions = IOptions & {
    absorbers: SingleOrMultiple<Absorber>;
    interactivity: IInteractivity & {
        modes: IModes & {
            absorbers: SingleOrMultiple<Absorber>;
        };
    };
};
export declare class AbsorbersPlugin implements IPlugin {
    readonly id: string;
    constructor();
    getPlugin(container: Container): Absorbers;
    needsPlugin(options?: RecursivePartial<AbsorberOptions>): boolean;
}
export {};
