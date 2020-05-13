"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasUtils = void 0;
var ColorUtils_1 = require("./ColorUtils");
var Utils_1 = require("./Utils");
var CanvasUtils = (function () {
    function CanvasUtils() {
    }
    CanvasUtils.paintBase = function (context, dimension, baseColor) {
        context.save();
        context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
        context.restore();
    };
    CanvasUtils.clear = function (context, dimension) {
        context.clearRect(0, 0, dimension.width, dimension.height);
    };
    CanvasUtils.drawLinkedLine = function (context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, colorLine, opacity, shadow) {
        context.beginPath();
        var distance = Utils_1.Utils.getDistance(begin, end);
        if (distance <= maxDistance) {
            context.moveTo(begin.x, begin.y);
            context.lineTo(end.x, end.y);
        }
        else if (warp) {
            var endNE = {
                x: end.x - canvasSize.width,
                y: end.y,
            };
            distance = Utils_1.Utils.getDistance(begin, endNE);
            if (distance <= maxDistance) {
                var dx = begin.x - (end.x - canvasSize.width);
                var dy = begin.y - end.y;
                var yi = begin.y - ((dy / dx) * begin.x);
                context.moveTo(begin.x, begin.y);
                context.lineTo(0, yi);
                context.moveTo(end.x, end.y);
                context.lineTo(canvasSize.width, yi);
            }
            else {
                var endSW = {
                    x: end.x,
                    y: end.y - canvasSize.height,
                };
                distance = Utils_1.Utils.getDistance(begin, endSW);
                if (distance <= maxDistance) {
                    var dx = begin.x - end.x;
                    var dy = begin.y - (end.y - canvasSize.height);
                    var yi = begin.y - ((dy / dx) * begin.x);
                    var xi = -yi / (dy / dx);
                    context.moveTo(begin.x, begin.y);
                    context.lineTo(xi, 0);
                    context.moveTo(end.x, end.y);
                    context.lineTo(xi, canvasSize.height);
                }
                else {
                    var endSE = {
                        x: end.x - canvasSize.width,
                        y: end.y - canvasSize.height,
                    };
                    distance = Utils_1.Utils.getDistance(begin, endSE);
                    if (distance <= maxDistance) {
                        var dx = begin.x - (end.x - canvasSize.width);
                        var dy = begin.y - (end.y - canvasSize.height);
                        var yi = begin.y - ((dy / dx) * begin.x);
                        var xi = -yi / (dy / dx);
                        context.moveTo(begin.x, begin.y);
                        context.lineTo(xi, yi);
                        context.moveTo(end.x, end.y);
                        context.lineTo(xi + canvasSize.width, yi + canvasSize.height);
                    }
                }
            }
        }
        context.closePath();
        context.lineWidth = width;
        if (backgroundMask) {
            context.globalCompositeOperation = 'destination-out';
        }
        context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorLine, opacity);
        if (shadow.enable) {
            var shadowColor = typeof shadow.color === "string" ?
                ColorUtils_1.ColorUtils.stringToRgb(shadow.color) :
                ColorUtils_1.ColorUtils.colorToRgb(shadow.color);
            if (shadowColor) {
                context.shadowBlur = shadow.blur;
                context.shadowColor = ColorUtils_1.ColorUtils.getStyleFromRgb(shadowColor);
            }
        }
        context.stroke();
    };
    CanvasUtils.drawConnectLine = function (context, width, lineStyle, begin, end) {
        context.save();
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.stroke();
        context.restore();
    };
    CanvasUtils.gradient = function (context, p1, p2, opacity) {
        var gradStop = Math.floor(p2.size.value / p1.size.value);
        if (!p1.color || !p2.color) {
            return;
        }
        var sourcePos = p1.getPosition();
        var destPos = p2.getPosition();
        var midRgb = ColorUtils_1.ColorUtils.mix(p1.color, p2.color, p1.size.value, p2.size.value);
        var grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
        grad.addColorStop(0, ColorUtils_1.ColorUtils.getStyleFromHsl(p1.color, opacity));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, ColorUtils_1.ColorUtils.getStyleFromRgb(midRgb, opacity));
        grad.addColorStop(1, ColorUtils_1.ColorUtils.getStyleFromHsl(p2.color, opacity));
        return grad;
    };
    CanvasUtils.drawGrabLine = function (context, width, begin, end, colorLine, opacity) {
        context.save();
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
        context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorLine, opacity);
        context.lineWidth = width;
        context.stroke();
        context.restore();
    };
    CanvasUtils.drawParticle = function (container, context, particle, delta, colorValue, backgroundMask, radius, opacity, shadow) {
        var pos = particle.getPosition();
        context.save();
        context.translate(pos.x, pos.y);
        context.beginPath();
        if (particle.angle !== 0) {
            context.rotate(particle.angle * Math.PI / 180);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }
        var shadowColor = particle.shadowColor;
        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils_1.ColorUtils.getStyleFromRgb(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }
        context.fillStyle = colorValue;
        var stroke = particle.stroke;
        if (stroke.width > 0 && particle.strokeColor) {
            context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(particle.strokeColor, particle.stroke.opacity);
            context.lineWidth = stroke.width;
        }
        this.drawShape(container, context, particle, radius, opacity, delta);
        if (particle.close) {
            context.closePath();
        }
        if (stroke.width > 0 && particle.strokeColor) {
            context.stroke();
        }
        if (particle.fill) {
            context.fill();
        }
        context.restore();
        context.save();
        context.translate(pos.x, pos.y);
        if (particle.angle !== 0) {
            context.rotate(particle.angle * Math.PI / 180);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }
        this.drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
        context.restore();
    };
    CanvasUtils.drawShape = function (container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        var drawer = container.drawers[particle.shape];
        if (!drawer) {
            return;
        }
        drawer.draw(context, particle, radius, opacity, delta);
    };
    CanvasUtils.drawShapeAfterEffect = function (container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        var drawer = container.drawers[particle.shape];
        if (!drawer) {
            return;
        }
        if (drawer.afterEffect !== undefined) {
            drawer.afterEffect(context, particle, radius, opacity, delta);
        }
    };
    CanvasUtils.drawPlugin = function (context, plugin, delta) {
        context.save();
        if (plugin.draw !== undefined) {
            plugin.draw(context, delta);
        }
        context.restore();
    };
    return CanvasUtils;
}());
exports.CanvasUtils = CanvasUtils;
