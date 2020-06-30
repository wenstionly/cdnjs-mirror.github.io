import type { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
import type { Container } from "../../../Container";
export declare class TrailMaker implements IExternalInteractor {
    private readonly container;
    private delay;
    constructor(container: Container);
    interact(delta: number): void;
    isEnabled(): boolean;
    reset(): void;
}
