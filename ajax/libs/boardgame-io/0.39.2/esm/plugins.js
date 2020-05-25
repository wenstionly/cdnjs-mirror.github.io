/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that maintains state for each player in G.players.
 * During a turn, G.player will contain the object for the current player.
 * In two player games, G.opponent will contain the object for the other player.
 *
 * @param {function} initPlayerState - Function of type (playerID) => playerState.
 */
var pluginPlayer = {
  name: 'player',
  flush: function flush(_ref) {
    var api = _ref.api;
    return {
      players: api.state
    };
  },
  api: function api(_ref2) {
    var ctx = _ref2.ctx,
        data = _ref2.data;
    var state = data.players;
    var result = {
      state: state
    };

    var get = function get() {
      return data.players[ctx.currentPlayer];
    };

    result.get = get;

    var set = function set(value) {
      return state[ctx.currentPlayer] = value;
    };

    result.set = set;

    if (ctx.numPlayers === 2) {
      var other = ctx.currentPlayer === '0' ? '1' : '0';

      var _get = function _get() {
        return data.players[other];
      };

      var _set = function _set(value) {
        return state[other] = value;
      };

      result.opponent = {
        get: _get,
        set: _set
      };
    }

    return result;
  },
  setup: function setup(_ref3) {
    var ctx = _ref3.ctx,
        game = _ref3.game;
    var players = {};

    for (var i = 0; i < ctx.numPlayers; i++) {
      var playerState = {};

      if (game.playerSetup !== undefined) {
        playerState = game.playerSetup(i + '');
      }

      players[i + ''] = playerState;
    }

    return {
      players: players
    };
  }
};

export { pluginPlayer as PluginPlayer };
