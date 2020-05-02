import type { IPlugin } from "../Core/Interfaces/IPlugin";
import { Absorber } from "./Absorber";
import { Container } from "../Core/Container";
import { Particle } from "../Core/Particle";
import { ClickMode } from "../Enums/Modes/ClickMode";
export declare class Absorbers implements IPlugin {
    readonly container: Container;
    array: Absorber[];
    constructor(container: Container);
    init(): void;
    particleUpdate(particle: Particle): void;
    draw(context: CanvasRenderingContext2D): void;
    stop(): void;
    resize(): void;
    handleClickMode(mode: ClickMode | string): void;
}
