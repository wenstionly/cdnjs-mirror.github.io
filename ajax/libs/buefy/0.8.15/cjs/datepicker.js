'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-5094d8df.js');
require('./helpers.js');
require('./chunk-805257cc.js');
require('./chunk-c0ff4e55.js');
require('./chunk-fa132d6c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-eeeada01.js');
require('./chunk-ae7e641a.js');
require('./chunk-2a9ddcd6.js');
require('./chunk-8ffa5604.js');
require('./chunk-8a7b4eb6.js');
var __chunk_15 = require('./chunk-f4bc6de2.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_15.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_15.Datepicker;
exports.default = Plugin;
