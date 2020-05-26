"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = __importDefault(require("path-to-regexp"));
const errors_1 = require("./errors");
class RouterMatcher {
    constructor(routes) {
        this.matchers = [];
        for (const route of routes) {
            this.addRouteRecord(route);
        }
    }
    addRouteRecord(record, parent) {
        const keys = [];
        const options = {};
        const recordCopy = { ...record };
        if (parent) {
            // if the child isn't an absolute route
            if (record.path[0] !== '/') {
                let path = parent.record.path;
                // only add the / delimiter if the child path isn't empty
                if (recordCopy.path)
                    path += '/';
                path += record.path;
                recordCopy.path = path;
            }
        }
        const re = path_to_regexp_1.default(recordCopy.path, keys, options);
        // create the object before hand so it can be passed to children
        const matcher = {
            parent,
            record: recordCopy,
            re,
            keys: keys.map(k => '' + k.name),
            resolve: path_to_regexp_1.default.compile(recordCopy.path),
        };
        if ('children' in record && record.children) {
            for (const childRecord of record.children) {
                this.addRouteRecord(childRecord, matcher);
            }
        }
        this.matchers.push(matcher);
    }
    /**
     * Resolve a location without doing redirections so it can be used for anchors
     */
    resolveAsPath() { }
    /**
     * Transforms a MatcherLocation object into a normalized location
     * @param location MatcherLocation to resolve to a url
     */
    resolve(location, currentLocation) {
        let matcher;
        let params = {};
        let path;
        let name;
        if ('path' in location) {
            matcher = this.matchers.find(m => m.re.test(location.path));
            // TODO: if no matcher, return the location with an empty matched array
            // to allow non existent matches
            // TODO: warning of unused params if provided
            if (!matcher)
                throw new errors_1.NoRouteMatchError(currentLocation, location);
            // no need to resolve the path with the matcher as it was provided
            path = location.path;
            name = matcher.record.name;
            // fill params
            const result = matcher.re.exec(path);
            if (!result) {
                throw new Error(`Error parsing path "${location.path}"`);
            }
            for (let i = 0; i < matcher.keys.length; i++) {
                const key = matcher.keys[i];
                const value = result[i + 1];
                if (!value) {
                    throw new Error(`Error parsing path "${location.path}" when looking for param "${key}"`);
                }
                params[key] = value;
            }
            if ('redirect' in matcher.record) {
                const { redirect } = matcher.record;
                return {
                    redirect,
                    normalizedLocation: {
                        name,
                        path,
                        matched: [],
                        params,
                    },
                };
            }
            // named route
        }
        else if ('name' in location) {
            matcher = this.matchers.find(m => m.record.name === location.name);
            if (!matcher)
                throw new errors_1.NoRouteMatchError(currentLocation, location);
            name = matcher.record.name;
            params = location.params || currentLocation.params; // TODO: normalize params
            path = matcher.resolve(params);
            // TODO: check missing params
            if ('redirect' in matcher.record) {
                const { redirect } = matcher.record;
                return {
                    redirect,
                    normalizedLocation: {
                        name,
                        path,
                        matched: [],
                        params,
                    },
                };
            }
            // location is a relative path
        }
        else {
            // match by name or path of current route
            matcher = currentLocation.name
                ? this.matchers.find(m => m.record.name === currentLocation.name)
                : this.matchers.find(m => m.re.test(currentLocation.path));
            if (!matcher)
                throw new errors_1.NoRouteMatchError(currentLocation, location);
            name = matcher.record.name;
            params = location.params || currentLocation.params;
            path = matcher.resolve(params);
        }
        // this should never happen because it will mean that the user ended up in a route
        // that redirects but ended up not redirecting
        if ('redirect' in matcher.record)
            throw new errors_1.InvalidRouteMatch(location);
        const matched = [matcher.record];
        let parentMatcher = matcher.parent;
        while (parentMatcher) {
            // reversed order so parents are at the beginning
            // TODO: should be doable by typing RouteMatcher in a different way
            if ('redirect' in parentMatcher.record)
                throw new Error('TODO');
            matched.unshift(parentMatcher.record);
            parentMatcher = parentMatcher.parent;
        }
        return {
            name,
            path,
            params,
            matched,
        };
    }
}
exports.RouterMatcher = RouterMatcher;
//# sourceMappingURL=matcher.js.map