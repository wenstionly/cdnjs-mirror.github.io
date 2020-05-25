import { Limit } from './limit';
import { Vector1D } from './vector1d';
declare type Params = {
    loop: boolean;
    limit: Limit;
    target: Vector1D;
};
export declare type ScrollBy = {
    distance: (n: number) => number;
};
export declare function ScrollBy(params: Params): ScrollBy;
export {};
