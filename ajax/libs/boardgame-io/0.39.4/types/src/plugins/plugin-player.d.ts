export interface PlayerAPI {
    state: {
        [playerId: string]: object;
    };
    get(): any;
    set(value: any): any;
    opponent?: {
        get(): any;
        set(value: any): any;
    };
}
declare const _default: {
    name: string;
    flush: ({ api }: {
        api: any;
    }) => {
        players: any;
    };
    api: ({ ctx, data }: {
        ctx: any;
        data: any;
    }) => PlayerAPI;
    setup: ({ ctx, game }: {
        ctx: any;
        game: any;
    }) => {
        players: {};
    };
};
/**
 * Plugin that maintains state for each player in G.players.
 * During a turn, G.player will contain the object for the current player.
 * In two player games, G.opponent will contain the object for the other player.
 *
 * @param {function} initPlayerState - Function of type (playerID) => playerState.
 */
export default _default;
