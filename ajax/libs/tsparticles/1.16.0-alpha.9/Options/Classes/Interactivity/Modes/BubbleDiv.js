"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleDiv = void 0;
const OptionsColor_1 = require("../../OptionsColor");
class BubbleDiv {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.ids = [];
    }
    load(data) {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.duration !== undefined) {
                this.duration = data.duration;
            }
            if (data.ids !== undefined) {
                this.ids = data.ids;
            }
            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }
            if (data.color !== undefined) {
                if (data.color instanceof Array) {
                    this.color = data.color.map((s) => OptionsColor_1.OptionsColor.create(undefined, s));
                }
                else {
                    if (this.color instanceof Array) {
                        this.color = new OptionsColor_1.OptionsColor();
                    }
                    this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
                }
            }
            if (data.size !== undefined) {
                this.size = data.size;
            }
        }
    }
}
exports.BubbleDiv = BubbleDiv;
