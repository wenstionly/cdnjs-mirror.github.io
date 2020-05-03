"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorUtils_1 = require("../../../../Utils/ColorUtils");
var Constants_1 = require("../../../../Utils/Constants");
var QuadTree_1 = require("../../../../Utils/QuadTree");
var Utils_1 = require("../../../../Utils/Utils");
var Linker = (function () {
    function Linker() {
    }
    Linker.link = function (p1, container, _delta) {
        var _a;
        var optOpacity = p1.particlesOptions.lineLinked.opacity;
        var optDistance = (_a = p1.lineLinkedDistance) !== null && _a !== void 0 ? _a : container.retina.lineLinkedDistance;
        var pos1 = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y,
        };
        var query = container.particles.quadTree.query(new QuadTree_1.Circle(pos1.x, pos1.y, optDistance));
        for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
            var p2 = query_1[_i];
            if (p1 === p2 || !p2.particlesOptions.lineLinked.enable) {
                continue;
            }
            var pos2 = {
                x: p2.position.x + p2.offset.x,
                y: p2.position.y + p2.offset.y,
            };
            var distance = Utils_1.Utils.getDistanceBetweenCoordinates(pos1, pos2);
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
                if (p2.links.indexOf(p1) == -1 && p1.links.indexOf(p2) == -1) {
                    p1.links.push(p2);
                    container.canvas.drawLinkedLine(p1, p2, opacityLine);
                }
            }
        }
    };
    return Linker;
}());
exports.Linker = Linker;
