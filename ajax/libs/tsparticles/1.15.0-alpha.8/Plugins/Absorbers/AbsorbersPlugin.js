"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsorbersPlugin = void 0;
var Absorbers_1 = require("./Absorbers");
var Utils_1 = require("../../Utils");
var ClickMode_1 = require("../../Enums/Modes/ClickMode");
var AbsorbersPlugin = (function () {
    function AbsorbersPlugin() {
        this.id = "absorbers";
    }
    AbsorbersPlugin.prototype.getPlugin = function (container) {
        return new Absorbers_1.Absorbers(container);
    };
    AbsorbersPlugin.prototype.needsPlugin = function (options) {
        var _a, _b, _c;
        if (!(options === null || options === void 0 ? void 0 : options.absorbers)) {
            return false;
        }
        var absorbers = options.absorbers;
        var loadAbsorbers = false;
        if (absorbers instanceof Array) {
            if (absorbers.length) {
                loadAbsorbers = true;
            }
        }
        else if (absorbers !== undefined) {
            loadAbsorbers = true;
        }
        else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
            Utils_1.Utils.isInArray(ClickMode_1.ClickMode.absorber, options.interactivity.events.onClick.mode)) {
            loadAbsorbers = true;
        }
        return loadAbsorbers;
    };
    return AbsorbersPlugin;
}());
exports.AbsorbersPlugin = AbsorbersPlugin;
