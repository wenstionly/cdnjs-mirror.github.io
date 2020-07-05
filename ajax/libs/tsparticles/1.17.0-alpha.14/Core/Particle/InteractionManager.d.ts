import { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
export declare class InteractionManager {
    private readonly container;
    private readonly externalInteractors;
    private readonly particleInteractors;
    constructor(container: Container);
    init(): void;
    interact(delta: IDelta): void;
    private externalInteract;
    private particlesInteract;
}
