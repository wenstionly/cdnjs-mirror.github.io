import { Particle } from "../../../Particle";
import type { Container } from "../../../Container";
import type { IParticlesInteractor } from "../../../Interfaces/IParticlesInteractor";
export declare class Collider implements IParticlesInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(particle: Particle): boolean;
    reset(particle: Particle): void;
    interact(p1: Particle, _delta: number): void;
    private static getRadius;
    private resolveCollision;
    private static rotate;
    private static collisionVelocity;
    private absorb;
    private static bounce;
    private static destroy;
}
