"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrabLineLinked = void 0;
var OptionsColor_1 = require("../../OptionsColor");
var GrabLineLinked = (function () {
    function GrabLineLinked() {
        this.opacity = 1;
    }
    GrabLineLinked.prototype.load = function (data) {
        if (data !== undefined) {
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            if (data.color !== undefined) {
                this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
            }
        }
    };
    return GrabLineLinked;
}());
exports.GrabLineLinked = GrabLineLinked;
