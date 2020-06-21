import type { ITrail } from "../../../Interfaces/Interactivity/Modes/ITrail";
import type { IParticles } from "../../../Interfaces/Particles/IParticles";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Trail implements ITrail {
    delay: number;
    particles?: RecursivePartial<IParticles>;
    quantity: number;
    constructor();
    load(data?: RecursivePartial<ITrail>): void;
}
