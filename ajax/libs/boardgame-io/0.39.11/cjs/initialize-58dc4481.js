'use strict';

var game = require('./game-4b284c1b.js');

/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Creates the initial game state.
 */
function InitializeGame({ game: game$1, numPlayers, setupData, }) {
    game$1 = game.ProcessGameConfig(game$1);
    if (!numPlayers) {
        numPlayers = 2;
    }
    let ctx = game$1.flow.ctx(numPlayers);
    let state = {
        // User managed state.
        G: {},
        // Framework managed state.
        ctx,
        // Plugin related state.
        plugins: {},
    };
    // Run plugins over initial state.
    state = game.Setup(state, { game: game$1 });
    state = game.Enhance(state, { game: game$1, playerID: undefined });
    const enhancedCtx = game.EnhanceCtx(state);
    state.G = game$1.setup(enhancedCtx, setupData);
    let initial = {
        ...state,
        // List of {G, ctx} pairs that can be undone.
        _undo: [],
        // List of {G, ctx} pairs that can be redone.
        _redo: [],
        // A monotonically non-decreasing ID to ensure that
        // state updates are only allowed from clients that
        // are at the same version that the server.
        _stateID: 0,
    };
    initial = game$1.flow.init(initial);
    initial = game.Flush(initial, { game: game$1 });
    return initial;
}

exports.InitializeGame = InitializeGame;
