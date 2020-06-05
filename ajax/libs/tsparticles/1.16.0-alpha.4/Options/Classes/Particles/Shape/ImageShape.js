"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageShape = void 0;
const ShapeBase_1 = require("./ShapeBase");
class ImageShape extends ShapeBase_1.ShapeBase {
    constructor() {
        super();
        this.height = 100;
        this.replaceColor = false;
        this.src = "";
        this.width = 100;
    }
    get replace_color() {
        return this.replaceColor;
    }
    set replace_color(value) {
        this.replaceColor = value;
    }
    load(data) {
        var _a;
        super.load(data);
        if (data !== undefined) {
            if (data.height !== undefined) {
                this.height = data.height;
            }
            const replaceColor = (_a = data.replaceColor) !== null && _a !== void 0 ? _a : data.replace_color;
            if (replaceColor !== undefined) {
                this.replaceColor = replaceColor;
            }
            if (data.src !== undefined) {
                this.src = data.src;
            }
            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
exports.ImageShape = ImageShape;
