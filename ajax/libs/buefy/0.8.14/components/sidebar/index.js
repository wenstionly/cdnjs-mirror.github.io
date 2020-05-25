/*! Buefy v0.8.14 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Sidebar = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);
  var events = isTouch ? ['touchstart', 'click'] : ['click'];
  var instances = [];

  function processArgs(bindingValue) {
    var isFunction = typeof bindingValue === 'function';

    if (!isFunction && _typeof(bindingValue) !== 'object') {
      throw new Error("v-click-outside: Binding value should be a function or an object, typeof ".concat(bindingValue, " given"));
    }

    return {
      handler: isFunction ? bindingValue : bindingValue.handler,
      middleware: bindingValue.middleware || function (isClickOutside) {
        return isClickOutside;
      },
      events: bindingValue.events || events
    };
  }

  function onEvent(_ref) {
    var el = _ref.el,
        event = _ref.event,
        handler = _ref.handler,
        middleware = _ref.middleware;
    var isClickOutside = event.target !== el && !el.contains(event.target);

    if (!isClickOutside) {
      return;
    }

    if (middleware(event, el)) {
      handler(event, el);
    }
  }

  function bind(el, _ref2) {
    var value = _ref2.value;

    var _processArgs = processArgs(value),
        _handler = _processArgs.handler,
        middleware = _processArgs.middleware,
        events = _processArgs.events;

    var instance = {
      el: el,
      eventHandlers: events.map(function (eventName) {
        return {
          event: eventName,
          handler: function handler(event) {
            return onEvent({
              event: event,
              el: el,
              handler: _handler,
              middleware: middleware
            });
          }
        };
      })
    };
    instance.eventHandlers.forEach(function (_ref3) {
      var event = _ref3.event,
          handler = _ref3.handler;
      return document.addEventListener(event, handler);
    });
    instances.push(instance);
  }

  function update(el, _ref4) {
    var value = _ref4.value;

    var _processArgs2 = processArgs(value),
        _handler2 = _processArgs2.handler,
        middleware = _processArgs2.middleware,
        events = _processArgs2.events; // `filter` instead of `find` for compat with IE


    var instance = instances.filter(function (instance) {
      return instance.el === el;
    })[0];
    instance.eventHandlers.forEach(function (_ref5) {
      var event = _ref5.event,
          handler = _ref5.handler;
      return document.removeEventListener(event, handler);
    });
    instance.eventHandlers = events.map(function (eventName) {
      return {
        event: eventName,
        handler: function handler(event) {
          return onEvent({
            event: event,
            el: el,
            handler: _handler2,
            middleware: middleware
          });
        }
      };
    });
    instance.eventHandlers.forEach(function (_ref6) {
      var event = _ref6.event,
          handler = _ref6.handler;
      return document.addEventListener(event, handler);
    });
  }

  function unbind(el) {
    // `filter` instead of `find` for compat with IE
    var instance = instances.filter(function (instance) {
      return instance.el === el;
    })[0];
    instance.eventHandlers.forEach(function (_ref7) {
      var event = _ref7.event,
          handler = _ref7.handler;
      return document.removeEventListener(event, handler);
    });
  }

  var directive = {
    bind: bind,
    update: update,
    unbind: unbind,
    instances: instances
  };

  //
  var script = {
    name: 'BSidebar',
    directives: {
      clickOutside: directive
    },
    props: {
      open: Boolean,
      type: [String, Object],
      overlay: Boolean,
      position: {
        type: String,
        default: 'fixed',
        validator: function validator(value) {
          return ['fixed', 'absolute', 'static'].indexOf(value) >= 0;
        }
      },
      fullheight: Boolean,
      fullwidth: Boolean,
      right: Boolean,
      mobile: {
        type: String
      },
      reduce: Boolean,
      expandOnHover: Boolean,
      canCancel: {
        type: [Array, Boolean],
        default: function _default() {
          return ['escape', 'outside'];
        }
      },
      onCancel: {
        type: Function,
        default: function _default() {}
      }
    },
    data: function data() {
      return {
        isOpen: this.open,
        transitionName: null
      };
    },
    computed: {
      rootClasses: function rootClasses() {
        return [this.type, {
          'is-fixed': this.isFixed,
          'is-static': this.isStatic,
          'is-absolute': this.isAbsolute,
          'is-fullheight': this.fullheight,
          'is-fullwidth': this.fullwidth,
          'is-right': this.right,
          'is-mini': this.reduce,
          'is-mini-expand': this.expandOnHover,
          'is-mini-mobile': this.mobile === 'reduce',
          'is-hidden-mobile': this.mobile === 'hide',
          'is-fullwidth-mobile': this.mobile === 'fullwidth'
        }];
      },
      cancelOptions: function cancelOptions() {
        return typeof this.canCancel === 'boolean' ? this.canCancel ? ['escape', 'outside'] : [] : this.canCancel;
      },
      isStatic: function isStatic() {
        return this.position === 'static';
      },
      isFixed: function isFixed() {
        return this.position === 'fixed';
      },
      isAbsolute: function isAbsolute() {
        return this.position === 'absolute';
      }
    },
    watch: {
      open: {
        handler: function handler(value) {
          this.isOpen = value;
          var open = this.right ? !value : value;
          this.transitionName = !open ? 'slide-prev' : 'slide-next';
        },
        immediate: true
      }
    },
    methods: {
      /**
      * Keypress event that is bound to the document.
      */
      keyPress: function keyPress(event) {
        // Esc key
        if (this.isOpen && event.keyCode === 27) this.cancel('escape');
      },

      /**
      * Close the Sidebar if canCancel and call the onCancel prop (function).
      */
      cancel: function cancel(method) {
        if (this.cancelOptions.indexOf(method) < 0) return;
        if (this.static) return;
        this.onCancel.apply(null, arguments);
        this.close();
      },

      /**
      * Call the onCancel prop (function) and emit events
      */
      close: function close() {
        this.isOpen = false;
        this.$emit('close');
        this.$emit('update:open', false);
      },
      clickOutside: function clickOutside() {
        if (this.isFixed && this.isOpen) {
          this.cancel('outside');
        }
      }
    },
    created: function created() {
      if (typeof window !== 'undefined') {
        document.addEventListener('keyup', this.keyPress);
      }
    },
    mounted: function mounted() {
      if (this.isFixed) {
        document.body.appendChild(this.$el);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        document.removeEventListener('keyup', this.keyPress);
      }

      if (this.isFixed) {
        document.body.removeChild(this.$el);
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-sidebar"},[(_vm.overlay && _vm.isOpen)?_c('div',{staticClass:"sidebar-background"}):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"name":_vm.transitionName}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"},{name:"click-outside",rawName:"v-click-outside",value:(_vm.clickOutside),expression:"clickOutside"}],staticClass:"sidebar-content",class:_vm.rootClasses},[_vm._t("default")],2)])],1)};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Sidebar = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };

  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, Sidebar);
    }
  };
  use(Plugin);

  exports.BSidebar = Sidebar;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
