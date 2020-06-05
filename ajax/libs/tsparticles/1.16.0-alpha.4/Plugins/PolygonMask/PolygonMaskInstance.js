"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonMaskInstance = void 0;
const Enums_1 = require("./Enums");
const Utils_1 = require("../../Utils");
const PolygonMask_1 = require("./Options/Classes/PolygonMask");
class PolygonMaskInstance {
    constructor(container) {
        this.container = container;
        this.dimension = {
            height: 0,
            width: 0,
        };
        this.path2DSupported = !!window.Path2D;
        this.options = new PolygonMask_1.PolygonMask();
        this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
    }
    static polygonBounce(particle) {
        particle.velocity.horizontal = particle.velocity.vertical / 2 - particle.velocity.horizontal;
        particle.velocity.vertical = particle.velocity.horizontal / 2 - particle.velocity.vertical;
    }
    static drawPolygonMask(context, rawData, stroke) {
        const color = Utils_1.ColorUtils.colorToRgb(stroke.color);
        if (color) {
            context.beginPath();
            context.moveTo(rawData[0].x, rawData[0].y);
            for (let i = 1; i < rawData.length; i++) {
                context.lineTo(rawData[i].x, rawData[i].y);
            }
            context.closePath();
            context.strokeStyle = Utils_1.ColorUtils.getStyleFromRgb(color);
            context.lineWidth = stroke.width;
            context.stroke();
        }
    }
    static drawPolygonMaskPath(context, path, stroke, position) {
        context.translate(position.x, position.y);
        const color = Utils_1.ColorUtils.colorToRgb(stroke.color);
        if (color) {
            context.strokeStyle = Utils_1.ColorUtils.getStyleFromRgb(color, stroke.opacity);
            context.lineWidth = stroke.width;
            context.stroke(path);
        }
    }
    initAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.options.load(options === null || options === void 0 ? void 0 : options.polygon);
            const polygonMaskOptions = this.options;
            this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;
            if (polygonMaskOptions.enable) {
                yield this.initRawData();
            }
        });
    }
    checkInsidePolygon(position) {
        const container = this.container;
        const polygonMaskOptions = this.options;
        if (!polygonMaskOptions.enable ||
            polygonMaskOptions.type === Enums_1.Type.none ||
            polygonMaskOptions.type === Enums_1.Type.inline) {
            return true;
        }
        if (!this.raw) {
            throw new Error(Utils_1.Constants.noPolygonFound);
        }
        const x = position ? position.x : Math.random() * container.canvas.size.width;
        const y = position ? position.y : Math.random() * container.canvas.size.height;
        let inside = false;
        for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
            const pi = this.raw[i];
            const pj = this.raw[j];
            const intersect = pi.y > y !== pj.y > y && x < ((pj.x - pi.x) * (y - pi.y)) / (pj.y - pi.y) + pi.x;
            if (intersect) {
                inside = !inside;
            }
        }
        if (polygonMaskOptions.type === Enums_1.Type.inside) {
            return inside;
        }
        else if (polygonMaskOptions.type === Enums_1.Type.outside) {
            return !inside;
        }
        return false;
    }
    resize() {
        const container = this.container;
        const polygonMaskOptions = this.options;
        if (polygonMaskOptions.enable && polygonMaskOptions.type !== Enums_1.Type.none) {
            if (this.redrawTimeout) {
                clearTimeout(this.redrawTimeout);
            }
            this.redrawTimeout = window.setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield this.initRawData();
                container.particles.redraw();
            }), 250);
        }
    }
    stop() {
        delete this.raw;
        delete this.paths;
    }
    randomPointInPolygon() {
        const container = this.container;
        const polygonMaskOptions = this.options;
        let position;
        if (polygonMaskOptions.type === Enums_1.Type.inline) {
            switch (polygonMaskOptions.inline.arrangement) {
                case Enums_1.InlineArrangement.randomPoint:
                    position = this.getRandomPointOnPolygonPath();
                    break;
                case Enums_1.InlineArrangement.randomLength:
                    position = this.getRandomPointOnPolygonPathByLength();
                    break;
                case Enums_1.InlineArrangement.equidistant:
                    position = this.getEquidistantPointOnPolygonPathByIndex(container.particles.count);
                    break;
                case Enums_1.InlineArrangement.onePerPoint:
                case Enums_1.InlineArrangement.perPoint:
                default:
                    position = this.getPointOnPolygonPathByIndex(container.particles.count);
            }
        }
        else {
            position = {
                x: Math.random() * container.canvas.size.width,
                y: Math.random() * container.canvas.size.height,
            };
        }
        if (this.checkInsidePolygon(position)) {
            return position;
        }
        else {
            return this.randomPointInPolygon();
        }
    }
    particlesInitialization() {
        const polygonMaskOptions = this.options;
        if (polygonMaskOptions.enable &&
            polygonMaskOptions.type === Enums_1.Type.inline &&
            (polygonMaskOptions.inline.arrangement === Enums_1.InlineArrangement.onePerPoint ||
                polygonMaskOptions.inline.arrangement === Enums_1.InlineArrangement.perPoint)) {
            this.drawPointsOnPolygonPath();
            return true;
        }
        return false;
    }
    particlePosition(position, particle) {
        var _a, _b;
        const polygonMaskOptions = this.options;
        if (polygonMaskOptions.enable && ((_b = (_a = this.raw) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0) {
            const pos = { x: 0, y: 0 };
            if (position) {
                pos.x = position.x;
                pos.y = position.y;
            }
            else {
                const randomPoint = this.randomPointInPolygon();
                pos.x = randomPoint.x;
                pos.y = randomPoint.y;
            }
            if (polygonMaskOptions.type === Enums_1.Type.inline && particle) {
                particle.initialPosition = {
                    x: pos.x,
                    y: pos.y,
                };
            }
            return pos;
        }
    }
    particleBounce(particle, _delta) {
        const polygonMaskOptions = this.options;
        if (polygonMaskOptions.enable &&
            polygonMaskOptions.type !== Enums_1.Type.none &&
            polygonMaskOptions.type !== Enums_1.Type.inline) {
            if (!this.checkInsidePolygon(particle.getPosition())) {
                PolygonMaskInstance.polygonBounce(particle);
                return true;
            }
        }
        else if (polygonMaskOptions.enable && polygonMaskOptions.type === Enums_1.Type.inline) {
            if (particle.initialPosition) {
                const dist = Utils_1.Utils.getDistance(particle.initialPosition, particle.getPosition());
                if (dist > this.polygonMaskMoveRadius) {
                    PolygonMaskInstance.polygonBounce(particle);
                    return true;
                }
            }
        }
        return false;
    }
    clickPositionValid(position) {
        const polygonMaskOptions = this.options;
        if (polygonMaskOptions.enable &&
            polygonMaskOptions.type !== Enums_1.Type.none &&
            polygonMaskOptions.type !== Enums_1.Type.inline) {
            if (this.checkInsidePolygon(position)) {
                return true;
            }
        }
        return false;
    }
    downloadSvgPathToPolygon(svgUrl, force) {
        return __awaiter(this, void 0, void 0, function* () {
            const polygonMaskOptions = this.options;
            const url = svgUrl || polygonMaskOptions.url;
            const forceDownload = force !== null && force !== void 0 ? force : false;
            if (!url || (this.paths !== undefined && !forceDownload)) {
                return this.raw;
            }
            const req = yield fetch(url);
            if (req.ok) {
                return this.parseSvgPathToPolygon(yield req.text());
            }
            else {
                throw new Error("tsParticles Error - Error occurred during polygon mask download");
            }
        });
    }
    parseSvgPathToPolygon(xml, force) {
        var _a;
        const forceDownload = force !== null && force !== void 0 ? force : false;
        if (this.paths !== undefined && !forceDownload) {
            return this.raw;
        }
        const container = this.container;
        const polygonMaskOptions = this.options;
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "image/svg+xml");
        const svg = doc.getElementsByTagName("svg")[0];
        let svgPaths = svg.getElementsByTagName("path");
        if (!svgPaths.length) {
            svgPaths = doc.getElementsByTagName("path");
        }
        this.paths = [];
        for (let i = 0; i < svgPaths.length; i++) {
            const path = svgPaths.item(i);
            if (path) {
                this.paths.push({
                    element: path,
                    length: path.getTotalLength(),
                });
            }
        }
        const pxRatio = container.retina.pixelRatio;
        const scale = polygonMaskOptions.scale / pxRatio;
        this.dimension.width = parseFloat(svg.getAttribute("width") || "0") * scale;
        this.dimension.height = parseFloat(svg.getAttribute("height") || "0") * scale;
        const position = (_a = polygonMaskOptions.position) !== null && _a !== void 0 ? _a : {
            x: 50,
            y: 50,
        };
        this.offset = {
            x: (container.canvas.size.width * position.x) / (100 * pxRatio) - this.dimension.width / 2,
            y: (container.canvas.size.height * position.y) / (100 * pxRatio) - this.dimension.height / 2,
        };
        return PolygonMaskInstance.parsePaths(this.paths, scale, this.offset);
    }
    draw(context) {
        var _a;
        if (!((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        const polygonMaskOptions = this.options;
        if (polygonMaskOptions.enable && polygonMaskOptions.draw.enable) {
            const polygonDraw = polygonMaskOptions.draw;
            const rawData = this.raw;
            for (const path of this.paths) {
                const path2d = path.path2d;
                const path2dSupported = this.path2DSupported;
                if (context) {
                    if (path2dSupported && path2d && this.offset) {
                        PolygonMaskInstance.drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
                    }
                    else if (rawData) {
                        PolygonMaskInstance.drawPolygonMask(context, rawData, polygonDraw.stroke);
                    }
                }
            }
        }
    }
    drawPointsOnPolygonPath() {
        if (this.raw) {
            for (const item of this.raw) {
                this.container.particles.addParticle({
                    x: item.x,
                    y: item.y,
                });
            }
        }
    }
    getRandomPointOnPolygonPath() {
        if (!this.raw || !this.raw.length)
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        const coords = Utils_1.Utils.itemFromArray(this.raw);
        return {
            x: coords.x,
            y: coords.y,
        };
    }
    getRandomPointOnPolygonPathByLength() {
        var _a, _b, _c;
        const polygonMaskOptions = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        const path = Utils_1.Utils.itemFromArray(this.paths);
        const distance = Math.floor(Math.random() * path.length) + 1;
        const point = path.element.getPointAtLength(distance);
        return {
            x: point.x * polygonMaskOptions.scale + (((_b = this.offset) === null || _b === void 0 ? void 0 : _b.x) || 0),
            y: point.y * polygonMaskOptions.scale + (((_c = this.offset) === null || _c === void 0 ? void 0 : _c.y) || 0),
        };
    }
    getEquidistantPointOnPolygonPathByIndex(index) {
        var _a, _b, _c, _d, _e, _f, _g;
        const options = this.container.options;
        const polygonMaskOptions = this.options;
        if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length))
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        let offset = 0;
        let point;
        const totalLength = this.paths.reduce((tot, path) => tot + path.length, 0);
        const distance = totalLength / options.particles.number.value;
        for (const path of this.paths) {
            const pathDistance = distance * index - offset;
            if (pathDistance <= path.length) {
                point = path.element.getPointAtLength(pathDistance);
                break;
            }
            else {
                offset += path.length;
            }
        }
        return {
            x: ((_b = point === null || point === void 0 ? void 0 : point.x) !== null && _b !== void 0 ? _b : 0) * polygonMaskOptions.scale + ((_d = (_c = this.offset) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : 0),
            y: ((_e = point === null || point === void 0 ? void 0 : point.y) !== null && _e !== void 0 ? _e : 0) * polygonMaskOptions.scale + ((_g = (_f = this.offset) === null || _f === void 0 ? void 0 : _f.y) !== null && _g !== void 0 ? _g : 0),
        };
    }
    getPointOnPolygonPathByIndex(index) {
        if (!this.raw || !this.raw.length)
            throw new Error(Utils_1.Constants.noPolygonDataLoaded);
        const coords = this.raw[index % this.raw.length];
        return {
            x: coords.x,
            y: coords.y,
        };
    }
    createPath2D() {
        var _a, _b;
        const polygonMaskOptions = this.options;
        if (!this.path2DSupported || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        for (const path of this.paths) {
            const pathData = (_b = path.element) === null || _b === void 0 ? void 0 : _b.getAttribute("d");
            if (pathData) {
                const path2d = new Path2D(pathData);
                const matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
                const finalPath = new Path2D();
                const transform = matrix.scale(polygonMaskOptions.scale);
                if (finalPath.addPath) {
                    finalPath.addPath(path2d, transform);
                    path.path2d = finalPath;
                }
                else {
                    delete path.path2d;
                }
            }
            else {
                delete path.path2d;
            }
            if (!path.path2d && this.raw) {
                path.path2d = new Path2D();
                path.path2d.moveTo(this.raw[0].x, this.raw[0].y);
                this.raw.forEach((pos, i) => {
                    var _a;
                    if (i > 0) {
                        (_a = path.path2d) === null || _a === void 0 ? void 0 : _a.lineTo(pos.x, pos.y);
                    }
                });
                path.path2d.closePath();
            }
        }
    }
    initRawData() {
        return __awaiter(this, void 0, void 0, function* () {
            const polygonMaskOptions = this.options;
            if (polygonMaskOptions.url) {
                this.raw = yield this.downloadSvgPathToPolygon(polygonMaskOptions.url);
            }
            else if (polygonMaskOptions.data) {
                const data = polygonMaskOptions.data;
                let svg;
                if (typeof data !== "string") {
                    const path = data.path instanceof Array
                        ? data.path.map((t) => `<path d="${t}" />`).join("")
                        : `<path d="${data.path}" />`;
                    const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
                    svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
                }
                else {
                    svg = data;
                }
                this.raw = this.parseSvgPathToPolygon(svg);
            }
            this.createPath2D();
        });
    }
    static parsePaths(paths, scale, offset) {
        const res = [];
        for (const path of paths) {
            const segments = path.element.pathSegList;
            const len = segments.numberOfItems;
            const p = {
                x: 0,
                y: 0,
            };
            for (let i = 0; i < len; i++) {
                const segment = segments.getItem(i);
                const svgPathSeg = window.SVGPathSeg;
                switch (segment.pathSegType) {
                    case svgPathSeg.PATHSEG_MOVETO_ABS:
                    case svgPathSeg.PATHSEG_LINETO_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
                    case svgPathSeg.PATHSEG_ARC_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS: {
                        const absSeg = segment;
                        p.x = absSeg.x;
                        p.y = absSeg.y;
                        break;
                    }
                    case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
                        p.x = segment.x;
                        break;
                    case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
                        p.y = segment.y;
                        break;
                    case svgPathSeg.PATHSEG_LINETO_REL:
                    case svgPathSeg.PATHSEG_MOVETO_REL:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
                    case svgPathSeg.PATHSEG_ARC_REL:
                    case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
                    case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL: {
                        const relSeg = segment;
                        p.x += relSeg.x;
                        p.y += relSeg.y;
                        break;
                    }
                    case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
                        p.x += segment.x;
                        break;
                    case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
                        p.y += segment.y;
                        break;
                    case svgPathSeg.PATHSEG_UNKNOWN:
                    case svgPathSeg.PATHSEG_CLOSEPATH:
                        continue;
                }
                res.push({
                    x: p.x * scale + offset.x,
                    y: p.y * scale + offset.y,
                });
            }
        }
        return res;
    }
}
exports.PolygonMaskInstance = PolygonMaskInstance;
