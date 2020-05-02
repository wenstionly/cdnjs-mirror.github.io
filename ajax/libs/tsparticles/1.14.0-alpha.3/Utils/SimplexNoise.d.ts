export declare class SimplexNoise {
    private static readonly F2;
    private static readonly G2;
    private static readonly F3;
    private static readonly G3;
    private static readonly F4;
    private static readonly G4;
    private readonly p;
    private readonly perm;
    private readonly permMod12;
    constructor(random?: () => number);
    private static buildPermutationTable;
    private readonly grad3;
    private readonly grad4;
    noise2D(xin: number, yin: number): number;
    noise3D(xin: number, yin: number, zin: number): number;
    noise4D(x: number, y: number, z: number, w: number): number;
}
