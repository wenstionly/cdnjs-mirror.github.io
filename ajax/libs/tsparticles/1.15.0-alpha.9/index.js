"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsParticles = exports.pJSDom = exports.particlesJS = void 0;
var index_slim_1 = require("./index.slim");
Object.defineProperty(exports, "particlesJS", { enumerable: true, get: function () { return index_slim_1.particlesJS; } });
Object.defineProperty(exports, "pJSDom", { enumerable: true, get: function () { return index_slim_1.pJSDom; } });
Object.defineProperty(exports, "tsParticles", { enumerable: true, get: function () { return index_slim_1.tsParticles; } });
require("./Plugins/Absorbers/AbsorbersPlugin");
require("./Plugins/Emitters/EmittersPlugin");
require("./Plugins/PolygonMask/PolygonMaskPlugin");
__exportStar(require("./Enums"), exports);
