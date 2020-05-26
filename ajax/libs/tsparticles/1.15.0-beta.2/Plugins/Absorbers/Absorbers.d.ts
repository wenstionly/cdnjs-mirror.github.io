import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { AbsorberInstance } from "./AbsorberInstance";
import { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import { Absorber } from "./Options/Classes/Absorber";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IInteractivity } from "../../Options/Interfaces/Interactivity/IInteractivity";
import type { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes";
declare type AbsorberOptions = IOptions & {
    absorbers: SingleOrMultiple<Absorber>;
    interactivity: IInteractivity & {
        modes: IModes & {
            absorbers: SingleOrMultiple<Absorber>;
        };
    };
};
export declare class Absorbers implements IContainerPlugin {
    readonly container: Container;
    array: AbsorberInstance[];
    absorbers: SingleOrMultiple<Absorber>;
    interactivityAbsorbers: SingleOrMultiple<Absorber>;
    constructor(container: Container);
    init(options?: RecursivePartial<AbsorberOptions>): void;
    particleUpdate(particle: Particle, delta: number): void;
    draw(context: CanvasRenderingContext2D): void;
    stop(): void;
    resize(): void;
    handleClickMode(mode: string): void;
    addAbsorber(absorber: AbsorberInstance): void;
    removeAbsorber(absorber: AbsorberInstance): void;
}
export {};
