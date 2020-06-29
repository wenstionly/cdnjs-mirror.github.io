import { PlayerID, CredentialedActionShape, State, Store, SyncInfo } from '../../types';
export declare type MetadataCallback = (metadata: SyncInfo['filteredMetadata']) => void;
export interface TransportOpts {
    store?: Store;
    gameName?: string;
    playerID?: PlayerID;
    gameID?: string;
    numPlayers?: number;
}
export declare abstract class Transport {
    store: Store;
    gameName: string;
    playerID: PlayerID | null;
    gameID: string;
    numPlayers: number;
    constructor({ store, gameName, playerID, gameID, numPlayers, }: TransportOpts);
    abstract onAction(state: State, action: CredentialedActionShape.Any): void;
    abstract connect(): void;
    abstract disconnect(): void;
    abstract subscribe(fn: () => void): void;
    abstract subscribeGameMetadata(fn: MetadataCallback): void;
    abstract updateGameID(id: string): void;
    abstract updatePlayerID(id: PlayerID): void;
}
