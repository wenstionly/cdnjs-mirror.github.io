export interface RandomAPI {
    D4(): number;
    D4(diceCount: number): number[];
    D6(): number;
    D6(diceCount: number): number[];
    D10(): number;
    D10(diceCount: number): number[];
    D12(): number;
    D12(diceCount: number): number[];
    D20(): number;
    D20(diceCount: number): number[];
    Die(spotvalue?: number): number;
    Die(spotvalue: number, diceCount: number): number[];
    Number(): number;
    Shuffle<T>(deck: T[]): T[];
}
declare const _default: {
    name: string;
    noClient: ({ api }: {
        api: any;
    }) => any;
    flush: ({ api }: {
        api: any;
    }) => any;
    api: ({ data }: {
        data: any;
    }) => any;
    setup: ({ game }: {
        game: any;
    }) => {
        seed: any;
    };
};
export default _default;
