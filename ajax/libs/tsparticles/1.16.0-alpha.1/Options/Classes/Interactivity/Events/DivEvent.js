"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivEvent = void 0;
var Enums_1 = require("../../../../Enums");
var DivEvent = (function () {
    function DivEvent() {
        this.ids = [];
        this.enable = false;
        this.mode = [];
        this.type = Enums_1.DivType.circle;
    }
    Object.defineProperty(DivEvent.prototype, "elementId", {
        get: function () {
            return this.ids;
        },
        set: function (value) {
            this.ids = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DivEvent.prototype, "el", {
        get: function () {
            return this.elementId;
        },
        set: function (value) {
            this.elementId = value;
        },
        enumerable: false,
        configurable: true
    });
    DivEvent.prototype.load = function (data) {
        var _a, _b;
        if (data !== undefined) {
            var ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;
            if (ids !== undefined) {
                this.ids = ids;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
            if (data.type !== undefined) {
                this.type = data.type;
            }
        }
    };
    return DivEvent;
}());
exports.DivEvent = DivEvent;
