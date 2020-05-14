"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineLinkedTriangle = void 0;
var OptionsColor_1 = require("../../OptionsColor");
var LineLinkedTriangle = (function () {
    function LineLinkedTriangle() {
        this.enable = false;
    }
    LineLinkedTriangle.prototype.load = function (data) {
        if (data !== undefined) {
            if (data.color !== undefined) {
                this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
        }
    };
    return LineLinkedTriangle;
}());
exports.LineLinkedTriangle = LineLinkedTriangle;
