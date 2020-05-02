"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuadTree_1 = require("../../../../Utils/QuadTree");
var Infecter = (function () {
    function Infecter() {
    }
    Infecter.infect = function (p1, container) {
        var _a;
        if (p1.infectionStage === undefined) {
            return;
        }
        var options = container.options;
        var infectionOptions = options.infection;
        if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
            return;
        }
        var infectionStage = infectionOptions.stages[p1.infectionStage];
        var pxRatio = container.retina.pixelRatio;
        var radius = p1.size.value * 2 + infectionStage.radius * pxRatio;
        var pos = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y,
        };
        var infectedStage = (_a = infectionStage.infectedStage) !== null && _a !== void 0 ? _a : p1.infectionStage;
        var query = container.particles.quadTree.query(new QuadTree_1.Circle(pos.x, pos.y, radius))
            .filter(function (t) { return t.infectionStage === undefined || t.infectionStage !== p1.infectionStage; });
        var infections = infectionStage.rate;
        var neighbors = query.length;
        for (var _i = 0, query_1 = query; _i < query_1.length; _i++) {
            var particle = query_1[_i];
            if (Math.random() < infections / neighbors) {
                if (particle.infectionStage === undefined) {
                    particle.startInfection(infectedStage);
                }
                else if (particle.infectionStage < infectedStage) {
                    particle.updateInfection(infectedStage);
                }
            }
        }
    };
    return Infecter;
}());
exports.Infecter = Infecter;
