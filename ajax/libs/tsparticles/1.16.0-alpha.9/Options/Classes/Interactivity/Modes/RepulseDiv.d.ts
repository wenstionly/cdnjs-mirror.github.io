import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import type { IRepulseDiv } from "../../../Interfaces/Interactivity/Modes/IRepulseDiv";
export declare class RepulseDiv implements IRepulseDiv {
    ids: SingleOrMultiple<string>;
    distance: number;
    duration: number;
    speed: number;
    constructor();
    load(data?: RecursivePartial<IRepulseDiv>): void;
}
