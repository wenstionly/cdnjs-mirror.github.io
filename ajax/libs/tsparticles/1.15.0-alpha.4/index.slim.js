"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pJSDom = exports.particlesJS = exports.tsParticles = void 0;
var tslib_1 = require("tslib");
var Loader_1 = require("./Core/Loader");
var ShapeType_1 = require("./Enums/ShapeType");
var LineDrawer_1 = require("./ShapeDrawers/LineDrawer");
var CircleDrawer_1 = require("./ShapeDrawers/CircleDrawer");
var SquareDrawer_1 = require("./ShapeDrawers/SquareDrawer");
var TriangleDrawer_1 = require("./ShapeDrawers/TriangleDrawer");
var StarDrawer_1 = require("./ShapeDrawers/StarDrawer");
var PolygonDrawer_1 = require("./ShapeDrawers/PolygonDrawer");
var TextDrawer_1 = require("./ShapeDrawers/TextDrawer");
var ImageDrawer_1 = require("./ShapeDrawers/ImageDrawer");
var Utils_1 = require("./Utils");
var Main = (function () {
    function Main() {
        this.initialized = false;
        if (typeof window !== "undefined" && window) {
            window.customRequestAnimationFrame = (function () {
                return (window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    (function (callback) { return window.setTimeout(callback, 1000 / 60); }));
            })();
            window.customCancelRequestAnimationFrame = (function () {
                return (window.cancelAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    window.mozCancelRequestAnimationFrame ||
                    window.oCancelRequestAnimationFrame ||
                    window.msCancelRequestAnimationFrame ||
                    clearTimeout);
            })();
        }
        var squareDrawer = new SquareDrawer_1.SquareDrawer();
        var textDrawer = new TextDrawer_1.TextDrawer();
        var imageDrawer = new ImageDrawer_1.ImageDrawer();
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.line, new LineDrawer_1.LineDrawer());
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.circle, new CircleDrawer_1.CircleDrawer());
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.edge, squareDrawer);
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.square, squareDrawer);
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.triangle, new TriangleDrawer_1.TriangleDrawer());
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.star, new StarDrawer_1.StarDrawer());
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.polygon, new PolygonDrawer_1.PolygonDrawer());
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.char, textDrawer);
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.character, textDrawer);
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.image, imageDrawer);
        Utils_1.Plugins.addShapeDrawer(ShapeType_1.ShapeType.images, imageDrawer);
    }
    Main.prototype.init = function () {
        if (!this.initialized) {
            this.initialized = true;
        }
    };
    Main.prototype.loadFromArray = function (tagId, params, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, Loader_1.Loader.loadFromArray(tagId, params, index)];
            });
        });
    };
    Main.prototype.load = function (tagId, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, Loader_1.Loader.load(tagId, params)];
            });
        });
    };
    Main.prototype.loadJSON = function (tagId, pathConfigJson) {
        return Loader_1.Loader.loadJSON(tagId, pathConfigJson);
    };
    Main.prototype.setOnClickHandler = function (callback) {
        Loader_1.Loader.setOnClickHandler(callback);
    };
    Main.prototype.dom = function () {
        return Loader_1.Loader.dom();
    };
    Main.prototype.domItem = function (index) {
        return Loader_1.Loader.domItem(index);
    };
    Main.prototype.addShape = function (shape, drawer, init, afterEffect, destroy) {
        var customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                draw: drawer,
                destroy: destroy,
                init: init,
            };
        }
        else {
            customDrawer = drawer;
        }
        Utils_1.Plugins.addShapeDrawer(shape, customDrawer);
    };
    Main.prototype.addPreset = function (preset, options) {
        Utils_1.Plugins.addPreset(preset, options);
    };
    Main.prototype.addPlugin = function (plugin) {
        Utils_1.Plugins.addPlugin(plugin);
    };
    return Main;
}());
var tsParticles = new Main();
exports.tsParticles = tsParticles;
var particlesJS = function (tagId, params) {
    return tsParticles.load(tagId, params);
};
exports.particlesJS = particlesJS;
particlesJS.load = function (tagId, pathConfigJson, callback) {
    tsParticles.loadJSON(tagId, pathConfigJson).then(function (container) {
        if (container) {
            callback(container);
        }
    });
};
particlesJS.setOnClickHandler = function (callback) {
    tsParticles.setOnClickHandler(callback);
};
var pJSDom = tsParticles.dom();
exports.pJSDom = pJSDom;
