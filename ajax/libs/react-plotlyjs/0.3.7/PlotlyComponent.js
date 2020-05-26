'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _plotly = require('plotly.js');

var _plotly2 = _interopRequireDefault(_plotly);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PlotlyComponent = _react2.default.createClass({

  displayName: 'Plotly',
  propTypes: {
    data: _react2.default.PropTypes.array,
    layout: _react2.default.PropTypes.object,
    config: _react2.default.PropTypes.object,
    onClick: _react2.default.PropTypes.func,
    onBeforeHover: _react2.default.PropTypes.func,
    onHover: _react2.default.PropTypes.func,
    onUnHover: _react2.default.PropTypes.func,
    onSelected: _react2.default.PropTypes.func
  },

  attachListeners: function attachListeners() {
    if (this.props.onClick) this.container.on('plotly_click', this.props.onClick);
    if (this.props.onBeforeHover) this.container.on('plotly_beforehover', this.props.onBeforeHover);
    if (this.props.onHover) this.container.on('plotly_hover', this.props.onHover);
    if (this.props.onUnHover) this.container.on('plotly_unhover', this.props.onUnHover);
    if (this.props.onSelected) this.container.on('plotly_selected', this.props.onSelected);
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    //TODO logic for detecting change in props
    return true;
  },
  componentDidMount: function componentDidMount() {
    var _props = this.props;
    var data = _props.data;
    var layout = _props.layout;
    var config = _props.config;

    _plotly2.default.newPlot(this.container, data, (0, _lodash2.default)(layout), config); //We clone the layout as plotly mutates it.
    this.attachListeners();
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    //TODO use minimal update for given changes
    if (prevProps.data !== this.props.data || prevProps.layout !== this.props.layout) {
      _plotly2.default.newPlot(this.container, this.props.data, this.props.layout);
      this.attachListeners();
    }
  },


  componentWillUnmount: function componentWillUnmount() {
    _plotly2.default.purge(this.container);
  },

  resize: function resize() {
    _plotly2.default.Plots.resize(this.container);
  },

  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var data = _props2.data;
    var layout = _props2.layout;
    var config = _props2.config;

    var other = _objectWithoutProperties(_props2, ['data', 'layout', 'config']);

    return _react2.default.createElement('div', _extends({}, other, { ref: function ref(node) {
        return _this.container = node;
      } }));
  }
});

module.exports = PlotlyComponent;