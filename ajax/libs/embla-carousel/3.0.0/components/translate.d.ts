import { Axis } from './axis';
import { Vector1D } from './vector1d';
declare type Params = {
    axis: Axis;
    container: HTMLElement;
};
export declare type Translate = {
    clear: () => void;
    to: (vector: Vector1D) => void;
};
export declare function Translate(params: Params): Translate;
export {};
