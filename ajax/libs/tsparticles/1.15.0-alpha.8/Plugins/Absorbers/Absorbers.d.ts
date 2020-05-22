import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { AbsorberInstance } from "./AbsorberInstance";
import { Container } from "../../Core/Container";
import type { Particle } from "../../Core/Particle";
import { ClickMode } from "../../Enums/Modes/ClickMode";
import { Absorber } from "./Options/Classes/Absorber";
import { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { IOptions } from "../../Options/Interfaces/IOptions";
import { RecursivePartial } from "../../Types/RecursivePartial";
import { IInteractivity } from "../../Options/Interfaces/Interactivity/IInteractivity";
import { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes";
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
    handleClickMode(mode: ClickMode | string): void;
    addAbsorber(absorber: AbsorberInstance): void;
    removeAbsorber(absorber: AbsorberInstance): void;
}
export {};
