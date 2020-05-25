import * as StorageAPI from './db/base';
import { Server, GameConfig } from '../types';
/**
 * Creates a new game.
 *
 * @param {object} db - The storage API.
 * @param {object} game - The game config object.
 * @param {number} numPlayers - The number of players.
 * @param {object} setupData - User-defined object that's available
 *                             during game setup.
 * @param {object } lobbyConfig - Configuration options for the lobby.
 */
export declare const CreateGame: (db: StorageAPI.Sync | StorageAPI.Async, game: GameConfig, numPlayers: number, setupData: object, lobbyConfig: Server.LobbyConfig) => Promise<any>;
export declare const createApiServer: ({ db, games, lobbyConfig, generateCredentials, }: {
    db: any;
    games: any;
    lobbyConfig?: Server.LobbyConfig;
    generateCredentials?: any;
}) => any;
export declare const addApiToServer: ({ app, db, games, lobbyConfig, generateCredentials, }: {
    app: any;
    games: any;
    lobbyConfig?: Server.LobbyConfig;
    generateCredentials?: Function;
    db: StorageAPI.Sync | StorageAPI.Async;
}) => any;
