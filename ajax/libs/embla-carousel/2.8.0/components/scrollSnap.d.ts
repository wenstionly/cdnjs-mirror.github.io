import { Alignment } from './alignment';
declare type Params = {
    snapSizes: number[];
    alignment: Alignment;
    loop: boolean;
};
export declare type ScrollSnap = {
    measure: (snapSize: number, index: number) => number;
};
export declare function ScrollSnap(params: Params): ScrollSnap;
export {};
