"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateHooks = void 0;
const hookCommons = __importStar(require("./commons"));
const hooks_1 = require("@feathersjs/hooks");
const base_1 = require("./base");
const baseHooks = [base_1.assignArguments, base_1.validate];
const { getHooks, enableHooks, ACTIVATE_HOOKS, finallyWrapper, errorWrapper, wrap } = hookCommons;
function getContextUpdaters(app, service, method) {
    const parameters = service.methods[method].map(v => (v === 'params' ? ['params', {}] : v));
    return [
        hooks_1.withParams(...parameters),
        hooks_1.withProps({
            app,
            service,
            type: 'before',
            get path() {
                if (!service || !app || !app.services) {
                    return null;
                }
                return Object.keys(app.services)
                    .find(path => app.services[path] === service);
            }
        })
    ];
}
function getCollector(app, service, method) {
    return (self, fn, args) => {
        const middleware = [
            ...hooks_1.getMiddleware(self),
            ...(fn && typeof fn.collect === 'function' ? fn.collect(fn, fn.original, args) : [])
        ];
        if (typeof self === 'object') {
            return middleware;
        }
        const hooks = {
            async: getHooks(app, service, 'async', method),
            before: getHooks(app, service, 'before', method),
            after: getHooks(app, service, 'after', method, true),
            error: getHooks(app, service, 'error', method, true),
            finally: getHooks(app, service, 'finally', method, true)
        };
        return [
            ...finallyWrapper(hooks.finally),
            ...errorWrapper(hooks.error),
            ...baseHooks,
            ...middleware,
            ...wrap(hooks)
        ];
    };
}
function withHooks(app, service, methods) {
    const hookMap = methods.reduce((accu, method) => {
        if (typeof service[method] !== 'function') {
            return accu;
        }
        accu[method] = {
            middleware: [],
            context: getContextUpdaters(app, service, method),
            collect: getCollector(app, service, method)
        };
        return accu;
    }, {});
    hooks_1.hooks(service, hookMap);
}
function mixinMethod() {
    const service = this;
    const args = Array.from(arguments);
    const returnHook = args[args.length - 1] === true || args[args.length - 1] instanceof hooks_1.HookContext
        ? args.pop() : false;
    const hookContext = returnHook instanceof hooks_1.HookContext ? returnHook : new hooks_1.HookContext();
    return this._super.call(service, ...args, hookContext)
        .then(() => returnHook ? hookContext : hookContext.result)
        // Handle errors
        .catch(() => {
        if (typeof hookContext.error !== 'undefined' && typeof hookContext.result === 'undefined') {
            return Promise.reject(returnHook ? hookContext : hookContext.error);
        }
        else {
            return returnHook ? hookContext : hookContext.result;
        }
    });
}
// A service mixin that adds `service.hooks()` method and functionality
const hookMixin = exports.hookMixin = function hookMixin(service) {
    if (typeof service.hooks === 'function') {
        return;
    }
    service.methods = Object.getOwnPropertyNames(service)
        .filter(key => typeof service[key] === 'function' && service[key][ACTIVATE_HOOKS])
        .reduce((result, methodName) => {
        result[methodName] = service[methodName][ACTIVATE_HOOKS];
        return result;
    }, service.methods || {});
    Object.assign(service.methods, {
        find: ['params'],
        get: ['id', 'params'],
        create: ['data', 'params'],
        update: ['id', 'data', 'params'],
        patch: ['id', 'data', 'params'],
        remove: ['id', 'params']
    });
    const app = this;
    const methodNames = Object.keys(service.methods);
    withHooks(app, service, methodNames);
    // Usefull only for the `returnHook` backwards compatibility with `true`
    const mixin = methodNames.reduce((mixin, method) => {
        if (typeof service[method] !== 'function') {
            return mixin;
        }
        mixin[method] = mixinMethod;
        return mixin;
    }, {});
    // Add .hooks method and properties to the service
    enableHooks(service, methodNames, app.hookTypes);
    service.mixin(mixin);
};
function default_1() {
    return function (app) {
        // We store a reference of all supported hook types on the app
        // in case someone needs it
        Object.assign(app, {
            hookTypes: ['async', 'before', 'after', 'error', 'finally']
        });
        // Add functionality for hooks to be registered as app.hooks
        enableHooks(app, app.methods, app.hookTypes);
        app.mixins.push(hookMixin);
    };
}
exports.default = default_1;
;
function activateHooks(args) {
    return (fn) => {
        Object.defineProperty(fn, ACTIVATE_HOOKS, { value: args });
        return fn;
    };
}
exports.activateHooks = activateHooks;
;
//# sourceMappingURL=index.js.map