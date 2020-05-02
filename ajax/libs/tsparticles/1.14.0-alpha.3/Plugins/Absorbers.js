"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Absorber_1 = require("./Absorber");
var ClickMode_1 = require("../Enums/Modes/ClickMode");
var Utils_1 = require("../Utils/Utils");
var Absorbers = (function () {
    function Absorbers(container) {
        this.container = container;
        this.absorbers = [];
    }
    Absorbers.prototype.init = function () {
        var container = this.container;
        var options = container.options;
        if (options.absorbers instanceof Array) {
            for (var _i = 0, _a = options.absorbers; _i < _a.length; _i++) {
                var absorberOptions = _a[_i];
                var absorber = new Absorber_1.Absorber(container, absorberOptions);
                this.absorbers.push(absorber);
            }
        }
        else {
            var absorberOptions = options.absorbers;
            var absorber = new Absorber_1.Absorber(container, absorberOptions);
            this.absorbers.push(absorber);
        }
    };
    Absorbers.prototype.particleUpdate = function (particle) {
        for (var _i = 0, _a = this.absorbers; _i < _a.length; _i++) {
            var absorber = _a[_i];
            absorber.attract(particle);
            if (particle.destroyed) {
                break;
            }
        }
    };
    Absorbers.prototype.draw = function () {
        for (var _i = 0, _a = this.absorbers; _i < _a.length; _i++) {
            var absorber = _a[_i];
            absorber.draw();
        }
    };
    Absorbers.prototype.reset = function () {
        this.absorbers = [];
    };
    Absorbers.prototype.resize = function () {
        for (var _i = 0, _a = this.absorbers; _i < _a.length; _i++) {
            var absorber = _a[_i];
            absorber.resize();
        }
    };
    Absorbers.prototype.handleClickMode = function (mode) {
        var container = this.container;
        var options = container.options;
        if (mode === ClickMode_1.ClickMode.absorber) {
            var absorbersModeOptions = void 0;
            var modeAbsorbers = options.interactivity.modes.absorbers;
            if (modeAbsorbers instanceof Array) {
                if (modeAbsorbers.length > 0) {
                    absorbersModeOptions = Utils_1.Utils.itemFromArray(modeAbsorbers);
                }
            }
            else {
                absorbersModeOptions = modeAbsorbers;
            }
            var absorbersOptions = absorbersModeOptions !== null && absorbersModeOptions !== void 0 ? absorbersModeOptions : (options.absorbers instanceof Array ?
                Utils_1.Utils.itemFromArray(options.absorbers) :
                options.absorbers);
            var bhPosition = container.interactivity.mouse.clickPosition;
            var absorber = new Absorber_1.Absorber(container, absorbersOptions, bhPosition);
            this.absorbers.push(absorber);
        }
    };
    return Absorbers;
}());
exports.Absorbers = Absorbers;
