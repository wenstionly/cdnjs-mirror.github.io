"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grabber = void 0;
var Constants_1 = require("../../../../Utils/Constants");
var Utils_1 = require("../../../../Utils/Utils");
var Circle_1 = require("../../../../Utils/Circle");
var ColorUtils_1 = require("../../../../Utils/ColorUtils");
var Grabber = (function () {
    function Grabber() {
    }
    Grabber.grab = function (container, _delta) {
        var _a, _b;
        var options = container.options;
        var interactivity = options.interactivity;
        if (interactivity.events.onHover.enable && container.interactivity.status === Constants_1.Constants.mouseMoveEvent) {
            var mousePos = container.interactivity.mouse.position;
            if (mousePos === undefined) {
                return;
            }
            var distance = container.retina.grabModeDistance;
            var query = container.particles.quadTree.query(new Circle_1.Circle(mousePos.x, mousePos.y, distance));
            for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
                var particle = query_1[_i];
                var pos = particle.getPosition();
                var distance_1 = Utils_1.Utils.getDistance(pos, mousePos);
                if (distance_1 <= container.retina.grabModeDistance) {
                    var grabLineOptions = interactivity.modes.grab.lineLinked;
                    var lineOpacity = grabLineOptions.opacity;
                    var grabDistance = container.retina.grabModeDistance;
                    var opacityLine = lineOpacity - (distance_1 * lineOpacity) / grabDistance;
                    if (opacityLine > 0) {
                        var optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.particlesOptions.lineLinked.color;
                        if (!container.particles.grabLineColor) {
                            container.particles.grabLineColor =
                                (typeof optColor === "string" && optColor === Constants_1.Constants.randomColorValue) ||
                                    ((_b = optColor) === null || _b === void 0 ? void 0 : _b.value) === Constants_1.Constants.randomColorValue ?
                                    Constants_1.Constants.randomColorValue :
                                    (typeof optColor === "string" ?
                                        ColorUtils_1.ColorUtils.stringToRgb(optColor) :
                                        ColorUtils_1.ColorUtils.colorToRgb(optColor));
                        }
                        var colorLine = void 0;
                        if (container.particles.grabLineColor === Constants_1.Constants.randomColorValue) {
                            colorLine = ColorUtils_1.ColorUtils.getRandomRgbColor();
                        }
                        else {
                            colorLine = container.particles.grabLineColor;
                        }
                        if (colorLine === undefined) {
                            return;
                        }
                        container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
                    }
                }
            }
        }
    };
    return Grabber;
}());
exports.Grabber = Grabber;
