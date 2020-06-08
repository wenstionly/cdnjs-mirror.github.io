"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interactions = void 0;
const Linker_1 = require("./Linker");
const Attractor_1 = require("./Attractor");
const Collider_1 = require("./Collider");
const Infecter_1 = require("./Infecter");
class Interactions {
    static interact(p1, container, delta) {
        if (p1.particlesOptions.links.enable) {
            Linker_1.Linker.link(p1, container, delta);
        }
        if (p1.particlesOptions.move.attract.enable) {
            Attractor_1.Attractor.attract(p1, container, delta);
        }
        if (p1.particlesOptions.collisions.enable) {
            Collider_1.Collider.collide(p1, container, delta);
        }
        if (container.options.infection.enable) {
            Infecter_1.Infecter.infect(p1, container, delta);
        }
    }
}
exports.Interactions = Interactions;
