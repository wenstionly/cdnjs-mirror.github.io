"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = (function () {
    function Point(x, y, particle) {
        this.position = {
            x: x,
            y: y,
        };
        this.particle = particle;
    }
    return Point;
}());
exports.Point = Point;
