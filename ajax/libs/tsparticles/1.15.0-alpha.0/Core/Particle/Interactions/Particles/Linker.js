"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linker = void 0;
var ColorUtils_1 = require("../../../../Utils/ColorUtils");
var Constants_1 = require("../../../../Utils/Constants");
var Utils_1 = require("../../../../Utils/Utils");
var Circle_1 = require("../../../../Utils/Circle");
var CircleWarp_1 = require("../../../../Utils/CircleWarp");
var Linker = (function () {
    function Linker() {
    }
    Linker.link = function (p1, container, _delta) {
        var _a;
        var lineOptions = p1.particlesOptions.lineLinked;
        var optOpacity = lineOptions.opacity;
        var optDistance = (_a = p1.lineLinkedDistance) !== null && _a !== void 0 ? _a : container.retina.lineLinkedDistance;
        var canvasSize = container.canvas.size;
        var warp = lineOptions.warp;
        var pos1 = p1.getPosition();
        var range = warp ?
            new CircleWarp_1.CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) :
            new Circle_1.Circle(pos1.x, pos1.y, optDistance);
        var query = container.particles.quadTree.query(range);
        for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
            var p2 = query_1[_i];
            if (p1 === p2 || !p2.particlesOptions.lineLinked.enable) {
                continue;
            }
            var pos2 = p2.getPosition();
            var distance = Utils_1.Utils.getDistance(pos1, pos2);
            if (warp) {
                if (distance > optDistance) {
                    var pos2NE = {
                        x: pos2.x - canvasSize.width,
                        y: pos2.y,
                    };
                    distance = Utils_1.Utils.getDistance(pos1, pos2NE);
                    if (distance > optDistance) {
                        var pos2SE = {
                            x: pos2.x - canvasSize.width,
                            y: pos2.y - canvasSize.height,
                        };
                        distance = Utils_1.Utils.getDistance(pos1, pos2SE);
                        if (distance > optDistance) {
                            var pos2SW = {
                                x: pos2.x,
                                y: pos2.y - canvasSize.height,
                            };
                            distance = Utils_1.Utils.getDistance(pos1, pos2SW);
                        }
                    }
                }
            }
            if (distance > optDistance) {
                return;
            }
            var opacityLine = optOpacity - (distance * optOpacity) / optDistance;
            if (opacityLine > 0) {
                if (!container.particles.lineLinkedColor) {
                    var optColor = p1.particlesOptions.lineLinked.color;
                    var color = typeof optColor === "string" ? optColor : optColor.value;
                    if (color === Constants_1.Constants.randomColorValue) {
                        if (p1.particlesOptions.lineLinked.consent) {
                            container.particles.lineLinkedColor = ColorUtils_1.ColorUtils.colorToRgb({ value: color });
                        }
                        else if (p1.particlesOptions.lineLinked.blink) {
                            container.particles.lineLinkedColor = Constants_1.Constants.randomColorValue;
                        }
                        else {
                            container.particles.lineLinkedColor = Constants_1.Constants.midColorValue;
                        }
                    }
                    else {
                        container.particles.lineLinkedColor = ColorUtils_1.ColorUtils.colorToRgb({ value: color });
                    }
                }
                if (p2.links.map(function (t) { return t.destination; }).indexOf(p1) == -1 &&
                    p1.links.map(function (t) { return t.destination; }).indexOf(p2) == -1) {
                    p1.links.push({
                        destination: p2,
                        opacity: opacityLine,
                    });
                }
            }
        }
    };
    return Linker;
}());
exports.Linker = Linker;
