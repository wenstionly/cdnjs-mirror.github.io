"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterShape = void 0;
const ShapeBase_1 = require("./ShapeBase");
class CharacterShape extends ShapeBase_1.ShapeBase {
    constructor() {
        super();
        this.font = "Verdana";
        this.style = "";
        this.value = "*";
        this.weight = "400";
    }
    load(data) {
        super.load(data);
        if (data !== undefined) {
            if (data.font !== undefined) {
                this.font = data.font;
            }
            if (data.style !== undefined) {
                this.style = data.style;
            }
            if (data.value !== undefined) {
                this.value = data.value;
            }
            if (data.weight !== undefined) {
                this.weight = data.weight;
            }
        }
    }
}
exports.CharacterShape = CharacterShape;
