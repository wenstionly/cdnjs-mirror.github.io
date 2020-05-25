import { Limit } from './limit';
import { PxToPercent } from './pxToPercent';
import { Vector1D } from './vector1d';
declare type Params = {
    contentSize: number;
    limit: Limit;
    location: Vector1D;
    pxToPercent: PxToPercent;
    vectors: Vector1D[];
};
export declare type ScrollLooper = {
    loop: (direction: number) => void;
};
export declare function ScrollLooper(params: Params): ScrollLooper;
export {};
