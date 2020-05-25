import { ChunkSize } from './chunkSize';
import { Limit } from './limit';
import { Vector1D } from './vector1d';
declare type Params = {
    chunkSize: ChunkSize;
    contentSize: number;
    limit: Limit;
    location: Vector1D;
    vectors: Vector1D[];
};
export declare type ScrollLooper = {
    loop: (direction: number) => void;
};
export declare function ScrollLooper(params: Params): ScrollLooper;
export {};
