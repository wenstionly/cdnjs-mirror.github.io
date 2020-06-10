"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repulse = void 0;
const RepulseDiv_1 = require("./RepulseDiv");
class Repulse {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.speed = 1;
    }
    load(data) {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }
            if (data.duration !== undefined) {
                this.duration = data.duration;
            }
            if (data.speed !== undefined) {
                this.speed = data.speed;
            }
            if (data.divs !== undefined) {
                if (data.divs instanceof Array) {
                    this.divs = data.divs.map((s) => {
                        const tmp = new RepulseDiv_1.RepulseDiv();
                        tmp.load(s);
                        return tmp;
                    });
                }
                else {
                    if (this.divs instanceof Array || !this.divs) {
                        this.divs = new RepulseDiv_1.RepulseDiv();
                    }
                    this.divs.load(data.divs);
                }
            }
        }
    }
}
exports.Repulse = Repulse;
