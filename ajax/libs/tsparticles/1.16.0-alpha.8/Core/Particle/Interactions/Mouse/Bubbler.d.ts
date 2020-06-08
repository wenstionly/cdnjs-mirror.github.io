import type { Container } from "../../../Container";
import { Particle } from "../../../Particle";
import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
export declare class Bubbler implements IExternalInteractor {
    private readonly container;
    constructor(container: Container);
    private static calculateBubbleValue;
    isEnabled(): boolean;
    reset(particle: Particle): void;
    interact(): void;
    private divHover;
    private singleDivHover;
    private process;
    private clickBubble;
    private hoverBubble;
    private hoverBubbleSize;
    private hoverBubbleOpacity;
    private hoverBubbleColor;
}
