import { GameConfig } from '../types';
declare type ProcessedGameConfig = GameConfig & {
    flow: object;
    moveNames: string[];
    processMove: Function;
};
/**
 * Game
 *
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */
export declare function Game(game: GameConfig | ProcessedGameConfig): ProcessedGameConfig;
export {};
