import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import { EmitterInstance } from "./EmitterInstance";
import type { Container } from "../../Core/Container";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { Emitter } from "./Options/Classes/Emitter";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple";
import { IInteractivity } from "../../Options/Interfaces/Interactivity/IInteractivity";
import { IModes } from "../../Options/Interfaces/Interactivity/Modes/IModes";
declare type EmitterOptions = IOptions & {
    emitters: SingleOrMultiple<Emitter>;
    interactivity: IInteractivity & {
        modes: IModes & {
            emitters: SingleOrMultiple<Emitter>;
        };
    };
};
export declare class Emitters implements IContainerPlugin {
    readonly container: Container;
    array: EmitterInstance[];
    emitters: SingleOrMultiple<Emitter>;
    interactivityEmitters: SingleOrMultiple<Emitter>;
    constructor(container: Container);
    init(options?: RecursivePartial<EmitterOptions>): void;
    play(): void;
    pause(): void;
    stop(): void;
    handleClickMode(mode: string): void;
    resize(): void;
    addEmitter(emitter: EmitterInstance): void;
    removeEmitter(emitter: EmitterInstance): void;
}
export {};
