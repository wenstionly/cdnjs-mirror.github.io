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
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.feathers = void 0;
// @ts-ignore
const uberproto_1 = __importDefault(require("uberproto"));
const application_1 = __importDefault(require("./application"));
const version_1 = __importDefault(require("./version"));
exports.version = version_1.default;
const baseObject = Object.create(null);
function feathers() {
    const app = Object.create(baseObject);
    // Mix in the base application
    uberproto_1.default.mixin(application_1.default, app);
    app.init();
    return app;
}
exports.feathers = feathers;
__exportStar(require("./declarations"), exports);
__exportStar(require("./hooks/index"), exports);
if (typeof module !== 'undefined') {
    module.exports = Object.assign(feathers, module.exports);
}
//# sourceMappingURL=index.js.map