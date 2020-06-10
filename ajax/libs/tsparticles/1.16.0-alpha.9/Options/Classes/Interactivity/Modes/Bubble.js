"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bubble = void 0;
const OptionsColor_1 = require("../../OptionsColor");
const BubbleDiv_1 = require("./BubbleDiv");
class Bubble {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }
    load(data) {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.duration !== undefined) {
                this.duration = data.duration;
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
            if (data.divs !== undefined) {
                if (data.divs instanceof Array) {
                    this.divs = data.divs.map((s) => {
                        const tmp = new BubbleDiv_1.BubbleDiv();
                        tmp.load(s);
                        return tmp;
                    });
                }
                else {
                    if (this.divs instanceof Array || !this.divs) {
                        this.divs = new BubbleDiv_1.BubbleDiv();
                    }
                    this.divs.load(data.divs);
                }
            }
        }
    }
}
exports.Bubble = Bubble;
