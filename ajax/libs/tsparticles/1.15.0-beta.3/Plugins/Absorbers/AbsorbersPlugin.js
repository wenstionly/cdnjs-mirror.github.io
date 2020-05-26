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
exports.AbsorbersPlugin = void 0;
var Absorbers_1 = require("./Absorbers");
var Utils_1 = require("../../Utils");
var index_slim_1 = require("../../index.slim");
var Enums_1 = require("./Enums");
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
            Utils_1.Utils.isInArray(Enums_1.AbsorberClickMode.absorber, options.interactivity.events.onClick.mode)) {
            loadAbsorbers = true;
        }
        return loadAbsorbers;
    };
    return AbsorbersPlugin;
}());
var plugin = new AbsorbersPlugin();
exports.AbsorbersPlugin = plugin;
index_slim_1.tsParticles.addPlugin(plugin);
__exportStar(require("./Enums"), exports);
