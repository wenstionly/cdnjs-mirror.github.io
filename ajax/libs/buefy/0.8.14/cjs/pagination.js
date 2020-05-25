'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-5094d8df.js');
require('./helpers.js');
require('./chunk-805257cc.js');
require('./chunk-fa132d6c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_22 = require('./chunk-03ea8b0c.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_22.Pagination);
    __chunk_5.registerComponent(Vue, __chunk_22.PaginationButton);
  }
};
__chunk_5.use(Plugin);

exports.BPagination = __chunk_22.Pagination;
exports.BPaginationButton = __chunk_22.PaginationButton;
exports.default = Plugin;
