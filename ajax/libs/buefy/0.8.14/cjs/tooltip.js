'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-805257cc.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_23 = require('./chunk-f83faa8e.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_23.Tooltip);
  }
};
__chunk_5.use(Plugin);

exports.BTooltip = __chunk_23.Tooltip;
exports.default = Plugin;
