"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Range = (function () {
    function Range(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }
    return Range;
}());
exports.Range = Range;
var Point = (function () {
    function Point(x, y, particle) {
        this.position = {
            x: x,
            y: y,
        };
        this.particle = particle;
    }
    return Point;
}());
exports.Point = Point;
var Circle = (function (_super) {
    tslib_1.__extends(Circle, _super);
    function Circle(x, y, radius) {
        var _this = _super.call(this, x, y) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.contains = function (point) {
        var d = Math.pow((point.x - this.position.x), 2) + Math.pow((point.y - this.position.y), 2);
        return d <= this.radius * this.radius;
    };
    Circle.prototype.intersects = function (range) {
        var xDist = Math.abs(range.position.x - this.position.x);
        var yDist = Math.abs(range.position.y - this.position.y);
        var r = this.radius;
        var w = range.size.width;
        var h = range.size.height;
        var edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);
        if (xDist > (r + w) || yDist > (r + h)) {
            return false;
        }
        if (xDist <= w || yDist <= h) {
            return true;
        }
        return edges <= this.radius * this.radius;
    };
    return Circle;
}(Range));
exports.Circle = Circle;
var Rectangle = (function (_super) {
    tslib_1.__extends(Rectangle, _super);
    function Rectangle(x, y, width, height) {
        var _this = _super.call(this, x, y) || this;
        _this.size = {
            height: height,
            width: width,
        };
        return _this;
    }
    Rectangle.prototype.contains = function (point) {
        return (point.x >= this.position.x - this.size.width &&
            point.x < this.position.x + this.size.width &&
            point.y >= this.position.y - this.size.height &&
            point.y < this.position.y + this.size.height);
    };
    Rectangle.prototype.intersects = function (range) {
        return !(range.position.x - range.size.width > this.position.x + this.size.width ||
            range.position.x + range.size.width < this.position.x - this.size.width ||
            range.position.y - range.size.height > this.position.y + this.size.height ||
            range.position.y + range.size.height < this.position.y - this.size.height);
    };
    return Rectangle;
}(Range));
exports.Rectangle = Rectangle;
var QuadTree = (function () {
    function QuadTree(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    QuadTree.prototype.subdivide = function () {
        var x = this.rectangle.position.x;
        var y = this.rectangle.position.y;
        var w = this.rectangle.size.width;
        var h = this.rectangle.size.height;
        this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), this.capacity);
        this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), this.capacity);
        this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), this.capacity);
        this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), this.capacity);
        this.divided = true;
    };
    QuadTree.prototype.insert = function (point) {
        var _a, _b, _c, _d;
        if (!this.rectangle.contains(point.position)) {
            return false;
        }
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        else {
            if (!this.divided) {
                this.subdivide();
            }
        }
        if ((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) {
            return true;
        }
        else if ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) {
            return true;
        }
        else if ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) {
            return true;
        }
        else if ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point)) {
            return true;
        }
        return false;
    };
    QuadTree.prototype.draw = function (context) {
        var _a, _b, _c, _d;
        var r = this.rectangle;
        context.save();
        context.beginPath();
        context.strokeRect(r.position.x, r.position.y, r.size.width, r.size.height);
        context.closePath();
        context.strokeStyle = "rgba(255,255,255,0.2)";
        context.lineWidth = 0.5;
        context.stroke();
        context.restore();
        if (this.divided) {
            (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.draw(context);
            (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.draw(context);
            (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.draw(context);
            (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.draw(context);
        }
    };
    QuadTree.prototype.query = function (range, found) {
        var _a, _b, _c, _d;
        if (!found) {
            found = [];
        }
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        else {
            for (var _i = 0, _e = this.points; _i < _e.length; _i++) {
                var p = _e[_i];
                if (range.contains(p.position)) {
                    found.push(p.particle);
                }
            }
            if (this.divided) {
                (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, found);
                (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, found);
                (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, found);
                (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, found);
            }
        }
        return found;
    };
    return QuadTree;
}());
exports.QuadTree = QuadTree;
