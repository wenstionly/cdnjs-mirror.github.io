import type { IAnimatableColor } from "../../Interfaces/Particles/IAnimatableColor";
import { OptionsColor } from "../OptionsColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { ColorAnimation } from "./ColorAnimation";
export declare class AnimatableColor extends OptionsColor implements IAnimatableColor {
    animation: ColorAnimation;
    constructor();
    load(data?: RecursivePartial<IAnimatableColor>): void;
    static create(source?: AnimatableColor, data?: string | RecursivePartial<IAnimatableColor>): AnimatableColor;
}
