"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const commons_1 = require("@feathersjs/commons");
// @ts-ignore
const uberproto_1 = __importDefault(require("uberproto"));
const events_1 = __importDefault(require("./events"));
const hooks_1 = __importDefault(require("./hooks"));
const version_1 = __importDefault(require("./version"));
const debug = debug_1.default('feathers:application');
const Proto = uberproto_1.default.extend({
    create: null
});
exports.default = {
    init() {
        Object.assign(this, {
            version: version_1.default,
            methods: [
                'find', 'get', 'create', 'update', 'patch', 'remove'
            ],
            mixins: [],
            services: {},
            providers: [],
            _setup: false,
            settings: {}
        });
        this.configure(hooks_1.default());
        this.configure(events_1.default());
    },
    get(name) {
        return this.settings[name];
    },
    set(name, value) {
        this.settings[name] = value;
        return this;
    },
    disable(name) {
        this.settings[name] = false;
        return this;
    },
    disabled(name) {
        return !this.settings[name];
    },
    enable(name) {
        this.settings[name] = true;
        return this;
    },
    enabled(name) {
        return !!this.settings[name];
    },
    configure(fn) {
        fn.call(this, this);
        return this;
    },
    service(path) {
        const location = commons_1.stripSlashes(path) || '/';
        const current = this.services[location];
        if (typeof current === 'undefined' && typeof this.defaultService === 'function') {
            return this.use(location, this.defaultService(location))
                .service(location);
        }
        return current;
    },
    use(path, service, options = {}) {
        if (typeof path !== 'string') {
            throw new Error(`'${path}' is not a valid service path.`);
        }
        const location = commons_1.stripSlashes(path) || '/';
        const isSubApp = typeof service.service === 'function' && service.services;
        const isService = this.methods.concat('setup').some(name => typeof service[name] === 'function');
        if (isSubApp) {
            const subApp = service;
            Object.keys(subApp.services).forEach(subPath => this.use(`${location}/${subPath}`, subApp.service(subPath)));
            return this;
        }
        if (!isService) {
            throw new Error(`Invalid service object passed for path \`${location}\``);
        }
        // If the service is already Uberproto'd use it directly
        const protoService = Proto.isPrototypeOf(service) ? service : Proto.extend(service);
        debug(`Registering new service at \`${location}\``);
        // Add all the mixins
        this.mixins.forEach(fn => fn.call(this, protoService, location, options));
        if (typeof protoService._setup === 'function') {
            protoService._setup(this, location);
        }
        // Run the provider functions to register the service
        this.providers.forEach(provider => provider.call(this, protoService, location, options));
        // If we ran setup already, set this service up explicitly
        if (this._isSetup && typeof protoService.setup === 'function') {
            debug(`Setting up service for \`${location}\``);
            protoService.setup(this, location);
        }
        this.services[location] = protoService;
        return this;
    },
    setup() {
        // Setup each service (pass the app so that they can look up other services etc.)
        Object.keys(this.services).forEach(path => {
            const service = this.services[path];
            debug(`Setting up service for \`${path}\``);
            if (typeof service.setup === 'function') {
                service.setup(this, path);
            }
        });
        this._isSetup = true;
        return this;
    }
};
//# sourceMappingURL=application.js.map