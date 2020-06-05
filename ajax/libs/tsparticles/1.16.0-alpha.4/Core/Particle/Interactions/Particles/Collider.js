"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collider = void 0;
const Utils_1 = require("../../../../Utils");
const Enums_1 = require("../../../../Enums");
class Collider {
    static collide(p1, container, _delta) {
        const pos1 = p1.getPosition();
        const query = container.particles.quadTree.query(new Utils_1.Circle(pos1.x, pos1.y, p1.size.value * 2));
        for (const p2 of query) {
            if (p1 === p2 ||
                !p2.particlesOptions.collisions.enable ||
                p1.particlesOptions.collisions.mode !== p2.particlesOptions.collisions.mode) {
                continue;
            }
            const pos2 = p2.getPosition();
            const dist = Utils_1.Utils.getDistance(pos1, pos2);
            const defaultSize = container.retina.sizeValue;
            const radius1 = this.getRadius(p1, defaultSize);
            const radius2 = this.getRadius(p2, defaultSize);
            const distP = radius1 + radius2;
            if (dist <= distP) {
                this.resolveCollision(p1, p2, container);
            }
        }
    }
    static getRadius(particle, fallback) {
        return particle.bubble.radius || particle.size.value || fallback;
    }
    static resolveCollision(p1, p2, container) {
        const pos1 = p1.getPosition();
        const pos2 = p2.getPosition();
        const fps = container.options.fpsLimit / 1000;
        switch (p1.particlesOptions.collisions.mode) {
            case Enums_1.CollisionMode.absorb: {
                if (p1.size.value === undefined && p2.size.value !== undefined) {
                    p1.destroy();
                }
                else if (p1.size.value !== undefined && p2.size.value === undefined) {
                    p2.destroy();
                }
                else if (p1.size.value !== undefined && p2.size.value !== undefined) {
                    if (p1.size.value >= p2.size.value) {
                        const factor = Utils_1.Utils.clamp(p1.size.value / p2.size.value, 0, p2.size.value) * fps;
                        p1.size.value += factor;
                        p2.size.value -= factor;
                        if (p2.size.value <= container.retina.pixelRatio) {
                            p2.size.value = 0;
                            p2.destroy();
                        }
                    }
                    else {
                        const factor = Utils_1.Utils.clamp(p2.size.value / p1.size.value, 0, p1.size.value) * fps;
                        p1.size.value -= factor;
                        p2.size.value += factor;
                        if (p1.size.value <= container.retina.pixelRatio) {
                            p1.size.value = 0;
                            p1.destroy();
                        }
                    }
                }
                break;
            }
            case Enums_1.CollisionMode.bounce: {
                const xVelocityDiff = p1.velocity.horizontal - p2.velocity.horizontal;
                const yVelocityDiff = p1.velocity.vertical - p2.velocity.vertical;
                const xDist = pos2.x - pos1.x;
                const yDist = pos2.y - pos1.y;
                if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
                    const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
                    const m1 = p1.size.value;
                    const m2 = p2.size.value;
                    const u1 = this.rotate(p1.velocity, angle);
                    const u2 = this.rotate(p2.velocity, angle);
                    const v1 = this.collisionVelocity(u1, u2, m1, m2);
                    const v2 = this.collisionVelocity(u2, u1, m1, m2);
                    const vFinal1 = this.rotate(v1, -angle);
                    const vFinal2 = this.rotate(v2, -angle);
                    p1.velocity.horizontal = vFinal1.horizontal;
                    p1.velocity.vertical = vFinal1.vertical;
                    p2.velocity.horizontal = vFinal2.horizontal;
                    p2.velocity.vertical = vFinal2.vertical;
                }
                break;
            }
            case Enums_1.CollisionMode.destroy: {
                if (p1.size.value === undefined && p2.size.value !== undefined) {
                    p1.destroy();
                }
                else if (p1.size.value !== undefined && p2.size.value === undefined) {
                    p2.destroy();
                }
                else if (p1.size.value !== undefined && p2.size.value !== undefined) {
                    if (p1.size.value >= p2.size.value) {
                        p2.destroy();
                    }
                    else {
                        p1.destroy();
                    }
                }
                break;
            }
        }
    }
    static rotate(velocity, angle) {
        return {
            horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
            vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle),
        };
    }
    static collisionVelocity(v1, v2, m1, m2) {
        return {
            horizontal: (v1.horizontal * (m1 - m2)) / (m1 + m2) + (v2.horizontal * 2 * m2) / (m1 + m2),
            vertical: v1.vertical,
        };
    }
}
exports.Collider = Collider;
