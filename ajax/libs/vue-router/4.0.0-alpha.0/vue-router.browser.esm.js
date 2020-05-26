/*!
  * vue-router v4.0.0-alpha.0
  * (c) 2019 Eduardo San Martin Morote
  * @license MIT
  */
function isRouteLocation(route) {
    return typeof route === 'string' || (route && typeof route === 'object');
}

// TODO: this should probably be generate by ensureLocation
const START_LOCATION_NORMALIZED = {
    path: '/',
    name: undefined,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
};
// make matched non enumerable for easy printing
Object.defineProperty(START_LOCATION_NORMALIZED, 'matched', {
    enumerable: false,
});

var NavigationType;
(function (NavigationType) {
    NavigationType["pop"] = "pop";
    NavigationType["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function (NavigationDirection) {
    NavigationDirection["back"] = "back";
    NavigationDirection["forward"] = "forward";
    NavigationDirection["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
// starting point for abstract history
const START_PATH = '';
const START = {
    fullPath: START_PATH,
    path: START_PATH,
    query: {},
    hash: '',
};
/**
 * Transforms an URI into a normalized history location
 * @param location URI to normalize
 * @returns a normalized history location
 */
function parseURL(location) {
    let path = '', query = {}, searchString = '', hash = '';
    // Could use URL and URLSearchParams but IE 11 doesn't support it
    const searchPos = location.indexOf('?');
    const hashPos = location.indexOf('#', searchPos > -1 ? searchPos : 0);
    if (searchPos > -1) {
        path = location.slice(0, searchPos);
        searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
        // TODO: can we remove the normalize call?
        query = normalizeQuery(parseQuery(searchString));
    }
    if (hashPos > -1) {
        path = path || location.slice(0, hashPos);
        // keep the # character
        hash = location.slice(hashPos, location.length);
    }
    // no search and no query
    path = path || location;
    return {
        fullPath: location,
        path,
        query,
        hash,
    };
}
function safeDecodeUriComponent(value) {
    try {
        value = decodeURIComponent(value);
    }
    catch (err) {
        // TODO: handling only URIError?
        console.warn(`[vue-router] error decoding query "${value}". Keeping the original value.`);
    }
    return value;
}
function safeEncodeUriComponent(value) {
    try {
        value = encodeURIComponent(value);
    }
    catch (err) {
        // TODO: handling only URIError?
        console.warn(`[vue-router] error encoding query "${value}". Keeping the original value.`);
    }
    return value;
}
/**
 * Transform a queryString into a query object. Accept both, a version with the leading `?` and without
 * Should work as URLSearchParams
 * @param search
 * @returns a query object
 */
function parseQuery(search) {
    const hasLeadingIM = search[0] === '?';
    const query = {};
    // avoid creating an object with an empty key and empty value
    // because of split('&')
    if (search === '' || search === '?')
        return query;
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    for (let i = 0; i < searchParams.length; ++i) {
        let [key, value] = searchParams[i].split('=');
        key = safeDecodeUriComponent(key);
        value = safeDecodeUriComponent(value);
        if (key in query) {
            // an extra variable for ts types
            let currentValue = query[key];
            if (!Array.isArray(currentValue)) {
                currentValue = query[key] = [currentValue];
            }
            currentValue.push(value);
        }
        else {
            query[key] = value;
        }
    }
    return query;
}
/**
 * Stringify a URL object
 * @param location
 */
function stringifyURL(location) {
    let url = location.path;
    let query = location.query ? stringifyQuery(location.query) : '';
    return url + (query && '?' + query) + (location.hash || '');
}
/**
 * Stringify an object query. Works like URLSearchParams. Doesn't prepend a `?`
 * @param query
 */
function stringifyQuery(query) {
    let search = '';
    // TODO: util function?
    for (const key in query) {
        if (search.length > 1)
            search += '&';
        const value = query[key];
        if (value === null) {
            // TODO: should we just add the empty string value?
            search += key;
            continue;
        }
        let encodedKey = safeEncodeUriComponent(key);
        let values = Array.isArray(value) ? value : [value];
        values = values.map(safeEncodeUriComponent);
        search += `${encodedKey}=${values[0]}`;
        for (let i = 1; i < values.length; i++) {
            search += `&${encodedKey}=${values[i]}`;
        }
    }
    return search;
}
function normalizeQuery(query) {
    // TODO: properly test
    const normalizedQuery = {};
    for (const key in query) {
        const value = query[key];
        if (value === null)
            normalizedQuery[key] = '';
        else
            normalizedQuery[key] = value;
    }
    return normalizedQuery;
}
/**
 * Normalize a History location object or string into a HistoryLocationNoramlized
 * @param location
 */
function normalizeLocation(location) {
    if (typeof location === 'string')
        return parseURL(location);
    else
        return {
            fullPath: stringifyURL(location),
            path: location.path,
            query: location.query ? normalizeQuery(location.query) : {},
            hash: location.hash || '',
        };
}
/**
 * Strips off the base from the beginning of a location.pathname
 * @param pathname location.pathname
 * @param base base to strip off
 */
function stripBase(pathname, base) {
    return ((base && pathname.indexOf(base) === 0 && pathname.replace(base, '')) ||
        pathname);
}

// import { RouteLocationNormalized } from '../types'
function computeScrollPosition(el) {
    return el
        ? {
            x: el.scrollLeft,
            y: el.scrollTop,
        }
        : {
            x: window.pageXOffset,
            y: window.pageYOffset,
        };
}
function getElementPosition(el, offset) {
    const docEl = document.documentElement;
    const docRect = docEl.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
        x: elRect.left - docRect.left - offset.x,
        y: elRect.top - docRect.top - offset.y,
    };
}
const hashStartsWithNumberRE = /^#\d/;
function scrollToPosition(position) {
    let normalizedPosition = null;
    if ('selector' in position) {
        // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
        // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
        const el = hashStartsWithNumberRE.test(position.selector)
            ? document.getElementById(position.selector.slice(1))
            : document.querySelector(position.selector);
        if (el) {
            const offset = position.offset || { x: 0, y: 0 };
            normalizedPosition = getElementPosition(el, offset);
        }
        // TODO: else dev warning?
    }
    else {
        normalizedPosition = {
            x: position.x,
            y: position.y,
        };
    }
    if (normalizedPosition) {
        window.scrollTo(normalizedPosition.x, normalizedPosition.y);
    }
}

var _a, _b, _c, _d, _e, _f;
// we could use symbols, but this is for IE9 only and there is
// not Symbol support anyway
const isRouterError = '__RouterError';
/**
 * Generic Error coming from the Router.
 */
class RouterError extends Error {
    /**
     * Creates a Router specific Error
     *
     * @param message Error Message
     */
    constructor(message) {
        super(message);
        // @ts-ignore for IE inheritance support
        this[_a] = true;
        // restore prototype chain
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
    }
    static is(error) {
        // only IE9 seems to break the inheritance chain
        // and set Error as the name
        if (error.name === 'Error') {
            // @ts-ignore for IE inheritance suport
            return error[isRouterError];
        }
        else {
            return error instanceof RouterError;
        }
    }
    get name() {
        return this.constructor.name;
    }
}
_a = isRouterError;
const isNoRouteMatchError = '__NoRouteMatchError';
class NoRouteMatchError extends RouterError {
    constructor(location, currentLocation) {
        super('No match for\n' +
            JSON.stringify(location) +
            (currentLocation
                ? '\nwhile being at\n' + JSON.stringify(currentLocation)
                : ''));
        // @ts-ignore for IE inheritance support
        this[_b] = true;
    }
    static is(error) {
        // only IE9 seems to break the inheritance chain
        // and set Error as the name
        if (error.name === 'Error') {
            // @ts-ignore for IE inheritance suport
            return error[isNoRouteMatchError];
        }
        else {
            return error instanceof NoRouteMatchError;
        }
    }
}
_b = isNoRouteMatchError;
const isInvalidRouteMatch = '__InvalidRouteMatch';
/**
 * Error used when the matcher fails to resolve a location
 */
class InvalidRouteMatch extends RouterError {
    constructor(location) {
        // TODO: improve the error to include currentLocation and use it for more cases
        super(`Cannot redirect using a relative location:\n${stringifyRoute(location)}\nUse the function redirect and explicitely provide a name`);
        // @ts-ignore for IE inheritance support
        this[_c] = true;
    }
    static is(error) {
        // only IE9 seems to break the inheritance chain
        // and set Error as the name
        if (error.name === 'Error') {
            // @ts-ignore for IE inheritance suport
            return error[isInvalidRouteMatch];
        }
        else {
            return error instanceof InvalidRouteMatch;
        }
    }
}
_c = isNoRouteMatchError;
const isNavigationGuardRedirect = '__NavigationGuardRedirect';
/**
 * Error used when rejecting a navigation because of a redirection. Contains
 * information about where we where trying to go and where we are going instead
 */
class NavigationGuardRedirect extends RouterError {
    // TODO: refactor order of argumnets
    // TODO: refactor into parent class NavigationError
    constructor(from, to) {
        super(`Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard`);
        // @ts-ignore for IE inheritance support
        this[_d] = true;
        this.from = from;
        this.to = to;
    }
    static is(error) {
        // only IE9 seems to break the inheritance chain
        // and set Error as the name
        if (error.name === 'Error') {
            // @ts-ignore for IE inheritance suport
            return error[isNavigationGuardRedirect];
        }
        else {
            return error instanceof NavigationGuardRedirect;
        }
    }
}
_d = isNoRouteMatchError;
const isNavigationAborted = '__NavigationAborted';
/**
 * Navigation aborted by next(false)
 */
class NavigationAborted extends RouterError {
    constructor(to, from) {
        super(`Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard`);
        // @ts-ignore for IE inheritance support
        this[_e] = true;
        this.from = from;
        this.to = to;
    }
    static is(error) {
        // only IE9 seems to break the inheritance chain
        // and set Error as the name
        if (error.name === 'Error') {
            // @ts-ignore for IE inheritance suport
            return error[isNavigationAborted];
        }
        else {
            return error instanceof NavigationAborted;
        }
    }
}
_e = isNavigationAborted;
const isNavigationCancelled = '__NavigationCancelled';
/**
 * Navigation canceled by the user by pushing/replacing a new location
 * TODO: is the name good?
 */
// @ts-ignore RouterError is a constructor
class NavigationCancelled extends RouterError {
    constructor(to, from) {
        super(`Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new \`push\` or \`replace\``);
        // @ts-ignore for IE inheritance support
        this[_f] = true;
        this.from = from;
        this.to = to;
    }
    static is(error) {
        // only IE9 seems to break the inheritance chain
        // and set Error as the name
        if (error.name === 'Error') {
            // @ts-ignore for IE inheritance suport
            return error[isNavigationCancelled];
        }
        else {
            return error instanceof NavigationCancelled;
        }
    }
}
_f = isNavigationCancelled;
const propertiesToLog = [
    'params',
    'query',
    'hash',
];
function stringifyRoute(to) {
    if (typeof to === 'string')
        return to;
    if ('path' in to)
        return to.path;
    const location = {};
    for (const key of propertiesToLog) {
        // @ts-ignore
        if (key in to)
            location[key] = to[key];
    }
    return JSON.stringify(location, null, 2);
}

// default pattern for a param: non greedy everything but /
const BASE_PARAM_PATTERN = '[^/]+?';
const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true,
    // TODO: implement real ones
    encode: v => v,
    decode: v => v,
};
/**
 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
 *
 * @param segments array of segments returned by tokenizePath
 * @param extraOptions optional options for the regexp
 * @returns a PathParser
 */
function tokensToParser(segments, extraOptions) {
    const options = {
        ...BASE_PATH_PARSER_OPTIONS,
        ...extraOptions,
    };
    // the amount of scores is the same as the length of segments except for the root segment "/"
    let score = [];
    // the regexp as a string
    let pattern = options.start ? '^' : '';
    // extracted keys
    const keys = [];
    for (const segment of segments) {
        // the root segment needs special treatment
        const segmentScores = segment.length ? [] : [90 /* Root */];
        for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
            const token = segment[tokenIndex];
            // resets the score if we are inside a sub segment /:a-other-:b
            let subSegmentScore = 40 /* Segment */ +
                (options.sensitive ? 0.25 /* BonusCaseSensitive */ : 0);
            if (token.type === 0 /* Static */) {
                // prepend the slash if we are starting a new segment
                if (!tokenIndex)
                    pattern += '/';
                pattern += token.value;
                subSegmentScore += 40 /* Static */;
            }
            else if (token.type === 1 /* Param */) {
                const { value, repeatable, optional, regexp } = token;
                keys.push({
                    name: value,
                    repeatable,
                    optional,
                });
                const re = regexp ? regexp : BASE_PARAM_PATTERN;
                // the user provided a custom regexp /:id(\\d+)
                if (re !== BASE_PARAM_PATTERN) {
                    subSegmentScore += 10 /* BonusCustomRegExp */;
                    // make sure the regexp is valid before using it
                    try {
                        new RegExp(`(${re})`);
                    }
                    catch (err) {
                        throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` +
                            err.message);
                    }
                }
                // when we repeat we must take care of the repeating leading slash
                let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
                // prepend the slash if we are starting a new segment
                if (!tokenIndex)
                    subPattern = optional ? `(?:/${subPattern})` : '/' + subPattern;
                if (optional)
                    subPattern += '?';
                pattern += subPattern;
                subSegmentScore += 20 /* Dynamic */;
                if (optional)
                    subSegmentScore += -8 /* BonusOptional */;
                if (repeatable)
                    subSegmentScore += -20 /* BonusRepeatable */;
                if (re === '.*')
                    subSegmentScore += -50 /* BonusWildcard */;
            }
            segmentScores.push(subSegmentScore);
        }
        // an empty array like /home/ -> [[{home}], []]
        // if (!segment.length) pattern += '/'
        score.push(segmentScores);
    }
    // only apply the strict bonus to the last score
    if (options.strict) {
        const i = score.length - 1;
        score[i][score[i].length - 1] += 0.7000000000000001 /* BonusStrict */;
    }
    // TODO: warn double trailing slash
    if (!options.strict)
        pattern += '/?';
    if (options.end)
        pattern += '$';
    const re = new RegExp(pattern, options.sensitive ? '' : 'i');
    function parse(path) {
        const match = path.match(re);
        const params = {};
        if (!match)
            return null;
        for (let i = 1; i < match.length; i++) {
            const value = match[i] || '';
            const key = keys[i - 1];
            params[key.name] = value && key.repeatable ? value.split('/') : value;
        }
        return params;
    }
    function stringify(params) {
        let path = '';
        // for optional parameters to allow to be empty
        let avoidDuplicatedSlash = false;
        for (const segment of segments) {
            if (!avoidDuplicatedSlash || path[path.length - 1] !== '/')
                path += '/';
            avoidDuplicatedSlash = false;
            for (const token of segment) {
                if (token.type === 0 /* Static */) {
                    path += token.value;
                }
                else if (token.type === 1 /* Param */) {
                    const { value, repeatable, optional } = token;
                    const param = value in params ? params[value] : '';
                    if (Array.isArray(param) && !repeatable)
                        throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
                    // TODO: encode, decode values, make sure that wilcard regexp do not encode the `/`
                    const text = Array.isArray(param) ? param.join('/') : param;
                    if (!text) {
                        // do not append a slash on the next iteration
                        if (optional)
                            avoidDuplicatedSlash = true;
                        else
                            throw new Error(`Missing required param "${value}"`);
                    }
                    path += text;
                }
            }
        }
        return path;
    }
    return {
        re,
        score,
        keys,
        parse,
        stringify,
    };
}
/**
 * Compares an array of numbers as used in PathParser.score and returns a
 * number. This function can be used to `sort` an array
 * @param a first array of numbers
 * @param b second array of numbers
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 * should be sorted first
 */
function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
        const diff = b[i] - a[i];
        // only keep going if diff === 0
        if (diff)
            return diff;
        i++;
    }
    // if the last subsegment was Static, the shorter segments should be sorted first
    // otherwise sort the longest segment first
    if (a.length < b.length) {
        return a.length === 1 && a[0] === 40 /* Static */ + 40 /* Segment */
            ? -1
            : 1;
    }
    else if (a.length > b.length) {
        return b.length === 1 && b[0] === 40 /* Static */ + 40 /* Segment */
            ? 1
            : -1;
    }
    return 0;
}
/**
 * Compare function that can be used with `sort` to sort an array of PathParser
 * @param a first PathParser
 * @param b second PathParser
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 */
function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
        const comp = compareScoreArray(aScore[i], bScore[i]);
        // do not return if both are equal
        if (comp)
            return comp;
        i++;
    }
    // if a and b share the same score entries but b has more, sort b first
    return bScore.length - aScore.length;
    // this is the ternary version
    // return aScore.length < bScore.length
    //   ? 1
    //   : aScore.length > bScore.length
    //   ? -1
    //   : 0
}

const ROOT_TOKEN = {
    type: 0 /* Static */,
    value: '',
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
    if (!path)
        return [[]];
    if (path === '/')
        return [[ROOT_TOKEN]];
    // remove the leading slash
    if (path[0] !== '/')
        throw new Error('A non-empty path must start with "/"');
    function crash(message) {
        throw new Error(`ERR (${state})/"${buffer}": ${message}`);
    }
    let state = 0 /* Static */;
    let previousState = state;
    const tokens = [];
    // the segment will always be valid because we get into the initial state
    // with the leading /
    let segment;
    function finalizeSegment() {
        if (segment)
            tokens.push(segment);
        segment = [];
    }
    // index on the path
    let i = 0;
    // char at index
    let char;
    // buffer of the value read
    let buffer = '';
    // custom regexp for a param
    let customRe = '';
    function consumeBuffer() {
        if (!buffer)
            return;
        if (state === 0 /* Static */) {
            segment.push({
                type: 0 /* Static */,
                value: buffer,
            });
        }
        else if (state === 1 /* Param */ ||
            state === 2 /* ParamRegExp */ ||
            state === 3 /* ParamRegExpEnd */) {
            if (segment.length > 1 && (char === '*' || char === '+'))
                crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
            segment.push({
                type: 1 /* Param */,
                value: buffer,
                regexp: customRe,
                repeatable: char === '*' || char === '+',
                optional: char === '*' || char === '?',
            });
        }
        else {
            crash('Invalid state to consume buffer');
        }
        buffer = '';
    }
    function addCharToBuffer() {
        buffer += char;
    }
    while (i < path.length) {
        char = path[i++];
        if (char === '\\' && state !== 2 /* ParamRegExp */) {
            previousState = state;
            state = 4 /* EscapeNext */;
            continue;
        }
        switch (state) {
            case 0 /* Static */:
                if (char === '/') {
                    if (buffer) {
                        consumeBuffer();
                    }
                    finalizeSegment();
                }
                else if (char === ':') {
                    consumeBuffer();
                    state = 1 /* Param */;
                }
                else if (char === '{') {
                    // TODO: handle group
                    addCharToBuffer();
                }
                else {
                    addCharToBuffer();
                }
                break;
            case 4 /* EscapeNext */:
                addCharToBuffer();
                state = previousState;
                break;
            case 1 /* Param */:
                if (char === '(') {
                    state = 2 /* ParamRegExp */;
                    customRe = '';
                }
                else if (VALID_PARAM_RE.test(char)) {
                    addCharToBuffer();
                }
                else {
                    consumeBuffer();
                    state = 0 /* Static */;
                    // go back one character if we were not modifying
                    if (char !== '*' && char !== '?' && char !== '+')
                        i--;
                }
                break;
            case 2 /* ParamRegExp */:
                if (char === ')') {
                    // handle the escaped )
                    if (customRe[customRe.length - 1] == '\\')
                        customRe = customRe.slice(0, -1) + char;
                    else
                        state = 3 /* ParamRegExpEnd */;
                }
                else {
                    customRe += char;
                }
                break;
            case 3 /* ParamRegExpEnd */:
                // same as finalizing a param
                consumeBuffer();
                state = 0 /* Static */;
                // go back one character if we were not modifying
                if (char !== '*' && char !== '?' && char !== '+')
                    i--;
                break;
            default:
                crash('Unkwnonw state');
                break;
        }
    }
    if (state === 2 /* ParamRegExp */)
        crash(`Unfinished custom RegExp for param "${buffer}"`);
    consumeBuffer();
    finalizeSegment();
    return tokens;
}

function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    return {
        ...parser,
        record,
        parent,
    };
}

const TRAILING_SLASH_RE = /(.)\/+$/;
function removeTrailingSlash(path) {
    return path.replace(TRAILING_SLASH_RE, '$1');
}
function createRouterMatcher(routes, globalOptions) {
    const matchers = [];
    function addRoute(record, parent) {
        const mainNormalizedRecord = normalizeRouteRecord(record);
        const options = { ...globalOptions, ...record.options };
        // TODO: can probably be removed now that we have our own parser and we handle this correctly
        if (!options.strict)
            mainNormalizedRecord.path = removeTrailingSlash(mainNormalizedRecord.path);
        // generate an array of records to correctly handle aliases
        const normalizedRecords = [mainNormalizedRecord];
        if ('alias' in record && record.alias) {
            const aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
            for (const alias of aliases) {
                normalizedRecords.push({
                    ...mainNormalizedRecord,
                    path: alias,
                });
            }
        }
        // build up the path for nested routes
        if (parent) {
            // if the child isn't an absolute route
            if (record.path[0] !== '/') {
                let path = parent.record.path;
                // only add the / delimiter if the child path isn't empty
                for (const normalizedRecord of normalizedRecords) {
                    if (normalizedRecord.path)
                        path += '/';
                    path += record.path;
                    normalizedRecord.path = path;
                }
            }
        }
        for (const normalizedRecord of normalizedRecords) {
            // create the object before hand so it can be passed to children
            const matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
            if ('children' in record && record.children) {
                for (const childRecord of record.children) {
                    addRoute(childRecord, matcher);
                }
                // TODO: the parent is special, we should match their children. They
                // reference to the parent so we can render the parent
                //
                // matcher.score = -10
            }
            insertMatcher(matcher);
        }
    }
    function insertMatcher(matcher) {
        let i = 0;
        // console.log('i is', { i })
        while (i < matchers.length &&
            comparePathParserScore(matcher, matchers[i]) >= 0)
            i++;
        // console.log('END i is', { i })
        // while (i < matchers.length && matcher.score <= matchers[i].score) i++
        matchers.splice(i, 0, matcher);
    }
    /**
     * Resolves a location. Gives access to the route record that corresponds to the actual path as well as filling the corresponding params objects
     * @param location MatcherLocation to resolve to a url
     * @param currentLocation MatcherLocationNormalized of the current location
     */
    function resolve(location, currentLocation) {
        let matcher;
        let params = {};
        let path;
        let name;
        if ('name' in location && location.name) {
            matcher = matchers.find(m => m.record.name === location.name);
            if (!matcher)
                throw new NoRouteMatchError(location);
            name = matcher.record.name;
            // TODO: merge params
            params = location.params || currentLocation.params;
            // params are automatically encoded
            // TODO: try catch to provide better error messages
            path = matcher.stringify(params);
            if ('redirect' in matcher.record) {
                const { redirect } = matcher.record;
                return {
                    redirect,
                    normalizedLocation: {
                        name,
                        path,
                        matched: [],
                        params,
                        meta: matcher.record.meta || {},
                    },
                };
            }
        }
        else if ('path' in location) {
            matcher = matchers.find(m => m.re.test(location.path));
            // matcher should have a value after the loop
            // TODO: if no matcher, return the location with an empty matched array
            // to allow non existent matches
            // TODO: warning of unused params if provided
            if (!matcher)
                throw new NoRouteMatchError(location);
            params = matcher.parse(location.path);
            // no need to resolve the path with the matcher as it was provided
            // this also allows the user to control the encoding
            // TODO: check if the note above regarding encoding is still true
            path = location.path;
            name = matcher.record.name;
            if ('redirect' in matcher.record) {
                const { redirect } = matcher.record;
                return {
                    redirect,
                    normalizedLocation: {
                        name,
                        path,
                        // TODO: verify this is good or add a comment
                        matched: [],
                        params,
                        meta: matcher.record.meta || {},
                    },
                };
            }
            // location is a relative path
        }
        else {
            // match by name or path of current route
            matcher = currentLocation.name
                ? matchers.find(m => m.record.name === currentLocation.name)
                : matchers.find(m => m.re.test(currentLocation.path));
            if (!matcher)
                throw new NoRouteMatchError(location, currentLocation);
            name = matcher.record.name;
            params = location.params || currentLocation.params;
            path = matcher.stringify(params);
        }
        // this should never happen because it will mean that the user ended up in a route
        // that redirects but ended up not redirecting
        if ('redirect' in matcher.record)
            throw new InvalidRouteMatch(location);
        const matched = [matcher.record];
        let parentMatcher = matcher.parent;
        while (parentMatcher) {
            // reversed order so parents are at the beginning
            // TODO: should be doable by typing RouteRecordMatcher in a different way
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
            meta: matcher.record.meta || {},
        };
    }
    // add initial routes
    for (const route of routes) {
        addRoute(route);
    }
    return { addRoute, resolve };
}
/**
 * Normalizes a RouteRecord into a MatchedRouteRecord. It also ensures removes
 * traling slashes Returns a copy
 * @param record
 * @returns the normalized version
 */
function normalizeRouteRecord(record) {
    if ('redirect' in record) {
        return {
            path: record.path,
            redirect: record.redirect,
            name: record.name,
            beforeEnter: record.beforeEnter,
            meta: record.meta,
        };
    }
    else {
        return {
            path: record.path,
            components: 'components' in record
                ? record.components
                : { default: record.component },
            children: record.children,
            name: record.name,
            beforeEnter: record.beforeEnter,
            meta: record.meta,
        };
    }
}

function guardToPromiseFn(guard, to, from) {
    return () => new Promise((resolve, reject) => {
        const next = (valid) => {
            // TODO: handle callback
            if (valid === false)
                reject(new NavigationAborted(to, from));
            else if (isRouteLocation(valid)) {
                reject(new NavigationGuardRedirect(to, valid));
            }
            else
                resolve();
        };
        guard(to, from, next);
    });
}

async function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    await Promise.all(matched.map(async (record) => {
        // TODO: cache async routes per record
        for (const name in record.components) {
            const component = record.components[name];
            // TODO: handle Vue.extend views
            // if ('options' in component) throw new Error('TODO')
            const resolvedComponent = await (typeof component === 'function'
                ? component()
                : component);
            const guard = resolvedComponent[guardType];
            if (guard) {
                guards.push(guardToPromiseFn(guard, to, from));
            }
        }
    }));
    return guards;
}

function createRouter({ history, routes, scrollBehavior, }) {
    const matcher = createRouterMatcher(routes);
    const beforeGuards = [];
    const afterGuards = [];
    let currentRoute = START_LOCATION_NORMALIZED;
    let pendingLocation = START_LOCATION_NORMALIZED;
    let onReadyCbs = [];
    // TODO: should these be triggered before or after route.push().catch()
    let errorHandlers = [];
    let app;
    let ready = false;
    function resolve(to, currentLocation /*, append?: boolean */) {
        if (typeof to === 'string')
            return resolveLocation(
            // TODO: refactor and remove import
            normalizeLocation(to), currentLocation);
        return resolveLocation({
            // TODO: refactor with url utils
            query: {},
            hash: '',
            ...to,
        }, currentLocation);
    }
    function createHref(to) {
        return history.base + to.fullPath;
    }
    function resolveLocation(location, currentLocation, redirectedFrom
    // ensure when returning that the redirectedFrom is a normalized location
    ) {
        currentLocation = currentLocation || currentRoute;
        const matchedRoute = matcher.resolve(location, currentLocation);
        if ('redirect' in matchedRoute) {
            const { redirect } = matchedRoute;
            // target location normalized, used if we want to redirect again
            const normalizedLocation = {
                ...matchedRoute.normalizedLocation,
                fullPath: stringifyURL({
                    path: matchedRoute.normalizedLocation.path,
                    query: location.query,
                    hash: location.hash,
                }),
                query: normalizeQuery(location.query || {}),
                hash: location.hash,
                redirectedFrom,
                meta: {},
            };
            if (typeof redirect === 'string') {
                // match the redirect instead
                return resolveLocation(normalizeLocation(redirect), currentLocation, normalizedLocation);
            }
            else if (typeof redirect === 'function') {
                const newLocation = redirect(normalizedLocation);
                if (typeof newLocation === 'string') {
                    return resolveLocation(normalizeLocation(newLocation), currentLocation, normalizedLocation);
                }
                // TODO: should we allow partial redirects? I think we should because it's impredictable if
                // there was a redirect before
                // if (!('path' in newLocation) && !('name' in newLocation)) throw new Error('TODO: redirect canot be relative')
                return resolveLocation({
                    ...newLocation,
                    query: normalizeQuery(newLocation.query || {}),
                    hash: newLocation.hash || '',
                }, currentLocation, normalizedLocation);
            }
            else {
                return resolveLocation({
                    ...redirect,
                    query: normalizeQuery(redirect.query || {}),
                    hash: redirect.hash || '',
                }, currentLocation, normalizedLocation);
            }
        }
        else {
            // add the redirectedFrom field
            const url = normalizeLocation({
                path: matchedRoute.path,
                query: location.query,
                hash: location.hash,
            });
            return {
                ...matchedRoute,
                ...url,
                redirectedFrom,
            };
        }
    }
    async function push(to) {
        let url;
        let location;
        // TODO: refactor into matchLocation to return location and url
        if (typeof to === 'string' || ('path' in to && !('name' in to))) {
            url = normalizeLocation(to);
            // TODO: should allow a non matching url to allow dynamic routing to work
            location = resolveLocation(url, currentRoute);
        }
        else {
            // named or relative route
            const query = to.query ? normalizeQuery(to.query) : {};
            const hash = to.hash || '';
            // we need to resolve first
            location = resolveLocation({ ...to, query, hash }, currentRoute);
            // intentionally drop current query and hash
            url = normalizeLocation({
                query,
                hash,
                ...location,
            });
        }
        // TODO: should we throw an error as the navigation was aborted
        // TODO: needs a proper check because order in query could be different
        if (currentRoute !== START_LOCATION_NORMALIZED &&
            currentRoute.fullPath === url.fullPath)
            return currentRoute;
        const toLocation = location;
        pendingLocation = toLocation;
        // trigger all guards, throw if navigation is rejected
        try {
            await navigate(toLocation, currentRoute);
        }
        catch (error) {
            if (NavigationGuardRedirect.is(error)) {
                // push was called while waiting in guards
                if (pendingLocation !== toLocation) {
                    // TODO: trigger onError as well
                    throw new NavigationCancelled(toLocation, currentRoute);
                }
                // TODO: setup redirect stack
                // TODO: shouldn't we trigger the error as well
                return push(error.to);
            }
            else {
                // TODO: write tests
                // triggerError as well
                if (pendingLocation !== toLocation) {
                    // TODO: trigger onError as well
                    throw new NavigationCancelled(toLocation, currentRoute);
                }
                triggerError(error);
            }
        }
        // push was called while waiting in guards
        if (pendingLocation !== toLocation) {
            throw new NavigationCancelled(toLocation, currentRoute);
        }
        // change URL
        if (to.replace === true)
            history.replace(url);
        else
            history.push(url);
        const from = currentRoute;
        currentRoute = toLocation;
        updateReactiveRoute();
        handleScroll(toLocation, from).catch(err => triggerError(err, false));
        // navigation is confirmed, call afterGuards
        for (const guard of afterGuards)
            guard(toLocation, from);
        return currentRoute;
    }
    function replace(to) {
        const location = typeof to === 'string' ? { path: to } : to;
        return push({ ...location, replace: true });
    }
    async function runGuardQueue(guards) {
        for (const guard of guards) {
            await guard();
        }
    }
    async function navigate(to, from) {
        let guards;
        // all components here have been resolved once because we are leaving
        guards = await extractComponentsGuards(from.matched.filter(record => to.matched.indexOf(record) < 0).reverse(), 'beforeRouteLeave', to, from);
        // run the queue of per route beforeRouteLeave guards
        await runGuardQueue(guards);
        // check global guards beforeEach
        guards = [];
        for (const guard of beforeGuards) {
            guards.push(guardToPromiseFn(guard, to, from));
        }
        // console.log('Guarding against', guards.length, 'guards')
        await runGuardQueue(guards);
        // check in components beforeRouteUpdate
        guards = await extractComponentsGuards(to.matched.filter(record => from.matched.indexOf(record) > -1), 'beforeRouteUpdate', to, from);
        // run the queue of per route beforeEnter guards
        await runGuardQueue(guards);
        // check the route beforeEnter
        guards = [];
        for (const record of to.matched) {
            // do not trigger beforeEnter on reused views
            if (record.beforeEnter && from.matched.indexOf(record) < 0) {
                if (Array.isArray(record.beforeEnter)) {
                    for (const beforeEnter of record.beforeEnter)
                        guards.push(guardToPromiseFn(beforeEnter, to, from));
                }
                else {
                    guards.push(guardToPromiseFn(record.beforeEnter, to, from));
                }
            }
        }
        // run the queue of per route beforeEnter guards
        await runGuardQueue(guards);
        // check in-component beforeRouteEnter
        // TODO: is it okay to resolve all matched component or should we do it in order
        guards = await extractComponentsGuards(to.matched.filter(record => from.matched.indexOf(record) < 0), 'beforeRouteEnter', to, from);
        // run the queue of per route beforeEnter guards
        await runGuardQueue(guards);
    }
    history.listen(async (to, from, info) => {
        const matchedRoute = resolveLocation(to, currentRoute);
        // console.log({ to, matchedRoute })
        const toLocation = { ...to, ...matchedRoute };
        pendingLocation = toLocation;
        try {
            await navigate(toLocation, currentRoute);
            // a more recent navigation took place
            if (pendingLocation !== toLocation) {
                return triggerError(new NavigationCancelled(toLocation, currentRoute), false);
            }
            // accept current navigation
            currentRoute = {
                ...to,
                ...matchedRoute,
            };
            updateReactiveRoute();
            // TODO: refactor with a state getter
            // const { scroll } = history.state
            const { state } = window.history;
            handleScroll(toLocation, currentRoute, state.scroll).catch(err => triggerError(err, false));
        }
        catch (error) {
            if (NavigationGuardRedirect.is(error)) {
                // TODO: refactor the duplication of new NavigationCancelled by
                // checking instanceof NavigationError (it's another TODO)
                // a more recent navigation took place
                if (pendingLocation !== toLocation) {
                    return triggerError(new NavigationCancelled(toLocation, currentRoute), false);
                }
                triggerError(error, false);
                // the error is already handled by router.push
                // we just want to avoid logging the error
                push(error.to).catch(() => { });
            }
            else if (NavigationAborted.is(error)) {
                console.log('Cancelled, going to', -info.distance);
                history.go(-info.distance, false);
                // TODO: test on different browsers ensure consistent behavior
                // Maybe we could write the length the first time we do a navigation and use that for direction
                // TODO: this doesn't work if the user directly calls window.history.go(-n) with n > 1
                // We can override the go method to retrieve the number but not sure if all browsers allow that
                // if (info.direction === NavigationDirection.back) {
                //   history.forward(false)
                // } else {
                // TODO: go back because we cancelled, then
                // or replace and not discard the rest of history. Check issues, there was one talking about this
                // behaviour, maybe we can do better
                // history.back(false)
                // }
            }
            else {
                triggerError(error, false);
            }
        }
    });
    function beforeEach(guard) {
        beforeGuards.push(guard);
        return () => {
            const i = beforeGuards.indexOf(guard);
            if (i > -1)
                beforeGuards.splice(i, 1);
        };
    }
    function afterEach(guard) {
        afterGuards.push(guard);
        return () => {
            const i = afterGuards.indexOf(guard);
            if (i > -1)
                afterGuards.splice(i, 1);
        };
    }
    function onError(handler) {
        errorHandlers.push(handler);
    }
    function triggerError(error, shouldThrow = true) {
        for (const handler of errorHandlers) {
            handler(error);
        }
        if (shouldThrow)
            throw error;
    }
    function updateReactiveRoute() {
        if (!app)
            return;
        // TODO: matched should be non enumerable and the defineProperty here shouldn't be necessary
        const route = { ...currentRoute };
        Object.defineProperty(route, 'matched', { enumerable: false });
        // @ts-ignore
        app._route = Object.freeze(route);
        markAsReady();
    }
    function onReady() {
        if (ready && currentRoute !== START_LOCATION_NORMALIZED)
            return Promise.resolve();
        return new Promise((resolve, reject) => {
            onReadyCbs.push([resolve, reject]);
        });
    }
    function markAsReady(err) {
        if (ready || currentRoute === START_LOCATION_NORMALIZED)
            return;
        ready = true;
        for (const [resolve] of onReadyCbs) {
            // TODO: is this okay?
            // always resolve, as the router is ready even if there was an error
            // @ts-ignore
            resolve(err);
            // TODO: try catch the on ready?
            // if (err) reject(err)
            // else resolve()
        }
        onReadyCbs = [];
    }
    async function doInitialNavigation() {
        // let the user call replace or push on SSR
        if (history.location === START)
            return;
        // TODO: refactor code that was duplicated from push method
        const toLocation = resolveLocation(history.location, currentRoute);
        pendingLocation = toLocation;
        // trigger all guards, throw if navigation is rejected
        try {
            await navigate(toLocation, currentRoute);
        }
        catch (error) {
            markAsReady(error);
            if (NavigationGuardRedirect.is(error)) {
                // push was called while waiting in guards
                if (pendingLocation !== toLocation) {
                    // TODO: trigger onError as well
                    throw new NavigationCancelled(toLocation, currentRoute);
                }
                // TODO: setup redirect stack
                await push(error.to);
                return;
            }
            else {
                // TODO: write tests
                // triggerError as well
                if (pendingLocation !== toLocation) {
                    // TODO: trigger onError as well
                    throw new NavigationCancelled(toLocation, currentRoute);
                }
                // this throws, so nothing ahead happens
                triggerError(error);
            }
        }
        // push was called while waiting in guards
        if (pendingLocation !== toLocation) {
            const error = new NavigationCancelled(toLocation, currentRoute);
            markAsReady(error);
            throw error;
        }
        // NOTE: here we removed the pushing to history part as the history
        // already contains current location
        const from = currentRoute;
        currentRoute = toLocation;
        updateReactiveRoute();
        // navigation is confirmed, call afterGuards
        for (const guard of afterGuards)
            guard(toLocation, from);
        markAsReady();
    }
    async function handleScroll(to, from, scrollPosition) {
        if (!scrollBehavior)
            return;
        await app.$nextTick();
        const position = await scrollBehavior(to, from, scrollPosition || null);
        console.log('scrolling to', position);
        scrollToPosition(position);
    }
    function setActiveApp(vm) {
        app = vm;
        updateReactiveRoute();
    }
    const router = {
        currentRoute,
        push,
        replace,
        resolve,
        beforeEach,
        afterEach,
        createHref,
        onError,
        onReady,
        doInitialNavigation,
        setActiveApp,
    };
    Object.defineProperty(router, 'currentRoute', {
        get: () => currentRoute,
    });
    return router;
}

// import consola from 'consola'
const cs = console;
/**
 * Creates a noramlized history location from a window.location object
 * TODO: encoding is not handled like this
 * @param location
 */
function createCurrentLocation(base, location) {
    const { pathname, search, hash } = location;
    // allows hash based url
    if (base.indexOf('#') > -1) {
        // prepend the starting slash to hash so the url starts with /#
        return parseURL(stripBase('/' + hash, base));
    }
    const path = stripBase(pathname, base);
    return {
        fullPath: path + search + hash,
        path,
        query: parseQuery(search),
        hash: hash,
    };
}
function useHistoryListeners(base, historyState, location) {
    let listeners = [];
    let teardowns = [];
    // TODO: should it be a stack? a Dict. Check if the popstate listener
    // can trigger twice
    let pauseState = null;
    const popStateHandler = ({ state, }) => {
        cs.info('popstate fired', state);
        cs.info('currentState', historyState);
        const from = location.value;
        const fromState = historyState.value;
        const to = createCurrentLocation(base, window.location);
        location.value = to;
        historyState.value = state;
        if (pauseState && pauseState.fullPath === from.fullPath) {
            cs.info('❌ Ignored beacuse paused for', pauseState.fullPath);
            // reset pauseState
            pauseState = null;
            return;
        }
        const deltaFromCurrent = fromState
            ? state.position - fromState.position
            : '';
        console.log({ deltaFromCurrent });
        // call all listeners
        listeners.forEach(listener => listener(location.value, from, {
            distance: deltaFromCurrent || 0,
            type: NavigationType.pop,
            direction: deltaFromCurrent
                ? deltaFromCurrent > 0
                    ? NavigationDirection.forward
                    : NavigationDirection.back
                : NavigationDirection.unknown,
        }));
    };
    function pauseListeners() {
        cs.info(`⏸ for ${location.value.fullPath}`);
        pauseState = location.value;
    }
    function listen(callback) {
        // settup the listener and prepare teardown callbacks
        listeners.push(callback);
        const teardown = () => {
            const index = listeners.indexOf(callback);
            if (index > -1)
                listeners.splice(index, 1);
        };
        teardowns.push(teardown);
        return teardown;
    }
    function destroy() {
        for (const teardown of teardowns)
            teardown();
        teardowns = [];
        window.removeEventListener('popstate', popStateHandler);
    }
    // settup the listener and prepare teardown callbacks
    window.addEventListener('popstate', popStateHandler);
    return {
        pauseListeners,
        listen,
        destroy,
    };
}
function useHistoryStateNavigation(base) {
    const { history } = window;
    /**
     * Creates a state object
     */
    function buildState(back, current, forward, replaced = false, computeScroll = false) {
        return {
            back,
            current,
            forward,
            replaced,
            position: window.history.length,
            scroll: computeScroll ? computeScrollPosition() : null,
        };
    }
    // private variables
    let location = {
        value: createCurrentLocation(base, window.location),
    };
    let historyState = { value: history.state };
    // build current history entry as this is a fresh navigation
    if (!historyState.value) {
        changeLocation({
            back: null,
            current: location.value,
            forward: null,
            // the length is off by one, we need to decrease it
            position: history.length - 1,
            replaced: true,
            scroll: computeScrollPosition(),
        }, '', location.value.fullPath, true);
    }
    function changeLocation(state, title, fullPath, replace) {
        const url = base + fullPath;
        try {
            // BROWSER QUIRK
            // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
            const newState = replace
                ? { ...historyState.value, ...state }
                : state;
            history[replace ? 'replaceState' : 'pushState'](newState, title, url);
            historyState.value = state;
        }
        catch (err) {
            cs.log('[vue-router]: Error with push/replace State', err);
            // Force the navigation, this also resets the call count
            window.location[replace ? 'replace' : 'assign'](url);
        }
    }
    function replace(to) {
        const normalized = normalizeLocation(to);
        // cs.info('replace', location, normalized)
        const state = buildState(historyState.value.back, normalized, historyState.value.forward, true);
        if (historyState)
            state.position = historyState.value.position;
        changeLocation(
        // TODO: refactor state building
        state, '', normalized.fullPath, true);
        location.value = normalized;
    }
    function push(to, data) {
        const normalized = normalizeLocation(to);
        // Add to current entry the information of where we are going
        // as well as saving the current position
        // TODO: the scroll position computation should be customizable
        const currentState = {
            ...historyState.value,
            forward: normalized,
            scroll: computeScrollPosition(),
        };
        changeLocation(currentState, '', currentState.current.fullPath, true);
        const state = {
            ...buildState(location.value, normalized, null),
            position: currentState.position + 1,
            ...data,
        };
        changeLocation(state, '', normalized.fullPath, false);
        location.value = normalized;
    }
    return {
        location,
        state: historyState,
        push,
        replace,
    };
}
function createHistory(base = '') {
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location);
    function back(triggerListeners = true) {
        go(-1, triggerListeners);
    }
    function forward(triggerListeners = true) {
        go(1, triggerListeners);
    }
    function go(distance, triggerListeners = true) {
        if (!triggerListeners)
            historyListeners.pauseListeners();
        history.go(distance);
    }
    const routerHistory = {
        // it's overriden right after
        // @ts-ignore
        location: historyNavigation.location.value,
        base,
        back,
        forward,
        go,
        ...historyNavigation,
        ...historyListeners,
    };
    Object.defineProperty(routerHistory, 'location', {
        get: () => historyNavigation.location.value,
    });
    return routerHistory;
}

// import consola from 'consola'
// const cs = console
// const cs = consola.withTag('abstract')
/**
 * Creates a in-memory based history. The main purporse of this history is to handle SSR. It starts in a special location that is nowhere.
 * It's up to the user to replace that location with the starter location.
 * @param base Base applied to all urls, defaults to '/'
 * @returns a history object that can be passed to the router constructor
 */
function createMemoryHistory(base = '') {
    let listeners = [];
    // TODO: make sure this is right as the first location is nowhere so maybe this should be empty instead
    let queue = [START];
    let position = 0;
    function setLocation(location) {
        position++;
        if (position === queue.length) {
            // we are at the end, we can simply append a new entry
            queue.push(location);
        }
        else {
            // we are in the middle, we remove everything from here in the queue
            queue.splice(position);
            queue.push(location);
        }
    }
    function triggerListeners(to, from, { direction, distance, }) {
        const info = {
            direction,
            distance,
            type: NavigationType.pop,
        };
        for (let callback of listeners) {
            callback(to, from, info);
        }
    }
    const routerHistory = {
        // rewritten by Object.defineProperty
        location: START,
        // TODO: acutally use it
        base,
        replace(to) {
            const toNormalized = normalizeLocation(to);
            // remove current entry and decrement position
            queue.splice(position--, 1);
            setLocation(toNormalized);
        },
        push(to, data) {
            setLocation(normalizeLocation(to));
        },
        listen(callback) {
            listeners.push(callback);
            return () => {
                const index = listeners.indexOf(callback);
                if (index > -1)
                    listeners.splice(index, 1);
            };
        },
        destroy() {
            listeners = [];
        },
        back(shouldTrigger = true) {
            this.go(-1, shouldTrigger);
        },
        forward(shouldTrigger = true) {
            this.go(1, shouldTrigger);
        },
        go(distance, shouldTrigger = true) {
            const from = this.location;
            const direction = 
            // we are considering distance === 0 going forward, but in abstract mode
            // using 0 for the distance doesn't make sense like it does in html5 where
            // it reloads the page
            distance < 0 ? NavigationDirection.back : NavigationDirection.forward;
            position = Math.max(0, Math.min(position + distance, queue.length - 1));
            if (shouldTrigger) {
                triggerListeners(this.location, from, {
                    direction,
                    distance,
                });
            }
        },
    };
    Object.defineProperty(routerHistory, 'location', {
        get: () => queue[position],
    });
    return routerHistory;
}

function createHashHistory(base = '') {
    // Make sure this implementation is fine in terms of encoding, specially for IE11
    return createHistory('/#' + base);
}

// @ts-nocheck
const View = {
    name: 'RouterView',
    functional: true,
    props: {
        name: {
            type: String,
            default: 'default',
        },
    },
    render(_, { children, parent, data, props }) {
        // @ts-ignore used by devtools to display a router-view badge
        data.routerView = true;
        // directly use parent context's createElement() function
        // so that components rendered by router-view can resolve named slots
        const h = parent.$createElement;
        // @ts-ignore $route is added by our typings
        const route = parent.$route;
        // determine current view depth, also check to see if the tree
        // has been toggled inactive but kept-alive.
        let depth = 0;
        // let inactive = false
        // @ts-ignore
        while (parent && parent._routerRoot !== parent) {
            const vnodeData = parent.$vnode && parent.$vnode.data;
            if (vnodeData) {
                // @ts-ignore
                if (vnodeData.routerView) {
                    depth++;
                }
                // if (vnodeData.keepAlive && parent._inactive) {
                //   inactive = true
                // }
            }
            parent = parent.$parent;
        }
        // @ts-ignore for devtools
        data.routerViewDepth = depth;
        // TODO: support nested router-views
        const matched = route.matched[depth];
        // render empty node if no matched route
        if (!matched)
            return h();
        const component = matched.components[props.name];
        return h(component, data, children);
    },
};

const Link = {
    name: 'RouterLink',
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
    },
    render(h) {
        // @ts-ignore can't get `this`
        const router = this.$router;
        // @ts-ignore can't get `this`
        const from = this.$route;
        // @ts-ignore can't get `this`
        const to = this.to;
        const route = router.resolve(to);
        const href = router.createHref(route);
        // TODO: active classes
        // TODO: handle replace prop
        const handler = (e) => {
            // TODO: handle navigate with empty parameters for scoped slot and composition api
            if (guardEvent(e)) {
                router.push(route);
            }
        };
        const on = { click: handler };
        const data = {
            on,
            attrs: { href },
        };
        // @ts-ignore
        return h('a', data, this.$slots.default);
    },
};
function guardEvent(e) {
    // don't redirect with control keys
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
        return;
    // don't redirect when preventDefault called
    if (e.defaultPrevented)
        return;
    // don't redirect on right click
    if (e.button !== undefined && e.button !== 0)
        return;
    // don't redirect if `target="_blank"`
    // @ts-ignore getAttribute does exist
    if (e.currentTarget && e.currentTarget.getAttribute) {
        // @ts-ignore getAttribute exists
        const target = e.currentTarget.getAttribute('target');
        if (/\b_blank\b/i.test(target))
            return;
    }
    // this may be a Weex event which doesn't have this method
    if (e.preventDefault)
        e.preventDefault();
    return true;
}

// TODO: type things
const plugin = Vue => {
    Vue.mixin({
        beforeCreate() {
            if ('router' in this.$options) {
                // @ts-ignore we are adding this
                this._routerRoot = this;
                // @ts-ignore should be able to be removed once we add the typing
                const router = this.$options.router;
                // @ts-ignore _router is internal
                this._router = router;
                // this._router.init(this)
                router.setActiveApp(this);
                // @ts-ignore we can use but should not be used by others
                Vue.util.defineReactive(this, '_route', router.currentRoute
                // undefined,
                // true
                );
                router.doInitialNavigation().catch(err => {
                    console.error('Unhandled error', err);
                });
            }
            else {
                // @ts-ignore we are adding this
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
    // @ts-ignore FIXME: should work
    Vue.component('RouterView', View);
    // @ts-ignore FIXME: should work
    Vue.component('RouterLink', Link);
    // Vue.component('RouterLink', Link)
    const strats = Vue.config.optionMergeStrategies;
    // use the same hook merging strategy for route hooks
    strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate =
        strats.created;
};
// TODO: refactor somewhere else
// const inBrowser = typeof window !== 'undefined'
// const HistoryMode = {
//   history: HTML5History,
//   hash: HashHistory,
//   abstract: AbstractHistory
// }
// export default class VueRouter extends Router {
//   static install = plugin
//   static version = '"4.0.0-alpha.0"'
//   // TODO: handle mode in a retro compatible way
//   constructor(
//     options: Partial<RouterOptions & { mode: 'history' | 'abstract' | 'hash' }>
//   ) {
//     // let { mode } = options
//     // if (!inBrowser) mode = 'abstract'
//     super({
//       ...options,
//       routes: options.routes || [],
//       // FIXME: change when possible
//       history: createHistory(),
//       // history: new HistoryMode[mode || 'hash'](),
//     })
//   }
// }
// declare global {
//   interface Window {
//     Vue: VueConstructor
//   }
// }
// if (typeof window !== 'undefined' && window.Vue) window.Vue.use(VueRouter)

export { createHashHistory, createHistory, createMemoryHistory, createRouter, plugin };
