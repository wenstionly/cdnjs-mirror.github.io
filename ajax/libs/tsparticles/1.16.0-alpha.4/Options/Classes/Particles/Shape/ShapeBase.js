"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeBase = void 0;
class ShapeBase {
    constructor() {
        this.fill = true;
        this.close = true;
    }
    load(data) {
        if (data !== undefined) {
            if (data.fill !== undefined) {
                this.fill = data.fill;
            }
            if (data.particles !== undefined) {
                this.particles = data.particles;
            }
        }
    }
}
exports.ShapeBase = ShapeBase;
