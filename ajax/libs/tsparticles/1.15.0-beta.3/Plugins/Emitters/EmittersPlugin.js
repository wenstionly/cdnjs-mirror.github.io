"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmittersPlugin = void 0;
var Utils_1 = require("../../Utils");
var Emitters_1 = require("./Emitters");
var index_slim_1 = require("../../index.slim");
var Enums_1 = require("./Enums");
var EmittersPlugin = (function () {
    function EmittersPlugin() {
        this.id = "emitters";
    }
    EmittersPlugin.prototype.getPlugin = function (container) {
        return new Emitters_1.Emitters(container);
    };
    EmittersPlugin.prototype.needsPlugin = function (options) {
        var _a, _b, _c;
        if (!(options === null || options === void 0 ? void 0 : options.emitters)) {
            return false;
        }
        var emitters = options.emitters;
        var loadEmitters = false;
        if (emitters instanceof Array) {
            if (emitters.length) {
                loadEmitters = true;
            }
        }
        else if (emitters !== undefined) {
            loadEmitters = true;
        }
        else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
            Utils_1.Utils.isInArray(Enums_1.EmitterClickMode.emitter, options.interactivity.events.onClick.mode)) {
            loadEmitters = true;
        }
        return loadEmitters;
    };
    return EmittersPlugin;
}());
var plugin = new EmittersPlugin();
exports.EmittersPlugin = plugin;
index_slim_1.tsParticles.addPlugin(plugin);
__exportStar(require("./Enums"), exports);
