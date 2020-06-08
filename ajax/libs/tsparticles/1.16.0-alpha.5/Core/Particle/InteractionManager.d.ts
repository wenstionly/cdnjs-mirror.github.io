import { Container } from "../Container";
export declare class InteractionManager {
    private readonly container;
    private interactionsEnabled;
    constructor(container: Container);
    init(): void;
    interact(delta: number): void;
    private mouseInteract;
    private particlesInteract;
}
