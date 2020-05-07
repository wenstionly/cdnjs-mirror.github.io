import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { Particle } from "../Core/Particle";
export declare abstract class Range {
    readonly position: ICoordinates;
    protected constructor(x: number, y: number);
    abstract contains(point: ICoordinates): boolean;
    abstract intersects(range: Rectangle): boolean;
}
export declare class Point {
    readonly position: ICoordinates;
    readonly particle: Particle;
    constructor(x: number, y: number, particle: Particle);
}
export declare class Circle extends Range {
    readonly radius: number;
    constructor(x: number, y: number, radius: number);
    contains(point: ICoordinates): boolean;
    intersects(range: Rectangle): boolean;
}
export declare class Rectangle extends Range {
    readonly size: IDimension;
    constructor(x: number, y: number, width: number, height: number);
    contains(point: ICoordinates): boolean;
    intersects(range: Rectangle): boolean;
}
export declare class QuadTree {
    readonly rectangle: Rectangle;
    readonly capacity: number;
    readonly points: Point[];
    private northEast?;
    private northWest?;
    private southEast?;
    private southWest?;
    private divided;
    constructor(rectangle: Rectangle, capacity: number);
    subdivide(): void;
    insert(point: Point): boolean;
    query(range: Range, found?: Particle[]): Particle[];
}
