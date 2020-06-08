import type { Container } from "../../../Container";
import { Particle } from "../../../Particle";
import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
export declare class Bubbler implements IExternalInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(): boolean;
    reset(particle: Particle): void;
    interact(_delta: number): void;
    private divHover;
    private singleDivHover;
    private process;
    private clickBubble;
    private hoverBubble;
    private hoverBubbleSize;
    private hoverBubbleOpacity;
    private static calculateBubbleValue;
    private hoverBubbleColor;
}
