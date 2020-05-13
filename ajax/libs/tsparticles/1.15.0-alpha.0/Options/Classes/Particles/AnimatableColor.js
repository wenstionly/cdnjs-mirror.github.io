"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatableColor = void 0;
var tslib_1 = require("tslib");
var OptionsColor_1 = require("../OptionsColor");
var ColorAnimation_1 = require("./ColorAnimation");
var AnimatableColor = (function (_super) {
    tslib_1.__extends(AnimatableColor, _super);
    function AnimatableColor() {
        var _this = _super.call(this) || this;
        _this.animation = new ColorAnimation_1.ColorAnimation();
        return _this;
    }
    AnimatableColor.prototype.load = function (data) {
        _super.prototype.load.call(this, data);
        this.animation.load(data === null || data === void 0 ? void 0 : data.animation);
    };
    AnimatableColor.create = function (source, data) {
        var color = source !== null && source !== void 0 ? source : new AnimatableColor();
        if (data !== undefined) {
            color.load(typeof data === "string" ? { value: data } : data);
        }
        return color;
    };
    return AnimatableColor;
}(OptionsColor_1.OptionsColor));
exports.AnimatableColor = AnimatableColor;
