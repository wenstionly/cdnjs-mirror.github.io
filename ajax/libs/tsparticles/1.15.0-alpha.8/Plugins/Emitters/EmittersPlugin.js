"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmittersPlugin = void 0;
var Utils_1 = require("../../Utils");
var ClickMode_1 = require("../../Enums/Modes/ClickMode");
var Emitters_1 = require("./Emitters");
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
            Utils_1.Utils.isInArray(ClickMode_1.ClickMode.absorber, options.interactivity.events.onClick.mode)) {
            loadEmitters = true;
        }
        return loadEmitters;
    };
    return EmittersPlugin;
}());
exports.EmittersPlugin = EmittersPlugin;
