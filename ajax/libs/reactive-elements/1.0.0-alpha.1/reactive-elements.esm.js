import { createElement, Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var noBooleanTransformName = 'reactive-elements-no-boolean-transform';

function getAllProperties(obj) {
  var props = {};

  while (obj && obj !== Component.prototype && obj !== Object.prototype) {
    var propNames = Object.getOwnPropertyNames(obj);

    for (var i = 0; i < propNames.length; i++) {
      props[propNames[i]] = null;
    }

    obj = Object.getPrototypeOf(obj);
  }

  delete props.constructor;
  return Object.keys(props);
}

function extend(extensible, extending) {
  var props = getAllProperties(extending);

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];

    if (!(prop in extensible)) {
      var val = extending[prop];
      extensible[prop] = val;
    }
  }
}

function elementHasNoBooleanTransformAttribute(el) {
  var foundAttribute = false;

  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];

    if (attribute.name === noBooleanTransformName) {
      foundAttribute = true;
      break;
    }
  }

  return foundAttribute;
}

function getProps(el) {
  var props = {};
  var noBooleanTransforms = elementHasNoBooleanTransformAttribute(el);

  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];
    if (attribute.name === noBooleanTransformName) continue;
    var name = attributeNameToPropertyName(attribute.name);
    props[name] = parseAttributeValue(attribute.value, {
      noBooleanTransforms: noBooleanTransforms
    });
  }

  props.container = el;
  return props;
}

function getterSetter(variableParent, variableName, getterFunction, setterFunction) {
  if (Object.defineProperty) {
    Object.defineProperty(variableParent, variableName, {
      get: getterFunction,
      set: setterFunction
    });
  } else if (document.__defineGetter__) {
    variableParent.__defineGetter__(variableName, getterFunction);

    variableParent.__defineSetter__(variableName, setterFunction);
  }

  variableParent['get' + variableName] = getterFunction;
  variableParent['set' + variableName] = setterFunction;
}

function attributeNameToPropertyName(attributeName) {
  return attributeName.replace(/^(x|data)[-_:]/i, '').replace(/[-_:](.)/g, function (x, chr) {
    return chr.toUpperCase();
  });
}

function parseAttributeValue(value, transformOptions) {
  if (value == undefined) {
    return null;
  }

  if (!transformOptions) {
    transformOptions = {};
  } // Support attribute values with newlines


  value = value.replace(/[\n\r]/g, '');
  var pointerRegexp = /^{.*?}$/i,
      jsonRegexp = /^{{2}.*}{2}$/,
      jsonArrayRegexp = /^{\[.*\]}$/;
  var pointerMatches = value.match(pointerRegexp),
      jsonMatches = value.match(jsonRegexp) || value.match(jsonArrayRegexp);

  if (jsonMatches) {
    value = JSON.parse(jsonMatches[0].replace(/^{|}$/g, ''));
  } else if (pointerMatches) {
    value = eval(pointerMatches[0].replace(/[{}]/g, ''));
  } else if ((value === 'true' || value === 'false') && !transformOptions.noBooleanTransforms) {
    // convert the value to its actual boolean
    value = value === 'true';
  }

  return value;
}

function getChildren(el) {
  var fragment = document.createDocumentFragment();

  while (el.childNodes.length) {
    fragment.appendChild(el.childNodes[0]);
  }

  return fragment;
}

function shallowCopy(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }

  return a;
}

var utils = /*#__PURE__*/Object.freeze({
  getAllProperties: getAllProperties,
  extend: extend,
  elementHasNoBooleanTransformAttribute: elementHasNoBooleanTransformAttribute,
  getProps: getProps,
  getterSetter: getterSetter,
  attributeNameToPropertyName: attributeNameToPropertyName,
  parseAttributeValue: parseAttributeValue,
  getChildren: getChildren,
  shallowCopy: shallowCopy
});

var getRenderRoot = function getRenderRoot(element, useShadowDom) {
  return useShadowDom ? element.shadowRoot : element;
};

function reactiveElements(elementName, ReactComponent, options) {
  var _options$useShadowDom = options.useShadowDom,
      useShadowDom = _options$useShadowDom === void 0 ? false : _options$useShadowDom;

  function create(parent, props) {
    var element = createElement(ReactComponent, props);
    parent.reactiveElement = element;
    return render(element, getRenderRoot(parent, useShadowDom), props.onRender);
  }

  function exposeDefaultMethods(reactComponent, customElement) {
    customElement.forceUpdate = reactComponent.forceUpdate.bind(reactComponent);
  }

  function exposeMethods(reactComponent, customElement) {
    extend(customElement, reactComponent);
  }

  var CustomElement =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(CustomElement, _HTMLElement);

    function CustomElement() {
      var _this;

      _classCallCheck(this, CustomElement);

      var self = _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomElement).call(this));

      if (useShadowDom) self.attachShadow({
        mode: 'open'
      });
      var observer = new MutationObserver(function () {
        unmountComponentAtNode(getRenderRoot(self, useShadowDom));
        var props = getProps(self);
        props.children = getChildren(self);
        create(self, props);
      });
      observer.observe(self, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
      });
      return _this;
    }

    _createClass(CustomElement, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var props = getProps(this);
        props.children = getChildren(this);
        var reactElement = create(this, props);

        if (reactElement !== null) {
          exposeMethods(reactElement, reactElement.props.container);
          exposeDefaultMethods(reactElement, reactElement.props.container);
          getterSetter(this, 'props', function () {
            return reactElement.props;
          }, function (props) {
            reactElement = create(this, props);
          });
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        unmountComponentAtNode(getRenderRoot(this, useShadowDom));
      }
    }]);

    return CustomElement;
  }(_wrapNativeSuper(HTMLElement));

  customElements.define(elementName, CustomElement);
  return CustomElement;
}

reactiveElements.utils = utils;

export default reactiveElements;
//# sourceMappingURL=reactive-elements.esm.js.map
