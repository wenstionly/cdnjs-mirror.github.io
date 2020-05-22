"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonMaskPlugin = void 0;
var PolygonMaskInstance_1 = require("./PolygonMaskInstance");
var PolygonMaskPlugin = (function () {
    function PolygonMaskPlugin() {
        this.id = "polygonMask";
    }
    PolygonMaskPlugin.prototype.getPlugin = function (container) {
        return new PolygonMaskInstance_1.PolygonMaskInstance(container);
    };
    PolygonMaskPlugin.prototype.needsPlugin = function (options) {
        var _a, _b;
        return (_b = (_a = options === null || options === void 0 ? void 0 : options.polygon) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : false;
    };
    return PolygonMaskPlugin;
}());
exports.PolygonMaskPlugin = PolygonMaskPlugin;
