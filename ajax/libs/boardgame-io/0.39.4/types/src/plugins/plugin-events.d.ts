export interface EventsAPI {
    endGame?(...args: any[]): void;
    endPhase?(...args: any[]): void;
    endStage?(...args: any[]): void;
    endTurn?(...args: any[]): void;
    pass?(...args: any[]): void;
    setActivePlayers?(...args: any[]): void;
    setPhase?(...args: any[]): void;
    setStage?(...args: any[]): void;
}
declare const _default: {
    name: string;
    noClient: ({ api }: {
        api: any;
    }) => any;
    flushRaw: ({ state, api }: {
        state: any;
        api: any;
    }) => any;
    api: ({ game, playerID, ctx }: {
        game: any;
        playerID: any;
        ctx: any;
    }) => any;
};
export default _default;
