/*!
  * vue-i18n v9.0.0-alpha.8
  * (c) 2020 kazuya kawaguchi
  * Released under the MIT License.
  */
var VueI18n = (function (exports, vue) {
  'use strict';

  /*!
   * Original Utilities
   * written by kazuya kawaguchi
   */
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\u0027/g, '\\u0027');
  const isDate = (val) => toTypeString(val) === '[object Date]';
  const isRegExp = (val) => toTypeString(val) === '[object RegExp]';
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
      if (typeof console !== 'undefined') {
          console.warn('[vue-i18n] ' + msg);
          /* istanbul ignore if */
          if (err) {
              console.warn(err.stack);
          }
      }
  }
  /*!
   * Useful Utilites By Evan you
   * Modified by kazuya kawaguchi
   * MIT License
   * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
   * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
   */
  const isArray = Array.isArray;
  const isNumber = (val) => typeof val === 'number' && isFinite(val);
  const isFunction = (val) => typeof val === 'function';
  const isString = (val) => typeof val === 'string';
  const isBoolean = (val) => typeof val === 'boolean';
  const isObject = (val) => // eslint-disable-line
   val !== null && typeof val === 'object';
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === '[object Object]';
  // for converting list and named values to displayed strings.
  const toDisplayString = (val) => {
      return val == null
          ? ''
          : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
              ? JSON.stringify(val, null, 2)
              : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
      const lines = source.split(/\r?\n/);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
          count += lines[i].length + 1;
          if (count >= start) {
              for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
                  if (j < 0 || j >= lines.length)
                      continue;
                  const line = j + 1;
                  res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
                  const lineLength = lines[j].length;
                  if (j === i) {
                      // push underline
                      const pad = start - (count - lineLength) + 1;
                      const length = Math.max(1, end > count ? lineLength - pad : end - start);
                      res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                  }
                  else if (j > i) {
                      if (end > count) {
                          const length = Math.max(Math.min(end - count, lineLength), 1);
                          res.push(`   |  ` + '^'.repeat(length));
                      }
                      count += lineLength + 1;
                  }
              }
              break;
          }
      }
      return res.join('\n');
  }

  function createPosition(line, column, offset) {
      return { line, column, offset };
  }
  function createLocation(start, end, source) {
      const loc = { start, end };
      if (source != null) {
          loc.source = source;
      }
      return loc;
  }

  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
  const errorMessages = {
      // tokenizer error messages
      [0 /* EXPECTED_TOKEN */]: `Expected token: '{0}'`,
      [1 /* INVALID_TOKEN_IN_PLACEHOLDER */]: `Invalid token in placeholder: '{0}'`,
      [2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */]: `Unterminated single quote in placeholder`,
      [3 /* UNKNOWN_ESCAPE_SEQUENCE */]: `Unknown escape sequence: \\{0}`,
      [4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */]: `Invalid unicode escape sequence: {0}`,
      [5 /* UNBALANCED_CLOSING_BRACE */]: `Unbalanced closing brace`,
      [6 /* UNTERMINATED_CLOSING_BRACE */]: `Unterminated closing brace`,
      [7 /* EMPTY_PLACEHOLDER */]: `Empty placeholder`,
      [8 /* NOT_ALLOW_NEST_PLACEHOLDER */]: `Not allowed nest placeholder`,
      [9 /* INVALID_LINKED_FORMAT */]: `Invalid linked format`,
      // parser error messages
      [10 /* MUST_HAVE_MESSAGES_IN_PLURAL */]: `Plural must have messages`
  };
  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
  const RE_ARGS = /\{([0-9]+)\}/g;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
  function format(message, ...args) {
      return message.replace(RE_ARGS, (match, ...replaceArgs) => {
          const [index] = replaceArgs;
          return args[index] || '';
      });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
  function createCompileError(code, loc, optinos = {}) {
      const { domain, messages, args } = optinos;
      const msg =  format((messages || errorMessages)[code] || '', ...(args || []))
          ;
      const error = new SyntaxError(String(msg));
      error.code = code;
      error.location = loc;
      error.domain = domain;
      return error;
  }
  function defaultOnError(error) {
      throw error;
  }

  const CHAR_SP = ' ';
  const CHAR_CR = '\r';
  const CHAR_LF = '\n';
  const CHAR_LS = String.fromCharCode(0x2028);
  const CHAR_PS = String.fromCharCode(0x2029);
  function createScanner(str) {
      const _buf = str;
      let _index = 0;
      let _line = 1;
      let _column = 1;
      let _peekOffset = 0;
      const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
      const isLF = (index) => _buf[index] === CHAR_LF;
      const isPS = (index) => _buf[index] === CHAR_PS;
      const isLS = (index) => _buf[index] === CHAR_LS;
      const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
      const index = () => _index;
      const line = () => _line;
      const column = () => _column;
      const peekOffset = () => _peekOffset;
      function charAt(offset) {
          if (isCRLF(offset) || isPS(offset) || isLS(offset)) {
              return CHAR_LF;
          }
          return _buf[offset];
      }
      const currentChar = () => charAt(_index);
      const currentPeek = () => charAt(_index + _peekOffset);
      function next() {
          _peekOffset = 0;
          if (isLineEnd(_index)) {
              _line++;
              _column = 0;
          }
          if (isCRLF(_index)) {
              _index++;
          }
          _index++;
          _column++;
          return _buf[_index];
      }
      function peek() {
          if (isCRLF(_index + _peekOffset)) {
              _peekOffset++;
          }
          _peekOffset++;
          return _buf[_index + _peekOffset];
      }
      function reset() {
          _index = 0;
          _line = 1;
          _column = 1;
          _peekOffset = 0;
      }
      function resetPeek(offset = 0) {
          _peekOffset = offset;
      }
      function skipToPeek() {
          const target = _index + _peekOffset;
          while (target !== _index) {
              next();
          }
          _peekOffset = 0;
      }
      return {
          index,
          line,
          column,
          peekOffset,
          charAt,
          currentChar,
          currentPeek,
          next,
          peek,
          reset,
          resetPeek,
          skipToPeek
      };
  }

  const EOF = undefined;
  const LITERAL_DELIMITER = "'";
  const ERROR_DOMAIN = 'tokenizer';
  function createTokenizer(source, options = {}) {
      const location = !options.location;
      const _scnr = createScanner(source);
      const currentOffset = () => _scnr.index();
      const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
      const _initLoc = currentPosition();
      const _initOffset = currentOffset();
      const _context = {
          currentType: 14 /* EOF */,
          currentValue: null,
          currentToken: null,
          offset: _initOffset,
          startLoc: _initLoc,
          endLoc: _initLoc,
          lastType: 14 /* EOF */,
          lastToken: null,
          lastOffset: _initOffset,
          lastStartLoc: _initLoc,
          lastEndLoc: _initLoc,
          braceNest: 0,
          inLinked: false
      };
      const context = () => _context;
      const { onError } = options;
      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
      const emitError = (code, pos, offset, ...args) => {
          const ctx = context();
          pos.column += offset;
          pos.offset += offset;
          if (onError) {
              const loc = createLocation(ctx.startLoc, pos);
              const err = createCompileError(code, loc, {
                  domain: ERROR_DOMAIN,
                  args
              });
              onError(err);
          }
      };
      const getToken = (context, type, value) => {
          context.endLoc = currentPosition();
          context.currentType = type;
          context.currentValue = value;
          const token = { type };
          if (location) {
              token.loc = createLocation(context.startLoc, context.endLoc);
          }
          if (value != null) {
              token.value = value;
          }
          return token;
      };
      const getEndToken = (context) => getToken(context, 14 /* EOF */);
      const eat = (scnr, ch) => {
          if (scnr.currentChar() === ch) {
              scnr.next();
              return ch;
          }
          else {
              // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
              emitError(0 /* EXPECTED_TOKEN */, currentPosition(), 0, ch);
              return '';
          }
      };
      const peekSpaces = (scnr) => {
          let buf = '';
          while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
              buf += scnr.currentPeek();
              scnr.peek();
          }
          return buf;
      };
      const skipSpaces = (scnr) => {
          const buf = peekSpaces(scnr);
          scnr.skipToPeek();
          return buf;
      };
      const isIdentifierStart = (ch) => {
          if (ch === EOF) {
              return false;
          }
          const cc = ch.charCodeAt(0);
          return ((cc >= 97 && cc <= 122) || // a-z
              (cc >= 65 && cc <= 90)); // A-Z
      };
      const isNumberStart = (ch) => {
          if (ch === EOF) {
              return false;
          }
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57; // 0-9
      };
      const isNamedIdentifierStart = (scnr, context) => {
          const { currentType } = context;
          if (currentType !== 2 /* BraceLeft */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
      };
      const isListIdentifierStart = (scnr, context) => {
          const { currentType } = context;
          if (currentType !== 2 /* BraceLeft */) {
              return false;
          }
          peekSpaces(scnr);
          const ch = scnr.currentPeek() === '-' ? scnr.peek() : scnr.currentPeek();
          const ret = isNumberStart(ch);
          scnr.resetPeek();
          return ret;
      };
      const isLiteralStart = (scnr, context) => {
          const { currentType } = context;
          if (currentType !== 2 /* BraceLeft */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === LITERAL_DELIMITER;
          scnr.resetPeek();
          return ret;
      };
      const isLinkedDotStart = (scnr, context) => {
          const { currentType } = context;
          if (currentType !== 8 /* LinkedAlias */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "." /* LinkedDot */;
          scnr.resetPeek();
          return ret;
      };
      const isLinkedModifierStart = (scnr, context) => {
          const { currentType } = context;
          if (currentType !== 9 /* LinkedDot */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
      };
      const isLinkedDelimiterStart = (scnr, context) => {
          const { currentType } = context;
          if (!(currentType === 8 /* LinkedAlias */ ||
              currentType === 12 /* LinkedModifier */)) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ":" /* LinkedDelimiter */;
          scnr.resetPeek();
          return ret;
      };
      const isLinkedReferStart = (scnr, context) => {
          const { currentType } = context;
          if (currentType !== 10 /* LinkedDelimiter */) {
              return false;
          }
          const fn = () => {
              const ch = scnr.currentPeek();
              if (ch === "{" /* BraceLeft */) {
                  return isIdentifierStart(scnr.peek());
              }
              else if (ch === "@" /* LinkedAlias */ ||
                  ch === "%" /* Modulo */ ||
                  ch === "|" /* Pipe */ ||
                  ch === ":" /* LinkedDelimiter */ ||
                  ch === "." /* LinkedDot */ ||
                  ch === CHAR_SP ||
                  !ch) {
                  return false;
              }
              else if (ch === CHAR_LF) {
                  scnr.peek();
                  return fn();
              }
              else {
                  // other charactors
                  return isIdentifierStart(ch);
              }
          };
          const ret = fn();
          scnr.resetPeek();
          return ret;
      };
      const isPluralStart = (scnr) => {
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "|" /* Pipe */;
          scnr.resetPeek();
          return ret;
      };
      const isTextStart = (scnr) => {
          const fn = (hasSpace = false) => {
              const ch = scnr.currentPeek();
              if (ch === "{" /* BraceLeft */ ||
                  ch === "}" /* BraceRight */ ||
                  ch === "%" /* Modulo */ ||
                  ch === "@" /* LinkedAlias */ ||
                  !ch) {
                  return hasSpace;
              }
              else if (ch === "|" /* Pipe */) {
                  return false;
              }
              else if (ch === CHAR_SP) {
                  scnr.peek();
                  return fn(true);
              }
              else if (ch === CHAR_LF) {
                  scnr.peek();
                  return fn(true);
              }
              else {
                  return true;
              }
          };
          const ret = fn();
          scnr.resetPeek();
          return ret;
      };
      const takeChar = (scnr, fn) => {
          const ch = scnr.currentChar();
          if (ch === EOF) {
              return EOF;
          }
          if (fn(ch)) {
              scnr.next();
              return ch;
          }
          return null;
      };
      const takeIdentifierChar = (scnr) => {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return ((cc >= 97 && cc <= 122) || // a-z
                  (cc >= 65 && cc <= 90) || // A-Z
                  (cc >= 48 && cc <= 57) || // 0-9
                  cc === 95 ||
                  cc === 36); // _ $
          };
          return takeChar(scnr, closure);
      };
      const takeDigit = (scnr) => {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return cc >= 48 && cc <= 57; // 0-9
          };
          return takeChar(scnr, closure);
      };
      const takeHexDigit = (scnr) => {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return ((cc >= 48 && cc <= 57) || // 0-9
                  (cc >= 65 && cc <= 70) || // A-F
                  (cc >= 97 && cc <= 102)); // a-f
          };
          return takeChar(scnr, closure);
      };
      const getDigits = (scnr) => {
          let ch = '';
          let num = '';
          while ((ch = takeDigit(scnr))) {
              num += ch;
          }
          if (num.length === 0) ;
          return num;
      };
      const readText = (scnr) => {
          const fn = (buf) => {
              const ch = scnr.currentChar();
              if (ch === "{" /* BraceLeft */ ||
                  ch === "}" /* BraceRight */ ||
                  ch === "%" /* Modulo */ ||
                  ch === "@" /* LinkedAlias */ ||
                  ch === EOF) {
                  return buf;
              }
              else if (ch === CHAR_SP || ch === CHAR_LF) {
                  if (isPluralStart(scnr)) {
                      return buf;
                  }
                  else {
                      buf += ch;
                      scnr.next();
                      return fn(buf);
                  }
              }
              else {
                  buf += ch;
                  scnr.next();
                  return fn(buf);
              }
          };
          return fn('');
      };
      const readNamedIdentifier = (scnr) => {
          skipSpaces(scnr);
          let ch = '';
          let name = '';
          while ((ch = takeIdentifierChar(scnr))) {
              name += ch;
          }
          if (scnr.currentChar() === EOF) {
              // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
              emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
          }
          return name;
      };
      const readListIdentifier = (scnr) => {
          skipSpaces(scnr);
          let value = '';
          if (scnr.currentChar() === '-') {
              scnr.next();
              value += `-${getDigits(scnr)}`;
          }
          else {
              value += getDigits(scnr);
          }
          if (scnr.currentChar() === EOF) {
              // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
              emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
          }
          return value;
      };
      const readLiteral = (scnr) => {
          skipSpaces(scnr);
          eat(scnr, `\'`);
          let ch = '';
          let literal = '';
          const fn = (x) => x !== LITERAL_DELIMITER && x !== CHAR_LF;
          while ((ch = takeChar(scnr, fn))) {
              if (ch === '\\') {
                  literal += readEscapeSequence(scnr);
              }
              else {
                  literal += ch;
              }
          }
          const current = scnr.currentChar();
          if (current === CHAR_LF || current === EOF) {
              // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
              emitError(2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */, currentPosition(), 0);
              // TODO: Is it correct really?
              if (current === CHAR_LF) {
                  scnr.next();
                  eat(scnr, `\'`);
              }
              return literal;
          }
          eat(scnr, `\'`);
          return literal;
      };
      const readEscapeSequence = (scnr) => {
          const ch = scnr.currentChar();
          switch (ch) {
              case '\\':
              case `\'`:
                  scnr.next();
                  return `\\${ch}`;
              case 'u':
                  return readUnicodeEscapeSequence(scnr, ch, 4);
              case 'U':
                  return readUnicodeEscapeSequence(scnr, ch, 6);
              default:
                  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                  emitError(3 /* UNKNOWN_ESCAPE_SEQUENCE */, currentPosition(), 0, ch);
                  return '';
          }
      };
      const readUnicodeEscapeSequence = (scnr, unicode, digits) => {
          eat(scnr, unicode);
          let sequence = '';
          for (let i = 0; i < digits; i++) {
              const ch = takeHexDigit(scnr);
              if (!ch) {
                  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                  emitError(4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
                  break;
              }
              sequence += ch;
          }
          return `\\${unicode}${sequence}`;
      };
      const readInvalidIdentifier = (scnr) => {
          skipSpaces(scnr);
          let ch = '';
          let identifiers = '';
          const closure = (ch) => ch !== "{" /* BraceLeft */ &&
              ch !== "}" /* BraceRight */ &&
              ch !== CHAR_SP &&
              ch !== CHAR_LF;
          while ((ch = takeChar(scnr, closure))) {
              identifiers += ch;
          }
          return identifiers;
      };
      const readLinkedModifier = (scnr) => {
          let ch = '';
          let name = '';
          while ((ch = takeIdentifierChar(scnr))) {
              name += ch;
          }
          return name;
      };
      const readLinkedRefer = (scnr) => {
          const fn = (detect = false, buf) => {
              const ch = scnr.currentChar();
              if (ch === "{" /* BraceLeft */ ||
                  ch === "%" /* Modulo */ ||
                  ch === "@" /* LinkedAlias */ ||
                  ch === "|" /* Pipe */ ||
                  !ch) {
                  return buf;
              }
              else if (ch === CHAR_SP) {
                  return buf;
              }
              else if (ch === CHAR_LF) {
                  buf += ch;
                  scnr.next();
                  return fn(detect, buf);
              }
              else {
                  buf += ch;
                  scnr.next();
                  return fn(true, buf);
              }
          };
          return fn(false, '');
      };
      const readPlural = (scnr) => {
          skipSpaces(scnr);
          const plural = eat(scnr, "|" /* Pipe */);
          skipSpaces(scnr);
          return plural;
      };
      // TODO: We need refactoring of token parsing ...
      const readTokenInPlaceholder = (scnr, context) => {
          let token = null;
          const ch = scnr.currentChar();
          switch (ch) {
              case "{" /* BraceLeft */:
                  if (context.braceNest >= 1) {
                      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                      emitError(8 /* NOT_ALLOW_NEST_PLACEHOLDER */, currentPosition(), 0);
                  }
                  scnr.next();
                  token = getToken(context, 2 /* BraceLeft */, "{" /* BraceLeft */);
                  skipSpaces(scnr);
                  context.braceNest++;
                  return token;
              case "}" /* BraceRight */:
                  if (context.braceNest > 0 &&
                      context.currentType === 2 /* BraceLeft */) {
                      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                      emitError(7 /* EMPTY_PLACEHOLDER */, currentPosition(), 0);
                  }
                  scnr.next();
                  token = getToken(context, 3 /* BraceRight */, "}" /* BraceRight */);
                  context.braceNest--;
                  context.braceNest > 0 && skipSpaces(scnr);
                  if (context.inLinked && context.braceNest === 0) {
                      context.inLinked = false;
                  }
                  return token;
              case "@" /* LinkedAlias */:
                  if (context.braceNest > 0) {
                      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                      emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                  }
                  token = readTokenInLinked(scnr, context) || getEndToken(context);
                  context.braceNest = 0;
                  return token;
              default:
                  let validNamedIdentifier = true;
                  let validListIdentifier = true;
                  let validLeteral = true;
                  if (isPluralStart(scnr)) {
                      if (context.braceNest > 0) {
                          // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                          emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                      }
                      token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                      // reset
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (context.braceNest > 0 &&
                      (context.currentType === 5 /* Named */ ||
                          context.currentType === 6 /* List */ ||
                          context.currentType === 7 /* Literal */)) {
                      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                      emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                      context.braceNest = 0;
                      return readToken(scnr, context);
                  }
                  if ((validNamedIdentifier = isNamedIdentifierStart(scnr, context))) {
                      token = getToken(context, 5 /* Named */, readNamedIdentifier(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if ((validListIdentifier = isListIdentifierStart(scnr, context))) {
                      token = getToken(context, 6 /* List */, readListIdentifier(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if ((validLeteral = isLiteralStart(scnr, context))) {
                      token = getToken(context, 7 /* Literal */, readLiteral(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if (!validNamedIdentifier && !validListIdentifier && !validLeteral) {
                      // TODO: we should be re-designed invalid cases, when we will extend message syntax near the future ...
                      token = getToken(context, 13 /* InvalidPlace */, readInvalidIdentifier(scnr));
                      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                      emitError(1 /* INVALID_TOKEN_IN_PLACEHOLDER */, currentPosition(), 0, token.value);
                      skipSpaces(scnr);
                      return token;
                  }
                  break;
          }
          return token;
      };
      // TODO: We need refactoring of token parsing ...
      const readTokenInLinked = (scnr, context) => {
          const { currentType } = context;
          let token = null;
          const ch = scnr.currentChar();
          if ((currentType === 8 /* LinkedAlias */ ||
              currentType === 9 /* LinkedDot */ ||
              currentType === 12 /* LinkedModifier */ ||
              currentType === 10 /* LinkedDelimiter */) &&
              (ch === CHAR_LF || ch === CHAR_SP)) {
              // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
              emitError(9 /* INVALID_LINKED_FORMAT */, currentPosition(), 0);
          }
          switch (ch) {
              case "@" /* LinkedAlias */:
                  scnr.next();
                  token = getToken(context, 8 /* LinkedAlias */, "@" /* LinkedAlias */);
                  context.inLinked = true;
                  return token;
              case "." /* LinkedDot */:
                  skipSpaces(scnr);
                  scnr.next();
                  return getToken(context, 9 /* LinkedDot */, "." /* LinkedDot */);
              case ":" /* LinkedDelimiter */:
                  skipSpaces(scnr);
                  scnr.next();
                  return getToken(context, 10 /* LinkedDelimiter */, ":" /* LinkedDelimiter */);
              default:
                  if (isPluralStart(scnr)) {
                      token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                      // reset
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (isLinkedDotStart(scnr, context) ||
                      isLinkedDelimiterStart(scnr, context)) {
                      skipSpaces(scnr);
                      return readTokenInLinked(scnr, context);
                  }
                  if (isLinkedModifierStart(scnr, context)) {
                      skipSpaces(scnr);
                      return getToken(context, 12 /* LinkedModifier */, readLinkedModifier(scnr));
                  }
                  if (isLinkedReferStart(scnr, context)) {
                      skipSpaces(scnr);
                      if (ch === "{" /* BraceLeft */) {
                          // scan the placeholder
                          return readTokenInPlaceholder(scnr, context) || token;
                      }
                      else {
                          return getToken(context, 11 /* LinkedKey */, readLinkedRefer(scnr));
                      }
                  }
                  if (currentType === 8 /* LinkedAlias */) {
                      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                      emitError(9 /* INVALID_LINKED_FORMAT */, currentPosition(), 0);
                  }
                  context.braceNest = 0;
                  context.inLinked = false;
                  return readToken(scnr, context);
          }
      };
      // TODO: We need refactoring of token parsing ...
      const readToken = (scnr, context) => {
          let token = { type: 14 /* EOF */ };
          if (context.braceNest > 0) {
              return readTokenInPlaceholder(scnr, context) || getEndToken(context);
          }
          if (context.inLinked) {
              return readTokenInLinked(scnr, context) || getEndToken(context);
          }
          const ch = scnr.currentChar();
          switch (ch) {
              case "{" /* BraceLeft */:
                  return readTokenInPlaceholder(scnr, context) || getEndToken(context);
              case "}" /* BraceRight */:
                  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
                  emitError(5 /* UNBALANCED_CLOSING_BRACE */, currentPosition(), 0);
                  scnr.next();
                  return getToken(context, 3 /* BraceRight */, "}" /* BraceRight */);
              case "@" /* LinkedAlias */:
                  return readTokenInLinked(scnr, context) || getEndToken(context);
              case "%" /* Modulo */:
                  scnr.next();
                  return getToken(context, 4 /* Modulo */, "%" /* Modulo */);
              default:
                  if (isPluralStart(scnr)) {
                      token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                      // reset
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (isTextStart(scnr)) {
                      return getToken(context, 0 /* Text */, readText(scnr));
                  }
                  break;
          }
          return token;
      };
      const nextToken = () => {
          const { currentType, currentToken, offset, startLoc, endLoc } = _context;
          _context.lastType = currentType;
          _context.lastToken = currentToken;
          _context.lastOffset = offset;
          _context.lastStartLoc = startLoc;
          _context.lastEndLoc = endLoc;
          _context.offset = currentOffset();
          _context.startLoc = currentPosition();
          if (_scnr.currentChar() === EOF) {
              return (_context.currentToken = getToken(_context, 14 /* EOF */));
          }
          return (_context.currentToken = readToken(_scnr, _context));
      };
      return {
          nextToken,
          currentOffset,
          currentPosition,
          context
      };
  }

  const ERROR_DOMAIN$1 = 'parser';
  // Backslash backslash, backslash quote, uHHHH, UHHHHHH.
  const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
  function fromEscapeSequence(match, codePoint4, codePoint6) {
      switch (match) {
          case `\\\\`:
              return `\\`;
          case `\\\'`:
              return `\'`;
          default: {
              const codePoint = parseInt(codePoint4 || codePoint6, 16);
              if (codePoint <= 0xd7ff || codePoint >= 0xe000) {
                  return String.fromCodePoint(codePoint);
              }
              // invalid ...
              // Replace them with U+FFFD REPLACEMENT CHARACTER.
              return '�';
          }
      }
  }
  function createParser(options = {}) {
      const location = !options.location;
      const { onError } = options;
      // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
      const emitError = (tokenzer, code, start, offset, ...args) => {
          const end = tokenzer.currentPosition();
          end.offset += offset;
          end.column += offset;
          if (onError) {
              const loc = createLocation(start, end);
              const err = createCompileError(code, loc, {
                  domain: ERROR_DOMAIN$1,
                  args
              });
              onError(err);
          }
      };
      const startNode = (type, offset, loc) => {
          const node = {
              type,
              start: offset,
              end: offset
          };
          if (location) {
              node.loc = { start: loc, end: loc };
          }
          return node;
      };
      const endNode = (node, offset, pos, type) => {
          node.end = offset;
          if (type) {
              node.type = type;
          }
          if (location && node.loc) {
              node.loc.end = pos;
          }
      };
      const parseText = (tokenizer, value) => {
          const context = tokenizer.context();
          const node = startNode(3 /* Text */, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      };
      const parseList = (tokenizer, index) => {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
          const node = startNode(5 /* List */, offset, loc);
          node.index = parseInt(index, 10);
          tokenizer.nextToken(); // skip brach right
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      };
      const parseNamed = (tokenizer, key) => {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
          const node = startNode(4 /* Named */, offset, loc);
          node.key = key;
          tokenizer.nextToken(); // skip brach right
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      };
      const parseLiteral = (tokenizer, value) => {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
          const node = startNode(9 /* Literal */, offset, loc);
          node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
          tokenizer.nextToken(); // skip brach right
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      };
      const parseLinkedModifier = (tokenizer) => {
          const token = tokenizer.nextToken();
          // check token
          if (!token.value || typeof token.value === 'number') {
              // TODO: should be thrown syntax error
              throw new Error();
          }
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get linked dot loc
          const node = startNode(8 /* LinkedModifier */, offset, loc);
          node.value = token.value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      };
      const parseLinkedKey = (tokenizer, value) => {
          const context = tokenizer.context();
          const node = startNode(7 /* LinkedKey */, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      };
      const parseLinked = (tokenizer) => {
          const context = tokenizer.context();
          const linkedNode = startNode(6 /* Linked */, context.offset, context.startLoc);
          let token = tokenizer.nextToken();
          if (token.type === 9 /* LinkedDot */) {
              linkedNode.modifier = parseLinkedModifier(tokenizer);
              token = tokenizer.nextToken();
          }
          // asset check token
          if (token.type !== 10 /* LinkedDelimiter */) {
              // TODO: should be thrown syntax error
              throw new Error();
          }
          token = tokenizer.nextToken();
          // skip brace left
          if (token.type === 2 /* BraceLeft */) {
              token = tokenizer.nextToken();
          }
          switch (token.type) {
              case 11 /* LinkedKey */:
                  if (token.value == null) {
                      // TODO: should be thrown syntax error
                      throw new Error();
                  }
                  linkedNode.key = parseLinkedKey(tokenizer, token.value);
                  break;
              case 5 /* Named */:
                  if (token.value == null) {
                      // TODO: should be thrown syntax error
                      throw new Error();
                  }
                  linkedNode.key = parseNamed(tokenizer, token.value);
                  break;
              case 6 /* List */:
                  if (token.value == null) {
                      // TODO: should be thrown syntax error
                      throw new Error();
                  }
                  linkedNode.key = parseList(tokenizer, token.value);
                  break;
              case 7 /* Literal */:
                  if (token.value == null) {
                      // TODO: should be thrown syntax error
                      throw new Error();
                  }
                  linkedNode.key = parseLiteral(tokenizer, token.value);
                  break;
              default:
                  // TODO: should be thrown syntax error
                  throw new Error();
          }
          endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
          return linkedNode;
      };
      const parseMessage = (tokenizer) => {
          const context = tokenizer.context();
          const startOffset = context.currentType === 1 /* Pipe */
              ? tokenizer.currentOffset()
              : context.offset;
          const startLoc = context.currentType === 1 /* Pipe */
              ? context.endLoc
              : context.startLoc;
          const node = startNode(2 /* Message */, startOffset, startLoc);
          node.items = [];
          do {
              const token = tokenizer.nextToken();
              switch (token.type) {
                  case 0 /* Text */:
                      if (token.value == null) {
                          // TODO: should be thrown syntax error
                          throw new Error();
                      }
                      node.items.push(parseText(tokenizer, token.value));
                      break;
                  case 6 /* List */:
                      if (token.value == null) {
                          // TODO: should be thrown syntax error
                          throw new Error();
                      }
                      node.items.push(parseList(tokenizer, token.value));
                      break;
                  case 5 /* Named */:
                      if (token.value == null) {
                          // TODO: should be thrown syntax error
                          throw new Error();
                      }
                      node.items.push(parseNamed(tokenizer, token.value));
                      break;
                  case 7 /* Literal */:
                      if (token.value == null) {
                          // TODO: should be thrown syntax error
                          throw new Error();
                      }
                      node.items.push(parseLiteral(tokenizer, token.value));
                      break;
                  case 8 /* LinkedAlias */:
                      node.items.push(parseLinked(tokenizer));
                      break;
              }
          } while (context.currentType !== 14 /* EOF */ &&
              context.currentType !== 1 /* Pipe */);
          // adjust message node loc
          const endOffset = context.currentType === 1 /* Pipe */
              ? context.lastOffset
              : tokenizer.currentOffset();
          const endLoc = context.currentType === 1 /* Pipe */
              ? context.lastEndLoc
              : tokenizer.currentPosition();
          endNode(node, endOffset, endLoc);
          return node;
      };
      const parsePlural = (tokenizer, offset, loc, msgNode) => {
          const context = tokenizer.context();
          let hasEmptyMessage = msgNode.items.length === 0;
          const node = startNode(1 /* Plural */, offset, loc);
          node.cases = [];
          node.cases.push(msgNode);
          do {
              const msg = parseMessage(tokenizer);
              if (!hasEmptyMessage) {
                  hasEmptyMessage = msg.items.length === 0;
              }
              node.cases.push(msg);
          } while (context.currentType !== 14 /* EOF */);
          if (hasEmptyMessage) {
              emitError(tokenizer, 10 /* MUST_HAVE_MESSAGES_IN_PLURAL */, loc, 0);
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      };
      const parseResource = (tokenizer) => {
          const context = tokenizer.context();
          const { offset, startLoc } = context;
          const msgNode = parseMessage(tokenizer);
          if (context.currentType === 14 /* EOF */) {
              return msgNode;
          }
          else {
              return parsePlural(tokenizer, offset, startLoc, msgNode);
          }
      };
      function parse(source) {
          const tokenizer = createTokenizer(source, { ...options });
          const context = tokenizer.context();
          const node = startNode(0 /* Resource */, context.offset, context.startLoc);
          node.body = parseResource(tokenizer);
          // assert wheather achieved to EOF
          if (context.currentType !== 14 /* EOF */) {
              // TODO: should be thrown syntax error
              throw new Error();
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      return { parse };
  }

  function createTransformer(ast /*, options: TransformOptions */) {
      const _context = {
          ast,
          helpers: new Set()
      };
      const context = () => _context;
      const helper = (name) => {
          _context.helpers.add(name);
          return name;
      };
      return { context, helper };
  }
  function traverseNodes(nodes, transformer) {
      for (let i = 0; i < nodes.length; i++) {
          traverseNode(nodes[i], transformer);
      }
  }
  function traverseNode(node, transformer) {
      // TODO: if we need pre-hook of transform, should be implemeted to here
      switch (node.type) {
          case 1 /* Plural */:
              traverseNodes(node.cases, transformer);
              transformer.helper("pluralIndex" /* PLURAL_INDEX */);
              transformer.helper("pluralRule" /* PLURAL_RULE */);
              transformer.helper("orgPluralRule" /* ORG_PLURAL_RULE */);
              break;
          case 2 /* Message */:
              traverseNodes(node.items, transformer);
              break;
          case 6 /* Linked */:
              const linked = node;
              if (linked.modifier) {
                  traverseNode(linked.modifier, transformer);
                  transformer.helper("modifier" /* MODIFIER */);
                  transformer.helper("type" /* TYPE */);
              }
              traverseNode(linked.key, transformer);
              transformer.helper("message" /* MESSAGE */);
              break;
          case 5 /* List */:
              transformer.helper("interpolate" /* INTERPOLATE */);
              transformer.helper("list" /* LIST */);
              break;
          case 4 /* Named */:
              transformer.helper("interpolate" /* INTERPOLATE */);
              transformer.helper("named" /* NAMED */);
              break;
      }
      // TODO: if we need post-hook of transform, should be implemeted to here
  }
  // transform AST
  function transform(ast, options = {} // eslint-disable-line
  ) {
      const transformer = createTransformer(ast);
      transformer.helper("normalize" /* NORMALIZE */);
      // traverse
      ast.body && traverseNode(ast.body, transformer);
      // set meta information
      const context = transformer.context();
      ast.helpers = [...context.helpers];
  }

  function createCodeGenerator(source) {
      const _context = {
          source,
          code: '',
          indentLevel: 0
      };
      const context = () => _context;
      const push = (code) => {
          _context.code += code;
      };
      const _newline = (n) => {
          push('\n' + `  `.repeat(n));
      };
      const indent = () => {
          _newline(++_context.indentLevel);
      };
      const deindent = (withoutNewLine) => {
          if (withoutNewLine) {
              --_context.indentLevel;
          }
          else {
              _newline(--_context.indentLevel);
          }
      };
      const newline = () => {
          _newline(_context.indentLevel);
      };
      const helper = (key) => `_${key}`;
      return {
          context,
          push,
          indent,
          deindent,
          newline,
          helper
      };
  }
  function generateLinkedNode(generator, node) {
      const { helper } = generator;
      if (node.modifier) {
          generator.push(`${helper("modifier" /* MODIFIER */)}(`);
          generateNode(generator, node.modifier);
          generator.push(')(');
      }
      generator.push(`${helper("message" /* MESSAGE */)}(`);
      generateNode(generator, node.key);
      generator.push(')(ctx)');
      if (node.modifier) {
          generator.push(`, ${helper("type" /* TYPE */)})`);
      }
  }
  function generateMessageNode(generator, node) {
      const { helper } = generator;
      generator.push(`${helper("normalize" /* NORMALIZE */)}([`);
      generator.indent();
      const length = node.items.length;
      for (let i = 0; i < length; i++) {
          generateNode(generator, node.items[i]);
          if (i === length - 1) {
              break;
          }
          generator.push(', ');
      }
      generator.deindent();
      generator.push('])');
  }
  function generatePluralNode(generator, node) {
      const { helper } = generator;
      if (node.cases.length > 1) {
          generator.push('[');
          generator.indent();
          const length = node.cases.length;
          for (let i = 0; i < length; i++) {
              generateNode(generator, node.cases[i]);
              if (i === length - 1) {
                  break;
              }
              generator.push(', ');
          }
          generator.deindent();
          generator.push(`][${helper("pluralRule" /* PLURAL_RULE */)}(${helper("pluralIndex" /* PLURAL_INDEX */)}, ${length}, ${helper("orgPluralRule" /* ORG_PLURAL_RULE */)})]`);
      }
  }
  function generateResource(generator, node) {
      if (node.body) {
          generateNode(generator, node.body);
      }
      else {
          generator.push('null');
      }
  }
  function generateNode(generator, node) {
      const { helper } = generator;
      switch (node.type) {
          case 0 /* Resource */:
              generateResource(generator, node);
              break;
          case 1 /* Plural */:
              generatePluralNode(generator, node);
              break;
          case 2 /* Message */:
              generateMessageNode(generator, node);
              break;
          case 6 /* Linked */:
              generateLinkedNode(generator, node);
              break;
          case 8 /* LinkedModifier */:
              generator.push(JSON.stringify(node.value));
              break;
          case 7 /* LinkedKey */:
              generator.push(JSON.stringify(node.value));
              break;
          case 5 /* List */:
              generator.push(`${helper("interpolate" /* INTERPOLATE */)}(${helper("list" /* LIST */)}(${node.index}))`);
              break;
          case 4 /* Named */:
              generator.push(`${helper("interpolate" /* INTERPOLATE */)}(${helper("named" /* NAMED */)}(${JSON.stringify(node.key)}))`);
              break;
          case 9 /* Literal */:
              // TODO: more improvement for escape sequence ...
              generator.push(JSON.stringify(node.value));
              break;
          case 3 /* Text */:
              generator.push(JSON.stringify(node.value));
              break;
          default:
              // TODO: should be handled with error
              throw new Error(`unhandled codegen node type: ${node.type}`);
      }
  }
  // generate code from AST
  const generate = (ast, options = {} // eslint-disable-line
  ) => {
      const mode = isString(options.mode) ? options.mode : 'normal';
      const helpers = ast.helpers || [];
      const generator = createCodeGenerator(ast.loc && ast.loc.source);
      generator.push(mode === 'normal' ? `function __msg__ (ctx) {` : `(ctx) => {`);
      generator.indent();
      if (helpers.length > 0) {
          generator.push(`const { ${helpers.map(s => `${s}: _${s}`).join(', ')} } = ctx`);
          generator.newline();
      }
      generator.push(`return `);
      generateNode(generator, ast);
      generator.deindent();
      generator.push(`}`);
      return generator.context().code;
  };

  // TODO: This code should be removed with using rollup (`/*#__PURE__*/`)
  const RE_HTML_TAG = /<\/?[\w\s="/.':;#-\/]+>/;
  function checkHtmlMessage(source, options) {
      const warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      if (warnHtmlMessage && RE_HTML_TAG.test(source)) {
          warn(`Detected HTML in '${source}' message. Recommend not using HTML messages to avoid XSS.`);
      }
  }
  const defaultOnCacheKey = (source) => source;
  const compileCache = Object.create(null);
  function baseCompile(source, options = {}) {
      // parse source codes
      const parser = createParser({ ...options });
      const ast = parser.parse(source);
      // transform ASTs
      transform(ast, { ...options });
      // generate javascript codes
      const code = generate(ast, { ...options });
      return { ast, code };
  }
  function compile(source, options = {}) {
      // check HTML message
       checkHtmlMessage(source, options);
      // check caches
      const onCacheKey = options.onCacheKey || defaultOnCacheKey;
      const key = onCacheKey(source);
      const cached = compileCache[key];
      if (cached) {
          return cached;
      }
      // compile error detecting
      let occured = false;
      const onError = options.onError || defaultOnError;
      options.onError = (err) => {
          occured = true;
          onError(err);
      };
      // compile
      const { code } = baseCompile(source, options);
      // evaluate function
      const msg = new Function(`return ${code}`)();
      // if occured compile error, don't cache
      return !occured ? (compileCache[key] = msg) : msg;
  }

  /**
   *  datetime
   */
  const intlDefined = typeof Intl !== 'undefined';
  const Availabilities = {
      dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
      numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
  };

  const pathStateMachine = [];
  pathStateMachine[0 /* BEFORE_PATH */] = {
      ["w" /* WORKSPACE */]: [0 /* BEFORE_PATH */],
      ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
      ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
  };
  pathStateMachine[1 /* IN_PATH */] = {
      ["w" /* WORKSPACE */]: [1 /* IN_PATH */],
      ["." /* DOT */]: [2 /* BEFORE_IDENT */],
      ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
      ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
  };
  pathStateMachine[2 /* BEFORE_IDENT */] = {
      ["w" /* WORKSPACE */]: [2 /* BEFORE_IDENT */],
      ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */]
  };
  pathStateMachine[3 /* IN_IDENT */] = {
      ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["w" /* WORKSPACE */]: [1 /* IN_PATH */, 1 /* PUSH */],
      ["." /* DOT */]: [2 /* BEFORE_IDENT */, 1 /* PUSH */],
      ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */, 1 /* PUSH */],
      ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */, 1 /* PUSH */]
  };
  pathStateMachine[4 /* IN_SUB_PATH */] = {
      ["'" /* SINGLE_QUOTE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */],
      ["\"" /* DOUBLE_QUOTE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */],
      ["[" /* LEFT_BRACKET */]: [
          4 /* IN_SUB_PATH */,
          2 /* INC_SUB_PATH_DEPTH */
      ],
      ["]" /* RIGHT_BRACKET */]: [1 /* IN_PATH */, 3 /* PUSH_SUB_PATH */],
      ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
      ["l" /* ELSE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */]
  };
  pathStateMachine[5 /* IN_SINGLE_QUOTE */] = {
      ["'" /* SINGLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
      ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
      ["l" /* ELSE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */]
  };
  pathStateMachine[6 /* IN_DOUBLE_QUOTE */] = {
      ["\"" /* DOUBLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
      ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
      ["l" /* ELSE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */]
  };
  /**
   * Check if an expression is a literal value.
   */
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
      return literalValueRE.test(exp);
  }
  /**
   * Strip quotes from a string
   */
  function stripQuotes(str) {
      const a = str.charCodeAt(0);
      const b = str.charCodeAt(str.length - 1);
      return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
  }
  /**
   * Determine the type of a character in a keypath.
   */
  function getPathCharType(ch) {
      if (ch === undefined || ch === null) {
          return "o" /* END_OF_FAIL */;
      }
      const code = ch.charCodeAt(0);
      switch (code) {
          case 0x5b: // [
          case 0x5d: // ]
          case 0x2e: // .
          case 0x22: // "
          case 0x27: // '
              return ch;
          case 0x5f: // _
          case 0x24: // $
          case 0x2d: // -
              return "i" /* IDENT */;
          case 0x09: // Tab (HT)
          case 0x0a: // Newline (LF)
          case 0x0d: // Return (CR)
          case 0xa0: // No-break space (NBSP)
          case 0xfeff: // Byte Order Mark (BOM)
          case 0x2028: // Line Separator (LS)
          case 0x2029: // Paragraph Separator (PS)
              return "w" /* WORKSPACE */;
      }
      return "i" /* IDENT */;
  }
  /**
   * Format a subPath, return its plain form if it is
   * a literal string or number. Otherwise prepend the
   * dynamic indicator (*).
   */
  function formatSubPath(path) {
      const trimmed = path.trim();
      // invalid leading 0
      if (path.charAt(0) === '0' && isNaN(parseInt(path))) {
          return false;
      }
      return isLiteral(trimmed)
          ? stripQuotes(trimmed)
          : "*" /* ASTARISK */ + trimmed;
  }
  /**
   * Parse a string path into an array of segments
   */
  function parse(path) {
      const keys = [];
      let index = -1;
      let mode = 0 /* BEFORE_PATH */;
      let subPathDepth = 0;
      let c;
      let key; // eslint-disable-line
      let newChar;
      let type;
      let transition;
      let action;
      let typeMap;
      const actions = [];
      actions[0 /* APPEND */] = () => {
          if (key === undefined) {
              key = newChar;
          }
          else {
              key += newChar;
          }
      };
      actions[1 /* PUSH */] = () => {
          if (key !== undefined) {
              keys.push(key);
              key = undefined;
          }
      };
      actions[2 /* INC_SUB_PATH_DEPTH */] = () => {
          actions[0 /* APPEND */]();
          subPathDepth++;
      };
      actions[3 /* PUSH_SUB_PATH */] = () => {
          if (subPathDepth > 0) {
              subPathDepth--;
              mode = 4 /* IN_SUB_PATH */;
              actions[0 /* APPEND */]();
          }
          else {
              subPathDepth = 0;
              if (key === undefined) {
                  return false;
              }
              key = formatSubPath(key);
              if (key === false) {
                  return false;
              }
              else {
                  actions[1 /* PUSH */]();
              }
          }
      };
      function maybeUnescapeQuote() {
          const nextChar = path[index + 1];
          if ((mode === 5 /* IN_SINGLE_QUOTE */ &&
              nextChar === "'" /* SINGLE_QUOTE */) ||
              (mode === 6 /* IN_DOUBLE_QUOTE */ &&
                  nextChar === "\"" /* DOUBLE_QUOTE */)) {
              index++;
              newChar = '\\' + nextChar;
              actions[0 /* APPEND */]();
              return true;
          }
      }
      while (mode !== null) {
          index++;
          c = path[index];
          if (c === '\\' && maybeUnescapeQuote()) {
              continue;
          }
          type = getPathCharType(c);
          typeMap = pathStateMachine[mode];
          transition = typeMap[type] || typeMap["l" /* ELSE */] || 8 /* ERROR */;
          // check parse error
          if (transition === 8 /* ERROR */) {
              return;
          }
          mode = transition[0];
          if (transition[1] !== undefined) {
              action = actions[transition[1]];
              if (action) {
                  newChar = c;
                  if (action() === false) {
                      return;
                  }
              }
          }
          // check parse finish
          if (mode === 7 /* AFTER_PATH */) {
              return keys;
          }
      }
  }
  // path token cache
  const cache = new Map();
  function resolveValue(obj, path) {
      // check object
      if (!isObject(obj)) {
          return null;
      }
      // parse path
      let hit = cache.get(path);
      if (!hit) {
          hit = parse(path);
          if (hit) {
              cache.set(path, hit);
          }
      }
      // check hit
      if (!hit) {
          return null;
      }
      // resolve path value
      const len = hit.length;
      let last = obj;
      let i = 0;
      while (i < len) {
          const val = last[hit[i]];
          if (val === undefined) {
              return null;
          }
          last = val;
          i++;
      }
      return last;
  }

  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => ''; // eslint-disable-line
  const DEFAULT_MESSAGE_DATA_TYPE = 'text';
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? '' : values.join('');
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
      choice = Math.abs(choice);
      if (choicesLength === 2) {
          // prettier-ignore
          return choice
              ? choice > 1
                  ? 1
                  : 0
              : 1;
      }
      return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
      // prettier-ignore
      const index = isNumber(options.pluralIndex)
          ? options.pluralIndex
          : -1;
      // prettier-ignore
      return options.named && (isNumber(options.named.count) || isNumber(options.named.n))
          ? isNumber(options.named.count)
              ? options.named.count
              : isNumber(options.named.n)
                  ? options.named.n
                  : index
          : index;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function normalizeNamed(pluralIndex, named) {
      if (!named.count) {
          named.count = pluralIndex;
      }
      if (!named.n) {
          named.n = pluralIndex;
      }
  }
  function createMessageContext(options = {}) {
      const locale = options.locale;
      // TODO: should be implemented warning message
      const pluralIndex = getPluralIndex(options);
      // TODO: should be implemented warning message
      const pluralRule = isObject(options.pluralRules) &&
          isString(locale) &&
          isFunction(options.pluralRules[locale])
          ? options.pluralRules[locale]
          : pluralDefault;
      const orgPluralRule = isObject(options.pluralRules) &&
          isString(locale) &&
          isFunction(options.pluralRules[locale])
          ? pluralDefault
          : undefined;
      const _list = options.list || [];
      // TODO: should be implemented warning message
      const list = (index) => _list[index];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _named = options.named || {};
      isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
      // TODO: should be implemented warning message
      const named = (key) => _named[key];
      // TODO: should be implemented warning message
      const modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
      const message = (name) => {
          // TODO: need to design resolve message function?
          // prettier-ignore
          const msg = isFunction(options.messages)
              ? options.messages(name)
              : isObject(options.messages)
                  ? options.messages[name]
                  : false;
          return !msg
              ? options.parent
                  ? options.parent.message(name) // resolve from parent messages
                  : DEFAULT_MESSAGE
              : msg;
      };
      const type = isPlainObject(options.processor) && isString(options.processor.type)
          ? options.processor.type
          : DEFAULT_MESSAGE_DATA_TYPE;
      const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize)
          ? options.processor.normalize
          : DEFAULT_NORMALIZE;
      const interpolate = isPlainObject(options.processor) &&
          isFunction(options.processor.interpolate)
          ? options.processor.interpolate
          : DEFAULT_INTERPOLATE;
      return {
          ["list" /* LIST */]: list,
          ["named" /* NAMED */]: named,
          ["pluralIndex" /* PLURAL_INDEX */]: pluralIndex,
          ["pluralRule" /* PLURAL_RULE */]: pluralRule,
          ["orgPluralRule" /* ORG_PLURAL_RULE */]: orgPluralRule,
          ["modifier" /* MODIFIER */]: modifier,
          ["message" /* MESSAGE */]: message,
          ["type" /* TYPE */]: type,
          ["interpolate" /* INTERPOLATE */]: interpolate,
          ["normalize" /* NORMALIZE */]: normalize
      };
  }

  const DEFAULT_LINKDED_MODIFIERS = {
      upper: (val, type) => type === DEFAULT_MESSAGE_DATA_TYPE ? val.toUpperCase() : val,
      lower: (val, type) => type === DEFAULT_MESSAGE_DATA_TYPE ? val.toLowerCase() : val,
      // prettier-ignore
      capitalize: (val, type) => type === DEFAULT_MESSAGE_DATA_TYPE
          ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}`
          : val
  };
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = '';
  function createRuntimeContext(options = {}) {
      const locale = isString(options.locale) ? options.locale : 'en-US';
      const fallbackLocale = isArray(options.fallbackLocale) ||
          isPlainObject(options.fallbackLocale) ||
          options.fallbackLocale === false
          ? options.fallbackLocale
          : locale;
      const messages = isPlainObject(options.messages)
          ? options.messages
          : { [locale]: {} };
      const datetimeFormats = isPlainObject(options.datetimeFormats)
          ? options.datetimeFormats
          : { [locale]: {} };
      const numberFormats = isPlainObject(options.numberFormats)
          ? options.numberFormats
          : { [locale]: {} };
      const modifiers = Object.assign({}, options.modifiers || {}, DEFAULT_LINKDED_MODIFIERS);
      const pluralRules = options.pluralRules || {};
      const missing = isFunction(options.missing) ? options.missing : null;
      const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
          ? options.missingWarn
          : true;
      const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
          ? options.fallbackWarn
          : true;
      const fallbackFormat = !!options.fallbackFormat;
      const unresolving = !!options.unresolving;
      const postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : null;
      const processor = isPlainObject(options.processor) ? options.processor : null;
      const warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      const _datetimeFormatters = isObject(options._datetimeFormatters)
          ? options._datetimeFormatters
          : new Map();
      const _numberFormatters = isObject(options._numberFormatters)
          ? options._numberFormatters
          : new Map();
      return {
          locale,
          fallbackLocale,
          messages,
          datetimeFormats,
          numberFormats,
          modifiers,
          pluralRules,
          missing,
          missingWarn,
          fallbackWarn,
          fallbackFormat,
          unresolving,
          postTranslation,
          processor,
          warnHtmlMessage,
          _datetimeFormatters,
          _numberFormatters
      };
  }
  function isTrarnslateFallbackWarn(fallback, key) {
      return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
      return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type) {
      const { missing } = context;
      if (missing !== null) {
          const ret = missing(context, locale, key, type);
          return isString(ret) ? ret : key;
      }
      else {
          if ( isTranslateMissingWarn(missingWarn, key)) {
              warn(`Not found '${key}' key in '${locale}' locale messages.`);
          }
          return key;
      }
  }
  function getLocaleChain(context, fallback, start = '') {
      if (start === '') {
          return [];
      }
      if (!context._localeChainCache) {
          context._localeChainCache = new Map();
      }
      let chain = context._localeChainCache.get(start);
      if (!chain) {
          chain = [];
          // first block defined by start
          let block = [start];
          // while any intervening block found
          while (isArray(block)) {
              block = appendBlockToChain(chain, block, fallback);
          }
          // prettier-ignore
          // last block defined by default
          const defaults = isArray(fallback)
              ? fallback
              : isPlainObject(fallback)
                  ? fallback['default']
                      ? fallback['default']
                      : null
                  : fallback;
          // convert defaults to array
          block = isString(defaults) ? [defaults] : defaults;
          if (isArray(block)) {
              appendBlockToChain(chain, block, false);
          }
          context._localeChainCache.set(start, chain);
      }
      return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
      let follow = true;
      for (let i = 0; i < block.length && isBoolean(follow); i++) {
          follow = appendLocaleToChain(chain, block[i], blocks);
      }
      return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
      let follow;
      const tokens = locale.split('-');
      do {
          const target = tokens.join('-');
          follow = appendItemToChain(chain, target, blocks);
          tokens.splice(-1, 1);
      } while (tokens.length && follow === true);
      return follow;
  }
  function appendItemToChain(chain, target, blocks) {
      let follow = false;
      if (!chain.includes(target)) {
          follow = true;
          if (target) {
              follow = target[target.length - 1] !== '!';
              const locale = target.replace(/!/g, '');
              chain.push(locale);
              if ((isArray(blocks) || isPlainObject(blocks)) &&
                  blocks[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
              ) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  follow = blocks[locale];
              }
          }
      }
      return follow;
  }
  function updateFallbackLocale(context, locale, fallback) {
      context._localeChainCache = new Map();
      getLocaleChain(context, fallback, locale);
  }

  const NOOP_MESSAGE_FUNCTION = () => '';
  const isMessageFunction = (val) => isFunction(val);
  // implementationo of `translate` function
  function translate(context, ...args) {
      const { messages, fallbackFormat, postTranslation, unresolving, fallbackLocale, warnHtmlMessage } = context;
      const [key, options] = parseTranslateArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      // prettier-ignore
      const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) // default by function option
          ? !isBoolean(options.default)
              ? options.default
              : key
          : fallbackFormat // default by `fallbackFormat` option
              ? key
              : '';
      const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      // resolve message format
      let message = {};
      let targetLocale;
      let format = null;
      for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          if (
              locale !== targetLocale &&
              isTrarnslateFallbackWarn(fallbackWarn, key)) {
              warn(`Fall back to translate '${key}' key with '${targetLocale}' locale.`);
          }
          message = messages[targetLocale] || {};
          if ((format = resolveValue(message, key)) === null) {
              // if null, resolve with object key path
              format = message[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
          }
          if (isString(format) || isFunction(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, 'translate');
      }
      let cacheBaseKey = key;
      // if you use default message, set it as message format!
      if (!(isString(format) || isMessageFunction(format))) {
          if (enableDefaultMsg) {
              format = defaultMsgOrKey;
              cacheBaseKey = format;
          }
      }
      // checking message format and target locale
      if (!(isString(format) || isMessageFunction(format)) ||
          !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      // setup compile error detecting
      let occured = false;
      const errorDetector = () => {
          occured = true;
      };
      // compile message format
      let msg;
      if (!isMessageFunction(format)) {
          msg = compile(format, getCompileOptions(targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
          msg.locale = targetLocale;
          msg.key = key;
          msg.source = format;
      }
      else {
          msg = format;
          msg.locale = msg.locale || targetLocale;
          msg.key = msg.key || key;
      }
      // if occured compile error, return the message format
      if (occured) {
          return format;
      }
      // evaluate message with context
      const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
      const msgContext = createMessageContext(ctxOptions);
      const messaged = msg(msgContext);
      // if use post translation option, procee it with handler
      return postTranslation ? postTranslation(messaged) : messaged;
  }
  function parseTranslateArgs(...args) {
      const [arg1, arg2, arg3] = args;
      const options = {};
      if (!isString(arg1)) {
          throw new Error('TODO');
      }
      const key = arg1;
      if (isNumber(arg2)) {
          options.plural = arg2;
      }
      else if (isString(arg2)) {
          options.default = arg2;
      }
      else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
          options.named = arg2;
      }
      else if (isArray(arg2)) {
          options.list = arg2;
      }
      if (isNumber(arg3)) {
          options.plural = arg3;
      }
      else if (isString(arg3)) {
          options.default = arg3;
      }
      else if (isPlainObject(arg3)) {
          Object.assign(options, arg3);
      }
      return [key, options];
  }
  function getCompileOptions(locale, key, source, warnHtmlMessage, errorDetector) {
      return {
          warnHtmlMessage,
          onError: (err) => {
              errorDetector && errorDetector(err);
              {
                  const message = `Message compilation error: ${err.message}`;
                  const codeFrame = err.location &&
                      generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
                  warn(codeFrame ? `${message}\n${codeFrame}` : message);
              }
          },
          onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
      };
  }
  function getMessageContextOptions(context, locale, message, options) {
      const { modifiers, pluralRules } = context;
      const resolveMessage = (key) => {
          const val = resolveValue(message, key);
          if (isString(val)) {
              let occured = false;
              const errorDetector = () => {
                  occured = true;
              };
              const msg = compile(val, getCompileOptions(locale, key, val, context.warnHtmlMessage, errorDetector));
              return !occured ? msg : NOOP_MESSAGE_FUNCTION;
          }
          else if (isMessageFunction(val)) {
              return val;
          }
          else {
              // TODO: should be implemented warning message
              return NOOP_MESSAGE_FUNCTION;
          }
      };
      const ctxOptions = {
          locale,
          modifiers,
          pluralRules,
          messages: resolveMessage
      };
      if (context.processor) {
          ctxOptions.processor = context.processor;
      }
      if (options.list) {
          ctxOptions.list = options.list;
      }
      if (options.named) {
          ctxOptions.named = options.named;
      }
      if (isNumber(options.plural)) {
          ctxOptions.pluralIndex = options.plural;
      }
      return ctxOptions;
  }

  // implementation of `datetime` function
  function datetime(context, ...args) {
      const { datetimeFormats, unresolving, fallbackLocale, _datetimeFormatters } = context;
      if ( !Availabilities.dateTimeFormat) {
          warn(`Cannot format a Date value due to not supported Intl.DateTimeFormat.`);
          return MISSING_RESOLVE_VALUE;
      }
      const [key, value, options, orverrides] = parseDateTimeArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const part = !!options.part;
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      if (!isString(key) || key === '') {
          return new Intl.DateTimeFormat(locale).format(value);
      }
      // resolve format
      let datetimeFormat = {};
      let targetLocale;
      let format = null;
      for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          if (
              locale !== targetLocale &&
              isTrarnslateFallbackWarn(fallbackWarn, key)) {
              warn(`Fall back to datetime format '${key}' key with '${targetLocale}' locale.`);
          }
          datetimeFormat = datetimeFormats[targetLocale] || {};
          format = datetimeFormat[key];
          if (isPlainObject(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, 'datetime');
      }
      // checking format and target locale
      if (!isPlainObject(format) || !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      let id = `${targetLocale}__${key}`;
      if (!isEmptyObject(orverrides)) {
          id = `${id}__${JSON.stringify(orverrides)}`;
      }
      let formatter = _datetimeFormatters.get(id);
      if (!formatter) {
          formatter = new Intl.DateTimeFormat(targetLocale, Object.assign({}, format, orverrides));
          _datetimeFormatters.set(id, formatter);
      }
      return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
      const [arg1, arg2, arg3, arg4] = args;
      let options = {};
      let orverrides = {};
      if (!(isNumber(arg1) || isDate(arg1))) {
          throw new Error('TODO');
      }
      const value = arg1;
      if (isString(arg2)) {
          options.key = arg2;
      }
      else if (isPlainObject(arg2)) {
          options = arg2;
      }
      if (isString(arg3)) {
          options.locale = arg3;
      }
      else if (isPlainObject(arg3)) {
          orverrides = arg3;
      }
      if (isPlainObject(arg4)) {
          orverrides = arg4;
      }
      return [options.key || '', value, options, orverrides];
  }
  function clearDateTimeFormat(context, locale, format) {
      for (const key in format) {
          const id = `${locale}__${key}`;
          if (!context._datetimeFormatters.has(id)) {
              continue;
          }
          context._datetimeFormatters.delete(id);
      }
  }

  // implementation of `number` function
  function number(context, ...args) {
      const { numberFormats, unresolving, fallbackLocale, _numberFormatters } = context;
      if ( !Availabilities.numberFormat) {
          warn(`Cannot format a Date value due to not supported Intl.NumberFormat.`);
          return MISSING_RESOLVE_VALUE;
      }
      const [key, value, options, orverrides] = parseNumberArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const part = !!options.part;
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      if (!isString(key) || key === '') {
          return new Intl.NumberFormat(locale).format(value);
      }
      // resolve format
      let numberFormat = {};
      let targetLocale;
      let format = null;
      for (let i = 0; i < locales.length; i++) {
          targetLocale = locales[i];
          if (
              locale !== targetLocale &&
              isTrarnslateFallbackWarn(fallbackWarn, key)) {
              warn(`Fall back to number format '${key}' key with '${targetLocale}' locale.`);
          }
          numberFormat = numberFormats[targetLocale] || {};
          format = numberFormat[key];
          if (isPlainObject(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, 'number');
      }
      // checking format and target locale
      if (!isPlainObject(format) || !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      let id = `${targetLocale}__${key}`;
      if (!isEmptyObject(orverrides)) {
          id = `${id}__${JSON.stringify(orverrides)}`;
      }
      let formatter = _numberFormatters.get(id);
      if (!formatter) {
          formatter = new Intl.NumberFormat(targetLocale, Object.assign({}, format, orverrides));
          _numberFormatters.set(id, formatter);
      }
      return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
      const [arg1, arg2, arg3, arg4] = args;
      let options = {};
      let orverrides = {};
      if (!isNumber(arg1)) {
          throw new Error('TODO');
      }
      const value = arg1;
      if (isString(arg2)) {
          options.key = arg2;
      }
      else if (isPlainObject(arg2)) {
          options = arg2;
      }
      if (isString(arg3)) {
          options.locale = arg3;
      }
      else if (isPlainObject(arg3)) {
          orverrides = arg3;
      }
      if (isPlainObject(arg4)) {
          orverrides = arg4;
      }
      return [options.key || '', value, options, orverrides];
  }
  function clearNumberFormat(context, locale, format) {
      for (const key in format) {
          const id = `${locale}__${key}`;
          if (!context._numberFormatters.has(id)) {
              continue;
          }
          context._numberFormatters.delete(id);
      }
  }

  /*!
   *  Composer
   *
   *  Composer is offered composable API for Vue 3
   *  This module is offered new style vue-i18n API
   */
  let composerID = 0;
  function defineRuntimeMissingHandler(missing) {
      return (ctx, locale, key, type) => {
          return missing(locale, key, vue.getCurrentInstance() || undefined, type);
      };
  }
  function getLocaleMessages(options, locale) {
      const { messages, __i18n } = options;
      // prettier-ignore
      let ret = isPlainObject(messages)
          ? messages
          : isArray(__i18n)
              ? {}
              : { [locale]: {} };
      // merge locale messages of i18n custom block
      if (isArray(__i18n)) {
          __i18n.forEach(raw => {
              ret = Object.assign(ret, JSON.parse(raw));
          });
          return ret;
      }
      if (isFunction(__i18n)) {
          const { functions } = __i18n();
          addPreCompileMessages(ret, functions);
      }
      return ret;
  }
  function addPreCompileMessages(messages, functions) {
      const keys = Object.keys(functions);
      keys.forEach(key => {
          const compiled = functions[key];
          const { l, k } = JSON.parse(key);
          if (!messages[l]) {
              messages[l] = {};
          }
          const targetLocaleMessage = messages[l];
          const paths = parse(k);
          if (paths != null) {
              const len = paths.length;
              let last = targetLocaleMessage; // eslint-disable-line @typescript-eslint/no-explicit-any
              let i = 0;
              while (i < len) {
                  const path = paths[i];
                  if (i === len - 1) {
                      last[path] = compiled;
                      break;
                  }
                  else {
                      let val = last[path];
                      if (!val) {
                          last[path] = val = {};
                      }
                      last = val;
                      i++;
                  }
              }
          }
      });
  }
  /**
   * Create composer interface factory
   *
   * @internal
   */
  function createComposer(options = {}) {
      const { __root } = options;
      const _isGlobal = __root === undefined;
      let _inheritLocale = !!options.inheritLocale;
      const _locale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale
          ? __root.locale.value
          : isString(options.locale)
              ? options.locale
              : 'en-US');
      const _fallbackLocale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale
          ? __root.fallbackLocale.value
          : isString(options.fallbackLocale) ||
              isArray(options.fallbackLocale) ||
              isPlainObject(options.fallbackLocale) ||
              options.fallbackLocale === false
              ? options.fallbackLocale
              : _locale.value);
      const _messages = vue.ref(getLocaleMessages(options, _locale.value));
      const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats)
          ? options.datetimeFormats
          : { [_locale.value]: {} });
      const _numberFormats = vue.ref(isPlainObject(options.numberFormats)
          ? options.numberFormats
          : { [_locale.value]: {} });
      // warning supress options
      // prettier-ignore
      let _missingWarn = __root
          ? __root.missingWarn
          : isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
              ? options.missingWarn
              : true;
      // prettier-ignore
      let _fallbackWarn = __root
          ? __root.fallbackWarn
          : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
              ? options.fallbackWarn
              : true;
      let _fallbackRoot = isBoolean(options.fallbackRoot)
          ? options.fallbackRoot
          : true;
      // configure fall bakck to root
      let _fallbackFormat = !!options.fallbackFormat;
      // runtime missing
      let _missing = isFunction(options.missing) ? options.missing : null;
      let _runtimeMissing = isFunction(options.missing)
          ? defineRuntimeMissingHandler(options.missing)
          : null;
      // postTranslation handler
      let _postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : null;
      let _warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      // custom linked modifiers
      // prettier-ignore
      const _modifiers = __root
          ? __root.modifiers
          : isPlainObject(options.modifiers)
              ? options.modifiers
              : {};
      // pluralRules
      const _pluralRules = options.pluralRules;
      // runtime context
      let _context; // eslint-disable-line prefer-const
      const getRuntimeContext = () => {
          return createRuntimeContext({
              locale: _locale.value,
              fallbackLocale: _fallbackLocale.value,
              messages: _messages.value,
              datetimeFormats: _datetimeFormats.value,
              numberFormats: _numberFormats.value,
              modifiers: _modifiers,
              pluralRules: _pluralRules,
              missing: _runtimeMissing === null ? undefined : _runtimeMissing,
              missingWarn: _missingWarn,
              fallbackWarn: _fallbackWarn,
              fallbackFormat: _fallbackFormat,
              unresolving: true,
              postTranslation: _postTranslation === null ? undefined : _postTranslation,
              warnHtmlMessage: _warnHtmlMessage,
              _datetimeFormatters: isPlainObject(_context)
                  ? _context._datetimeFormatters
                  : undefined,
              _numberFormatters: isPlainObject(_context)
                  ? _context._numberFormatters
                  : undefined
          });
      };
      _context = getRuntimeContext();
      updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      /*!
       * define properties
       */
      // locale
      const locale = vue.computed({
          get: () => _locale.value,
          set: val => {
              _locale.value = val;
              _context.locale = _locale.value;
          }
      });
      // fallbackLocale
      const fallbackLocale = vue.computed({
          get: () => _fallbackLocale.value,
          set: val => {
              _fallbackLocale.value = val;
              _context.fallbackLocale = _fallbackLocale.value;
              updateFallbackLocale(_context, _locale.value, val);
          }
      });
      // messages
      const messages = vue.computed(() => _messages.value);
      // datetimeFormats
      const datetimeFormats = vue.computed(() => _datetimeFormats.value);
      // numberFormats
      const numberFormats = vue.computed(() => _numberFormats.value);
      /*!
       * define methods
       */
      // getPostTranslationHandler
      const getPostTranslationHandler = () => isFunction(_postTranslation) ? _postTranslation : null;
      // setPostTranslationHandler
      const setPostTranslationHandler = (handler) => {
          _postTranslation = handler;
          _context.postTranslation = handler;
      };
      // getMissingHandler
      const getMissingHandler = () => _missing;
      // setMissingHandler
      const setMissingHandler = (handler) => {
          if (handler !== null) {
              _runtimeMissing = defineRuntimeMissingHandler(handler);
          }
          _missing = handler;
          _context.missing = _runtimeMissing;
      };
      const defineComputed = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
          // NOTE:
          // if this composer is global (__root is `undefined`), add dependency trakcing!
          // by containing this, we can reactively notify components that reference the global composer.
          if (!_isGlobal) {
              _locale.value;
          }
          return vue.computed(() => {
              const ret = fn(_context);
              if (isNumber(ret) && ret === NOT_REOSLVED) {
                  const key = argumentParser();
                  if ( _fallbackRoot && __root) {
                      warn(`Fall back to ${warnType} '${key}' with root locale.`);
                  }
                  return _fallbackRoot && __root
                      ? fallbackSuccess(__root)
                      : fallbackFail(key);
              }
              else if (successCondition(ret)) {
                  return ret;
              }
              else {
                  throw new Error('TODO:'); // TODO
              }
          });
      };
      // t
      const t = (...args) => {
          return defineComputed(context => translate(context, ...args), () => parseTranslateArgs(...args)[0], 'translate', root => root.t(...args), key => key, val => isString(val)).value;
      };
      // d
      const d = (...args) => {
          return defineComputed(context => datetime(context, ...args), () => parseDateTimeArgs(...args)[0], 'datetime format', root => root.d(...args), () => MISSING_RESOLVE_VALUE, val => isString(val)).value;
      };
      // n
      const n = (...args) => {
          return defineComputed(context => number(context, ...args), () => parseNumberArgs(...args)[0], 'number format', root => root.n(...args), () => MISSING_RESOLVE_VALUE, val => isString(val)).value;
      };
      // for custom processor
      const normalize = (values) => {
          return values.map(val => (isString(val) ? vue.createTextVNode(val) : val));
      };
      const interpolate = (val) => val;
      const processor = {
          type: 'vnode',
          normalize,
          interpolate
      };
      // __transrateVNode, using for `i18n-t` component
      const __transrateVNode = (...args) => {
          return defineComputed(context => {
              let ret;
              try {
                  context.processor = processor;
                  ret = translate(context, ...args);
              }
              finally {
                  context.processor = null;
              }
              return ret;
          }, () => parseTranslateArgs(...args)[0], 'translate', root => root.__transrateVNode(...args), key => key, val => isArray(val)).value;
      };
      // __numberParts, using for `i18n-n` component
      const __numberParts = (...args) => {
          return defineComputed(context => number(context, ...args), () => parseNumberArgs(...args)[0], 'number format', root => root.__numberParts(...args), () => [], val => isString(val) || isArray(val)).value;
      };
      // __datetimeParts, using for `i18n-d` component
      const __datetimeParts = (...args) => {
          return defineComputed(context => datetime(context, ...args), () => parseDateTimeArgs(...args)[0], 'datetime format', root => root.__datetimeParts(...args), () => [], val => isString(val) || isArray(val)).value;
      };
      // getLocaleMessage
      const getLocaleMessage = (locale) => _messages.value[locale] || {};
      // setLocaleMessage
      const setLocaleMessage = (locale, message) => {
          _messages.value[locale] = message;
          _context.messages = _messages.value;
      };
      // mergeLocaleMessage
      const mergeLocaleMessage = (locale, message) => {
          _messages.value[locale] = Object.assign(_messages.value[locale] || {}, message);
          _context.messages = _messages.value;
      };
      // getDateTimeFormat
      const getDateTimeFormat = (locale) => _datetimeFormats.value[locale] || {};
      // setDateTimeFormat
      const setDateTimeFormat = (locale, format) => {
          _datetimeFormats.value[locale] = format;
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale, format);
      };
      // mergeDateTimeFormat
      const mergeDateTimeFormat = (locale, format) => {
          _datetimeFormats.value[locale] = Object.assign(_datetimeFormats.value[locale] || {}, format);
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale, format);
      };
      // getNumberFormat
      const getNumberFormat = (locale) => _numberFormats.value[locale] || {};
      // setNumberFormat
      const setNumberFormat = (locale, format) => {
          _numberFormats.value[locale] = format;
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale, format);
      };
      // mergeNumberFormat
      const mergeNumberFormat = (locale, format) => {
          _numberFormats.value[locale] = Object.assign(_numberFormats.value[locale] || {}, format);
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale, format);
      };
      // for debug
      composerID++;
      // watch root locale & fallbackLocale
      if (__root) {
          vue.watch(__root.locale, (val) => {
              if (_inheritLocale) {
                  _locale.value = val;
                  _context.locale = val;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          });
          vue.watch(__root.fallbackLocale, (val) => {
              if (_inheritLocale) {
                  _fallbackLocale.value = val;
                  _context.fallbackLocale = val;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          });
      }
      // export composable API!
      const composer = {
          /*!
           *  properties
           */
          locale,
          fallbackLocale,
          get inheritLocale() {
              return _inheritLocale;
          },
          set inheritLocale(val) {
              _inheritLocale = val;
              if (val && __root) {
                  _locale.value = __root.locale.value;
                  _fallbackLocale.value = __root.fallbackLocale.value;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          },
          get availableLocales() {
              return Object.keys(_messages.value).sort();
          },
          messages,
          datetimeFormats,
          numberFormats,
          get modifiers() {
              return _modifiers;
          },
          get pluralRules() {
              return _pluralRules;
          },
          get isGlobal() {
              return _isGlobal;
          },
          get missingWarn() {
              return _missingWarn;
          },
          set missingWarn(val) {
              _missingWarn = val;
              _context.missingWarn = _missingWarn;
          },
          get fallbackWarn() {
              return _fallbackWarn;
          },
          set fallbackWarn(val) {
              _fallbackWarn = val;
              _context.fallbackWarn = _fallbackWarn;
          },
          get fallbackRoot() {
              return _fallbackRoot;
          },
          set fallbackRoot(val) {
              _fallbackRoot = val;
          },
          get fallbackFormat() {
              return _fallbackFormat;
          },
          set fallbackFormat(val) {
              _fallbackFormat = val;
              _context.fallbackFormat = _fallbackFormat;
          },
          get warnHtmlMessage() {
              return _warnHtmlMessage;
          },
          set warnHtmlMessage(val) {
              _warnHtmlMessage = val;
              _context.warnHtmlMessage = val;
          },
          __id: composerID,
          /*!
           * methods
           */
          t,
          d,
          n,
          getLocaleMessage,
          setLocaleMessage,
          mergeLocaleMessage,
          getDateTimeFormat,
          setDateTimeFormat,
          mergeDateTimeFormat,
          getNumberFormat,
          setNumberFormat,
          mergeNumberFormat,
          getPostTranslationHandler,
          setPostTranslationHandler,
          getMissingHandler,
          setMissingHandler,
          __transrateVNode,
          __numberParts,
          __datetimeParts
      };
      return composer;
  }

  /*!
   *  Legacy
   *
   *  This module is offered legacy vue-i18n API compatibility
   */
  /**
   * Convert to I18n Composer Options from VueI18n Options
   *
   * @internal
   */
  function convertComposerOptions(options) {
      const locale = isString(options.locale) ? options.locale : 'en-US';
      const fallbackLocale = isString(options.fallbackLocale) ||
          isArray(options.fallbackLocale) ||
          isPlainObject(options.fallbackLocale) ||
          options.fallbackLocale === false
          ? options.fallbackLocale
          : locale;
      const missing = isFunction(options.missing) ? options.missing : undefined;
      const missingWarn = isBoolean(options.silentTranslationWarn) ||
          isRegExp(options.silentTranslationWarn)
          ? !options.silentTranslationWarn
          : true;
      const fallbackWarn = isBoolean(options.silentFallbackWarn) ||
          isRegExp(options.silentFallbackWarn)
          ? !options.silentFallbackWarn
          : true;
      const fallbackRoot = isBoolean(options.fallbackRoot)
          ? options.fallbackRoot
          : true;
      const fallbackFormat = !!options.formatFallbackMessages;
      const pluralizationRules = options.pluralizationRules;
      const postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : undefined;
      const warnHtmlMessage = isString(options.warnHtmlInMessage)
          ? options.warnHtmlInMessage !== 'off'
          : true;
      const inheritLocale = !!options.sync;
      if ( options.formatter) {
          warn(`not supportted 'formatter' option`);
      }
      if ( options.preserveDirectiveContent) {
          warn(`not supportted 'preserveDirectiveContent' option`);
      }
      let messages = options.messages;
      if (isPlainObject(options.sharedMessages)) {
          const sharedMessages = options.sharedMessages;
          const locales = Object.keys(sharedMessages);
          messages = locales.reduce((messages, locale) => {
              const message = messages[locale] || { [locale]: {} };
              Object.assign(message, sharedMessages[locale]);
              return messages;
          }, messages || {});
      }
      const { __i18n, __root } = options;
      const datetimeFormats = options.datetimeFormats;
      const numberFormats = options.numberFormats;
      return {
          locale,
          fallbackLocale,
          messages,
          datetimeFormats,
          numberFormats,
          missing,
          missingWarn,
          fallbackWarn,
          fallbackRoot,
          fallbackFormat,
          pluralRules: pluralizationRules,
          postTranslation,
          warnHtmlMessage,
          inheritLocale,
          __i18n,
          __root
      };
  }
  /**
   * create VueI18n interface factory
   *
   * @internal
   */
  function createVueI18n(options = {}) {
      const composer = createComposer(convertComposerOptions(options));
      // defines VueI18n
      const vueI18n = {
          /*!
           * properties
           */
          // locale
          get locale() {
              return composer.locale.value;
          },
          set locale(val) {
              composer.locale.value = val;
          },
          // fallbackLocale
          get fallbackLocale() {
              return composer.fallbackLocale.value;
          },
          set fallbackLocale(val) {
              composer.fallbackLocale.value = val;
          },
          // messages
          get messages() {
              return composer.messages.value;
          },
          // datetimeFormats
          get datetimeFormats() {
              return composer.datetimeFormats.value;
          },
          // numberFormats
          get numberFormats() {
              return composer.numberFormats.value;
          },
          // availableLocales
          get availableLocales() {
              return composer.availableLocales;
          },
          // formatter
          get formatter() {
               warn(`not support 'formatter' property`);
              // dummy
              return {
                  interpolate() {
                      return [];
                  }
              };
          },
          set formatter(val) {
               warn(`not support 'formatter' property`);
          },
          // missing
          get missing() {
              return composer.getMissingHandler();
          },
          set missing(handler) {
              composer.setMissingHandler(handler);
          },
          // silentTranslationWarn
          get silentTranslationWarn() {
              return isBoolean(composer.missingWarn)
                  ? !composer.missingWarn
                  : composer.missingWarn;
          },
          set silentTranslationWarn(val) {
              composer.missingWarn = isBoolean(val) ? !val : val;
          },
          // silentFallbackWarn
          get silentFallbackWarn() {
              return isBoolean(composer.fallbackWarn)
                  ? !composer.fallbackWarn
                  : composer.fallbackWarn;
          },
          set silentFallbackWarn(val) {
              composer.fallbackWarn = isBoolean(val) ? !val : val;
          },
          // formatFallbackMessages
          get formatFallbackMessages() {
              return composer.fallbackFormat;
          },
          set formatFallbackMessages(val) {
              composer.fallbackFormat = val;
          },
          // postTranslation
          get postTranslation() {
              return composer.getPostTranslationHandler();
          },
          set postTranslation(handler) {
              composer.setPostTranslationHandler(handler);
          },
          // sync
          get sync() {
              return composer.inheritLocale;
          },
          set sync(val) {
              composer.inheritLocale = val;
          },
          // warnInHtmlMessage
          get warnHtmlInMessage() {
              return composer.warnHtmlMessage ? 'warn' : 'off';
          },
          set warnHtmlInMessage(val) {
              composer.warnHtmlMessage = val !== 'off';
          },
          // preserveDirectiveContent
          get preserveDirectiveContent() {
              
                  warn(`not supportted 'preserveDirectiveContent' getter property.`);
              return true;
          },
          set preserveDirectiveContent(val) {
              
                  warn(`not supportted 'preserveDirectiveContent' setter property.`);
          },
          // for internal
          __id: composer.__id,
          __composer: composer,
          /**
           * methods
           */
          // t
          t(...args) {
              const [arg1, arg2, arg3] = args;
              const options = {};
              let list = null;
              let named = null;
              if (!isString(arg1)) {
                  throw new Error('TODO');
              }
              const key = arg1;
              if (isString(arg2)) {
                  options.locale = arg2;
              }
              else if (isArray(arg2)) {
                  list = arg2;
              }
              else if (isPlainObject(arg2)) {
                  named = arg2;
              }
              if (isArray(arg3)) {
                  list = arg3;
              }
              else if (isPlainObject(arg3)) {
                  named = arg3;
              }
              return composer.t(key, list || named || {}, options);
          },
          // tc
          tc(...args) {
              const [arg1, arg2, arg3] = args;
              const options = { plural: 1 };
              let list = null;
              let named = null;
              if (!isString(arg1)) {
                  throw new Error('TODO');
              }
              const key = arg1;
              if (isString(arg2)) {
                  options.locale = arg2;
              }
              else if (isNumber(arg2)) {
                  options.plural = arg2;
              }
              else if (isArray(arg2)) {
                  list = arg2;
              }
              else if (isPlainObject(arg2)) {
                  named = arg2;
              }
              if (isString(arg3)) {
                  options.locale = arg3;
              }
              else if (isArray(arg3)) {
                  list = arg3;
              }
              else if (isPlainObject(arg3)) {
                  named = arg3;
              }
              return composer.t(key, list || named || {}, options);
          },
          // te
          te(key, locale) {
              const targetLocale = isString(locale) ? locale : composer.locale.value;
              const message = composer.getLocaleMessage(targetLocale);
              return resolveValue(message, key) !== null;
          },
          // getLocaleMessage
          getLocaleMessage(locale) {
              return composer.getLocaleMessage(locale);
          },
          // setLocaleMessage
          setLocaleMessage(locale, message) {
              composer.setLocaleMessage(locale, message);
          },
          // mergeLocaleMessasge
          mergeLocaleMessage(locale, message) {
              composer.mergeLocaleMessage(locale, message);
          },
          // d
          d(...args) {
              return composer.d(...args);
          },
          // getDateTimeFormat
          getDateTimeFormat(locale) {
              return composer.getDateTimeFormat(locale);
          },
          // setDateTimeFormat
          setDateTimeFormat(locale, format) {
              composer.setDateTimeFormat(locale, format);
          },
          // mergeDateTimeFormat
          mergeDateTimeFormat(locale, format) {
              composer.mergeDateTimeFormat(locale, format);
          },
          // n
          n(...args) {
              return composer.n(...args);
          },
          // getNumberFormat
          getNumberFormat(locale) {
              return composer.getNumberFormat(locale);
          },
          // setNumberFormat
          setNumberFormat(locale, format) {
              composer.setNumberFormat(locale, format);
          },
          // mergeNumberFormat
          mergeNumberFormat(locale, format) {
              composer.mergeNumberFormat(locale, format);
          },
          // getChoiceIndex
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getChoiceIndex(choice, choicesLength) {
               warn(`not supportted 'getChoiceIndex' method.`);
              return -1;
          }
      };
      return vueI18n;
  }

  const Translation = vue.defineComponent({
      /* eslint-disable */
      name: 'i18n-t',
      props: {
          tag: {
              type: String
          },
          keypath: {
              type: String,
              required: true
          },
          locale: {
              type: String
          },
          plural: {
              type: [Number, String],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validator: (val) => isNumber(val) || !isNaN(val)
          }
      },
      /* eslint-enable */
      setup(props, context) {
          const { slots, attrs } = context;
          const i18n = useI18n({ useScope: 'parent' });
          const keys = Object.keys(slots).filter(key => key !== '_');
          return () => {
              const options = {};
              if (props.locale) {
                  options.locale = props.locale;
              }
              if (props.plural !== undefined) {
                  options.plural = isString(props.plural) ? +props.plural : props.plural;
              }
              const arg = getInterpolateArg(context, keys);
              const children = i18n.__transrateVNode(props.keypath, arg, options);
              return props.tag
                  ? vue.h(props.tag, { ...attrs }, children)
                  : vue.h(vue.Fragment, { ...attrs }, children);
          };
      }
  });
  function getInterpolateArg({ slots }, keys) {
      if (keys.length === 1 && keys[0] === 'default') {
          // default slot only
          return slots.default ? slots.default() : [];
      }
      else {
          // named slots
          return keys.reduce((arg, key) => {
              const slot = slots[key];
              if (slot) {
                  arg[key] = slot();
              }
              return arg;
          }, {});
      }
  }

  function renderFormatter(props, context, slotKeys, partFormatter) {
      const { slots, attrs } = context;
      return () => {
          const options = { part: true };
          let orverrides = {};
          if (props.locale) {
              options.locale = props.locale;
          }
          if (isString(props.format)) {
              options.key = props.format;
          }
          else if (isPlainObject(props.format)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if (isString(props.format.key)) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  options.key = props.format.key;
              }
              // Filter out number format options only
              orverrides = Object.keys(props.format).reduce((options, prop) => {
                  return slotKeys.includes(prop)
                      ? Object.assign({}, options, { [prop]: props.format[prop] }) // eslint-disable-line @typescript-eslint/no-explicit-any
                      : options;
              }, {});
          }
          const parts = partFormatter(...[props.value, options, orverrides]);
          let children = [options.key];
          if (isArray(parts)) {
              children = parts.map((part, index) => {
                  const slot = slots[part.type];
                  return slot
                      ? slot({ [part.type]: part.value, index, parts })
                      : [part.value];
              });
          }
          else if (isString(parts)) {
              children = [parts];
          }
          return props.tag
              ? vue.h(props.tag, { ...attrs }, children)
              : vue.h('span', { ...attrs }, children);
      };
  }

  const NUMBER_FORMAT_KEYS = [
      'localeMatcher',
      'style',
      'unit',
      'unitDisplay',
      'currency',
      'currencyDisplay',
      'useGrouping',
      'numberingSystem',
      'minimumIntegerDigits',
      'minimumFractionDigits',
      'maximumFractionDigits',
      'minimumSignificantDigits',
      'maximumSignificantDigits',
      'notation',
      'formatMatcher'
  ];
  const NumberFormat = vue.defineComponent({
      /* eslint-disable */
      name: 'i18n-n',
      props: {
          tag: {
              type: String
          },
          value: {
              type: Number,
              required: true
          },
          format: {
              type: [String, Object]
          },
          locale: {
              type: String
          }
      },
      /* eslint-enable */
      setup(props, context) {
          const i18n = useI18n({ useScope: 'parent' });
          return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => i18n.__numberParts(...args));
      }
  });

  const DATETIME_FORMAT_KEYS = [
      'dateStyle',
      'timeStyle',
      'fractionalSecondDigits',
      'calendar',
      'dayPeriod',
      'numberingSystem',
      'localeMatcher',
      'timeZone',
      'hour12',
      'hourCycle',
      'formatMatcher',
      'weekday',
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'timeZoneName'
  ];
  const DatetimeFormat = vue.defineComponent({
      /* eslint-disable */
      name: 'i18n-d',
      props: {
          tag: {
              type: String
          },
          value: {
              type: [Number, Date],
              required: true
          },
          format: {
              type: [String, Object]
          },
          locale: {
              type: String
          }
      },
      /* eslint-enable */
      setup(props, context) {
          const i18n = useI18n({ useScope: 'parent' });
          return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => i18n.__datetimeParts(...args));
      }
  });

  function getComposer(i18n, instance) {
      if (i18n.mode === 'composable') {
          return i18n._getComposer(instance) || i18n.global;
      }
      else {
          const vueI18n = i18n._getLegacy(instance);
          return vueI18n != null ? vueI18n.__composer : i18n.global;
      }
  }
  function vTDirective(i18n) {
      const bind = (el, { instance, value, modifiers }) => {
          if (!instance || !instance.$) {
              // TODO: should be raise Vue error
              throw new Error('TODO');
          }
          const composer = getComposer(i18n, instance.$);
          if (!composer) {
              // TODO: should be error
              throw new Error('TODO');
          }
          if ( modifiers.preserve) {
              warn(`not supportted 'preserve' modifier`);
          }
          const parsedValue = parseValue(value);
          el.innerText = composer.t(...makeParams(parsedValue));
      };
      return {
          beforeMount: bind,
          beforeUpdate: bind
      };
  }
  function parseValue(value) {
      if (isString(value)) {
          return { path: value };
      }
      else if (isPlainObject(value)) {
          if (!('path' in value)) {
              throw new Error('TODO');
          }
          return value;
      }
      else {
          throw new Error('TODO');
      }
  }
  function makeParams(value) {
      const { path, locale, args, choice } = value;
      const options = {};
      const named = args || {};
      if (isString(locale)) {
          options.locale = locale;
      }
      if (isNumber(choice)) {
          options.plural = choice;
      }
      return [path, named, options];
  }

  function apply(app, i18n, ...options) {
      const pluginOptions = parseOptions(...options);
      if ( isString(pluginOptions['i18n-t'])) {
          warn(`Rename the component name: '${Translation.name}' -> '${pluginOptions['i18n-t']}'`);
      }
      // install components
      app.component(pluginOptions['i18n-t'] || Translation.name, Translation);
      app.component(NumberFormat.name, NumberFormat);
      app.component(DatetimeFormat.name, DatetimeFormat);
      // install directive
      app.directive('t', vTDirective(i18n));
      // setup global provider
      app.provide(I18nSymbol, i18n);
  }
  function parseOptions(...options) {
      const [arg] = options;
      const ret = {};
      if (!isPlainObject(arg)) {
          return ret;
      }
      if (!isString(arg['i18n-t'])) {
          return ret;
      }
      ret['i18n-t'] = arg['i18n-t'];
      return ret;
  }

  // supports compatibility for legacy vue-i18n APIs
  function defineMixin(legacy, composer, i18n) {
      return {
          beforeCreate() {
              const instance = vue.getCurrentInstance();
              if (!instance) {
                  // TODO:
                  throw new Error('TODO');
              }
              const options = this.$options;
              if (options.i18n) {
                  const optionsI18n = options.i18n;
                  if (options.__i18n) {
                      optionsI18n.__i18n = options.__i18n;
                  }
                  optionsI18n.__root = composer;
                  this.$i18n = createVueI18n(optionsI18n);
                  i18n._setLegacy(instance, this.$i18n);
              }
              else if (options.__i18n) {
                  this.$i18n = createVueI18n({
                      __i18n: options.__i18n,
                      __root: composer
                  });
                  i18n._setLegacy(instance, this.$i18n);
              }
              else {
                  // set global
                  this.$i18n = legacy;
              }
              // defines vue-i18n legacy APIs
              this.$t = (...args) => this.$i18n.t(...args);
              this.$tc = (...args) => this.$i18n.tc(...args);
              this.$te = (key, locale) => this.$i18n.te(key, locale);
              this.$d = (...args) => this.$i18n.d(...args);
              this.$n = (...args) => this.$i18n.n(...args);
          },
          mounted() {
              this.$el.__intlify__ = this.$i18n.__composer;
          },
          beforeDestroy() {
              const instance = vue.getCurrentInstance();
              if (!instance) {
                  // TODO:
                  throw new Error('TODO');
              }
              delete this.$el.__intlify__;
              delete this.$t;
              delete this.$tc;
              delete this.$te;
              delete this.$d;
              delete this.$n;
              i18n._deleteLegacy(instance);
              delete this.$i18n;
          }
      };
  }

  /**
   * I18n instance injectin key
   * @internal
   */
  const I18nSymbol = Symbol.for('vue-i18n');
  /**
   * I18n factory function
   *
   * @param options - see the {@link I18nOptions}
   * @returns {@link I18n} object
   *
   * @remarks
   * When you use Composable API, you need to specify options of {@link ComposerOptions}.
   * When you use Legacy API, you need toto specify options of {@link VueI18nOptions} and `legacy: true` option.
   *
   * @example
   * case: for Composable API
   * ```js
   * import { createApp } from 'vue'
   * import { createI18n, useI18n } from 'vue-i18n'
   *
   * // call with I18n option
   * const i18n = createI18n({
   *   locale: 'ja',
   *   messages: {
   *     en: { ... },
   *     ja: { ... }
   *   }
   * })
   *
   * const App = {
   *   setup() {
   *     // ...
   *     const { t } = useI18n({ ... })
   *     return { ... , t }
   *   }
   * }
   *
   * const app = createApp(App)
   *
   * // install!
   * app.use(i18n)
   * app.mount('#app')
   * ```
   *
   * @example
   * case: for Legacy API
   * ```js
   * import { createApp } from 'vue'
   * import { createI18n } from 'vue-i18n'
   *
   * // call with I18n option
   * const i18n = createI18n({
   *   legacy: true, // you must specify 'lagacy: true' option
   *   locale: 'ja',
   *   messages: {
   *     en: { ... },
   *     ja: { ... }
   *   }
   * })
   *
   * const App = {
   *   // ...
   * }
   *
   * const app = createApp(App)
   *
   * // install!
   * app.use(i18n)
   * app.mount('#app')
   * ```
   */
  function createI18n(options = {}) {
      const __legacyMode = !!options.legacy;
      const __composers = new Map();
      const __legaceis = new Map();
      const __global = __legacyMode
          ? createVueI18n(options)
          : createComposer(options);
      const i18n = {
          // mode
          get mode() {
              return __legacyMode ? 'legacy' : 'composable';
          },
          install(app, ...options) {
              apply(app, i18n, ...options);
              if (__legacyMode) {
                  app.mixin(defineMixin(__global, __global.__composer, i18n));
              }
          },
          get global() {
              return __legacyMode
                  ? __global.__composer
                  : __global;
          },
          _getComposer(instance) {
              return __composers.get(instance) || null;
          },
          _setComposer(instance, composer) {
              __composers.set(instance, composer);
          },
          _deleteComposer(instance) {
              __composers.delete(instance);
          },
          _getLegacy(instance) {
              return __legaceis.get(instance) || null;
          },
          _setLegacy(instance, legacy) {
              __legaceis.set(instance, legacy);
          },
          _deleteLegacy(instance) {
              __legaceis.delete(instance);
          }
      };
      return i18n;
  }
  /**
   * Use Composable API starting function
   *
   * @param options - See {@link UseI18nOptions}
   * @returns {@link Composer} object
   *
   * @remarks
   * This function is mainly used by `setup`.
   * If options are specified, Composer object is created for each component and you can be localized on the component.
   * If options are not specified, you can be localized using the global Composer.
   *
   * @example
   * case: Component resource base localization
   * ```html
   * <template>
   *   <form>
   *     <label>{{ t('language') }}</label>
   *     <select v-model="locale">
   *       <option value="en">en</option>
   *       <option value="ja">ja</option>
   *     </select>
   *   </form>
   *   <p>message: {{ t('hello') }}</p>
   * </template>
   *
   * <script>
   * import { useI18n } from 'vue-i18n'
   *
   * export default {
   *  setup() {
   *    const { t, locale } = useI18n({
   *      locale: 'ja',
   *      messages: {
   *        en: { ... },
   *        ja: { ... }
   *      }
   *    })
   *    // Something to do ...
   *
   *    return { ..., t, locale }
   *  }
   * }
   * </script>
   * ```
   */
  function useI18n(options = {}) {
      const i18n = vue.inject(I18nSymbol);
      // TODO: should be error
      if (!i18n) {
          throw new Error('TODO');
      }
      const global = i18n.global;
      let emptyOption = false;
      // prettier-ignore
      const scope = (emptyOption = isEmptyObject(options)) // eslint-disable-line no-cond-assign
          ? 'global'
          : !options.useScope
              ? 'local'
              : options.useScope;
      if (emptyOption) {
          return global;
      }
      // TODO: should be unexpected error (vue runtime error!)
      const instance = vue.getCurrentInstance();
      if (instance == null) {
          throw new Error('TODO');
      }
      if (scope === 'parent') {
          let composer = getComposer$1(i18n, instance);
          if (composer == null) {
              // TODO: warning!
              composer = global;
          }
          return composer;
      }
      else if (scope === 'global') {
          return global;
      }
      // scope 'local' case
      if (i18n.mode === 'legacy') {
          // TODO:
          throw new Error('TODO');
      }
      let composer = i18n._getComposer(instance);
      if (composer == null) {
          const type = instance.type;
          const composerOptions = {
              ...options
          };
          if (type.__i18n) {
              composerOptions.__i18n = type.__i18n;
          }
          if (global) {
              composerOptions.__root = global;
          }
          composer = createComposer(composerOptions);
          setupLifeCycle(i18n, instance, composer);
          i18n._setComposer(instance, composer);
      }
      return composer;
  }
  function getComposer$1(i18n, target) {
      let composer = null;
      const root = target.root;
      let current = target.parent;
      while (current != null) {
          if (i18n.mode === 'composable') {
              composer = i18n._getComposer(current);
          }
          else {
              const vueI18n = i18n._getLegacy(current);
              if (vueI18n != null) {
                  composer = vueI18n.__composer;
              }
          }
          if (composer != null) {
              break;
          }
          if (root === current) {
              break;
          }
          current = current.parent;
      }
      return composer;
  }
  function setupLifeCycle(i18n, target, composer) {
      vue.onMounted(() => {
          // inject composer instance to DOM for intlify-devtools
          if (target.proxy) {
              target.proxy.$el.__intlify__ = composer;
          }
      }, target);
      vue.onUnmounted(() => {
          // remove composer instance from DOM for intlify-devtools
          if (target.proxy && target.proxy.$el.__intlify__) {
              delete target.proxy.$el.__intlify__;
          }
          i18n._deleteComposer(target);
      }, target);
  }

  /**
   * vue-i18n version
   */
  const VERSION = "9.0.0-alpha.8";

  exports.Availabilities = Availabilities;
  exports.VERSION = VERSION;
  exports.baseCompile = baseCompile;
  exports.compile = compile;
  exports.createI18n = createI18n;
  exports.createParser = createParser;
  exports.friendlyJSONstringify = friendlyJSONstringify;
  exports.generateFormatCacheKey = generateFormatCacheKey;
  exports.useI18n = useI18n;

  return exports;

}({}, Vue));
