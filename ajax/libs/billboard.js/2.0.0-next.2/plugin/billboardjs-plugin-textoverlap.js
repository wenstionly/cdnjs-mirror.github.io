/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.0-next.2
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-brush"), require("d3-voronoi"), require("d3-polygon"));
	else if(typeof define === 'function' && define.amd)
		define("textoverlap", ["d3-selection", "d3-brush", "d3-voronoi", "d3-polygon"], factory);
	else if(typeof exports === 'object')
		exports["textoverlap"] = factory(require("d3-selection"), require("d3-brush"), require("d3-voronoi"), require("d3-polygon"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["textoverlap"] = factory(root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__14__, __WEBPACK_EXTERNAL_MODULE__15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */

/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "$$", void 0), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "options", void 0), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;
  return _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  , _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  , _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  , _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  , _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null, delete _this[key];
    });
  }, Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.0-next.2");



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcs: "bb-arcs",
  area: "bb-area",
  areas: "bb-areas",
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label",
  bar: "bb-bar",
  bars: "bb-bars",
  brush: "bb-brush",
  button: "bb-button",
  buttonZoomReset: "bb-zoom-reset",
  chart: "bb-chart",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsTitle: "bb-chart-arcs-title",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars",
  chartCircles: "bb-chart-circles",
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars",
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  circle: "bb-circle",
  circles: "bb-circles",
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale",
  defocused: "bb-defocused",
  dragarea: "bb-dragarea",
  empty: "bb-empty",
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single",
  focused: "bb-focused",
  gaugeValue: "bb-gauge-value",
  grid: "bb-grid",
  gridLines: "bb-grid-lines",
  legend: "bb-legend",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemFocused: "bb-legend-item-focused",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile",
  level: "bb-level",
  levels: "bb-levels",
  line: "bb-line",
  lines: "bb-lines",
  main: "bb-main",
  region: "bb-region",
  regions: "bb-regions",
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  shape: "bb-shape",
  shapes: "bb-shapes",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions",
  target: "bb-target",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name",
  xgrid: "bb-xgrid",
  xgridFocus: "bb-xgrid-focus",
  xgridLine: "bb-xgrid-line",
  xgridLines: "bb-xgrid-lines",
  xgrids: "bb-xgrids",
  ygrid: "bb-ygrid",
  ygridFocus: "bb-ygrid-focus",
  ygridLine: "bb-ygrid-line",
  ygridLines: "bb-ygrid-lines",
  ygrids: "bb-ygrids",
  zoomBrush: "bb-zoom-brush",
  zoomRect: "bb-zoom-rect",
  EXPANDED: "_expanded_",
  SELECTED: "_selected_",
  INCLUDED: "_included_",
  TextOverlapping: "text-overlapping"
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadConfig; });
/* harmony import */ var _module_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
  var target,
      keys,
      read,
      thisConfig = this.config,
      find = function () {
    var key = keys.shift();
    return key && target && Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isObjectType */ "e"])(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config, keys = key.split("_"), read = find(), Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isDefined */ "b"])(read) && (thisConfig[key] = read);
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__15__;

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ textoverlap_TextOverlap; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-voronoi","commonjs2":"d3-voronoi","amd":"d3-voronoi","root":"d3"}
var external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_ = __webpack_require__(14);

// EXTERNAL MODULE: external {"commonjs":"d3-polygon","commonjs2":"d3-polygon","amd":"d3-polygon","root":"d3"}
var external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_ = __webpack_require__(15);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(4);

// EXTERNAL MODULE: ./src/config/config.ts
var config = __webpack_require__(10);

// EXTERNAL MODULE: ./src/Plugin/Plugin.ts
var Plugin = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Plugin/textoverlap/Options.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * TextOverlap plugin option class
 * @class TextOverlapOptions
 * @param {Options} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlapOptions}
 * @private
 */
var Options = function () {
  return {
    /**
     * Set selector string for target text nodes
     * @name selector
     * @memberof plugin-textoverlap
     * @type {string}
     * @default ".bb-texts text"
     * @example
     *  // selector for data label text nodes
     * selector: ".bb-texts text"
     */
    selector: ".bb-texts text",

    /**
     * Set extent of label overlap prevention
     * @name extent
     * @memberof plugin-textoverlap
     * @type {number}
     * @default 1
     * @example
     * 	extent: 1
     */
    extent: 1,

    /**
     * Set minimum area needed to show a data label
     * @name area
     * @memberof plugin-textoverlap
     * @type {number}
     * @default 0
     * @example
     * 	area: 0
     */
    area: 0
  };
};


// CONCATENATED MODULE: ./src/Plugin/textoverlap/index.ts




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */






/**
 * TextOverlap plugin<br>
 * Prevents label overlap using [Voronoi layout](https://en.wikipedia.org/wiki/Voronoi_diagram).
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-polygon](https://github.com/d3/d3-polygon)
 *   - [d3-voronoi](https://github.com/d3/d3-voronoi)
 * @class plugin-textoverlap
 * @requires d3-selection
 * @requires d3-polygon
 * @requires d3-voronoi
 * @param {object} options TextOverlap plugin options
 * @augments Plugin
 * @returns {TextOverlap}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *     	  columns: [ ... ]
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.textoverlap({
 *          selector: ".bb-texts text",
 *          extent: 8,
 *          area: 3
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import TextOverlap from "billboard.js/dist/billboardjs-plugin-textoverlap";
 *
 * bb.generate({
 *     plugins: [
 *        new TextOverlap({ ... })
 *     ]
 * })
 */

var textoverlap_TextOverlap = /*#__PURE__*/function (_Plugin) {
  function TextOverlap(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "config", void 0), _this.config = new Options(), Object(assertThisInitialized["a" /* default */])(_this) || Object(assertThisInitialized["a" /* default */])(_this);
  }

  Object(inheritsLoose["a" /* default */])(TextOverlap, _Plugin);

  var _proto = TextOverlap.prototype;
  return _proto.$init = function $init() {
    config["a" /* loadConfig */].call(this, this.options);
  }, _proto.$redraw = function $redraw() {
    var text = Object(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["selectAll"])(this.config.selector);
    text.empty() || this.preventLabelOverlap(text);
  }
  /**
   * Generates the voronoi layout for data labels
   * @param {object} data Indices values
   * @returns {object} Voronoi layout points and corresponding Data points
   * @private
   */
  , _proto.generateVoronoi = function generateVoronoi(data) {
    var $$ = this.$$,
        scale = $$.scale,
        _map = ["x", "y"].map(function (v) {
      return scale[v].domain();
    }),
        min = _map[0],
        max = _map[1],
        _ref = [max[0], min[1]];

    return min[1] = _ref[0], max[0] = _ref[1], Object(external_commonjs_d3_voronoi_commonjs2_d3_voronoi_amd_d3_voronoi_root_d3_["voronoi"])().extent([min, max]).polygons(data);
  }
  /**
   * Set text label's position to preventg overlap.
   * @param {d3Selection} text target text selection
   * @private
   */
  , _proto.preventLabelOverlap = function preventLabelOverlap(text) {
    var _this$config = this.config,
        extent = _this$config.extent,
        area = _this$config.area,
        cells = this.generateVoronoi(text.data().map(function (v) {
      return [v.x, v.value];
    })),
        i = 0;
    text.each(function () {
      var cell = cells[i++];

      if (cell && this) {
        var _cell$data = cell.data,
            x = _cell$data[0],
            y = _cell$data[1],
            _d3PolygonCentroid = Object(external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_["polygonCentroid"])(cell),
            cx = _d3PolygonCentroid[0],
            cy = _d3PolygonCentroid[1],
            angle = Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2),
            xTranslate = extent * (angle === 0 ? 1 : -1),
            yTranslate = angle === -1 ? -extent : extent + 5,
            txtAnchor = Math.abs(angle) === 1 ? "middle" : angle === 0 ? "start" : "end";

        Object(external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["select"])(this) // @ts-ignore
        .attr("display", Object(external_commonjs_d3_polygon_commonjs2_d3_polygon_amd_d3_polygon_root_d3_["polygonArea"])(cell) < area ? "none" : null).attr("text-anchor", txtAnchor).attr("dy", "0." + (angle === 1 ? 71 : 35) + "em").attr("transform", "translate(" + xTranslate + ", " + yTranslate + ")");
      }
    });
  }, TextOverlap;
}(Plugin["a" /* default */]);



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getRange; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ isDefined; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ isEmpty; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ isFunction; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ isObjectType; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ isString; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ parseDate; });

// UNUSED EXPORTS: asHalfPixel, brushEmpty, callFn, capitalize, ceil10, convertInputType, deepClone, diffDomain, endall, emulateEvent, extend, getBrushSelection, getBoundingRect, getCssRules, getMinMax, getOption, getPathBox, getRandom, getRectSegList, getTranslation, getUnique, hasValue, isArray, isboolean, isNumber, isObject, isTabVisible, isUndefined, isValue, mergeArray, mergeObj, notEmpty, sanitise, setTextValue, sortValue, toArray, tplProcess

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(4);

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(11);

// CONCATENATED MODULE: ./src/module/browser.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Window object
 * @private
 */

/* eslint-disable no-new-func, no-undef */


var win = function () {
  var def = function (o) {
    return typeof o !== "undefined" && o;
  };

  return def(self) || def(window) || def(global) || def(globalThis) || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */
// EXTERNAL MODULE: ./src/config/classes.ts
var classes = __webpack_require__(9);

// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */






var isValue = function (v) {
  return v || v === 0;
},
    isFunction = function (v) {
  return typeof v === "function";
},
    isString = function (v) {
  return typeof v === "string";
},
    isNumber = function (v) {
  return typeof v === "number";
},
    isUndefined = function (v) {
  return typeof v === "undefined";
},
    isDefined = function (v) {
  return typeof v !== "undefined";
},
    isboolean = function (v) {
  return typeof v === "boolean";
},
    ceil10 = function (v) {
  return Math.ceil(v / 10) * 10;
},
    asHalfPixel = function (n) {
  return Math.ceil(n) + .5;
},
    diffDomain = function (d) {
  return d[1] - d[0];
},
    isObjectType = function (v) {
  return typeof v === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return Array.isArray(arr);
},
    isObject = function (obj) {
  return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
};

/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {*} defaultValue Default value
 * @returns {*}
 * @private
 */
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}
/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {*} value Value to be checked
 * @returns {boolean}
 * @private
 */


function hasValue(dict, value) {
  var found = !1;
  return Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  }), found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */


function callFn(fn) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

  return isFn && fn.call.apply(fn, args), isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */


function endall(transition, cb) {
  var n = 0;
  transition.each(function () {
    return ++n;
  }).on("end", function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];

    --n || cb.apply.apply(cb, [this].concat(args));
  });
}
/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */


function sanitise(str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
}
/**
 * Set text value. If there's multiline add nodes.
 * @param {d3Selection} node Text node
 * @param {string} text Text value string
 * @param {Array} dy dy value for multilined text
 * @param {boolean} toMiddle To be alingned vertically middle
 * @private
 */


function setTextValue(node, text, dy, toMiddle) {
  if (dy === void 0 && (dy = [-1, 1]), toMiddle === void 0 && (toMiddle = !1), node && isString(text)) if (text.indexOf("\n") === -1) node.text(text);else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      node.html(""), multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", (i === 0 ? dy[0] * len : dy[1]) + "em").text(v);
      });
    }
  }
}
/**
 * Substitution of SVGPathSeg API polyfill
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {Array}
 * @private
 */


function getRectSegList(path) {
  /*
   * seg1 ---------- seg2
   *   |               |
   *   |               |
   *   |               |
   * seg0 ---------- seg3
   * */
  var _path$getBBox = path.getBBox(),
      x = _path$getBBox.x,
      y = _path$getBBox.y,
      width = _path$getBBox.width,
      height = _path$getBBox.height;

  return [{
    x: x,
    y: y + height
  }, // seg0
  {
    x: x,
    y: y
  }, // seg1
  {
    x: x + width,
    y: y
  }, // seg2
  {
    x: x + width,
    y: y + height
  } // seg3
  ];
}
/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */


function getPathBox(path) {
  var _path$getBoundingClie = path.getBoundingClientRect(),
      width = _path$getBoundingClie.width,
      height = _path$getBoundingClie.height,
      items = getRectSegList(path),
      x = items[0].x,
      y = Math.min(items[0].y, items[1].y);

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Return brush selection array
 * @param {object} {} Selection object
 * @param {object} {}.$el Selection object
 * @returns {d3.brushSelection}
 * @private
 */


function getBrushSelection(_ref) {
  var selection,
      $el = _ref.$el,
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["event"],
      main = $el.subchart.main || $el.main;
  return event && event.type === "brush" ? selection = event.selection : main && (selection = main.select("." + classes["a" /* default */].brush).node()) && (selection = Object(external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_["brushSelection"])(selection)), selection;
}
/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */


var getBoundingRect = function (node) {
  return node.rect || (node.rect = node.getBoundingClientRect());
};
/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @returns {number|string}
 * @private
 */


function getRandom(asStr) {
  asStr === void 0 && (asStr = !0);
  var rand = Math.random();
  return asStr ? rand + "" : rand;
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */


function brushEmpty(ctx) {
  var selection = getBrushSelection(ctx);
  return !selection || selection[0] === selection[1];
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */


function deepClone() {
  for (var clone = function (_clone) {
    function clone() {
      return _clone.apply(this, arguments);
    }

    return clone.toString = function () {
      return _clone.toString();
    }, clone;
  }(function (v) {
    if (isObject(v) && v.constructor) {
      var r = new v.constructor();

      for (var k in v) r[k] = clone(v[k]);

      return r;
    }

    return v;
  }), _len3 = arguments.length, objectN = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) objectN[_key3] = arguments[_key3];

  return objectN.map(function (v) {
    return clone(v);
  }).reduce(function (a, c) {
    return _objectSpread(_objectSpread({}, a), c);
  });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object} source Source object
 * @returns {object}
 * @private
 */


function extend(target, source) {
  // exclude name with only numbers
  for (var p in target === void 0 && (target = {}), isArray(source) && source.forEach(function (v) {
    return extend(target, v);
  }), source) /^\d+$/.test(p) || p in target || (target[p] = source[p]);

  return target;
}
/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */


var capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    toArray = function (v) {
  return [].slice.call(v);
};
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */


/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
  var rules = [];
  return styleSheets.forEach(function (sheet) {
    try {
      sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
    } catch (e) {
      console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
    }
  }), rules;
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */


var getTranslation = function (node) {
  var transform = node ? node.transform : null,
      baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0
  };
};
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */


function getUnique(data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */


function mergeArray(arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */


function mergeObj(target) {
  for (var _len4 = arguments.length, objectN = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) objectN[_key4 - 1] = arguments[_key4];

  if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;
  var source = objectN.shift();
  return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
    var value = source[key];
    isObject(value) ? (!target[key] && (target[key] = {}), target[key] = mergeObj(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
  }), mergeObj.apply(void 0, [target].concat(objectN));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */


function sortValue(data, isAsc) {
  isAsc === void 0 && (isAsc = !0);
  var fn;
  return data[0] instanceof Date ? fn = isAsc ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  } : isAsc && !data.every(isNaN) ? fn = function (a, b) {
    return a - b;
  } : !isAsc && (fn = function (a, b) {
    return a > b && -1 || a < b && 1 || a === b && 0;
  }), data.concat().sort(fn);
}
/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */


function getMinMax(type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });
  return res.length ? isNumber(res[0]) ? res = Math[type].apply(Math, res) : res[0] instanceof Date && (res = sortValue(res, type === "min")[0]) : res = undefined, res;
}
/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */


var getRange = function (start, end, step) {
  step === void 0 && (step = 1);
  var res = [],
      n = Math.max(0, Math.ceil((end - start) / step)) | 0;

  for (var i = start; i < n; i++) res.push(start + i * step);

  return res;
},
    emulateEvent = {
  mouse: function () {
    var getParams = function () {
      return {
        bubbles: !1,
        cancelable: !1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0
      };
    };

    try {
      return new MouseEvent("t"), function (el, eventType, params) {
        params === void 0 && (params = getParams()), el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType, params) {
        params === void 0 && (params = getParams());
        var mouseEvent = doc.createEvent("MouseEvent"); // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

        mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
        params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null), el.dispatchEvent(mouseEvent);
      };
    }
  }(),
  touch: function touch(el, eventType, params) {
    var touchObj = new Touch(mergeObj({
      identifier: Date.now(),
      target: el,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: .5
    }, params));
    el.dispatchEvent(new TouchEvent(eventType, {
      cancelable: !0,
      bubbles: !0,
      shiftKey: !0,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj]
    }));
  }
}; // emulate event


/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
  var res = tpl;

  for (var x in data) res = res.replace(new RegExp("{=" + x + "}", "g"), data[x]);

  return res;
}
/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */


function parseDate(date) {
  var parsedDate;
  if (date instanceof Date) parsedDate = date;else if (isString(date)) {
    var config = this.config,
        format = this.format;
    parsedDate = format.dataTime(config.data_xFormat)(date);
  } else isNumber(date) && !isNaN(date) && (parsedDate = new Date(+date));
  return (!parsedDate || isNaN(+parsedDate)) && console && console.error && console.error("Failed to parse x '" + date + "' to Date object"), parsedDate;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */


function isTabVisible() {
  return !doc.hidden;
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */


function convertInputType(mouse, touch) {
  var isMobile = !1; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

  if (/Mobi/.test(win.navigator.userAgent) && touch) {
    // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
    var hasTouchPoints = win.navigator && "maxTouchPoints" in win.navigator && win.navigator.maxTouchPoints > 0,
        hasTouch = "ontouchmove" in win || win.DocumentTouch && doc instanceof win.DocumentTouch; // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
    // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true

    isMobile = hasTouchPoints || hasTouch;
  }

  var hasMouse = !(!mouse || isMobile) && "onmouseover" in win;
  return hasMouse && "mouse" || isMobile && "touch" || null;
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXZvcm9ub2lcIixcImNvbW1vbmpzMlwiOlwiZDMtdm9yb25vaVwiLFwiYW1kXCI6XCJkMy12b3Jvbm9pXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1wb2x5Z29uXCIsXCJjb21tb25qczJcIjpcImQzLXBvbHlnb25cIixcImFtZFwiOlwiZDMtcG9seWdvblwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vdGV4dG92ZXJsYXAvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi90ZXh0b3ZlcmxhcC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJ0YXJnZXQiLCJ0ZXh0IiwidGV4dHMiLCJ0aXRsZSIsInRvb2x0aXAiLCJ0b29sdGlwQ29udGFpbmVyIiwidG9vbHRpcE5hbWUiLCJ4Z3JpZCIsInhncmlkRm9jdXMiLCJ4Z3JpZExpbmUiLCJ4Z3JpZExpbmVzIiwieGdyaWRzIiwieWdyaWQiLCJ5Z3JpZEZvY3VzIiwieWdyaWRMaW5lIiwieWdyaWRMaW5lcyIsInlncmlkcyIsInpvb21CcnVzaCIsInpvb21SZWN0IiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwic2VsZWN0b3IiLCJleHRlbnQiLCJUZXh0T3ZlcmxhcCIsImNhbGwiLCJkM1NlbGVjdEFsbCIsInByZXZlbnRMYWJlbE92ZXJsYXAiLCJnZW5lcmF0ZVZvcm9ub2kiLCJkYXRhIiwiJCQiLCJzY2FsZSIsIm1hcCIsInYiLCJkb21haW4iLCJtaW4iLCJtYXgiLCJkM1Zvcm9ub2kiLCJwb2x5Z29ucyIsImNlbGxzIiwieCIsInZhbHVlIiwiaSIsImVhY2giLCJjZWxsIiwieSIsImQzUG9seWdvbkNlbnRyb2lkIiwiY3giLCJjeSIsImFuZ2xlIiwiTWF0aCIsInJvdW5kIiwiYXRhbjIiLCJQSSIsInhUcmFuc2xhdGUiLCJ5VHJhbnNsYXRlIiwidHh0QW5jaG9yIiwiYWJzIiwiZDNTZWxlY3QiLCJhdHRyIiwiZDNQb2x5Z29uQXJlYSIsIndpbiIsImRlZiIsIm8iLCJzZWxmIiwid2luZG93IiwiZ2xvYmFsIiwiZ2xvYmFsVGhpcyIsIkZ1bmN0aW9uIiwiZG9jIiwiZG9jdW1lbnQiLCJpc1ZhbHVlIiwiaXNGdW5jdGlvbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsImlzYm9vbGVhbiIsImNlaWwxMCIsImNlaWwiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiZCIsImlzRW1wdHkiLCJsZW5ndGgiLCJEYXRlIiwiaXNOYU4iLCJub3RFbXB0eSIsImlzQXJyYXkiLCJhcnIiLCJBcnJheSIsImlzT2JqZWN0Iiwib2JqIiwibm9kZVR5cGUiLCJnZXRPcHRpb24iLCJkZWZhdWx0VmFsdWUiLCJoYXNWYWx1ZSIsImRpY3QiLCJmb3VuZCIsImNhbGxGbiIsImZuIiwiaXNGbiIsImFyZ3MiLCJlbmRhbGwiLCJ0cmFuc2l0aW9uIiwiY2IiLCJvbiIsImFwcGx5Iiwic2FuaXRpc2UiLCJzdHIiLCJyZXBsYWNlIiwic2V0VGV4dFZhbHVlIiwibm9kZSIsImR5IiwidG9NaWRkbGUiLCJpbmRleE9mIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImh0bWwiLCJhcHBlbmQiLCJnZXRSZWN0U2VnTGlzdCIsInBhdGgiLCJnZXRCQm94Iiwid2lkdGgiLCJoZWlnaHQiLCJnZXRQYXRoQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaXRlbXMiLCJnZXRCcnVzaFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsIiRlbCIsImV2ZW50IiwiZDNFdmVudCIsInN1YmNoYXJ0IiwidHlwZSIsInNlbGVjdCIsIkNMQVNTIiwiZDNCcnVzaFNlbGVjdGlvbiIsImdldEJvdW5kaW5nUmVjdCIsInJlY3QiLCJnZXRSYW5kb20iLCJhc1N0ciIsInJhbmQiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiY3R4IiwiZGVlcENsb25lIiwiY2xvbmUiLCJjb25zdHJ1Y3RvciIsInIiLCJrIiwib2JqZWN0TiIsInJlZHVjZSIsImEiLCJjIiwiZXh0ZW5kIiwic291cmNlIiwicCIsInRlc3QiLCJjYXBpdGFsaXplIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvQXJyYXkiLCJnZXRDc3NSdWxlcyIsInN0eWxlU2hlZXRzIiwicnVsZXMiLCJzaGVldCIsImNzc1J1bGVzIiwiY29uY2F0IiwiZSIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJ0b1N0cmluZyIsImdldFRyYW5zbGF0aW9uIiwidHJhbnNmb3JtIiwiYmFzZVZhbCIsIm51bWJlck9mSXRlbXMiLCJnZXRJdGVtIiwibWF0cml4IiwiYiIsImYiLCJnZXRVbmlxdWUiLCJpc0RhdGUiLCJOdW1iZXIiLCJmaWx0ZXIiLCJtZXJnZUFycmF5IiwibWVyZ2VPYmoiLCJzb3J0VmFsdWUiLCJpc0FzYyIsImV2ZXJ5Iiwic29ydCIsImdldE1pbk1heCIsInJlcyIsImdldFJhbmdlIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJwYXJzZURhdGUiLCJkYXRlIiwicGFyc2VkRGF0ZSIsImZvcm1hdCIsImRhdGFUaW1lIiwiZGF0YV94Rm9ybWF0IiwiaXNUYWJWaXNpYmxlIiwiaGlkZGVuIiwiY29udmVydElucHV0VHlwZSIsImlzTW9iaWxlIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaGFzVG91Y2hQb2ludHMiLCJtYXhUb3VjaFBvaW50cyIsImhhc1RvdWNoIiwiRG9jdW1lbnRUb3VjaCIsImhhc01vdXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FB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d2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIiksIHJlcXVpcmUoXCJkMy1icnVzaFwiKSwgcmVxdWlyZShcImQzLXZvcm9ub2lcIiksIHJlcXVpcmUoXCJkMy1wb2x5Z29uXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidGV4dG92ZXJsYXBcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy12b3Jvbm9pXCIsIFwiZDMtcG9seWdvblwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ0ZXh0b3ZlcmxhcFwiXSA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSwgcmVxdWlyZShcImQzLWJydXNoXCIpLCByZXF1aXJlKFwiZDMtdm9yb25vaVwiKSwgcmVxdWlyZShcImQzLXBvbHlnb25cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcInRleHRvdmVybGFwXCJdID0gZmFjdG9yeShyb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNV9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQmFzZSBjbGFzcyB0byBnZW5lcmF0ZSBiaWxsYm9hcmQuanMgcGx1Z2luXG4gKiBAY2xhc3MgUGx1Z2luXG4gKi9cbi8qKlxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXG4gKiBAbmFtZSB2ZXJzaW9uXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyb2YgUGx1Z2luXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGV4YW1wbGVcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcblx0cHVibGljICQkO1xuXHRwdWJsaWMgb3B0aW9ucztcblx0c3RhdGljIHZlcnNpb24gPSBcIjIuMC4wLW5leHQuMlwiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIENTUyBjbGFzcyBuYW1lcyBkZWZpbml0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdGFyYzogXCJiYi1hcmNcIixcblx0YXJjTGFiZWxMaW5lOiBcImJiLWFyYy1sYWJlbC1saW5lXCIsXG5cdGFyY3M6IFwiYmItYXJjc1wiLFxuXHRhcmVhOiBcImJiLWFyZWFcIixcblx0YXJlYXM6IFwiYmItYXJlYXNcIixcblx0YXhpczogXCJiYi1heGlzXCIsXG5cdGF4aXNYOiBcImJiLWF4aXMteFwiLFxuXHRheGlzWExhYmVsOiBcImJiLWF4aXMteC1sYWJlbFwiLFxuXHRheGlzWTogXCJiYi1heGlzLXlcIixcblx0YXhpc1kyOiBcImJiLWF4aXMteTJcIixcblx0YXhpc1kyTGFiZWw6IFwiYmItYXhpcy15Mi1sYWJlbFwiLFxuXHRheGlzWUxhYmVsOiBcImJiLWF4aXMteS1sYWJlbFwiLFxuXHRiYXI6IFwiYmItYmFyXCIsXG5cdGJhcnM6IFwiYmItYmFyc1wiLFxuXHRicnVzaDogXCJiYi1icnVzaFwiLFxuXHRidXR0b246IFwiYmItYnV0dG9uXCIsXG5cdGJ1dHRvblpvb21SZXNldDogXCJiYi16b29tLXJlc2V0XCIsXG5cdGNoYXJ0OiBcImJiLWNoYXJ0XCIsXG5cdGNoYXJ0QXJjOiBcImJiLWNoYXJ0LWFyY1wiLFxuXHRjaGFydEFyY3M6IFwiYmItY2hhcnQtYXJjc1wiLFxuXHRjaGFydEFyY3NCYWNrZ3JvdW5kOiBcImJiLWNoYXJ0LWFyY3MtYmFja2dyb3VuZFwiLFxuXHRjaGFydEFyY3NHYXVnZU1heDogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1heFwiLFxuXHRjaGFydEFyY3NHYXVnZU1pbjogXCJiYi1jaGFydC1hcmNzLWdhdWdlLW1pblwiLFxuXHRjaGFydEFyY3NHYXVnZVVuaXQ6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS11bml0XCIsXG5cdGNoYXJ0QXJjc1RpdGxlOiBcImJiLWNoYXJ0LWFyY3MtdGl0bGVcIixcblx0Y2hhcnRBcmNzR2F1Z2VUaXRsZTogXCJiYi1jaGFydC1hcmNzLWdhdWdlLXRpdGxlXCIsXG5cdGNoYXJ0QmFyOiBcImJiLWNoYXJ0LWJhclwiLFxuXHRjaGFydEJhcnM6IFwiYmItY2hhcnQtYmFyc1wiLFxuXHRjaGFydENpcmNsZXM6IFwiYmItY2hhcnQtY2lyY2xlc1wiLFxuXHRjaGFydExpbmU6IFwiYmItY2hhcnQtbGluZVwiLFxuXHRjaGFydExpbmVzOiBcImJiLWNoYXJ0LWxpbmVzXCIsXG5cdGNoYXJ0UmFkYXI6IFwiYmItY2hhcnQtcmFkYXJcIixcblx0Y2hhcnRSYWRhcnM6IFwiYmItY2hhcnQtcmFkYXJzXCIsXG5cdGNoYXJ0VGV4dDogXCJiYi1jaGFydC10ZXh0XCIsXG5cdGNoYXJ0VGV4dHM6IFwiYmItY2hhcnQtdGV4dHNcIixcblx0Y2lyY2xlOiBcImJiLWNpcmNsZVwiLFxuXHRjaXJjbGVzOiBcImJiLWNpcmNsZXNcIixcblx0Y29sb3JQYXR0ZXJuOiBcImJiLWNvbG9yLXBhdHRlcm5cIixcblx0Y29sb3JTY2FsZTogXCJiYi1jb2xvcnNjYWxlXCIsXG5cdGRlZm9jdXNlZDogXCJiYi1kZWZvY3VzZWRcIixcblx0ZHJhZ2FyZWE6IFwiYmItZHJhZ2FyZWFcIixcblx0ZW1wdHk6IFwiYmItZW1wdHlcIixcblx0ZXZlbnRSZWN0OiBcImJiLWV2ZW50LXJlY3RcIixcblx0ZXZlbnRSZWN0czogXCJiYi1ldmVudC1yZWN0c1wiLFxuXHRldmVudFJlY3RzTXVsdGlwbGU6IFwiYmItZXZlbnQtcmVjdHMtbXVsdGlwbGVcIixcblx0ZXZlbnRSZWN0c1NpbmdsZTogXCJiYi1ldmVudC1yZWN0cy1zaW5nbGVcIixcblx0Zm9jdXNlZDogXCJiYi1mb2N1c2VkXCIsXG5cdGdhdWdlVmFsdWU6IFwiYmItZ2F1Z2UtdmFsdWVcIixcblx0Z3JpZDogXCJiYi1ncmlkXCIsXG5cdGdyaWRMaW5lczogXCJiYi1ncmlkLWxpbmVzXCIsXG5cdGxlZ2VuZDogXCJiYi1sZWdlbmRcIixcblx0bGVnZW5kQmFja2dyb3VuZDogXCJiYi1sZWdlbmQtYmFja2dyb3VuZFwiLFxuXHRsZWdlbmRJdGVtOiBcImJiLWxlZ2VuZC1pdGVtXCIsXG5cdGxlZ2VuZEl0ZW1FdmVudDogXCJiYi1sZWdlbmQtaXRlbS1ldmVudFwiLFxuXHRsZWdlbmRJdGVtRm9jdXNlZDogXCJiYi1sZWdlbmQtaXRlbS1mb2N1c2VkXCIsXG5cdGxlZ2VuZEl0ZW1IaWRkZW46IFwiYmItbGVnZW5kLWl0ZW0taGlkZGVuXCIsXG5cdGxlZ2VuZEl0ZW1Qb2ludDogXCJiYi1sZWdlbmQtaXRlbS1wb2ludFwiLFxuXHRsZWdlbmRJdGVtVGlsZTogXCJiYi1sZWdlbmQtaXRlbS10aWxlXCIsXG5cdGxldmVsOiBcImJiLWxldmVsXCIsXG5cdGxldmVsczogXCJiYi1sZXZlbHNcIixcblx0bGluZTogXCJiYi1saW5lXCIsXG5cdGxpbmVzOiBcImJiLWxpbmVzXCIsXG5cdG1haW46IFwiYmItbWFpblwiLFxuXHRyZWdpb246IFwiYmItcmVnaW9uXCIsXG5cdHJlZ2lvbnM6IFwiYmItcmVnaW9uc1wiLFxuXHRzZWxlY3RlZENpcmNsZTogXCJiYi1zZWxlY3RlZC1jaXJjbGVcIixcblx0c2VsZWN0ZWRDaXJjbGVzOiBcImJiLXNlbGVjdGVkLWNpcmNsZXNcIixcblx0c2hhcGU6IFwiYmItc2hhcGVcIixcblx0c2hhcGVzOiBcImJiLXNoYXBlc1wiLFxuXHRzdGFuZm9yZEVsZW1lbnRzOiBcImJiLXN0YW5mb3JkLWVsZW1lbnRzXCIsXG5cdHN0YW5mb3JkTGluZTogXCJiYi1zdGFuZm9yZC1saW5lXCIsXG5cdHN0YW5mb3JkTGluZXM6IFwiYmItc3RhbmZvcmQtbGluZXNcIixcblx0c3RhbmZvcmRSZWdpb246IFwiYmItc3RhbmZvcmQtcmVnaW9uXCIsXG5cdHN0YW5mb3JkUmVnaW9uczogXCJiYi1zdGFuZm9yZC1yZWdpb25zXCIsXG5cdHRhcmdldDogXCJiYi10YXJnZXRcIixcblx0dGV4dDogXCJiYi10ZXh0XCIsXG5cdHRleHRzOiBcImJiLXRleHRzXCIsXG5cdHRpdGxlOiBcImJiLXRpdGxlXCIsXG5cdHRvb2x0aXA6IFwiYmItdG9vbHRpcFwiLFxuXHR0b29sdGlwQ29udGFpbmVyOiBcImJiLXRvb2x0aXAtY29udGFpbmVyXCIsXG5cdHRvb2x0aXBOYW1lOiBcImJiLXRvb2x0aXAtbmFtZVwiLFxuXHR4Z3JpZDogXCJiYi14Z3JpZFwiLFxuXHR4Z3JpZEZvY3VzOiBcImJiLXhncmlkLWZvY3VzXCIsXG5cdHhncmlkTGluZTogXCJiYi14Z3JpZC1saW5lXCIsXG5cdHhncmlkTGluZXM6IFwiYmIteGdyaWQtbGluZXNcIixcblx0eGdyaWRzOiBcImJiLXhncmlkc1wiLFxuXHR5Z3JpZDogXCJiYi15Z3JpZFwiLFxuXHR5Z3JpZEZvY3VzOiBcImJiLXlncmlkLWZvY3VzXCIsXG5cdHlncmlkTGluZTogXCJiYi15Z3JpZC1saW5lXCIsXG5cdHlncmlkTGluZXM6IFwiYmIteWdyaWQtbGluZXNcIixcblx0eWdyaWRzOiBcImJiLXlncmlkc1wiLFxuXHR6b29tQnJ1c2g6IFwiYmItem9vbS1icnVzaFwiLFxuXHR6b29tUmVjdDogXCJiYi16b29tLXJlY3RcIixcblx0RVhQQU5ERUQ6IFwiX2V4cGFuZGVkX1wiLFxuXHRTRUxFQ1RFRDogXCJfc2VsZWN0ZWRfXCIsXG5cdElOQ0xVREVEOiBcIl9pbmNsdWRlZF9cIixcblx0VGV4dE92ZXJsYXBwaW5nOiBcInRleHQtb3ZlcmxhcHBpbmdcIlxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbmltcG9ydCB7aXNEZWZpbmVkLCBpc09iamVjdFR5cGV9IGZyb20gXCIuLi9tb2R1bGUvdXRpbFwiO1xuaW1wb3J0IE9wdGlvbnMgZnJvbSBcIi4vT3B0aW9ucy9PcHRpb25zXCI7XG5cbi8qKlxuICogTG9hZCBjb25maWd1cmF0aW9uIG9wdGlvblxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBVc2VyJ3MgZ2VuZXJhdGlvbiBjb25maWcgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKGNvbmZpZzogT3B0aW9ucyk6IHZvaWQge1xuXHRjb25zdCB0aGlzQ29uZmlnOiBPcHRpb25zID0gdGhpcy5jb25maWc7XG5cdGxldCB0YXJnZXQ7XG5cdGxldCBrZXlzO1xuXHRsZXQgcmVhZDtcblxuXHRjb25zdCBmaW5kID0gKCkgPT4ge1xuXHRcdGNvbnN0IGtleSA9IGtleXMuc2hpZnQoKTtcblxuXHRcdGlmIChrZXkgJiYgdGFyZ2V0ICYmIGlzT2JqZWN0VHlwZSh0YXJnZXQpICYmIGtleSBpbiB0YXJnZXQpIHtcblx0XHRcdHRhcmdldCA9IHRhcmdldFtrZXldO1xuXHRcdFx0cmV0dXJuIGZpbmQoKTtcblx0XHR9IGVsc2UgaWYgKCFrZXkpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fTtcblxuXHRPYmplY3Qua2V5cyh0aGlzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0dGFyZ2V0ID0gY29uZmlnO1xuXHRcdGtleXMgPSBrZXkuc3BsaXQoXCJfXCIpO1xuXHRcdHJlYWQgPSBmaW5kKCk7XG5cblx0XHRpZiAoaXNEZWZpbmVkKHJlYWQpKSB7XG5cdFx0XHR0aGlzQ29uZmlnW2tleV0gPSByZWFkO1xuXHRcdH1cblx0fSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzExX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xNF9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTVfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIFRleHRPdmVybGFwIHBsdWdpbiBvcHRpb24gY2xhc3NcbiAqIEBjbGFzcyBUZXh0T3ZlcmxhcE9wdGlvbnNcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBUZXh0T3ZlcmxhcCBwbHVnaW4gb3B0aW9uc1xuICogQGF1Z21lbnRzIFBsdWdpblxuICogQHJldHVybnMge1RleHRPdmVybGFwT3B0aW9uc31cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgc2VsZWN0b3Igc3RyaW5nIGZvciB0YXJnZXQgdGV4dCBub2Rlc1xuXHRcdFx0ICogQG5hbWUgc2VsZWN0b3Jcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcblx0XHRcdCAqIEB0eXBlIHtzdHJpbmd9XG5cdFx0XHQgKiBAZGVmYXVsdCBcIi5iYi10ZXh0cyB0ZXh0XCJcblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiAgLy8gc2VsZWN0b3IgZm9yIGRhdGEgbGFiZWwgdGV4dCBub2Rlc1xuXHRcdFx0ICogc2VsZWN0b3I6IFwiLmJiLXRleHRzIHRleHRcIlxuXHRcdFx0ICovXG5cdFx0XHRzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBleHRlbnQgb2YgbGFiZWwgb3ZlcmxhcCBwcmV2ZW50aW9uXG5cdFx0XHQgKiBAbmFtZSBleHRlbnRcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tdGV4dG92ZXJsYXBcblx0XHRcdCAqIEB0eXBlIHtudW1iZXJ9XG5cdFx0XHQgKiBAZGVmYXVsdCAxXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogXHRleHRlbnQ6IDFcblx0XHRcdCAqL1xuXHRcdFx0ZXh0ZW50OiAxLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldCBtaW5pbXVtIGFyZWEgbmVlZGVkIHRvIHNob3cgYSBkYXRhIGxhYmVsXG5cdFx0XHQgKiBAbmFtZSBhcmVhXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXRleHRvdmVybGFwXG5cdFx0XHQgKiBAdHlwZSB7bnVtYmVyfVxuXHRcdFx0ICogQGRlZmF1bHQgMFxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqIFx0YXJlYTogMFxuXHRcdFx0ICovXG5cdFx0XHRhcmVhOiAwXG5cdFx0fTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHt2b3Jvbm9pIGFzIGQzVm9yb25vaX0gZnJvbSBcImQzLXZvcm9ub2lcIjtcbmltcG9ydCB7XG5cdHBvbHlnb25DZW50cm9pZCBhcyBkM1BvbHlnb25DZW50cm9pZCxcblx0cG9seWdvbkFyZWEgYXMgZDNQb2x5Z29uQXJlYVxufSBmcm9tIFwiZDMtcG9seWdvblwiO1xuaW1wb3J0IHtcblx0c2VsZWN0IGFzIGQzU2VsZWN0LFxuXHRzZWxlY3RBbGwgYXMgZDNTZWxlY3RBbGxcbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtsb2FkQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29uZmlnL2NvbmZpZ1wiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5pbXBvcnQgT3B0aW9ucyBmcm9tIFwiLi9PcHRpb25zXCI7XG5cbi8qKlxuICogVGV4dE92ZXJsYXAgcGx1Z2luPGJyPlxuICogUHJldmVudHMgbGFiZWwgb3ZlcmxhcCB1c2luZyBbVm9yb25vaSBsYXlvdXRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Zvcm9ub2lfZGlhZ3JhbSkuXG4gKiAtICoqTk9URToqKlxuICogICAtIFBsdWdpbnMgYXJlbid0IGJ1aWx0LWluLiBOZWVkIHRvIGJlIGxvYWRlZCBvciBpbXBvcnRlZCB0byBiZSB1c2VkLlxuICogICAtIE5vbiByZXF1aXJlZCBtb2R1bGVzIGZyb20gYmlsbGJvYXJkLmpzIGNvcmUsIG5lZWQgdG8gYmUgaW5zdGFsbGVkIHNlcGFyYXRlbHkuXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXG4gKiAgIC0gW2QzLXBvbHlnb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1wb2x5Z29uKVxuICogICAtIFtkMy12b3Jvbm9pXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtdm9yb25vaSlcbiAqIEBjbGFzcyBwbHVnaW4tdGV4dG92ZXJsYXBcbiAqIEByZXF1aXJlcyBkMy1zZWxlY3Rpb25cbiAqIEByZXF1aXJlcyBkMy1wb2x5Z29uXG4gKiBAcmVxdWlyZXMgZDMtdm9yb25vaVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgVGV4dE92ZXJsYXAgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtUZXh0T3ZlcmxhcH1cbiAqIEBleGFtcGxlXG4gKiAgdmFyIGNoYXJ0ID0gYmIuZ2VuZXJhdGUoe1xuICogICAgIGRhdGE6IHtcbiAqICAgICBcdCAgY29sdW1uczogWyAuLi4gXVxuICogICAgIH1cbiAqICAgICAuLi5cbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IGJiLnBsdWdpbi50ZXh0b3ZlcmxhcCh7XG4gKiAgICAgICAgICBzZWxlY3RvcjogXCIuYmItdGV4dHMgdGV4dFwiLFxuICogICAgICAgICAgZXh0ZW50OiA4LFxuICogICAgICAgICAgYXJlYTogM1xuICogICAgIF1cbiAqICB9KTtcbiAqIEBleGFtcGxlXG4gKlx0aW1wb3J0IHtiYn0gZnJvbSBcImJpbGxib2FyZC5qc1wiO1xuICogaW1wb3J0IFRleHRPdmVybGFwIGZyb20gXCJiaWxsYm9hcmQuanMvZGlzdC9iaWxsYm9hcmRqcy1wbHVnaW4tdGV4dG92ZXJsYXBcIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBUZXh0T3ZlcmxhcCh7IC4uLiB9KVxuICogICAgIF1cbiAqIH0pXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRPdmVybGFwIGV4dGVuZHMgUGx1Z2luIHtcblx0cHJpdmF0ZSBjb25maWc7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXHRcdHRoaXMuY29uZmlnID0gbmV3IE9wdGlvbnMoKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0JGluaXQoKTogdm9pZCB7XG5cdFx0bG9hZENvbmZpZy5jYWxsKHRoaXMsIHRoaXMub3B0aW9ucyk7XG5cdH1cblxuXHQkcmVkcmF3KCk6IHZvaWQge1xuXHRcdGNvbnN0IHRleHQgPSBkM1NlbGVjdEFsbCh0aGlzLmNvbmZpZy5zZWxlY3Rvcik7XG5cblx0XHQhdGV4dC5lbXB0eSgpICYmIHRoaXMucHJldmVudExhYmVsT3ZlcmxhcCh0ZXh0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZW5lcmF0ZXMgdGhlIHZvcm9ub2kgbGF5b3V0IGZvciBkYXRhIGxhYmVsc1xuXHQgKiBAcGFyYW0ge29iamVjdH0gZGF0YSBJbmRpY2VzIHZhbHVlc1xuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBWb3Jvbm9pIGxheW91dCBwb2ludHMgYW5kIGNvcnJlc3BvbmRpbmcgRGF0YSBwb2ludHNcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGdlbmVyYXRlVm9yb25vaShkYXRhKSB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXM7XG5cdFx0Y29uc3Qge3NjYWxlfSA9ICQkO1xuXHRcdGNvbnN0IFttaW4sIG1heF0gPSBbXCJ4XCIsIFwieVwiXS5tYXAodiA9PiBzY2FsZVt2XS5kb21haW4oKSk7XG5cblx0XHRbbWluWzFdLCBtYXhbMF1dID0gW21heFswXSwgbWluWzFdXTtcblxuXHRcdHJldHVybiBkM1Zvcm9ub2koKVxuXHRcdFx0LmV4dGVudChbbWluLCBtYXhdKVxuXHRcdFx0LnBvbHlnb25zKGRhdGEpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0ZXh0IGxhYmVsJ3MgcG9zaXRpb24gdG8gcHJldmVudGcgb3ZlcmxhcC5cblx0ICogQHBhcmFtIHtkM1NlbGVjdGlvbn0gdGV4dCB0YXJnZXQgdGV4dCBzZWxlY3Rpb25cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHByZXZlbnRMYWJlbE92ZXJsYXAodGV4dCk6IHZvaWQge1xuXHRcdGNvbnN0IHtleHRlbnQsIGFyZWF9ID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgY2VsbHMgPSB0aGlzLmdlbmVyYXRlVm9yb25vaSh0ZXh0LmRhdGEoKS5tYXAodiA9PiBbdi54LCB2LnZhbHVlXSkpO1xuXHRcdGxldCBpID0gMDtcblxuXHRcdHRleHQuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGNvbnN0IGNlbGwgPSBjZWxsc1tpKytdO1xuXG5cdFx0XHRpZiAoY2VsbCAmJiB0aGlzKSB7XG5cdFx0XHRcdGNvbnN0IFt4LCB5XSA9IGNlbGwuZGF0YTtcblx0XHRcdFx0Y29uc3QgW2N4LCBjeV0gPSBkM1BvbHlnb25DZW50cm9pZChjZWxsKTtcblx0XHRcdFx0Y29uc3QgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXRhbjIoY3kgLSB5LCBjeCAtIHgpIC8gTWF0aC5QSSAqIDIpO1xuXG5cdFx0XHRcdGNvbnN0IHhUcmFuc2xhdGUgPSBleHRlbnQgKiAoYW5nbGUgPT09IDAgPyAxIDogLTEpO1xuXHRcdFx0XHRjb25zdCB5VHJhbnNsYXRlID0gYW5nbGUgPT09IC0xID8gLWV4dGVudCA6IGV4dGVudCArIDU7XG5cblx0XHRcdFx0Y29uc3QgdHh0QW5jaG9yID0gTWF0aC5hYnMoYW5nbGUpID09PSAxID9cblx0XHRcdFx0XHRcIm1pZGRsZVwiIDogKGFuZ2xlID09PSAwID8gXCJzdGFydFwiIDogXCJlbmRcIik7XG5cblx0XHRcdFx0ZDNTZWxlY3QodGhpcylcblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0LmF0dHIoXCJkaXNwbGF5XCIsIGQzUG9seWdvbkFyZWEoY2VsbCkgPCBhcmVhID8gXCJub25lXCIgOiBudWxsKVxuXHRcdFx0XHRcdC5hdHRyKFwidGV4dC1hbmNob3JcIiwgdHh0QW5jaG9yKVxuXHRcdFx0XHRcdC5hdHRyKFwiZHlcIiwgYDAuJHthbmdsZSA9PT0gMSA/IDcxIDogMzV9ZW1gKVxuXHRcdFx0XHRcdC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt4VHJhbnNsYXRlfSwgJHt5VHJhbnNsYXRlfSlgKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBXaW5kb3cgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cbmV4cG9ydCB7d2luIGFzIHdpbmRvdywgZG9jIGFzIGRvY3VtZW50fTtcblxuY29uc3Qgd2luID0gKCgpID0+IHtcblx0Y29uc3QgZGVmID0gbyA9PiB0eXBlb2YgbyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvO1xuXG5cdHJldHVybiBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdykgfHwgZGVmKGdsb2JhbCkgfHwgZGVmKGdsb2JhbFRoaXMpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xuaW1wb3J0IHtkM1NlbGVjdGlvbn0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcblxuZXhwb3J0IHtcblx0YXNIYWxmUGl4ZWwsXG5cdGJydXNoRW1wdHksXG5cdGNhbGxGbixcblx0Y2FwaXRhbGl6ZSxcblx0Y2VpbDEwLFxuXHRjb252ZXJ0SW5wdXRUeXBlLFxuXHRkZWVwQ2xvbmUsXG5cdGRpZmZEb21haW4sXG5cdGVuZGFsbCxcblx0ZW11bGF0ZUV2ZW50LFxuXHRleHRlbmQsXG5cdGdldEJydXNoU2VsZWN0aW9uLFxuXHRnZXRCb3VuZGluZ1JlY3QsXG5cdGdldENzc1J1bGVzLFxuXHRnZXRNaW5NYXgsXG5cdGdldE9wdGlvbixcblx0Z2V0UGF0aEJveCxcblx0Z2V0UmFuZG9tLFxuXHRnZXRSYW5nZSxcblx0Z2V0UmVjdFNlZ0xpc3QsXG5cdGdldFRyYW5zbGF0aW9uLFxuXHRnZXRVbmlxdWUsXG5cdGhhc1ZhbHVlLFxuXHRpc0FycmF5LFxuXHRpc2Jvb2xlYW4sXG5cdGlzRGVmaW5lZCxcblx0aXNFbXB0eSxcblx0aXNGdW5jdGlvbixcblx0aXNOdW1iZXIsXG5cdGlzT2JqZWN0LFxuXHRpc09iamVjdFR5cGUsXG5cdGlzU3RyaW5nLFxuXHRpc1RhYlZpc2libGUsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc1ZhbHVlLFxuXHRtZXJnZUFycmF5LFxuXHRtZXJnZU9iaixcblx0bm90RW1wdHksXG5cdHBhcnNlRGF0ZSxcblx0c2FuaXRpc2UsXG5cdHNldFRleHRWYWx1ZSxcblx0c29ydFZhbHVlLFxuXHR0b0FycmF5LFxuXHR0cGxQcm9jZXNzXG59O1xuXG5jb25zdCBpc1ZhbHVlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdiB8fCB2ID09PSAwO1xuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1N0cmluZyA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xuY29uc3QgaXNOdW1iZXIgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0RlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzYm9vbGVhbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcbmNvbnN0IGFzSGFsZlBpeGVsID0gKG46IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwobikgKyAwLjU7XG5jb25zdCBkaWZmRG9tYWluID0gKGQ6IG51bWJlcltdKTogbnVtYmVyID0+IGRbMV0gLSBkWzBdO1xuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XG5jb25zdCBpc0VtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gKFxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzT2JqZWN0VHlwZShvKSAmJiAhKG8gaW5zdGFuY2VvZiBEYXRlKSAmJiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDApIHx8XG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcbik7XG5jb25zdCBub3RFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+ICFpc0VtcHR5KG8pO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KTogYm9vbGVhbiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xuXG4vKipcbiAqIEdldCBzcGVjaWZpZWQga2V5IHZhbHVlIGZyb20gb2JqZWN0XG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB2YWx1ZVxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxuICogQHJldHVybnMgeyp9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRPcHRpb24ob3B0aW9uczogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlKTogYW55IHtcblx0cmV0dXJuIGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaWN0IFRhcmdldCBvYmplY3QgdG8gYmUgY2hlY2tlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXHRsZXQgZm91bmQgPSBmYWxzZTtcblxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xuXG5cdHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XG5cdGNvbnN0IGlzRm4gPSBpc0Z1bmN0aW9uKGZuKTtcblxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XG5cdHJldHVybiBpc0ZuO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gYWZ0ZXIgYWxsIHRyYW5zaXRpb25zIGVuZHNcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXG4gKiBAcGFyYW0ge0Z1Y250aW9ufSBjYiBDYWxsYmFjayBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW5kYWxsKHRyYW5zaXRpb24sIGNiOiBGdW5jdGlvbik6IHZvaWQge1xuXHRsZXQgbiA9IDA7XG5cblx0dHJhbnNpdGlvblxuXHRcdC5lYWNoKCgpID0+ICsrbilcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xuXHRcdFx0IS0tbiAmJiBjYi5hcHBseSh0aGlzLCAuLi5hcmdzKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmcgdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYW5pdGlzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cblx0XHRzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHI7XG59XG5cbi8qKlxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHZhbHVlIHN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxuXHRub2RlOiBkM1NlbGVjdGlvbixcblx0dGV4dDogc3RyaW5nLFxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxuXHR0b01pZGRsZTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XG5cdFx0bm9kZS50ZXh0KHRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xuXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcblxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xuXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXG5cdFx0XHRcdFx0LnRleHQodik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmVjdFNlZ0xpc3QocGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50KToge3g6IG51bWJlciwgeTogbnVtYmVyfVtdIHtcblx0Lypcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcblx0ICogKi9cblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XG5cblx0cmV0dXJuIFtcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcblx0XHR7eCwgeX0sIC8vIHNlZzFcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcblx0XTtcbn1cblxuLyoqXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEJveChcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XG4pOiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XG5cdGNvbnN0IHggPSBpdGVtc1swXS54O1xuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XG5cblx0cmV0dXJuIHtcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJuIGJydXNoIHNlbGVjdGlvbiBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHt9IFNlbGVjdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fS4kZWwgU2VsZWN0aW9uIG9iamVjdFxuICogQHJldHVybnMge2QzLmJydXNoU2VsZWN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0QnJ1c2hTZWxlY3Rpb24oeyRlbH0pIHtcblx0Y29uc3QgZXZlbnQgPSBkM0V2ZW50O1xuXHRjb25zdCBtYWluID0gJGVsLnN1YmNoYXJ0Lm1haW4gfHwgJGVsLm1haW47XG5cdGxldCBzZWxlY3Rpb247XG5cblx0Ly8gY2hlY2sgZnJvbSBldmVudFxuXHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gXCJicnVzaFwiKSB7XG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXG5cdH0gZWxzZSBpZiAobWFpbiAmJiAoc2VsZWN0aW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLmJydXNofWApLm5vZGUoKSkpIHtcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0aW9uO1xufVxuXG4vKipcbiAqIEdldCBib3VuZGluZ0NsaWVudFJlY3QuXG4gKiBDYWNoZSB0aGUgZXZhbHVhdGVkIHZhbHVlIG9uY2UgaXQgd2FzIGNhbGxlZC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgVGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRCb3VuZGluZ1JlY3QgPSAobm9kZSk6IHtcblx0bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsXG5cdHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlclxufSA9PiBub2RlLnJlY3QgfHwgKG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuXG4vKipcbiAqIFJldHJ1biByYW5kb20gbnVtYmVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzU3RyIENvbnZlcnQgcmV0dXJuZWQgdmFsdWUgYXMgc3RyaW5nXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbShhc1N0cjogYm9vbGVhbiA9IHRydWUpOiBudW1iZXIgfCBzdHJpbmcge1xuXHRjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcblxuXHRyZXR1cm4gYXNTdHIgPyBTdHJpbmcocmFuZCkgOiByYW5kO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XG4gKiBAcGFyYW0ge29iamVjdH0gY3R4IEJ1cnNoIGNvbnRleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYnJ1c2hFbXB0eShjdHgpOiBib29sZWFuIHtcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogRGVlcCBjb3B5IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gQ2xvbmVkIG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVlcENsb25lKC4uLm9iamVjdE4pIHtcblx0Y29uc3QgY2xvbmUgPSB2ID0+IHtcblx0XHRpZiAoaXNPYmplY3QodikgJiYgdi5jb25zdHJ1Y3Rvcikge1xuXHRcdFx0Y29uc3QgciA9IG5ldyB2LmNvbnN0cnVjdG9yKCk7XG5cblx0XHRcdGZvciAoY29uc3QgayBpbiB2KSB7XG5cdFx0XHRcdHJba10gPSBjbG9uZSh2W2tdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHY7XG5cdH07XG5cblx0cmV0dXJuIG9iamVjdE4ubWFwKHYgPT4gY2xvbmUodikpXG5cdFx0LnJlZHVjZSgoYSwgYykgPT4gKFxuXHRcdFx0ey4uLmEsIC4uLmN9XG5cdFx0KSk7XG59XG5cbi8qKlxuICogRXh0ZW5kIHRhcmdldCBmcm9tIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCA9IHt9LCBzb3VyY2UpOiBvYmplY3Qge1xuXHRpZiAoaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XG5cdH1cblxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcblx0Zm9yIChjb25zdCBwIGluIHNvdXJjZSkge1xuXHRcdGlmICgvXlxcZCskLy50ZXN0KHApIHx8IHAgaW4gdGFyZ2V0KSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIFJldHVybiBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0gdiBUYXJnZXQgdG8gYmUgY29udmVydGVkXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0b0FycmF5ID0gKHY6IENTU1N0eWxlRGVjbGFyYXRpb24gfCBhbnkpOiBhbnkgPT4gW10uc2xpY2UuY2FsbCh2KTtcblxuLyoqXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzOiBhbnlbXSkge1xuXHRsZXQgcnVsZXMgPSBbXTtcblxuXHRzdHlsZVNoZWV0cy5mb3JFYWNoKHNoZWV0ID0+IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xuXHRcdFx0XHRydWxlcyA9IHJ1bGVzLmNvbmNhdCh0b0FycmF5KHNoZWV0LmNzc1J1bGVzKSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn06ICR7ZS50b1N0cmluZygpfWApO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHJ1bGVzO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxuICogQHBhcmFtIHtTVkdFbGVtZW50fSBub2RlIE5vZGUgZWxlbWVudFxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xuXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xufTtcblxuLyoqXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgU291cmNlIGRhdGFcbiAqIEByZXR1cm5zIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWUoZGF0YTogYW55W10pOiBhbnlbXSB7XG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xuXHRjb25zdCBkID0gKGlzRGF0ZSA/IGRhdGEubWFwKE51bWJlcikgOiBkYXRhKVxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XG5cblx0cmV0dXJuIGlzRGF0ZSA/IGQubWFwKHYgPT4gbmV3IERhdGUodikpIDogZDtcbn1cblxuLyoqXG4gKiBNZXJnZSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBcnJheShhcnI6IGFueVtdKTogYW55W10ge1xuXHRyZXR1cm4gYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXTtcbn1cblxuLyoqXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcblx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcblxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VPYmoodGFyZ2V0W2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xuXHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcbn1cblxuLyoqXG4gKiBTb3J0IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ3xEYXRlfSBzb3J0ZWQgZGF0ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ydFZhbHVlKGRhdGE6IGFueVtdLCBpc0FzYyA9IHRydWUpOiBhbnlbXSB7XG5cdGxldCBmbjtcblxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcbn1cblxuLyoqXG4gKiBHZXQgbWluL21heCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ21pbicgb3IgJ21heCdcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcblx0bGV0IHJlcyA9IGRhdGEuZmlsdGVyKHYgPT4gbm90RW1wdHkodikpO1xuXG5cdGlmIChyZXMubGVuZ3RoKSB7XG5cdFx0aWYgKGlzTnVtYmVyKHJlc1swXSkpIHtcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHJlcyA9IHNvcnRWYWx1ZShyZXMsIHR5cGUgPT09IFwibWluXCIpWzBdO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCByYW5nZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcCBTdGVwIG51bWJlclxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xuXHRjb25zdCByZXM6IG51bWJlcltdID0gW107XG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XG5cblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbjsgaSsrKSB7XG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuLy8gZW11bGF0ZSBldmVudFxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xuXHRtb3VzZTogKCgpID0+IHtcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXG5cdFx0fSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xuXG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcblx0XHRcdFx0bW91c2VFdmVudC5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRldmVudFR5cGUsXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXG5cdFx0XHRcdFx0cGFyYW1zLmNhbmNlbGFibGUsXG5cdFx0XHRcdFx0d2luZG93LFxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XG5cdFx0XHRcdFx0cGFyYW1zLnNjcmVlblgsIHBhcmFtcy5zY3JlZW5ZLFxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKSxcblx0dG91Y2g6IChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxuXHRcdFx0dGFyZ2V0OiBlbCxcblx0XHRcdHJhZGl1c1g6IDIuNSxcblx0XHRcdHJhZGl1c1k6IDIuNSxcblx0XHRcdHJvdGF0aW9uQW5nbGU6IDEwLFxuXHRcdFx0Zm9yY2U6IDAuNVxuXHRcdH0sIHBhcmFtcykpO1xuXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxuXHRcdFx0dGFyZ2V0VG91Y2hlczogW10sXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxuXHRcdH0pKTtcblx0fVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgRGF0YSB2YWx1ZSB0byBiZSByZXBsYWNlZFxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHRwbFByb2Nlc3ModHBsOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IHN0cmluZyB7XG5cdGxldCByZXMgPSB0cGw7XG5cblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2V0IHBhcnNlZCBkYXRlIHZhbHVlXG4gKiAoSXQgbXVzdCBiZSBjYWxsZWQgaW4gJ0NoYXJ0SW50ZXJuYWwnIGNvbnRleHQpXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge0RhdGV9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IGFueSk6IERhdGUge1xuXHRsZXQgcGFyc2VkRGF0ZTtcblxuXHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRwYXJzZWREYXRlID0gZGF0ZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xuXHRcdGNvbnN0IHtjb25maWcsIGZvcm1hdH0gPSB0aGlzO1xuXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcblx0fSBlbHNlIGlmIChpc051bWJlcihkYXRlKSAmJiAhaXNOYU4oZGF0ZSkpIHtcblx0XHRwYXJzZWREYXRlID0gbmV3IERhdGUoK2RhdGUpO1xuXHR9XG5cblx0aWYgKCFwYXJzZWREYXRlIHx8IGlzTmFOKCtwYXJzZWREYXRlKSkge1xuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxuXHRcdFx0Y29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIHggJyR7ZGF0ZX0nIHRvIERhdGUgb2JqZWN0YCk7XG5cdH1cblxuXHRyZXR1cm4gcGFyc2VkRGF0ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gaWYgdGhlIGN1cnJlbnQgZG9jIGlzIHZpc2libGUgb3Igbm90XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcblx0cmV0dXJuICFkb2N1bWVudC5oaWRkZW47XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG91Y2ggQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUudG91Y2hcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGxcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRJbnB1dFR5cGUobW91c2U6IGJvb2xlYW4sIHRvdWNoOiBib29sZWFuKTogXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbCB7XG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnQjTW9iaWxlX1RhYmxldF9vcl9EZXNrdG9wXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcblx0XHQvLyBTb21lIEVkZ2UgZGVza3RvcCByZXR1cm4gdHJ1ZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMjA0MTcwNzQvXG5cdFx0Y29uc3QgaGFzVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yICYmIFwibWF4VG91Y2hQb2ludHNcIiBpbiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuXG5cdFx0Ly8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvdG91Y2hldmVudHMuanNcblx0XHQvLyBPbiBJRTExIHdpdGggSUU5IGVtdWxhdGlvbiBtb2RlLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSBpcyByZXR1cm5pbmcgdHJ1ZVxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcblxuXHRcdGlzTW9iaWxlID0gaGFzVG91Y2hQb2ludHMgfHwgaGFzVG91Y2g7XG5cdH1cblxuXHRjb25zdCBoYXNNb3VzZSA9IG1vdXNlICYmICFpc01vYmlsZSA/IChcIm9ubW91c2VvdmVyXCIgaW4gd2luZG93KSA6IGZhbHNlO1xuXG5cdHJldHVybiAoaGFzTW91c2UgJiYgXCJtb3VzZVwiKSB8fCAoaXNNb2JpbGUgJiYgXCJ0b3VjaFwiKSB8fCBudWxsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==