import type { IRepulse } from "../../../Interfaces/Interactivity/Modes/IRepulse";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { RepulseDiv } from "./RepulseDiv";
export declare class Repulse implements IRepulse {
    distance: number;
    duration: number;
    speed: number;
    divs?: SingleOrMultiple<RepulseDiv>;
    constructor();
    load(data?: RecursivePartial<IRepulse>): void;
}
