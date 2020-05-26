"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
exports.Router = router_1.Router;
const html5_1 = require("./history/html5");
exports.HTML5History = html5_1.HTML5History;
const View_1 = __importDefault(require("./components/View"));
const Link_1 = __importDefault(require("./components/Link"));
const plugin = Vue => {
    Vue.mixin({
        beforeCreate() {
            // @ts-ignore
            if (this.$options.router) {
                // @ts-ignore
                this._routerRoot = this;
                // @ts-ignore
                this._router = this.$options.router;
                // this._router.init(this)
                // @ts-ignore
                this._router.app = this;
                // @ts-ignore
                Vue.util.defineReactive(
                // @ts-ignore
                this, '_route', 
                // @ts-ignore
                this._router.currentRoute
                // undefined,
                // true
                );
            }
            else {
                // @ts-ignore
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
            }
        },
    });
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router;
        },
    });
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route;
        },
    });
    // @ts-ignore
    Vue.component('RouterView', View_1.default);
    // @ts-ignore
    Vue.component('RouterLink', Link_1.default);
    // Vue.component('RouterLink', Link)
    const strats = Vue.config.optionMergeStrategies;
    // use the same hook merging strategy for route hooks
    strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate =
        strats.created;
};
exports.plugin = plugin;
//# sourceMappingURL=index.js.map