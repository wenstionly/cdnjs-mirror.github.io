"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepulseDiv = void 0;
class RepulseDiv {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.ids = [];
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
            if (data.ids !== undefined) {
                this.ids = data.ids;
            }
            if (data.speed !== undefined) {
                this.speed = data.speed;
            }
        }
    }
}
exports.RepulseDiv = RepulseDiv;
