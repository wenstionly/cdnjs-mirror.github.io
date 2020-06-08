"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repulse = void 0;
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
        }
    }
}
exports.Repulse = Repulse;
