import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { Particle } from "../Core/Particle";
import { IRgb } from "../Core/Interfaces/IRgb";
import { IAbsorber } from "../Options/Interfaces/Absorbers/IAbsorber";
import { Absorbers } from "./Absorbers";
export declare class Absorber {
    color: IRgb;
    limit?: number;
    mass: number;
    opacity: number;
    position: ICoordinates;
    size: number;
    private readonly absorbers;
    private readonly container;
    private readonly initialPosition?;
    private readonly options;
    constructor(absorbers: Absorbers, options: IAbsorber, position?: ICoordinates);
    attract(particle: Particle): void;
    resize(): void;
    draw(context: CanvasRenderingContext2D): void;
    private calcPosition;
}
