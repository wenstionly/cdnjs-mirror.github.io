"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineLinked = void 0;
var LineLinkedShadow_1 = require("./LineLinkedShadow");
var AnimatableColor_1 = require("../AnimatableColor");
var LineLinkedTriangle_1 = require("./LineLinkedTriangle");
var LineLinked = (function () {
    function LineLinked() {
        this.blink = false;
        this.color = new AnimatableColor_1.AnimatableColor();
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.opacity = 1;
        this.shadow = new LineLinkedShadow_1.LineLinkedShadow();
        this.triangles = new LineLinkedTriangle_1.LineLinkedTriangle();
        this.width = 1;
        this.warp = false;
    }
    LineLinked.prototype.load = function (data) {
        if (data !== undefined) {
            if (data.blink !== undefined) {
                this.blink = data.blink;
            }
            this.color = AnimatableColor_1.AnimatableColor.create(this.color, data.color);
            if (data.consent !== undefined) {
                this.consent = data.consent;
            }
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            this.shadow.load(data.shadow);
            this.triangles.load(data.triangles);
            if (data.width !== undefined) {
                this.width = data.width;
            }
            if (data.warp !== undefined) {
                this.warp = data.warp;
            }
        }
    };
    return LineLinked;
}());
exports.LineLinked = LineLinked;
