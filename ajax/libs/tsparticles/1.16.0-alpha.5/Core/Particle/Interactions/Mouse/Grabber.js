"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grabber = void 0;
const Utils_1 = require("../../../../Utils");
class Grabber {
    static grab(container, _delta) {
        var _a, _b;
        const options = container.options;
        const interactivity = options.interactivity;
        if (interactivity.events.onHover.enable && container.interactivity.status === Utils_1.Constants.mouseMoveEvent) {
            const mousePos = container.interactivity.mouse.position;
            if (mousePos === undefined) {
                return;
            }
            const distance = container.retina.grabModeDistance;
            const query = container.particles.quadTree.query(new Utils_1.Circle(mousePos.x, mousePos.y, distance));
            for (const particle of query) {
                const pos = particle.getPosition();
                const distance = Utils_1.Utils.getDistance(pos, mousePos);
                if (distance <= container.retina.grabModeDistance) {
                    const grabLineOptions = interactivity.modes.grab.links;
                    const lineOpacity = grabLineOptions.opacity;
                    const grabDistance = container.retina.grabModeDistance;
                    const opacityLine = lineOpacity - (distance * lineOpacity) / grabDistance;
                    if (opacityLine > 0) {
                        const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.particlesOptions.links.color;
                        if (!container.particles.grabLineColor) {
                            container.particles.grabLineColor =
                                optColor === Utils_1.Constants.randomColorValue ||
                                    ((_b = optColor) === null || _b === void 0 ? void 0 : _b.value) === Utils_1.Constants.randomColorValue
                                    ? Utils_1.Constants.randomColorValue
                                    : Utils_1.ColorUtils.colorToRgb(optColor);
                        }
                        let colorLine;
                        if (container.particles.grabLineColor === Utils_1.Constants.randomColorValue) {
                            colorLine = Utils_1.ColorUtils.getRandomRgbColor();
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
    }
}
exports.Grabber = Grabber;
