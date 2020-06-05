"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = void 0;
const Enums_1 = require("../../../../Enums");
const ImageShape_1 = require("./ImageShape");
const PolygonShape_1 = require("./PolygonShape");
const CharacterShape_1 = require("./CharacterShape");
const Utils_1 = require("../../../../Utils");
class Shape {
    constructor() {
        this.options = {};
        this.character = new CharacterShape_1.CharacterShape();
        this.image = new ImageShape_1.ImageShape();
        this.polygon = new PolygonShape_1.PolygonShape();
        this.type = Enums_1.ShapeType.circle;
    }
    get image() {
        var _a;
        return ((_a = this.options[Enums_1.ShapeType.image]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.images]);
    }
    set image(value) {
        this.options[Enums_1.ShapeType.image] = value;
        this.options[Enums_1.ShapeType.images] = value;
    }
    get custom() {
        return this.options;
    }
    set custom(value) {
        this.options = value;
    }
    get images() {
        return this.image instanceof Array ? this.image : [this.image];
    }
    set images(value) {
        this.image = value;
    }
    get stroke() {
        return [];
    }
    set stroke(_value) {
    }
    get character() {
        var _a;
        return ((_a = this.options[Enums_1.ShapeType.character]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.char]);
    }
    set character(value) {
        this.options[Enums_1.ShapeType.character] = value;
        this.options[Enums_1.ShapeType.char] = value;
    }
    get polygon() {
        var _a;
        return ((_a = this.options[Enums_1.ShapeType.polygon]) !== null && _a !== void 0 ? _a : this.options[Enums_1.ShapeType.star]);
    }
    set polygon(value) {
        this.options[Enums_1.ShapeType.polygon] = value;
        this.options[Enums_1.ShapeType.star] = value;
    }
    load(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (data !== undefined) {
            const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;
            if (options !== undefined) {
                for (const shape in options) {
                    const item = options[shape];
                    if (item !== undefined) {
                        this.options[shape] = Utils_1.Utils.deepExtend((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
                    }
                }
            }
            if (data.character !== undefined) {
                const item = data.character;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        if (this.options[Enums_1.ShapeType.character] instanceof Array) {
                            this.options[Enums_1.ShapeType.character] = Utils_1.Utils.deepExtend((_c = this.options[Enums_1.ShapeType.character]) !== null && _c !== void 0 ? _c : [], item);
                            this.options[Enums_1.ShapeType.char] = Utils_1.Utils.deepExtend((_d = this.options[Enums_1.ShapeType.char]) !== null && _d !== void 0 ? _d : [], item);
                        }
                        else {
                            this.options[Enums_1.ShapeType.character] = Utils_1.Utils.deepExtend([], item);
                            this.options[Enums_1.ShapeType.char] = Utils_1.Utils.deepExtend([], item);
                        }
                    }
                    else {
                        if (this.options[Enums_1.ShapeType.character] instanceof Array) {
                            this.options[Enums_1.ShapeType.character] = Utils_1.Utils.deepExtend({}, item);
                            this.options[Enums_1.ShapeType.char] = Utils_1.Utils.deepExtend({}, item);
                        }
                        else {
                            this.options[Enums_1.ShapeType.character] = Utils_1.Utils.deepExtend((_e = this.options[Enums_1.ShapeType.character]) !== null && _e !== void 0 ? _e : [], item);
                            this.options[Enums_1.ShapeType.char] = Utils_1.Utils.deepExtend((_f = this.options[Enums_1.ShapeType.char]) !== null && _f !== void 0 ? _f : [], item);
                        }
                    }
                }
            }
            if (data.polygon !== undefined) {
                const item = data.polygon;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        if (this.options[Enums_1.ShapeType.polygon] instanceof Array) {
                            this.options[Enums_1.ShapeType.polygon] = Utils_1.Utils.deepExtend((_g = this.options[Enums_1.ShapeType.polygon]) !== null && _g !== void 0 ? _g : [], item);
                            if (this.options[Enums_1.ShapeType.star] === undefined) {
                                this.options[Enums_1.ShapeType.star] = Utils_1.Utils.deepExtend((_h = this.options[Enums_1.ShapeType.star]) !== null && _h !== void 0 ? _h : [], item);
                            }
                        }
                        else {
                            this.options[Enums_1.ShapeType.polygon] = Utils_1.Utils.deepExtend([], item);
                            if (this.options[Enums_1.ShapeType.star] === undefined) {
                                this.options[Enums_1.ShapeType.star] = Utils_1.Utils.deepExtend([], item);
                            }
                        }
                    }
                    else {
                        if (this.options[Enums_1.ShapeType.polygon] instanceof Array) {
                            this.options[Enums_1.ShapeType.polygon] = Utils_1.Utils.deepExtend({}, item);
                            if (this.options[Enums_1.ShapeType.star] === undefined) {
                                this.options[Enums_1.ShapeType.star] = Utils_1.Utils.deepExtend({}, item);
                            }
                        }
                        else {
                            this.options[Enums_1.ShapeType.polygon] = Utils_1.Utils.deepExtend((_j = this.options[Enums_1.ShapeType.polygon]) !== null && _j !== void 0 ? _j : [], item);
                            if (this.options[Enums_1.ShapeType.star] === undefined) {
                                this.options[Enums_1.ShapeType.star] = Utils_1.Utils.deepExtend((_k = this.options[Enums_1.ShapeType.star]) !== null && _k !== void 0 ? _k : [], item);
                            }
                        }
                    }
                }
            }
            if (data.image !== undefined) {
                const item = data.image;
                if (item !== undefined) {
                    if (item instanceof Array) {
                        if (this.options[Enums_1.ShapeType.image] instanceof Array) {
                            this.options[Enums_1.ShapeType.image] = Utils_1.Utils.deepExtend((_l = this.options[Enums_1.ShapeType.image]) !== null && _l !== void 0 ? _l : [], item);
                            this.options[Enums_1.ShapeType.images] = Utils_1.Utils.deepExtend((_m = this.options[Enums_1.ShapeType.images]) !== null && _m !== void 0 ? _m : [], item);
                        }
                        else {
                            this.options[Enums_1.ShapeType.image] = Utils_1.Utils.deepExtend([], item);
                            this.options[Enums_1.ShapeType.images] = Utils_1.Utils.deepExtend([], item);
                        }
                    }
                    else {
                        if (this.options[Enums_1.ShapeType.image] instanceof Array) {
                            this.options[Enums_1.ShapeType.image] = Utils_1.Utils.deepExtend({}, item);
                            this.options[Enums_1.ShapeType.images] = Utils_1.Utils.deepExtend({}, item);
                        }
                        else {
                            this.options[Enums_1.ShapeType.image] = Utils_1.Utils.deepExtend((_o = this.options[Enums_1.ShapeType.image]) !== null && _o !== void 0 ? _o : [], item);
                            this.options[Enums_1.ShapeType.images] = Utils_1.Utils.deepExtend((_p = this.options[Enums_1.ShapeType.images]) !== null && _p !== void 0 ? _p : [], item);
                        }
                    }
                }
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    }
}
exports.Shape = Shape;
