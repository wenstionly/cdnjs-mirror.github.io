export declare type Alignments = 'start' | 'center' | 'end';
declare type Params = {
    viewSize: number;
    align: Alignments;
};
export declare type Alignment = {
    measure: (n: number) => number;
};
export declare function Alignment(params: Params): Alignment;
export {};
