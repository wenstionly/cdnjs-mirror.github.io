import { GameConfig } from '../types';
import { State } from '../types';
/**
 * Creates the initial game state.
 */
export declare function InitializeGame({ game, numPlayers, setupData, }: {
    game: GameConfig;
    numPlayers: number;
    setupData?: any;
}): State;
