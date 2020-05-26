"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoRouteMatchError extends Error {
    constructor(currentLocation, location) {
        super('No match for ' + JSON.stringify({ ...currentLocation, ...location }));
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NoRouteMatchError = NoRouteMatchError;
/**
 * Error used when the matcher fails to resolve a location
 */
class InvalidRouteMatch extends Error {
    constructor(location) {
        // TODO: improve the error to include currentLocation and use it for more cases
        super(`Cannot redirect using a relative location:\n${stringifyRoute(location)}\nUse the function redirect and explicitely provide a name`);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.InvalidRouteMatch = InvalidRouteMatch;
/**
 * Error used when rejecting a navigation because of a redirection. Contains
 * information about where we where trying to go and where we are going instead
 */
class NavigationGuardRedirect extends Error {
    // TODO: refactor order of argumnets
    // TODO: refactor into parent class NavigationError
    constructor(from, to) {
        super(`Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.from = from;
        this.to = to;
    }
}
exports.NavigationGuardRedirect = NavigationGuardRedirect;
/**
 * Navigation aborted by next(false)
 */
class NavigationAborted extends Error {
    constructor(to, from) {
        super(`Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.from = from;
        this.to = to;
    }
}
exports.NavigationAborted = NavigationAborted;
/**
 * Navigation canceled by the user by pushing/replacing a new location
 * TODO: is the name good?
 */
class NavigationCancelled extends Error {
    constructor(to, from) {
        super(`Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new \`push\` or \`replace\``);
        Object.setPrototypeOf(this, new.target.prototype);
        this.from = from;
        this.to = to;
    }
}
exports.NavigationCancelled = NavigationCancelled;
function stringifyRoute(to) {
    if (typeof to === 'string')
        return to;
    if ('path' in to)
        return to.path;
    return JSON.stringify(to, null, 2);
}
//# sourceMappingURL=errors.js.map