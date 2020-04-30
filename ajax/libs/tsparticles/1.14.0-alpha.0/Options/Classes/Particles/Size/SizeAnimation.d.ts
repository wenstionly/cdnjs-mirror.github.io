import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class SizeAnimation implements ISizeAnimation {
    get size_min(): number;
    set size_min(value: number);
    enable: boolean;
    minimumValue: number;
    speed: number;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<ISizeAnimation>): void;
}
