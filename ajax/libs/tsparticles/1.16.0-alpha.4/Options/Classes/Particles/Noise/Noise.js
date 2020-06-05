"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noise = void 0;
const NoiseDelay_1 = require("./NoiseDelay");
const NoiseFactor_1 = require("./NoiseFactor");
class Noise {
    constructor() {
        this.delay = new NoiseDelay_1.NoiseDelay();
        this.enable = false;
        this.factor = new NoiseFactor_1.NoiseFactor();
    }
    load(data) {
        if (data !== undefined) {
            this.delay.load(data.delay);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.factor.load(data.factor);
        }
    }
}
exports.Noise = Noise;
