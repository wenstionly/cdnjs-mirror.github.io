import type { Container } from "../../../Container";
import { Particle } from "../../../Particle";
import { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
export declare class Grabber implements IExternalInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(): boolean;
    reset(particle: Particle): void;
    interact(_delta: number): void;
}
