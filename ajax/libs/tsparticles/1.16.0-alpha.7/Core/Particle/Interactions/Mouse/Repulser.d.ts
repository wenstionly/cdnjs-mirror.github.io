import type { Container } from "../../../Container";
import { Particle } from "../../../Particle";
import { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
export declare class Repulser implements IExternalInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(): boolean;
    reset(particle: Particle): void;
    interact(_delta: number): void;
    private divRepulse;
    private singleDivRepulse;
    private hoverRepulse;
    private processRepulse;
    private clickRepulse;
    private processClickRepulse;
}
