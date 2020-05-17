"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Linker = void 0;
var Utils_1 = require("../../../../Utils");
var Linker = (function () {
    function Linker() {
    }
    Linker.link = function (p1, container, _delta) {
        var _a;
        var lineOptions = p1.particlesOptions.links;
        var optOpacity = lineOptions.opacity;
        var optDistance = (_a = p1.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance;
        var canvasSize = container.canvas.size;
        var warp = lineOptions.warp;
        var pos1 = p1.getPosition();
        var range = warp
            ? new Utils_1.CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
            : new Utils_1.Circle(pos1.x, pos1.y, optDistance);
        var query = container.particles.quadTree.query(range);
        for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
            var p2 = query_1[_i];
            if (p1 === p2 || !p2.particlesOptions.links.enable) {
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
                if (!container.particles.linksColor) {
                    var optColor = p1.particlesOptions.links.color;
                    var color = typeof optColor === "string" ? optColor : optColor.value;
                    if (color === Utils_1.Constants.randomColorValue) {
                        if (p1.particlesOptions.links.consent) {
                            container.particles.linksColor = Utils_1.ColorUtils.colorToRgb({
                                value: color,
                            });
                        }
                        else if (p1.particlesOptions.links.blink) {
                            container.particles.linksColor = Utils_1.Constants.randomColorValue;
                        }
                        else {
                            container.particles.linksColor = Utils_1.Constants.midColorValue;
                        }
                    }
                    else {
                        container.particles.linksColor = Utils_1.ColorUtils.colorToRgb({
                            value: color,
                        });
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
