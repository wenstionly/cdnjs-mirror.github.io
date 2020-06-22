(function () {
  /*
   * Stateful things in runtime
   */
  var Host = {
    __mountID: 1,
    __isUpdating: false,
    // Inject
    driver: null,
    // Roots
    rootComponents: {},
    rootInstances: {},
    // Current owner component
    owner: null
  };

  function Element(type, key, ref, props, owner) {
    var element = {
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };

    {
      // We make validation flag non-enumerable, so the test framework could ignore it
      Object.defineProperty(element, '__validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
    }

    return element;
  }

  function isNull(obj) {
    return obj === null;
  }
  function isFunction(obj) {
    return typeof obj === 'function';
  }
  function isObject(obj) {
    return typeof obj === 'object';
  }
  function isArray(array) {
    return Array.isArray(array);
  }
  function isString(string) {
    return typeof string === 'string';
  }
  function isNumber(string) {
    return typeof string === 'number';
  }

  function traverseChildren(children, result) {
    if (isArray(children)) {
      for (var i = 0, l = children.length; i < l; i++) {
        traverseChildren(children[i], result);
      }
    } else {
      result.push(children);
    }
  }

  function flattenChildren(children) {
    if (children == null) {
      return children;
    }

    var result = [];
    traverseChildren(children, result); // If length equal 1, return the only one.

    return result.length - 1 ? result : result[0];
  }

  var warning = function warning() {};

  {
    warning = function warning(template) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (template == null) {
        throw new Error('`warning(condition, template, ...args)` requires a warning message template');
      }

      if (typeof console !== 'undefined') {
        var argsWithFormat = args.map(function (item) {
          return '' + item;
        });
        argsWithFormat.unshift('Warning: ' + template);
        Function.prototype.apply.call(console.error, console, argsWithFormat);
      }

      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        var argIndex = 0;
        var message = 'Warning: ' + template.replace(/%s/g, function () {
          return args[argIndex++];
        });
        throw new Error(message);
      } catch (x) {}
    };
  }

  var warning$1 = warning;

  function getRenderErrorInfo() {
    var ownerComponent = Host.owner;

    if (ownerComponent) {
      var name = ownerComponent.__getName();

      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }

    return '';
  }

  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */

  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    var info = getRenderErrorInfo();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }

  function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.type && !!object.props;
  }

  function validateExplicitKey(element, parentType) {
    if (element.__validated || element.key != null) {
      return;
    }

    element.__validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== Host.owner) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + element._owner.__getName() + ".";
    }

    warning$1('Each child in a list should have a unique "key" prop.%s%s', currentComponentErrorInfo, childOwner);
  }

  function validateChildKeys(node, parentType) {
    if (!isObject(node)) {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      node.__validated = true;
    } // rax isn't support iterator object as element children
    // TODO: add validate when rax support iterator object as element.

  }

  var RESERVED_PROPS = {
    key: true,
    ref: true
  };
  function createElement(type, config, children) {
    if (type == null) {
      {
        throw new Error('createElement: type should not be null or undefined.' + getRenderErrorInfo());
      }
    } // Reserved names are extracted


    var props = {};
    var propName;
    var key = null;
    var ref = null;
    var ownerComponent = Host.owner;

    if (config != null) {
      var hasReservedProps = false;

      if (config.ref != null) {
        hasReservedProps = true;
        ref = config.ref;

        {
          if (isString(ref) && !ownerComponent) {
            warning$1('createElement: adding a string ref "' + ref + '" outside the render method.');
          }
        }
      }

      if (config.key != null) {
        hasReservedProps = true;
        key = '' + config.key;
      } // If no reserved props, assign config to props for better performance


      if (hasReservedProps) {
        for (propName in config) {
          // Extract reserved props
          if (!RESERVED_PROPS[propName]) {
            props[propName] = config[propName];
          }
        }
      } else {
        props = config;
      }
    } // Children arguments can be more than one


    var childrenLength = arguments.length - 2;

    if (childrenLength > 0) {
      if (childrenLength === 1 && !isArray(children)) {
        props.children = children;
      } else {
        var childArray = children;

        if (childrenLength > 1) {
          childArray = new Array(childrenLength);

          for (var i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
          }
        }

        props.children = flattenChildren(childArray);
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    {
      for (var _i = 2; _i < arguments.length; _i++) {
        validateChildKeys(arguments[_i], type);
      }
    }

    return new Element(type, key, ref, props, ownerComponent);
  }

  function invokeFunctionsWithContext(fns, context, value) {
    for (var i = 0, l = fns && fns.length; i < l; i++) {
      fns[i].call(context, value);
    }
  }

  var updateCallbacks = [];
  var effectCallbacks = [];
  var scheduler = setTimeout;

  {
    // Wrapper timer for hijack timers in jest
    scheduler = function scheduler(callback) {
      setTimeout(callback);
    };
  } // Schedule before next render


  function schedule(callback) {
    if (updateCallbacks.length === 0) {
      scheduler(flush);
    }

    updateCallbacks.push(callback);
  } // Flush before next render

  function flush() {
    var callback;

    while (callback = updateCallbacks.shift()) {
      callback();
    }
  }
  function scheduleEffect(callback) {
    if (effectCallbacks.length === 0) {
      scheduler(flushEffect);
    }

    effectCallbacks.push(callback);
  }
  function flushEffect() {
    var callback;

    while (callback = effectCallbacks.shift()) {
      callback();
    }
  }

  var hasOwnProperty = {}.hasOwnProperty;
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y; // eslint-disable-line no-self-compare
    }
  }
  /**
   * Performs equality by iterating through keys on an object and returning false
   * when any key has values which are not strictly equal between the arguments.
   * Returns true when the values of all keys are strictly equal.
   */

  function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
      return true;
    }

    if (!isObject(objA) || isNull(objA) || !isObject(objB) || isNull(objB)) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    } // Test for A's keys different from B.


    for (var i = 0; i < keysA.length; i++) {
      if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }

    return true;
  }

  /* Common constant variables for rax */
  var INTERNAL = '_internal';
  var INSTANCE = '_instance';
  var NATIVE_NODE = '_nativeNode';
  var RENDERED_COMPONENT = '_renderedComponent';

  function getCurrentInstance() {
    return Host.owner && Host.owner[INSTANCE];
  }

  function getCurrentRenderingInstance() {
    var currentInstance = getCurrentInstance();

    if (currentInstance) {
      return currentInstance;
    } else {
      {
        throw new Error('Hooks can only be called inside a component.');
      }
    }
  }

  function areInputsEqual(inputs, prevInputs) {
    if (isNull(prevInputs) || inputs.length !== prevInputs.length) {
      return false;
    }

    for (var i = 0; i < inputs.length; i++) {
      if (is(inputs[i], prevInputs[i])) {
        continue;
      }

      return false;
    }

    return true;
  }

  function useState(initialState) {
    var currentInstance = getCurrentRenderingInstance();
    var hookID = currentInstance.getHookID();
    var hooks = currentInstance.getHooks();

    if (!hooks[hookID]) {
      // If the initial state is the result of an expensive computation,
      // you may provide a function instead for lazy initial state.
      if (isFunction(initialState)) {
        initialState = initialState();
      }

      var setState = function setState(newState) {
        // Flush all effects first before update state
        if (!Host.__isUpdating) {
          flushEffect();
        }

        var hook = hooks[hookID];
        var eagerState = hook[2]; // function updater

        if (isFunction(newState)) {
          newState = newState(eagerState);
        }

        if (!is(newState, eagerState)) {
          // Current instance is in render update phase.
          // After this one render finish, will containue run.
          hook[2] = newState;

          if (getCurrentInstance() === currentInstance) {
            // Marked as is scheduled that could finish hooks.
            currentInstance.__isScheduled = true;
          } else {
            currentInstance.__update();
          }
        }
      };

      hooks[hookID] = [initialState, setState, initialState];
    }

    var hook = hooks[hookID];

    if (!is(hook[0], hook[2])) {
      hook[0] = hook[2];
      currentInstance.__shouldUpdate = true;
    }

    return hook;
  }
  function useContext(context) {
    var currentInstance = getCurrentRenderingInstance();
    return currentInstance.useContext(context);
  }
  function useEffect(effect, inputs) {
    useEffectImpl(effect, inputs, true);
  }
  function useLayoutEffect(effect, inputs) {
    useEffectImpl(effect, inputs);
  }

  function useEffectImpl(effect, inputs, defered) {
    var currentInstance = getCurrentRenderingInstance();
    var hookID = currentInstance.getHookID();
    var hooks = currentInstance.getHooks();
    inputs = inputs === undefined ? null : inputs;

    if (!hooks[hookID]) {
      var __create = function __create(immediately) {
        if (!immediately && defered) return scheduleEffect(function () {
          return __create(true);
        });
        var current = __create.current;

        if (current) {
          __destory.current = current();
          __create.current = null;
        }
      };

      var __destory = function __destory(immediately) {
        if (!immediately && defered) return scheduleEffect(function () {
          return __destory(true);
        });
        var current = __destory.current;

        if (current) {
          current();
          __destory.current = null;
        }
      };

      __create.current = effect;
      hooks[hookID] = {
        __create: __create,
        __destory: __destory,
        __prevInputs: inputs,
        __inputs: inputs
      };
      currentInstance.didMount.push(__create);
      currentInstance.willUnmount.push(__destory);
      currentInstance.didUpdate.push(function () {
        var _hooks$hookID = hooks[hookID],
            __prevInputs = _hooks$hookID.__prevInputs,
            __inputs = _hooks$hookID.__inputs,
            __create = _hooks$hookID.__create;

        if (__inputs == null || !areInputsEqual(__inputs, __prevInputs)) {
          __destory();

          __create();
        }
      });
    } else {
      var hook = hooks[hookID];
      var _create = hook.__create,
          prevInputs = hook.__inputs;
      hook.__inputs = inputs;
      hook.__prevInputs = prevInputs;
      _create.current = effect;
    }
  }

  function useImperativeHandle(ref, create, inputs) {
    var nextInputs = isArray(inputs) ? inputs.concat([ref]) : null;
    useLayoutEffect(function () {
      if (isFunction(ref)) {
        ref(create());
        return function () {
          return ref(null);
        };
      } else if (ref != null) {
        ref.current = create();
        return function () {
          ref.current = null;
        };
      }
    }, nextInputs);
  }
  function useRef(initialValue) {
    var currentInstance = getCurrentRenderingInstance();
    var hookID = currentInstance.getHookID();
    var hooks = currentInstance.getHooks();

    if (!hooks[hookID]) {
      hooks[hookID] = {
        current: initialValue
      };
    }

    return hooks[hookID];
  }
  function useCallback(callback, inputs) {
    return useMemo(function () {
      return callback;
    }, inputs);
  }
  function useMemo(create, inputs) {
    var currentInstance = getCurrentRenderingInstance();
    var hookID = currentInstance.getHookID();
    var hooks = currentInstance.getHooks();
    inputs = inputs === undefined ? null : inputs;

    if (!hooks[hookID]) {
      hooks[hookID] = [create(), inputs];
    } else {
      var prevInputs = hooks[hookID][1];

      if (isNull(inputs) || !areInputsEqual(inputs, prevInputs)) {
        hooks[hookID] = [create(), inputs];
      }
    }

    return hooks[hookID][0];
  }
  function useReducer(reducer, initialArg, init) {
    var currentInstance = getCurrentRenderingInstance();
    var hookID = currentInstance.getHookID();
    var hooks = currentInstance.getHooks();
    var hook = hooks[hookID];

    if (!hook) {
      var initialState = isFunction(init) ? init(initialArg) : initialArg;

      var dispatch = function dispatch(action) {
        // Flush all effects first before update state
        if (!Host.__isUpdating) {
          flushEffect();
        }

        var hook = hooks[hookID]; // Reducer will update in the next render, before that we add all
        // actions to the queue

        var queue = hook[2];

        if (getCurrentInstance() === currentInstance) {
          queue.__actions.push(action);

          currentInstance.__isScheduled = true;
        } else {
          var currentState = queue.__eagerState;
          var eagerReducer = queue.__eagerReducer;
          var eagerState = eagerReducer(currentState, action);

          if (is(eagerState, currentState)) {
            return;
          }

          queue.__eagerState = eagerState;

          queue.__actions.push(action);

          currentInstance.__update();
        }
      };

      return hooks[hookID] = [initialState, dispatch, {
        __actions: [],
        __eagerReducer: reducer,
        __eagerState: initialState
      }];
    }

    var queue = hook[2];
    var next = hook[0];

    if (currentInstance.__reRenders > 0) {
      for (var i = 0; i < queue.__actions.length; i++) {
        next = reducer(next, queue.__actions[i]);
      }
    } else {
      next = queue.__eagerState;
    }

    if (!is(next, hook[0])) {
      hook[0] = next;
      currentInstance.__shouldUpdate = true;
    }

    queue.__eagerReducer = reducer;
    queue.__eagerState = next;
    queue.__actions.length = 0;
    return hooks[hookID];
  }

  function toArray(obj) {
    return isArray(obj) ? obj : [obj];
  }

  function getNearestParent(instance, matcher) {
    var parent;

    while (instance && instance[INTERNAL]) {
      if (matcher(instance)) {
        parent = instance;
        break;
      }

      instance = instance[INTERNAL].__parentInstance;
    }

    return parent;
  }

  var id = 0;
  function createContext(defaultValue) {
    var contextID = '_c' + id++; // Provider Component

    var Provider =
    /*#__PURE__*/
    function () {
      function Provider() {
        this.__contextID = contextID;
        this.__handlers = [];
      }

      var _proto = Provider.prototype;

      _proto.__on = function __on(handler) {
        this.__handlers.push(handler);
      };

      _proto.__off = function __off(handler) {
        this.__handlers = this.__handlers.filter(function (h) {
          return h !== handler;
        });
      } // Like getChildContext but called in SSR
      ;

      _proto._getChildContext = function _getChildContext() {
        var _ref;

        return _ref = {}, _ref[contextID] = this, _ref;
      };

      _proto.getValue = function getValue() {
        return this.props.value !== undefined ? this.props.value : defaultValue;
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
          invokeFunctionsWithContext(this.__handlers, null, this.getValue());
        }
      };

      _proto.render = function render() {
        return this.props.children;
      };

      return Provider;
    }();

    function getNearestParentProvider(instance) {
      return getNearestParent(instance, function (parent) {
        return parent.__contextID === contextID;
      });
    } // Consumer Component


    function Consumer(props, context) {
      var _this = this;

      // Current `context[contextID]` only works in SSR
      var _useState = useState(function () {
        return context[contextID] || getNearestParentProvider(_this);
      }),
          provider = _useState[0];

      var value = provider ? provider.getValue() : defaultValue;

      var _useState2 = useState(value),
          prevValue = _useState2[0],
          setValue = _useState2[1];

      if (value !== prevValue) {
        setValue(value);
        return; // Interrupt execution of consumer.
      }

      useLayoutEffect(function () {
        if (provider) {
          provider.__on(setValue);

          return function () {
            provider.__off(setValue);
          };
        }
      }, []); // Consumer requires a function as a child.
      // The function receives the current context value.

      var consumer = toArray(props.children)[0];

      if (isFunction(consumer)) {
        return consumer(value);
      }
    }

    return {
      Provider: Provider,
      Consumer: Consumer,
      _contextID: contextID,
      // Export for SSR
      _defaultValue: defaultValue,
      __getNearestParentProvider: getNearestParentProvider
    };
  }

  function createRef() {
    return {
      current: null
    };
  }

  function forwardRef (render) {
    render.__forwardRef = true;
    return render;
  }

  function memo(type, compare) {
    compare = compare || shallowEqual; // Memo could composed

    if (type.__compares) {
      type.__compares.push(compare);
    } else {
      type.__compares = [compare];
    }

    return type;
  }

  function Fragment(props) {
    return props.children;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * Base Component
   */

  var BaseComponent =
  /*#__PURE__*/
  function () {
    function BaseComponent(element) {
      this.__currentElement = element;
    }

    var _proto = BaseComponent.prototype;

    _proto.__initComponent = function __initComponent(parent, parentInstance, context) {
      this._parent = parent;
      this.__parentInstance = parentInstance;
      this._context = context;
      this._mountID = Host.__mountID++;
    };

    _proto.__destoryComponent = function __destoryComponent() {
      {
        Host.reconciler.unmountComponent(this);
      }

      this.__currentElement = this[NATIVE_NODE] = this._parent = this.__parentInstance = this._context = null;

      if (this[INSTANCE]) {
        this[INSTANCE] = this[INSTANCE][INTERNAL] = null;
      }
    };

    _proto.__mountComponent = function __mountComponent(parent, parentInstance, context, nativeNodeMounter) {
      this.__initComponent(parent, parentInstance, context);

      this.__mountNativeNode(nativeNodeMounter);

      {
        Host.reconciler.mountComponent(this);
      }

      var instance = {};
      instance[INTERNAL] = this;
      return instance;
    };

    _proto.unmountComponent = function unmountComponent(shouldNotRemoveChild) {
      if (this[NATIVE_NODE] && !shouldNotRemoveChild) {
        Host.driver.removeChild(this[NATIVE_NODE], this._parent);
      }

      this.__destoryComponent();
    };

    _proto.__getName = function __getName() {
      var currentElement = this.__currentElement;
      var type = currentElement && currentElement.type;
      return type && type.displayName || type && type.name || type || // Native component's name is type
      currentElement;
    };

    _proto.__mountNativeNode = function __mountNativeNode(nativeNodeMounter) {
      var nativeNode = this.__getNativeNode();

      var parent = this._parent;

      if (nativeNodeMounter) {
        nativeNodeMounter(nativeNode, parent);
      } else {
        Host.driver.appendChild(nativeNode, parent);
      }
    };

    _proto.__getNativeNode = function __getNativeNode() {
      return this[NATIVE_NODE] == null ? this[NATIVE_NODE] = this.__createNativeNode() : this[NATIVE_NODE];
    };

    _proto.__getPublicInstance = function __getPublicInstance() {
      return this.__getNativeNode();
    };

    return BaseComponent;
  }();

  /**
   * Empty Component
   */

  var EmptyComponent =
  /*#__PURE__*/
  function (_BaseComponent) {
    _inheritsLoose(EmptyComponent, _BaseComponent);

    function EmptyComponent() {
      return _BaseComponent.apply(this, arguments) || this;
    }

    var _proto = EmptyComponent.prototype;

    _proto.__createNativeNode = function __createNativeNode() {
      return Host.driver.createEmpty(this);
    };

    return EmptyComponent;
  }(BaseComponent);

  /*
   * Ref manager
   */
  function updateRef(prevElement, nextElement, component) {
    var prevRef = prevElement ? prevElement.ref : null;
    var nextRef = nextElement ? nextElement.ref : null; // Update refs in owner component

    if (prevRef !== nextRef) {
      // Detach prev RenderedElement's ref
      prevRef && detachRef(prevElement._owner, prevRef, component); // Attach next RenderedElement's ref

      nextRef && attachRef(nextElement._owner, nextRef, component);
    }
  }
  function attachRef(ownerComponent, ref, component) {
    if (!ownerComponent) {
      {
        return warning$1('ref: multiple version of Rax used in project.');
      }
    }

    var instance = component.__getPublicInstance();

    {
      if (instance == null) {
        warning$1('ref: do not attach ref to function components because they don’t have instances.');
      }
    }

    if (isFunction(ref)) {
      ref(instance);
    } else if (isObject(ref)) {
      ref.current = instance;
    } else {
      ownerComponent[INSTANCE].refs[ref] = instance;
    }
  }
  function detachRef(ownerComponent, ref, component) {
    if (isFunction(ref)) {
      // When the referenced component is unmounted and whenever the ref changes, the old ref will be called with null as an argument.
      ref(null);
    } else {
      // Must match component and ref could detach the ref on owner when A's before ref is B's current ref
      var instance = component.__getPublicInstance();

      if (isObject(ref) && ref.current === instance) {
        ref.current = null;
      } else if (ownerComponent[INSTANCE].refs[ref] === instance) {
        delete ownerComponent[INSTANCE].refs[ref];
      }
    }
  }

  function instantiateComponent(element) {
    var instance;

    if (isObject(element) && element !== null && element.type) {
      // Special case string values
      if (isString(element.type)) {
        instance = new Host.__Native(element);
      } else {
        instance = new Host.__Composite(element);
      }
    } else if (isString(element) || isNumber(element)) {
      instance = new Host.__Text(String(element));
    } else if (element === undefined || isNull(element) || element === false || element === true) {
      instance = new Host.__Empty();
    } else if (isArray(element)) {
      instance = new Host.__Fragment(element);
    } else {
      throwInvalidComponentError(element);
    }

    return instance;
  }
  function throwInvalidComponentError(element) {
    {
      throw new Error("Invalid element type: " + element + ". (current: " + (isObject(element) && Object.keys(element) || typeof element) + ")");
    }
  }

  function shouldUpdateComponent(prevElement, nextElement) {
    var prevEmpty = isNull(prevElement);
    var nextEmpty = isNull(nextElement);

    if (prevEmpty || nextEmpty) {
      return prevEmpty === nextEmpty;
    }

    if (isArray(prevElement) && isArray(nextElement)) {
      return true;
    }

    var isPrevStringOrNumber = isString(prevElement) || isNumber(prevElement);

    if (isPrevStringOrNumber) {
      return isString(nextElement) || isNumber(nextElement);
    } else {
      // prevElement and nextElement could be array, typeof [] is "object"
      return isObject(prevElement) && isObject(nextElement) && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }

  function getElementKeyName(children, element, index) {
    var elementKey = element && element.key;
    var defaultName = '.' + index.toString(36); // Inner child name default format fallback
    // Key should must be string type

    if (isString(elementKey)) {
      var keyName = '$' + elementKey; // Child keys must be unique.

      var keyUnique = children[keyName] === undefined;

      {
        if (!keyUnique) {
          // Only the first child will be used when encountered two children with the same key
          warning$1("Encountered two children with the same key \"" + elementKey + "\".");
        }
      }

      return keyUnique ? keyName : defaultName;
    } else {
      return defaultName;
    }
  }

  /**
   * This function is usually been used to find the closet previous sibling native node of FragmentComponent.
   * FragmentComponent does not have a native node in the DOM tree, so when it is replaced, the new node has no corresponding location to insert.
   * So we need to look forward from the current mount position of the FragmentComponent to the nearest component which have the native node.
   * @param component
   * @return nativeNode
   */

  function getPrevSiblingNativeNode(component) {
    var parent = component;

    while (parent = component.__parentInstance && component.__parentInstance[INTERNAL]) {
      if (parent instanceof Host.__Composite) {
        component = parent;
        continue;
      }

      var keys = Object.keys(parent.__renderedChildren); // Find previous sibling native node from current mount index

      for (var i = component.__mountIndex - 1; i >= 0; i--) {
        var nativeNode = parent.__renderedChildren[keys[i]].__getNativeNode(); // Fragment component always return array


        if (isArray(nativeNode)) {
          if (nativeNode.length > 0) {
            // Get the last one
            return nativeNode[nativeNode.length - 1];
          }
        } else {
          // Others maybe native node or empty node
          return nativeNode;
        }
      } // Find parent over parent


      if (parent instanceof Host.__Fragment) {
        component = parent;
      } else {
        return null;
      }
    }
  }

  /**
   * Base component class.
   */
  var Component =
  /*#__PURE__*/
  function () {
    function Component(props, context) {
      this.props = props;
      this.context = context;
      this.refs = {};
    }

    var _proto = Component.prototype;

    _proto.setState = function setState(partialState, callback) {
      // The updater property is injected when composite component mounting
      this.updater.setState(this, partialState, callback);
    };

    _proto.forceUpdate = function forceUpdate(callback) {
      this.updater.forceUpdate(this, callback);
    };

    return Component;
  }();
  var PureComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(PureComponent, _Component);

    function PureComponent() {
      var _this;

      _this = _Component.apply(this, arguments) || this;
      _this.__isPureComponent = true;
      return _this;
    }

    return PureComponent;
  }(Component);

  var rootID = 1;

  var Root =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Root, _Component);

    function Root() {
      var _this;

      _this = _Component.call(this) || this; // Using fragment instead of null for avoid create a comment node when init mount

      _this.__element = [];
      _this.__rootID = rootID++;
      return _this;
    }

    var _proto = Root.prototype;

    _proto.__getPublicInstance = function __getPublicInstance() {
      return this.__getRenderedComponent().__getPublicInstance();
    };

    _proto.__getRenderedComponent = function __getRenderedComponent() {
      return this[INTERNAL][RENDERED_COMPONENT];
    };

    _proto.__update = function __update(element) {
      this.__element = element;
      this.forceUpdate();
    };

    _proto.render = function render() {
      return this.__element;
    };

    return Root;
  }(Component);

  /**
   * Instance manager
   * @NOTE Key should not be compressed, for that will be added to native node and cause DOM Exception.
   */

  var KEY = '_r';
  var Instance = {
    set: function set(node, instance) {
      if (!node[KEY]) {
        node[KEY] = instance; // Record root instance to roots map

        if (instance.__rootID) {
          Host.rootInstances[instance.__rootID] = instance;
          Host.rootComponents[instance.__rootID] = instance[INTERNAL];
        }
      }
    },
    get: function get(node) {
      return node[KEY];
    },
    remove: function remove(node) {
      var instance = this.get(node);

      if (instance) {
        node[KEY] = null;

        if (instance.__rootID) {
          delete Host.rootComponents[instance.__rootID];
          delete Host.rootInstances[instance.__rootID];
        }
      }
    },
    mount: function mount(element, container, _ref) {
      var parent = _ref.parent,
          hydrate = _ref.hydrate;

      {
        Host.measurer && Host.measurer.beforeRender();
      }

      var driver = Host.driver; // Real native root node is body

      if (container == null) {
        container = driver.createBody();
      }

      var renderOptions = {
        element: element,
        container: container,
        hydrate: hydrate
      }; // Before render callback

      driver.beforeRender && driver.beforeRender(renderOptions); // Get the context from the conceptual parent component.

      var parentContext;

      if (parent) {
        var parentInternal = parent[INTERNAL];
        parentContext = parentInternal.__processChildContext(parentInternal._context);
      } // Update root component


      var prevRootInstance = this.get(container);

      if (prevRootInstance && prevRootInstance.__rootID) {
        if (parentContext) {
          // Using __penddingContext to pass new context
          prevRootInstance[INTERNAL].__penddingContext = parentContext;
        }

        prevRootInstance.__update(element);

        return prevRootInstance;
      } // Init root component with empty children


      var renderedComponent = instantiateComponent(createElement(Root));
      var defaultContext = parentContext || {};

      var rootInstance = renderedComponent.__mountComponent(container, null, defaultContext);

      this.set(container, rootInstance); // Mount new element through update queue avoid when there is in rendering phase

      rootInstance.__update(element); // After render callback


      driver.afterRender && driver.afterRender(renderOptions);

      {
        // Devtool render new root hook
        Host.reconciler.renderNewRootComponent(rootInstance[INTERNAL][RENDERED_COMPONENT]);
        Host.measurer && Host.measurer.afterRender();
      }

      return rootInstance;
    }
  };

  var assign = Object.assign;

  var STYLE = 'style';
  var CHILDREN = 'children';
  var TREE = 'tree';
  var EVENT_PREFIX_REGEXP = /^on[A-Z]/;
  /**
   * Native Component
   */

  var NativeComponent =
  /*#__PURE__*/
  function (_BaseComponent) {
    _inheritsLoose(NativeComponent, _BaseComponent);

    function NativeComponent() {
      return _BaseComponent.apply(this, arguments) || this;
    }

    var _proto = NativeComponent.prototype;

    _proto.__mountComponent = function __mountComponent(parent, parentInstance, context, nativeNodeMounter) {
      this.__initComponent(parent, parentInstance, context);

      var currentElement = this.__currentElement;
      var props = currentElement.props;
      var type = currentElement.type;
      var children = props[CHILDREN];
      var appendType = props.append || TREE; // Default is tree
      // Clone a copy for style diff

      this.__prevStyleCopy = assign({}, props[STYLE]);
      var instance = {
        type: type,
        props: props
      };
      instance[INTERNAL] = this;
      this[INSTANCE] = instance;

      if (appendType === TREE) {
        // Should after process children when mount by tree mode
        this.__mountChildren(children, context);

        this.__mountNativeNode(nativeNodeMounter);
      } else {
        // Should before process children when mount by node mode
        this.__mountNativeNode(nativeNodeMounter);

        this.__mountChildren(children, context);
      } // Ref acttach


      if (currentElement && currentElement.ref) {
        attachRef(currentElement._owner, currentElement.ref, this);
      }

      {
        Host.reconciler.mountComponent(this);
      }

      return instance;
    };

    _proto.__mountChildren = function __mountChildren(children, context) {
      if (children == null) return children;

      var nativeNode = this.__getNativeNode();

      return this.__mountChildrenImpl(nativeNode, toArray(children), context);
    };

    _proto.__mountChildrenImpl = function __mountChildrenImpl(parent, children, context, nativeNodeMounter) {
      var renderedChildren = this.__renderedChildren = {};
      var renderedChildrenImage = [];

      for (var i = 0, l = children.length; i < l; i++) {
        var element = children[i];
        var renderedChild = instantiateComponent(element);
        var name = getElementKeyName(renderedChildren, element, i);
        renderedChildren[name] = renderedChild;
        renderedChild.__mountIndex = i; // Mount children

        var mountImage = renderedChild.__mountComponent(parent, this[INSTANCE], context, nativeNodeMounter);

        renderedChildrenImage.push(mountImage);
      }

      return renderedChildrenImage;
    };

    _proto.__unmountChildren = function __unmountChildren(shouldNotRemoveChild) {
      var renderedChildren = this.__renderedChildren;

      if (renderedChildren) {
        for (var name in renderedChildren) {
          var renderedChild = renderedChildren[name];
          renderedChild.unmountComponent(shouldNotRemoveChild);
        }

        this.__renderedChildren = null;
      }
    };

    _proto.unmountComponent = function unmountComponent(shouldNotRemoveChild) {
      if (this[NATIVE_NODE]) {
        var ref = this.__currentElement.ref;

        if (ref) {
          detachRef(this.__currentElement._owner, ref, this);
        }

        Instance.remove(this[NATIVE_NODE]);

        if (!shouldNotRemoveChild) {
          Host.driver.removeChild(this[NATIVE_NODE], this._parent); // If the parent node has been removed, child node don't need to be removed

          shouldNotRemoveChild = true;
        }
      }

      this.__unmountChildren(shouldNotRemoveChild);

      this.__prevStyleCopy = null;

      this.__destoryComponent();
    };

    _proto.__updateComponent = function __updateComponent(prevElement, nextElement, prevContext, nextContext) {
      // Replace current element
      this.__currentElement = nextElement;
      updateRef(prevElement, nextElement, this);
      var prevProps = prevElement.props;
      var nextProps = nextElement.props;

      this.__updateProperties(prevProps, nextProps); // If the prevElement has no child, mount children directly


      if (prevProps[CHILDREN] == null || isArray(prevProps[CHILDREN]) && prevProps[CHILDREN].length === 0) {
        this.__mountChildren(nextProps[CHILDREN], nextContext);
      } else {
        this.__updateChildren(nextProps[CHILDREN], nextContext);
      }

      {
        Host.reconciler.receiveComponent(this);
      }
    };

    _proto.__updateProperties = function __updateProperties(prevProps, nextProps) {
      var propKey;
      var styleName;
      var styleUpdates;
      var driver = Host.driver;

      var nativeNode = this.__getNativeNode();

      for (propKey in prevProps) {
        // Continue children and null value prop or nextProps has some propKey that do noting
        if (propKey === CHILDREN || prevProps[propKey] == null || // Use hasOwnProperty here for avoid propKey name is some with method name in object proptotype
        nextProps.hasOwnProperty(propKey)) {
          continue;
        }

        if (propKey === STYLE) {
          // Remove all style
          var lastStyle = this.__prevStyleCopy;

          for (styleName in lastStyle) {
            styleUpdates = styleUpdates || {};
            styleUpdates[styleName] = '';
          }

          this.__prevStyleCopy = null;
        } else if (EVENT_PREFIX_REGEXP.test(propKey)) {
          // Remove event
          var eventListener = prevProps[propKey];

          if (isFunction(eventListener)) {
            driver.removeEventListener(nativeNode, propKey.slice(2).toLowerCase(), eventListener);
          }
        } else {
          // Remove attribute
          driver.removeAttribute(nativeNode, propKey, prevProps[propKey]);
        }
      }

      for (propKey in nextProps) {
        var nextProp = nextProps[propKey];
        var prevProp = propKey === STYLE ? this.__prevStyleCopy : prevProps != null ? prevProps[propKey] : undefined; // Continue children or prevProp equal nextProp

        if (propKey === CHILDREN || prevProp === nextProp || nextProp == null && prevProp == null) {
          continue;
        } // Update style


        if (propKey === STYLE) {
          if (nextProp) {
            // Clone property
            nextProp = this.__prevStyleCopy = assign({}, nextProp);
          } else {
            this.__prevStyleCopy = null;
          }

          if (prevProp != null) {
            // Unset styles on `prevProp` but not on `nextProp`.
            for (styleName in prevProp) {
              if (!nextProp || !nextProp[styleName] && nextProp[styleName] !== 0) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = '';
              }
            } // Update styles that changed since `prevProp`.


            for (styleName in nextProp) {
              if (prevProp[styleName] !== nextProp[styleName]) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = nextProp[styleName];
              }
            }
          } else {
            // Assign next prop when prev style is null
            styleUpdates = nextProp;
          }
        } else if (EVENT_PREFIX_REGEXP.test(propKey)) {
          // Update event binding
          var eventName = propKey.slice(2).toLowerCase();

          if (isFunction(prevProp)) {
            driver.removeEventListener(nativeNode, eventName, prevProp, nextProps);
          }

          if (isFunction(nextProp)) {
            driver.addEventListener(nativeNode, eventName, nextProp, nextProps);
          }
        } else {
          // Update other property
          if (nextProp != null) {
            driver.setAttribute(nativeNode, propKey, nextProp);
          } else {
            driver.removeAttribute(nativeNode, propKey, prevProps[propKey]);
          }

          {
            var _payload;

            Host.measurer && Host.measurer.recordOperation({
              instanceID: this._mountID,
              type: 'update attribute',
              payload: (_payload = {}, _payload[propKey] = nextProp, _payload)
            });
          }
        }
      }

      if (styleUpdates) {
        {
          Host.measurer && Host.measurer.recordOperation({
            instanceID: this._mountID,
            type: 'update style',
            payload: styleUpdates
          });
        }

        driver.setStyle(nativeNode, styleUpdates);
      }
    };

    _proto.__updateChildren = function __updateChildren(nextChildrenElements, context) {
      // prev rendered children
      var prevChildren = this.__renderedChildren;
      var driver = Host.driver;

      if (nextChildrenElements == null && prevChildren == null) {
        return;
      }

      var nextChildren = {};

      if (nextChildrenElements != null) {
        nextChildrenElements = toArray(nextChildrenElements); // Update next children elements

        for (var index = 0, length = nextChildrenElements.length; index < length; index++) {
          var nextElement = nextChildrenElements[index];
          var name = getElementKeyName(nextChildren, nextElement, index);
          var prevChild = prevChildren && prevChildren[name];
          var prevElement = prevChild && prevChild.__currentElement;
          var prevContext = prevChild && prevChild._context; // Try to update between the two of some name that has some element type,
          // and move child in next children loop if need

          if (prevChild != null && shouldUpdateComponent(prevElement, nextElement)) {
            if (prevElement !== nextElement || prevContext !== context) {
              // Pass the same context when updating children
              prevChild.__updateComponent(prevElement, nextElement, context, context);
            }

            nextChildren[name] = prevChild;
          } else {
            // Unmount the prevChild when some name with nextChild but different element type,
            // and move child node in next children loop
            if (prevChild) {
              prevChild.__unmount = true;
            } // The child must be instantiated before it's mounted.


            nextChildren[name] = instantiateComponent(nextElement);
          }
        }
      }

      var parent = this.__getNativeNode();

      var isFragmentParent = isArray(parent);
      var prevFirstChild = null;
      var prevFirstNativeNode = null;
      var isPrevFirstEmptyFragment = false;
      var shouldUnmountPrevFirstChild = false;
      var lastPlacedNode = null; // Directly remove all children from component, if nextChildren is empty (null, [], '').
      // `driver.removeChildren` is optional driver protocol.

      var shouldRemoveAllChildren = Boolean(driver.removeChildren // nextChildElements == null or nextChildElements is empty
      && (isNull(nextChildrenElements) || nextChildrenElements && !nextChildrenElements.length)); // Unmount children that are no longer present.

      if (prevChildren != null) {
        for (var _name in prevChildren) {
          var _prevChild = prevChildren[_name];
          var shouldUnmount = _prevChild.__unmount || !nextChildren[_name]; // Store old first child ref for append node ahead and maybe delay remove it

          if (!prevFirstChild) {
            shouldUnmountPrevFirstChild = shouldUnmount;
            prevFirstChild = _prevChild;
            prevFirstNativeNode = prevFirstChild.__getNativeNode();

            if (isArray(prevFirstNativeNode)) {
              isPrevFirstEmptyFragment = prevFirstNativeNode.length === 0;
              prevFirstNativeNode = prevFirstNativeNode[0];
            }
          } else if (shouldUnmount) {
            _prevChild.unmountComponent(shouldRemoveAllChildren);
          }
        } // 1. When fragment embed fragment updated but prev fragment is empty
        // that need to get the prev sibling native node.
        // like: [ [] ] -> [ [1, 2] ]
        // 2. When prev fragment is empty and update to other type
        // like: [ [], 1 ] -> [ 1, 2 ]


        if (isFragmentParent && parent.length === 0 || isPrevFirstEmptyFragment) {
          lastPlacedNode = getPrevSiblingNativeNode(this);
        }
      }

      if (nextChildren != null) {
        var insertNodes = function insertNodes(nativeNodes, parentNode) {
          // The nativeNodes maybe fragment, so convert to array type
          nativeNodes = toArray(nativeNodes);

          for (var i = 0, l = nativeNodes.length; i < l; i++) {
            if (lastPlacedNode) {
              // Should reverse order when insert new child after lastPlacedNode:
              // [lastPlacedNode, *newChild1, *newChild2],
              // And if prev is empty fragment, lastPlacedNode is the prevSiblingNativeNode found.
              driver.insertAfter(nativeNodes[l - i - 1], lastPlacedNode);
            } else if (prevFirstNativeNode) {
              // [*newChild1, *newChild2, prevFirstNativeNode]
              driver.insertBefore(nativeNodes[i], prevFirstNativeNode);
            } else if (parentNode) {
              // [*newChild1, *newChild2]
              driver.appendChild(nativeNodes[i], parentNode);
            }
          }
        };

        // `nextIndex` will increment for each child in `nextChildren`
        var nextIndex = 0;
        var nextNativeNodes = [];

        for (var _name2 in nextChildren) {
          var nextChild = nextChildren[_name2];

          var _prevChild2 = prevChildren && prevChildren[_name2]; // Try to move the some key prevChild but current not at the some position


          if (_prevChild2 === nextChild) {
            var prevChildNativeNode = _prevChild2.__getNativeNode();

            if (_prevChild2.__mountIndex !== nextIndex) {
              insertNodes(prevChildNativeNode);
            }
          } else {
            // Mount nextChild that in prevChildren there has no some name
            // Fragment extended native component, so if parent is fragment should get this._parent
            if (isFragmentParent) {
              parent = this._parent;
            }

            nextChild.__mountComponent(parent, this[INSTANCE], context, insertNodes // Insert nodes mounter
            );
          } // Update to the latest mount order


          nextChild.__mountIndex = nextIndex++; // Get the last child

          lastPlacedNode = nextChild.__getNativeNode(); // Push to nextNativeNodes

          if (isArray(lastPlacedNode)) {
            nextNativeNodes = nextNativeNodes.concat(lastPlacedNode);
            lastPlacedNode = lastPlacedNode[lastPlacedNode.length - 1];
          } else {
            nextNativeNodes.push(lastPlacedNode);
          }
        } // Sync update native refs


        if (isArray(this[NATIVE_NODE])) {
          // Clear all and push the new array
          this[NATIVE_NODE].length = 0;
          assign(this[NATIVE_NODE], nextNativeNodes);
        }
      }

      if (shouldUnmountPrevFirstChild) {
        prevFirstChild.unmountComponent(shouldRemoveAllChildren);
      }

      if (shouldRemoveAllChildren) {
        driver.removeChildren(this[NATIVE_NODE]);
      }

      this.__renderedChildren = nextChildren;
    };

    _proto.__createNativeNode = function __createNativeNode() {
      var instance = this[INSTANCE];
      var nativeNode = Host.driver.createElement(instance.type, instance.props, this);
      Instance.set(nativeNode, instance);
      return nativeNode;
    };

    return NativeComponent;
  }(BaseComponent);

  /**
   * Text Component
   */

  var TextComponent =
  /*#__PURE__*/
  function (_BaseComponent) {
    _inheritsLoose(TextComponent, _BaseComponent);

    function TextComponent() {
      return _BaseComponent.apply(this, arguments) || this;
    }

    var _proto = TextComponent.prototype;

    _proto.__updateComponent = function __updateComponent(prevElement, nextElement, context) {
      nextElement = '' + nextElement; // If text is some value that do not update even there number 1 and string "1"

      if (prevElement !== nextElement) {
        // Replace current element
        this.__currentElement = nextElement;
        Host.driver.updateText(this.__getNativeNode(), nextElement);

        {
          this._stringText = this.__currentElement;
          Host.reconciler.receiveComponent(this);
        }
      }
    };

    _proto.__createNativeNode = function __createNativeNode() {
      {
        this._stringText = this.__currentElement;
      }

      return Host.driver.createText(this.__currentElement, this);
    };

    return TextComponent;
  }(BaseComponent);

  var RE_RENDER_LIMIT = 24;
  /**
   * Functional Reactive Component Class Wrapper
   */

  var ReactiveComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ReactiveComponent, _Component);

    function ReactiveComponent(pureRender, ref) {
      var _this;

      _this = _Component.call(this) || this; // Marked ReactiveComponent.

      _this.__isReactiveComponent = true; // A pure function

      _this.__render = pureRender;
      _this.__hookID = 0; // Number of rerenders

      _this.__reRenders = 0;
      _this.__hooks = {}; // Is render scheduled

      _this.__isScheduled = false;
      _this.__shouldUpdate = false;
      _this.__children = null;
      _this.__contexts = {}; // Handles store

      _this.didMount = [];
      _this.didUpdate = [];
      _this.willUnmount = [];
      _this.state = {};

      if (pureRender.__forwardRef) {
        _this.__prevForwardRef = _this.__forwardRef = ref;
      }

      var compares = pureRender.__compares;

      if (compares) {
        _this.shouldComponentUpdate = function (nextProps) {
          // Process composed compare
          var arePropsEqual = true; // Compare push in and pop out

          for (var i = compares.length - 1; i > -1; i--) {
            if (arePropsEqual = compares[i](_this.props, nextProps)) {
              break;
            }
          }

          return !arePropsEqual || _this.__prevForwardRef !== _this.__forwardRef;
        };
      }

      return _this;
    }

    var _proto = ReactiveComponent.prototype;

    _proto.getHooks = function getHooks() {
      return this.__hooks;
    };

    _proto.getHookID = function getHookID() {
      return ++this.__hookID;
    };

    _proto.useContext = function useContext(context) {
      var _this2 = this;

      var contextID = context._contextID;
      var contextItem = this.__contexts[contextID];

      function getValue() {
        return contextItem.__provider ? contextItem.__provider.getValue() : context._defaultValue;
      }

      if (!contextItem) {
        var provider = context.__getNearestParentProvider(this);

        contextItem = this.__contexts[contextID] = {
          __provider: provider
        };

        if (provider) {
          var handleContextChange = function handleContextChange() {
            // Check the last value that maybe alread rerender
            // avoid rerender twice when provider value changed
            if (contextItem.__lastValue !== getValue()) {
              _this2.__shouldUpdate = true;

              _this2.__update();
            }
          };

          provider.__on(handleContextChange);

          this.willUnmount.push(function () {
            return provider.__off(handleContextChange);
          });
        }
      }

      return contextItem.__lastValue = getValue();
    };

    _proto.componentWillMount = function componentWillMount() {
      this.__shouldUpdate = true;
    };

    _proto.componentDidMount = function componentDidMount() {
      invokeFunctionsWithContext(this.didMount);
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps() {
      this.__shouldUpdate = true;
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      invokeFunctionsWithContext(this.didUpdate);
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      invokeFunctionsWithContext(this.willUnmount);
    };

    _proto.__update = function __update() {
      this[INTERNAL].__isPendingForceUpdate = true;
      this.setState({});
    };

    _proto.render = function render() {
      {
        Host.measurer && Host.measurer.beforeRender();
      }

      this.__hookID = 0;
      this.__reRenders = 0;
      this.__isScheduled = false;

      var children = this.__render(this.props, this.__forwardRef ? this.__forwardRef : this.context);

      while (this.__isScheduled) {
        this.__reRenders++;

        if (this.__reRenders > RE_RENDER_LIMIT) {
          {
            throw new Error('Too many re-renders, the number of renders is limited to prevent an infinite loop.');
          }
        }

        this.__hookID = 0;
        this.__isScheduled = false;
        children = this.__render(this.props, this.__forwardRef ? this.__forwardRef : this.context);
      }

      if (this.__shouldUpdate) {
        this.__children = children;
        this.__shouldUpdate = false;
      }

      return this.__children;
    };

    return ReactiveComponent;
  }(Component);

  var dirtyComponents = [];

  function getPendingCallbacks(internal) {
    return internal.__pendingCallbacks;
  }

  function setPendingCallbacks(internal, callbacks) {
    return internal.__pendingCallbacks = callbacks;
  }

  function getPendingStateQueue(internal) {
    return internal.__pendingStateQueue;
  }

  function setPendingStateQueue(internal, partialState) {
    return internal.__pendingStateQueue = partialState;
  }

  function enqueueCallback(internal, callback) {
    var callbackQueue = getPendingCallbacks(internal) || setPendingCallbacks(internal, []);
    callbackQueue.push(callback);
  }

  function enqueueState(internal, partialState) {
    var stateQueue = getPendingStateQueue(internal) || setPendingStateQueue(internal, []);
    stateQueue.push(partialState);
  }

  function runUpdate(component) {
    var internal = component[INTERNAL];

    if (!internal) {
      return;
    }

    Host.__isUpdating = true; // If updateComponent happens to enqueue any new updates, we
    // shouldn't execute the callbacks until the next render happens, so
    // stash the callbacks first

    var callbacks = getPendingCallbacks(internal);
    setPendingCallbacks(internal, null);
    var prevElement = internal.__currentElement;
    var prevUnmaskedContext = internal._context;
    var nextUnmaskedContext = internal.__penddingContext || prevUnmaskedContext;
    internal.__penddingContext = undefined;

    if (getPendingStateQueue(internal) || internal.__isPendingForceUpdate) {
      internal.__updateComponent(prevElement, prevElement, prevUnmaskedContext, nextUnmaskedContext);
    }

    invokeFunctionsWithContext(callbacks, component);
    Host.__isUpdating = false;
  }

  function mountOrderComparator(c1, c2) {
    return c2[INTERNAL]._mountID - c1[INTERNAL]._mountID;
  }

  function performUpdate() {
    if (Host.__isUpdating) {
      return schedule(performUpdate);
    }

    var component;
    var dirties = dirtyComponents;

    if (dirties.length > 0) {
      // Before next render, we will flush all the effects
      flushEffect();
      dirtyComponents = []; // Since reconciling a component higher in the owner hierarchy usually (not
      // always -- see shouldComponentUpdate()) will reconcile children, reconcile
      // them before their children by sorting the array.

      if (dirties.length > 1) {
        dirties = dirties.sort(mountOrderComparator);
      }

      while (component = dirties.pop()) {
        runUpdate(component);
      }
    }
  }

  function scheduleUpdate(component, shouldAsyncUpdate) {
    if (dirtyComponents.indexOf(component) < 0) {
      dirtyComponents.push(component);
    }

    if (shouldAsyncUpdate) {
      // If have been scheduled before, don't not need schedule again
      if (dirtyComponents.length > 1) {
        return;
      }

      schedule(performUpdate);
    } else {
      performUpdate();
    }
  }

  function requestUpdate(component, partialState, callback) {
    var internal = component[INTERNAL];

    if (!internal) {
      return;
    }

    if (callback) {
      enqueueCallback(internal, callback);
    }

    var hasComponentRendered = internal[RENDERED_COMPONENT]; // setState

    if (partialState) {
      enqueueState(internal, partialState); // State pending when request update in componentWillMount and componentWillReceiveProps,
      // isPendingState default is false value (false or null) and set to true after componentWillReceiveProps,
      // _renderedComponent is null when componentWillMount exec.

      if (!internal.__isPendingState && hasComponentRendered) {
        scheduleUpdate(component, true);
      }
    } else {
      // forceUpdate
      internal.__isPendingForceUpdate = true;

      if (hasComponentRendered) {
        scheduleUpdate(component);
      }
    }
  }

  var Updater = {
    setState: function setState(component, partialState, callback) {
      // Flush all effects first before update state
      if (!Host.__isUpdating) {
        flushEffect();
      }

      requestUpdate(component, partialState, callback);
    },
    forceUpdate: function forceUpdate(component, callback) {
      requestUpdate(component, null, callback);
    },
    runCallbacks: invokeFunctionsWithContext
  };

  function performInSandbox(fn, instance, callback) {
    try {
      return fn();
    } catch (e) {
      if (callback) {
        callback(e);
      } else {
        handleError(instance, e);
      }
    }
  }

  function handleError(instance, error) {
    var boundary = getNearestParent(instance, function (parent) {
      return parent.componentDidCatch;
    });

    if (boundary) {
      // Should not attempt to recover an unmounting error boundary
      var boundaryInternal = boundary[INTERNAL];

      if (boundaryInternal) {
        var callbackQueue = boundaryInternal.__pendingCallbacks || (boundaryInternal.__pendingCallbacks = []);
        callbackQueue.push(function () {
          return boundary.componentDidCatch(error);
        });
      }
    } else {
      // Do not break when error happens
      scheduler(function () {
        throw error;
      }, 0);
    }
  }

  var measureLifeCycle;

  {
    measureLifeCycle = function measureLifeCycle(callback, instanceID, type) {
      Host.measurer && Host.measurer.beforeLifeCycle(instanceID, type);
      callback();
      Host.measurer && Host.measurer.afterLifeCycle(instanceID, type);
    };
  }
  /**
   * Composite Component
   */


  var CompositeComponent =
  /*#__PURE__*/
  function (_BaseComponent) {
    _inheritsLoose(CompositeComponent, _BaseComponent);

    function CompositeComponent() {
      return _BaseComponent.apply(this, arguments) || this;
    }

    var _proto = CompositeComponent.prototype;

    _proto.__mountComponent = function __mountComponent(parent, parentInstance, context, nativeNodeMounter) {
      var _this = this;

      this.__initComponent(parent, parentInstance, context);

      {
        this._updateCount = 0;
        Host.measurer && Host.measurer.beforeMountComponent(this._mountID, this);
      }

      var currentElement = this.__currentElement;
      var Component = currentElement.type;
      var ref = currentElement.ref;
      var publicProps = currentElement.props;
      var componentPrototype = Component.prototype; // Context process

      var publicContext = this.__processContext(context); // Initialize the public class


      var instance;
      var renderedElement;

      try {
        if (componentPrototype && componentPrototype.render) {
          // Class Component instance
          instance = new Component(publicProps, publicContext);
        } else if (isFunction(Component)) {
          // Functional reactive component with hooks
          instance = new ReactiveComponent(Component, ref);
        } else {
          throwInvalidComponentError(Component);
        }
      } catch (e) {
        return handleError(parentInstance, e);
      } // These should be set up in the constructor, but as a convenience for
      // simpler class abstractions, we set them up after the fact.


      instance.props = publicProps;
      instance.context = publicContext;
      instance.refs = {}; // Inject the updater into instance

      instance.updater = Updater;
      instance[INTERNAL] = this;
      this[INSTANCE] = instance; // Init state, must be set to an object or null

      var initialState = instance.state;

      if (initialState === undefined) {
        // TODO clone the state?
        instance.state = initialState = null;
      }

      var error = null;

      var errorCallback = function errorCallback(e) {
        error = e;
      };

      if (instance.componentWillMount) {
        performInSandbox(function () {
          if ("development" !== 'production') {
            measureLifeCycle(function () {
              instance.componentWillMount();
            }, _this._mountID, 'componentWillMount');
          } else {
            instance.componentWillMount();
          }
        }, instance, errorCallback);
      }

      if (renderedElement == null) {
        Host.owner = this; // Process pending state when call setState in componentWillMount

        instance.state = this.__processPendingState(publicProps, publicContext);
        performInSandbox(function () {
          if ("development" !== 'production') {
            measureLifeCycle(function () {
              renderedElement = instance.render();
            }, _this._mountID, 'render');
          } else {
            renderedElement = instance.render();
          }
        }, instance, errorCallback);

        {
          validateChildKeys(renderedElement, this.__currentElement.type);
        }

        Host.owner = null;
      }

      this[RENDERED_COMPONENT] = instantiateComponent(renderedElement);

      this[RENDERED_COMPONENT].__mountComponent(this._parent, instance, this.__processChildContext(context), nativeNodeMounter);

      if (error) {
        handleError(instance, error);
      }

      if (!currentElement.type.__forwardRef && ref) {
        attachRef(currentElement._owner, ref, this);
      }

      if (instance.componentDidMount) {
        performInSandbox(function () {
          if ("development" !== 'production') {
            measureLifeCycle(function () {
              instance.componentDidMount();
            }, _this._mountID, 'componentDidMount');
          } else {
            instance.componentDidMount();
          }
        }, instance);
      } // Trigger setState callback in componentWillMount or boundary callback after rendered


      var callbacks = this.__pendingCallbacks;

      if (callbacks) {
        this.__pendingCallbacks = null;
        invokeFunctionsWithContext(callbacks, instance);
      }

      {
        Host.reconciler.mountComponent(this);
        Host.measurer && Host.measurer.afterMountComponent(this._mountID);
      }

      return instance;
    };

    _proto.unmountComponent = function unmountComponent(shouldNotRemoveChild) {
      var instance = this[INSTANCE]; // Unmounting a composite component maybe not complete mounted
      // when throw error in component constructor stage

      if (instance && instance.componentWillUnmount) {
        performInSandbox(function () {
          instance.componentWillUnmount();
        }, instance);
      }

      if (this[RENDERED_COMPONENT] != null) {
        var currentElement = this.__currentElement;
        var ref = currentElement.ref;

        if (!currentElement.type.__forwardRef && ref) {
          detachRef(currentElement._owner, ref, this);
        }

        this[RENDERED_COMPONENT].unmountComponent(shouldNotRemoveChild);
        this[RENDERED_COMPONENT] = null;
      } // Reset pending fields
      // Even if this component is scheduled for another async update,
      // it would still be ignored because these fields are reset.


      this.__pendingStateQueue = null;
      this.__isPendingForceUpdate = false;

      this.__destoryComponent();
    }
    /**
     * Filters the context object to only contain keys specified in
     * `contextTypes`
     */
    ;

    _proto.__processContext = function __processContext(context) {
      var maskedContext = {};
      var Component = this.__currentElement.type;
      var contextTypes = Component.contextTypes;

      if (contextTypes) {
        for (var contextName in contextTypes) {
          maskedContext[contextName] = context[contextName];
        }
      }

      return maskedContext;
    };

    _proto.__processChildContext = function __processChildContext(currentContext) {
      var instance = this[INSTANCE]; // The getChildContext method context should be current instance

      var childContext = instance.getChildContext && instance.getChildContext();

      if (childContext) {
        return assign({}, currentContext, childContext);
      }

      return currentContext;
    };

    _proto.__processPendingState = function __processPendingState(props, context) {
      var instance = this[INSTANCE];
      var queue = this.__pendingStateQueue;

      if (!queue) {
        return instance.state;
      } // Reset pending queue


      this.__pendingStateQueue = null;
      var nextState = assign({}, instance.state);

      for (var i = 0; i < queue.length; i++) {
        var partial = queue[i];
        assign(nextState, isFunction(partial) ? partial.call(instance, nextState, props, context) : partial);
      }

      return nextState;
    };

    _proto.__updateComponent = function __updateComponent(prevElement, nextElement, prevUnmaskedContext, nextUnmaskedContext) {
      var instance = this[INSTANCE]; // Maybe update component that has already been unmounted or failed mount.

      if (!instance) {
        return;
      }

      {
        Host.measurer && Host.measurer.beforeUpdateComponent(this._mountID, this);
      }

      var willReceive;
      var nextContext;
      var nextProps; // Determine if the context has changed or not

      if (this._context === nextUnmaskedContext) {
        nextContext = instance.context;
      } else {
        nextContext = this.__processContext(nextUnmaskedContext);
        willReceive = true;
      } // Distinguish between a props update versus a simple state update
      // Skip checking prop types again -- we don't read component.props to avoid
      // warning for DOM component props in this upgrade


      nextProps = nextElement.props;

      if (prevElement !== nextElement) {
        willReceive = true;
      }

      if (willReceive && instance.componentWillReceiveProps) {
        // Calling this.setState() within componentWillReceiveProps will not trigger an additional render.
        this.__isPendingState = true;
        performInSandbox(function () {
          instance.componentWillReceiveProps(nextProps, nextContext);
        }, instance);
        this.__isPendingState = false;
      } // Update refs


      if (this.__currentElement.type.__forwardRef) {
        instance.__prevForwardRef = prevElement.ref;
        instance.__forwardRef = nextElement.ref;
      } else {
        updateRef(prevElement, nextElement, this);
      } // Shoud update default


      var shouldUpdate = true;
      var prevProps = instance.props;
      var prevState = instance.state; // TODO: could delay execution processPendingState

      var nextState = this.__processPendingState(nextProps, nextContext); // ShouldComponentUpdate is not called when forceUpdate is used


      if (!this.__isPendingForceUpdate) {
        if (instance.shouldComponentUpdate) {
          shouldUpdate = performInSandbox(function () {
            return instance.shouldComponentUpdate(nextProps, nextState, nextContext);
          }, instance);
        } else if (instance.__isPureComponent) {
          // Pure Component
          shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(prevState, nextState);
        }
      }

      if (shouldUpdate) {
        this.__isPendingForceUpdate = false; // Will set `this.props`, `this.state` and `this.context`.

        var prevContext = instance.context; // Cannot use this.setState() in componentWillUpdate.
        // If need to update state in response to a prop change, use componentWillReceiveProps instead.

        if (instance.componentWillUpdate) {
          performInSandbox(function () {
            instance.componentWillUpdate(nextProps, nextState, nextContext);
          }, instance);
        } // Replace with next


        this.__currentElement = nextElement;
        this._context = nextUnmaskedContext;
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = nextContext;

        this.__updateRenderedComponent(nextUnmaskedContext);

        if (instance.componentDidUpdate) {
          performInSandbox(function () {
            instance.componentDidUpdate(prevProps, prevState, prevContext);
          }, instance);
        }

        {
          // Calc update count.
          this._updateCount++;
        }
      } else {
        // If it's determined that a component should not update, we still want
        // to set props and state but we shortcut the rest of the update.
        this.__currentElement = nextElement;
        this._context = nextUnmaskedContext;
        instance.props = nextProps;
        instance.state = nextState;
        instance.context = nextContext;
      } // Flush setState callbacks set in componentWillReceiveProps or boundary callback


      var callbacks = this.__pendingCallbacks;

      if (callbacks) {
        this.__pendingCallbacks = null;
        invokeFunctionsWithContext(callbacks, instance);
      }

      {
        Host.measurer && Host.measurer.afterUpdateComponent(this._mountID);
        Host.reconciler.receiveComponent(this);
      }
    }
    /**
     * Call the component's `render` method and update the DOM accordingly.
     */
    ;

    _proto.__updateRenderedComponent = function __updateRenderedComponent(context) {
      var _this2 = this;

      var prevRenderedComponent = this[RENDERED_COMPONENT];
      var prevRenderedElement = prevRenderedComponent.__currentElement;
      var instance = this[INSTANCE];
      var nextRenderedElement;
      Host.owner = this;
      performInSandbox(function () {
        if ("development" !== 'production') {
          measureLifeCycle(function () {
            nextRenderedElement = instance.render();
          }, _this2._mountID, 'render');
        } else {
          nextRenderedElement = instance.render();
        }
      }, instance);
      Host.owner = null;

      if (shouldUpdateComponent(prevRenderedElement, nextRenderedElement)) {
        var prevRenderedUnmaskedContext = prevRenderedComponent._context;

        var nextRenderedUnmaskedContext = this.__processChildContext(context); // If getChildContext existed and invoked when component updated that will make
        // prevRenderedUnmaskedContext not equal nextRenderedUnmaskedContext under the tree


        if (prevRenderedElement !== nextRenderedElement || prevRenderedUnmaskedContext !== nextRenderedUnmaskedContext) {
          prevRenderedComponent.__updateComponent(prevRenderedElement, nextRenderedElement, prevRenderedUnmaskedContext, nextRenderedUnmaskedContext);
        }

        {
          Host.measurer && Host.measurer.recordOperation({
            instanceID: this._mountID,
            type: 'update component',
            payload: {}
          });
        }
      } else {
        var lastNativeNode = null;

        var prevNativeNode = prevRenderedComponent.__getNativeNode(); // Only prevNativeNode is empty fragment should find the prevSlibingNativeNode
        // And current root component is fragment, but not need find the prevSlibingNativeNode when init mounting


        if (isArray(prevNativeNode) && prevNativeNode.length === 0 && instance.__rootID == null) {
          lastNativeNode = getPrevSiblingNativeNode(prevRenderedComponent);
        }

        prevRenderedComponent.unmountComponent(true);
        this[RENDERED_COMPONENT] = instantiateComponent(nextRenderedElement);

        this[RENDERED_COMPONENT].__mountComponent(this._parent, instance, this.__processChildContext(context), function (newNativeNode, parent) {
          prevNativeNode = toArray(prevNativeNode);
          newNativeNode = toArray(newNativeNode);
          var driver = Host.driver; // If the new length large then prev

          for (var i = 0; i < newNativeNode.length; i++) {
            var nativeNode = newNativeNode[i];

            if (prevNativeNode[i]) {
              driver.replaceChild(nativeNode, prevNativeNode[i]);
            } else if (lastNativeNode) {
              driver.insertAfter(nativeNode, lastNativeNode);
            } else {
              driver.appendChild(nativeNode, parent);
            }

            lastNativeNode = nativeNode;
          } // If the new length less then prev


          for (var _i = newNativeNode.length; _i < prevNativeNode.length; _i++) {
            driver.removeChild(prevNativeNode[_i]);
          }
        });
      }
    };

    _proto.__getNativeNode = function __getNativeNode() {
      var renderedComponent = this[RENDERED_COMPONENT];

      if (renderedComponent) {
        return renderedComponent.__getNativeNode();
      }
    };

    _proto.__getPublicInstance = function __getPublicInstance() {
      var instance = this[INSTANCE]; // The functional components cannot be given refs

      if (instance.__isReactiveComponent) return null;
      return instance;
    };

    return CompositeComponent;
  }(BaseComponent);

  /**
   * Fragment Component
   */

  var FragmentComponent =
  /*#__PURE__*/
  function (_NativeComponent) {
    _inheritsLoose(FragmentComponent, _NativeComponent);

    function FragmentComponent() {
      return _NativeComponent.apply(this, arguments) || this;
    }

    var _proto = FragmentComponent.prototype;

    _proto.__mountComponent = function __mountComponent(parent, parentInstance, context, nativeNodeMounter) {
      this.__initComponent(parent, parentInstance, context);

      var instance = this[INSTANCE] = {};
      instance[INTERNAL] = this; // Mount children

      this.__mountChildren(this.__currentElement, context);

      var fragment = this.__getNativeNode();

      if (nativeNodeMounter) {
        nativeNodeMounter(fragment, parent);
      } else {
        for (var i = 0; i < fragment.length; i++) {
          Host.driver.appendChild(fragment[i], parent);
        }
      }

      {
        this.__currentElement.type = FragmentComponent;
        Host.reconciler.mountComponent(this);
      }

      return instance;
    };

    _proto.__mountChildren = function __mountChildren(children, context) {
      var fragment = this.__getNativeNode();

      return this.__mountChildrenImpl(this._parent, children, context, function (nativeNode) {
        nativeNode = toArray(nativeNode);

        for (var i = 0; i < nativeNode.length; i++) {
          fragment.push(nativeNode[i]);
        }
      });
    };

    _proto.unmountComponent = function unmountComponent(shouldNotRemoveChild) {
      var nativeNode = this[NATIVE_NODE];

      if (nativeNode) {
        Instance.remove(nativeNode);

        if (!shouldNotRemoveChild) {
          for (var i = 0, l = nativeNode.length; i < l; i++) {
            Host.driver.removeChild(nativeNode[i]);
          }
        }
      } // Do not need remove child when their parent is removed


      this.__unmountChildren(true);

      this.__destoryComponent();
    };

    _proto.__updateComponent = function __updateComponent(prevElement, nextElement, prevContext, nextContext) {
      // Replace current element
      this.__currentElement = nextElement;

      this.__updateChildren(this.__currentElement, nextContext);

      {
        this.__currentElement.type = FragmentComponent;
        Host.reconciler.receiveComponent(this);
      }
    };

    _proto.__createNativeNode = function __createNativeNode() {
      return [];
    };

    return FragmentComponent;
  }(NativeComponent);

  {
    FragmentComponent.displayName = 'Fragment';
  }

  var reconciler = {
    // Stubs - React DevTools expects to find these methods and replace them
    // with wrappers in order to observe components being mounted, updated and
    // unmounted
    mountComponent: function mountComponent() {},
    receiveComponent: function receiveComponent() {},
    unmountComponent: function unmountComponent() {},
    // Stub - React DevTools expects to find this method and replace it
    // with a wrapper in order to observe new root components being added
    renderNewRootComponent: function renderNewRootComponent() {}
  };

  function inject(_ref) {
    var driver = _ref.driver,
        measurer = _ref.measurer;
    // Inject component class
    Host.__Empty = EmptyComponent;
    Host.__Native = NativeComponent;
    Host.__Text = TextComponent;
    Host.__Fragment = FragmentComponent;
    Host.__Composite = CompositeComponent; // Inject render driver

    if (!(Host.driver = driver || Host.driver)) {
      {
        throw new Error('Driver not found.');
      }
    }

    {
      // Inject devtool renderer hook
      Host.reconciler = reconciler; // Inject performance measurer

      Host.measurer = measurer;
    }
  }

  function render(element, container, options, callback) {
    // Compatible with `render(element, container, callback)`
    if (isFunction(options)) {
      callback = options;
      options = null;
    }

    options = options || {}; // Init inject

    inject(options);
    var rootComponent = Instance.mount(element, container, options);

    var componentInstance = rootComponent.__getPublicInstance();

    if (callback) {
      callback.call(componentInstance);
    }

    return componentInstance;
  }

  var version = '1.0.12';

  var shared = {
    Host: Host,
    Instance: Instance,
    Element: Element,
    flattenChildren: flattenChildren
  };

  var Rax = ({
    createElement: createElement,
    createContext: createContext,
    createRef: createRef,
    forwardRef: forwardRef,
    memo: memo,
    Fragment: Fragment,
    render: render,
    Component: Component,
    version: version,
    shared: shared,
    useState: useState,
    useContext: useContext,
    useEffect: useEffect,
    useLayoutEffect: useLayoutEffect,
    useRef: useRef,
    useCallback: useCallback,
    useMemo: useMemo,
    useReducer: useReducer,
    useImperativeHandle: useImperativeHandle,
    PureComponent: PureComponent
  });

  if (typeof module !== 'undefined') module.exports = Rax;else self.Rax = Rax;

}());
//# sourceMappingURL=rax.js.map
