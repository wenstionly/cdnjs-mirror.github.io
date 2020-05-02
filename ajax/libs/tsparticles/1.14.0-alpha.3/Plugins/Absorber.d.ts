import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { Container } from "../Core/Container";
import type { Particle } from "../Core/Particle";
import { IRgb } from "../Core/Interfaces/IRgb";
import { IAbsorber } from "../Options/Interfaces/Absorbers/IAbsorber";
export declare class Absorber {
    color: IRgb;
    limit?: number;
    mass: number;
    opacity: number;
    position: ICoordinates;
    size: number;
    private readonly container;
    private readonly initialPosition?;
    private readonly options;
    constructor(container: Container, options: IAbsorber, position?: ICoordinates);
    attract(particle: Particle): void;
    resize(): void;
    draw(): void;
    private calcPosition;
}
