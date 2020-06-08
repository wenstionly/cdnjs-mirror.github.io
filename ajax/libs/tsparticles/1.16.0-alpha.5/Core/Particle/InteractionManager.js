"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionManager = void 0;
const Utils_1 = require("../../Utils");
const Modes_1 = require("../../Enums/Modes");
const Grabber_1 = require("./Interactions/Mouse/Grabber");
const Repulser_1 = require("./Interactions/Mouse/Repulser");
const Bubbler_1 = require("./Interactions/Mouse/Bubbler");
const Connector_1 = require("./Interactions/Mouse/Connector");
const Interactions_1 = require("./Interactions/Particles/Interactions");
class InteractionManager {
    constructor(container) {
        this.container = container;
        this.interactionsEnabled = false;
    }
    init() {
        const options = this.container.options;
        this.interactionsEnabled =
            options.particles.links.enable ||
                options.particles.move.attract.enable ||
                options.particles.collisions.enable ||
                options.infection.enable;
    }
    interact(delta) {
        this.mouseInteract(delta);
        this.particlesInteract(delta);
    }
    mouseInteract(delta) {
        const container = this.container;
        const mouse = container.interactivity.mouse;
        const events = container.options.interactivity.events;
        const divs = container.options.interactivity.events.onDiv;
        let divEnabled;
        let divRepulse;
        let divBubble;
        if (divs instanceof Array) {
            const modes = divs.filter((t) => t.enable).map((t) => t.mode);
            divEnabled = modes.length > 0;
            divRepulse = modes.find((t) => Utils_1.Utils.isInArray(Modes_1.DivMode.repulse, t)) !== undefined;
            divBubble = modes.find((t) => Utils_1.Utils.isInArray(Modes_1.DivMode.bubble, t)) !== undefined;
        }
        else {
            divEnabled = divs.enable;
            divRepulse = Utils_1.Utils.isInArray(Modes_1.DivMode.repulse, divs.mode);
            divBubble = Utils_1.Utils.isInArray(Modes_1.DivMode.bubble, divs.mode);
        }
        if (!(divEnabled || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;
        if (Utils_1.Utils.isInArray(Modes_1.HoverMode.grab, hoverMode)) {
            Grabber_1.Grabber.grab(container, delta);
        }
        if (Utils_1.Utils.isInArray(Modes_1.HoverMode.repulse, hoverMode) ||
            Utils_1.Utils.isInArray(Modes_1.ClickMode.repulse, clickMode) ||
            divRepulse) {
            Repulser_1.Repulser.repulse(container, delta);
        }
        if (Utils_1.Utils.isInArray(Modes_1.HoverMode.bubble, hoverMode) || Utils_1.Utils.isInArray(Modes_1.ClickMode.bubble, clickMode) || divBubble) {
            Bubbler_1.Bubbler.bubble(container, delta);
        }
        if (Utils_1.Utils.isInArray(Modes_1.HoverMode.connect, hoverMode)) {
            Connector_1.Connector.connect(container, delta);
        }
    }
    particlesInteract(delta) {
        const container = this.container;
        for (const particle of container.particles.array) {
            Bubbler_1.Bubbler.reset(particle);
            if (this.interactionsEnabled) {
                Interactions_1.Interactions.interact(particle, container, delta);
            }
        }
    }
}
exports.InteractionManager = InteractionManager;
