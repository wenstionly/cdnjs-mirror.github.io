interface ServerConfig {
    port?: number;
    callback?: Function;
    lobbyConfig?: {
        apiPort: number;
        apiCallback?: Function;
    };
}
/**
 * Build config object from server run arguments.
 */
export declare const createServerRunConfig: (portOrConfig: number | ServerConfig, callback?: Function) => ServerConfig;
/**
 * Instantiate a game server.
 *
 * @param {Array} games - The games that this server will handle.
 * @param {object} db - The interface with the database.
 * @param {object} transport - The interface with the clients.
 * @param {function} authenticateCredentials - Function to test player
 *                                             credentials. Optional.
 * @param {function} generateCredentials - Method for API to generate player
 *                                         credentials. Optional.
 */
export declare function Server({ games, db, transport, authenticateCredentials, generateCredentials, }: any): {
    app: any;
    db: any;
    run: (portOrConfig: number | object, callback?: Function) => Promise<{
        apiServer: any;
        appServer: any;
    }>;
    kill: ({ apiServer, appServer }: any) => void;
};
export {};
