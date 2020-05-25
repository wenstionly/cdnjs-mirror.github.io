'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var game = require('./game-4b284c1b.js');
require('immer');

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * PlayerView reducers.
 */
const PlayerView = {
    /**
     * STRIP_SECRETS
     *
     * Reducer which removes a key named `secret` and
     * removes all the keys in `players`, except for the one
     * corresponding to the current playerID.
     */
    STRIP_SECRETS: (G, ctx, playerID) => {
        let r = { ...G };
        if (r.secret !== undefined) {
            delete r.secret;
        }
        if (r.players) {
            r.players = {
                [playerID]: r.players[playerID],
            };
        }
        return r;
    },
};

exports.ActivePlayers = game.ActivePlayers;
exports.INVALID_MOVE = game.INVALID_MOVE;
exports.Stage = game.Stage;
exports.TurnOrder = game.TurnOrder;
exports.PlayerView = PlayerView;
