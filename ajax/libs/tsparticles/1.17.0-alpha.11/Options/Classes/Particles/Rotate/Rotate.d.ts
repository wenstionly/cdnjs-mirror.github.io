import type { IRotate } from "../../../Interfaces/Particles/Rotate/IRotate";
import { RotateAnimation } from "./RotateAnimation";
import { RotateDirection } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
export declare class Rotate implements IRotate, IOptionLoader<IRotate> {
    animation: RotateAnimation;
    direction: RotateDirection;
    path: boolean;
    random: boolean;
    value: number;
    constructor();
    load(data?: RecursivePartial<IRotate>): void;
}
