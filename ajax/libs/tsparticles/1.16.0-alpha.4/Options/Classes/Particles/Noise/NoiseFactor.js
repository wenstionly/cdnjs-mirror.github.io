"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoiseFactor = void 0;
const NoiseValue_1 = require("./NoiseValue");
class NoiseFactor {
    constructor() {
        this.horizontal = new NoiseValue_1.NoiseValue();
        this.horizontal.value = 50;
        this.horizontal.offset = 0;
        this.vertical = new NoiseValue_1.NoiseValue();
        this.vertical.value = 10;
        this.vertical.offset = 40000;
    }
    load(data) {
        if (data !== undefined) {
            this.horizontal.load(data.horizontal);
            this.vertical.load(data.vertical);
        }
    }
}
exports.NoiseFactor = NoiseFactor;
