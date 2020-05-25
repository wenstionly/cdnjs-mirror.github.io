import Koa from 'koa';
import { Server as ServerTypes, GameConfig, StorageAPI } from '../types';
export declare type KoaServer = ReturnType<Koa['listen']>;
interface ServerConfig {
    port?: number;
    callback?: () => void;
    lobbyConfig?: {
        apiPort: number;
        apiCallback?: () => void;
    };
}
/**
 * Build config object from server run arguments.
 */
export declare const createServerRunConfig: (portOrConfig: number | ServerConfig, callback?: () => void) => ServerConfig;
interface ServerOpts {
    games: GameConfig[];
    db?: StorageAPI.Async | StorageAPI.Sync;
    transport?: any;
    authenticateCredentials?: ServerTypes.AuthenticateCredentials;
    generateCredentials?: ServerTypes.GenerateCredentials;
}
/**
 * Instantiate a game server.
 *
 * @param games - The games that this server will handle.
 * @param db - The interface with the database.
 * @param transport - The interface with the clients.
 * @param authenticateCredentials - Function to test player credentials.
 * @param generateCredentials - Method for API to generate player credentials.
 */
export declare function Server({ games, db, transport, authenticateCredentials, generateCredentials, }: ServerOpts): {
    app: any;
    db: StorageAPI.Async | StorageAPI.Sync;
    run: (portOrConfig: number | object, callback?: () => void) => Promise<{
        apiServer: any;
        appServer: any;
    }>;
    kill: (servers: {
        apiServer?: any;
        appServer: any;
    }) => void;
};
export {};
