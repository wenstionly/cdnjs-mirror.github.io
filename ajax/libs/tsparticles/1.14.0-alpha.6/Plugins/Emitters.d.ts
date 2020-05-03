import { IPlugin } from "../Core/Interfaces/IPlugin";
import { Emitter } from "./Emitter";
import { Container } from "../Core/Container";
import { ClickMode } from "../Enums/Modes/ClickMode";
export declare class Emitters implements IPlugin {
    readonly container: Container;
    array: Emitter[];
    constructor(container: Container);
    init(): void;
    play(): void;
    pause(): void;
    stop(): void;
    handleClickMode(mode: ClickMode | string): void;
    resize(): void;
}
