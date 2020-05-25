import { Direction } from './direction';
import { Vector1D } from './vector1d';
declare type Params = {
    location: Vector1D;
    speed: number;
    mass: number;
};
export declare type ScrollBody = {
    location: Vector1D;
    direction: Direction;
    update: () => void;
    seek: (target: Vector1D) => ScrollBody;
    settle: (target: Vector1D) => boolean;
    useSpeed: (newSpeed: number) => ScrollBody;
    useDefaultSpeed: () => ScrollBody;
    useMass: (newMass: number) => ScrollBody;
    useDefaultMass: () => ScrollBody;
};
export declare function ScrollBody(params: Params): ScrollBody;
export {};
