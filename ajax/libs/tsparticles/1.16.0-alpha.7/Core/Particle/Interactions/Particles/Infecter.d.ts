import type { Particle } from "../../../Particle";
import type { Container } from "../../../Container";
import { IParticlesInteractor } from "../../../Interfaces/IParticlesInteractor";
export declare class Infecter implements IParticlesInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(particle: Particle): boolean;
    reset(particle: Particle): void;
    interact(p1: Particle, delta: number): void;
}
