import type { IPlugin } from "../Core/Interfaces/IPlugin";
import { Container } from "../Core/Container";
import { Particle } from "../Core/Particle";
import { ClickMode } from "../Enums/Modes/ClickMode";
export declare class Absorbers implements IPlugin {
    private readonly container;
    private absorbers;
    constructor(container: Container);
    init(): void;
    particleUpdate(particle: Particle): void;
    draw(): void;
    reset(): void;
    resize(): void;
    handleClickMode(mode: ClickMode | string): void;
}
