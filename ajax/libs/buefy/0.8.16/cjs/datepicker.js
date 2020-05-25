'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-805257cc.js');
require('./chunk-be4a5cfb.js');
require('./chunk-4e86763f.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-c13768af.js');
require('./chunk-ae7e641a.js');
require('./chunk-ee15ddf6.js');
require('./chunk-27adf1f0.js');
require('./chunk-544330c4.js');
var __chunk_15 = require('./chunk-419d3355.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_15.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_15.Datepicker;
exports.default = Plugin;
