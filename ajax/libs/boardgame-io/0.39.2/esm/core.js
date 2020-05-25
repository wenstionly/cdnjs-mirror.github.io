import { k as _objectSpread2, b as _defineProperty } from './reducer-3b554105.js';
export { q as ActivePlayers, I as INVALID_MOVE, t as Stage, T as TurnOrder } from './reducer-3b554105.js';
import 'immer';

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
var PlayerView = {
  /**
   * STRIP_SECRETS
   *
   * Reducer which removes a key named `secret` and
   * removes all the keys in `players`, except for the one
   * corresponding to the current playerID.
   */
  STRIP_SECRETS: function STRIP_SECRETS(G, ctx, playerID) {
    var r = _objectSpread2({}, G);

    if (r.secret !== undefined) {
      delete r.secret;
    }

    if (r.players) {
      r.players = _defineProperty({}, playerID, r.players[playerID]);
    }

    return r;
  }
};

export { PlayerView };
