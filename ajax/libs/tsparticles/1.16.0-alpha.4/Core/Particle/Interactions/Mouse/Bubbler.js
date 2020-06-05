"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bubbler = void 0;
const Utils_1 = require("../../../../Utils");
const Enums_1 = require("../../../../Enums");
class Bubbler {
    static reset(particle) {
        if (!particle.bubble.inRange) {
            delete particle.bubble.opacity;
            delete particle.bubble.radius;
            delete particle.bubble.color;
        }
    }
    static bubble(container, _delta) {
        const options = container.options;
        const events = options.interactivity.events;
        const onHover = events.onHover;
        const onClick = events.onClick;
        const hoverEnabled = onHover.enable;
        const hoverMode = onHover.mode;
        const clickEnabled = onClick.enable;
        const clickMode = onClick.mode;
        const divs = events.onDiv;
        if (hoverEnabled && Utils_1.Utils.isInArray(Enums_1.HoverMode.bubble, hoverMode)) {
            this.hoverBubble(container);
        }
        else if (clickEnabled && Utils_1.Utils.isInArray(Enums_1.ClickMode.bubble, clickMode)) {
            this.clickBubble(container);
        }
        else {
            if (divs instanceof Array) {
                for (const div of divs) {
                    const divMode = div.mode;
                    const divEnabled = div.enable;
                    if (divEnabled && Utils_1.Utils.isInArray(Enums_1.DivMode.bubble, divMode)) {
                        this.divHover(container, div);
                    }
                }
            }
            else {
                const divMode = divs.mode;
                const divEnabled = divs.enable;
                if (divEnabled && Utils_1.Utils.isInArray(Enums_1.DivMode.bubble, divMode)) {
                    this.divHover(container, divs);
                }
            }
        }
    }
    static divHover(container, div) {
        const ids = div.ids;
        if (ids instanceof Array) {
            for (const id of ids) {
                this.singleDivHover(container, id, div);
            }
        }
        else {
            this.singleDivHover(container, ids, div);
        }
    }
    static singleDivHover(container, id, div) {
        const elem = document.getElementById(id);
        if (!elem) {
            return;
        }
        const pxRatio = container.retina.pixelRatio;
        const pos = {
            x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
        };
        const repulseRadius = (elem.offsetWidth / 2) * pxRatio;
        const area = div.type === Enums_1.DivType.circle
            ? new Utils_1.Circle(pos.x, pos.y, repulseRadius)
            : new Utils_1.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio);
        const query = container.particles.quadTree.query(area);
        for (const particle of query.filter((t) => area.contains(t.getPosition()))) {
            particle.bubble.inRange = true;
            this.hoverBubbleSize(container, particle, 1);
            this.hoverBubbleOpacity(container, particle, 1);
            this.hoverBubbleColor(container, particle);
        }
    }
    static process(container, particle, distMouse, timeSpent, data) {
        const bubbleParam = data.bubbleObj.optValue;
        if (bubbleParam === undefined) {
            return;
        }
        const options = container.options;
        const bubbleDuration = options.interactivity.modes.bubble.duration;
        const bubbleDistance = container.retina.bubbleModeDistance;
        const particlesParam = data.particlesObj.optValue;
        const pObjBubble = data.bubbleObj.value;
        const pObj = data.particlesObj.value || 0;
        const type = data.type;
        if (bubbleParam !== particlesParam) {
            if (!container.bubble.durationEnd) {
                if (distMouse <= bubbleDistance) {
                    const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;
                    if (obj !== bubbleParam) {
                        const value = pObj - (timeSpent * (pObj - bubbleParam)) / bubbleDuration;
                        if (type === Enums_1.ProcessBubbleType.size) {
                            particle.bubble.radius = value;
                        }
                        if (type === Enums_1.ProcessBubbleType.opacity) {
                            particle.bubble.opacity = value;
                        }
                    }
                }
                else {
                    if (type === Enums_1.ProcessBubbleType.size) {
                        delete particle.bubble.radius;
                    }
                    if (type === Enums_1.ProcessBubbleType.opacity) {
                        delete particle.bubble.opacity;
                    }
                }
            }
            else if (pObjBubble) {
                if (type === Enums_1.ProcessBubbleType.size) {
                    delete particle.bubble.radius;
                }
                if (type === Enums_1.ProcessBubbleType.opacity) {
                    delete particle.bubble.opacity;
                }
            }
        }
    }
    static clickBubble(container) {
        var _a;
        const options = container.options;
        const mouseClickPos = container.interactivity.mouse.clickPosition;
        if (mouseClickPos === undefined) {
            return;
        }
        const distance = container.retina.bubbleModeDistance;
        const query = container.particles.quadTree.query(new Utils_1.Circle(mouseClickPos.x, mouseClickPos.y, distance));
        for (const particle of query) {
            particle.bubble.inRange = true;
            const pos = particle.getPosition();
            const distMouse = Utils_1.Utils.getDistance(pos, mouseClickPos);
            const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;
            if (container.bubble.clicking) {
                if (timeSpent > options.interactivity.modes.bubble.duration) {
                    container.bubble.durationEnd = true;
                }
                if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
                    container.bubble.clicking = false;
                    container.bubble.durationEnd = false;
                }
                const sizeData = {
                    bubbleObj: {
                        optValue: container.retina.bubbleModeSize,
                        value: particle.bubble.radius,
                    },
                    particlesObj: {
                        optValue: (_a = particle.sizeValue) !== null && _a !== void 0 ? _a : container.retina.sizeValue,
                        value: particle.size.value,
                    },
                    type: Enums_1.ProcessBubbleType.size,
                };
                this.process(container, particle, distMouse, timeSpent, sizeData);
                const opacityData = {
                    bubbleObj: {
                        optValue: options.interactivity.modes.bubble.opacity,
                        value: particle.bubble.opacity,
                    },
                    particlesObj: {
                        optValue: particle.particlesOptions.opacity.value,
                        value: particle.opacity.value,
                    },
                    type: Enums_1.ProcessBubbleType.opacity,
                };
                this.process(container, particle, distMouse, timeSpent, opacityData);
                if (!container.bubble.durationEnd) {
                    if (distMouse <= container.retina.bubbleModeDistance) {
                        this.hoverBubbleColor(container, particle);
                    }
                    else {
                        delete particle.bubble.color;
                    }
                }
                else {
                    delete particle.bubble.color;
                }
            }
        }
    }
    static hoverBubble(container) {
        const mousePos = container.interactivity.mouse.position;
        if (mousePos === undefined) {
            return;
        }
        const distance = container.retina.bubbleModeDistance;
        const query = container.particles.quadTree.query(new Utils_1.Circle(mousePos.x, mousePos.y, distance));
        for (const particle of query) {
            particle.bubble.inRange = true;
            const pos = particle.getPosition();
            const distance = Utils_1.Utils.getDistance(pos, mousePos);
            const ratio = 1 - distance / container.retina.bubbleModeDistance;
            if (distance <= container.retina.bubbleModeDistance) {
                if (ratio >= 0 && container.interactivity.status === Utils_1.Constants.mouseMoveEvent) {
                    this.hoverBubbleSize(container, particle, ratio);
                    this.hoverBubbleOpacity(container, particle, ratio);
                    this.hoverBubbleColor(container, particle);
                }
            }
            else {
                this.reset(particle);
            }
            if (container.interactivity.status === Utils_1.Constants.mouseLeaveEvent) {
                this.reset(particle);
            }
        }
    }
    static hoverBubbleSize(container, particle, ratio) {
        var _a;
        const modeSize = container.retina.bubbleModeSize;
        if (modeSize === undefined) {
            return;
        }
        const optSize = (_a = particle.sizeValue) !== null && _a !== void 0 ? _a : container.retina.sizeValue;
        const pSize = particle.size.value;
        const size = this.calculateBubbleValue(pSize, modeSize, optSize, ratio);
        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }
    static hoverBubbleOpacity(container, particle, ratio) {
        const options = container.options;
        const modeOpacity = options.interactivity.modes.bubble.opacity;
        if (modeOpacity === undefined) {
            return;
        }
        const optOpacity = particle.particlesOptions.opacity.value;
        const pOpacity = particle.opacity.value;
        const opacity = this.calculateBubbleValue(pOpacity, modeOpacity, optOpacity, ratio);
        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }
    static calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
        if (modeValue > optionsValue) {
            const size = particleValue + (modeValue - optionsValue) * ratio;
            return Utils_1.Utils.clamp(size, particleValue, modeValue);
        }
        else if (modeValue < optionsValue) {
            const size = particleValue - (optionsValue - modeValue) * ratio;
            return Utils_1.Utils.clamp(size, modeValue, particleValue);
        }
    }
    static hoverBubbleColor(container, particle) {
        const options = container.options;
        if (particle.bubble.color === undefined) {
            const modeColor = options.interactivity.modes.bubble.color;
            if (modeColor === undefined) {
                return;
            }
            const bubbleColor = modeColor instanceof Array ? Utils_1.Utils.itemFromArray(modeColor) : modeColor;
            particle.bubble.color = Utils_1.ColorUtils.colorToHsl(bubbleColor);
        }
    }
}
exports.Bubbler = Bubbler;
