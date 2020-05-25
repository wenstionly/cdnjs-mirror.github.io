import { State, Ctx, GameConfig, Move } from '../types';
/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
export declare function Flow({ moves, phases, endIf, onEnd, turn, events, plugins, }: GameConfig): {
    ctx: (numPlayers: number) => Ctx;
    init: (state: State) => State;
    isPlayerActive: (_G: object, ctx: Ctx, playerID: string) => boolean;
    eventHandlers: {
        endStage: (state: State, playerID: string) => State;
        setStage: (state: State, playerID: string, arg: any) => State;
        endTurn: (state: State, _playerID: string, arg: any) => State;
        pass: (state: State, _playerID: string, arg: any) => State;
        endPhase: (state: State) => State;
        setPhase: (state: State, _playerID: string, newPhase: string) => State;
        endGame: (state: State, _playerID: string, arg: any) => State;
        setActivePlayers: any;
    };
    eventNames: string[];
    enabledEventNames: any[];
    moveMap: {};
    moveNames: unknown[];
    processMove: (state: State, action: {
        playerID: string;
        type: string;
        args: any;
    }) => State;
    processEvent: (state: State, action: {
        type: "GAME_EVENT";
        payload: {
            playerID: string;
            type: string;
            args: any;
        };
    }) => any;
    getMove: (ctx: Ctx, name: string, playerID: string) => Move;
};
