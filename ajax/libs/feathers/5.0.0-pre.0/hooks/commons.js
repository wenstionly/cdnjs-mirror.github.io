"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.errorWrapper = exports.finallyWrapper = exports.afterWrapper = exports.beforeWrapper = exports.toFinallyHook = exports.toErrorHook = exports.toAfterHook = exports.toBeforeHook = exports.lastHook = exports.firstHook = exports.enableHooks = exports.processHooks = exports.getHooks = exports.isHookObject = exports.convertHookData = exports.makeArguments = exports.defaultMakeArguments = exports.createHookObject = exports.ACTIVATE_HOOKS = void 0;
const hooks_1 = require("@feathersjs/hooks");
const commons_1 = require("@feathersjs/commons");
const { each, pick, omit } = commons_1._;
const noop = () => { };
exports.ACTIVATE_HOOKS = commons_1.createSymbol('__feathersActivateHooks');
function createHookObject(method, data = {}) {
    const hook = {};
    Object.defineProperty(hook, 'toJSON', {
        value() {
            return pick(this, 'type', 'method', 'path', 'params', 'id', 'data', 'result', 'error');
        }
    });
    return Object.assign(hook, data, {
        method,
        // A dynamic getter that returns the path of the service
        get path() {
            const { app, service } = data;
            if (!service || !app || !app.services) {
                return null;
            }
            return Object.keys(app.services)
                .find(path => app.services[path] === service);
        }
    });
}
exports.createHookObject = createHookObject;
// Fallback used by `makeArguments` which usually won't be used
function defaultMakeArguments(hook) {
    const result = [];
    if (typeof hook.id !== 'undefined') {
        result.push(hook.id);
    }
    if (hook.data) {
        result.push(hook.data);
    }
    result.push(hook.params || {});
    return result;
}
exports.defaultMakeArguments = defaultMakeArguments;
// Turns a hook object back into a list of arguments
// to call a service method with
function makeArguments(hook) {
    switch (hook.method) {
        case 'find':
            return [hook.params];
        case 'get':
        case 'remove':
            return [hook.id, hook.params];
        case 'update':
        case 'patch':
            return [hook.id, hook.data, hook.params];
        case 'create':
            return [hook.data, hook.params];
    }
    return defaultMakeArguments(hook);
}
exports.makeArguments = makeArguments;
// Converts different hook registration formats into the
// same internal format
function convertHookData(obj) {
    let hook = {};
    if (Array.isArray(obj)) {
        hook = { all: obj };
    }
    else if (typeof obj !== 'object') {
        hook = { all: [obj] };
    }
    else {
        each(obj, function (value, key) {
            hook[key] = !Array.isArray(value) ? [value] : value;
        });
    }
    return hook;
}
exports.convertHookData = convertHookData;
// Duck-checks a given object to be a hook object
// A valid hook object has `type` and `method`
function isHookObject(hookObject) {
    return (hookObject instanceof hooks_1.HookContext || (typeof hookObject === 'object' &&
        typeof hookObject.method === 'string' &&
        typeof hookObject.type === 'string'));
}
exports.isHookObject = isHookObject;
// Returns all service and application hooks combined
// for a given method and type `appLast` sets if the hooks
// from `app` should be added last (or first by default)
function getHooks(app, service, type, method, appLast = false) {
    const appHooks = app.__hooks[type][method] || [];
    const serviceHooks = service.__hooks[type][method] || [];
    if (appLast) {
        // Run hooks in the order of service -> app -> finally
        return serviceHooks.concat(appHooks);
    }
    return appHooks.concat(serviceHooks);
}
exports.getHooks = getHooks;
function processHooks(hooks, initialHookObject) {
    let hookObject = initialHookObject;
    const updateCurrentHook = (current) => {
        // Either use the returned hook object or the current
        // hook object from the chain if the hook returned undefined
        if (current) {
            if (!isHookObject(current)) {
                throw new Error(`${hookObject.type} hook for '${hookObject.method}' method returned invalid hook object`);
            }
            hookObject = current;
        }
        return hookObject;
    };
    // Go through all hooks and chain them into our promise
    const promise = hooks.reduce((current, fn) => {
        // @ts-ignore
        const hook = fn.bind(this);
        // Use the returned hook object or the old one
        return current.then((currentHook) => hook(currentHook)).then(updateCurrentHook);
    }, Promise.resolve(hookObject));
    return promise.then(() => hookObject).catch(error => {
        // Add the hook information to any errors
        error.hook = hookObject;
        throw error;
    });
}
exports.processHooks = processHooks;
// Add `.hooks` functionality to an object
function enableHooks(obj, methods, types) {
    if (typeof obj.hooks === 'function') {
        return obj;
    }
    const hookData = {};
    types.forEach(type => {
        // Initialize properties where hook functions are stored
        hookData[type] = {};
    });
    // Add non-enumerable `__hooks` property to the object
    Object.defineProperty(obj, '__hooks', {
        configurable: true,
        value: hookData,
        writable: true
    });
    return Object.assign(obj, {
        hooks(allHooks) {
            each(allHooks, (current, type) => {
                // @ts-ignore
                if (!this.__hooks[type]) {
                    throw new Error(`'${type}' is not a valid hook type`);
                }
                const hooks = convertHookData(current);
                each(hooks, (_value, method) => {
                    if (method !== 'all' && methods.indexOf(method) === -1) {
                        throw new Error(`'${method}' is not a valid hook method`);
                    }
                });
                methods.forEach(method => {
                    // @ts-ignore
                    const myHooks = this.__hooks[type][method] || (this.__hooks[type][method] = []);
                    if (hooks.all) {
                        myHooks.push.apply(myHooks, hooks.all);
                    }
                    if (hooks[method]) {
                        myHooks.push.apply(myHooks, hooks[method]);
                    }
                });
            });
            return this;
        }
    });
}
exports.enableHooks = enableHooks;
function handleError(hook, context, onError) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield hook.call(context.self, context);
            Object.assign(context, omit(result, 'arguments'));
        }
        catch (errorError) {
            if (typeof onError === 'function') {
                onError(errorError, context);
            }
            throw errorError;
        }
        if (typeof context.error !== 'undefined') {
            throw context.error;
        }
    });
}
function firstHook(context, next) {
    context.type = 'before';
    return next();
}
exports.firstHook = firstHook;
function lastHook(context, next) {
    context.type = 'after';
    return next();
}
exports.lastHook = lastHook;
function toBeforeHook(hook) {
    return (context, next) => __awaiter(this, void 0, void 0, function* () {
        const result = yield hook.call(context.self, context);
        Object.assign(context, omit(result, 'arguments'));
        yield next();
    });
}
exports.toBeforeHook = toBeforeHook;
function toAfterHook(hook) {
    return (context, next) => __awaiter(this, void 0, void 0, function* () {
        yield next();
        const result = yield hook.call(context.self, context);
        Object.assign(context, omit(result, 'arguments'));
    });
}
exports.toAfterHook = toAfterHook;
function toErrorHook(hook, onError, control) {
    return (context, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (error) {
            if (typeof control === 'function') {
                control(context);
            }
            context.error = error;
            context.result = undefined;
            yield handleError(hook, context, onError);
        }
    });
}
exports.toErrorHook = toErrorHook;
function toFinallyHook(hook, onError, control) {
    return (context, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield next();
        }
        catch (error) {
            throw error;
        }
        finally {
            if (typeof control === 'function') {
                control(context);
            }
            yield handleError(hook, context, onError);
        }
    });
}
exports.toFinallyHook = toFinallyHook;
function beforeWrapper(hooks) {
    return [firstHook, ...[].concat(hooks).map(toBeforeHook)];
}
exports.beforeWrapper = beforeWrapper;
function afterWrapper(hooks) {
    return [...[].concat(hooks).reverse().map(toAfterHook), lastHook];
}
exports.afterWrapper = afterWrapper;
function finallyWrapper(hooks) {
    let errorInFinally;
    const onError = (error, context) => {
        errorInFinally = error;
        context.error = error;
        context.result = undefined;
    };
    const control = () => {
        if (errorInFinally) {
            throw errorInFinally;
        }
    };
    return [].concat(hooks).reverse().map(hook => toFinallyHook(hook, onError, control));
}
exports.finallyWrapper = finallyWrapper;
function errorWrapper(hooks) {
    let errorInError;
    const onError = (error, context) => {
        errorInError = error;
        context.error = error;
        context.result = undefined;
    };
    const control = (context) => {
        if (!context.original) {
            context.original = Object.assign({}, context);
        }
        if (errorInError) {
            throw errorInError;
        }
        context.type = 'error';
    };
    return [noop].concat(hooks).reverse().map(hook => toErrorHook(hook, onError, control));
}
exports.errorWrapper = errorWrapper;
function wrap({ async = [], before = [], after = [] } = {}) {
    return [
        ...[].concat(async),
        ...beforeWrapper(before),
        ...afterWrapper(after)
    ];
}
exports.wrap = wrap;
//# sourceMappingURL=commons.js.map