import type { Container } from "./Container";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IEmitter } from "../Options/Interfaces/Emitters/IEmitter";
import { EmitterSize } from "../Options/Classes/Emitters/EmitterSize";
export declare class Emitter {
    position: ICoordinates;
    size: EmitterSize;
    emitterOptions: IEmitter;
    private readonly container;
    private readonly initialPosition?;
    private startInterval?;
    private lifeCount;
    constructor(container: Container, emitterOptions: IEmitter, position?: ICoordinates);
    emit(): void;
    start(): void;
    stop(): void;
    resize(): void;
    private prepareToDie;
    private destroy;
    private calcPosition;
}
