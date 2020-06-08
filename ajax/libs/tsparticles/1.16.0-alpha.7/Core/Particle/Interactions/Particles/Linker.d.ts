import type { Container } from "../../../Container";
import type { Particle } from "../../../Particle";
import type { IParticlesInteractor } from "../../../Interfaces/IParticlesInteractor";
export declare class Linker implements IParticlesInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(particle: Particle): boolean;
    reset(particle: Particle): void;
    interact(p1: Particle, _delta: number): void;
}
