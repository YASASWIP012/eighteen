var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e2) {
    throw err = [e2], e2;
  }
};
var __commonJS = (cb, mod2) => function __require() {
  try {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  } catch (e2) {
    throw mod2 = 0, e2;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num2) {
      return lookup[num2 >> 18 & 63] + lookup[num2 >> 12 & 63] + lookup[num2 >> 6 & 63] + lookup[num2 & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output2 = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output2.push(tripletToBase64(tmp));
      }
      return output2.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE3, mLen, nBytes) {
      var e2, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE3 ? nBytes - 1 : 0;
      var d2 = isLE3 ? -1 : 1;
      var s = buffer[offset + i];
      i += d2;
      e2 = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i], i += d2, nBits -= 8) {
      }
      m = e2 & (1 << -nBits) - 1;
      e2 >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d2, nBits -= 8) {
      }
      if (e2 === 0) {
        e2 = 1 - eBias;
      } else if (e2 === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e2 = e2 - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e2 - mLen);
    };
    exports.write = function(buffer, value, offset, isLE3, mLen, nBytes) {
      var e2, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE3 ? 0 : nBytes - 1;
      var d2 = isLE3 ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e2 = eMax;
      } else {
        e2 = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e2)) < 1) {
          e2--;
          c *= 2;
        }
        if (e2 + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e2++;
          c /= 2;
        }
        if (e2 + eBias >= eMax) {
          m = 0;
          e2 = eMax;
        } else if (e2 + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e2 = e2 + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e2 = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d2, m /= 256, mLen -= 8) {
      }
      e2 = e2 << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e2 & 255, i += d2, e2 /= 256, eLen -= 8) {
      }
      buffer[offset + i - d2] |= s * 128;
    };
  }
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer4;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer4.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer4.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e2) {
        return false;
      }
    }
    Object.defineProperty(Buffer4.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer4.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer4.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer4.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer4.prototype);
      return buf;
    }
    function Buffer4(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer4.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString2(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer4.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer4.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer4.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer4.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer4, Uint8Array);
    function assertSize2(size2) {
      if (typeof size2 !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size2 < 0) {
        throw new RangeError('The value "' + size2 + '" is invalid for option "size"');
      }
    }
    function alloc(size2, fill, encoding) {
      assertSize2(size2);
      if (size2 <= 0) {
        return createBuffer(size2);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size2).fill(fill, encoding) : createBuffer(size2).fill(fill);
      }
      return createBuffer(size2);
    }
    Buffer4.alloc = function(size2, fill, encoding) {
      return alloc(size2, fill, encoding);
    };
    function allocUnsafe(size2) {
      assertSize2(size2);
      return createBuffer(size2 < 0 ? 0 : checked(size2) | 0);
    }
    Buffer4.allocUnsafe = function(size2) {
      return allocUnsafe(size2);
    };
    Buffer4.allocUnsafeSlow = function(size2) {
      return allocUnsafe(size2);
    };
    function fromString2(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer4.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string2, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string2, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer4.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer4.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer4.alloc(+length);
    }
    Buffer4.isBuffer = function isBuffer2(b) {
      return b != null && b._isBuffer === true && b !== Buffer4.prototype;
    };
    Buffer4.compare = function compare2(a2, b) {
      if (isInstance(a2, Uint8Array)) a2 = Buffer4.from(a2, a2.offset, a2.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer4.from(b, b.offset, b.byteLength);
      if (!Buffer4.isBuffer(a2) || !Buffer4.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a2 === b) return 0;
      let x = a2.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a2[i] !== b[i]) {
          x = a2[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer4.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer4.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer4.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer4.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer4.isBuffer(buf)) buf = Buffer4.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer,
              buf,
              pos
            );
          }
        } else if (!Buffer4.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string2, encoding) {
      if (Buffer4.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2
        );
      }
      const len = string2.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes3(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes3(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer4.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer4.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer4.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer4.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer4.prototype.toString = function toString2() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer4.prototype.toLocaleString = Buffer4.prototype.toString;
    Buffer4.prototype.equals = function equals(b) {
      if (!Buffer4.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer4.compare(this, b) === 0;
    };
    Buffer4.prototype.inspect = function inspect() {
      let str = "";
      const max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer4.prototype[customInspectSymbol] = Buffer4.prototype.inspect;
    }
    Buffer4.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer4.from(target, target.offset, target.byteLength);
      }
      if (!Buffer4.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer4.from(val, encoding);
      }
      if (Buffer4.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer4.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string2, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string2.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string2, offset, length) {
      return blitBuffer(utf8ToBytes3(string2, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string2, offset, length) {
      return blitBuffer(asciiToBytes(string2), buf, offset, length);
    }
    function base64Write(buf, string2, offset, length) {
      return blitBuffer(base64ToBytes(string2), buf, offset, length);
    }
    function ucs2Write(buf, string2, offset, length) {
      return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length);
    }
    Buffer4.prototype.write = function write(string2, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string2.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset, length);
          case "base64":
            return base64Write(this, string2, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer4.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes2 = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes2.length - 1; i += 2) {
        res += String.fromCharCode(bytes2[i] + bytes2[i + 1] * 256);
      }
      return res;
    }
    Buffer4.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer4.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer4.prototype.readUintLE = Buffer4.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul2 = 1;
      let i = 0;
      while (++i < byteLength2 && (mul2 *= 256)) {
        val += this[offset + i] * mul2;
      }
      return val;
    };
    Buffer4.prototype.readUintBE = Buffer4.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul2 = 1;
      while (byteLength2 > 0 && (mul2 *= 256)) {
        val += this[offset + --byteLength2] * mul2;
      }
      return val;
    };
    Buffer4.prototype.readUint8 = Buffer4.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer4.prototype.readUint16LE = Buffer4.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer4.prototype.readUint16BE = Buffer4.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer4.prototype.readUint32LE = Buffer4.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer4.prototype.readUint32BE = Buffer4.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer4.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer4.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer4.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul2 = 1;
      let i = 0;
      while (++i < byteLength2 && (mul2 *= 256)) {
        val += this[offset + i] * mul2;
      }
      mul2 *= 128;
      if (val >= mul2) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul2 = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul2 *= 256)) {
        val += this[offset + --i] * mul2;
      }
      mul2 *= 128;
      if (val >= mul2) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer4.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer4.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer4.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer4.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer4.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer4.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer4.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer4.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer4.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer4.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer4.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer4.prototype.writeUintLE = Buffer4.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul2 = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul2 *= 256)) {
        this[offset + i] = value / mul2 & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeUintBE = Buffer4.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul2 = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul2 *= 256)) {
        this[offset + i] = value / mul2 & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeUint8 = Buffer4.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer4.prototype.writeUint16LE = Buffer4.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer4.prototype.writeUint16BE = Buffer4.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer4.prototype.writeUint32LE = Buffer4.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer4.prototype.writeUint32BE = Buffer4.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer4.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer4.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer4.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul2 = 1;
      let sub2 = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul2 *= 256)) {
        if (value < 0 && sub2 === 0 && this[offset + i - 1] !== 0) {
          sub2 = 1;
        }
        this[offset + i] = (value / mul2 >> 0) - sub2 & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul2 = 1;
      let sub2 = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul2 *= 256)) {
        if (value < 0 && sub2 === 0 && this[offset + i + 1] !== 0) {
          sub2 = 1;
        }
        this[offset + i] = (value / mul2 >> 0) - sub2 & 255;
      }
      return offset + byteLength2;
    };
    Buffer4.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer4.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer4.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer4.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer4.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer4.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer4.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer4.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer4.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer4.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer4.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer4.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer4.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer4.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer4.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes2 = Buffer4.isBuffer(val) ? val : Buffer4.from(val, encoding);
        const len = bytes2.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes2[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes3(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length = string2.length;
      let leadSurrogate = null;
      const bytes2 = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes2.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes2.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes2.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes2.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes2.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes2.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes2.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes2.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes2;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// node_modules/poseidon-lite/poseidon/index.js
var require_poseidon = __commonJS({
  "node_modules/poseidon-lite/poseidon/index.js"(exports, module) {
    "use strict";
    var F = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");
    var N_ROUNDS_F = 8;
    var N_ROUNDS_P = [56, 57, 56, 60, 60, 63, 64, 63, 60, 66, 60, 65, 70, 60, 64, 68];
    var pow5 = (v) => {
      let o = v * v;
      return v * o * o % F;
    };
    function mix(state, M) {
      const out = [];
      for (let x = 0; x < state.length; x++) {
        let o = 0n;
        for (let y = 0; y < state.length; y++) {
          o = o + M[x][y] * state[y];
        }
        out.push(o % F);
      }
      return out;
    }
    function poseidon(_inputs, opt, nOuts = 1) {
      const inputs = _inputs.map((i) => BigInt(i));
      if (inputs.length <= 0) {
        throw new Error("poseidon-lite: Not enough inputs");
      }
      if (inputs.length > N_ROUNDS_P.length) {
        throw new Error("poseidon-lite: Too many inputs");
      }
      const t = inputs.length + 1;
      const nRoundsF = N_ROUNDS_F;
      const nRoundsP = N_ROUNDS_P[t - 2];
      const {
        C,
        M
      } = opt;
      if (M.length !== t) {
        throw new Error(`poseidon-lite: Incorrect M length, expected ${t} got ${M.length}`);
      }
      let state = [0n, ...inputs];
      for (let x = 0; x < nRoundsF + nRoundsP; x++) {
        for (let y = 0; y < state.length; y++) {
          state[y] = state[y] + C[x * t + y];
          if (x < nRoundsF / 2 || x >= nRoundsF / 2 + nRoundsP) state[y] = pow5(state[y]);
          else if (y === 0) state[y] = pow5(state[y]);
        }
        state = mix(state, M);
      }
      if (typeof nOuts !== "number") throw new Error(`poseidon-lite: expected nOuts to be number got ${typeof nOuts}`);
      if (nOuts === 1) {
        return state[0];
      } else if (nOuts <= state.length) {
        return state.slice(0, nOuts);
      } else {
        throw new Error(`poseidon-lite: Invalid number of outputs requested ${nOuts}, max ${state.length}`);
      }
    }
    module.exports = poseidon;
  }
});

// node_modules/poseidon-lite/poseidon/unstringify.js
var require_unstringify = __commonJS({
  "node_modules/poseidon-lite/poseidon/unstringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = unstringifyBigInts3;
    function unstringifyBigInts3(o) {
      if (Array.isArray(o)) {
        return o.map(unstringifyBigInts3);
      } else if (typeof o == "object") {
        const res = {};
        for (const [key, val] of Object.entries(o)) {
          res[key] = unstringifyBigInts3(val);
        }
        return res;
      }
      const byteArray = Uint8Array.from(atob(o), (c) => c.charCodeAt(0));
      const hex = [...byteArray].map((x) => x.toString(16).padStart(2, "0")).join("");
      return BigInt(`0x${hex}`);
    }
  }
});

// node_modules/poseidon-lite/constants/2.js
var require__ = __commonJS({
  "node_modules/poseidon-lite/constants/2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = {
      C: ["DumlkrqalRjQWYbWVvQMIRTEmTwRuymTjSHUcwTNjm4=", "APFEUjXyFIxZhlhxafwbzYh7CNTQCGjfVpb/9AlW6GQ=", "CN/zSH6KyZ4fKaBY0PqAuTDHKHMLerNs6HnziQ7Pc/U=", "Lye+aQ/a7kbDzij3UysTyFbDU0LIS9puIJZjEPrcAdA=", "KyrhrPaLe40kFr6/PU9iNLdj/gS4BD7ki4MnvryhbPI=", "AxnQYgcr737MperAb5fU1VlSwXWrawPq5ktEx9vxHPo=", "KIE9yuuuqoKKN234evSmO8i3vyetScYpjvezh78oUm0=", "JydnOyzLyQPxgb844cHUDSAzhlIAw1K8FQkord35y3g=", "I07EXKJ3J8LnSr0rKhSUzW771D40BYfWuPueMeZcxjI=", "FbUlNAMa4Y9/hiyyz3z3YKsQqBUKM3sczZn/boeX1Cg=", "Dcj61tnks19e2aPRhrec444Oio0bWLEy1wHU7s9o0fY=", "G82V/8IR+8pgD3BfrT+1Z+pOs3j2Lh/sl4BVGKR+TZw=", "EFILCrchyt/p7/gbAW/DTcdto2wleJN4F8uXjQad5Vk=", "H21IFJuOf32bJX2O1fu69CkySYB1/tCs6IqeuB9WJ/Y=", "HZZV9lIwkBTSngDvNaIIm//43ByBbw3JyjS9tUYMhwU=", "BN9aVv+VvK+wUfexzUOpm6cx/2fkcDIFj+PUGFaXzH0=", "BnLZlfj/9kAVGz0pDO2vFIaQoQqMhCSn9uwoK25L6Cg=", "CZlStBSIRFSyEgDX/6/dXwyancwG8nCOn8HYIJtcdbk=", "BSy6IlXf0Ax8SDFDuo1GlEjkNYaptM2Rg/0OhDprn6Y=", "C4ut7mkK246wvXRxK3mZr4LeVXByUa13Fgd8uTxGTdw=", "EZsVkPEzB69aHuZRAgwHx0nBXWBoOoBQuWPQqOSyvdE=", "AxULfNbV0XslKdNr4PZ7gyxKz8iE707lzhW+C/tKjQk=", "LMYYLF4UVG488ZUfFzkSNVN077g9gImKvmnLMXyepWU=", "AFAyVR5jeMRQz+EppASzdkIYyt7awU4rktLNcxEb8Pk=", "IzI34yibqjS7FH6XLry5UWRpw5n8wGn7iPnaLMKCdrU=", "Bcj09OvUpuPJgNMWdL++YyMDfyGzSuWk6AwtTCTWAoA=", "CnsdsTBC05a6BdgYoxnyUlK8817zru2R7h8JslkPxls=", "KnO3H5shDPWxQpZXLJ0y2/FW4rCG/0fcXfVCNlpATsA=", "GsmwQXq8yaGTUQfp/8kdw+wY8sTb5/Ipdqdgu1xQxGA=", "EsAzmuCDdII/q7B2cH70eSafPk1ssQQ0kBXuBG3JP8A=", "C3R1sQKhZa1/WxjbTh5wT1KQCqMlO6rGgkZoLlbpoo4=", "A3woSeGRyj7bHF5J9ui4kXyEPjeTZvLqMqs6qI1/hEg=", "BaaBH4VW8BTpJnRmHiF+m9UgbFyToH3BRf2xdqcWNG8=", "KaeV59mAKJRulHt11U6fBEB26Hp7KIO0e2de9fOL1m4=", "IEOaDISzIutFo4V6/Bj1gm6Mc4LIoVhcUHvhmZgf0i8=", "Lguo2U2ez0qU7CBQxzcf8btQ8neZqEttSipvKgmCyIc=", "FD/RFc4I+yfKOOt8zoIrRReCLNIQkEjS5tDdzKF9ccg=", "DGTL7LHHNLhXlo273PgTzfhhFlkyPby/yEMjYjvpyvE=", "AoowWEfGg/ZG/KklwWP/WudPNI1iwrZw8UJs75QD2lM=", "Lk71EP8Lb9pfqUCrTEOA8mpry2TYlCe4JNZ1W1254ww=", "AIHJW8QzhOZj15JwyVbOO4kltPbQM7B4uWOE9QV5QA4=", "LtXwyRy9l0kYfi+t5ofgXuJJGzScA5oLuoqfQCOguzg=", "MFCZkfiNo1BLvzdO1ari8DRIoix2I0yMmQ8B8zpzUgY=", "HD8g/VVAmlMiG3xNSaNWufChEZ+yBntBp1KQlEJOxq0=", "ELTn86td8AMElRRFm24Y7sRrsiE+jhMeFwiHtH3cuWw=", "KhmCl5w/9/Q93VQ9iRwqvd2A+ATAd9d1A5qjUC5Dre8=", "HHTuZPFeHbb+3b6tVtbVXbpDHrw5bJr5XK0PExW9XJE=", "B1M+yFC6f5jquTA8rOAbS55PLouCcIz6nC/kWgrhRqA=", "IVdrQ45QBEmhUeTurxexVChcaPQtQsGAihGr83ZMB1A=", "LxfAVZuP55YIrVyhk9YvELzoOEyBXwkGdD1pMINtSp4=", "LUd+OGLQdwinnoqulGFwvJd1pCATGEdK5mWwsbficw4=", "Fi9SQ5ZwZMOQ4JVXeYTyka+6ImbDj1q82Jvg9bJ0fqs=", "K0yyM+3pukgmTs0siuUNGteoWWqH8p+Kd3enAJI5MxE=", "LI+8st2Fc9wduvj0YihUd22y7s5thcTPQlTnw14DsHo=", "HW80dyXkgWry/0U/DNVrGZ4bYen2Aemt5eiNuHCUnak=", "IEsMOX9OvnHrwtiz31uRPfnmrAK2jTEyTNSa9cRWVSk=", "DEy53DxP2BdPEUmzxjw8L57LgnzX3CVTT/j7dbx5xQI=", "F0rWGhRIyJmiVBZHT0kwMB5cSUdSeeBjmmFt3EW8e1Q=", "GpYXe89NjYn3Wd9OwvPN4uqqKMF3zA+hOpgW1Jo40u8=", "Bm0EskMx1xzQ74BUvGDE/wUgLBJqIzwagkKs42C4owo=", "KkxPxuwLDPUhlXgoccbdOzgcxl9y4CrVJwN6Yqob2AQ=", "E6stE2zPN9RH6fLhSnztyV5yf4RG9tnX5Vr8ASGf1kk=", "ESFVL8omBhYZ0k2EPcgnacGwT87Cb1UZTC4+hprMapo=", "AO9lMyKxPWyIm8gXFcN9d6bNJn1ZXEqJCaVUbHyXz/E=", "DiVIPkWmZSCLJh2Lp0BR5kAMd21lJZXZhFrKNdijl9M=", "KfU23LnddoIkUmRlnhXYjjlaw9Td6S2MRkSNuXnuuok=", "KlbvnyxT/rrf2jNXXb29iFoSTieAu+oXDkVrqs4Ppb4=", "HINhx461z13s+3otF7XECfKuKZmkZ2Lo7kFiQKjLmvE=", "FRr/XziyCg/ARzCJqvAga4Po5op2RQe/09CrS+dDGcU=", "BMYYfkHtiB3BsjnIj3+dQ6n1L8jIts3R525HYVtR8QA=", "E7N72A9NJ/sQ2EMx9vttU0uBxh7RV3ZEnoAbfdycKWc=", "AaXFNic8LZ31eL+9MsF7eizjZkwqUgMskyHOscToqOQ=", "KrNWGDTKc4Na0F9desuVC0qaLGZrlybagyI5Blt8OwI=", "HU2OwpHnINsgD+bWhsDWE6yvavTpXTv2n37VFqWXtkY=", "BBKU0sxITSKPV4T+eRn9K7klNRJAoEtxFRTJyAtlrx0=", "FUrJjgFwjGEcT6cVmR8ASJj1eTnRJuOSBClx3ZDoH8Y=", "CzOdisyn1Pg+7dhAk671EFCzaEyI+LCwRSRWO8bqTaQ=", "CVXknmYQyUJUpPhM+6s0RZjw5x6v9Kfdge2VtQg5yC4=", "BnRqYVbrpUQmueIiBvFavKmm9B5vU1xvNSVAHqBlRiY=", "Dxj1oOzRQjxJbzggxUnCeDjleQ4r0KGWrJF8f/Mgd/s=", "BPbuyhdR9zCKxZ7/W+smHku1Y1g+3nvJKnOCI9b3bhM=", "K1aXM2TExPXBo+xNo83OA4gR6xFvs+RbwXaNJvwLN1g=", "Ejdp3UnVsFTc12uJgEsby44TkrOFcWpdg/62XUN/Ke8=", "IUe0JPxIyAqI7lK5EWmqzqmJ9kRkcRUJlCV7L7AcY+k=", "D9wfWFSLhXAabFUF6jMqKWR+bzStQkPC6lStiXzr5U0=", "Ejc6glH+oATfaKvPD3eG1Lzv8oxdu+DDlE9oXMCgsfI=", "IeT06l81+FutfqUv90LJ6KZCdWtq9EID3YofNcGpADU=", "FiQ5FtadLKPftHIiJNTEYrVzZkkvRekNioGTTxvDsUc=", "HvvkbdeleLT2b5rbyItDeKvCFWbhoEU8oTpBWcrASsI=", "B+pehTfPXdCIhgIOI6fzh9Ro1VJb5m+FO2csyWqIlpo=", "BajE+ZaLiqO3tHijD5pbY2UPGadefOEcqf4WwLdsALw=", "IPBXcSzCFlT7/lm9NF6NrD94GMcBuceILZ1Xtyoy6D8=", "BKEu3tqd/WiWcvjGf+4xY23NjojQHUkBm9kLM+sz22k=", "J+iNjBXzfc7kTx5UJaUd7L0TbOUJGmdn5J7JVEzNEBo=", "L+7Re4QoXtm4pcjF6VpB9m4JZhmncDIjF2xB7kM95NE=", "HtfMdu30XHxAQkFCD3Kc85TllCkRMSoNaXK4vVOv8rg=", "FXQumbm/oyMVf/jFhvVmDqxng0dhRM3K3yh0vkVGaxo=", "GqwoU4f2XoLIlfxoh930BXcQdFTG7AMXKE8DPyfQx4U=", "JYUcPIRdR5D53a29tgVzV4MuLnpJd19x7HWpZVTWfHc=", "FaWCFWXMLsLOeEV9sZft81O367osVSM3DdzMPZ8Uamc=", "JBHVekgTuZgO+n4xodtZZtz2TzYEQndQLxVIXyjHFyc=", "AC5vjWUgzUcT4zW4wLbS5kfpqY4S9M0lWIKLXvbLTJs=", "L/e8j0OAzemX2gC2FrD80a+PDpHi/h7XOYg0YJ4DFdI=", "ALmDG5SFJVle4CckRxvNGC6VIfa3u2jx6Tvk/rsNPL4=", "Ci9TdouOv2qGkTsOV8BOARykCGSKR0OofXetvwycNRI=", "ACSBVhQv0Dc6R5+R/yOelg9Zn/fpS+abfyopAwXhGY0=", "Fx1WILh7+xMoz4wCqz8MmjlxlqpqVCwjUOtRKisrzak=", "FwpPVVNvfclwCHx8ENb612DJUhct1U3ZnRBF5Ow0qAg=", "KaujP3mf5mwu8xNK6gQzbsw344wc0hG6SC7KF+Lb+uE=", "HpvBeaT911j90bsZRQiNR+cNEUoD9qDotbplA2nmSXM=", "HdJpeZtmD61Y9/SJLfsLWv6q2GmpxLRPnJ4cQ72vjwk=", "Is28i3ARetFAEYHQLhVFnnzNQm/oacfJXR3Syw8krzg=", "DvBC5FR3HFM6n1elXFA/zv0xUPUu2Up81bqTucfazv0=", "EWCeBq1sj+Lyh/MDYDfohRMY6LCKA1mgOzBP/KYugoQ=", "EWbZ5VRhbbqedT7qQnwXt/7NWMB23+QnCLCPW3g6qa8=", "LeUpiUMahZWTQTAmNUQT2xd/v0zSrAtW+FWoiDV+5GY=", "MAbrT/x6hYGabaSS86isHfUa7lsXuOiddL8Bz19x6a0=", "KvQfu2G6ioD9z2//nj9vQimT/o8KRjn5YjRMgiUUUIY=", "EZ5oTeR2FV/lprQajryF24cYqyeInoXngbIUus5IJ8M=", "GDW3huLokl4Yi+pZrjY1N7USSMI4KPBHz/eEuXs/2AA=", "KCAaNMWU36NNeUmWxkM6INFSusKnkFySbEDihasy7rY=", "CD79eifRdRCU6A/vr3iwAIZMgutXEYdySnYfiMIsxOc=", "C2+Io1dxmVJhWOYc7qJ76BHBbfd3TdhRngeVZPYf0Ts=", "Dsho5tFeUdlkT2bh1kcalFiVEcoA0p4QFDkObuQlT1s=", "KvM+P4ZncScawMmz7S4RQuzT50uTnNQNANk3q4TJhZE=", "C1ICEfkEtefQm12WHGrOdzRWjFR91oWLNkzl5HlR8Xg=", "Cy1yLQkZoarY21jxAGKpLqDFasQnDoIsyiKGIBiKHUA=", "H3kNTX+M8JTZgM6zfCRT6Ve1SpmRyji74AYdHtblYtQ=", "AXHrld+/fR6uqXzThfeAFQiFwWI1oqao2pLOsB5QQjM=", "DC0OO1/VdUkym/aIXaZrm3kLQN79LIZQdiMFOBsWiHM=", "EWL7KGicJxVOWoIotOcrN3y8r6WJ4oPDXTgDBUQHoY0=", "LxRZtl3uRBtkrThqkegxDygsWpKonhmSFiPvgklxG8A=", "Hm/zIWtojD2ZbXQ2fVzUwbxInUZ1TrcSwkP3DRtTz7s=", "AcqL5zgyuNBoFIfSfRV4AtdBpvNs3CoFdogfkyZHiHU=", "H3c1cG/+n8WG+XbVvfIj3GgChggLEM6gC5td4xX5ZQ4=", "JSK2D06jMHZAoMLc4EH7qSGsEKPV8JbvR0XKg4KF8Bk=", "I/C+4AGxAp1SVQdd3JV/gzQYytT1K2w/jOFsI1VyV1s=", "K8Gui43buB/KrC1EVV7VaF0UJjPp35BfZtlAEJMILVk=", "D5QGuCllZKNzBFB7jbo+0WI3EnOgex/JgBH81q1yIF8=", "I2Co6wzH3vpntymY3pBxThfnWxdKUu5KyxJsjNmV8Kg=", "FYcaXN3q2XaATIA8uu8lXrSBWl6W34sAbcu8J2f4iUg=", "GTpWdmmY7p4KhlLdLzsdoDYvT1T3I3lUT5V8ze77Qg8=", "KjlKQ5NPhpgvm+Vv9PqxcDsuY8itM0g05DCYBed3rg8=", "GFmVTP64aV8+i2NdyzRRkoks0RIjRDuntBZuiHbA0UI=", "BOEYF2MFDlgBNETby5nxkCsRvCXZC73KQI04GfT+0ys=", "D9slPe6Dhp1AwzXqZN6MW7EOuC2wi16LH15VUr/QXyM=", "BYy+ippQJ72qTvtiOt6tYnXwhobxwImEqdfFuum08cA=", "E4Ltzplx4YZJfq2xrrH1KyO0uDvvAjqw0VIotMzspZo=", "A0ZJkPBFxu4IGcpR/RGwvn9huOuZ8Ut34eZjRgHZ6LU=", "I/e/yHINwpb/8ztB+Y/4PG/KtGBdsutaqlvBN663Clg=", "ClmhWOPuwhF+bpTn8OnezxjD/9XhUxqSGWNhWLuvYvI=", "BuxUyAOBwFK1i/I7MS/9POLE66BlQgr49MI+0Adf0Hs=", "EYhy3IMuDrVHa1ZkjoZ+yLCTQPenvLG0li8P+e0fnQE=", "E9afoSfYNBZa1cfLp61Z7VLgsPDkLX/qleGQa1IJIbE=", "FpoXf2PqaBJwscaHenPSG94UOUL7cdxV/YpJ8Z8Qx3s=", "BO9RWRxurZfvQvKHrc5A2Tq+sDK5IvZv+36aWnRQVE0=", "JW4XWh3AeTkOzXynA/suOxnsYYBdTwPO1fRe5t0Paew=", "MBAtKGNqvV/l8q9BL/YAT3XMNg0yBd0toAKBPT4s7rI=", "EJmOQt/NO78cBxS8c+sb9ARDo/qZvvSjH9Mb4YL8x5I=", "GT7djp/PPXYl+n0ktZih2J8zYur01YLv7K12+HnjaGA=", "GBaK/TTy2RXQNozoC3szR9HHpWHOYRQl8mZNeqUfC10=", "KTg8AevTtqsMAXZW6+ZYtqMo7He8M2JuKeLpWzPqYRE=", "EGRtLyYD3jmh9K5ed3GmSnAttuhvt2q2AL9XP5AQxxE=", "C+teB9GycUX1dfE5WlW/Ey+QwltA2ns4ZNAkLcsRF/s=", "FtaFJSB4wTPcDT7K1itciDD5W7LlS1mr3/vwGNlvozY=", "Cmq9HYM5OPM8dBVOBAS0tApVW7vsId36/Wct1iBH8Bo=", "GmefXTbre1yOoSpMLe3I/rEt/+7EUDFycKbxmzTPGGA=", "CYD7IzvUVsI5dNUODr/eRyakI+raTo9v+8dZLj8bk9Y=", "FhtCIy5huEy/GBCvk6OPwM7OPVYoySggA+ustcMSxys=", "CtoQqQx/BSCVD31Hpg1eakk/CXh/FWTl0JID20feGgs=", "GnMNNyMQuoIyA0WimsQjjtPweoorThIbtQ3bmvQH9FE=", "LIEg8mjvBU+BcGTDad2n6pCDd/6rpcTf+9oQ71joxVY=", "HHyIJPdYdT+lfAB4nGhCF7kw6VMTvLc+bnuGSaSWj3A=", "LNntMfX4aRyOOeQHenT6oPQArYtJHrP3tHsn+j/Rz3c=", "I/9PnUaBNFfPYNkvV2GDmaXgIqwyHKVQhUriORiiLuo=", "CZRaXRR6T2bO7OZAXd3Z0K9aLFEDUpQH3/HqWPGAQm0=", "GI2cUoAl1MK2dmDGt3G5D3x9puqinT8mim3SI+xvxjA=", "MFDjeZZZa3+B9oMRQx2HNNun2SbTYzWV4MDY3fTw9H8=", "Fa8RaTloMKkWAMqBAsNcQmzq5UYeP5XYnYKVGNMK/Xg=", "HabQmIVDLqmgbZ83+HPZhdrpM+NRRmspBChNozINisw=", "J5bqkNJpryn1+KzzOSESTk5PrT2+ZYlF5UbuQR3aqcs=", "IC190doPa0sDJcizMHdC8B4VYS7I6TBKfLAxngHTLWA=", "CW1nkNBbt1kVapUromPWcqLX+ceI9Mgxop2s5MD4vl8=", "BU76H2Ww/OKDgIllJ12He0ONojzlsT4ZY3mMsUR9JaQ=", "GxYvg9kX6T7bMwjCmALeudiqaQETsuFIZMz24Y5BZfE=", "IeUkHhJWTdb9nxzdKg3jnu3+/BRmzFaOxc63RaBQbtw=", "HPtWYujPWskiaoDuF7Nqvstzq1+H4WGSe0NJ4Q5L3wg=", "DyEXfjAqdxu65tjR7LNztiyZrzRiIKwBKcU/Zm6yQQA=", "FnFSI3RgaZKv+w3X9xsSvsQjau3mKQVGvO9+H1FcIyA=", "D6PsW5SIJZwutM8kUBv62b4uyeQsXMjM1BnSppLK2HA=", "GTwOBOC9KYNXyyZsFQYIDtNu3OhcZIzAhejFexq1S7o=", "ECrfjvdHNaJ+kSgwbcvDyZ9vcpHNQGV4zhTqKtq6aPg=", "D+CveFjkmFnipU1vGtlFsTFqokv73SOuQKbQy3DD6rE=", "IW9nF7vH3tsIU2oiIIQ/Ti2l8dqp69796KXqc0R5jSI=", "HaVcyQDw0h9KPmlDkZGKGzwjsqx3PGs++I4uQigyUWE="],
      M: [["EJt/QRug5MmytwyvXDansZS+fBGtJDeL/ttoWSuoEYs=", "Fu1B4Tu5wMZq4RlCT928vJMU3J/b3upV1sZFQ9xJA+A=", "K5C7oA/KBYn2F+fcv+guDfcGq2QM6yR7eRqTt042c20="], ["KWnyfu0xpIC5w2x2Q3nbyizI/dFBXD3e1ilAvN4L13E=", "LiQZ+ewC7DlMmHHIMpY9wbiddDyMe5ZAKbIxFoex/iM=", "EBBx8AMjebaXMVh2aQ8FPRSNThCfX7BlyKrMVaD4m/o="], ["FDAh7GhqPzMNX55lRjgGXObNeeKMWzdTMmJE7mWhsac=", "F2zAKWla0CWCpw7/CKb9mdBX4S5Y59e2sWzfq8juKRE=", "GaP8ClZwK/QXun/uOAJZP6ZERwMHBD93cyec1x0l1eA="]]
    };
    exports.default = _default;
  }
});

// node_modules/poseidon-lite/poseidon2.js
var require_poseidon2 = __commonJS({
  "node_modules/poseidon-lite/poseidon2.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.poseidon2 = poseidon22;
    var _poseidon = _interopRequireDefault(require_poseidon());
    var _unstringify = _interopRequireDefault(require_unstringify());
    var _ = _interopRequireDefault(require__());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var c = (0, _unstringify.default)(_.default);
    function poseidon22(inputs, nOuts) {
      return (0, _poseidon.default)(inputs, c, nOuts);
    }
  }
});

// node_modules/poseidon-lite/constants/3.js
var require__2 = __commonJS({
  "node_modules/poseidon-lite/constants/3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = {
      C: ["GbhJ9pRQsGhI2h05vV5KQwK7hnRO3CYjiwh44mntI+U=", "Jl3f4SfdUb1yOTR7dY8KEyDrLMdFCswdrUf4DI3PNNY=", "GZdQ7EcvGAng9mpUXh5RYkEIrIRQFcKqPfw2urSX2Ko=", "FX/z/mWscggRDwal90MCsU10PqJQZ/D/0DL3h8fxzfg=", "LknEPEVp3Zxf01rEX8oz8QsVxZBpL4vu/hj0iWrJSQI=", "DjX7iZgYkFINSu8rbWUGw8svC2lzwk+oJzE0X/otHx4=", "JRrUfLFcTxEF8QmuXpRPG6nZ54BtZn/+xv5yMALguZY=", "E9oH3GTUKDaYc+lxYCNGQfi+tW/dBeXzVj+jnZwi304=", "DACbhOZQ5tI9wAx9zO90g6VTk5aJ01DNRue4kFX9Rzg=", "AR8WscY6hU8BmS45VvQtiwTrZQxtU16wID3sdL79ygY=", "DtaeXjg6aI8gnZpWHap5YS8/eNBGetRUhd8HCT82dUk=", "BNupSnsM6eIhrK1BRytrvjrsUH9es9M/RjZyJkyfeJs=", "Cj8mN9hA86FusJQnHJ0je2A2dX1LtQv3znMv8dT6KOg=", "JZpmbxKe6hmPihxQL9s4+jmx8HVWlWS25UpIXRGCMj8=", "KL90Wcmy9MbY59BqTuOkf3dF1CcQOOUVejL99+3g1qE=", "ChypQfBXA3Um6iAPSJvo1MN8hbvM5qKu7JG9aUFDJEc=", "DG+PlYvg6TBT1/1PxUUShVU17RU58FHctDom/ZJjYc8=", "EjEGqTzRdXjUJugSisnZCqnooAcI4pbghN1X5pyq+BE=", "JuG6Uq2Shdl906tS+OhACF6PqD/x6PGHewdIZ80t7nU=", "HLVcrXvRM94YpkxcR7nJfL5Ni3v54JWGRHFTfmpK4sU=", "Hc1z5GrNj44OLHzgS95/bSpTBD1QYKQccUPwjm6QVdA=", "ARAD4y9tnGb1hS8FR0pN7wzaKUoOtOm5sSubtFEuVXQ=", "Kx6AmsHRCrKa1fINA6V9/rrf5ZA/WLr+18UI3SKHrow=", "JTneF4W3NZmftNrDXuF+0O+ZXQWrL8X66qaa6HvOwKU=", "DCRsWi747gEmSX8iKz4KDvThw9QchtRuQ5gssR13lR0=", "GSCJxJdPaOlUCBSPfAYy7bsJ5qatGhwvPwMF9dA7Uns=", "Hq4K2KtosvBqDuNu6w0MBYUpCX2RCWt1bY/cL7WmDYU=", "F5GQ5dDiIXnkb4KChyq8iNtuL9wN7pnml2i9mMXQa/s=", "KbueLJB2cyV26agcesS4MhRSj32wDzG/bK/nlKmzzRw=", "Il05TkIgdZlAPv0MJGSpDVJlJkWIKqw1sQ5ZDm5pHgg=", "BkdgYjwlyM91PSOAVbREUyvhNVdFHAh94J79RUsj/Vk=", "ELo6DgHfkuh/MBxLcW2KOU1n9L9Cp1wQkikQp49rW4c=", "DgcL9T+EUbJPnG6WsMKoActRG8DCQuudNht3aT8hRxw=", "G5TNYbBRsE3Tl1X/k4Iac8zWyxHSSR2Kp/khAU3iUvs=", "HXyzm6+4x0ThSHh6LnAjD51OkX1XE7sFBIe1qn10Bws=", "Lskxib0atPaRF9D+mAyA/4eFwpYYKfcBu3SsHzA7F9s=", "LbNmv9020nemkruCW4YnW+rEBKGa4HqQgupGvYNReSY=", "BiEA60hdsGJpZVzxhqaFMphSdUKEUDWa3JnOxpYHEbg=", "B2HTPGZhSqpXDn8egkTKESAkP5L6WeT5AMVnv0H1pZs=", "IPxBGhFNE5ksJwWqA04/MV14YIoPfeTM96cuSUhVrQ0=", "JbXABKS9/LWt2exOmrIZuhAsZ+iz7/tfw6MPMXJQvFo=", "I7GCLSeO1jKklOWPbfb17QOLGG2EdBVa2H59/2Kzf0s=", "InNLTFw/lJNgbEupASSZvw8U0Tv8/MyqFhAqKcwvaeA=", "JsDI/gnrMLfienTcM0kjR+W9/0Cao2ECVEE9P615XOU=", "Bw3QzLa9e7rojqwD+h+7Jhlr4wg6gJgpu9Ym3zSMytk=", "ErZZW9sym2+wQ7p4uyjDvsLApt5G2MWtYGfE6/1CUNo=", "JI2X1/dig9Y77DDnpYdsEcBvypsnXGccXjPZW7fo1yk=", "GjBtQ51GOwgW/G/WTMk5MYtF63Wd3eSqEG0V2b2bqqo=", "KKj4Ny48ONrO18AEIctGIfTxtU3cJ4IbDWLT1ux8Vs8=", "AJSXVxf5qKi7NRUvJNQylAcc4yDIKfOIvIUhg+Hizn4=", "BNXuTDqnj32A/eYNcWSA01k/dNT2U66D9BAyRtsujWU=", "Kmz16aoD1DNjSa1vuO0iace+9UuIIsx20ISVwS794Yc=", "IwTTHqq5YLqSdNpD4Z3et/eSGAgI/W5Duq5I1+/Lo/M=", "A/2ayGWksqbV5wCXhYFySb/win4HJvy04cEdOdGZ8LA=", "ALclje1Su9oiSEBNVe5QRHmK/DogkZMHP3lU1NY7C2Q=", "FZ+BraB3F5nsOPyi1L9l67E9OnTzKY2zYnLFymXpLZo=", "HvkOZ0N/vIVQI3p1vCjju5AAEw6iXwxUceFEz0JkQx8=", "HmX4OFFeX/AZa0mqQaLSVo33ObwXawjslaee2Cky4w0=", "KxsEXe86FmzsbOdo0Hm6dLGMhE5XDh+CZXXBBoyUwz8=", "CDLldTzrD/ZAJUOxEJIpwWXcLXO+9xXj8cbgfBaLsXM=", "AvYU6c7fs9xrdirgo31BurG4QcLotkUbxajjw5C2rRY=", "DiQn04vUamDdZAuONiytlnNw67d3vt/0D2oL4n5+1wU=", "BJNjC3xnC23rfITUFOfOeQSfDsCYw8fFB2i74pIUpTo=", "IurRAOjkgmdN7NqxcGbFomuxUVNV1UYaPcBsyFMnzqk=", "JbPlbmVbQs2q4mJu0lVNSFg/GuNWJtBN5QhOC20qbxY=", "HjJ1KtqINu9YN6bN6P8T27WZwzY0nkxYS0/cCgz2+dA=", "L6KoccFaOHzFD2j288NFWyPACZXwUHj2cqmGQHTUEuU=", "L1abippEJMknjh23MR6In1TMvxBmG6t/zRjnx6fYNQU=", "BEy0VREKj91TGt5TAjTFGKffk/czL/0hRBZTdLJGtD0=", "IngI3pOQbV1CAkYVfy5CsZH+jJCt/hGBeN3HI6UxkCU=", "AvzKKTTgRrxiOt6thzV5hl0DeBrgkK1KhXnS56aAA1U=", "DvkV8KwSC4dqvMzrNEodNrrT88Wrkajdy+wuBg2L76w=", "F5cTD0t6Phd363V7xvKH9qsPuF9r5jsJ87Fu8rFAXTg=", "CnYiXcBBcK4zBshaurWeYIx/SXwgFW1NNsZoVV3sxuU=", "H/+57BmS1muh53p7kyCa9vj6dtSKy2ZHlhdLUyajGlw=", "JXIcT8FaPyhTtXwzj6U42F+Pu6bGucYJBhGIm3l7nF8=", "DIF/1C1fekEhXj0HuhlyFq20w3kHBdqV62O5gr/K91o=", "E6vj9SOZFdOffhPCwklwtt+M+GzgCiIAK8FYZuUrWpY=", "IQb+6lRiJOoS7385mHpGyFwbw9wpvb16ks1grLTTkc4=", "IcqFlGinRraqp5R0o32rSfHKWijHSLxxV+GzNFuw+Vk=", "BczWJVwebwxc8fDfk0GUxikR0U0DIWYqjxpImZ40GFs=", "Dw40pktwpibkZNhGZ0xMiBbE+yZ/5E/m6ihnjLCUkKQ=", "BVhTGk4lRwxhV3lMo20Olkfb/P41DWSDj1saii3g1L8=", "CdPcqRc+0vrO6hJRV2g9GJJMra0/ZVpgty9YZJYfFFU=", "AyjL1U6MCRNJP4Zu0D0hi/I/ktaKrsSGF9THIuW9QzU=", "K/ByFuKv8KIjpIexpwlOB+eee8yXmMZI7jNH3VMp00s=", "Ha80WlgAa3NkmcWDy3bDFtb3jtam3/yCER4Rpj/kEt8=", "F2VjRyRWqqdGtpTGDhgjYR7zkDmy7cf/OR5vIpPSxAQ=", "LvHg+tnwjoeju15H1+M1OMqWTSt9EIPU+wIlA1vT+Ns=", "ImybGvlbq88XsrH1fHMQF5wYA97Fro8KF3ntNsgXrio=", "FLzjVJzD23QoEmtMOhWuD/gUjInxP7NdNXNOtdStDe8=", "Lev/FW4na7V0LDNz8mNbSLjpI9MB83L45VDP1ANCEsc=", "LUCDz1qH9bb8I5WyLjVrZEGv4baynEet19BDLR1HYMc=", "DCJbe80Ev5w0uREmL9ycG5G/eaEMAYTYnDF8U9cWHCk=", "AxUhadTz0G7DOnm/rJGgLJmqAgDbZtWqe4NSZfnJyPM=", "C2GBGpIQvniwWXRYdIbVi93I9Rv9/ru4ev6LeqfTGZw=", "ID4ADK0pjar366alxZIYeLiuSKz3BI8WBG1jelM7b3g=", "GkS/CTfHItE3ZnK2n2yWVbp+44b9oREsB1cUPRv6kUY=", "A3a0+uCMsD01AK/sGh9WrLjg/edaIQbXAC9ZxWEdTao=", "AHgK8socrWRlohcSUP38Mtb8JB0yFBd/PVU+82MYIYU=", "EHdNmrgMJb3rgIvt/XKo2bddvhjVIhyH6dhXB5vcMdU=", "ENxunABuo4sEseA7S9lJDA0D+Ykpyh1/tWgh/RnTtug=", "AFRLgzh5FRiyx2RaUDknmLIfdbtg41lhcAZ9ABQcrBY=", "IiwBF1cYOG8uLoLrEieJ41LhBaO4+oUmE7xTRDPuQow=", "KEDQRem8IrJZz7iBGx4PRbd/e9t/fitGFRoUMPYI48U=", "BidS+G7r4RoAnJN+RowzWwRVRXTCmQGWUI4B+lhgGGs=", "BgQb2sSCBayHrbh8IKR4pxyZUMEqgLwKVajoPqrwR0Y=", "BKUz8jbEItH/kAo2iUmwAix6KuCS8wjYKx3Lv1H1AA0=", "E+MdemcjL9gR1qlVs9TyXf4GbR59wz3wS95QorLQWyo=", "ARwmg66R6037wT1jV+hZmpJ50WSP8sldL3mQW7E5IPE=", "Cw0hk0a4V0UlsaJw4LTLpdVsko4+LCvQoeyu0BWq9q4=", "FKveyNucbclwKR7mOGkCCbZQgHge+f0T2Ex6cmtfE2Q=", "GgtwtLJv3Cj80yqj0mZHiAHrEiAu9HztmI0DdmEL4QY=", "J4VDch+W0TB7aUP5gE5/5WQB3rLvmcTRJwSILnJ4tgc=", "FutZSUqXds9XhmIU29FHPz8HOKMlY42Lo2U14BHVglk=", "JWemWKgf+0RPJACI+lUkxpqeU+6ra3+MQcNHnc+MZEo=", "KaodfBUemtCnqznxq9nPd6t44CFaVxWmuIKt6EC7E9g=", "FcCRIz5g7+DUu/zis2QVAGpPAX+ahTiM4ga5H5nyyYQ=", "Fr19Iv+Fjl4IgsLJmVWNd+dnOtXxkV+f62eagRXwFM8=", "AttQSAoHvg6ywuE+1u9AdMAYLZtmi44I/+Z2klAEICU=", "BeSiIOajvJ97aAbsnWzboYYzDvK/ettME7qGY0O3MRk=", "HdoF68MBcLyYy/Kl7jtQ6LX3C8Qk05+kEE038cvPekI=", "AYS+9yGIgYf2Rbb+42Z/PJHaIUQU2JulzTAfIrDeiZA=", "FJijB+aJAAZfXoJ29irvHDdBS4RJThV3rRptZDQbeOw=", "JfQPgrMdrMT0k5gAudLD6s73N7j6sfhk/jNUitRr1J0=", "CdMXzGcCUZQ/b1hiow0uqegwVs5JB7+7yx/zHOW7llA=", "L3fXd4bZebI7pM5KTBs70KQRMs1GeoarKbkTts8xSdA=", "D1Pa/VNan0Rz3CZrb8zGhBu9M2lj8lTBUvieeF9ym78=", "JcH9cuIjBFJlw6CZ4XUm+g5pduHAC68W3pbehd7vL6I=", "KpAsiYDBf6rjaNOF1S0WvkGvlchOrqPPiT5l1s5Kj2I=", "HOFYCjRS7PMCh4yJdrgr6WZ23RFNHcjSVSdAV2L4NSk=", "JKYHP5Gt3DOkmh+jBt8AiAHF7FaWCQNNL8UPfw9NAFY=", "JeUtvWEkUw2fwn/jBtcdRYPgfKVUtdFXfyVsaLC+K3Q=", "I9/648Qj+nqTRo28z7AphVl0vk0KeymUZ5blts1w8V0=", "BjQto3DMDYxJt3WU9rAnxIBhXVC+NiQ6mVkbyZJO1vU=", "J1QRQoEoZUa3XwnxFfx1G0d4MD0EBcG0zH3w2On2OSU=", "FcGehTTFwaiGLCvB0Rnt3qvyFBU4M9e9tZ7hl/gYfPU=", "Jl/gYnZtCPq0x40NnvPKvjZvO+CoIQYWebSz0td9Xz4=", "E8z2idZ6PsnyLLfNCsOjJ9N3rFzQFG8Ejev9CY0+x74=", "F2YvdFZ4lzn4HNOXSCeoh9kqXgW98/5rn7zMpFJKrr0=", "IbKcdjKbMcjvGGMeUV9/L4LKalzKcM7k6An9YkvnrV0=", "GBN0eDgqrbpEHrl/4nkBmJwGc4FlIVMZk56xewH6l1w=", "K8B+or+taOjcck9f7ys3wtNPdhk1/9O3Oc7sRmjzfog=", "LdsuN29U1kpWOEBIDfmT/rQXMgPCvZStDmAgd675oD4=", "J361DyuqcGEGtByyTGAmCeiiD41y9hNwitslNzWWw/c=", "DU3kfhq6NCadDGIJBPAaVrM/xLRQwNtQu3+Hc0yaH+U=", "C4RCv+nkobRChnO2vT7qb59EVpcFjxNKrpCNAnminww=", "Ef5bGPu+oahuBpMMuJ99SibhhqZZRelldCR/3bcg+PU=", "IkAm9t+vceJNJdj22fkAId9bd03K1NiDFw5K2JwzoNY=", "CyymqZn+aIfgcE2tWNA0ZalryeN9EJH2G8n5xiu+uCQ=", "Ihtj1m8LRfnUDFQFOiigax0KTOQdNkeXoafgyWUp9CE=", "MBhcSLey8dU9QSCAGwR9CHSTvOZNTSSu3OL0g2u4StQ=", "I/XTcqPw48upieIjBWIn01MzVvD6pI8n+CZzGGMqYfA=", "JxZoOzLHVf0b+CNeoWKx84jh4AkNBhYujm375DKPPjs=", "CXdUWDaGb6IEyh2FPsCQnj0UB3DICsZ9yTDGl0jV1Lw=", "FETo9ZK9v9gCXZGrSYLdQl9RaC0xRysF6BxDwPlDSzE=", "JuBLZenKgnC+t0ocXLj+6L4/+/5YP3ASoA+HTncY++M=", "IqXC+oYNEf407kelzZ+GmAD0j0/r4prW32mBb7GpFNI=", "F0tU2ZB9j1xq/Wcqc49Cc37DOPOglkxin3R03UTFyNc=", "HbHbiqRSg/MRaPpmaUzygI0hibh8jIFD1WyHGQezm4c=", "FTC/D0ZSfoiQMLjHt9/eEm9l+vjM4KtmOHNB2BPRv9E=", "C3P2E5kyKfWfAcHOyHYOmTbq2e3I8oFIiTMKLyut5Fc=", "KcJaIv4hZGBFUqrqN39EjVh6uXf8gid4e9LcDza89B4=", "KzDVPtF1m/uFA9pmySz0B3q+gnldwnKzd99X13yHVSY=", "EvbXA7VwKqt7e35pNZ1TonVsCMhe3nInz18KKRZ4fNI=", "JSDhgwCv2j9hpAoLiDcpOlWtAQcQKNSEH/qaxwY2QRM=", "Hsna6oYJcezdqO1PNG+pZ6ybxZJ4J3OTxo8J+gO4uV8=", "Cpmz4XjbLi5DL1zVvvj+RIO/XL9w7UB8CKriS4MK1yU=", "B82p5j22458Ia4m2AcK75AfuCrrDyBehMXq618V3hJI=", "CMnGWk+VXolS1XGxkbsK20m9gpCWMgOzXUiqs4+Pw6M=", "Jzf4zh1aZ7NJWQ3b+9cJ7Zr1Sio/JxnTOAHJwXvdnJ4=", "EEmmxl/wGfDSh3AHJ5jot5CUMr0MEpgTqfF5umJ/fWo=", "GLT+locyxGLA6lqb6yfOy96IaJRP32TuYKUSI2Ha7ds=", "L/K2/SLfSdJECy6u7vqMAqb0eM/PEfGypPdHNIOIXRk=", "LsXy8ZKP6TLlbHibj2u8s+i+QFfL2NvRihs1L1zvQv8=", "JlpezNi5KXXjOtn3W/NCbUJKTGp3lO4/CMHRADeOVF4=", "JAXqpMC94RKdYkK7WtoOaHeOZWz8s2a/IFF9od/UJ5w=", "CUyX2MGUxC6IAYAEy78rxf21GVXYstZrdt2Yotv2BBc=", "LDDV8zuzLFwiuZeaYFv2TVCLcFIh5qaGMwyWJcKv4Lg=", "AadWZvYkH2gl0BzG3LFiLUiG6lg+hymeaqL8cW/bbPU=", "CjKQ6DmBE+pNEqwJHoe+fG01mrmmaXn89Hvy6H04L8s=", "FUrenKNuJo3+s4RhQluw2MMSGdj6Dfx17NIb9pqgzHQ=", "J6qNPiU4DAsbFy15xvIu7pkjHvXcadjcE6S1CV0Ch3I=", "LPQFHmyrSDAaiy47ymCZ11a730ha+h9UnTlbvL2AZGE=", "MB5w9ynzyUsdP1F93/nyAVEx/quK+l7rsIQ9f4SyPnE=", "KYvrZPgS0l2LTZYgNHqwIzLcTO8ROuYNF6jXpMkfg7w=", "GzYucqX4R/hNA/0pHDxHHtHBShWyIWgKzxGj8C5GqpU=", "DciiFGEQwLN1QykCmZIj1aoe9ueOHl68vB2bpB3Bxzc=", "CkhmOzTOXhwF3JMJLLaXeMshcppy3cA6CK+h65Iv8nk=", "Coc5H7HNjN9glrZKgvnpXw/kbxQ7cC10VFuzFIgQmO4=", "G1spRvfCiXXwUS/45so2L4gm7dfqnCnzgrqKKgiS/V0=", "AQAc9RKsJB1H6+Ijkhm8ahc6i7y4pbmHtOrB9TMxW2s=", "L9l3xw9kXbT3BPp9dpPacnrAk9P7X1/rxyvrF9g1ijI=", "I8ADmj+rStPC18xogWTznnYdU1XAVETZm+djqXeTqcQ=", "GdQ+4MYIHAUsnA32Fh6qwa7DVs9DWIjnnyfyL/A/ol0=", "LZsQwvLnrBr93M/9lKVjAovym2RtAggwkZ+dXKHO/lk=", "JFfKbC8qow7Efkr/Wmb1zieZKD4Wb8gc2uLyufg+Qmc=", "Crw5L+he2oVYIFkkRQlAIoEe6Gdu1vDDBE37VKfBCzU=", "GdLMXKVJ0dQM68038+pU8xFhrDmTrPMQHSwrww6sHrA=", "D5euMDP/oBYIqvsmrhPNOT7g5OwEG6ZEo9OrVG6Yycg=", "FtvHj9KLf7gmDkBM8dQnp/oVU36k4WjoihZkluiM/so=", "JA+vKPEUmbkW8IX3O8TyLu+DROV2+K09GCeCA2bV4Hs=", "Chuwdao3/wz+bIUx5V4XcOq6gIyP222/RvjKtY2e8a8=", "LkfhXqSkf/GmqFOq86ZEyjjVsIWsEEL9xKcFp84In00=", "Fm5b8HM3g0iGDKSpwJ054Wc6sFmTX03zX7FFKDdXcrY=", "GLQtf/3S6k+vI1kC8FeidAyszNAnIzAB7RD5ZTjwkW8=", "CJyxsDIjj15JFHiOPjx+rU/DaAILPtOCId6rEFHDdwI=", "JCrNPrOi9yuvfHB23RZa34n5M5x7lxkh2ecIY0Ud2NE=", "F0+7EEpO4wK/R/K9gvzolurJoGgoPzJkdK+GBFckXDs=", "FzQOcdlvRm1h8wWM4JLGfSiR+yuzGGE/eAwnX+ERbGs=", "Ho5ArIU7fULwDy44OYLQJPCYufj9RVlTov04DE339rI=", "BSmJjcBkmQfh1NXihLjRB1GYxVytZuipv0D5KTji6WE=", "IWJ1TbC6oDC/feW7eXNk3OjHeqAX7h179l8hxNTl348=", "EsdVNpjEv2886yUK4AxYwqn5KR773kyEIb70R0F1LsY=", "KSZD47ogJq/8uMUnkxO9UaczyTNT6dnHnLcjE2UmUI4=", "AMzxPgy2+dgdUpUb6pkL1bbAfF2Y5m/3HbbnTVuH0Vg=", "GF0eIOI7CRfdZUEozy86qrZyOHPLMPwisPhsFatkW0s=", "FMYcg21V0990K98Rxg76GGd4494PAkwPE/5T+Nh2Th8=", "DzVoQbP1Vvzl2+RoBFdpHCkZ4q9TAIGE0D7hGV1yRJ4=", "G4/Z/zlxTgdd8ST4h79As4MUM3T9IIC6DAprbo+ls+g=", "DoaowgCcFAyj+HOSTiqqFPw8iuBOnfCz6RA0GHlvYCQ=", "LmxeiY9VR3cOVGKtky/N0jc/xDggyisWsIYUIeeRVcg=", "BdeX8as2RyN8FPnR3wMryf+f4aDs03eXLOX9WgwBRgQ=", "KaMRBGOlqudsPRUodZgdDB2vLc1lUZ71yokphR2owAg=", "KXTae8B0MiJzw6S5HAU1TNxxZAqLvR+GS3MvgWOIMxQ=", "HtD7BmmbokmyowYhwF6xLKKcuRqggsi/zOnFIoibR9w=", "HHk+8NzFESNlT/JtjYY/7q4p6MVy7KkS2AyK425A/ps=", "HmqsHG090xV5ViV9PSNO8YyR6CWJp4Fp+7Sodwl33C8=", "GiCtp1diNO7mJz3W+piyXtA3dICApH2Uj82jMlb7a/U=", "GRAz1thc6qb8epojpv2ZlmQtdyBF7OUTNdSTBnKK+Ww=", "AG5Zedp+fvU6glqm/dw6v8dvIAs3QLiyMu9IH10GKXs=", "Cw1+acZRkQu+8+aNQX6foPvVf1lsjymDHv+MAXTNsG0=", "Jcr1sMG5O8UWQ17AhOLs1ErEbbuwM8URLEsgolyc350=", "EsHqiSzDHg2a+LeW2WRYcvf3dELWL9TICFsvFQ9yRyo=", "Fq8paVFXq6m4u+Ov6yRf7uWpKdn5KLm4Heba3HjDKq4=", "ATbfRXyAWI3Wh/svO+GGkXBbh+xaTP3BaNMQhCVrZ9w=", "FjmijFtMgRZq6phPum5xR54Hse+8dENNuVooUGDnsIk=", "A9Yvv4L9HUMT+OZQ9YfsBoFsKLcAvcUPfiMr2bXKm3Y=", "Ea7rUn3IzkS00Uqt3KPP4vd6HkD8bal8JJgw3h7f3lQ=", "E/m5pBJ0EpR5xeYTjGyO42pnDmvGjHpJZCtkWAe/yCQ=", "Dkdy+j11F53ISEzSbHwfY13e7tepOUQMUGyui3680Vs=", "GzmgDLyB5CfeS97Fj+vo2LWXF1IGemErOfxGpoxdTbQ=", "K+22bhrVodVx4W4pU/SHMfZkY8LrVKJFRE0cCjolcH4=", "LPCgmlXKk6+KvQaPBqcof7CLGTtghYKic3nONdqRXew=", "LRvXj6kOd6qIgwyr/vL40n0aUSBQun2wdTyPuGPvs4c=", "BlYQxvT5JJH0I9MHHrg1OffA1JwThwYuYw1/0oPcM5Q=", "LZM/8ZIXpVRQE7Eoc0Ur68xfmWkDPxXsZC+0ZL1gc2g=", "GqnT/kxkSRD3a5Kz4Tsw1QDa5TVOeVCMPEnIqpngJYs=", "An7wSGnkgrHHSGOMWREcaycJX6dz4aygeM6h8chFC90=", "K31STFFyy7sV204AZoqMRJ9nomBdnsA4AuP6E2rQuPs=", "DHw4JEPGqnh8hxjYZ0fH90aTriWx5V3xP3w8Hdc12w8=", "ALRWcYa8P3xip7Vqz092IHofQ8LTDQ/kpifc3ZvXkHg=", "HkH8KbglRU/m1hc3/gi0f7B/5znkweYdAzdJCIPbT9U=", "ElB81Va3u8xy7m2vxhZYRCHhr4ctjA6JACro07oGU7Y=", "E9Q3CDVTAGvO8xLl5vUqXZfrNmF+82/k130+l/cctds=", "Fj7HMlH4VENociJIfdqaZUZ9kLIvCzhmRoYHfGpEhtU="],
      M: [["I20TOT74XMSKNR3Xht16HeXjmUIpYSf9h5RyI65RCK0=", "J3aGSU92RLvEqbGU4Qck65Z/HcWHGOWePO3IIbKnrhk=", "Aj22h4Tj8MwLhWGIJqmzUFEpwWR5lzsKhKRSnmawnGI=", "HTWdJF8obBLVDWY7rnM/l4rwjNvWMBfFezp1ZG/zgsE="], ["KnWhcVY7gH21Jb4llpmrKP6bx/sfcJQ/8Em8lw6EGgw=", "CDq/9eEAUfB44oJ9CS4a6Ai03T4VzMNwbzjOQVe2dw4=", "GlrXG7vs2Kl9xJz9uuMDrSTVxHQeq4t1aKn/glOh628=", "DXRf0A3RZ/uGdyEzZA8CzpRQBKe8LFnoeQ9yXF2E8K8="], ["IHBnnnmHgu9ZKlLKnO+CDUl60u7Lqn5C82az5SHE7UI=", "LhjIVw0gv134AHOaU9p12Qbs4xjNIkq2s6K+l54tfqs=", "D6hvDyfk091/M2fOhvaE8fLkOG0+W584+ig8aqcjtgg=", "A/Pm+reR8WYoFo5LFNuutlcDXuPaayyoPwwkkeC0A+s="], ["L1ReV4ICyXMkiFQOQfeDto/wYT/Xk3X4uos9MJWOdnc=", "I4EL+Ch3/Bm/9+7+rj+vS7gQTDK6TNcBWWoVYj0BR24=", "AU/NXrC+bVvur8SUQDTPMhwGjvkw8QviIH7VjSo0zdY=", "AMFfw6HVcz3YNerggj43f4ukqLYnYnzCu2YcJdIPtSo="]]
    };
    exports.default = _default;
  }
});

// node_modules/poseidon-lite/poseidon3.js
var require_poseidon3 = __commonJS({
  "node_modules/poseidon-lite/poseidon3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.poseidon3 = poseidon32;
    var _poseidon = _interopRequireDefault(require_poseidon());
    var _unstringify = _interopRequireDefault(require_unstringify());
    var _ = _interopRequireDefault(require__2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var c = (0, _unstringify.default)(_.default);
    function poseidon32(inputs, nOuts) {
      return (0, _poseidon.default)(inputs, c, nOuts);
    }
  }
});

// node_modules/poseidon-lite/constants/5.js
var require__3 = __commonJS({
  "node_modules/poseidon-lite/constants/5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = {
      C: ["FEhhRZjgD5jnrn3qRfvYO9loZT74OQzeLoa3Bq1AxlE=", "CreykTiOXJ5DwNwfWR+4Ps22UCLhtwr0O4p7QMHf98M=", "K3y7IXiW9SyajAiOZUryHoTN51SjzvWxXE1UZmEtat8=", "K8aw3b4dcBtlcEKL3Byhvw2ln/O7u5X8K8ccDG5nplw=", "EjpVoxmAOE89ILLOy8RO1gw4wR99IOknHvq5qQXu/Tw=", "A3UBzIydyBkwmnafTfCY5YiwGFi8jrfieeKIO+n7jFM=", "HCEW5H4DqGuxFpWwpfbatrmkYLHrlRqwHCWeyj/UfVE=", "LBghNIkDLoWpyMuOmmWDm/rtE+V7wPrknb2uv1T1b5M=", "Luj+09TSxxoEKer9jl2xcY8p4iJ5hf3yrYcDyDW54DE=", "KMZNj17XqsAEySAp2em/kbqUNtHM6UuTFtERxwoMFxQ=", "GKAdn/t0euDePoPHB/iyT2gshPFav1cbNCVKA0eGZeA=", "HCHZK+8ZfnOyNOR3e2DbFOZCpWzucVFdVOGscc3nK9M=", "CtQEzLyx4ZWJfLYMgJgeu51mpmd9u+2ti2RV/mLYB7E=", "Cptt6DMGT5O2rbma9sAFlFy2VMt70UyLl6+LYMwfs4c=", "ExKeP5MK7W1HaQMx/wncUWDvpY3c4sPmGA1FvsOqOm8=", "DXphTImRUIqxzkiVgTuxyC8Yv3v8nigMzKGAeYOTh/E=", "BTL37DbjAEGwSGmGh1yROkm93y9a9f6+jDHy9AlP/qU=", "BrvLjo4YAgEpPnEvSVDxsLvugIydZCY8hNnYrhVcuJI=", "D1WKTbGjrAf2Hi5r7pR/c1hr9A8hHOtPaHylZ4qdyzM=", "K+FApgtbXy+O3XioGKlpsgxkPkGbzwtXfCSg0Oes/pg=", "HEnEuanwn3ua1fdOusxxBRK46Ge6zifLDeoG6JuW9jE=", "FwwacychsSzefzPkdqOaGqd6gcBuLqxQOEewDVl2Uts=", "GcJ9DlL2XKNPTjGgaOSTMca/w52SQfnUwwIEFhXPJ/E=", "LxvcUlT5Igwacx/FJ2lk2rJrOF+kC2sEvtmWDiVDugg=", "BbQtL7zL9NOdK+kznKvp0Nxtkh6FXNkRVLY50o1KHPA=", "EiAEBxWkGtWfT0EODAWkLF/TKsUv6dBviBiNcfYeCTU=", "JflSZSYVW4OUZgn3u5UH3Ukl74cd7pFtkUTrtOzhNDw=", "AXv+QoQpmud0C20OIElR4xSopdBFJBkUeXipWzR0JEQ=", "Kl1HZAIcpx14qWdMtnCPFYjSzq81eMQRHPizWe7wic8=", "F/Atq3RfvjwIEyH+XO+EXnuNBwslFNKbKnt9icwIFdo=", "GdpiYm23GZtl9K3PV/pKPbqhdkp70VVwjubzeMie8BM=", "D4jilfou2BtCbJH6aTZqc+33Xzm/GGNM0mbsQDiCngU=", "H+McVUhUbHlI/k7hvXQS4ygO/30gywmqhfSfJ2YUgBc=", "EP3BYTvb9n84vd5WGy+R5MxItZ+Y1kNjj9wK+tv+Em4=", "HyYYwuvpV0UIucUvAADjPr/drRoD/da8pu9/AJMSe+8=", "Ep/n/D76xqirI9um2IbzlNoR9ZU8+Y4oJpoNuip0XdM=", "Fa/UzfHk+CDBYx1KuFykujuvz+5yvq3p+uYFIxAkSOM=", "Hyx0ulw2fjcNco5x4VsmiFGnu4tFUoy3NJVgeayZsBI=", "ETDhhy128vk2nPWble35zhnwH6icnDaybgne9nhtrTw=", "E1I9Fz9+a623O2P8HJu9vuJCxhvGhlZJMydTOlwbHco=", "FNpA0K9CemXxhBta3JZThlM2j3JUy1Zn3a27rXpXTNQ=", "AJH5ZADkKX6oW7GGwXswToJjjlf9Yx/2MVl24aXdi4Y=", "MDMpv5AxxVFbmjTUmmS7agJnvHtUoN7KXEUCd6ACzcs=", "FO1H5VwdocLwXTwaGy5sGFCfyDNuz+nbc3kW4oP6ghs=", "EWHxCzV3ddgQrVO8xKINWt0rAyUcdH3rBO6UxWXljWs=", "F6ilCucs5wfyK8Bw65koUcqRTrlMxo6vu4qWpxTrgiE=", "Gmxh15Xbr2L5klCzfsXfiGRaHBU3kdtjErky3CUOT2I=", "H4vSq4qoQGZMTu4ZjEaE3EsFdyuyoIadpnIrFfRHoTM=", "H/y4UqTwAnqXmfExzXS5jM+4y8BjSdj+/MYvEMj7Pi8=", "A150LsUvGbNtSJxyD0Z/+td81TvC213dskayMCH3nxg=", "Hfqu5BvflNeDqin8Yrfse1VnOqgY0wX9QtF1oF8uPYY=", "KCE3hHegLplQBaVjUIhUCUW9Mz8tFFXwOKIZuMR5azo=", "HbSk0PI4pXCxBhxu7IHALzH/3Up8GedjF08jjQSJdCE=", "FL94iUV7ILehNns0o6U4IX1pO1JCav9ApLtyiTsXhMo=", "LO1Swr8pb4fldBDD7JqUg6eW0WT2BJEnEJ/w06nAhGU=", "Hd6sWAWn9K2k0EQe0QjjFJ1M5lhPSa5b39RtZ2buozQ=", "Lja05enJe0YjBOjitfnciOHJ8hYboEBnP5ERI/BCrnA=", "DGhA0csGZtxZ6JsYZSddihZLRHxe1kNHyu5jUCwjjV4=", "E34uPonnHUYfTJvD6PEhgyYqTR21XFibLK6qwBI49Yw=", "JQky57CtzyyE7Uv7YKNra4LlWqlHURV7HUV5Swgciq0=", "FwpykvVjTAbdO/CatcnE7NSwDVzi81+XK0VVOR8WtC0=", "DWjLvnconnjVy/UdcPG3W6IV30570BSdELLFDypPO4E=", "DK90VjuQUl9kWm0gNuzRMG+h3GgLSdnOTtJMl0mXMXg=", "IKfRwKJ/zOeP/jcvTFgwaxZvlFbtRs3rJV45W30w1Co=", "BiPzImtUcLJ4m4pTBA5ERDOF6Wuc+gvk01AVFYpGhGU=", "FjIwhojCXnkPV9aKU1AkEkKlYwU0feSlAJzka4zcuR8=", "LeR5Om+ZzRTj9mQiEfTQt7z6NhWXxUT/y1pWfpB29H8=", "HU0G0Z6hsJyteQhtUb3hFyWlVPqZVZyi8J87tz1yjGY=", "BIDnR5pmp82ephyLKJdDiZCDUKvEqvwYzXXjPdEwwUQ=", "MEMLAzaOvKqRJGlgSQvPkX14aBRj4ufXRL+0QzXawk0=", "C1ezcyASfUxQ8mkSSw29yysfE1IkGl0SEDKD4InAx0I=", "LPSJBlDSckDhlfYKT2mO2iSbjdYUsjN2tQF40t9tK48=", "HiIcVSaJi/0S3oaFGg2XA3UaLyOQCKtfm307aRHGQYQ=", "KOB0ha19mS7RpY8ynKEq3OTsaT6927KVLlTTOfLuvaU=", "L0TWT4TeFtxnvV6tUe+x3IOByEUgwShU3V7zoHms1OA=", "BQp2vDLr0d/ivjMPME7ces5xZ6t7oVFvQCHGLPDU+sI=", "L1jEXl1lmmfXgTZyQfbDXYy0Y2HZeyiUfSlCHCcFlKk=", "JejamuDkLoQOBLIwNw54K9tnU0hEMlujb8fl4WDGanQ=", "L+xzTaIP4yAD6gTxJ/hEck84o2i6EMKVRCUr55YED38=", "KIpnePOoOYio7Rcn8V6TtMsU9OOju7kd1tH6yv/9Xu8=", "INzGx1/Yklm+f0BnULPbZ5olqM0nFdJFuRdTkKySLIQ=", "F/QroQlC3yXLilQXgqGLb9Mc+WXREXjHsErEW03qXdM=", "Ao7rhdEVqQQCDgxhSO7GYD6c7avGZKvudkqv1FWYa6U=", "Cx187POnmyrT+imPbOp66V2AwCmezJGOn4ycPTjVnUA=", "BEAznJdkzsecFu/bg0omJh244/Es4c9yLSPA4R/0zwc=", "BspkfClyfBlioAIXfaLVBPSwel9+tXx5uI5reru9rVw=", "LqEgqGT1xAk90ali6PATx7jvd4sE0rpb/DyrKGGbqeM=", "K7c3VGxK7nwMwrqHwRV+KnfEeev7Xcdq27Oc+Gl2M/0=", "DjDaZJBiXTPnnNUBdvVo+aLCjC9EmivVGiXRVoaAOpM=", "DffKcnihNlC5GdhUl7LrsPcQNafCBDDUEx2QOrf1dSE=", "J8xYn1v1hXlKus5Yn7inSi94TAmQuA/KppRAl/hw4tU=", "IlXDajjIc13kXO30Uq+oQjMtMwQveOYMQ8dFVCGzJb8=", "Ez2WAr0zeNafaBwnsFvf/Ji32GzKY9c6YMrtSFeE0Ic=", "DhVI6UKunT4mhgaZuTcnyBeplIYWyT70rM2YGx3D14o=", "DyDw5V2TaJ/gnsMS9q9HYnSC5L3goWAqjiyNboTopq4=", "LlIyhIPLW3/y605FsS5RsmIyybwXtykpVMCp9r+lG7k=", "ArIWLVM+BZpu2iq7dHEu2zp4YL7qld2KSr/JV2YIBPQ=", "GeCSdxXRzG04lCmUf7Nzfa1zOXTGsuE+Wz1DJRlRbHQ=", "DTqABFfXd4VjYwO4uU8X3P/LRgSIcqyfdO9/J+5XNwU=", "LJdNGVJVehqsX3uuSZZhbaYZtz9EHE5QTcj+nPtVnjI=", "B2a/7u3izPNwjhtP8wcUwiwdQ0zb6PVVFLq8LdXZe+8=", "I9rI6lQIL8Ex4XOuVeRjDNTKfIcbKgpHnB505/GR5iw=", "F9X7bCyzcBDj41irLVdTdocO0zGGuOrkmtO0fjQKjX8=", "F13Kx22KgSYTm1g644hTKQJG5D54P6aQPsgAfxeMACM=", "DE/Qj+3l0iGtt6v1SYmMkeW+foW/H9KmEb8YLMLnFlU=", "J3k0uQnnLTo0dbsex2arejitWbEoMD/FAC8Cplvf5yk=", "Dog0mZjf5wPxsYRST5w5TWAEzKz5y5UolujP2wsHi2g=", "HxsgeLYLD84Hgk4qK8jK6O5nNRSwBwqLRXEMx4y7mUI=", "LrFVlWbFNt28MW9kgtUfo0BVdldwD1uKhG6BKg7TNNE=", "HE29wzXPZ2Q1Ugi0ydJD00VB1iPGad7Cw7oGa76vZ3M=", "I3SmstpvjKuOXP6NgF3Tot/KHot+ul3IV0Ah/RJB47Q=", "Gd00JTPMxgOplzjj+1pWm5TvcbPkn5D7h09hYXMwcvQ=", "IX1m22x/s+/6UIgAWH0us8bQPYOFEy8vzOfzXycFzM8=", "CBX7hZH+AQOM06OziyNvnvynfGGNO/xsKn+okpbH5k8=", "K7lDtAwr1FamwXhTscqI6w/zb1l0sv+aX1CT6b9joW8=", "EaUVP85llRPufLmXSubLpYHjtM0UVwxXCf7D2NP8guk=", "G3K/0HY12FAbLv+HhaJJW650x2U8+Q5tXJ8URCaDbfQ=", "FJAsBwDuyJeuF4uoyvhQ15Px2HUSvqDs6jnPax/uIz0=", "CcE4xuCmFqSf+Q1DprBD87dFt4hlhW3EwaReL9hMs/Q=", "BbWKPc5XsoGicdaYlQUtiHRYpxV4PoMX4CSmGjXsELw=", "K+jSlSXAz91eazEl473jv1WOVfvoZ/AkRXqWdlR00Dc=", "Bh1y948bqdxrTX93hCJdaoG9/Bta1sJDafnAVgUj2a0=", "C/GK78rP+r30ES7drcphRXOLSAOzYUW7lRbbUBoGkuk=", "LnPdEF+osuyTHYzfKexnnjqYAakwcafV6jBlklXwO8Y=", "D4RA72Z8mugTN7pdjJJ6U0fecpaGCyEcrR7L+101mO8=", "AE0wOy3qYnsnMb6D+TrDTn0U0XihOABVjKc5Y5XrEY8=", "I0VBrXIECnDaKZajUmkjDJRpnu8xOk1IBQgAjLw9N8E=", "DRI/HnLSa5K92P1z0UKGwxKtTCOstGsuCMFXEEQJ4XQ=", "L7Ngd28N551wmO56pBI8Be5rBai+Rgp3TzoEjhOFRbs=", "A2hcB5Q04WcnbFfTzHlwO339xBwVbqHot/mbaValUyY=", "Jgrw4P/8yXcsFjGxeTRFZrR6qto2geuQNMb3XDcFwcc=", "KGK0E3T4m2lSdLM7dz8lVJFuK/+f9nJUX8L0lWP2J2c=", "AqmRL+FwMQInGJ6h5pHQNi8Ys4tACw7/GSyllRPrqNU=", "COUTreaUoNisHz6/GpZEDTLHE9UFjhIk4HA0jCgfSm8=", "FApKQx4u55QA7XRll42EdzITxigmT/gPIax6a2c9Cas=", "KWr00BnLXffZWbKdVJw/BxICtOuotT3F7pee0UM3eSc=", "AYMuKEp/TIFhSIK2k5/A8YVXO9ICPj5QV2VHC7gSs0k=", "GoTVame/3T2WWr3NMpqnjU/pNDRJby0QOGH9GdZtcmA=", "BAy4KEd3OSfSrv3AdIkDep0fdjHsp1yfsN2gy5294UM=", "AQ3PCEzCnLfK7PJqpjO85O0rAZ8oh87nsaePidP6vi8=", "B+3CKgkR6iFEJe9UK3dtsjsP5YF4ENQMcsqYqr2a+oM=", "LupKsIrsd18hSEeeo2+7lpNtpYuki9HS06zUgXOqq+c=", "HkDA6CV/5KYQBc3PrRSM9/R9G1z936oIJzhpVRgkXxk=", "I6J4CVg70epR9DbeVEPhCPadRM31HcHwPiGUi0mAuHY=", "LkZSsETb/kDmO2sjL81fPzmr+9IFHuaK3HVAgNSSUKk=", "Eeer227Lr8Ln2M3v6ce5xQR160dds8LK9/fWf0hXdfI=", "GZ1SNQzDDoxzgh+AIJbw5UehNVGye/a4mTlvY6xc+Oc=", "D1ddbuZ8vs2YNFYk4DKjfIWafL7zCz/dyUnNCXhIQQE=", "HEtvmiritBjmJlrLqclrBhhNBwKOX7eE80da53cv8Fc=", "Lctc+Ilt458ijhV8DFWT9GJvubwiUgY4PbIDYKvwySU=", "E0CrufThExhr3CbL30vMpQtTGhB/hjylRFdePPhw+OE=", "I2jmkrcnh8uIcOqIjnFOAG9Z0rRGDPt0xIqMxzsdGls=", "H6ua3ZuqSk9W8jFld1xvLZIqdjKpT5Y3S33IUnVvVLY=", "DH97gjANPGzj+JV7oeSt1UxMAV4g2XZdIgVxwWq4aA8=", "FdY+hr6s2Txgg2iOXZyPPGlHkp+fH5mrV4pMOpIu/wM=", "C+hDrl+bB+UlcheK99ro7QXTaxLAYHhikpNV6nQCPZ4=", "EzJ0nFI2lMtpNeCWOgfoGwWWfOHZUMC3MQWOySp6DJo=", "JUOUCIEOB0wL3UWYuYFf7okruVylECns8Am/+lubloI=", "BX6NGd2ZmpGNopsJQLODup/RXbCw9kmW3/Z/61X5p0I=", "HgFON+mxF887SHDZmfK1XTU00Ka+mOnjV/pD8B5wop0=", "Gk7STm4DrrzWvbEAUz3JZll6/hXIUbS4Y/boiQhMZHk=", "JTQgAHCD8aqGOtR2CQXBA57UERyfBT8ncQRS+DzjapA=", "InahRBlxcJr/5tKpkyAAHsRexyFVxXXd7srA4ydZqwY=", "KJV90SGOp5n9NBHrGTJYU633rorhKB91MwL+fTHfp7A=", "L9klcmq3lMiL11eWqj5/HmaS8pFM+AImfd8B43kCoAg=", "HPilycdqhLFHyCONklPNVbR8DEPYKWbEY2ooZ0cF/Zo=", "A3PLvDBuG6uecHc2hxXmIwtLLi5KHbnGdLjDWaQekQg=", "BgKD0v5/I9/1E9kRCz3GJEi8SPUxzgweq1kgvyMpCkA=", "DatGXW2RB0DzPvbMDq3HG/gRm9/Vo1J9yLv636pAJjw=", "DLp7y8giSyqOSroXl3IwpobNZCHcDKU0bzRGtiQ5xMM=", "HkNl2weQycT0RbBlPEZv8h25bDi0B2uovWi8tN6mkR0=", "G7LbohmamrO8hu9fnef2xcoT1g6rQs7WjemPxkOACo0=", "CtPBhwxtbvQO661SEjzRopE9nWLoC/usroEuCCAh+co=", "AbCYyR57DLtcNFiAd8Dd+VMA3fYUk1YwwM46JickUwg=", "Gf1cDqwU+udZi9TO6jseKZiwwWhJO21yrkG1duVbnD8=", "DUdJ15zBY/FxEKQEpG/kJ8ZDTz/me357TM+mq5W9fhg=", "Hrv+gRSkG7gJ4LMzmSQSMuuUCthyjIpRbUCtpEDb/c8=", "JwTlthM9l2TW0/F9SdgzIj45N/gOufrqu/upuvS0wbg=", "IWXhyAJzBbGuDjI1cWNeXVQNE9cQw/mjkLaRPxTQNeM=", "LjSX5NNf2llsBq+mO8Og8uVdTuukrOtg5lCBrWOqi4o=", "Ax2kNF7s1ttsD3sHx4Fdet0f4FRtc49NeatcV6qEHt8=", "CJ7OVOR6pckI5D5fCHN8FDaWcIkAasqxyc0Z6sSiCHY=", "L1PBXire0zxH9VoHBIPmzH84Ifv4qkBnfQVS7Z0Q2Ec=", "FCqjT0suitDfeiGz45wAyLCqKFcJSAHqr9cr7+0Hf5M=", "F66k2kx7zw11iLAU64tAl53Scl7aTmrOMxmCRnx/8r8=", "DpcMGdGXSNjEZRBNjwIgA2P5pBeG8C8YJ3QrINwNFyc=", "BLytnlU3lWQvWbr3FKa9tDL8RaCgt38aujqYI0dt+bk=", "JCwL+82qdvcV29S6glxx/P7WccGxkB+khMh/gQMV0M4=", "JdsTQ8JBBAcQI/tu002ZCQeDEeHv6FrwoRsZEU+p55A=", "L/5NnEIKWenNx8Masr81GHyhR8uJijlC3rNnd4YDaoA=", "EluwOvPizxi75vW1kOs7+NDRumO+aWSD6Y8oO8fNB6M=", "CBa+QnRbfbtM7/5bjiTqYP2LcZ3rpQA3rHt1lIdFxrw=", "ERFg+az27DYNG2pxIxOg28viPmRCAFVHHS7kxd7bNdQ=", "E3eXjhsfaokl+o57eUG9+PtZq5VCNCQZKD2CA0Nck5E=", "De/B2IghZu88zeU6TyNvuoPThGIZN87lfkIaUT0NM5c=", "L4+lx4xwbjpdSgPyp6OVMEbX6Uy4in7zUOZ7W6Dw3r8=", "GiqVfsCnI9phwhNLqwvxe+sA5tzYRpDCMNy55Y2pSCc=", "HN+HEJlfXgNBK0p/aZUy+f0B8OoWeo38Hd834oBa3e8=", "Jv0xRxgow2rjbCe3SAVLDAxP5SObMBaZ43Ze6+zBiUY=", "B3XZlswsRFbzA6LB+QB2R+Eakh2f6j97kmFDuZ0voL4=", "AW+5M3cIymOM39qRvQ2uprlyJO97IGJnKt3RvRi7iQA=", "LDkvvn0/3kL8pPlHi7Q5MxJYJVNW8YSvb3bxGQVBF9c=", "GHoqO/eaafo+UInvnx/Vb9tHxV7s53qiKKo94bSGvLE=", "AnGoY6KAoyZB/6M1ELLt0njJhjA1lTLz5Qaydf1dIM4=", "FVdFnJx0yUqgDlr2mh4xEvtpU3zol+wMcYlY2WUW8qs=", "Ko4myo1kfZpjiFFuqdz/iQg9U55YFowqUMba4w8QnyE=", "Ict1IZTPQ/O1GULrAEDrqd4rz7HCo/rpeSS3EPJoMs0=", "LCba+Za+JHrNbdSsrWDTi1pHHmMiGI0CwTfny0hDd+w=", "AkAXbuDnmC7r6Spo0+OjjCaCGswPXQWM+ME3vKLSbxs=", "JjbglzyGXBvZdN142qqNCoTNr2vhrUfs8qDRjxFzGPI=", "GehPTyWnmUlgQWYdxdl1toH24GdEzuibe+XZ/eF0SsA=", "Dr+JBko68kfKHzb281cBiOJx4LMmxPsmZk6J4UVMoRA=", "Jcfpe0db4A6LVZo4xFI2T0ycUx/suKxpj3/XPOIucew=", "BETJnlkjU+WuyqMCrdkBwU2MVScKFgr+1EKe9VmK108=", "E424iHgwVl8mk9Dg8C5OeeFEln8LpTsDUZq6dktcmUo=", "JNQPRiEU/p7gKq/PdLT8ok4a42XcdcO1K7E8u7LyHt0=", "IeZdbY7kN2C8pA5zC130xM86inMtsUj0spUbTGHWjow=", "JI3XlmnsCdvwNQoV1sdcapvarO/KFNUTAJePE9GrbRw=", "K4I4wVSPnL4p/TXPkee0jw69p+Y57faf6NWrp5JNU2I=", "JDn9I5JX84GBx7489RPxv3I166lPa4lCqUy93s9vYvc=", "IAlYI1KBphuixL4KoygqGMdLbSYvXefC4z0rs+iT3+w=", "Dh7KXfiO5fYM+n4f5b77txn62CEfqbLQL8wjMZDBfxI=", "JrU0J/mz6ix2nZxmD8YIgaFpwScy0AG3FY7ksbhCyiQ=", "IPOz9Kyv6fivPgZmGzqPd4+igSUiudcKZ0As/42ysbQ=", "IR5dKznWJSCnpifs6MrLrJ+XUG3vTsKGkoumwn1GOxc=", "C7dD7jSAISnFVnMa7Z0wLc0IUxPOVy9iQtE4MuU2tLQ=", "I8smYbSI7nHkx1P/I65L0l2KRAlPZrZTKXfiIUDrpcs=", "A6NaoxI5Ec20U1uu0zWfX2pSBbnJPvMdNTI6R4B7i8k=", "J4A4SKCu2WqT+pQ7ZjXkUCF+E39K3nSmLXkXMicUtpc=", "DLN4OcLJp/95iEy+x19B6b5eR8dtYVOCMb2BYpltb2c=", "HwAm0L8fjh3VQjzC/sH7XNqh7NxMPLIY287vd8ANL5M=", "AqfXu5cLim7S7mb6u7qVa22jsQD1tfuSju9C+XCCc8k=", "DP1/QhXkNMjaF+wyWLC8YFrRqy6QqklDUeTuQLvEkfo=", "GAsRtyBiKhVoSdxvf25/VxZZvmloIjDF7ZrDOXAKfN4=", "BOlqllvOPToKJKSkV8lRWCyHE0nOfu4aq/5XipTGUBE=", "FZMfeCtF9/tlbyzb0fdwXDU6I/4dMKWkahUi7RYN860=", "LiluV8l6Uwms0m/r9VrJY6VETBxfcDrYig17l7ndOLE=", "JhV7zreOhGu7Ji+aHgbUJxveWlvOjwQZlS+X/9E+rKg=", "IZTriYR9aw8Yl/Z18ZwMVrYbEySO/zyjbjT7nRx57kM=", "I1C/NUd2VomRUa193pbqeFfhVQFEcAjatrPSfI/6J08=", "GkhvCuWRys2vCcWKScTReVQFQ1NAgZ4APwRp0RC3dSs=", "G1bc92+yPMSoNNRVpAZeEzVxQCt98wnVm8MQXUKowwE=", "GnSdeWSvC3ICkT7yBMZT8rS/tlzqt7aFIzq1nOO7aSU=", "GK5ZAHP5aWlq92L/pOjw67+X+Mx4fjfN3R8yG+O+rbs=", "IcR7J12C3eZGDV52mplCEUSxxanaWSlK3py7MXED8kk=", "BHPdvVLnN+UnNk6OtjIHl1w41f1swysnIQKwgs0VGPs=", "CxL6yVttOogdiSZXyEJOZFrE5rAFFfkC1ZRXQwKybgI=", "CK52FqJgz2ZX+Pc6woRYjSxfB/9CXYN6p83O9j4+IQM=", "A52vaHYoC4Doc78qMv0oNKg8aXV7rdWKiI74Gekmzig=", "Jeex10cKPHXxPwtWVGyOCfLY7+/wbvdm+ceDyoadEw0=", "Ho/TY0w/92QYTQNDX5hYSxG1sVrrnHUmLaPx6iwqnno=", "JB3MUaw3gIpBXdHjwoHwWv8ReJ3Ayv3XejVITgmT+aQ=", "H/wxU8Vu+XVZMs6ivgVzdJva/hxPoHgaS4tAeM6ddUc=", "F2MNYtmj5RDIik1Dw2D5K8D6ALZgMa3sKb2VQ/06F+4=", "KYBADt0ddOPWnbVFjSzNX6vbI27BaoKkMBoKtZ6kpuk=", "MDT7JDZhI+xtyvytNXJtv7FhlMA23NZI+mlDm/zQDNQ=", "Gqfo9Bicqd/z2yq3ZIvgojkplc5GBB4EaA3KitcjLfA=", "H6GV+DSmnmI3L2DrSX2hZ2RurhQVPYA7OdxdEfXXgAs=", "DyPxx01fv2GVrVpq7l5WmTxUd+hFP1uToNe6/TMwNtM=", "AWVW+sk0inNatQqgiclxUbPKrwogo0+52TcFBaFRVyk=", "I9kreTZIEQ/Fru8GM/DHfKyw27yhh5uKb25d9EXl9ws=", "LkwQ7F5l4vI5u8Q8EwMd8mhqtA/XmjBLBdYRuCPyO3M=", "EkGLv9d7Y61eFoZK2cMv+/xaPdm3jsK3kyn+XgqNKVM=", "HkqKrOFavB1bdqnoSEMdLAanj3K2vrsSk+bFjlGFaW0=", "Dz6WEH3s29aHLCDqCaz5LN8Xo+4dEzFIgJLZYXbet1U=", "ASw3gCB/OVzCHesKvZUWge6jJJjdumzol6j58MI1cGc=", "E+qxtOZyuhscG7kBdpMB8eVlnQPqEMYd4kd/8KwiFCE=", "INxmSrsgt0VsBmKc43oeyxonpOiyTjG0i5xGNaowMj4=", "LGseLP6njiw2eF52qM+xsFfpRx8k9bORF1w97LAeAA8=", "GIySYlX1t689qWNVcpwqhnCrTCxwQASBsqyQN0Dgxas=", "L5kTII4J49bp5vumOE/QdquJ8mYpduPjDghwuzDrVPI=", "KzOAPZCIlwbnFPcgtWKNJvtgtUWh8+nOSaaukSsCQIY=", "JsyrwQ6wQyfLXMPd4quzbwlwhsl+c4wTPJ9XB350iwk=", "GxauDXxUQIy3X9kx8kZ1HysMPcINeegqJTG3bCK01d8=", "EdC7RhvYryhE9J8PhAyU75UYslETRHQtH1Q4/j1BWuQ=", "IzAxhHtHa+rQEY09szjokTPsQg1nPlBK1kclnfZVVx4=", "H4TpeJW+5DjrPJLcmxhGya0pwWQ4ewautu0YQe2MTco=", "J39/m1QvDCu19FvtBU8JYkU2AQw8+UUtInMZMyf4AdY=", "HvyckGnlBouqwT0uZkVkG30n6A/CMHcWFTXERoLuV6k=", "DW7Ed3YeLvusTxSzvz1SV6meZMPyX+EE+vmIsg/l/0Q=", "Dg59fFUBmZt9Fhc7WbfK4fIDvvIa6/ACUYgUOcz5MBM=", "IXvvL08SxtzJHCBYojORy3feU8puRNzcbqPTb+oybqY=", "BXgMiK3wFTG1D4F+P+RER9KbNaqKOJxx6M8SJqzvaLo=", "GHM4h6ays7TJDY5JkBluI0ReR9fqWTnr+4mj7j1ntL0=", "ILrOY6z8rgscnyvuJLjp2oW6WX03sJBXIMTxXbIxsHo=", "Fm6llTdaZ4asUn7p7O1z7Wv1UIdqvK86yStCyAiwDY8=", "MEJiqe/0BArPQ+Mi1vUmdq4vhT7C56gNsAxIjPkXx04=", "ImuscFAWbl9tt4zQsS028wW26MmgVRFK13Ceb1ckW2s=", "JrL1OcVzgp9qypG6qVRQW8XD604d8dY4WCcX+98jiMw=", "BqD79M1S6Tul5MbEr2XbAu6WKX+K0gDy8c/yUudptVE=", "LLnCQRLTU0Gs6siDYPtSiSTli27KwyG5+ynmqjNo/yM=", "IOiKTWB1Jt0H/gijVSpEZpEp64f8wLE6rI/or9kwFSE=", "FURkmivXPjunLzlt+R3WVAHdj69R3jJfuu251TatlPw=", "GYAHdFeZVxLETafhdxMljj+Os1S/2A7Z6vPsuvaWAQU=", "JdHSL/E+dwXTwIX5f8Tk9pFLgv+qXSCR7GTaxCN2Xvc=", "L+yZDvVW7+EDWkZP9VgedAZ0Rc1Uq8r2uMA5n+DSTPw=", "G9lWNQbZVE7z5IMOE1RQEsV5N5wtzBMwQWxK5JvE7GE=", "AK/80XumADxW36hVcfwpc3siWoDUgOfdft7AHxTyMBA=", "I2cNuu+WaIHwf5GaLYgxKMeyPPdnpHeysuB2K8DbwYs=", "H5OlMpFzlMfiL9F6vupjicZv164t2fAvhg9tlpR/Dt0=", "LeQun1N7fWGwITdxwOdPVVUSvge2pQk0c04sW+tAvjc=", "JcVX9FuZeBzTfTuyKTFmKmf3izd4LIhbRWu5bVXohAQ=", "IHTItwlwXJiIU4p/ijxK/2R3Mb0W+OJU+nTqnyvnZiw=", "Jzg1WVYpgTiUnkQhcdak5LdO8gZXQNt8/DoLYP1XOss=", "E9Nq0KTr64GWl3hkllnGXLfQxBzFGYcf23Gp6moMqlY=", "CKLBi6QTgTSMGs+/lhdxaAa0YqFpG8LjQ7ebgIXjdrA=", "BZCS/Dla7ShYB7v1V62aEEH1nAeYIrEIhFeIL+57YSw=", "FhkkFRtaWtLYysEZUiqZGpBvFehTHccFZ/ayg3HMJOM=", "HGjKj3qhdlkHVAXvY0G45popi5pNcvO7hUswnkuoehs=", "J/XQO8ocggf3I5pLLPc65VmhWqN+e93fOqsF7sXOVZI=", "Dsv/SEaWKpddNH6pqPxGX7RoYVV2IvLCVkp+Y5gzwWk=", "J3xN4jY9i1tFbPxaf/jkb/LsjapZhV9a1kvAUh86xWc=", "GxGGLFKs01G3pGR5P0+7V/7Jn4MrYyJvldF1yNL8CLI=", "BqcZxYTHT/vdchjrVly0yL2GyS49+zxz4VJyAapRI04=", "Iw5K3uy3mYd/fOmljINrmdUzWEoZXB13oxOr4cfRJr0=", "ELEJuGSAnEdnoTPM5sutbIhigXO46lHozKhYMMp95SI=", "DiEReXDc+9SxUmslNjbzd1ONO0+q61qLJL9iANFMxZE=", "Jmc0mXhAE2L2sXk57rDmT/VWB+vbNccHHbRrs+e6R3g=", "BQAPpf2lBeApoTv+MEwmew2GxywDm6v20/8C7iRr4C4=", "Jk2eCUrtX0GmAkIiCjSihAiQh7JDapv86BdMyb6MLiA=", "CAdvnEdD3mEw/2Is9AHt0skvJL/hFPPF5ySJF0YxXEc=", "EyNwq927Cx3VfypSDCUza9fO3pS5W79cIVHW2I5kG2Q=", "CP8RFreiJ7/f1EZaZ4kIgrYVyMTBfyjY0klY7fYC3cs=", "K8sLDbi54+ArfpwclGD92cbNmFYjMuZI2KPgq5RZdSA=", "EupozmiBvsrX+KaxF7A6uXb3q9WX+QOwvyMNINIalDo=", "J0OcmKdmiAZ6CXsZtv3X141fiOJ04Nj+peprdAb92n8=", "AvQNCtBfVlLjHvlECtcevIQZ45NJOTfwXwBJnQKpnjY=", "L78EKEMn7k9oDwa9OQ4wnQ0TrMdLnFsUtjBZuMx6v/U=", "G+aG1T4qitV6gosGUUJc/Gl4xwJ+2/JH9rZyPCHfhuc=", "JoO0JehaUI+WhS8UtCIPz+n3rYsXv+/A40jEfKeLtX8=", "FtrOmy6AEuMdscfr5nLYa75hoao+FpPg7d/A3gqd2VE=", "J6Mh+MfTyQIuli9/7y48hItFOdu3WqE58wQw/lRbzts=", "BszXIQ3uHWsOIreeEtGQgtgHi3iNcQB7leendO2GplE=", "CkHdQiIWU3Ur7zUPbXSpF7bLsf12o6EhZvTQvpeOQCY=", "IgoCiB5NR6yU2VDN+DhidNF4LifL0NhFl43uyRKY8WU=", "DiFVpUX+Xzy7Y5dgZYnqwZzZJjkznGsBcpikrTQItLk=", "Dw8ZxikeUVRqJnxgzHdOX7nQiLrFMHgtiR7Br0uEcHM=", "DpJbzRxt20o6HGfsje771AxTwNM+eu7xtGeVrtWUPJ0=", "KtAAsXSKu4Es1uVBEoa5/z7wpb09JZo25F7wW561vus=", "CmWqIy0y7W6N5j0c3/68Lz+mFkZcJ6r5fozT3P9khlI=", "AmPYRwq0scYddNjoliQvTyYdyxZ6OgaSOJPXyyyT1qE=", "KQHZRq3clLBA/VgATZpfjNGSZUDHqGEs7BxYy2DCs6U=", "GInPqCCfSVLfkCLbncWDtXF6BpbaQc7mSTfQzWMh5pM=", "I2Bk1xy2xkyEdHrCX8+NiBUC5fA7/4dWG4WhFrHzmso=", "L/ehdP/Owphi4E9dvcc+vzZhVwAzV2KQwMH2zYztJ64=", "GeckoddCyrEDRV8AQO33RaJpanEITJPjInFUUN1Nb1s=", "A+7TiStvDmxdoQWcXzeTmFg1qig1AKgSmQSpTIfxYb8=", "COK4Jzv6MMGshQMG2R5Gip6NBQkq7ky8gMaHJIRjujA=", "B63Mp22DN3KIOaG2rDs+1Cr7h9cq+Y9S9Bby7FiyjOw=", "Fx7zeJa64rECCgpYOb1ReEzhG7QjfVSMFxFp0y+hm0A=", "IP/fy4b00AUGTtvClpGMMy0y++/xcp3lBWomq7w6Nfo=", "COzXpvFzXu2GuqCU5gj0iPONuzmPz+1LmUODoMqORkc=", "HD9dhuWSH96YkBifHYxhh1QohgDmkovBgqxNXkyfDMs=", "KcYRhO2dRg8zdVihr2Oap+PAl15AFO2OvK1KJdUeq/M=", "De/UWyiVhygiituy29rval6bGmSQKnNPQCuM77irO1Y=", "CnTqItigkzYGBhAXmsHYL/+pSS33be7U6mDgEzsIEag=", "A6N78S2vFADSl6xKwTuiTBfcJi2xbIUj3u5ODM3ppoA=", "Ef4XkNWrv1k1/yIxjk9//mmWatovkTa1T4MOrLCmU2g=", "AYFlhC9AY3XyNGaGkVr7FL8f4FZMiFjuO94Kuj3l9o8=", "Jh2yXnz/Wp+3LydrH5JgtmcwD7fTYbUP1cDotplbBfk=", "KjrDMUsrZueW++Nt93jF5GlyMgzEPsgHBIgmtnBLp8Q=", "I8qkuA7PqZ6dP+orvB2782nRv8iTfQPQdAYcMP2M12s=", "J9smAIXiJImN8UXyP2NfIGbY5OEk5YHoxiYZKbHf4Qc=", "J09sX9NKeE1rkV7wXUJO5sC6u/Np55qxOLgWe1YY7H8=", "LDop4TqE0moJEckona8apM9YQKraBwHVfiPfx5babaE=", "HqIQ8gAaM00+gB9OUycNQtp6rzF6VTtCgqp46qIoLm0=", "JU2+tSiEtpnBun+g1ugNYQkDsYo+UJw2NRzMOwJJRuM=", "BZ54HWWJbr4OS6JtwvKZB/R7ze2kososcT2FBeox/V0=", "C1sc7GPULV5hXcJpuIWiTO8wPseMly3RfNuz6RXMT/s=", "KnwBXpw7LFfKi30m05obzIXW/6y32fvWbSqPHWTtDJI=", "Kbc2uRHXGnnPY9im94bxG9Wr7iQWHcVnp8hR6uHkO1E=", "KFdFqQp/49Ca9agIcEvGnG8XAeVzkS31zB4mXVlsQUE=", "LZAbgZXDyWyMNuuZ/sATTsK4MEroEL0w2lVOMICCZxU=", "GQXTUYNV6rp4WbWR7XuMnCU5gPBFDb31TXp3groFg5I=", "I+gTAm/AuABk0ZtcVCiUL99+/qgL+o7ECVJyv9t7TJ8=", "I8ChmiUsh+axwcIbGnmAAgDD+/8+MwDn5VaAcd6e+4E=", "EcSuYHuuSSQTv2LNqiwoaO0f7G3AYxsGfKYPqxJbnio=", "LNBV67fuRoY2XepFDwRv9iQF+uGxr8n7AXB8+B2g47k=", "BTyf7y4CH6miD62iL96hUFtYoxWbu0czfb95GyFbFFI=", "CjW9dOh8urqr6JrRMZ0snoY7TGMcIZOMmlOVv5eHKp8=", "HBFQVlOc4gzVoE0aXEPisA++g7JZAb429d3EZm/Dg/4=", "JClUBH5Xcv073tWQ7IvrTFQvLiZMjD4oTNxHNQXFGpA=", "Diq9MVtHwNyThJwM3yZ+gRy9vbIApufCtn7ffLAXQhQ=", "KCs3AgwIkNdRw/12lQ2AaGaOHf6uYh3VUtLeiH2i6nU=", "KJM4UiZrUtnqa1u5I9nZTy5aW+XHeOdeB5QsI0tkO9k=", "CZq2dlUFuhGY7xQOd7eVTU++eaBWznK6zjnASMANo88=", "KvIR2OCsLY/af4SbjyKaIlxhhrVXYsensq4tHdhcV8s=", "DNBw8jQBSigJq5DHHB2mHpipYyL+3Zm2qq4coQTz+s8=", "Jnk+KryNPDDGBib7qhWPJjWH1r0Vgz1EixFiZLkwJWo=", "IlvjbtDuheH4Ra2oTldIpWaZFSET/2G1BWtti95gwZ0=", "AhdPSe2wLVFU0r7KLckrnMWVOD2h/ejwnkte4+paBl4=", "D2SJHCyLAg5Gw1lMt1jwvdzb0JvQMIgW+0FzSoaYcsM=", "GSqEyi+Z02mR4tKx3v85idHBVsI54Q6fVhQOGFRXYGc=", "Kd/Ne2PwWr8nU6jDQda3pgxiQ7BMmhuLMyC7oEpNR4c=", "HuJ61rm1qGdzOvxhorPnalK6PkvV5let6R/AOIGduls=", "CrR3PxUMP4rTvJU49DzsOVp+NzGulz/v62I6CSF+ZMc=", "E8NSoC9ZUYYgLLC5n6WMVUKrZ/m206Cv0QPe7/bYD0E=", "KpfPLBDEv7/SmfZ8UqFp+SwFt9rFakHE3U/ofIJGzhQ=", "AL7LtHBCvX+Mn2u0IhYtGu0ImihIL3/RarBqEyhf5wI=", "AI5E2iHXOGkbiBdX7zftKcW9n3pEUPz1MpCpLMLKIXY=", "KyBai21LcGPZMfO7XTRkBThD/n++S4PBeIP4ZSeIKhg=", "LZ4yp8kFVv4QjSVawB513zOPzWOyv4TBkoDUJymIY/w=", "KaMiqEwlvS3fbi5CACKNlavWNJoCJmrB27pSBzjOypc=", "BnjJv8by3wEvT+VeM7torBTO0d8NAhUnkgidBG2CjEM=", "D6/zpedCV5T+IKfg62FbixdgOUt/IwQoajrkAJEk2yM=", "H49bYRr5/rnOqGwIQFgSBVPkBBA67iE/WkHR0CVBwNM=", "Fgh12EeWAvlvQKzC0ELuUsFYi2op3kKEllptxskw6gc=", "Fth6UYOjFqHXCvyVHv4s1mfHcyj8/aRYy/X+MEX0bZ4="],
      M: [["EkZm+AVh7VkW8vBwsb0kjG1T9E0nPZVqDIe5F2kqTRg=", "EZJPAv0ZsJJVqqHPRuoFGOPXv+70dCFglJEBHbC9CwI=", "JH+n8CIwShmU/1BUVsIgHvm3FzaUmNP/zkRmAe2d+EU=", "A/17Ge8shh8i93/4EPVOJ3vJTrdsAtedmGvj3N8FHD8=", "GL1BI5w+cVeaZ3RD7P+9VVqB7u6mk1Kmi2fIVjwMKgY=", "LXjDpdKN6f81vwoldjUZblcwyn9ASTJ3B4zXXai069w="], ["ClFKXCJ/TOyV36Ap6N0STDSJWqRrsnwJEfN4DVAVVAo=", "GS4W0X2VayV7haZS7v3y7glYnqxb6AkVd1cj0ssdoG0=", "KYzgweMRO7k1xwWOd3K1M7GqnbDAkmvciRflYFyjrBA=", "CUy06DYhr9Jx5BvHFyfwFY69YSI5rJ1pixf+S+Bbf8g=", "A9iAOVvpPCfWSa9f0ULnazORjLiEHVooFzvVz30yh5E=", "KO6ua1hmrWjkQ7uvkWgNt9fiswN+OP72G0LLzP/OyoE="], ["J4u0mntORK6kbrD4gstpKAGm5g/dW1wjxjzWXMzk/go=", "Bj7ewb7YMfUGr422SNb96hRTRYh+i9z/EJA1odm2dNc=", "G67xy1UJtSakIGH7U2V/mbMjJQDoVRksvoyUDgaMR18=", "EyRWSse9+eIhZOmFjX+o42ixZerqPa9Otn7lnA3y5dQ=", "AFdhuMauyxqMpOpN/CyDdgZKSoAEzu2iEKVSQFYt3BM=", "EMnigxWdWMtMsuNf3oOjuh/cKAAu2ZY9KpnxhheKFI0="], ["DDmen2eqQHB6ID/u+wuVi72tzsXKNJAdJT0CaiQZ9qI=", "CD8N8/GgNR0DMOw/9gLKjMNTt/bnYscQcYTNe0I0SfY=", "Gmdk1ZQ/xKcgtMChn9uMcRmEMHKHpYubX59dWCEssmM=", "ARpjom/qv4f6Zr3mbMJakiyWOC12xqf/SPFTe+rtaDo=", "CMp7ZGV8NUjzK+9bY60kKIpBwLJRCZrSf5Q0MH4+ZNQ=", "AZmCcEcek2GVVEawzbi+qRXsBnXxzWSN3LBDA1B6RIk="], ["HWs9X26jacJvgl0jYpM+qjHqNewKd8H72eAcoVI+RDI=", "EZ7xiLs90NMjBpdsGZQehmS+aH56aWkton2iFabwbUA=", "LZ4KtcBok9/f0DSBOBuoa25ikt9WCdcfLGSy2aefgJ4=", "JfFmMb93Bg9+o0CHwCW/E1eEMZ7wjNouMUGe4KUp5lg=", "FEx6EdpafF2rrj8z+9A8rYbRi8WUx5pJfsuYlO21VPE=", "D5cRYmJ3I/P+rayyiwwQTLj3TeUIdS+o18DbKvE96O4="], ["JL5RAJVDYgbdCr0LDLuVyIOrMEqlJZixppMG7JgaaI0=", "IRYQ4q1KN3Qm+t9waLDBpsKZoWTBwaYD6u2USHDQubk=", "FaZ9mBBBsfbwnz+evv2GTnedOvCBV3hqwHdQXlDsefw=", "BJMn+nnSjBKiyCQGlH938Gd1sCh0aLMTaHdwHb58lZg=", "IwlA3MUjJlj/nClpej/UFtFw6MmY8aqF3qDELXn5Uao=", "GxIcBJzRFZ4okAfgydqZlcxLq0wm+4iOw5cqii5laWQ="]]
    };
    exports.default = _default;
  }
});

// node_modules/poseidon-lite/poseidon5.js
var require_poseidon5 = __commonJS({
  "node_modules/poseidon-lite/poseidon5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.poseidon5 = poseidon52;
    var _poseidon = _interopRequireDefault(require_poseidon());
    var _unstringify = _interopRequireDefault(require_unstringify());
    var _ = _interopRequireDefault(require__3());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var c = (0, _unstringify.default)(_.default);
    function poseidon52(inputs, nOuts) {
      return (0, _poseidon.default)(inputs, c, nOuts);
    }
  }
});

// node_modules/poseidon-lite/constants/7.js
var require__4 = __commonJS({
  "node_modules/poseidon-lite/constants/7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = {
      C: ["EjmS3zudqmUTnsE/u1L300jhNDM2hMFZb+sOjYw61ZY=", "L6RvXbqZCc6ZhKAeKvMLVQ3+yXi+krSRGaOVnH9iNwM=", "Idj5TTvZjwtjp6rLF1ssyhOy3YqM9o/DbZSuKUAbLSw=", "GowGxhBG4Pjcajm8V66g0H/X2zTmj3NXnaieEWr4frg=", "KYzXBG9YwMq3dSOlim/f0UAbieeuXu9JlEQtFn960dM=", "DqxzeWZxXfSiCzGraT7ahqB/PoMPykdaZXTWf8Xxn2M=", "Brm3GLs7bUXgy+bV2aLwlqd76wVoIXUNByJirypwoz4=", "C8za1uix/fuoRqlVP8eQWz+W5DXWU+7DlyVl4fu8MCo=", "Gz/0pryEkJk6u3oAI5PNHBwAf0kkD/wq4fEFfPzYx60=", "AX8MlFLXDuzfXMi2sLIF7C2h3ll1DW0XCXUYMbfkziY=", "DPGrgFvEehA0mudxNeqVpBRKbtBxj97tQpccFgeRsmk=", "GNysrGExivZEqw8uYe9IwpqK7PoCgun8MltcAocQPOA=", "FvuzvfQGbisvBQuJtoXUCHEWhdt+RjjeyQqxzHlDUP4=", "Du/QuGF6Hs13Ef/V9sTNBJZIehsRRunz1TJ1rxj8bG8=", "A8cH0YNQZvow5ylaCXpv9GO4W3eMoR2b0piNQbYAquI=", "BjrT9uP4RD4JCK+ZzjLSwJYG6EquXjrTDtYNemYHOMs=", "LPZ8yc06UxPZkuMVAQ2Qy1AfeQu+NaFmOSpR2Q0Rc1M=", "Km56e/fBkNTk9/JY2JDdQXgOKPa3Hok3FvcBQPRAazQ=", "JhQEIACbbYxzFHI+ZpJbrc+YRA2mwrl7ZqUrmMvfHUE=", "ISxhEUnQV7L/78mTirFJjTsmU5LHNIC5ywInaQbkRbo=", "CJGKtobBoWClXbEgELIBUPgmMt1ZM+J80BEpUYzZ6VI=", "Fz73dndJoySbAE6seqfpTasg1GXGXr9Lq0IvdD8X2LA=", "BJ2Q+1SeDiV5D1plcHVcaME8l7GNZ7uRmdx2U1X8sf4=", "DRqnz+bKngSKxs4s2kDG1kr7uMFafNngIiVm+ZIqFUc=", "LYLizNi9Y7K6RLwPTLXsiBQqRAis8drUUqZughn2Z8k=", "Krc6hC4Lv+Ip6hFUv4rrSM8vwom5OUcda0ZbcgLrI1Q=", "Iz82uyBd1Z0EUxAGRAjG6vcQFzoRj57SEVPJmmsHg/w=", "GMFKUFlbjfMhJL9X+LjfQwRJ81mGJCov95pkT1EM7yc=", "GGUI1rdceQLtahlI+RCIx83flz2M/NtOWlsMrGtbItA=", "EL9CmQEEw5sn7wukUbUQy7AB+Ow5oxPSWb5DCdZCm9I=", "Fj6HX9ngSyVZcQcsDS52FO4fPH0rk3maoVcL9zFT86w=", "KSWln4LBRyuBIJiOOvbPJMLr7JqfD4MLtcgmBhxl64w=", "Jcr5/2VD3MNOLQuMKvOzbr7z1MP+YuKTfOWQo43y2hs=", "FMxBf9Z0CDCQ9EY/ZhgOSj84yluof0iJ5RCtqST2t5k=", "GCVQrtf7O32S7wuR9JFqx/fbO5QxA657ouCewPSghRc=", "IWMFhSRnR1qfk007ETKplkL7eftruR2UjzkayeHD8cg=", "BCO3cfchVxbPl7OnLM/+FWu5+Al8d6K23Ge7WEhom40=", "IkfNWvi1zgqYOu3pSfgdx9P8Wiy7640WrUP6LDqIJTc=", "BJkM5JEj7R7Kkt97yisnHQe6SuWjDGoBGfd7UcNkPS8=", "Bk6LspzAcq9yevG3mvUIlqZUjexBusEPAxn778G/750=", "Bfm+gzUaA39XT9D1TU6a5crbkwzrUckbB4lPAWD4+kI=", "ICzhfpbLJOiYbNCTUauVdtWlFnFo+dXzh3xMXOA2KbY=", "CYovtcsBhozeZCTEIRuVSbj1UKfwPn/Ni1EhUWs/RS0=", "LL2UflMs2g+PG4mf+83V4LawhFHmN/5T87So6ngyqic=", "Dg+kYgz8lD2oG0C2tC+G/nTlWQD4AGRbpmE3trfHKKA=", "LhyggcltWr8sxAs3l8OLCuio71125tA+m7BnQcIYQSM=", "Jxzz6nsGtOdDWFrmiZfAFDVC5AXHCFV4cYEWPkrCC0U=", "Cd6hJ5ctIQnK236Wq7p1d8CsAHcxK5VQ+Bt3FqkvXqs=", "GYLMcW2iCxGVJcZKP+hfXjG6qXx2yCN2mZY32O8cigc=", "ImYA3ou2Wzjs+Zbluyb9YojGkPFqXu23MNk5MR0MP/E=", "Ag97d/u8rZmOd0TKJ8D3wMJVCj25D+KJROc9AdJK5ss=", "HC5EXPyYY3quvCwat7bXkOusUCcHHRBXqUW8kEN8ScI=", "JEs0lQLfSjNWOzAjfudQ55veE18LCJbw2c3gTxAEFx4=", "EIYKh12AvXHGJnwdVLAvtYyJCxz/w1+nB/5qlJQSgc0=", "Luxa3ezE4kZQ276lMaD+8NwyfcaU8imyUm0vMLLEmcE=", "GIu3FQtuQGJLAuooIa62tSsehbW3JLwOxRL4+mQRgso=", "BeVgB9q94syD1Jg3HpmtqVPs1p4TXvAgTS07bMH0mqE=", "JVN1WzbeYR7VV3aLtVE3MUdKCozcbbqPBPMDGwdoexY=", "HPJn3Zv7bmeKgsd0WFemPitXBmqGJrUsD9X/QkGKpl0=", "EGsqQAhzdeopiLjgcA/dcdNxavK/0Lawym4kq0tMJeE=", "C5eOShDbzcvH6QquLKGWFd9nSBnLYR2TtMv18v+aChY=", "LtaP+6amRuUEdma4rWn2yzWtCW1tNP4cpn5TK1GGu/Q=", "I8Yywv5o1PCnGx7mOVHHK300l5fwcFPfLtM1IOo+lM0=", "J/2l+CbOaoNA0SpYTUuchPCk6jydM+ro1sDiOlqYl+M=", "LSSqTAdyJW6QNE0g1G3727Xp3BMqT7B/r47dqjDadnQ=", "BI1SxOPXFIXOavEi6hNuYAU+OH13Np7t+Nm7xmP7mPc=", "DgwfAFoXWd0WEwL9sjPLrF/hUbXCGSJVvXV7PO2Jn5I=", "Iw1kHEVS5eVUFuNg6qMpAHUd5cpT6GVK+NQi7sYn77I=", "Av9vqDZKjPsZ4wvofUze7Z+VfdAk+BONU1xjgKi104o=", "FomgR2KlqxOI9qclfnxyg4UTxX2n9UaiAX/xKK/hYXE=", "KI2McyUgQlDoYy9C3r7ooxpHAxKrL9AK+8dpT5W4J80=", "I5lhNa+fOkKm2zP9VTGafK7Y2i5uM4Bo149UCFUsg8E=", "FdBS2tzhRQb8zSaQwzP47Kw4LStnNHJiNs+ce+J4u+Q=", "FJT7ZeWZPZbDC/C84/Vtzmii3lIpm0gJzBGeN9jgQuY=", "C4AO+HSfkbMHlHxYEJXskoPDsTG+WtW9pCAJkvv/BTw=", "C6wfU9Wn05gRuufBp53Jl/3V8ScPcoBfsF9cUtd8HLA=", "F5JJiT+obuBntHu+gzW4lCvJIa4OCCwwPjK4Cdk5eG4=", "CYWnybQoBdkQqJ4tyVY+fjRJ/VtAH/TV6sddzn/LQg0=", "LBkFtfAMknpXoVTEdEJ+MfPKq4GYHWIft/6lJczam/4=", "CyNQLOBMD0yzDAvbbE8qT4HC7yI5NvB+9XhW8Km7T3A=", "LcBRwbz2NyM+p8Xghq7X3N61G3o1JYIL3W62XleFGbo=", "Jz2KQWbcP1Ox/yTGHxo7MAeigrUmxyOe7IHpL1HHQa4=", "JXmIvn3CV6DF3XB4ty9pLHVfAbo8jlfYLZuWlWXb8Po=", "IT0P5aPnYI+mAvW1rVuCYGVERevXJJKjKtOZHzpaYhg=", "B6OD56IhvHb7FDcNSz7ujeUCYBpeTVSzNwxMUCsJeoo=", "GM57PmR86aOpDQ7ZqlfrmoldWWpUlYzJcC2NohliPoE=", "EjIO4Q78H4EY0+ppdXTq4t+vjynBg6vRIzkuPCgpkAo=", "CT0OEwTGYP3a/bSClZKPtqgxFIJ1ZsvN4m70yHyfqJ4=", "KTG5KV2W5blzZLN9rv2n3L89yfSKszZNqdxqcjTXFMY=", "H1M6HktIeML8LpcG5UHShIHOQ7FifQukZZaQbPMoFiQ=", "JRfLck0S7m6/p7Sw0lzwMVRm6Y2MrD/7+xobze4M8GQ=", "AOQ9yYO8j+vqrUATBESrf5GHGFYkFJp/J0SS2b2Dieo=", "GGvAmn/8Tt0pFXmHa3fC/T7tCxuD8h3fuJkDnOt383k=", "BdIqL0j2RljhgbiuXnLhqUJ5avK/5u90rJq/U6xl7rQ=", "HwBujSRjY2vKeH92X9ascjrSwuRmrmMk9dOfPu5Y8M0=", "KJE9Qr32gEeP/Rc3Tolf53mdnRABlvbMww3Ajzmkefc=", "EbVXyNfpe9ma5fSegjMIvW4iaUIl1AKd/c2DbLfArXs=", "B0S1OSbhoO85W7BJCLEzJq4YZqaJg8Qd5W+3zH3M4pc=", "K/svJFanCYmxZftqPub5RNKDYpNcq+UWEUmA8UFCKgM=", "MCcEeUTsgs72JA0WNwcMYixdKKdDAt4O/W1K3dTcLbI=", "HtC15LKa6wtbPrEozwMXWcs7xHzBKGZXzf6IxcQR1KI=", "JjR57nfkTosquVPoLvY6fkr/SPDnMPR4KyJcsid3EE8=", "GZBMhOVeGvMUfNt/OkKCZeIMG7zL7Cpci5UEF8ou5HE=", "L6hGj+oyBO0qk0oe73x4WAqNowxexZIvrImrkq2Bo6Q=", "JnwLSxlmLPCbhw4F90QeBC5bli9z39eNIzhNx+pxr6U=", "LxUEZ1BBdVQJlG6MX1Qy01hJunvqDRJRJUeuaEuDrC0=", "IEGZ1kmC9XQyf/P0AHBeClOyXVmukc4LnTH9u6HuKww=", "Cgh1VOVRFCZ4DkV3V8F1z2GHou+5Voo9OQ06UcIpfM8=", "Lvm4hChGX1NcsEEZ9RjRwgUiaEVfGrFFzPFpO+kkFqs=", "KpbJ8gC0d+ungxb8RJfgiypDhLJsl8e0zod8tl/1Y08=", "BDKT5h7xthSFC8AV3TFuLHxU8S0tt0b3wM3LDsVRz8I=", "HYHg4oBhG/MJicGnQIhJNQS4GLOF0E2WrSmNvtmnvfs=", "GtnPF7g2jZgALO0s9u+ThaB0xeOqCy4S9LdozEgEveM=", "GbMKJxGf9Q2ic0sSergymaSwmWlMMazBgqtFP8AA75U=", "Ey2B8Au+8oBJAcQHP82cgXpjgyww1lMGP2f9hkguGZg=", "KS6j7yMThjoSdrHw5Jc/p4Tep4oeyY9NWTlH9qTnOSQ=", "Aoz7XgxBsMd9mH5zelAYeHB58v+mUBAvL+tzXH2bzoQ=", "Ea/XXchDU+L5wvBdHzynNOtFVGuSOWIzo/KfTo9nkbM=", "Gq9D7W2jm0UxIL0DEvJZKU6hAbZ43/QnhDwPyBZAntY=", "GdsJ34M4ex5Bhc15QAYJ55835aRljb7geF2rXczjKGg=", "Apyz3K8uuw9bC5SehCeP7S0R24wfzzXjgYmvyhbAy/0=", "KIHfk1LSdPDP61Xfj/6x0Ngfzat5QILiEH4bBCanMKI=", "Biig+VlMFZIGx2J6jxB0ih3yzlgrdgSo5kpwFevdtls=", "ImVzk+t+2fRXLCLNe51RNNH7zilcKpXxr8ZEHeYNf7g=", "AGMl9QnwNicUxIUNrth0QGL8+AmGCABefQi1CbujNiQ=", "Fx1kmLQrOTRdVuhmHMwrV270SbH45b3FrHLZ+T3D3Zo=", "G+gvOxzJ2ElZXYXjOYMxGGtuS0y99Dzu7b8Ec1MVqNI=", "FUcRvmLyPNRghrkxGyjurajSYyP4hk3n425VQ7zXo48=", "Gezl2MC2zAf6ARl0bn82ycjUlqweHZXNW7jXaaZ0XNg=", "JtYWLY2cnGAkTLzBu3iBQmX++XpToWjGKkO55vTLLRY=", "KLuF/vn2WITkqZpjpZqQbVhs3Yi7p8USWbH+ajdf5K8=", "JnzKweNCcZceR0F5xYAFJs7vLxpv3arB3iKZ6S2djOA=", "LmtIaNFTkNgBQkjuwMfxDY7p7r+mQCX5Yezkmp/62YU=", "FwOQI7ok43vEzeSX6V0TT/Nd3m/gk+14jkg50rzs+EA=", "IURV2R/HR8aqmQitktGbLcdahGURg9z0O5olYyDDPlc=", "CgdAXwNtMOx37GSwNLn8XfLP9Yd8PGe3qyO58tja0qQ=", "KfaAcoS25DXMwvwUV5uu0KYGF+DuM6NYyzFoEbPYhko=", "JGiU9gcfyWMPaRh8tatQbAUIQRTS788jF4C11LXEoMY=", "BCJAgbkKZ3dNFf+Y5hNEk8AZJvfsJQU95WIVwUXl2mc=", "DZnP52SdHf0pLxF3O//xzjZFzkISeH7TacCga2ArqyE=", "H8dgIzM7pNwPKo26+7ob/zO3U/135rG9xMeWoDG3gVo=", "L2DgX6H3RGc1o3F6nXNyilsgFmU3/+tlcH5fdQPorPM=", "Git1CJIfoFT1jKTW7rEzRTZjyJedYhbsnuEkC4yJToA=", "CgrKSSS+ppeaVuR68L+hnB2311a7Sq3gpY5b3dfdy00=", "JiojZcx4D2JVfIVFZvosiCLm/f+OrbkJSfqlq9Y6f4I=", "Ga1aiC8dxJcUKVRd2j2xhXscoKJGdos6KwAUulowJDk=", "Jh4zYPsjwI6HuPWIvVnwjO8Hu0im8SJqZM3H1N5+lco=", "BpzGfK5G3tGP3HJcnK2d1k5EXJkCcbDi0szEL9zgv1k=", "Fi4hiWyNH2wrfsFvt65++MjuGSFq4Ymm7y1+vbHOYsg=", "Eo1CwIRE2JVoeZlaEFozbEJI/5WBE5Ei7ZydVUZO6bM=", "Euk5H38THxPDlyXEQUZpvMZMekG2dk5ofO6OUHQz4+k=", "HemI5GwsmhwA2F36+x2nUJvLNkIqq2BS/R+SffdBwXA=", "IALLinefk96LRNf7CM/1CCjgdx1lAR+ZVLQk5ngCzw0=", "KPblrydSx50Bo8bH0pMP37FkmJwg+QXM/AmCwpNl1jE=", "GeustTVPfycvXBLWxxs52J4UqqTvv5hzdzN/+jwCays=", "Bd1HxpXMbJXirNG/wM4zXLMEo8M4CpTot8BwaCyoaaE=", "JGvDwDejya4run5zV4sagl4WcqdBiAHMB0OVRTTZwMc=", "G37iVYFbpwIPDPeM65hggVwO66Jopyzs+eP9Gmhws64=", "HOBPZDvJUTMWIR/cC8I8mlK9r0vM2coYWQwXA6LRIOE=", "LjplMq+pU4i0GtWdfCcFRF184QyI1zQRtycfUu1MRMs=", "H5ESHyy9Hq0vcPT3RymiVyNyGolah9czlMycGAn8z7s=", "EQgkAziKmdoN4+19O4c/Wrz3H4vqbjWPWw8XylJ22SY=", "A5YqaR60LPXvd5vuglCGQTKe2e63hX8c7MRtyTBG4fY=", "CmeRDilFg3OcK20Y6lrXThQbsqNT/N2T/D74P0/Xhjo=", "HCD5vRMjcJ/aEk9x6IkBI19ExeSCh78PQ7RUQ93Lrlw=", "ERq1bhknTv1HOStwFx39qwyM71tt5XneZ/V56GtQb70=", "AG5riObwzfmC3kg6oEu50P4ojuWGOmiSkV0SXq7XhrQ=", "KbxZ1vum1pLipehbpQ1v2bz8zFfivL3d1liBr0Rf/4Q=", "Jh0TrEQbLzAJbB9/ZqbZcyRMLAcCESdaN9SbHXA0Dt0=", "B3+NknP/2jftHqaD9pNJcV+VmG0mFj8A1ByePDZsy/w=", "Fnj5/GxFAsI1Jn9LhB2VQyCFQjVe19tCCmCay46Ovc4=", "GmW0HcMCuQb9FEpZS+ptkJ9y+3B1ALJwg3yaJJWQB1s=", "JlNZvw6td3Jk0Y27TEZkMBojsQV5No9AtDNxC5f4B6k=", "LpRM4OtlN0WkVjLAcLkx0I7MSXPqCR5dxnElzJBF5B4=", "J+MCWi0+gmFKTdBVD1k1n1ZDuGg1kmrtLrCnqk8GIZo=", "DZhI4NO4vI1D5eaVTm8BgZhuV1BUhA8jjKtMtbA//8I=", "GsOq2BXY7BOwNd7PZ6aFSWqHsQS/V+84zahVh3/KfHU=", "DJEBhvkS7vlf1nPq0igf/Q1c6cgMxR9vkx0MdbnAo68=", "JItjp2oCTVzy5Cob9wqVTwGxhJ2sMf1UWnzXTFw6HlQ=", "GnH7pgzTY7C+PqNgSjhs0d9Ga15p+TUDhYxp9ahoaV4=", "FaKGm2NjzQKkcsvOxckb+hckLO3quDCE8O7fKDQxeLE=", "KBPBBzH3aUVA6s3oV3hqskQ/sYkWGSQ7jU2aUppzNUg=", "KqlpBe9CvB6EUgh/4T3D1VzpQGKTb95I/Cn4aY7V7FA=", "Dwk9Np+tCg0lW/wxHEpY3JihkAzzWbPn2WiPZZG404Q=", "Bo27xTCWd2XPfH5puL7k7gjUhrQg1TOWJshBHKmEAn0=", "HdDKtxVwlB7pYr1h2tHLaKjtgCKt/zVqZ/yrOm6vWu4=", "KahX8ISufytQbv1s+wZy1jrpYM0ZefeNf1XXgllVN3c=", "IIH3cT9Rs5MN+gpt+Og2EbyIKc0fhHG34uF/SA2FPDM=", "Luo3SmCrGiBkjLkI5gXG2FmbpgFThjXIzO4AyryFcns=", "GhtovSlREx5tcZUiM2R+QWW8QS2m2Zwhl6o5fY0+5bo=", "He/fFEFaeNXm8oeubknrsRgiuHNMnfkcgOCN5XstTys=", "EAQMxP0gusymniYocTi+TayUBAzGIk4r/cdmYRBqckk=", "IM5n8y6CO5iAEdDDOrsPclvpb8mrWy63EBL1+ApV/0A=", "IC7NUMgsnhx58P4TZRiyJVHAWMIbbuzkNYW80ozE6oc=", "EPulDAYPzrmJ11NsNpLwwyQzOCENFF1hh5JnmLdHCH0=", "AmgJNuQCdl3WzP3+LepxnTxQenxVESPA+d1ZpYv43LU=", "ECvrSlxMkD6u+eyw1XlBVGINfp3oQ2T+BYO+ebTefPs=", "CNAdsY+uzRomwoW+ZUFL8YqwEtfvsmdfSuHW9eE3BiI=", "ES/l0hfzPC0tGXYtKGhBNmungrS936M72oNvot5BkBA=", "BkiF9FfPr+bs4pRKmpNe/ccXr/y0RJzrMaJ5LV7qZ2U=", "C73DcattQpbnPtIHi5n6R9AMRM9R7sCtStCqucCc2IY=", "C55ZtpmqaI3RIUPokLb9DjSADWtED19rbEJrMK0HiIc=", "ClqjHU+rjhCbD9/FXrFKXC2SZ9f5hrYQFwzlVDv7MLc=", "AyOdULSgEo45x2c/L5nYi1kD6xu3cExsDN1MMUCKems=", "EaaUWUmhgnWbbx2mDq2vLHMMzmbqBG+PXreB58RfjJ0=", "DFAv8b7YpocmgD4iK4fVkHSVbYNPLWOBfyqe/tPckx4=", "Ii2dqjhK4rQOQ+J0zAfS27nraYjQOJS2+/UTNmNMkX4=", "Hfj+DdqOUZcbkXsP8PPgXtSwDAlUU1GhF3gFxQ9rwAk=", "Iiu4KQQFxbM3PxsZmWnG0Pm6jrdy8kl8VcD1UXdbJjU=", "B5Ar7CPZ+RoAOpKOqv+WR6wDAondXqzYyv3TG5MmTRA=", "LHBvBZ1qhupJbC5Gk9FxfkCY/4fQWoLXOP2Ig6grnV4=", "Ba4mFpS+4kRqGBNgjt7GlvJSki0z6UKAqoBb/YQ3hvU=", "GG7iynecXCahk63w/0fZ8zO3UPmbd2VQEcZLPozN+T0=", "HCq26W9o47LM5to0ZbGePkpDex8gnFXm75mhrAc2vRE=", "L9F9t+GCcWnDLM/ArRTZ+Xx1B/jviNxdbwSwIgPDflU=", "JB+tdXBihBirl0jO1TZGwuEAruvWKmxzgE8IDeZtlyA=", "ABa1tTQD7m9H5hAMJ3jKlwtAr2vid+mLcQMviU5vai8=", "AAoJWEL3GOcWRbLoHJCz8IV8jJNbE1sMsl3xVB04x/8=", "MD8roE7t8UJbXXzEvixQiLnS7yv0eLnpuM5v8WaJCb0=", "FJRDUULJb8lOjWbZtkPgGRY8asLk4WIFb6j+7lGVZmc=", "Axzbua0o7FfE4ayP9mx5HQSyWiirytroOlVz4/PUv+o=", "DHh9/wEvE2uJzjUWwc+GeSjXEH0hjWLVGwstjMmFBJg=", "CyCzFJB/Ui4XqdXajBD8+Iy5VlVs8HdFfB5KmtXcCw0=", "EdXK39BBicbBSknoumeDVArcftcL8lr+Jd+eL/2bw18=", "CFIwnVDxRTjIt9NWWNibow4pqrZiZTGqoRhf8Mq4of8=", "JXOV58GQs83OX5NNvqkHcFAIowWTxpKT/XEFYiYCYEo=", "Cq43r1w6VCICk19ZC2Z/l5+0FCc8yHkxYQpLMUSuv7c=", "HBZUp3/q/Nf+66lMMmBfld7QPhPAimJ0xH7bQRNOJEQ=", "FIDMTLO52fyXuZ40D+wZgj3NLt8Zj3CV7lxwqSAJleA=", "GHEQV4aRiRJviFNqzOpIgqNHl6ndlqlMyHuOpGJBdlU=", "DpxHNe55e5xwgzp6a+fCz8uWLwcMqqZJRm/fm75YKM0=", "Li44zOp+9sKakisCfTHZhwrA+dJ94Z1wA5u9H5D/dPw=", "HWY2npXC52Aw44DWU4qTJ4+R6l3WDloxaz3O0n/BN6M=", "Ke+RArXmce3AX4e8zrbZAEhOfudAKjLMx3/eLnhmoIM=", "IQOwTBc191Eet3XHM0oLttYm+2CTe6N2Ha1zqER4490=", "DdG2uoSjwptikjdlBoz2PHEbwda7KO7+OKDkhhrROWM=", "HqtMf6q+xYq5tzsrqvIeQogLd7Dw39MNOOHJVendchs=", "AC4aP2ad/JKbnMhNltSJ7OEU1b5duFcUafd0z29sgCI=", "EhTKQk6hUXhRUNfbV7k8xrvI110ZKZOEYKfGfwx5HxE=", "LhdN1Kr/9hAxZNkWX/gxnZJgyGIYUQpNkQNB8LTgHTg=", "ILMvSkI2F/7xRtpfGiaV/P9kl/+row3s9v/mKulSxDU=", "KfTdRo2whzSRRotwCduvx5lR87g6tk77jdLlbMmzGo4=", "JRmAHeTljkFk9/DYaZQxHIfyeaOK/EyzxNJs9BxkKvA=", "LKEj+vh13k6q2A66c8sqAPIur1thCe9Bpl0tKG9gLME=", "Dv7WUaYfowtwk3venQK5tqMCoaq3Bmh7IjOumyAzEmc=", "E+Idu/1+VSa9xQdec97grvRaDtLIgLKbfb1cnmQ57j8=", "LCSG2FqtvDWLEGXdexSVfoz1v3RRr8s5Rll0HPa+WCE=", "LJel1bl1GUO8EeBMLWClbEPZRblrCYLIo/XmO3NVDWs=", "DTh2sFU2lDgK3AhsyScuF3Di+Gszb/eAQEGeXtzNjPU=", "EjZcfN1hbSWPmuNQSzfUTpWMgWoLujdCeOi3rXmrlnk=", "G2A1TRawGENUC4/Glh/4Sljr5eQrRtIq62GOLbSt5l8=", "A3ePxyPM0DrYyQwxHBQZY96mOdJSStly2EltEp4cJDQ=", "Luch3ehSh54SOMt6eSBxR7PYZObIoUoyfi5Vi531dmI=", "EQINBYH/jnnI9apNUL4tx5KgOLy2GuxMzqLsTfLQr0w=", "Hg6SEZPjWzxC3tAD3Lvtjq5GcS4V5jrscV8/cDHPT48=", "KmwT16/WY2wtTV029CwJrDKGtncDrE0sJNz1o63ZAg0=", "J73e3qfY05i0tukVLhfC0JIhdgmxCcFFdPkyuwLIhEA=", "LhP5y8NWco5tK3pcWTqp7Mm5ALuYkBWT0CHWHrplVaM=", "EJrzN3PkFhVohbqwUT3BmaAEXUBdgb0qFRaQva+6O2Y=", "C/ehIamF0g7r6/Yk84NzB0Fa5ICVS/SVUt2MXz5QMBo=", "D3i6fD5tFdESkt0SGq1FlIMnG1/i7lamOBTV2xkpBWc=", "FiXfA16qmS9CTdxtyIwbcArF5tWYHirQ35spCla9UAE=", "GsfR8zu1mP6VgaxzsKrU6azpnq0BmB/PLFAqca/VZ2I=", "LTcpbvDNVnbQgJYIujQM17IC4uHCVG2YlBfTA+wxkzc=", "AZyqYsUjjgPs33W7LCdr4YBb4/5EqVfYqjvwfKzxwRQ=", "DzLeoQQyDODwCRnZD5xsdtSWiCeRFGxSKorKzq4+Skg=", "LOXSRSwKWp+2WkpkgvNJmIZb6aKfJm+IqK/6hQ9exuU=", "E11ZDegKDnF9pzJceBqhZ6JeXDENkt+DEg6JHM7SSos=", "HTzpanzXnpRJLjK4mD1i+sc2SZhQci9/590ViXBqtpM=", "DqOh4fXco/99hnHy/s+0Z/ak5lFsgDipMGs23IGDIbI=", "HtCMTw4W0UQFkQDwX7RjCY49hp80Lg74tKR6/nSoOiU=", "Ct9hK8DCToJhNcfeDbqQ++G9JJ90JPGXC1LouyTZhu0=", "JAxCSgJOWb6joU/Kc9e2OGnrm2h0atnDVrk/tuqj4is=", "JN+rcjiwW/CPZvvlmXY/Y9XHChgafp/jXa8EeeKxy9Q=", "Fg15oDlZyWja+3bqPgj/0s4RfQlOgg1en3zh3r07sIw=", "G2UhYYehyhZ5ZC1MQKoFv/clv6UCSKqJ1X9XDC/pNFo=", "JDUDutitrxSo5WUBOGPBOnf296D/9XHBJ1sY9UvXc1E=", "BsKtR79N5XTKz7pRXRjdr3gqit360cGO5DkRY8VBpiw=", "IUNmZz04cUhXj++JQ0vPx+DOTrCGYZBAJrMLoQ86E0E=", "HbgdmLTU2DImrkExMByONiKjLit4hIYOhSV/X3t+beQ=", "KdK9vBmJbo+vDOFdfIg7y/qjiGHXySKZpr70L3xEPw8=", "GSlfcsWQfo2fjYzez30ZP6hkBMu3qFUi9/wzhXt6nIg=", "C/AVdgdwy+jm9pCA86yhgljyzQkuM9PtYtjRnRRLrKg=", "BsshqsC+jcJSjDl0cks41zqRhTCXb/EY0IdkzULgskA=", "Enb+LHUbpJ/Vt1yrW3H2SqBYjt6AfbG9WDw9auaUE1Y=", "Khf9gEHs12L1KNEgZ6CSBPkpbqVzdIBsOYlv6UmbmM8=", "GQTiv5wFEsclWecePxMvZSWQWPfWi519baGo+fXK9nQ=", "EVteuZIzqKIgAXBzPEdDuATGAbXY1GVqE4IS1m64nTg=", "AGtYiF8OCb5rqRF2/IphcrwW1oD4iKPZLzGjvyE+fvg=", "E8ZwTpBTU1KTTc3ASDtLuXTVC+t6W2vjCvDkb71zJc4=", "D7vLlsyvQ8dzuhznBhOJJUNzL+zMhyl1uOtz4/tNVKU=", "BZtN9j29K7ZuCyqCbFy9qWwzj8w42/npxGBBkYvdi/w=", "J9hZ54aMmdgPmdGB5u9+qTppRiOom75Xpsjn7lS+If4=", "IerO0I+dC0LG+lH1nWX5ZZjpylDWzR3Um4T9wGRu1o8=", "BoFbejuAlx0F/ebX3FzSgjNj840K9cD/ir6qcaMjoqc=", "Bqd40pqr67WjzZQLHDPwVVEhe2AFJI4OcWvVoQ1VjG8=", "FP6fsfFnxiV+oBAIgRV2nmK2DvOt0POiLJ/npJGOlMc=", "CQMF3/MUF04n7evldL2PDI/YWEPn0mJ9tgeygW41fcE=", "LOI9++uOGHS5uolMuF8Gi/sEl1Vc/T3684iKpJLSBEU=", "Gw/ZTdnP53TZFGvlhO0LJcssdJWnCCR/V2PCOA5cHNU=", "Bgu3FrpyOk5fX6oXk2OjZ3RhnR4M2Rv0eJoarbPmEqo=", "BDsQxQjoaBhD7dwF5zuVt/VNpak7cBy6TWgi+cnc9DY=", "Emc06VArqfrkoxS2et5s6IkOMEpDDmyfT9YMuK1plQ0=", "Ju3TXbl8KrLOJ7UDWShZtDF6JaaI+XQ+8N2cwmGdt+c=", "J7Il5KmBrzbOqGP1kci8WqlaS+ttXJq8XgO6kG7XIGI=", "EQJyiDL3UcMTrGYQ+uWLnL1RG1HWEhs7+mD0fbElGNo=", "GCdssBG9xtdescfV0GzOEMfJB5yMmSD6OJsRZiDuQUE=", "JQLX3s6M19egShcwv9KGj8ZPg13+FDzuGEgMfD/K2nY=", "BrIL6qV13YRiVGlQaEhGEbvuGuSChbosPZnBTmJYGiw=", "Bjq0oHj8shInX/X9BgQr29F6zq6ZTiwnobqHYTn47Bo=", "BjctWVK7aaRgvxMz70rGsgsHrUq0Ek3UBmps9m9AaZM=", "D0HU4+9V2nHPQDfEnUTApkH1KloXT3q+xSJHbjxiPOA=", "Dw7phBshubIjwdGpBpk71msOvLfa++K4AruBZcYBF3M=", "Ad8usvpCPwE5bgczkBBMrYAEpqXxQKKxjtZYBoFnUho=", "HOBbxVQHyIOlpBeS7zSG/yLkA9OEdM+pD17TDI0wGYw=", "A38fx5NLvV/cNDiL+9D5VGclTl3ytbYsrtBQCiWU3a0=", "G9amFABDmPMptwgP/mnT3/beBsgZ/t6iSu0W5MRxZOc=", "D8Llz/fp79Rv7mKqOz8ivMnxo72JF+Lhz1qjNNKdKgY=", "J0+k49hufviw/fGoGszo+e0vLrRifedXgagT8Qajd+c=", "GTrxxfoFfOaC7HKM6pBzWTWiK1r/RuovgDopQhqpUNY=", "DnLDPtYFVHGtrWHQJ8WsG/dURPxOFJiLQiaPB4fimHU=", "HHWASk7xyByDaE1ojEQpqxp+UX38YCyaJEPFnzLulhQ=", "CIA/adg+DDOX4J3UeoDPn05CNDcAjKutLlARBFbIxg0=", "LRIU7Re/gRYqXdQ6P9zxlfv0dCYETLIttThHjpQrB+Y=", "DIWyS3mrV1BEIhNfscsMXh46XwoGEDwkhu5qPu+scog=", "Lin1F90bMLeRv6sDznR/lQIC8OuCZ+8/cczsQOkdleY=", "EygclKZw/lqwl3OvQmBnQFA1Ce/XTB7Zk7xq+vPWQXQ=", "IaIRQHzvewRCFgrMnb/OGh4dWMnpjzgafrSPe9oPHgU=", "CF7x53+Sm8/60ak/kgwdjIs2MuHhoczU7LAWAnWeCH4=", "K295beNQnqcDyNpiduPqFUtQQXDFmo7EWB6XV9dLp1k=", "H9pQdPpbrl4W+08tGNWJpyMLmhweTQioBp/I1Fsd480=", "AtIqPA0yR1DTvjEhmvMqgoLDct/eSGHvhu8VwxVdzxQ=", "DCH09L2uB6ebs6mM+zUapinzI5xNJK75Lqeb+snC+iU=", "G3IewcHfgcg6zXqVrOFrPi/0KXqrtvWBALXasG09xAQ=", "J+yenpI+3uWBidbH8wPuPlJJxa73h1jH9RHPh7lTVh8=", "Hs8QYDZt6pUG/aDQHLoBbbliAJChYNWnYKddEtXXLng=", "JdQy3zEuAFxpoGofAE7ImVdQNNomOSdg0XrMgMOVBs0=", "F6DqUfmiAboqD4V8mWmn9rxvXVvA5JV+HA3+SyAuSiQ=", "AtNMR7hH1nybTcMTvHFP8iOrARJ4Bv9ski2HY/FCAks=", "Ag5Z5eW7CVGmYBIvwa7+opTnzNX5x5g5KC69nhGflso=", "JJychQFz26D/6jVowoQWAgEhw9mZDf4ukXN3RndZJns=", "AejsV7doHWMaAtUwya7vk3dYae8JPekgFM34XuLUWdo=", "APc53Lnz7m57VRl3S1QLKJi7bLo2KbtsYOQjt+trX/w=", "DgFvByT/+F14GusVSNdsVm5cJqp5lu31BOQWcoX9pm4=", "J1Jwgoud3JZLuNaKYlhUNWjIRJR+1e2UsxgMuHTGgyU=", "APHKP8KKrLisIaW0S76wrmTMM53hPgTHT86CD0+T5I0=", "IWsvickBBfVw4JEb0c4g4GZP/gGBHLd3+QN2cZwOIPM=", "GpHt+QlQyyaJ0sKcsi+N6mHsQfsGHxtgAvciZWlMeE4=", "LaM0Lq85orJCcTSERilxr+U99VvtX11Q1n2ROM14/oQ=", "KfechvWpyW/K8ilr42Qltyr6rUhly5CQhIJJFY4upLE=", "BRlCahWlmfINKXkwIGfb0UVLRlOclJnGX2GVtVx2Azc=", "D5xHXNcrfi44ZelrrviaFJ6s06s0AhCpxeDeb8CC6J0=", "FfHXEZed/hPkXuuXWaifUds9J1lJhYkLiMm/J2kiFzo=", "Hwg6wFSaGrANS8kGbwVJQUj2DJVp55iZQcP1D9as92A=", "FQXuT3m8gYeFbV8/WiTel6oIK41FLGOxesOlkUUbdH4=", "DyCHbXEvFH4vufe+alHzRuooRH31KetBNClI/C2PCWs=", "FpbRLZrneckhIO5xX2uNoR6pOvJnNxWi33cx25HjYNw=", "KEhfQ47sEzsL42sy+ugtpX+0AGvX9bsVomfndGs3utE=", "J4BDb52hJGH74x2Xllbm0aEzhuDmpTCbBQyoGeEK2UU=", "Jx6oY2czMt8r8kcebIk1sDfqgxjqWzI3lYP2EeBrPaY=", "KfG6SynB2uy5g5vcCEMbyr5oORylQPaLSEpPjpap3GE=", "KU9MxyjdQj/a83N34Gmrpm9NMADxpVm/TESRAzBgMeM=", "FGtSGxwIyRgSE+vbwqNPw+/Yfd6xv8Xl0XypUfVavRc=", "Da4K+XPqCw/N2BWOpRue/e7V62ZLhO9n6qJV/k5V8+I=", "JgTMzDcPClDz9ybt8SQrzBMd3fJpeFMnbAeev7iD2MI=", "KHOxnbHQOJbT1S1vk2Hj/a3l57Lmgz5NXORmEYa7u58=", "CwTQkLzEz6v6R/YAQ4Wa618zpt4gXf3w49CZ1Kg5Tgg=", "BQihlcDKWD7BAVbyBcobtvaRcxi47W67c0e3fXLc90g=", "CSYt+oCqoLxhxYkcI3pRnTgIxT/AXc49cfF8Dj8qXus=", "DObSWxxsG4n6AFwjYZ2Hfyqy/ecI0wkjZppJ/iWzx9w=", "LmloW0bIBQJo28EEDiPHOdchayxedhCBNtaJXe093EQ=", "Anj7PfP+kTZXvMzrVTE4+nuKtuBipd3q393dWzBf+CI=", "FtqJKt41dU5X2PA/Pm9BEKncFjnZtt5l5HkWXKSfek4=", "FZdUkk5zNIVP+AOheC/8BZkno8JtxD5mHgmhJhvXyUo=", "IhLKZIe4RbpNFsCeIkKX1LGhbjQebFk9f6utraOSnXo=", "LdCI3oMYUtFpruHWvmm1LF3uC3Phj8qRzc75uQOWoEc=", "JKtCrWdJoU/i9wfsU6w7AxXe7PQhuXUwMlM+KEkdsw8=", "L2Rm5Q7zxhoOZJOxjTSRFAbi6X01UYh6+AjWfhzpric=", "H1iG+4YYyHEewI3pR3Vx8OtuRiuPXlNJ+FYx8FlZRIA=", "Bbo0lTlZeEpXwAGekW4q3l1qUjEQQ3zqnCuURT3N8qA=", "J67mejxu94PLVZFRZaW7/dhrwGx3bxRQSLskAdzxc0E=", "D1fvwF6fl+f2jGlLorO/IW7vvVxxcQpW9GBoKmul1e8=", "HTXrSkCkHdd1BthypFisk9czbcty8VsYKmcCylO5Tu8=", "GKMwZFhtWnArxL9k9wtEtad5GCVcLf++/FN+QL1ZUf8=", "CwrlcW5CtEC3QjvYmTGciApKZ0VQt70DYgfgBqx6LSE=", "ETag9sAEosV9IaAMQN7G8CexQLNtNZTBzcGw6HB7YvE=", "Ic7FKsSyqn+A+Y63W04CgFkZd9ULZ3uP8QsKPQKFMqw=", "KEpjZ4b6Y1ebFUF0aQHUjkQM8MWG8bCJzEXouDD60i4=", "HUoKugysUcMmH3xIPYlijXZ0iwgzy6a7/KxSQ+S8tNo=", "BBCgZZJekPxw7RqqRkd6isgZOhDEi12E+16c8hI64k8=", "MBRTsj0FXBhKZa1qas/9n1IGN/51H/e3aUCdUS/JLw8=", "A3gnEEKH2Uu9wGWE021NXixGxOoiT04NwMO7VB8FO3k=", "KUZBuooCdoxeO39ULSgcadwsPy6AMvhkKVpksIqT2ZM=", "HBL5k/Dx7dgJ7u+uaTLluIc4sza75vl29fegoXj/6rA=", "DLLZSNOPuOF8YLpsZ2CMn/2RLgpifu51a40ir4ueXkM=", "JvH/cxJo2bvSarM+WIrOwJ/VpLcNYLVTkE9eLQXolMU=", "Ca74ogKfgrdtgK2KOSbLbhF02Li4nFlwfBI0cxILTH0=", "G+gMqxL0vRc3eWvHcPFwc8awBGwye8vzo24mQGx3XHQ=", "JHbnvGN/JD0j12LLPizYQw2tiXYldsvdkYQop1gog2o=", "GW1wfKWp7cwOMQOu38YKvdHJ5Xc1TZML4NW20DYXwgk=", "HSYkhyN+hQOQjVN1oaeYqbjA+szAVu3diqh9CmawfSQ=", "KiHgPUEVS/MZHxqDS5r2sj1AvAHQJ8K0hB+yPcn/cVs=", "ApxkeCKhrlZbK/EkntrroMuzrXMN620uZhj7+edNqtk=", "I+GXEXW4+7JsCYneqC2PSj9wh3TChuTtL4367a89teM=", "EwYYi3kjaOvaHy4x6EaFTLs08XXgHJJFeVnuHG2g/z0=", "En0PfrmAT8IKtPi5QJg0rlIWRf/6hrDCIdkiP6Dp0rI=", "JEGYW8rONagbH4H8ZiEhXfC6QkQeRQ/GXjUZoDk7EZY=", "LffU6xFRFFRKxPUvyjbWsz8J9jklPp41SdWYew4JcTY=", "D2xVGPku4uVJ0xrbtOeANu+ao8IWTDF6ypIgPjuZ+UA=", "JuLMnepH3GgH+HzYfFMbF6fy9eqGrAlOXVoi/DQz3Nw=", "HHHjPIZLCo3k0Q3Cb3a+1Vdx0WAaDgTTmcsjlwZMXPg=", "Ki8LVjtAg3Zsi2xghywy7v8rIHoZgcBbHzlhePASB68=", "DBrwvFVGJQp/3fHL0+e8269067l5U14LNDZ23J+UM8o=", "AYvfLnB43ECvHL5IjLVi/TISBJnEyXKm1DuSzhZ93+U=", "IrNoWaFqjNw98QryggcViR93lmCh+aJe9lIBn2QL7wY=", "EOaX27xDx64gMPXUmXT4NE1eSKtm1jW0HnuW+8fGKJ4=", "BX3rT+VjkKu73NiCLKtdoSB6CteUI5IGIrDEoS/vNVI=", "ErJ8FjnxYvhG+zeucUTykTdoLufrFjLnkbRiiv9KrCM=", "Cyx8dtAYQ6LRRlXCPoCRr7bzVZ1mw7vz0RXcnXDbWvI=", "C32WhMDI7KDowxY0yftosug6vnKjZ5s2eKjJsaE6SJU=", "E6sKf+qbLIKHZtL6v1dCSNLX97L45g4mHO8pzZFumis=", "LeNXnXkKw2f2bZBVe1RmgVOlw31TkekqalYVydYL6Xk=", "G6AQttY7lTiygb43ZOjmIxZCxqZzXYnJgI+re62iH24=", "Jv/eqKjZiU674CpwX7dQbhKxp/EAxZAlhOTcvh8hGaw=", "Ef8WGaSdaru1Y5Dj26rwwcsBuVGnNCGLPL2k6AUsy6I=", "Jgw2uAiQvvronLs0eLn3tbP2sR3tR6riwNXgxI2OUXQ=", "BcqIhXyw3V84Dlkqo39vlPfwwyYhMc7ymUihpJ/RhPs=", "GLODKhnrfuGp3PV0MC7gY+wZBGs7nrf7J3pI7oOQ5IU=", "JTUpHwPa0ePFQOfyYgHC4zAYj9pYvngwZ2mKFzn3k2k=", "AU+DKzip9Drybl7C+r9sQlAIPPh/C6hrlQU+kYLRNz4=", "JUjmxHZ8Z2ka9VFi2c4OReieoIpCMvoKIj/ehpv9PqQ=", "Aj7Nqj+UK9RbpG9SjLyBpRzhQlA59EeBp2lvSNKd+9E=", "FhG7WaOyh1a4QNsxiaOl6iLsFoRUcqvWhXCsdxyPFe4=", "C/dhiEUBMzD/Rl8SypUHmrctDKnYp+YzBIwRvyxGx60=", "FciPouuj0If9Kfbeb9hkuHVmL/pDgUQ1LWhHF83NPM0=", "DVjRJ5irVS+W8NlR6Xy+74h9hYZWsfavQBDIAJGwxmI=", "BAbuzXu8IesE+h5WV0XMZUReT4L0okHvuLqwbq+cfLw=", "L6iO2gZXFLmuXhhFYTDjG9b0jQKyQV7GHtIJrY3cMWQ=", "AXSYY66rE8pRImEQPquTtD+sU99rBAIsfLfxdjj1HCk=", "AVUyY6MY7fNEKdkB84eZMrcvXDKtVukAq/R2cvhvmmI=", "Aot6i+R8IjkHmgHdbQ5X3cA/ypxqWNPfbyNN/oL5aso=", "LEib7w+sGbsYfl+KBk5nY280sonC6K3HbsvbtRBfwck=", "H/VIxmkPUifVdmaP72dB+ZnJkUz0hC55P9W1GUvQw90=", "A8G1UchJAwQPrz1tuTToPa/F8O/et6j+snVHckcno0Q=", "HuNiDo8N2oxvFVzoGpN2AJvO8sjY9vJm4Et7gKyM+Gc=", "GORf5+oXH7EdDEr1M4VomQ8iFH4UQh8zb+bgvLuKABQ=", "Jzk0BFIaVeDhpOWMVhGABAwYaCgUiC9Fqt0TG58IdT0=", "B/9oVwEaJLINaYrUOl+Vms7/9ymUDjRqsY+dJgD4PQU=", "KYGzooi0Mng5VCxXls4vCa+dAipgT/rWH+AHfXZ0i/4=", "AN1bC4FY6Kc5le/QudiY1P01hwEfpYbP4CzoAPMGQDM=", "CEwF+uc8vWQy5iLPmIDw0oM3xodLh7iOwLRaVdOTYj0=", "Hi7i/um5v40/NyLnAo/zr45exjGfptiZfcEV5d4uqLE=", "AANBj8WQm2KwKW5utCqgepcQUJOeme43H2QS5E4O9Xc=", "HEmUotQSWAZDdr5c88mYh6q3SAP2fBLGTmWq9/HvVrI=", "BBPCs4czlh/toKaEk9PPRP6813lSuIBv9YPoxAsxAy4=", "AcRq05RVJVUlsme4oFM8XGZQT4GulTS90JHqmJlJl/E=", "Iy+iwJD/Pd6oOtyguc0OCRjJRYt1sLo7fWd63YIL4ok=", "HNVwHIChD0IOs09TRzjA3M/Mtsh8z5rs41q6s3zwX7o=", "A7mB/gxxiCxhlEZVN9XkArgWEYqulL+FGOsHpSnk6lQ=", "FopYiQAQAAZENlimHKnWWfCsRR0eC/1abGo67oVyO+o=", "HlH1WLztJAxlt8683LvbepqwbjWA1G8xjehO3Hleb4g=", "GvpajF/OOW3lbsl9zwMXprfLw+4fjpo7zNbYcAIrdQw=", "ETXv1j6PjMnMBmHdSdNqyOv3kA2Q1m3V+oFgVNQBfco=", "KRTSHC0oRc4rFOlR9CEDWZyHVQFWQdsDxU3zNxA0QK0=", "IMh6LXWXSa6psvD4zAFFJFLnEeOer1qLBxAKGXEn7/Y=", "DbB5IN13nBn8HqjsUyPVrw1RG4adtn3uBAh4XtkikF0=", "DWMfGPrazL/dOzvkZ3KjvO4nY3jNLka6upDVZGjMULY=", "LFAPeQ1GP7E28tjUyt5iKW59fEm84YOVswFMn8ctAFo=", "F2qeupdjXR5ZsZ+qKzMlpbGic3ahbexzF6rkr+4Cv7Q=", "EgL84aUBuItFXKRHiNVSFLrrO1TjfRzIDz1uwOCdR0c=", "IilIN37p0n/GQGAH4XJ7VmuCXey5UJbJrt+o5kU6XLw=", "LsZvwn2CqrLJjrUOZ6CTIhDzxuEkViadV+qQlfQRZus=", "L1wjPb41cYNv2sCRXOZZb8CET+w9C/WpuWjKWMRYRqM=", "E4ibtZucB5U7UvZhI8jBOA5vJyQmEDrc797029KGXaI=", "HPePJfqlLHRzEtCftOmrtPHlWj2jScyNzG3Kgc+ZrDo=", "LA6uKGbWXJcHcEfQ9MQ8KMjX82r2qcb+B+yJIZ8cxzU=", "KLgWzYuMmBYzgAZtClDYsOBv8caQuBuRjH3dCKa3Bmo=", "HUbZFmnOW+ZVT8Ps7oldQf2u7hia3uOBq/t17eFIjPo=", "GEHgO5/FJ0UORHCqjwiI2eyFmdtrD3Ii3KJs1D0iuwU=", "LS6teyB4sJCFgFwnd8kPbFV0S0mnO77wTImTE7r6D1c=", "AYMKjbNCZ2z3SSKBtM/HsTjFXUTarkexT8iI5b90UJU=", "B05M4yvRSwH+n2cp3ioS8hj+RD+3CHOKhg8ZEL36Rng=", "H61MsUD6TVWc+VJfsk5/F0lNI5r2eaAw59G3yc/6lJ0=", "HlDGUmxzJLl7fzOHUr1wDKW9bA78siUmAiRVbXaigzE=", "As8DWbjaGr///XP5B1hkV5P10REv6Jjorwxh555nPls=", "ChSuSXtJeFrndx8N/vS/QYV7sv0fJ9FcPLyM49+Ylc0=", "Fr+gL1dzVmLqwcH1ILSz+cS9Js0nkhd7J2BokWlUzUE=", "D2+pXgEXtzRXn2jcWXNsf5r9nN1KkOE2Ke6r/YRSXps=", "HVnK/ie9/Xj1ZIlDAHY0Ntr5P4Y8MhPBqEnRwxabp3E=", "KJ451qLUvIF6sQREO4m4pgixO7uTs63ncqY77jALvDo=", "DUftr9ao1GUcJ/a+5I6XVvXWUVrxo6NRL1np4+vcwzE=", "GY1qqQcqBt4TEo17FxV/hZlKEMSVcmJ3DMT1nmxtMy8=", "F0uA5CEPnYG+e/cOOrCyHegGX3Ii6Ay708+YXWqrDwU=", "LXgDa6CUh1KueLETi0ucS2fw14qciWXhu7+jVhWFMr8=", "DB/0BFma+COQjzLmB1ZPUht1gSxnBUPjkMsC4wh86SQ=", "ClYbV49L5MUzFR2hpSm8mPSUCqW0j4wBKpwYHYEbjzQ=", "IBKm7SReSM9lAwKJoc0B0m0+suQ5u8TxbyVq3OtAvew=", "CCRCKrtkt1j2AMGOa5mMGdgqn/rLlfnv+eAY1a+zC68=", "JQoJG8kTAbsTk3gqfiHuqBwLyOaBYaOk5eSop+MJZK0=", "GkrbyFMOrOThlpbXegbh7t66PewuRKzNOs/X+ubQdrM=", "JaUR97hZWxInjysFtO1mhO4SsdKY/OJ8zWeHtahuJrs=", "B98l6PdvMtmbmd0E2SfBsvoZA3dmNuOPcYjYwrc8OlQ=", "BZQhztm7kiYvl+fHvrgTVTndZrzW8L1BvRJKkpgj91w=", "JuHNrN6R4RJ5bfcN06R5tZW4z+fEyVtZVu1HegeBOEI=", "KYCD3q6eDMQKm2DklORObv6TqOD+IRgcsTUdl/wNlUs=", "DwH8e/TS8eyMsa+P8XcVMW/EQ4fVFRhfSaJEOtKhTt4=", "GGBJVzsyhrFwA/nlsnuKNqeLjzLvvwUQ2fzI+n5zxfA=", "BzNYKdjjdYy7/EzEm2Vex1gIZna005Eto58szcSijRQ=", "AZ0HLW5mqm4DSEPMPXylHEffUfNdu/SpnTQpP8PVliQ=", "K+o0CiI7ZmX1vm3eLrVbQKBaribTSabErwfjRYq5vl0=", "G5D1wOU0Cfi1cwVkOL2eY5X1JW+rsWAGwAm8reHuzac=", "AZMsPz4cRIFCDGA+I/FgKdi5dgNWX2MUGEd22GW6Ln4=", "EuTp8xvjNnd1J6861EOITjU1Uto2KSEHTgI/FFgLXnM=", "JeegmlVpiwxzI0crJAllTvEvKVmnZWwNzzWtmnkm8/E=", "F4ySOPuR/lEvaIXlEuKlm3aGo0rtD94d3s5rHQjUItQ=", "K1aIMuYmJijDHkBTBfiEApSLUV0ohh8N+u8kkh5+NSw=", "FGyg2/sPu5jBYuuEs3Ioz9cxHg0V0uSN74X50ge9F1s=", "AJU3FnPtPuVYkuNz1a1cdgJoyD339Q1E0p02bh16k3M=", "BRxXzDc0OYl0QnKGnNyUwGYL/PbqHBx65RQn+ymMnbQ=", "HIvZbKOQcUorAHnsOOJa8P56afzhYg83b3cOEyWqZd8=", "FxL2foL5BEZVDVHB0uTrsUddbmBDpcRu2jFwg5eFByo=", "HDNjcV3+qVfelhS2zeoXBmw4Wohk2tW0Ov8JyWNXOSU=", "JnK4re90rbC3HAFm3nZqOeXhyuA3Ga7Q/M+3/0Mv6RY=", "EGNXcaN4UMJBfJa39fpIqYc0/6WQONi3E2y10MZG4ao=", "Cxb9W6l/KPVhn2mJzw1mXpCM/oofwk5TJkYZc9Cb8Oc=", "ACffJ+FhgnjtIkl1kBdWktJi1Kr93+NL+NthnDemYGg=", "A2q43h1993MB0Wy1dqE0b9GW0lU0siZn9QYodprhNuw=", "BJqw837FvMcko+oyGpGVH5DMAK/a1bo9UIFwbfXnXmw=", "ES/j9mSEmvn0lMzzzPDUuPHkpgDCljHQWbxuw0NFDEk=", "Iys+HUcVJy1fGKA2wTfwxvpWh4yaoFTMMwZOKl0w9Wc=", "BWyR3OrOQasTGhxZzkoyCFciSgllftgvcUHnYZpdtUU=", "FEzZg8+iWVFjghSOKQ2rFLqbXY5udrhN2uKrCG56eVI=", "HSGq1ca0B+bu59C1Wqks4KMqOekYuzK8jUXCgJSmNK8=", "F29gvlohuY00aeEzm9XHoKjuhKDTQzm+9nXQZObgpGY=", "AynQSGWNDu/tfzqqm8FDsMJmNvEyYhdtZQoaeiBE00s=", "D+8o8RTWQg0aKI+WD9ndQL1KWgLVgIFiFxHd0oh8dXs=", "CIGIE7o+mpMpJU544AqDs2DJBccgJFnPrQq0dlgnaoE=", "AgoSi3ESmU5SxISbuo0SF/E6lXu00LpqDZfPGRS2Wwc=", "CYDbPH0siGbpygkCw7jgoHhYWVHqSsusJFthz1WnA68=", "FPK9bcMX/hkSa1g9oY4tcXXPpwTFJnuEii/5oSuxiMQ=", "ESJv6dgfqmxqNdOhIjDWMkUGHyBFNh51eqDFunxbMVI=", "H8FEqidcrZUO5OMYK7h3g9xFkGsuhG4nAyKOXVMowfs=", "B4WKPhWt/BQUEJDZcs3aNGGQjb/RyRt+m5kXYMHUd0k=", "GShEide1PtJUnF/GYzHHG5sxRG6zZoxl2FrQlHJ9ReA=", "BYdwLBm5c3hX+Zz9Ah+Pxq9xtCjjrpD59dLsjnFA9dg=", "MGArKWziRQ1ysA7ozs6fiWhC/zRwuY4cuiobOth1Oes=", "J3bb7AeaUDRwDNnG4hQE6r98E/oX0GWi1p0ph6cY544=", "KL3QCVSal/0MKenDD3r5VV2GSu4FrRiG+5GNNxrSnpA=", "KXkaLhfcIEr+ZFMG9YStdn8r6UmqbQYfiG8h0EAarRQ=", "IqZntlkIaZoi7cFpcyS9N/+w8Y8AwLpykuyOBUcPvXY=", "IA1IY7LzWoU7fV3NwivP/Y9FtgvQNsL5SQfYc+XZXKI=", "GL3MrKEcihChK+b3zJbUVX3Zzb7NX4QehzA+OjEuniM=", "Em/1AnFLWMOkD/o9lt8N5Oiv81Q5dSNb81EMerItiXw=", "BXD6TRySzykXA2+y1HdyflW1abSliJGgf5bFAMKLvOI=", "CMhAANuPclZV9HQy2zpN3lFNz0m0D8TTAaF85dcij+s=", "ByEtqK+zU3akufk8IPdBnscEsiyJiyDrvzrJ8b9RMDg=", "KMa9hmen5TNuu35TxySZD8ivagWTkDU77hbYyNupceA=", "AXkOeoxZ673OGOp7m+JhuISKj1xps816e2OhsebUySY=", "Cc4QdRwre5C84NYuj8sp/TyKDShuk0EfxmWIpwoUpP4=", "ID7FeUF+vV8FbhNGqMW+NM2mbJkB+7C8J7jXc95/Zl8=", "IpeYEQC/0L28SVVyquXtVnbs8raT4zkTuPz/5l9X9M8=", "AOP/82u1VKAX+U6IEwlXqXXTQ9FcB3KmfOiLsXNts+U=", "IiFPncMcF2Z4SEYmCXHQUa7ukiJrbxPixGeGie4TBLo=", "HuzKrKI6FEYwnKTD2bfQeWLb+LzYs7NyGPQZkoEmMyc=", "G9Us8Ku9MuiI1AKqwKNYMJvIPrdCVu+hftwautGWv2M=", "Js2M4qznkRTi7pb8HKOAHQEjRcaHUACXRXNe38TinXE=", "HdkhAT5lGeKbmqD1LMjAL/86169qGH7w6QY1AIQG3QI=", "EDWOHLisEuVJiKZL7k8elJIfAwppJqANVyNig+oMCsI=", "HKEWixZ6pSmL/5bYI1a3OH69HXBDHDCxwMDfgfwECMM=", "CNGrJpLSkarvLlCYXIaUhQYVeKLfw3mXIiyB7zAfqUI=", "LVl4DdCgCoaVFsagswDtBvb8OeD56tYFB8skwUREiZw=", "GbMPBjVWkK+neWk/f5nEpHD4q4q9aYmZPUiamxcYDLI=", "G5PJNn1Wsge7Gi8XG1YgjGqhJ5viVywaWeZTRdhzdo0=", "L4tF4eB5RIregYvLeFsMi8ru8ATZVhQjR6CEZ+GWGAk=", "I5r2kbfW7fJ2H4je6uxmUWnemTmc74GdzDe0YJtstOA=", "EmC9KZ2emTIVYQkFWbP5Cv7To282xNOXBy3ik9NM+LM="],
      M: [["GqTUcKvqojVweRKdEUurEXCUT5KfwXghathH1EMPPyc=", "Dh9OTSbp2l+O496vSLSTYQvmHX09sdl1T+yjCHmtxkQ=", "DCmMFDVqWn8ibFpUnlkYSQA4Wq/Y6kHZdGcplk73XzQ=", "GeBwmC0+5nXhYiyiDROyN15Si2dnBoguuPGv4cUEXqE=", "AzPikjmS6J3uVwplASXtp1ogpy5p4QhjoZ0Xt77qkpU=", "GUSqxyv2+83sBDYSOMPE2VENXwdDmhtv9B9lKZC+ATk=", "J9gCrQGaQv0EiSrRZ9noNZanMGBYkEATGWYWdXNjWfM=", "K9BaBAoJh6xrwB9nJC1Ut6LFJ6lwrSgVsnNHHrliPnM="], ["JUuBJvRSQ/FN2CEd9B/lUWs1lS1WxiZ4wUjnPNutNxg=", "IInFl/6qTKmiAu37yCN2MQDilMnjMADlE7KiFkkdR0o=", "Dd6qkGy2Xz6cm+pjRN2o25DCU8D3+Z7O+IeG/v4OXMM=", "ERTJEgRCdQST2ZnU3UXb1PO3WrGDIJI1OWzoPY7pkW8=", "Los1qMKeY53ejf1JtLNH8A7kZ4Y/bvyzVfoVNO9weD8=", "IObMYTrmywpRhCX1PbEpin+IWe4gqtCDINCk+bv+hRI=", "JCDdEoH8DfrBdqdS0VkGtV8Te5zDINXV2qnfPz1D0+Y=", "F71PJyZ0jZmSWvmi8pKeIxwYaUKME7Hjl7sAmRkXI6M="], ["JwcS8YsVGPr+CTZg9JLNvC+3D/qzHYpNihk0vmh5I2k=", "EHz++h6GQEWmaDllJu2fZ1srvycspjXY0+iAEJm7l9A=", "BLlqKWo1rPQVkpuHhLa7pkpjDSnf8otij8mO9wgjC1c=", "HwRlqcEzocaAXXBb5rPqmRKi0GLDTb75LeRpVbg+e9k=", "J6K39VSeXu25AQXA+OIPBXGrevCAHxvdI+qtkfIimhM=", "AxsK+3qy8dJB+IIXj33NrUhZHMZ5BdZR28r86UsU0HM=", "IuAyO7vazl+8dKCz3t6m4eO/EOhN/HH+OVCJrBl690Q=", "Hu821i8/hk6uZ8YzJOR6Y0TjOi1b+4LwW++ZAMVOdFo="], ["K/w5gaJJrqrsSrkAFyfTLU5v51WY7pZPyFzzDVDfWEs=", "AhYw7D8jbtIZ9zzGF7n4smfb7pmmPFKFROoxsnzeSfs=", "KIkKAxmbcn/t5e0AkO1pSUwFPJeTD7tsUjWLDX0QTBY=", "G4Dz9Dk5bC9Ga46bJXZaAUlwRVob6u16b6MI2sdftYI=", "Kku60kWjPl2XAVN/dRQQ5P8pe48dHZCY/pxRjCYaGwo=", "HkMfKxt+2uT4y7XTB79RMcNSwqIVqHDXOWF/SwF8bRY=", "JVY5iJolnr5Z90qP3y785/3h46Zms12ObsYB1NCyJok=", "LQ2KgUz6FsIyPxdL4ty+DClYKfxZvyqJ8TtOrQ6wVqg="], ["FgYKF+GxH4Uc6rIEZFcrPXjVguoFABSEMQFIX2Wrcj0=", "J0EgPWbFI8djnqcTsgNGEZyWHMHpZZpFivdMvuFtcb8=", "IgjFAEgGx6r1gxRZC8vqFhaP5i7ASXr8a90pOMEtmiM=", "HAH220NdxIhe75zf7RkyULnT60zuNmZ0sHvdGU/zSf0=", "Hw42ws+awsQ4jnSWbZ7n0aCzGGkWoIz6MG9rs20h5Ug=", "GZ/CvmDknmeewu3mzzNF3LO5GOWz4Hws2BQTM5NOF48=", "CjjRY7ii+jCSmZwXl7GvkJvZcaJaZWuu+9vfo2KOZ48=", "GYlJ7vKyfCucPWmeP+V9o9W1CcK2cK/OQAq6Gqqe1R8="], ["AOcyF6EGxALkxsFmzZ7x/SoLFqwctDZGvBxyb4MXd3A=", "F7IJKw9jRXa2VMbeIaGo2BK9TAFVn/+DIXEpCC4rKyA=", "LyTWCcsjcg7aVfrinsbxmQLELYv5BPtlYgJzbZey62k=", "LfGD/ivJuLdXc/qWHI1BF+WCqAtlavXFh2PnAk6kGJw=", "Ff6WP1vQ2Sh4wQqJThGAGNuC5jUor6TUcD6Yge2hGNE=", "CvWU3EAw6FCXAfvT2JlfcxJq1yp68P/zRO7oKjHOd/8=", "C46FfZ+x1VTzpOwwetkH3npDZDhgOvGyjU5O43mWDOc=", "B+vNJaEOVmk6KBVfza97NRnZ4OCCQeIXiWlst27gYpc="], ["BLlZygfnGCygjyNRoDVFvXq2dvdAsCMxY36hQ0yFRew=", "Bo6OY0Ed8rOp18Vn9mQZpYDTuhW7/dEibv+j/WvUezw=", "A0TQx3LC8FNmSnuSZrGdSK5dKrPRwaGBUHVKtLg2r9M=", "B+DMoaNe0V+9thm/rsx6mo9MUSk5J1YqzqjquBfGuEs=", "Ii7fPia/dLL1A5gxiSAdTujm1vrTQdf/UHSN1zl0nfY=", "LUMItII7Rl22U9NoGBgSCdI80S+ET3L3VI1J5VBVpgE=", "Lo5n/IX5tNAOnhGXs1vt9Vr9cwCkw3CYfIPBXPc8rjw=", "IvG8TsE4tZYSjOXuW4GElkzCYjGOF60h1FxVJHf1PmE="], ["D8nMlSIvknFc90dgECJeFMw48xQHHlDg87yexnSoqsw=", "L1oqDNDLJIlslIeKgQbVfoLGjc8eIJFnpFrpz4Vw/tI=", "LNGbXFW6sYCeUsyfwaA4wIk12hnPxWPnBI1r0ZcKDI4=", "JP8phngf5ArmHo9coO8XxaXqe928En1DFUfB9qj1zt0=", "Eqh9DFQZ9EhBmEDl5aktJ2rOAJY9mH8qEAiRPZiicRQ=", "CvPO/yyGWpAblAbV2bL8WIM9ZC9Gxkk8oDDvWVBh7Gw=", "J/QthoQvTYqMOv8vR//B4Xnwl6rszlW7oLD9/VsZCqc=", "K2s7w0DUEZ5Xgx5KIYcBPxIWqztjmUXdkqmElDJB8dA="]]
    };
    exports.default = _default;
  }
});

// node_modules/poseidon-lite/poseidon7.js
var require_poseidon7 = __commonJS({
  "node_modules/poseidon-lite/poseidon7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.poseidon7 = poseidon72;
    var _poseidon = _interopRequireDefault(require_poseidon());
    var _unstringify = _interopRequireDefault(require_unstringify());
    var _ = _interopRequireDefault(require__4());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var c = (0, _unstringify.default)(_.default);
    function poseidon72(inputs, nOuts) {
      return (0, _poseidon.default)(inputs, c, nOuts);
    }
  }
});

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { even = false, strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  if (even && value.length % 2 !== 0)
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm({
  "node_modules/viem/_esm/utils/data/isHex.js"() {
  }
});

// node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
var init_size = __esm({
  "node_modules/viem/_esm/utils/data/size.js"() {
    init_isHex();
  }
});

// node_modules/viem/_esm/errors/version.js
var version;
var init_version = __esm({
  "node_modules/viem/_esm/errors/version.js"() {
    version = "2.57.13";
  }
});

// node_modules/viem/_esm/errors/base.js
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}
var errorConfig, BaseError;
var init_base = __esm({
  "node_modules/viem/_esm/errors/base.js"() {
    init_version();
    errorConfig = {
      getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
      version: `viem@${version}`
    };
    BaseError = class _BaseError extends Error {
      constructor(shortMessage, args = {}) {
        const details = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.details;
          if (args.cause?.message)
            return args.cause.message;
          return args.details;
        })();
        const docsPath = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.docsPath || args.docsPath;
          return args.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath });
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args.metaMessages ? [...args.metaMessages, ""] : [],
          ...docsUrl ? [`Docs: ${docsUrl}`] : [],
          ...details ? [`Details: ${details}`] : [],
          ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
        ].join("\n");
        super(message, args.cause ? { cause: args.cause } : void 0);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "version", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "BaseError"
        });
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.name = args.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = version;
      }
      walk(fn) {
        return walk(this, fn);
      }
    };
  }
});

// node_modules/viem/_esm/errors/data.js
var SizeExceedsPaddingSizeError;
var init_data = __esm({
  "node_modules/viem/_esm/errors/data.js"() {
    init_base();
    SizeExceedsPaddingSizeError = class extends BaseError {
      constructor({ size: size2, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size2}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size2 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size2 });
  return padBytes(hexOrBytes, { dir, size: size2 });
}
function padHex(hex_, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size2 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size2,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size2 * 2, "0")}`;
}
function padBytes(bytes2, { dir, size: size2 = 32 } = {}) {
  if (size2 === null)
    return bytes2;
  if (bytes2.length > size2)
    throw new SizeExceedsPaddingSizeError({
      size: bytes2.length,
      targetSize: size2,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size2 - i - 1] = bytes2[padEnd ? i : bytes2.length - i - 1];
  }
  return paddedBytes;
}
var init_pad = __esm({
  "node_modules/viem/_esm/utils/data/pad.js"() {
    init_data();
  }
});

// node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError, SizeOverflowError;
var init_encoding = __esm({
  "node_modules/viem/_esm/errors/encoding.js"() {
    init_base();
    IntegerOutOfRangeError = class extends BaseError {
      constructor({ max, min, signed, size: size2, value }) {
        super(`Number "${value}" is not in safe ${size2 ? `${size2 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
      }
    };
    SizeOverflowError = class extends BaseError {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size2 }) {
  if (size(hexOrBytes) > size2)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size2
    });
}
var init_fromHex = __esm({
  "node_modules/viem/_esm/utils/encoding/fromHex.js"() {
    init_encoding();
    init_size();
  }
});

// node_modules/viem/_esm/utils/encoding/toHex.js
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string2 = "";
  for (let i = 0; i < value.length; i++) {
    string2 += hexes[value[i]];
  }
  const hex = `0x${string2}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size2 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size2) {
    if (signed)
      maxValue = (1n << BigInt(size2) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size2) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size2,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size2 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size2)
    return pad(hex, { size: size2 });
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}
var hexes, encoder;
var init_toHex = __esm({
  "node_modules/viem/_esm/utils/encoding/toHex.js"() {
    init_encoding();
    init_pad();
    init_fromHex();
    hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    encoder = /* @__PURE__ */ new TextEncoder();
  }
});

// node_modules/viem/_esm/utils/encoding/toBytes.js
function toBytes2(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes2 = new Uint8Array(1);
  bytes2[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes2, { size: opts.size });
    return pad(bytes2, { size: opts.size });
  }
  return bytes2;
}
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes2 = new Uint8Array(length);
  for (let index = 0, j = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes2[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes2;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes2 = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes2, { size: opts.size });
    return pad(bytes2, { dir: "right", size: opts.size });
  }
  return bytes2;
}
var encoder2, charCodeMap;
var init_toBytes = __esm({
  "node_modules/viem/_esm/utils/encoding/toBytes.js"() {
    init_base();
    init_isHex();
    init_pad();
    init_fromHex();
    init_toHex();
    encoder2 = /* @__PURE__ */ new TextEncoder();
    charCodeMap = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
  }
});

// node_modules/viem/node_modules/@noble/hashes/esm/_u64.js
function fromBig2(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK642), l: Number(n >> _32n2 & U32_MASK642) };
  return { h: Number(n >> _32n2 & U32_MASK642) | 0, l: Number(n & U32_MASK642) | 0 };
}
function split2(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig2(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var U32_MASK642, _32n2, rotlSH2, rotlSL2, rotlBH2, rotlBL2;
var init_u64 = __esm({
  "node_modules/viem/node_modules/@noble/hashes/esm/_u64.js"() {
    U32_MASK642 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    _32n2 = /* @__PURE__ */ BigInt(32);
    rotlSH2 = (h, l, s) => h << s | l >>> 32 - s;
    rotlSL2 = (h, l, s) => l << s | h >>> 32 - s;
    rotlBH2 = (h, l, s) => l << s - 32 | h >>> 64 - s;
    rotlBL2 = (h, l, s) => h << s - 32 | l >>> 64 - s;
  }
});

// node_modules/viem/node_modules/@noble/hashes/esm/utils.js
function isBytes2(a2) {
  return a2 instanceof Uint8Array || ArrayBuffer.isView(a2) && a2.constructor.name === "Uint8Array";
}
function anumber(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function abytes(b, ...lengths) {
  if (!isBytes2(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u323(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function byteSwap2(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap322(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap2(arr[i]);
  }
  return arr;
}
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes3(data) {
  if (typeof data === "string")
    data = utf8ToBytes2(data);
  abytes(data);
  return data;
}
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes3(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
var isLE2, swap32IfBE, Hash2;
var init_utils = __esm({
  "node_modules/viem/node_modules/@noble/hashes/esm/utils.js"() {
    isLE2 = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    swap32IfBE = isLE2 ? (u) => u : byteSwap322;
    Hash2 = class {
    };
  }
});

// node_modules/viem/node_modules/@noble/hashes/esm/sha3.js
function keccakP2(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH2(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL2(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL2[t];
      const Th = rotlH2(curH, curL, shift);
      const Tl = rotlL2(curH, curL, shift);
      const PI = SHA3_PI2[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H2[round];
    s[1] ^= SHA3_IOTA_L2[round];
  }
  clean(B);
}
var _0n2, _1n2, _2n2, _7n2, _256n2, _0x71n2, SHA3_PI2, SHA3_ROTL2, _SHA3_IOTA2, IOTAS, SHA3_IOTA_H2, SHA3_IOTA_L2, rotlH2, rotlL2, Keccak2, gen2, keccak_2562;
var init_sha3 = __esm({
  "node_modules/viem/node_modules/@noble/hashes/esm/sha3.js"() {
    init_u64();
    init_utils();
    _0n2 = BigInt(0);
    _1n2 = BigInt(1);
    _2n2 = BigInt(2);
    _7n2 = BigInt(7);
    _256n2 = BigInt(256);
    _0x71n2 = BigInt(113);
    SHA3_PI2 = [];
    SHA3_ROTL2 = [];
    _SHA3_IOTA2 = [];
    for (let round = 0, R = _1n2, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI2.push(2 * (5 * y + x));
      SHA3_ROTL2.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n2;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n2 ^ (R >> _7n2) * _0x71n2) % _256n2;
        if (R & _2n2)
          t ^= _1n2 << (_1n2 << /* @__PURE__ */ BigInt(j)) - _1n2;
      }
      _SHA3_IOTA2.push(t);
    }
    IOTAS = split2(_SHA3_IOTA2, true);
    SHA3_IOTA_H2 = IOTAS[0];
    SHA3_IOTA_L2 = IOTAS[1];
    rotlH2 = (h, l, s) => s > 32 ? rotlBH2(h, l, s) : rotlSH2(h, l, s);
    rotlL2 = (h, l, s) => s > 32 ? rotlBL2(h, l, s) : rotlSL2(h, l, s);
    Keccak2 = class _Keccak extends Hash2 {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        anumber(outputLen);
        if (!(0 < blockLen && blockLen < 200))
          throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200);
        this.state32 = u323(this.state);
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        swap32IfBE(this.state32);
        keccakP2(this.state32, this.rounds);
        swap32IfBE(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        aexists(this);
        data = toBytes3(data);
        abytes(data);
        const { blockLen, state } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        aexists(this, false);
        abytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes2) {
        anumber(bytes2);
        return this.xofInto(new Uint8Array(bytes2));
      }
      digestInto(out) {
        aoutput(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        clean(this.state);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    gen2 = (suffix, blockLen, outputLen) => createHasher(() => new Keccak2(blockLen, suffix, outputLen));
    keccak_2562 = /* @__PURE__ */ (() => gen2(1, 136, 256 / 8))();
  }
});

// node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes2 = keccak_2562(isHex(value, { strict: false }) ? toBytes2(value) : value);
  if (to === "bytes")
    return bytes2;
  return toHex(bytes2);
}
var init_keccak256 = __esm({
  "node_modules/viem/_esm/utils/hash/keccak256.js"() {
    init_sha3();
    init_isHex();
    init_toBytes();
    init_toHex();
  }
});

// node_modules/snarkjs/node_modules/ffjavascript/build/browser.esm.js
var hexLen = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
function fromString(s, radix) {
  if (!radix || radix == 10) {
    return BigInt(s);
  } else if (radix == 16) {
    if (s.slice(0, 2) == "0x") {
      return BigInt(s);
    } else {
      return BigInt("0x" + s);
    }
  }
}
var e = fromString;
function fromArray(a2, radix) {
  let acc = BigInt(0);
  radix = BigInt(radix);
  for (let i = 0; i < a2.length; i++) {
    acc = acc * radix + BigInt(a2[i]);
  }
  return acc;
}
function bitLength$6(a2) {
  const aS = a2.toString(16);
  return (aS.length - 1) * 4 + hexLen[parseInt(aS[0], 16)];
}
function isNegative$4(a2) {
  return BigInt(a2) < BigInt(0);
}
function isZero$1(a2) {
  return !a2;
}
function shiftLeft(a2, n) {
  return BigInt(a2) << BigInt(n);
}
function shiftRight(a2, n) {
  return BigInt(a2) >> BigInt(n);
}
var shl = shiftLeft;
var shr = shiftRight;
function isOdd$5(a2) {
  return (BigInt(a2) & BigInt(1)) == BigInt(1);
}
function naf(n) {
  let E = BigInt(n);
  const res = [];
  while (E) {
    if (E & BigInt(1)) {
      const z = 2 - Number(E % BigInt(4));
      res.push(z);
      E = E - BigInt(z);
    } else {
      res.push(0);
    }
    E = E >> BigInt(1);
  }
  return res;
}
function bits(n) {
  let E = BigInt(n);
  const res = [];
  while (E) {
    if (E & BigInt(1)) {
      res.push(1);
    } else {
      res.push(0);
    }
    E = E >> BigInt(1);
  }
  return res;
}
function toNumber$1(s) {
  if (s > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Number too big");
  }
  return Number(s);
}
function toArray(s, radix) {
  const res = [];
  let rem = BigInt(s);
  radix = BigInt(radix);
  while (rem) {
    res.unshift(Number(rem % radix));
    rem = rem / radix;
  }
  return res;
}
function add(a2, b) {
  return BigInt(a2) + BigInt(b);
}
function sub(a2, b) {
  return BigInt(a2) - BigInt(b);
}
function neg(a2) {
  return -BigInt(a2);
}
function mul(a2, b) {
  return BigInt(a2) * BigInt(b);
}
function square$2(a2) {
  return BigInt(a2) * BigInt(a2);
}
function pow(a2, b) {
  return BigInt(a2) ** BigInt(b);
}
function exp$1(a2, b) {
  return BigInt(a2) ** BigInt(b);
}
function abs$1(a2) {
  return BigInt(a2) >= 0 ? BigInt(a2) : -BigInt(a2);
}
function div(a2, b) {
  return BigInt(a2) / BigInt(b);
}
function mod(a2, b) {
  return BigInt(a2) % BigInt(b);
}
function eq(a2, b) {
  return BigInt(a2) == BigInt(b);
}
function neq(a2, b) {
  return BigInt(a2) != BigInt(b);
}
function lt(a2, b) {
  return BigInt(a2) < BigInt(b);
}
function gt(a2, b) {
  return BigInt(a2) > BigInt(b);
}
function leq(a2, b) {
  return BigInt(a2) <= BigInt(b);
}
function geq(a2, b) {
  return BigInt(a2) >= BigInt(b);
}
function band(a2, b) {
  return BigInt(a2) & BigInt(b);
}
function bor(a2, b) {
  return BigInt(a2) | BigInt(b);
}
function bxor(a2, b) {
  return BigInt(a2) ^ BigInt(b);
}
function land(a2, b) {
  return BigInt(a2) && BigInt(b);
}
function lor(a2, b) {
  return BigInt(a2) || BigInt(b);
}
function lnot(a2) {
  return !BigInt(a2);
}
function toRprLE(buff, o, e2, n8) {
  const s = "0000000" + e2.toString(16);
  const v = new Uint32Array(buff.buffer, buff.byteOffset + o, n8 / 4);
  const l = ((s.length - 7) * 4 - 1 >> 5) + 1;
  for (let i = 0; i < l; i++) v[i] = parseInt(s.substring(s.length - 8 * i - 8, s.length - 8 * i), 16);
  for (let i = l; i < v.length; i++) v[i] = 0;
  for (let i = v.length * 4; i < n8; i++) buff[i] = toNumber$1(band(shiftRight(e2, i * 8), 255));
}
function toRprBE(buff, o, e2, n8) {
  const s = "0000000" + e2.toString(16);
  const v = new DataView(buff.buffer, buff.byteOffset + o, n8);
  const l = ((s.length - 7) * 4 - 1 >> 5) + 1;
  for (let i = 0; i < l; i++) v.setUint32(n8 - i * 4 - 4, parseInt(s.substring(s.length - 8 * i - 8, s.length - 8 * i), 16), false);
  for (let i = 0; i < n8 / 4 - l; i++) v[i] = 0;
}
function fromRprLE(buff, o, n8) {
  n8 = n8 || buff.byteLength;
  o = o || 0;
  const v = new Uint32Array(buff.buffer, buff.byteOffset + o, n8 / 4);
  const a2 = new Array(n8 / 4);
  v.forEach((ch, i) => a2[a2.length - i - 1] = ch.toString(16).padStart(8, "0"));
  return fromString(a2.join(""), 16);
}
function fromRprBE(buff, o, n8) {
  n8 = n8 || buff.byteLength;
  o = o || 0;
  const v = new DataView(buff.buffer, buff.byteOffset + o, n8);
  const a2 = new Array(n8 / 4);
  for (let i = 0; i < n8 / 4; i++) {
    a2[i] = v.getUint32(i * 4, false).toString(16).padStart(8, "0");
  }
  return fromString(a2.join(""), 16);
}
function toString(a2, radix) {
  return a2.toString(radix);
}
function toLEBuff(a2) {
  const buff = new Uint8Array(Math.floor((bitLength$6(a2) - 1) / 8) + 1);
  toRprLE(buff, 0, a2, buff.byteLength);
  return buff;
}
var zero = e(0);
var one = e(1);
var _Scalar = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  abs: abs$1,
  add,
  band,
  bitLength: bitLength$6,
  bits,
  bor,
  bxor,
  div,
  e,
  eq,
  exp: exp$1,
  fromArray,
  fromRprBE,
  fromRprLE,
  fromString,
  geq,
  gt,
  isNegative: isNegative$4,
  isOdd: isOdd$5,
  isZero: isZero$1,
  land,
  leq,
  lnot,
  lor,
  lt,
  mod,
  mul,
  naf,
  neg,
  neq,
  one,
  pow,
  shiftLeft,
  shiftRight,
  shl,
  shr,
  square: square$2,
  sub,
  toArray,
  toLEBuff,
  toNumber: toNumber$1,
  toRprBE,
  toRprLE,
  toString,
  zero
});
var _revTable$1 = [];
for (let i = 0; i < 256; i++) {
  _revTable$1[i] = _revSlow$1(i, 8);
}
function _revSlow$1(idx, bits3) {
  let res = 0;
  let a2 = idx;
  for (let i = 0; i < bits3; i++) {
    res <<= 1;
    res = res | a2 & 1;
    a2 >>= 1;
  }
  return res;
}
function exp(F, base, e2) {
  if (isZero$1(e2)) return F.one;
  const n = bits(e2);
  if (n.length == 0) return F.one;
  let res = base;
  for (let i = n.length - 2; i >= 0; i--) {
    res = F.square(res);
    if (n[i]) {
      res = F.mul(res, base);
    }
  }
  return res;
}
function buildSqrt(F) {
  if (F.m % 2 == 1) {
    if (eq(mod(F.p, 4), 1)) {
      if (eq(mod(F.p, 8), 1)) {
        if (eq(mod(F.p, 16), 1)) {
          alg5_tonelliShanks(F);
        } else if (eq(mod(F.p, 16), 9)) {
          alg4_kong(F);
        } else {
          throw new Error("Field withot sqrt");
        }
      } else if (eq(mod(F.p, 8), 5)) {
        alg3_atkin(F);
      } else {
        throw new Error("Field withot sqrt");
      }
    } else if (eq(mod(F.p, 4), 3)) {
      alg2_shanks(F);
    }
  } else {
    const pm2mod4 = mod(pow(F.p, F.m / 2), 4);
    if (pm2mod4 == 1) {
      alg10_adj(F);
    } else if (pm2mod4 == 3) {
      alg9_adj(F);
    } else {
      alg8_complex(F);
    }
  }
}
function alg5_tonelliShanks(F) {
  F.sqrt_q = pow(F.p, F.m);
  F.sqrt_s = 0;
  F.sqrt_t = sub(F.sqrt_q, 1);
  while (!isOdd$5(F.sqrt_t)) {
    F.sqrt_s = F.sqrt_s + 1;
    F.sqrt_t = div(F.sqrt_t, 2);
  }
  let c0 = F.one;
  while (F.eq(c0, F.one)) {
    const c = F.random();
    F.sqrt_z = F.pow(c, F.sqrt_t);
    c0 = F.pow(F.sqrt_z, 2 ** (F.sqrt_s - 1));
  }
  F.sqrt_tm1d2 = div(sub(F.sqrt_t, 1), 2);
  F.sqrt = function(a2) {
    const F2 = this;
    if (F2.isZero(a2)) return F2.zero;
    let w = F2.pow(a2, F2.sqrt_tm1d2);
    const a0 = F2.pow(F2.mul(F2.square(w), a2), 2 ** (F2.sqrt_s - 1));
    if (F2.eq(a0, F2.negone)) return null;
    let v = F2.sqrt_s;
    let x = F2.mul(a2, w);
    let b = F2.mul(x, w);
    let z = F2.sqrt_z;
    while (!F2.eq(b, F2.one)) {
      let b2k = F2.square(b);
      let k = 1;
      while (!F2.eq(b2k, F2.one)) {
        b2k = F2.square(b2k);
        k++;
      }
      w = z;
      for (let i = 0; i < v - k - 1; i++) {
        w = F2.square(w);
      }
      z = F2.square(w);
      b = F2.mul(b, z);
      x = F2.mul(x, w);
      v = k;
    }
    return F2.geq(x, F2.zero) ? x : F2.neg(x);
  };
}
function alg4_kong(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 4 not implemented");
  };
}
function alg3_atkin(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 3 not implemented");
  };
}
function alg2_shanks(F) {
  F.sqrt_q = pow(F.p, F.m);
  F.sqrt_e1 = div(sub(F.sqrt_q, 3), 4);
  F.sqrt = function(a2) {
    if (this.isZero(a2)) return this.zero;
    const a1 = this.pow(a2, this.sqrt_e1);
    const a0 = this.mul(this.square(a1), a2);
    if (this.eq(a0, this.negone)) return null;
    const x = this.mul(a1, a2);
    return F.geq(x, F.zero) ? x : F.neg(x);
  };
}
function alg10_adj(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 10 not implemented");
  };
}
function alg9_adj(F) {
  F.sqrt_q = pow(F.p, F.m / 2);
  F.sqrt_e34 = div(sub(F.sqrt_q, 3), 4);
  F.sqrt_e12 = div(sub(F.sqrt_q, 1), 2);
  F.frobenius = function(n, x) {
    if (n % 2 == 1) {
      return F.conjugate(x);
    } else {
      return x;
    }
  };
  F.sqrt = function(a2) {
    const F2 = this;
    const a1 = F2.pow(a2, F2.sqrt_e34);
    const alfa = F2.mul(F2.square(a1), a2);
    const a0 = F2.mul(F2.frobenius(1, alfa), alfa);
    if (F2.eq(a0, F2.negone)) return null;
    const x0 = F2.mul(a1, a2);
    let x;
    if (F2.eq(alfa, F2.negone)) {
      x = F2.mul(x0, [F2.F.zero, F2.F.one]);
    } else {
      const b = F2.pow(F2.add(F2.one, alfa), F2.sqrt_e12);
      x = F2.mul(b, x0);
    }
    return F2.geq(x, F2.zero) ? x : F2.neg(x);
  };
}
function alg8_complex(F) {
  F.sqrt = function() {
    throw new Error("Sqrt alg 8 not implemented");
  };
}
function quarterRound(st, a2, b, c, d2) {
  st[a2] = st[a2] + st[b] >>> 0;
  st[d2] = (st[d2] ^ st[a2]) >>> 0;
  st[d2] = (st[d2] << 16 | st[d2] >>> 16 & 65535) >>> 0;
  st[c] = st[c] + st[d2] >>> 0;
  st[b] = (st[b] ^ st[c]) >>> 0;
  st[b] = (st[b] << 12 | st[b] >>> 20 & 4095) >>> 0;
  st[a2] = st[a2] + st[b] >>> 0;
  st[d2] = (st[d2] ^ st[a2]) >>> 0;
  st[d2] = (st[d2] << 8 | st[d2] >>> 24 & 255) >>> 0;
  st[c] = st[c] + st[d2] >>> 0;
  st[b] = (st[b] ^ st[c]) >>> 0;
  st[b] = (st[b] << 7 | st[b] >>> 25 & 127) >>> 0;
}
function doubleRound(st) {
  quarterRound(st, 0, 4, 8, 12);
  quarterRound(st, 1, 5, 9, 13);
  quarterRound(st, 2, 6, 10, 14);
  quarterRound(st, 3, 7, 11, 15);
  quarterRound(st, 0, 5, 10, 15);
  quarterRound(st, 1, 6, 11, 12);
  quarterRound(st, 2, 7, 8, 13);
  quarterRound(st, 3, 4, 9, 14);
}
var ChaCha = class {
  constructor(seed) {
    seed = seed || [0, 0, 0, 0, 0, 0, 0, 0];
    this.state = [
      1634760805,
      857760878,
      2036477234,
      1797285236,
      seed[0],
      seed[1],
      seed[2],
      seed[3],
      seed[4],
      seed[5],
      seed[6],
      seed[7],
      0,
      0,
      0,
      0
    ];
    this.idx = 16;
    this.buff = new Array(16);
  }
  nextU32() {
    if (this.idx == 16) this.update();
    return this.buff[this.idx++];
  }
  nextU64() {
    return add(mul(this.nextU32(), 4294967296), this.nextU32());
  }
  nextBool() {
    return (this.nextU32() & 1) == 1;
  }
  update() {
    for (let i = 0; i < 16; i++) this.buff[i] = this.state[i];
    for (let i = 0; i < 10; i++) doubleRound(this.buff);
    for (let i = 0; i < 16; i++) this.buff[i] = this.buff[i] + this.state[i] >>> 0;
    this.idx = 0;
    this.state[12] = this.state[12] + 1 >>> 0;
    if (this.state[12] != 0) return;
    this.state[13] = this.state[13] + 1 >>> 0;
    if (this.state[13] != 0) return;
    this.state[14] = this.state[14] + 1 >>> 0;
    if (this.state[14] != 0) return;
    this.state[15] = this.state[15] + 1 >>> 0;
  }
};
function getRandomBytes(n) {
  let array = new Uint8Array(n);
  {
    if (typeof globalThis.crypto !== "undefined") {
      globalThis.crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < n; i++) {
        array[i] = Math.random() * 4294967296 >>> 0;
      }
    }
  }
  return array;
}
function getRandomSeed() {
  const arr = getRandomBytes(32);
  const arrV = new Uint32Array(arr.buffer);
  const seed = [];
  for (let i = 0; i < 8; i++) {
    seed.push(arrV[i]);
  }
  return seed;
}
var threadRng = null;
function getThreadRng() {
  if (threadRng) return threadRng;
  threadRng = new ChaCha(getRandomSeed());
  return threadRng;
}
var FFT = class {
  constructor(G, F, opMulGF) {
    this.F = F;
    this.G = G;
    this.opMulGF = opMulGF;
    let rem = F.sqrt_t || F.t;
    let s = F.sqrt_s || F.s;
    let nqr = F.one;
    while (F.eq(F.pow(nqr, F.half), F.one)) nqr = F.add(nqr, F.one);
    this.w = new Array(s + 1);
    this.wi = new Array(s + 1);
    this.w[s] = this.F.pow(nqr, rem);
    this.wi[s] = this.F.inv(this.w[s]);
    let n = s - 1;
    while (n >= 0) {
      this.w[n] = this.F.square(this.w[n + 1]);
      this.wi[n] = this.F.square(this.wi[n + 1]);
      n--;
    }
    this.roots = [];
    this._setRoots(Math.min(s, 15));
  }
  _setRoots(n) {
    for (let i = n; i >= 0 && !this.roots[i]; i--) {
      let r2 = this.F.one;
      const nroots = 1 << i;
      const rootsi = new Array(nroots);
      for (let j = 0; j < nroots; j++) {
        rootsi[j] = r2;
        r2 = this.F.mul(r2, this.w[i]);
      }
      this.roots[i] = rootsi;
    }
  }
  fft(p) {
    if (p.length <= 1) return p;
    const bits3 = log2$1(p.length - 1) + 1;
    this._setRoots(bits3);
    const m = 1 << bits3;
    if (p.length != m) {
      throw new Error("Size must be multiple of 2");
    }
    const res = __fft(this, p, bits3, 0, 1);
    return res;
  }
  ifft(p) {
    if (p.length <= 1) return p;
    const bits3 = log2$1(p.length - 1) + 1;
    this._setRoots(bits3);
    const m = 1 << bits3;
    if (p.length != m) {
      throw new Error("Size must be multiple of 2");
    }
    const res = __fft(this, p, bits3, 0, 1);
    const twoinvm = this.F.inv(this.F.mulScalar(this.F.one, m));
    const resn = new Array(m);
    for (let i = 0; i < m; i++) {
      resn[i] = this.opMulGF(res[(m - i) % m], twoinvm);
    }
    return resn;
  }
};
function log2$1(V) {
  return ((V & 4294901760) !== 0 ? (V &= 4294901760, 16) : 0) | ((V & 4278255360) !== 0 ? (V &= 4278255360, 8) : 0) | ((V & 4042322160) !== 0 ? (V &= 4042322160, 4) : 0) | ((V & 3435973836) !== 0 ? (V &= 3435973836, 2) : 0) | (V & 2863311530) !== 0;
}
function __fft(PF, pall, bits3, offset, step) {
  const n = 1 << bits3;
  if (n == 1) {
    return [pall[offset]];
  } else if (n == 2) {
    return [
      PF.G.add(pall[offset], pall[offset + step]),
      PF.G.sub(pall[offset], pall[offset + step])
    ];
  }
  const ndiv2 = n >> 1;
  const p1 = __fft(PF, pall, bits3 - 1, offset, step * 2);
  const p2 = __fft(PF, pall, bits3 - 1, offset + step, step * 2);
  const out = new Array(n);
  for (let i = 0; i < ndiv2; i++) {
    out[i] = PF.G.add(p1[i], PF.opMulGF(p2[i], PF.roots[bits3][i]));
    out[i + ndiv2] = PF.G.sub(p1[i], PF.opMulGF(p2[i], PF.roots[bits3][i]));
  }
  return out;
}
var ZqField = class {
  constructor(p) {
    this.type = "F1";
    this.one = BigInt(1);
    this.zero = BigInt(0);
    this.p = BigInt(p);
    this.m = 1;
    this.negone = this.p - this.one;
    this.two = BigInt(2);
    this.half = this.p >> this.one;
    this.bitLength = bitLength$6(this.p);
    this.mask = (this.one << BigInt(this.bitLength)) - this.one;
    this.n64 = Math.floor((this.bitLength - 1) / 64) + 1;
    this.n32 = this.n64 * 2;
    this.n8 = this.n64 * 8;
    this.R = this.e(this.one << BigInt(this.n64 * 64));
    this.Ri = this.inv(this.R);
    const e2 = this.negone >> this.one;
    this.nqr = this.two;
    let r2 = this.pow(this.nqr, e2);
    while (!this.eq(r2, this.negone)) {
      this.nqr = this.nqr + this.one;
      r2 = this.pow(this.nqr, e2);
    }
    this.s = 0;
    this.t = this.negone;
    while ((this.t & this.one) == this.zero) {
      this.s = this.s + 1;
      this.t = this.t >> this.one;
    }
    this.nqr_to_t = this.pow(this.nqr, this.t);
    buildSqrt(this);
    this.FFT = new FFT(this, this, this.mul.bind(this));
    this.fft = this.FFT.fft.bind(this.FFT);
    this.ifft = this.FFT.ifft.bind(this.FFT);
    this.w = this.FFT.w;
    this.wi = this.FFT.wi;
    this.shift = this.square(this.nqr);
    this.k = this.exp(this.nqr, 2 ** this.s);
  }
  e(a2, b) {
    let res;
    if (!b) {
      res = BigInt(a2);
    } else if (b == 16) {
      res = BigInt("0x" + a2);
    }
    if (res < 0) {
      let nres = -res;
      if (nres >= this.p) nres = nres % this.p;
      return this.p - nres;
    } else {
      return res >= this.p ? res % this.p : res;
    }
  }
  add(a2, b) {
    const res = a2 + b;
    return res >= this.p ? res - this.p : res;
  }
  sub(a2, b) {
    return a2 >= b ? a2 - b : this.p - b + a2;
  }
  neg(a2) {
    return a2 ? this.p - a2 : a2;
  }
  mul(a2, b) {
    return a2 * b % this.p;
  }
  mulScalar(base, s) {
    return base * this.e(s) % this.p;
  }
  square(a2) {
    return a2 * a2 % this.p;
  }
  eq(a2, b) {
    return a2 == b;
  }
  neq(a2, b) {
    return a2 != b;
  }
  lt(a2, b) {
    const aa = a2 > this.half ? a2 - this.p : a2;
    const bb = b > this.half ? b - this.p : b;
    return aa < bb;
  }
  gt(a2, b) {
    const aa = a2 > this.half ? a2 - this.p : a2;
    const bb = b > this.half ? b - this.p : b;
    return aa > bb;
  }
  leq(a2, b) {
    const aa = a2 > this.half ? a2 - this.p : a2;
    const bb = b > this.half ? b - this.p : b;
    return aa <= bb;
  }
  geq(a2, b) {
    const aa = a2 > this.half ? a2 - this.p : a2;
    const bb = b > this.half ? b - this.p : b;
    return aa >= bb;
  }
  div(a2, b) {
    return this.mul(a2, this.inv(b));
  }
  idiv(a2, b) {
    if (!b) throw new Error("Division by zero");
    return a2 / b;
  }
  inv(a2) {
    if (!a2) throw new Error("Division by zero");
    let t = this.zero;
    let r2 = this.p;
    let newt = this.one;
    let newr = a2 % this.p;
    while (newr) {
      let q = r2 / newr;
      [t, newt] = [newt, t - q * newt];
      [r2, newr] = [newr, r2 - q * newr];
    }
    if (t < this.zero) t += this.p;
    return t;
  }
  mod(a2, b) {
    return a2 % b;
  }
  pow(b, e2) {
    return exp(this, b, e2);
  }
  exp(b, e2) {
    return exp(this, b, e2);
  }
  band(a2, b) {
    const res = a2 & b & this.mask;
    return res >= this.p ? res - this.p : res;
  }
  bor(a2, b) {
    const res = (a2 | b) & this.mask;
    return res >= this.p ? res - this.p : res;
  }
  bxor(a2, b) {
    const res = (a2 ^ b) & this.mask;
    return res >= this.p ? res - this.p : res;
  }
  bnot(a2) {
    const res = a2 ^ this.mask;
    return res >= this.p ? res - this.p : res;
  }
  shl(a2, b) {
    if (Number(b) < this.bitLength) {
      const res = a2 << b & this.mask;
      return res >= this.p ? res - this.p : res;
    } else {
      const nb = this.p - b;
      if (Number(nb) < this.bitLength) {
        return a2 >> nb;
      } else {
        return this.zero;
      }
    }
  }
  shr(a2, b) {
    if (Number(b) < this.bitLength) {
      return a2 >> b;
    } else {
      const nb = this.p - b;
      if (Number(nb) < this.bitLength) {
        const res = a2 << nb & this.mask;
        return res >= this.p ? res - this.p : res;
      } else {
        return 0;
      }
    }
  }
  land(a2, b) {
    return a2 && b ? this.one : this.zero;
  }
  lor(a2, b) {
    return a2 || b ? this.one : this.zero;
  }
  lnot(a2) {
    return a2 ? this.zero : this.one;
  }
  sqrt_old(n) {
    if (n == this.zero) return this.zero;
    const res = this.pow(n, this.negone >> this.one);
    if (res != this.one) return null;
    let m = this.s;
    let c = this.nqr_to_t;
    let t = this.pow(n, this.t);
    let r2 = this.pow(n, this.add(this.t, this.one) >> this.one);
    while (t != this.one) {
      let sq = this.square(t);
      let i = 1;
      while (sq != this.one) {
        i++;
        sq = this.square(sq);
      }
      let b = c;
      for (let j = 0; j < m - i - 1; j++) b = this.square(b);
      m = i;
      c = this.square(b);
      t = this.mul(t, c);
      r2 = this.mul(r2, b);
    }
    if (r2 > this.p >> this.one) {
      r2 = this.neg(r2);
    }
    return r2;
  }
  normalize(a2, b) {
    a2 = BigInt(a2, b);
    if (a2 < 0) {
      let na = -a2;
      if (na >= this.p) na = na % this.p;
      return this.p - na;
    } else {
      return a2 >= this.p ? a2 % this.p : a2;
    }
  }
  random() {
    const nBytes = this.bitLength * 2 / 8;
    let res = this.zero;
    for (let i = 0; i < nBytes; i++) {
      res = (res << BigInt(8)) + BigInt(getRandomBytes(1)[0]);
    }
    return res % this.p;
  }
  toString(a2, base) {
    base = base || 10;
    let vs;
    if (a2 > this.half && base == 10) {
      const v = this.p - a2;
      vs = "-" + v.toString(base);
    } else {
      vs = a2.toString(base);
    }
    return vs;
  }
  isZero(a2) {
    return a2 == this.zero;
  }
  fromRng(rng) {
    let v;
    do {
      v = this.zero;
      for (let i = 0; i < this.n64; i++) {
        v += rng.nextU64() << BigInt(64 * i);
      }
      v &= this.mask;
    } while (v >= this.p);
    v = v * this.Ri % this.p;
    return v;
  }
  fft(a2) {
    return this.FFT.fft(a2);
  }
  ifft(a2) {
    return this.FFT.ifft(a2);
  }
  // Returns a buffer with Little Endian Representation
  toRprLE(buff, o, e2) {
    toRprLE(buff, o, e2, this.n64 * 8);
  }
  // Returns a buffer with Big Endian Representation
  toRprBE(buff, o, e2) {
    toRprBE(buff, o, e2, this.n64 * 8);
  }
  // Returns a buffer with Big Endian Montgomery Representation
  toRprBEM(buff, o, e2) {
    return this.toRprBE(buff, o, this.mul(this.R, e2));
  }
  toRprLEM(buff, o, e2) {
    return this.toRprLE(buff, o, this.mul(this.R, e2));
  }
  // Pases a buffer with Little Endian Representation
  fromRprLE(buff, o) {
    return fromRprLE(buff, o, this.n8);
  }
  // Pases a buffer with Big Endian Representation
  fromRprBE(buff, o) {
    return fromRprBE(buff, o, this.n8);
  }
  fromRprLEM(buff, o) {
    return this.mul(this.fromRprLE(buff, o), this.Ri);
  }
  fromRprBEM(buff, o) {
    return this.mul(this.fromRprBE(buff, o), this.Ri);
  }
  toObject(a2) {
    return a2;
  }
};
var utils$6 = {};
utils$6.bigInt2BytesLE = function bigInt2BytesLE(_a, len) {
  const b = Array(len);
  let v = BigInt(_a);
  for (let i = 0; i < len; i++) {
    b[i] = Number(v & 0xFFn);
    v = v >> 8n;
  }
  return b;
};
utils$6.bigInt2U32LE = function bigInt2BytesLE2(_a, len) {
  const b = Array(len);
  let v = BigInt(_a);
  for (let i = 0; i < len; i++) {
    b[i] = Number(v & 0xFFFFFFFFn);
    v = v >> 32n;
  }
  return b;
};
utils$6.isOcamNum = function(a2) {
  if (!Array.isArray(a2)) return false;
  if (a2.length != 3) return false;
  if (typeof a2[0] !== "number") return false;
  if (typeof a2[1] !== "number") return false;
  if (!Array.isArray(a2[2])) return false;
  return true;
};
var build_int = function buildInt(module, n64, _prefix) {
  const prefix = _prefix || "int";
  if (module.modules[prefix]) return prefix;
  module.modules[prefix] = {};
  const n32 = n64 * 2;
  const n8 = n64 * 8;
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("px", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pr"),
          i * 8,
          c.i64_load(
            c.getLocal("px"),
            i * 8
          )
        )
      );
    }
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pr"),
          i * 8,
          c.i64_const(0)
        )
      );
    }
  }
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.i64_store(
        c.getLocal("pr"),
        0,
        c.i64_const(1)
      )
    );
    for (let i = 1; i < n64; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pr"),
          i * 8,
          c.i64_const(0)
        )
      );
    }
  }
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("px", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    function getCompCode(n) {
      if (n == 0) {
        return c.ret(c.i64_eqz(
          c.i64_load(c.getLocal("px"))
        ));
      }
      return c.if(
        c.i64_eqz(
          c.i64_load(c.getLocal("px"), n * 8)
        ),
        getCompCode(n - 1),
        c.ret(c.i32_const(0))
      );
    }
    f.addCode(getCompCode(n64 - 1));
    f.addCode(c.ret(c.i32_const(0)));
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("px", "i32");
    f.addParam("py", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    function getCompCode(n) {
      if (n == 0) {
        return c.ret(c.i64_eq(
          c.i64_load(c.getLocal("px")),
          c.i64_load(c.getLocal("py"))
        ));
      }
      return c.if(
        c.i64_eq(
          c.i64_load(c.getLocal("px"), n * 8),
          c.i64_load(c.getLocal("py"), n * 8)
        ),
        getCompCode(n - 1),
        c.ret(c.i32_const(0))
      );
    }
    f.addCode(getCompCode(n64 - 1));
    f.addCode(c.ret(c.i32_const(0)));
  }
  function buildGte() {
    const f = module.addFunction(prefix + "_gte");
    f.addParam("px", "i32");
    f.addParam("py", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    function getCompCode(n) {
      if (n == 0) {
        return c.ret(c.i64_ge_u(
          c.i64_load(c.getLocal("px")),
          c.i64_load(c.getLocal("py"))
        ));
      }
      return c.if(
        c.i64_lt_u(
          c.i64_load(c.getLocal("px"), n * 8),
          c.i64_load(c.getLocal("py"), n * 8)
        ),
        c.ret(c.i32_const(0)),
        c.if(
          c.i64_gt_u(
            c.i64_load(c.getLocal("px"), n * 8),
            c.i64_load(c.getLocal("py"), n * 8)
          ),
          c.ret(c.i32_const(1)),
          getCompCode(n - 1)
        )
      );
    }
    f.addCode(getCompCode(n64 - 1));
    f.addCode(c.ret(c.i32_const(0)));
  }
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.setReturnType("i32");
    f.addLocal("c", "i64");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal(
      "c",
      c.i64_add(
        c.i64_load32_u(c.getLocal("x")),
        c.i64_load32_u(c.getLocal("y"))
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("r"),
      c.getLocal("c")
    ));
    for (let i = 1; i < n32; i++) {
      f.addCode(c.setLocal(
        "c",
        c.i64_add(
          c.i64_add(
            c.i64_load32_u(c.getLocal("x"), 4 * i),
            c.i64_load32_u(c.getLocal("y"), 4 * i)
          ),
          c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
        )
      ));
      f.addCode(c.i64_store32(
        c.getLocal("r"),
        i * 4,
        c.getLocal("c")
      ));
    }
    f.addCode(c.i32_wrap_i64(c.i64_shr_u(c.getLocal("c"), c.i64_const(32))));
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.setReturnType("i32");
    f.addLocal("c", "i64");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal(
      "c",
      c.i64_sub(
        c.i64_load32_u(c.getLocal("x")),
        c.i64_load32_u(c.getLocal("y"))
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("r"),
      c.i64_and(
        c.getLocal("c"),
        c.i64_const("0xFFFFFFFF")
      )
    ));
    for (let i = 1; i < n32; i++) {
      f.addCode(c.setLocal(
        "c",
        c.i64_add(
          c.i64_sub(
            c.i64_load32_u(c.getLocal("x"), 4 * i),
            c.i64_load32_u(c.getLocal("y"), 4 * i)
          ),
          c.i64_shr_s(c.getLocal("c"), c.i64_const(32))
        )
      ));
      f.addCode(c.i64_store32(
        c.getLocal("r"),
        i * 4,
        c.i64_and(c.getLocal("c"), c.i64_const("0xFFFFFFFF"))
      ));
    }
    f.addCode(c.i32_wrap_i64(c.i64_shr_s(c.getLocal("c"), c.i64_const(32))));
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
      f.addLocal("y" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const loadX = [];
    const loadY = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadY[j]) {
        Y = c.teeLocal("y" + j, c.i64_load32_u(c.getLocal("y"), j * 4));
        loadY[j] = true;
      } else {
        Y = c.getLocal("y" + j);
      }
      return c.i64_mul(X, Y);
    }
    let c0 = "c0";
    let c1 = "c1";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      for (let i = Math.max(0, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      f.addCode(
        c.i64_store32(
          c.getLocal("r"),
          k * 4,
          c.getLocal(c0)
        )
      );
      [c0, c1] = [c1, c0];
      f.addCode(
        c.setLocal(
          c1,
          c.i64_shr_u(
            c.getLocal(c0),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 * 2 - 4,
        c.getLocal(c0)
      )
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    f.addLocal("c0_old", "i64");
    f.addLocal("c1_old", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const loadX = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadX[j]) {
        Y = c.teeLocal("x" + j, c.i64_load32_u(c.getLocal("x"), j * 4));
        loadX[j] = true;
      } else {
        Y = c.getLocal("x" + j);
      }
      return c.i64_mul(X, Y);
    }
    let c0 = "c0";
    let c1 = "c1";
    let c0_old = "c0_old";
    let c1_old = "c1_old";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      f.addCode(
        c.setLocal(c0, c.i64_const(0)),
        c.setLocal(c1, c.i64_const(0))
      );
      for (let i = Math.max(0, k - n32 + 1); i < k + 1 >> 1 && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      f.addCode(
        c.setLocal(
          c0,
          c.i64_shl(
            c.i64_and(
              c.getLocal(c0),
              c.i64_const(4294967295)
            ),
            c.i64_const(1)
          )
        )
      );
      f.addCode(
        c.setLocal(
          c1,
          c.i64_add(
            c.i64_shl(
              c.getLocal(c1),
              c.i64_const(1)
            ),
            c.i64_shr_u(
              c.getLocal(c0),
              c.i64_const(32)
            )
          )
        )
      );
      if (k % 2 == 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(k >> 1, k >> 1)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k > 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              c.i64_and(
                c.getLocal(c0_old),
                c.i64_const(4294967295)
              )
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.i64_add(
                c.getLocal(c1),
                c.i64_shr_u(
                  c.getLocal(c0),
                  c.i64_const(32)
                )
              ),
              c.getLocal(c1_old)
            )
          )
        );
      }
      f.addCode(
        c.i64_store32(
          c.getLocal("r"),
          k * 4,
          c.getLocal(c0)
        )
      );
      f.addCode(
        c.setLocal(
          c0_old,
          c.getLocal(c1)
        ),
        c.setLocal(
          c1_old,
          c.i64_shr_u(
            c.getLocal(c0_old),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 * 2 - 4,
        c.getLocal(c0_old)
      )
    );
  }
  function buildSquareOld() {
    const f = module.addFunction(prefix + "_squareOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.getLocal("x"), c.getLocal("r")));
  }
  function _buildMul1() {
    const f = module.addFunction(prefix + "__mul1");
    f.addParam("px", "i32");
    f.addParam("y", "i64");
    f.addParam("pr", "i32");
    f.addLocal("c", "i64");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal(
      "c",
      c.i64_mul(
        c.i64_load32_u(c.getLocal("px"), 0, 0),
        c.getLocal("y")
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("pr"),
      0,
      0,
      c.getLocal("c")
    ));
    for (let i = 1; i < n32; i++) {
      f.addCode(c.setLocal(
        "c",
        c.i64_add(
          c.i64_mul(
            c.i64_load32_u(c.getLocal("px"), 4 * i, 0),
            c.getLocal("y")
          ),
          c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
        )
      ));
      f.addCode(c.i64_store32(
        c.getLocal("pr"),
        i * 4,
        0,
        c.getLocal("c")
      ));
    }
  }
  function _buildAdd1() {
    const f = module.addFunction(prefix + "__add1");
    f.addParam("x", "i32");
    f.addParam("y", "i64");
    f.addLocal("c", "i64");
    f.addLocal("px", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.setLocal("px", c.getLocal("x")));
    f.addCode(c.setLocal(
      "c",
      c.i64_add(
        c.i64_load32_u(c.getLocal("px"), 0, 0),
        c.getLocal("y")
      )
    ));
    f.addCode(c.i64_store32(
      c.getLocal("px"),
      0,
      0,
      c.getLocal("c")
    ));
    f.addCode(c.setLocal(
      "c",
      c.i64_shr_u(
        c.getLocal("c"),
        c.i64_const(32)
      )
    ));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.i64_eqz(c.getLocal("c"))
      ),
      c.setLocal(
        "px",
        c.i32_add(
          c.getLocal("px"),
          c.i32_const(4)
        )
      ),
      c.setLocal(
        "c",
        c.i64_add(
          c.i64_load32_u(c.getLocal("px"), 0, 0),
          c.getLocal("c")
        )
      ),
      c.i64_store32(
        c.getLocal("px"),
        0,
        0,
        c.getLocal("c")
      ),
      c.setLocal(
        "c",
        c.i64_shr_u(
          c.getLocal("c"),
          c.i64_const(32)
        )
      ),
      c.br(0)
    )));
  }
  function buildDiv() {
    _buildMul1();
    _buildAdd1();
    const f = module.addFunction(prefix + "_div");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("c", "i32");
    f.addParam("r", "i32");
    f.addLocal("rr", "i32");
    f.addLocal("cc", "i32");
    f.addLocal("eX", "i32");
    f.addLocal("eY", "i32");
    f.addLocal("sy", "i64");
    f.addLocal("sx", "i64");
    f.addLocal("ec", "i32");
    const c = f.getCodeBuilder();
    const Y = c.i32_const(module.alloc(n8));
    const Caux = c.i32_const(module.alloc(n8));
    const Raux = c.i32_const(module.alloc(n8));
    const C = c.getLocal("cc");
    const R = c.getLocal("rr");
    const pr1 = module.alloc(n8 * 2);
    const R1 = c.i32_const(pr1);
    const R2 = c.i32_const(pr1 + n8);
    f.addCode(c.if(
      c.getLocal("c"),
      c.setLocal("cc", c.getLocal("c")),
      c.setLocal("cc", Caux)
    ));
    f.addCode(c.if(
      c.getLocal("r"),
      c.setLocal("rr", c.getLocal("r")),
      c.setLocal("rr", Raux)
    ));
    f.addCode(c.call(prefix + "_copy", c.getLocal("x"), R));
    f.addCode(c.call(prefix + "_copy", c.getLocal("y"), Y));
    f.addCode(c.call(prefix + "_zero", C));
    f.addCode(c.call(prefix + "_zero", R1));
    f.addCode(c.setLocal("eX", c.i32_const(n8 - 1)));
    f.addCode(c.setLocal("eY", c.i32_const(n8 - 1)));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.i32_or(
          c.i32_load8_u(
            c.i32_add(Y, c.getLocal("eY")),
            0,
            0
          ),
          c.i32_eq(
            c.getLocal("eY"),
            c.i32_const(3)
          )
        )
      ),
      c.setLocal("eY", c.i32_sub(c.getLocal("eY"), c.i32_const(1))),
      c.br(0)
    )));
    f.addCode(
      c.setLocal(
        "sy",
        c.i64_add(
          c.i64_load32_u(
            c.i32_sub(
              c.i32_add(Y, c.getLocal("eY")),
              c.i32_const(3)
            ),
            0,
            0
          ),
          c.i64_const(1)
        )
      )
    );
    f.addCode(
      c.if(
        c.i64_eq(
          c.getLocal("sy"),
          c.i64_const(1)
        ),
        c.drop(c.i64_div_u(c.i64_const(0), c.i64_const(0)))
      )
    );
    f.addCode(c.block(c.loop(
      // while (eX>7)&&(Y[eX]==0) ex--;
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_or(
            c.i32_load8_u(
              c.i32_add(R, c.getLocal("eX")),
              0,
              0
            ),
            c.i32_eq(
              c.getLocal("eX"),
              c.i32_const(7)
            )
          )
        ),
        c.setLocal("eX", c.i32_sub(c.getLocal("eX"), c.i32_const(1))),
        c.br(0)
      )),
      c.setLocal(
        "sx",
        c.i64_load(
          c.i32_sub(
            c.i32_add(R, c.getLocal("eX")),
            c.i32_const(7)
          ),
          0,
          0
        )
      ),
      c.setLocal(
        "sx",
        c.i64_div_u(
          c.getLocal("sx"),
          c.getLocal("sy")
        )
      ),
      c.setLocal(
        "ec",
        c.i32_sub(
          c.i32_sub(
            c.getLocal("eX"),
            c.getLocal("eY")
          ),
          c.i32_const(4)
        )
      ),
      // While greater than 32 bits or ec is neg, shr and inc exp
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_and(
            c.i64_eqz(
              c.i64_and(
                c.getLocal("sx"),
                c.i64_const("0xFFFFFFFF00000000")
              )
            ),
            c.i32_ge_s(
              c.getLocal("ec"),
              c.i32_const(0)
            )
          )
        ),
        c.setLocal(
          "sx",
          c.i64_shr_u(
            c.getLocal("sx"),
            c.i64_const(8)
          )
        ),
        c.setLocal(
          "ec",
          c.i32_add(
            c.getLocal("ec"),
            c.i32_const(1)
          )
        ),
        c.br(0)
      )),
      c.if(
        c.i64_eqz(c.getLocal("sx")),
        [
          ...c.br_if(
            2,
            c.i32_eqz(c.call(prefix + "_gte", R, Y))
          ),
          ...c.setLocal("sx", c.i64_const(1)),
          ...c.setLocal("ec", c.i32_const(0))
        ]
      ),
      c.call(prefix + "__mul1", Y, c.getLocal("sx"), R2),
      c.drop(c.call(
        prefix + "_sub",
        R,
        c.i32_sub(R2, c.getLocal("ec")),
        R
      )),
      c.call(
        prefix + "__add1",
        c.i32_add(C, c.getLocal("ec")),
        c.getLocal("sx")
      ),
      c.br(0)
    )));
  }
  function buildInverseMod() {
    const f = module.addFunction(prefix + "_inverseMod");
    f.addParam("px", "i32");
    f.addParam("pm", "i32");
    f.addParam("pr", "i32");
    f.addLocal("t", "i32");
    f.addLocal("newt", "i32");
    f.addLocal("r", "i32");
    f.addLocal("qq", "i32");
    f.addLocal("qr", "i32");
    f.addLocal("newr", "i32");
    f.addLocal("swp", "i32");
    f.addLocal("x", "i32");
    f.addLocal("signt", "i32");
    f.addLocal("signnewt", "i32");
    f.addLocal("signx", "i32");
    const c = f.getCodeBuilder();
    const aux1 = c.i32_const(module.alloc(n8));
    const aux2 = c.i32_const(module.alloc(n8));
    const aux3 = c.i32_const(module.alloc(n8));
    const aux4 = c.i32_const(module.alloc(n8));
    const aux5 = c.i32_const(module.alloc(n8));
    const aux6 = c.i32_const(module.alloc(n8));
    const mulBuff = c.i32_const(module.alloc(n8 * 2));
    const aux7 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("t", aux1),
      c.call(prefix + "_zero", aux1),
      c.setLocal("signt", c.i32_const(0))
    );
    f.addCode(
      c.setLocal("r", aux2),
      c.call(prefix + "_copy", c.getLocal("pm"), aux2)
    );
    f.addCode(
      c.setLocal("newt", aux3),
      c.call(prefix + "_one", aux3),
      c.setLocal("signnewt", c.i32_const(0))
    );
    f.addCode(
      c.setLocal("newr", aux4),
      c.call(prefix + "_copy", c.getLocal("px"), aux4)
    );
    f.addCode(c.setLocal("qq", aux5));
    f.addCode(c.setLocal("qr", aux6));
    f.addCode(c.setLocal("x", aux7));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.call(prefix + "_isZero", c.getLocal("newr"))
      ),
      c.call(prefix + "_div", c.getLocal("r"), c.getLocal("newr"), c.getLocal("qq"), c.getLocal("qr")),
      c.call(prefix + "_mul", c.getLocal("qq"), c.getLocal("newt"), mulBuff),
      c.if(
        c.getLocal("signt"),
        c.if(
          c.getLocal("signnewt"),
          c.if(
            c.call(prefix + "_gte", mulBuff, c.getLocal("t")),
            [
              ...c.drop(c.call(prefix + "_sub", mulBuff, c.getLocal("t"), c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(0))
            ],
            [
              ...c.drop(c.call(prefix + "_sub", c.getLocal("t"), mulBuff, c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(1))
            ]
          ),
          [
            ...c.drop(c.call(prefix + "_add", mulBuff, c.getLocal("t"), c.getLocal("x"))),
            ...c.setLocal("signx", c.i32_const(1))
          ]
        ),
        c.if(
          c.getLocal("signnewt"),
          [
            ...c.drop(c.call(prefix + "_add", mulBuff, c.getLocal("t"), c.getLocal("x"))),
            ...c.setLocal("signx", c.i32_const(0))
          ],
          c.if(
            c.call(prefix + "_gte", c.getLocal("t"), mulBuff),
            [
              ...c.drop(c.call(prefix + "_sub", c.getLocal("t"), mulBuff, c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(0))
            ],
            [
              ...c.drop(c.call(prefix + "_sub", mulBuff, c.getLocal("t"), c.getLocal("x"))),
              ...c.setLocal("signx", c.i32_const(1))
            ]
          )
        )
      ),
      c.setLocal("swp", c.getLocal("t")),
      c.setLocal("t", c.getLocal("newt")),
      c.setLocal("newt", c.getLocal("x")),
      c.setLocal("x", c.getLocal("swp")),
      c.setLocal("signt", c.getLocal("signnewt")),
      c.setLocal("signnewt", c.getLocal("signx")),
      c.setLocal("swp", c.getLocal("r")),
      c.setLocal("r", c.getLocal("newr")),
      c.setLocal("newr", c.getLocal("qr")),
      c.setLocal("qr", c.getLocal("swp")),
      c.br(0)
    )));
    f.addCode(c.if(
      c.getLocal("signt"),
      c.drop(c.call(prefix + "_sub", c.getLocal("pm"), c.getLocal("t"), c.getLocal("pr"))),
      c.call(prefix + "_copy", c.getLocal("t"), c.getLocal("pr"))
    ));
  }
  buildCopy();
  buildZero();
  buildIsZero();
  buildOne();
  buildEq();
  buildGte();
  buildAdd();
  buildSub();
  buildMul();
  buildSquare();
  buildSquareOld();
  buildDiv();
  buildInverseMod();
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_gte");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_squareOld");
  module.exportFunction(prefix + "_div");
  module.exportFunction(prefix + "_inverseMod");
  return prefix;
};
var build_timesscalar = function buildTimesScalar(module, fnName, elementLen, opAB, opAA, opCopy, opInit) {
  const f = module.addFunction(fnName);
  f.addParam("base", "i32");
  f.addParam("scalar", "i32");
  f.addParam("scalarLength", "i32");
  f.addParam("r", "i32");
  f.addLocal("i", "i32");
  f.addLocal("b", "i32");
  const c = f.getCodeBuilder();
  const aux = c.i32_const(module.alloc(elementLen));
  f.addCode(
    c.if(
      c.i32_eqz(c.getLocal("scalarLength")),
      [
        ...c.call(opInit, c.getLocal("r")),
        ...c.ret([])
      ]
    )
  );
  f.addCode(c.call(opCopy, c.getLocal("base"), aux));
  f.addCode(c.call(opInit, c.getLocal("r")));
  f.addCode(c.setLocal("i", c.getLocal("scalarLength")));
  f.addCode(c.block(c.loop(
    c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
    c.setLocal(
      "b",
      c.i32_load8_u(
        c.i32_add(
          c.getLocal("scalar"),
          c.getLocal("i")
        )
      )
    ),
    ...innerLoop(),
    c.br_if(1, c.i32_eqz(c.getLocal("i"))),
    c.br(0)
  )));
  function innerLoop() {
    const code = [];
    for (let i = 0; i < 8; i++) {
      code.push(
        ...c.call(opAA, c.getLocal("r"), c.getLocal("r")),
        ...c.if(
          c.i32_ge_u(c.getLocal("b"), c.i32_const(128 >> i)),
          [
            ...c.setLocal(
              "b",
              c.i32_sub(
                c.getLocal("b"),
                c.i32_const(128 >> i)
              )
            ),
            ...c.call(opAB, c.getLocal("r"), aux, c.getLocal("r"))
          ]
        )
      );
    }
    return code;
  }
};
var build_batchinverse = buildBatchInverse$3;
function buildBatchInverse$3(module, prefix) {
  const n8 = module.modules[prefix].n64 * 8;
  const f = module.addFunction(prefix + "_batchInverse");
  f.addParam("pIn", "i32");
  f.addParam("inStep", "i32");
  f.addParam("n", "i32");
  f.addParam("pOut", "i32");
  f.addParam("outStep", "i32");
  f.addLocal("itAux", "i32");
  f.addLocal("itIn", "i32");
  f.addLocal("itOut", "i32");
  f.addLocal("i", "i32");
  const c = f.getCodeBuilder();
  const AUX = c.i32_const(module.alloc(n8));
  f.addCode(
    c.setLocal("itAux", c.i32_load(c.i32_const(0))),
    c.i32_store(
      c.i32_const(0),
      c.i32_add(
        c.getLocal("itAux"),
        c.i32_mul(
          c.i32_add(
            c.getLocal("n"),
            c.i32_const(1)
          ),
          c.i32_const(n8)
        )
      )
    )
  );
  f.addCode(
    // aux[0] = a;
    c.call(prefix + "_one", c.getLocal("itAux")),
    // for (i=0;i<n;i++) aux[i] = aux[i-1]*in[i]
    c.setLocal("itIn", c.getLocal("pIn")),
    c.setLocal("itAux", c.i32_add(c.getLocal("itAux"), c.i32_const(n8))),
    c.setLocal("i", c.i32_const(0)),
    c.block(c.loop(
      c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("itIn")),
        c.call(
          prefix + "_copy",
          c.i32_sub(c.getLocal("itAux"), c.i32_const(n8)),
          c.getLocal("itAux")
        ),
        c.call(
          prefix + "_mul",
          c.getLocal("itIn"),
          c.i32_sub(c.getLocal("itAux"), c.i32_const(n8)),
          c.getLocal("itAux")
        )
      ),
      c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.getLocal("inStep"))),
      c.setLocal("itAux", c.i32_add(c.getLocal("itAux"), c.i32_const(n8))),
      c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    )),
    // point to the last
    c.setLocal("itIn", c.i32_sub(c.getLocal("itIn"), c.getLocal("inStep"))),
    c.setLocal("itAux", c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))),
    // itOut = pOut + (n-1)*stepOut   // Point to the last
    c.setLocal(
      "itOut",
      c.i32_add(
        c.getLocal("pOut"),
        c.i32_mul(
          c.i32_sub(c.getLocal("n"), c.i32_const(1)),
          c.getLocal("outStep")
        )
      )
    ),
    // aux[n-1] = 1/aux[n-1]
    c.call(prefix + "_inverse", c.getLocal("itAux"), c.getLocal("itAux")),
    c.block(c.loop(
      c.br_if(1, c.i32_eqz(c.getLocal("i"))),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("itIn")),
        [
          ...c.call(
            prefix + "_copy",
            c.getLocal("itAux"),
            c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))
          ),
          ...c.call(
            prefix + "_zero",
            c.getLocal("itOut")
          )
        ],
        [
          ...c.call(prefix + "_copy", c.i32_sub(c.getLocal("itAux"), c.i32_const(n8)), AUX),
          ...c.call(
            prefix + "_mul",
            c.getLocal("itAux"),
            c.getLocal("itIn"),
            c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))
          ),
          ...c.call(
            prefix + "_mul",
            c.getLocal("itAux"),
            AUX,
            c.getLocal("itOut")
          )
        ]
      ),
      c.setLocal("itIn", c.i32_sub(c.getLocal("itIn"), c.getLocal("inStep"))),
      c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.getLocal("outStep"))),
      c.setLocal("itAux", c.i32_sub(c.getLocal("itAux"), c.i32_const(n8))),
      c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    ))
  );
  f.addCode(
    c.i32_store(
      c.i32_const(0),
      c.getLocal("itAux")
    )
  );
}
var build_batchconvertion = buildBatchConvertion$3;
function buildBatchConvertion$3(module, fnName, internalFnName, sizeIn, sizeOut, reverse) {
  if (typeof reverse === "undefined") {
    if (sizeIn < sizeOut) {
      reverse = true;
    } else {
      reverse = false;
    }
  }
  const f = module.addFunction(fnName);
  f.addParam("pIn", "i32");
  f.addParam("n", "i32");
  f.addParam("pOut", "i32");
  f.addLocal("i", "i32");
  f.addLocal("itIn", "i32");
  f.addLocal("itOut", "i32");
  const c = f.getCodeBuilder();
  if (reverse) {
    f.addCode(
      c.setLocal(
        "itIn",
        c.i32_add(
          c.getLocal("pIn"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeIn)
          )
        )
      ),
      c.setLocal(
        "itOut",
        c.i32_add(
          c.getLocal("pOut"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeOut)
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn"), c.getLocal("itOut")),
        c.setLocal("itIn", c.i32_sub(c.getLocal("itIn"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  } else {
    f.addCode(
      c.setLocal("itIn", c.getLocal("pIn")),
      c.setLocal("itOut", c.getLocal("pOut")),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn"), c.getLocal("itOut")),
        c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_add(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
}
var build_batchop = buildBatchConvertion$2;
function buildBatchConvertion$2(module, fnName, internalFnName, sizeIn, sizeOut, reverse) {
  if (typeof reverse === "undefined") {
    if (sizeIn < sizeOut) {
      reverse = true;
    } else {
      reverse = false;
    }
  }
  const f = module.addFunction(fnName);
  f.addParam("pIn1", "i32");
  f.addParam("pIn2", "i32");
  f.addParam("n", "i32");
  f.addParam("pOut", "i32");
  f.addLocal("i", "i32");
  f.addLocal("itIn1", "i32");
  f.addLocal("itIn2", "i32");
  f.addLocal("itOut", "i32");
  const c = f.getCodeBuilder();
  if (reverse) {
    f.addCode(
      c.setLocal(
        "itIn1",
        c.i32_add(
          c.getLocal("pIn1"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeIn)
          )
        )
      ),
      c.setLocal(
        "itIn2",
        c.i32_add(
          c.getLocal("pIn2"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeIn)
          )
        )
      ),
      c.setLocal(
        "itOut",
        c.i32_add(
          c.getLocal("pOut"),
          c.i32_mul(
            c.i32_sub(
              c.getLocal("n"),
              c.i32_const(1)
            ),
            c.i32_const(sizeOut)
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn1"), c.getLocal("itIn2"), c.getLocal("itOut")),
        c.setLocal("itIn1", c.i32_sub(c.getLocal("itIn1"), c.i32_const(sizeIn))),
        c.setLocal("itIn2", c.i32_sub(c.getLocal("itIn2"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  } else {
    f.addCode(
      c.setLocal("itIn1", c.getLocal("pIn1")),
      c.setLocal("itIn2", c.getLocal("pIn2")),
      c.setLocal("itOut", c.getLocal("pOut")),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.call(internalFnName, c.getLocal("itIn1"), c.getLocal("itIn2"), c.getLocal("itOut")),
        c.setLocal("itIn1", c.i32_add(c.getLocal("itIn1"), c.i32_const(sizeIn))),
        c.setLocal("itIn2", c.i32_add(c.getLocal("itIn2"), c.i32_const(sizeIn))),
        c.setLocal("itOut", c.i32_add(c.getLocal("itOut"), c.i32_const(sizeOut))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
}
var bigint = {};
function compare(a2, b) {
  return a2 === b ? 0 : a2 > b ? 1 : -1;
}
function square$1(n) {
  return n * n;
}
function isOdd$4(n) {
  return n % 2n !== 0n;
}
function isEven(n) {
  return n % 2n === 0n;
}
function isNegative$3(n) {
  return n < 0n;
}
function isPositive(n) {
  return n > 0n;
}
function bitLength$5(n) {
  if (isNegative$3(n)) {
    return n.toString(2).length - 1;
  } else {
    return n.toString(2).length;
  }
}
function abs(n) {
  return n < 0n ? -n : n;
}
function isUnit(n) {
  return abs(n) === 1n;
}
function modInv$3(a2, n) {
  var t = 0n, newT = 1n, r2 = n, newR = abs(a2), q, lastT, lastR;
  while (newR !== 0n) {
    q = r2 / newR;
    lastT = t;
    lastR = r2;
    t = newT;
    r2 = newR;
    newT = lastT - q * newT;
    newR = lastR - q * newR;
  }
  if (!isUnit(r2)) throw new Error(a2.toString() + " and " + n.toString() + " are not co-prime");
  if (compare(t, 0n) === -1) {
    t = t + n;
  }
  if (isNegative$3(a2)) {
    return -t;
  }
  return t;
}
function modPow$2(n, exp2, mod2) {
  if (mod2 === 0n) throw new Error("Cannot take modPow with modulus 0");
  var r2 = 1n, base = n % mod2;
  if (isNegative$3(exp2)) {
    exp2 = exp2 * -1n;
    base = modInv$3(base, mod2);
  }
  while (isPositive(exp2)) {
    if (base === 0n) return 0n;
    if (isOdd$4(exp2)) r2 = r2 * base % mod2;
    exp2 = exp2 / 2n;
    base = square$1(base) % mod2;
  }
  return r2;
}
function compareAbs(a2, b) {
  a2 = a2 >= 0n ? a2 : -a2;
  b = b >= 0n ? b : -b;
  return a2 === b ? 0 : a2 > b ? 1 : -1;
}
function isDivisibleBy(a2, n) {
  if (n === 0n) return false;
  if (isUnit(n)) return true;
  if (compareAbs(n, 2n) === 0) return isEven(a2);
  return a2 % n === 0n;
}
function isBasicPrime(v) {
  var n = abs(v);
  if (isUnit(n)) return false;
  if (n === 2n || n === 3n || n === 5n) return true;
  if (isEven(n) || isDivisibleBy(n, 3n) || isDivisibleBy(n, 5n)) return false;
  if (n < 49n) return true;
}
function prev(n) {
  return n - 1n;
}
function millerRabinTest(n, a2) {
  var nPrev = prev(n), b = nPrev, r2 = 0, d2, i, x;
  while (isEven(b)) b = b / 2n, r2++;
  next: for (i = 0; i < a2.length; i++) {
    if (n < a2[i]) continue;
    x = modPow$2(BigInt(a2[i]), b, n);
    if (isUnit(x) || x === nPrev) continue;
    for (d2 = r2 - 1; d2 != 0; d2--) {
      x = square$1(x) % n;
      if (isUnit(x)) return false;
      if (x === nPrev) continue next;
    }
    return false;
  }
  return true;
}
function isPrime$1(p) {
  var isPrime2 = isBasicPrime(p);
  if (isPrime2 !== void 0) return isPrime2;
  var n = abs(p);
  var bits3 = bitLength$5(n);
  if (bits3 <= 64)
    return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
  var logN = Math.log(2) * Number(bits3);
  var t = Math.ceil(logN);
  for (var a2 = [], i = 0; i < t; i++) {
    a2.push(BigInt(i + 2));
  }
  return millerRabinTest(n, a2);
}
bigint.bitLength = bitLength$5;
bigint.isOdd = isOdd$4;
bigint.isNegative = isNegative$3;
bigint.abs = abs;
bigint.isUnit = isUnit;
bigint.compare = compare;
bigint.modInv = modInv$3;
bigint.modPow = modPow$2;
bigint.isPrime = isPrime$1;
bigint.square = square$1;
var buildInt2 = build_int;
var utils$5 = utils$6;
var buildExp$2 = build_timesscalar;
var buildBatchInverse$2 = build_batchinverse;
var buildBatchConvertion$1 = build_batchconvertion;
var buildBatchOp = build_batchop;
var { bitLength: bitLength$4, modInv: modInv$2, modPow: modPow$1, isPrime, isOdd: isOdd$3, square } = bigint;
var build_f1m = function buildF1m(module, _q, _prefix, _intPrefix) {
  const q = BigInt(_q);
  const n64 = Math.floor((bitLength$4(q - 1n) - 1) / 64) + 1;
  const n32 = n64 * 2;
  const n8 = n64 * 8;
  const prefix = _prefix || "f1m";
  if (module.modules[prefix]) return prefix;
  const intPrefix = buildInt2(module, n64, _intPrefix);
  const pq = module.alloc(n8, utils$5.bigInt2BytesLE(q, n8));
  const pR2 = module.alloc(utils$5.bigInt2BytesLE(square(1n << BigInt(n64 * 64)) % q, n8));
  const pOne = module.alloc(utils$5.bigInt2BytesLE((1n << BigInt(n64 * 64)) % q, n8));
  const pZero = module.alloc(utils$5.bigInt2BytesLE(0n, n8));
  const _minusOne = q - 1n;
  const _e = _minusOne >> 1n;
  const pe = module.alloc(n8, utils$5.bigInt2BytesLE(_e, n8));
  const _ePlusOne = _e + 1n;
  const pePlusOne = module.alloc(n8, utils$5.bigInt2BytesLE(_ePlusOne, n8));
  module.modules[prefix] = {
    pq,
    pR2,
    n64,
    q,
    pOne,
    pZero,
    pePlusOne
  };
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(intPrefix + "_copy", c.i32_const(pOne), c.getLocal("pr")));
  }
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.call(intPrefix + "_add", c.getLocal("x"), c.getLocal("y"), c.getLocal("r")),
        c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r"))),
        c.if(
          c.call(intPrefix + "_gte", c.getLocal("r"), c.i32_const(pq)),
          c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
        )
      )
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.call(intPrefix + "_sub", c.getLocal("x"), c.getLocal("y"), c.getLocal("r")),
        c.drop(c.call(intPrefix + "_add", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
      )
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(prefix + "_sub", c.i32_const(pZero), c.getLocal("x"), c.getLocal("r"))
    );
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call(prefix + "_fromMontgomery", c.getLocal("x"), AUX),
      c.call(intPrefix + "_gte", AUX, c.i32_const(pePlusOne))
    );
  }
  function buildSign() {
    const f = module.addFunction(prefix + "_sign");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(intPrefix + "_isZero", c.getLocal("x")),
        c.ret(c.i32_const(0))
      ),
      c.call(prefix + "_fromMontgomery", c.getLocal("x"), AUX),
      c.if(
        c.call(intPrefix + "_gte", AUX, c.i32_const(pePlusOne)),
        c.ret(c.i32_const(-1))
      ),
      c.ret(c.i32_const(1))
    );
  }
  function buildMReduct() {
    const carries = module.alloc(n32 * n32 * 8);
    const f = module.addFunction(prefix + "_mReduct");
    f.addParam("t", "i32");
    f.addParam("r", "i32");
    f.addLocal("np32", "i64");
    f.addLocal("c", "i64");
    f.addLocal("m", "i64");
    const c = f.getCodeBuilder();
    const np32 = Number(0x100000000n - modInv$2(q, 0x100000000n));
    f.addCode(c.setLocal("np32", c.i64_const(np32)));
    for (let i = 0; i < n32; i++) {
      f.addCode(c.setLocal("c", c.i64_const(0)));
      f.addCode(
        c.setLocal(
          "m",
          c.i64_and(
            c.i64_mul(
              c.i64_load32_u(c.getLocal("t"), i * 4),
              c.getLocal("np32")
            ),
            c.i64_const("0xFFFFFFFF")
          )
        )
      );
      for (let j = 0; j < n32; j++) {
        f.addCode(
          c.setLocal(
            "c",
            c.i64_add(
              c.i64_add(
                c.i64_load32_u(c.getLocal("t"), (i + j) * 4),
                c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
              ),
              c.i64_mul(
                c.i64_load32_u(c.i32_const(pq), j * 4),
                c.getLocal("m")
              )
            )
          )
        );
        f.addCode(
          c.i64_store32(
            c.getLocal("t"),
            (i + j) * 4,
            c.getLocal("c")
          )
        );
      }
      f.addCode(
        c.i64_store32(
          c.i32_const(carries),
          i * 4,
          c.i64_shr_u(c.getLocal("c"), c.i64_const(32))
        )
      );
    }
    f.addCode(
      c.call(
        prefix + "_add",
        c.i32_const(carries),
        c.i32_add(
          c.getLocal("t"),
          c.i32_const(n32 * 4)
        ),
        c.getLocal("r")
      )
    );
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    f.addLocal("np32", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
      f.addLocal("y" + i, "i64");
      f.addLocal("m" + i, "i64");
      f.addLocal("q" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const np32 = Number(0x100000000n - modInv$2(q, 0x100000000n));
    f.addCode(c.setLocal("np32", c.i64_const(np32)));
    const loadX = [];
    const loadY = [];
    const loadQ = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadY[j]) {
        Y = c.teeLocal("y" + j, c.i64_load32_u(c.getLocal("y"), j * 4));
        loadY[j] = true;
      } else {
        Y = c.getLocal("y" + j);
      }
      return c.i64_mul(X, Y);
    }
    function mulqm(i, j) {
      let Q, M;
      if (!loadQ[i]) {
        Q = c.teeLocal("q" + i, c.i64_load32_u(c.i32_const(0), pq + i * 4));
        loadQ[i] = true;
      } else {
        Q = c.getLocal("q" + i);
      }
      M = c.getLocal("m" + j);
      return c.i64_mul(Q, M);
    }
    let c0 = "c0";
    let c1 = "c1";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      for (let i = Math.max(0, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      for (let i = Math.max(1, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k < n32) {
        f.addCode(
          c.setLocal(
            "m" + k,
            c.i64_and(
              c.i64_mul(
                c.i64_and(
                  c.getLocal(c0),
                  c.i64_const(4294967295)
                ),
                c.getLocal("np32")
              ),
              c.i64_const("0xFFFFFFFF")
            )
          )
        );
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(0, k)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k >= n32) {
        f.addCode(
          c.i64_store32(
            c.getLocal("r"),
            (k - n32) * 4,
            c.getLocal(c0)
          )
        );
      }
      [c0, c1] = [c1, c0];
      f.addCode(
        c.setLocal(
          c1,
          c.i64_shr_u(
            c.getLocal(c0),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 - 4,
        c.getLocal(c0)
      )
    );
    f.addCode(
      c.if(
        c.i32_wrap_i64(c.getLocal(c1)),
        c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r"))),
        c.if(
          c.call(intPrefix + "_gte", c.getLocal("r"), c.i32_const(pq)),
          c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
        )
      )
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("c0", "i64");
    f.addLocal("c1", "i64");
    f.addLocal("c0_old", "i64");
    f.addLocal("c1_old", "i64");
    f.addLocal("np32", "i64");
    for (let i = 0; i < n32; i++) {
      f.addLocal("x" + i, "i64");
      f.addLocal("m" + i, "i64");
      f.addLocal("q" + i, "i64");
    }
    const c = f.getCodeBuilder();
    const np32 = Number(0x100000000n - modInv$2(q, 0x100000000n));
    f.addCode(c.setLocal("np32", c.i64_const(np32)));
    const loadX = [];
    const loadQ = [];
    function mulij(i, j) {
      let X, Y;
      if (!loadX[i]) {
        X = c.teeLocal("x" + i, c.i64_load32_u(c.getLocal("x"), i * 4));
        loadX[i] = true;
      } else {
        X = c.getLocal("x" + i);
      }
      if (!loadX[j]) {
        Y = c.teeLocal("x" + j, c.i64_load32_u(c.getLocal("x"), j * 4));
        loadX[j] = true;
      } else {
        Y = c.getLocal("x" + j);
      }
      return c.i64_mul(X, Y);
    }
    function mulqm(i, j) {
      let Q, M;
      if (!loadQ[i]) {
        Q = c.teeLocal("q" + i, c.i64_load32_u(c.i32_const(0), pq + i * 4));
        loadQ[i] = true;
      } else {
        Q = c.getLocal("q" + i);
      }
      M = c.getLocal("m" + j);
      return c.i64_mul(Q, M);
    }
    let c0 = "c0";
    let c1 = "c1";
    let c0_old = "c0_old";
    let c1_old = "c1_old";
    for (let k = 0; k < n32 * 2 - 1; k++) {
      f.addCode(
        c.setLocal(c0, c.i64_const(0)),
        c.setLocal(c1, c.i64_const(0))
      );
      for (let i = Math.max(0, k - n32 + 1); i < k + 1 >> 1 && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      f.addCode(
        c.setLocal(
          c0,
          c.i64_shl(
            c.i64_and(
              c.getLocal(c0),
              c.i64_const(4294967295)
            ),
            c.i64_const(1)
          )
        )
      );
      f.addCode(
        c.setLocal(
          c1,
          c.i64_add(
            c.i64_shl(
              c.getLocal(c1),
              c.i64_const(1)
            ),
            c.i64_shr_u(
              c.getLocal(c0),
              c.i64_const(32)
            )
          )
        )
      );
      if (k % 2 == 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulij(k >> 1, k >> 1)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k > 0) {
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              c.i64_and(
                c.getLocal(c0_old),
                c.i64_const(4294967295)
              )
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.i64_add(
                c.getLocal(c1),
                c.i64_shr_u(
                  c.getLocal(c0),
                  c.i64_const(32)
                )
              ),
              c.getLocal(c1_old)
            )
          )
        );
      }
      for (let i = Math.max(1, k - n32 + 1); i <= k && i < n32; i++) {
        const j = k - i;
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(i, j)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k < n32) {
        f.addCode(
          c.setLocal(
            "m" + k,
            c.i64_and(
              c.i64_mul(
                c.i64_and(
                  c.getLocal(c0),
                  c.i64_const(4294967295)
                ),
                c.getLocal("np32")
              ),
              c.i64_const("0xFFFFFFFF")
            )
          )
        );
        f.addCode(
          c.setLocal(
            c0,
            c.i64_add(
              c.i64_and(
                c.getLocal(c0),
                c.i64_const(4294967295)
              ),
              mulqm(0, k)
            )
          )
        );
        f.addCode(
          c.setLocal(
            c1,
            c.i64_add(
              c.getLocal(c1),
              c.i64_shr_u(
                c.getLocal(c0),
                c.i64_const(32)
              )
            )
          )
        );
      }
      if (k >= n32) {
        f.addCode(
          c.i64_store32(
            c.getLocal("r"),
            (k - n32) * 4,
            c.getLocal(c0)
          )
        );
      }
      f.addCode(
        c.setLocal(
          c0_old,
          c.getLocal(c1)
        ),
        c.setLocal(
          c1_old,
          c.i64_shr_u(
            c.getLocal(c0_old),
            c.i64_const(32)
          )
        )
      );
    }
    f.addCode(
      c.i64_store32(
        c.getLocal("r"),
        n32 * 4 - 4,
        c.getLocal(c0_old)
      )
    );
    f.addCode(
      c.if(
        c.i32_wrap_i64(c.getLocal(c1_old)),
        c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r"))),
        c.if(
          c.call(intPrefix + "_gte", c.getLocal("r"), c.i32_const(pq)),
          c.drop(c.call(intPrefix + "_sub", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")))
        )
      )
    );
  }
  function buildSquareOld() {
    const f = module.addFunction(prefix + "_squareOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.getLocal("x"), c.getLocal("r")));
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.i32_const(pR2), c.getLocal("r")));
  }
  function buildFromMontgomery() {
    const pAux2 = module.alloc(n8 * 2);
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(intPrefix + "_copy", c.getLocal("x"), c.i32_const(pAux2)));
    f.addCode(c.call(intPrefix + "_zero", c.i32_const(pAux2 + n8)));
    f.addCode(c.call(prefix + "_mReduct", c.i32_const(pAux2), c.getLocal("r")));
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_fromMontgomery", c.getLocal("x"), c.getLocal("r")));
    f.addCode(c.call(intPrefix + "_inverseMod", c.getLocal("r"), c.i32_const(pq), c.getLocal("r")));
    f.addCode(c.call(prefix + "_toMontgomery", c.getLocal("r"), c.getLocal("r")));
  }
  let _nqr = 2n;
  if (isPrime(q)) {
    while (modPow$1(_nqr, _e, q) !== _minusOne) _nqr = _nqr + 1n;
  }
  let s2 = 0;
  let _t = _minusOne;
  while (!isOdd$3(_t) && _t !== 0n) {
    s2++;
    _t = _t >> 1n;
  }
  const pt = module.alloc(n8, utils$5.bigInt2BytesLE(_t, n8));
  const _nqrToT = modPow$1(_nqr, _t, q);
  const pNqrToT = module.alloc(utils$5.bigInt2BytesLE((_nqrToT << BigInt(n64 * 64)) % q, n8));
  const _tPlusOneOver2 = _t + 1n >> 1n;
  const ptPlusOneOver2 = module.alloc(n8, utils$5.bigInt2BytesLE(_tPlusOneOver2, n8));
  function buildSqrt2() {
    const f = module.addFunction(prefix + "_sqrt");
    f.addParam("n", "i32");
    f.addParam("r", "i32");
    f.addLocal("m", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    const c = f.getCodeBuilder();
    const ONE = c.i32_const(pOne);
    const C = c.i32_const(module.alloc(n8));
    const T = c.i32_const(module.alloc(n8));
    const R = c.i32_const(module.alloc(n8));
    const SQ = c.i32_const(module.alloc(n8));
    const B = c.i32_const(module.alloc(n8));
    f.addCode(
      // If (n==0) return 0
      c.if(
        c.call(prefix + "_isZero", c.getLocal("n")),
        c.ret(
          c.call(prefix + "_zero", c.getLocal("r"))
        )
      ),
      c.setLocal("m", c.i32_const(s2)),
      c.call(prefix + "_copy", c.i32_const(pNqrToT), C),
      c.call(prefix + "_exp", c.getLocal("n"), c.i32_const(pt), c.i32_const(n8), T),
      c.call(prefix + "_exp", c.getLocal("n"), c.i32_const(ptPlusOneOver2), c.i32_const(n8), R),
      c.block(c.loop(
        c.br_if(1, c.call(prefix + "_eq", T, ONE)),
        c.call(prefix + "_square", T, SQ),
        c.setLocal("i", c.i32_const(1)),
        c.block(c.loop(
          c.br_if(1, c.call(prefix + "_eq", SQ, ONE)),
          c.call(prefix + "_square", SQ, SQ),
          c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
          c.br(0)
        )),
        c.call(prefix + "_copy", C, B),
        c.setLocal("j", c.i32_sub(c.i32_sub(c.getLocal("m"), c.getLocal("i")), c.i32_const(1))),
        c.block(c.loop(
          c.br_if(1, c.i32_eqz(c.getLocal("j"))),
          c.call(prefix + "_square", B, B),
          c.setLocal("j", c.i32_sub(c.getLocal("j"), c.i32_const(1))),
          c.br(0)
        )),
        c.setLocal("m", c.getLocal("i")),
        c.call(prefix + "_square", B, C),
        c.call(prefix + "_mul", T, C, T),
        c.call(prefix + "_mul", R, B, R),
        c.br(0)
      )),
      c.if(
        c.call(prefix + "_isNegative", R),
        c.call(prefix + "_neg", R, c.getLocal("r")),
        c.call(prefix + "_copy", R, c.getLocal("r"))
      )
    );
  }
  function buildIsSquare() {
    const f = module.addFunction(prefix + "_isSquare");
    f.addParam("n", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const ONE = c.i32_const(pOne);
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("n")),
        c.ret(c.i32_const(1))
      ),
      c.call(prefix + "_exp", c.getLocal("n"), c.i32_const(pe), c.i32_const(n8), AUX),
      c.call(prefix + "_eq", AUX, ONE)
    );
  }
  function buildLoad() {
    const f = module.addFunction(prefix + "_load");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    f.addLocal("p", "i32");
    f.addLocal("l", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    const c = f.getCodeBuilder();
    const R = c.i32_const(module.alloc(n8));
    const pAux = module.alloc(n8);
    const AUX = c.i32_const(pAux);
    f.addCode(
      c.call(intPrefix + "_zero", c.getLocal("r")),
      c.setLocal("i", c.i32_const(n8)),
      c.setLocal("p", c.getLocal("scalar")),
      c.block(c.loop(
        c.br_if(1, c.i32_gt_u(c.getLocal("i"), c.getLocal("scalarLen"))),
        c.if(
          c.i32_eq(c.getLocal("i"), c.i32_const(n8)),
          c.call(prefix + "_one", R),
          c.call(prefix + "_mul", R, c.i32_const(pR2), R)
        ),
        c.call(prefix + "_mul", c.getLocal("p"), R, AUX),
        c.call(prefix + "_add", c.getLocal("r"), AUX, c.getLocal("r")),
        c.setLocal("p", c.i32_add(c.getLocal("p"), c.i32_const(n8))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(n8))),
        c.br(0)
      )),
      c.setLocal("l", c.i32_rem_u(c.getLocal("scalarLen"), c.i32_const(n8))),
      c.if(c.i32_eqz(c.getLocal("l")), c.ret([])),
      c.call(intPrefix + "_zero", AUX),
      c.setLocal("j", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("j"), c.getLocal("l"))),
        c.i32_store8(
          c.getLocal("j"),
          pAux,
          c.i32_load8_u(c.getLocal("p"))
        ),
        c.setLocal("p", c.i32_add(c.getLocal("p"), c.i32_const(1))),
        c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
        c.br(0)
      )),
      c.if(
        c.i32_eq(c.getLocal("i"), c.i32_const(n8)),
        c.call(prefix + "_one", R),
        c.call(prefix + "_mul", R, c.i32_const(pR2), R)
      ),
      c.call(prefix + "_mul", AUX, R, AUX),
      c.call(prefix + "_add", c.getLocal("r"), AUX, c.getLocal("r"))
    );
  }
  function buildTimesScalar2() {
    const f = module.addFunction(prefix + "_timesScalar");
    f.addParam("x", "i32");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call(prefix + "_load", c.getLocal("scalar"), c.getLocal("scalarLen"), AUX),
      c.call(prefix + "_toMontgomery", AUX, AUX),
      c.call(prefix + "_mul", c.getLocal("x"), AUX, c.getLocal("r"))
    );
  }
  function buildIsOne() {
    const f = module.addFunction(prefix + "_isOne");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.ret(c.call(intPrefix + "_eq", c.getLocal("x"), c.i32_const(pOne)))
    );
  }
  module.exportFunction(intPrefix + "_copy", prefix + "_copy");
  module.exportFunction(intPrefix + "_zero", prefix + "_zero");
  module.exportFunction(intPrefix + "_isZero", prefix + "_isZero");
  module.exportFunction(intPrefix + "_eq", prefix + "_eq");
  buildIsOne();
  buildAdd();
  buildSub();
  buildNeg();
  buildMReduct();
  buildMul();
  buildSquare();
  buildSquareOld();
  buildToMontgomery();
  buildFromMontgomery();
  buildIsNegative();
  buildSign();
  buildInverse();
  buildOne();
  buildLoad();
  buildTimesScalar2();
  buildBatchInverse$2(module, prefix);
  buildBatchConvertion$1(module, prefix + "_batchToMontgomery", prefix + "_toMontgomery", n8, n8);
  buildBatchConvertion$1(module, prefix + "_batchFromMontgomery", prefix + "_fromMontgomery", n8, n8);
  buildBatchConvertion$1(module, prefix + "_batchNeg", prefix + "_neg", n8, n8);
  buildBatchOp(module, prefix + "_batchAdd", prefix + "_add", n8, n8);
  buildBatchOp(module, prefix + "_batchSub", prefix + "_sub", n8, n8);
  buildBatchOp(module, prefix + "_batchMul", prefix + "_mul", n8, n8);
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_isNegative");
  module.exportFunction(prefix + "_isOne");
  module.exportFunction(prefix + "_sign");
  module.exportFunction(prefix + "_mReduct");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_squareOld");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_inverse");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_load");
  module.exportFunction(prefix + "_timesScalar");
  buildExp$2(
    module,
    prefix + "_exp",
    n8,
    prefix + "_mul",
    prefix + "_square",
    intPrefix + "_copy",
    prefix + "_one"
  );
  module.exportFunction(prefix + "_exp");
  module.exportFunction(prefix + "_batchInverse");
  if (isPrime(q)) {
    buildSqrt2();
    buildIsSquare();
    module.exportFunction(prefix + "_sqrt");
    module.exportFunction(prefix + "_isSquare");
  }
  module.exportFunction(prefix + "_batchToMontgomery");
  module.exportFunction(prefix + "_batchFromMontgomery");
  return prefix;
};
var buildF1m$2 = build_f1m;
var { bitLength: bitLength$3 } = bigint;
var build_f1 = function buildF1(module, _q, _prefix, _f1mPrefix, _intPrefix) {
  const q = BigInt(_q);
  const n64 = Math.floor((bitLength$3(q - 1n) - 1) / 64) + 1;
  const n8 = n64 * 8;
  const prefix = _prefix || "f1";
  if (module.modules[prefix]) return prefix;
  module.modules[prefix] = {
    n64
  };
  const intPrefix = _intPrefix || "int";
  const f1mPrefix = buildF1m$2(module, q, _f1mPrefix, intPrefix);
  const pR2 = module.modules[f1mPrefix].pR2;
  const pq = module.modules[f1mPrefix].pq;
  const pePlusOne = module.modules[f1mPrefix].pePlusOne;
  function buildMul() {
    const pAux1 = module.alloc(n8);
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(f1mPrefix + "_mul", c.getLocal("x"), c.getLocal("y"), c.i32_const(pAux1)));
    f.addCode(c.call(f1mPrefix + "_mul", c.i32_const(pAux1), c.i32_const(pR2), c.getLocal("r")));
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(prefix + "_mul", c.getLocal("x"), c.getLocal("x"), c.getLocal("r")));
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(intPrefix + "_inverseMod", c.getLocal("x"), c.i32_const(pq), c.getLocal("r")));
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(intPrefix + "_gte", c.getLocal("x"), c.i32_const(pePlusOne))
    );
  }
  buildMul();
  buildSquare();
  buildInverse();
  buildIsNegative();
  module.exportFunction(f1mPrefix + "_add", prefix + "_add");
  module.exportFunction(f1mPrefix + "_sub", prefix + "_sub");
  module.exportFunction(f1mPrefix + "_neg", prefix + "_neg");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_inverse");
  module.exportFunction(prefix + "_isNegative");
  module.exportFunction(f1mPrefix + "_copy", prefix + "_copy");
  module.exportFunction(f1mPrefix + "_zero", prefix + "_zero");
  module.exportFunction(f1mPrefix + "_one", prefix + "_one");
  module.exportFunction(f1mPrefix + "_isZero", prefix + "_isZero");
  module.exportFunction(f1mPrefix + "_eq", prefix + "_eq");
  return prefix;
};
var buildExp$1 = build_timesscalar;
var buildBatchInverse$1 = build_batchinverse;
var utils$4 = utils$6;
var build_f2m = function buildF2m(module, mulNonResidueFn, prefix, f1mPrefix) {
  if (module.modules[prefix]) return prefix;
  const f1n8 = module.modules[f1mPrefix].n64 * 8;
  const q = module.modules[f1mPrefix].q;
  module.modules[prefix] = {
    n64: module.modules[f1mPrefix].n64 * 2
  };
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_add", x0, y0, r0),
      c.call(f1mPrefix + "_add", x1, y1, r1)
    );
  }
  function buildTimesScalar2() {
    const f = module.addFunction(prefix + "_timesScalar");
    f.addParam("x", "i32");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_timesScalar", x0, c.getLocal("scalar"), c.getLocal("scalarLen"), r0),
      c.call(f1mPrefix + "_timesScalar", x1, c.getLocal("scalar"), c.getLocal("scalarLen"), r1)
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_sub", x0, y0, r0),
      c.call(f1mPrefix + "_sub", x1, y1, r1)
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_neg", x0, r0),
      c.call(f1mPrefix + "_neg", x1, r1)
    );
  }
  function buildConjugate() {
    const f = module.addFunction(prefix + "_conjugate");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, r0),
      c.call(f1mPrefix + "_neg", x1, r1)
    );
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.if(
        c.call(f1mPrefix + "_isZero", x1),
        c.ret(c.call(f1mPrefix + "_isNegative", x0))
      ),
      c.ret(c.call(f1mPrefix + "_isNegative", x1))
    );
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const A = c.i32_const(module.alloc(f1n8));
    const B = c.i32_const(module.alloc(f1n8));
    const C = c.i32_const(module.alloc(f1n8));
    const D = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_mul", x0, y0, A),
      // A = x0*y0
      c.call(f1mPrefix + "_mul", x1, y1, B),
      // B = x1*y1
      c.call(f1mPrefix + "_add", x0, x1, C),
      // C = x0 + x1
      c.call(f1mPrefix + "_add", y0, y1, D),
      // D = y0 + y1
      c.call(f1mPrefix + "_mul", C, D, C),
      // C = (x0 + x1)*(y0 + y1) = x0*y0+x0*y1+x1*y0+x1*y1
      //  c.call(f1mPrefix + "_mul", B, c.i32_const(pNonResidue), r0),  // r0 = nr*(x1*y1)
      c.call(mulNonResidueFn, B, r0),
      // r0 = nr*(x1*y1)
      c.call(f1mPrefix + "_add", A, r0, r0),
      // r0 = x0*y0 + nr*(x1*y1)
      c.call(f1mPrefix + "_add", A, B, r1),
      // r1 = x0*y0+x1*y1
      c.call(f1mPrefix + "_sub", C, r1, r1)
      // r1 = x0*y0+x0*y1+x1*y0+x1*y1 - x0*y0+x1*y1 = x0*y1+x1*y0
    );
  }
  function buildMul1() {
    const f = module.addFunction(prefix + "_mul1");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y = c.getLocal("y");
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_mul", x0, y, r0),
      // A = x0*y
      c.call(f1mPrefix + "_mul", x1, y, r1)
      // B = x1*y
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const AB = c.i32_const(module.alloc(f1n8));
    const APB = c.i32_const(module.alloc(f1n8));
    const APNB = c.i32_const(module.alloc(f1n8));
    const ABPNAB = c.i32_const(module.alloc(f1n8));
    f.addCode(
      // AB = x0*y1
      c.call(f1mPrefix + "_mul", x0, x1, AB),
      // APB = x0+y1
      c.call(f1mPrefix + "_add", x0, x1, APB),
      // APBN0 = x0 + nr*x1
      c.call(mulNonResidueFn, x1, APNB),
      c.call(f1mPrefix + "_add", x0, APNB, APNB),
      // ABPNAB = ab + nr*ab
      c.call(mulNonResidueFn, AB, ABPNAB),
      c.call(f1mPrefix + "_add", ABPNAB, AB, ABPNAB),
      // r0 = APB * APNB - ABPNAB
      c.call(f1mPrefix + "_mul", APB, APNB, r0),
      c.call(f1mPrefix + "_sub", r0, ABPNAB, r0),
      // r1 = AB + AB
      c.call(f1mPrefix + "_add", AB, AB, r1)
    );
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_toMontgomery", x0, r0),
      c.call(f1mPrefix + "_toMontgomery", x1, r1)
    );
  }
  function buildFromMontgomery() {
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_fromMontgomery", x0, r0),
      c.call(f1mPrefix + "_fromMontgomery", x1, r1)
    );
  }
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, r0),
      c.call(f1mPrefix + "_copy", x1, r1)
    );
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_zero", x0),
      c.call(f1mPrefix + "_zero", x1)
    );
  }
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_one", x0),
      c.call(f1mPrefix + "_zero", x1)
    );
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    f.addCode(
      c.i32_and(
        c.call(f1mPrefix + "_eq", x0, y0),
        c.call(f1mPrefix + "_eq", x1, y1)
      )
    );
  }
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.i32_and(
        c.call(f1mPrefix + "_isZero", x0),
        c.call(f1mPrefix + "_isZero", x1)
      )
    );
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const t0 = c.i32_const(module.alloc(f1n8));
    const t1 = c.i32_const(module.alloc(f1n8));
    const t2 = c.i32_const(module.alloc(f1n8));
    const t3 = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_square", x0, t0),
      c.call(f1mPrefix + "_square", x1, t1),
      // c.call(f1mPrefix+"_mul", t1, c.i32_const(pNonResidue), t2),
      c.call(mulNonResidueFn, t1, t2),
      c.call(f1mPrefix + "_sub", t0, t2, t2),
      c.call(f1mPrefix + "_inverse", t2, t3),
      c.call(f1mPrefix + "_mul", x0, t3, r0),
      c.call(f1mPrefix + "_mul", x1, t3, r1),
      c.call(f1mPrefix + "_neg", r1, r1)
    );
  }
  function buildSign() {
    const f = module.addFunction(prefix + "_sign");
    f.addParam("x", "i32");
    f.addLocal("s", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.setLocal("s", c.call(f1mPrefix + "_sign", x1)),
      c.if(
        c.getLocal("s"),
        c.ret(c.getLocal("s"))
      ),
      c.ret(c.call(f1mPrefix + "_sign", x0))
    );
  }
  function buildIsOne() {
    const f = module.addFunction(prefix + "_isOne");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    f.addCode(
      c.ret(c.i32_and(
        c.call(f1mPrefix + "_isOne", x0),
        c.call(f1mPrefix + "_isZero", x1)
      ))
    );
  }
  function buildSqrt2() {
    const f = module.addFunction(prefix + "_sqrt");
    f.addParam("a", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const e34 = c.i32_const(module.alloc(utils$4.bigInt2BytesLE((BigInt(q || 0) - 3n) / 4n, f1n8)));
    const e12 = c.i32_const(module.alloc(utils$4.bigInt2BytesLE((BigInt(q || 0) - 1n) / 2n, f1n8)));
    const a2 = c.getLocal("a");
    const a1 = c.i32_const(module.alloc(f1n8 * 2));
    const alpha = c.i32_const(module.alloc(f1n8 * 2));
    const a0 = c.i32_const(module.alloc(f1n8 * 2));
    const pn1 = module.alloc(f1n8 * 2);
    const n1 = c.i32_const(pn1);
    const n1a = c.i32_const(pn1);
    const n1b = c.i32_const(pn1 + f1n8);
    const x0 = c.i32_const(module.alloc(f1n8 * 2));
    const b = c.i32_const(module.alloc(f1n8 * 2));
    f.addCode(
      c.call(prefix + "_one", n1),
      c.call(prefix + "_neg", n1, n1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_exp", a2, e34, c.i32_const(f1n8), a1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_square", a1, alpha),
      c.call(prefix + "_mul", a2, alpha, alpha),
      // const a0 = F.mul(F.frobenius(1, alfa), alfa);
      c.call(prefix + "_conjugate", alpha, a0),
      c.call(prefix + "_mul", a0, alpha, a0),
      // if (F.eq(a0, F.negone)) return null;
      c.if(c.call(prefix + "_eq", a0, n1), c.unreachable()),
      // const x0 = F.mul(a1, a);
      c.call(prefix + "_mul", a1, a2, x0),
      // if (F.eq(alfa, F.negone)) {
      c.if(
        c.call(prefix + "_eq", alpha, n1),
        [
          // x = F.mul(x0, [F.F.zero, F.F.one]);
          ...c.call(f1mPrefix + "_zero", n1a),
          ...c.call(f1mPrefix + "_one", n1b),
          ...c.call(prefix + "_mul", n1, x0, c.getLocal("pr"))
        ],
        [
          // const b = F.pow(F.add(F.one, alfa), F.sqrt_e12);
          ...c.call(prefix + "_one", b),
          ...c.call(prefix + "_add", b, alpha, b),
          ...c.call(prefix + "_exp", b, e12, c.i32_const(f1n8), b),
          // x = F.mul(b, x0);
          ...c.call(prefix + "_mul", b, x0, c.getLocal("pr"))
        ]
      )
    );
  }
  function buildIsSquare() {
    const f = module.addFunction(prefix + "_isSquare");
    f.addParam("a", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const e34 = c.i32_const(module.alloc(utils$4.bigInt2BytesLE((BigInt(q || 0) - 3n) / 4n, f1n8)));
    const a2 = c.getLocal("a");
    const a1 = c.i32_const(module.alloc(f1n8 * 2));
    const alpha = c.i32_const(module.alloc(f1n8 * 2));
    const a0 = c.i32_const(module.alloc(f1n8 * 2));
    const pn1 = module.alloc(f1n8 * 2);
    const n1 = c.i32_const(pn1);
    f.addCode(
      c.call(prefix + "_one", n1),
      c.call(prefix + "_neg", n1, n1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_exp", a2, e34, c.i32_const(f1n8), a1),
      // const a1 = F.pow(a, F.sqrt_e34);
      c.call(prefix + "_square", a1, alpha),
      c.call(prefix + "_mul", a2, alpha, alpha),
      // const a0 = F.mul(F.frobenius(1, alfa), alfa);
      c.call(prefix + "_conjugate", alpha, a0),
      c.call(prefix + "_mul", a0, alpha, a0),
      // if (F.eq(a0, F.negone)) return null;
      c.if(
        c.call(
          prefix + "_eq",
          a0,
          n1
        ),
        c.ret(c.i32_const(0))
      ),
      c.ret(c.i32_const(1))
    );
  }
  buildIsZero();
  buildIsOne();
  buildZero();
  buildOne();
  buildCopy();
  buildMul();
  buildMul1();
  buildSquare();
  buildAdd();
  buildSub();
  buildNeg();
  buildConjugate();
  buildToMontgomery();
  buildFromMontgomery();
  buildEq();
  buildInverse();
  buildTimesScalar2();
  buildSign();
  buildIsNegative();
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_isOne");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_mul1");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_sign");
  module.exportFunction(prefix + "_conjugate");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_inverse");
  buildBatchInverse$1(module, prefix);
  buildExp$1(
    module,
    prefix + "_exp",
    f1n8 * 2,
    prefix + "_mul",
    prefix + "_square",
    prefix + "_copy",
    prefix + "_one"
  );
  buildSqrt2();
  buildIsSquare();
  module.exportFunction(prefix + "_exp");
  module.exportFunction(prefix + "_timesScalar");
  module.exportFunction(prefix + "_batchInverse");
  module.exportFunction(prefix + "_sqrt");
  module.exportFunction(prefix + "_isSquare");
  module.exportFunction(prefix + "_isNegative");
  return prefix;
};
var buildExp = build_timesscalar;
var buildBatchInverse = build_batchinverse;
var build_f3m = function buildF3m(module, mulNonResidueFn, prefix, f1mPrefix) {
  if (module.modules[prefix]) return prefix;
  const f1n8 = module.modules[f1mPrefix].n64 * 8;
  module.modules[prefix] = {
    n64: module.modules[f1mPrefix].n64 * 3
  };
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const y2 = c.i32_add(c.getLocal("y"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_add", x0, y0, r0),
      c.call(f1mPrefix + "_add", x1, y1, r1),
      c.call(f1mPrefix + "_add", x2, y2, r2)
    );
  }
  function buildTimesScalar2() {
    const f = module.addFunction(prefix + "_timesScalar");
    f.addParam("x", "i32");
    f.addParam("scalar", "i32");
    f.addParam("scalarLen", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_timesScalar", x0, c.getLocal("scalar"), c.getLocal("scalarLen"), r0),
      c.call(f1mPrefix + "_timesScalar", x1, c.getLocal("scalar"), c.getLocal("scalarLen"), r1),
      c.call(f1mPrefix + "_timesScalar", x2, c.getLocal("scalar"), c.getLocal("scalarLen"), r2)
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const y2 = c.i32_add(c.getLocal("y"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_sub", x0, y0, r0),
      c.call(f1mPrefix + "_sub", x1, y1, r1),
      c.call(f1mPrefix + "_sub", x2, y2, r2)
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_neg", x0, r0),
      c.call(f1mPrefix + "_neg", x1, r1),
      c.call(f1mPrefix + "_neg", x2, r2)
    );
  }
  function buildIsNegative() {
    const f = module.addFunction(prefix + "_isNegative");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.if(
        c.call(f1mPrefix + "_isZero", x2),
        c.if(
          c.call(f1mPrefix + "_isZero", x1),
          c.ret(c.call(f1mPrefix + "_isNegative", x0)),
          c.ret(c.call(f1mPrefix + "_isNegative", x1))
        )
      ),
      c.ret(c.call(f1mPrefix + "_isNegative", x2))
    );
  }
  function buildMul() {
    const f = module.addFunction(prefix + "_mul");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.addParam("r", "i32");
    const cd = f.getCodeBuilder();
    const a2 = cd.getLocal("x");
    const b = cd.i32_add(cd.getLocal("x"), cd.i32_const(f1n8));
    const c = cd.i32_add(cd.getLocal("x"), cd.i32_const(2 * f1n8));
    const A = cd.getLocal("y");
    const B = cd.i32_add(cd.getLocal("y"), cd.i32_const(f1n8));
    const C = cd.i32_add(cd.getLocal("y"), cd.i32_const(2 * f1n8));
    const r0 = cd.getLocal("r");
    const r1 = cd.i32_add(cd.getLocal("r"), cd.i32_const(f1n8));
    const r2 = cd.i32_add(cd.getLocal("r"), cd.i32_const(2 * f1n8));
    const aA = cd.i32_const(module.alloc(f1n8));
    const bB = cd.i32_const(module.alloc(f1n8));
    const cC = cd.i32_const(module.alloc(f1n8));
    const a_b = cd.i32_const(module.alloc(f1n8));
    const A_B = cd.i32_const(module.alloc(f1n8));
    const a_c = cd.i32_const(module.alloc(f1n8));
    const A_C = cd.i32_const(module.alloc(f1n8));
    const b_c = cd.i32_const(module.alloc(f1n8));
    const B_C = cd.i32_const(module.alloc(f1n8));
    const aA_bB = cd.i32_const(module.alloc(f1n8));
    const aA_cC = cd.i32_const(module.alloc(f1n8));
    const bB_cC = cd.i32_const(module.alloc(f1n8));
    const AUX = cd.i32_const(module.alloc(f1n8));
    f.addCode(
      cd.call(f1mPrefix + "_mul", a2, A, aA),
      cd.call(f1mPrefix + "_mul", b, B, bB),
      cd.call(f1mPrefix + "_mul", c, C, cC),
      cd.call(f1mPrefix + "_add", a2, b, a_b),
      cd.call(f1mPrefix + "_add", A, B, A_B),
      cd.call(f1mPrefix + "_add", a2, c, a_c),
      cd.call(f1mPrefix + "_add", A, C, A_C),
      cd.call(f1mPrefix + "_add", b, c, b_c),
      cd.call(f1mPrefix + "_add", B, C, B_C),
      cd.call(f1mPrefix + "_add", aA, bB, aA_bB),
      cd.call(f1mPrefix + "_add", aA, cC, aA_cC),
      cd.call(f1mPrefix + "_add", bB, cC, bB_cC),
      cd.call(f1mPrefix + "_mul", b_c, B_C, r0),
      cd.call(f1mPrefix + "_sub", r0, bB_cC, r0),
      cd.call(mulNonResidueFn, r0, r0),
      cd.call(f1mPrefix + "_add", aA, r0, r0),
      cd.call(f1mPrefix + "_mul", a_b, A_B, r1),
      cd.call(f1mPrefix + "_sub", r1, aA_bB, r1),
      cd.call(mulNonResidueFn, cC, AUX),
      cd.call(f1mPrefix + "_add", r1, AUX, r1),
      cd.call(f1mPrefix + "_mul", a_c, A_C, r2),
      cd.call(f1mPrefix + "_sub", r2, aA_cC, r2),
      cd.call(f1mPrefix + "_add", r2, bB, r2)
    );
  }
  function buildSquare() {
    const f = module.addFunction(prefix + "_square");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const A = c.getLocal("x");
    const B = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const C = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    const s0 = c.i32_const(module.alloc(f1n8));
    const ab = c.i32_const(module.alloc(f1n8));
    const s1 = c.i32_const(module.alloc(f1n8));
    const s2 = c.i32_const(module.alloc(f1n8));
    const bc = c.i32_const(module.alloc(f1n8));
    const s3 = c.i32_const(module.alloc(f1n8));
    const s4 = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_square", A, s0),
      c.call(f1mPrefix + "_mul", A, B, ab),
      c.call(f1mPrefix + "_add", ab, ab, s1),
      c.call(f1mPrefix + "_sub", A, B, s2),
      c.call(f1mPrefix + "_add", s2, C, s2),
      c.call(f1mPrefix + "_square", s2, s2),
      c.call(f1mPrefix + "_mul", B, C, bc),
      c.call(f1mPrefix + "_add", bc, bc, s3),
      c.call(f1mPrefix + "_square", C, s4),
      c.call(mulNonResidueFn, s3, r0),
      c.call(f1mPrefix + "_add", s0, r0, r0),
      c.call(mulNonResidueFn, s4, r1),
      c.call(f1mPrefix + "_add", s1, r1, r1),
      c.call(f1mPrefix + "_add", s0, s4, r2),
      c.call(f1mPrefix + "_sub", s3, r2, r2),
      c.call(f1mPrefix + "_add", s2, r2, r2),
      c.call(f1mPrefix + "_add", s1, r2, r2)
    );
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_toMontgomery", x0, r0),
      c.call(f1mPrefix + "_toMontgomery", x1, r1),
      c.call(f1mPrefix + "_toMontgomery", x2, r2)
    );
  }
  function buildFromMontgomery() {
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_fromMontgomery", x0, r0),
      c.call(f1mPrefix + "_fromMontgomery", x1, r1),
      c.call(f1mPrefix + "_fromMontgomery", x2, r2)
    );
  }
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, r0),
      c.call(f1mPrefix + "_copy", x1, r1),
      c.call(f1mPrefix + "_copy", x2, r2)
    );
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_zero", x0),
      c.call(f1mPrefix + "_zero", x1),
      c.call(f1mPrefix + "_zero", x2)
    );
  }
  function buildOne() {
    const f = module.addFunction(prefix + "_one");
    f.addParam("x", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.call(f1mPrefix + "_one", x0),
      c.call(f1mPrefix + "_zero", x1),
      c.call(f1mPrefix + "_zero", x2)
    );
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("x", "i32");
    f.addParam("y", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const y0 = c.getLocal("y");
    const y1 = c.i32_add(c.getLocal("y"), c.i32_const(f1n8));
    const y2 = c.i32_add(c.getLocal("y"), c.i32_const(2 * f1n8));
    f.addCode(
      c.i32_and(
        c.i32_and(
          c.call(f1mPrefix + "_eq", x0, y0),
          c.call(f1mPrefix + "_eq", x1, y1)
        ),
        c.call(f1mPrefix + "_eq", x2, y2)
      )
    );
  }
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.i32_and(
        c.i32_and(
          c.call(f1mPrefix + "_isZero", x0),
          c.call(f1mPrefix + "_isZero", x1)
        ),
        c.call(f1mPrefix + "_isZero", x2)
      )
    );
  }
  function buildInverse() {
    const f = module.addFunction(prefix + "_inverse");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    const r0 = c.getLocal("r");
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(f1n8));
    const r2 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f1n8));
    const t0 = c.i32_const(module.alloc(f1n8));
    const t1 = c.i32_const(module.alloc(f1n8));
    const t2 = c.i32_const(module.alloc(f1n8));
    const t3 = c.i32_const(module.alloc(f1n8));
    const t4 = c.i32_const(module.alloc(f1n8));
    const t5 = c.i32_const(module.alloc(f1n8));
    const c0 = c.i32_const(module.alloc(f1n8));
    const c1 = c.i32_const(module.alloc(f1n8));
    const c2 = c.i32_const(module.alloc(f1n8));
    const t6 = c.i32_const(module.alloc(f1n8));
    const AUX = c.i32_const(module.alloc(f1n8));
    f.addCode(
      c.call(f1mPrefix + "_square", x0, t0),
      c.call(f1mPrefix + "_square", x1, t1),
      c.call(f1mPrefix + "_square", x2, t2),
      c.call(f1mPrefix + "_mul", x0, x1, t3),
      c.call(f1mPrefix + "_mul", x0, x2, t4),
      c.call(f1mPrefix + "_mul", x1, x2, t5),
      c.call(mulNonResidueFn, t5, c0),
      c.call(f1mPrefix + "_sub", t0, c0, c0),
      c.call(mulNonResidueFn, t2, c1),
      c.call(f1mPrefix + "_sub", c1, t3, c1),
      c.call(f1mPrefix + "_sub", t1, t4, c2),
      c.call(f1mPrefix + "_mul", x2, c1, t6),
      c.call(f1mPrefix + "_mul", x1, c2, AUX),
      c.call(f1mPrefix + "_add", t6, AUX, t6),
      c.call(mulNonResidueFn, t6, t6),
      c.call(f1mPrefix + "_mul", x0, c0, AUX),
      c.call(f1mPrefix + "_add", AUX, t6, t6),
      c.call(f1mPrefix + "_inverse", t6, t6),
      c.call(f1mPrefix + "_mul", t6, c0, r0),
      c.call(f1mPrefix + "_mul", t6, c1, r1),
      c.call(f1mPrefix + "_mul", t6, c2, r2)
    );
  }
  function buildSign() {
    const f = module.addFunction(prefix + "_sign");
    f.addParam("x", "i32");
    f.addLocal("s", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f1n8));
    f.addCode(
      c.setLocal("s", c.call(f1mPrefix + "_sign", x2)),
      c.if(
        c.getLocal("s"),
        c.ret(c.getLocal("s"))
      ),
      c.setLocal("s", c.call(f1mPrefix + "_sign", x1)),
      c.if(
        c.getLocal("s"),
        c.ret(c.getLocal("s"))
      ),
      c.ret(c.call(f1mPrefix + "_sign", x0))
    );
  }
  function buildIsOne() {
    const f = module.addFunction(prefix + "_isOne");
    f.addParam("x", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(f1n8 * 2));
    f.addCode(
      c.ret(
        c.i32_and(
          c.i32_and(
            c.call(f1mPrefix + "_isOne", x0),
            c.call(f1mPrefix + "_isZero", x1)
          ),
          c.call(f1mPrefix + "_isZero", x2)
        )
      )
    );
  }
  buildIsZero();
  buildIsOne();
  buildZero();
  buildOne();
  buildCopy();
  buildMul();
  buildSquare();
  buildAdd();
  buildSub();
  buildNeg();
  buildSign();
  buildToMontgomery();
  buildFromMontgomery();
  buildEq();
  buildInverse();
  buildTimesScalar2();
  buildIsNegative();
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_isOne");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_one");
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_mul");
  module.exportFunction(prefix + "_square");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_sign");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_inverse");
  buildBatchInverse(module, prefix);
  buildExp(
    module,
    prefix + "_exp",
    f1n8 * 3,
    prefix + "_mul",
    prefix + "_square",
    prefix + "_copy",
    prefix + "_one"
  );
  module.exportFunction(prefix + "_exp");
  module.exportFunction(prefix + "_timesScalar");
  module.exportFunction(prefix + "_batchInverse");
  module.exportFunction(prefix + "_isNegative");
  return prefix;
};
var build_timesscalarnaf = function buildTimesScalarNAF(module, fnName, elementLen, opAB, opAA, opAmB, opCopy, opInit) {
  const f = module.addFunction(fnName);
  f.addParam("base", "i32");
  f.addParam("scalar", "i32");
  f.addParam("scalarLength", "i32");
  f.addParam("r", "i32");
  f.addLocal("old0", "i32");
  f.addLocal("nbits", "i32");
  f.addLocal("i", "i32");
  f.addLocal("last", "i32");
  f.addLocal("cur", "i32");
  f.addLocal("carry", "i32");
  f.addLocal("p", "i32");
  const c = f.getCodeBuilder();
  const aux = c.i32_const(module.alloc(elementLen));
  function getBit(IDX) {
    return c.i32_and(
      c.i32_shr_u(
        c.i32_load(
          c.i32_add(
            c.getLocal("scalar"),
            c.i32_and(
              c.i32_shr_u(
                IDX,
                c.i32_const(3)
              ),
              c.i32_const(4294967292)
            )
          )
        ),
        c.i32_and(
          IDX,
          c.i32_const(31)
        )
      ),
      c.i32_const(1)
    );
  }
  function pushBit(b) {
    return [
      ...c.i32_store8(
        c.getLocal("p"),
        c.i32_const(b)
      ),
      ...c.setLocal(
        "p",
        c.i32_add(
          c.getLocal("p"),
          c.i32_const(1)
        )
      )
    ];
  }
  f.addCode(
    c.if(
      c.i32_eqz(c.getLocal("scalarLength")),
      [
        ...c.call(opInit, c.getLocal("r")),
        ...c.ret([])
      ]
    ),
    c.setLocal("nbits", c.i32_shl(c.getLocal("scalarLength"), c.i32_const(3))),
    c.setLocal("old0", c.i32_load(c.i32_const(0))),
    c.setLocal("p", c.getLocal("old0")),
    c.i32_store(
      c.i32_const(0),
      c.i32_and(
        c.i32_add(
          c.i32_add(
            c.getLocal("old0"),
            c.i32_const(32)
          ),
          c.getLocal("nbits")
        ),
        c.i32_const(4294967288)
      )
    ),
    c.setLocal("i", c.i32_const(1)),
    c.setLocal("last", getBit(c.i32_const(0))),
    c.setLocal("carry", c.i32_const(0)),
    c.block(c.loop(
      c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("nbits"))),
      c.setLocal("cur", getBit(c.getLocal("i"))),
      c.if(
        c.getLocal("last"),
        c.if(
          c.getLocal("cur"),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(1)
            ],
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(255)
            ]
          ),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(255)
            ],
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(1)
            ]
          )
        ),
        c.if(
          c.getLocal("cur"),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(1)),
              ...pushBit(0)
            ],
            [
              ...c.setLocal("last", c.i32_const(1)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(0)
            ]
          ),
          c.if(
            c.getLocal("carry"),
            [
              ...c.setLocal("last", c.i32_const(1)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(0)
            ],
            [
              ...c.setLocal("last", c.i32_const(0)),
              ...c.setLocal("carry", c.i32_const(0)),
              ...pushBit(0)
            ]
          )
        )
      ),
      c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    )),
    c.if(
      c.getLocal("last"),
      c.if(
        c.getLocal("carry"),
        [
          ...pushBit(255),
          ...pushBit(0),
          ...pushBit(1)
        ],
        [
          ...pushBit(1)
        ]
      ),
      c.if(
        c.getLocal("carry"),
        [
          ...pushBit(0),
          ...pushBit(1)
        ]
      )
    ),
    c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
    // p already points to the last bit
    c.call(opCopy, c.getLocal("base"), aux),
    c.call(opInit, c.getLocal("r")),
    c.block(c.loop(
      c.call(opAA, c.getLocal("r"), c.getLocal("r")),
      c.setLocal(
        "cur",
        c.i32_load8_u(
          c.getLocal("p")
        )
      ),
      c.if(
        c.getLocal("cur"),
        c.if(
          c.i32_eq(c.getLocal("cur"), c.i32_const(1)),
          c.call(opAB, c.getLocal("r"), aux, c.getLocal("r")),
          c.call(opAmB, c.getLocal("r"), aux, c.getLocal("r"))
        )
      ),
      c.br_if(1, c.i32_eq(c.getLocal("old0"), c.getLocal("p"))),
      c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
      c.br(0)
    )),
    c.i32_store(c.i32_const(0), c.getLocal("old0"))
  );
};
var build_multiexp = function buildMultiexp(module, prefix, fnName, opAdd, n8b) {
  const n64g = module.modules[prefix].n64;
  const n8g = n64g * 8;
  function buildGetChunk() {
    const f = module.addFunction(fnName + "_getChunk");
    f.addParam("pScalar", "i32");
    f.addParam("scalarSize", "i32");
    f.addParam("startBit", "i32");
    f.addParam("chunkSize", "i32");
    f.addLocal("bitsToEnd", "i32");
    f.addLocal("mask", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "bitsToEnd",
        c.i32_sub(
          c.i32_mul(
            c.getLocal("scalarSize"),
            c.i32_const(8)
          ),
          c.getLocal("startBit")
        )
      ),
      c.if(
        c.i32_gt_s(
          c.getLocal("chunkSize"),
          c.getLocal("bitsToEnd")
        ),
        c.setLocal(
          "mask",
          c.i32_sub(
            c.i32_shl(
              c.i32_const(1),
              c.getLocal("bitsToEnd")
            ),
            c.i32_const(1)
          )
        ),
        c.setLocal(
          "mask",
          c.i32_sub(
            c.i32_shl(
              c.i32_const(1),
              c.getLocal("chunkSize")
            ),
            c.i32_const(1)
          )
        )
      ),
      c.i32_and(
        c.i32_shr_u(
          c.i32_load(
            c.i32_add(
              c.getLocal("pScalar"),
              c.i32_shr_u(
                c.getLocal("startBit"),
                c.i32_const(3)
              )
            ),
            0,
            // offset
            0
            // align to byte.
          ),
          c.i32_and(
            c.getLocal("startBit"),
            c.i32_const(7)
          )
        ),
        c.getLocal("mask")
      )
    );
  }
  function buildMutiexpChunk() {
    const f = module.addFunction(fnName + "_chunk");
    f.addParam("pBases", "i32");
    f.addParam("pScalars", "i32");
    f.addParam("scalarSize", "i32");
    f.addParam("n", "i32");
    f.addParam("startBit", "i32");
    f.addParam("chunkSize", "i32");
    f.addParam("pr", "i32");
    f.addLocal("nChunks", "i32");
    f.addLocal("itScalar", "i32");
    f.addLocal("endScalar", "i32");
    f.addLocal("itBase", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("nTable", "i32");
    f.addLocal("pTable", "i32");
    f.addLocal("idx", "i32");
    f.addLocal("pIdxTable", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.i32_eqz(c.getLocal("n")),
        [
          ...c.call(prefix + "_zero", c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      // Allocate memory
      c.setLocal(
        "nTable",
        c.i32_shl(
          c.i32_const(1),
          c.getLocal("chunkSize")
        )
      ),
      c.setLocal("pTable", c.i32_load(c.i32_const(0))),
      c.i32_store(
        c.i32_const(0),
        c.i32_add(
          c.getLocal("pTable"),
          c.i32_mul(
            c.getLocal("nTable"),
            c.i32_const(n8g)
          )
        )
      ),
      // Reset Table
      c.setLocal("j", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("j"),
            c.getLocal("nTable")
          )
        ),
        c.call(
          prefix + "_zero",
          c.i32_add(
            c.getLocal("pTable"),
            c.i32_mul(
              c.getLocal("j"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
        c.br(0)
      )),
      // Distribute elements
      c.setLocal("itBase", c.getLocal("pBases")),
      c.setLocal("itScalar", c.getLocal("pScalars")),
      c.setLocal(
        "endScalar",
        c.i32_add(
          c.getLocal("pScalars"),
          c.i32_mul(
            c.getLocal("n"),
            c.getLocal("scalarSize")
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("itScalar"),
            c.getLocal("endScalar")
          )
        ),
        c.setLocal(
          "idx",
          c.call(
            fnName + "_getChunk",
            c.getLocal("itScalar"),
            c.getLocal("scalarSize"),
            c.getLocal("startBit"),
            c.getLocal("chunkSize")
          )
        ),
        c.if(
          c.getLocal("idx"),
          [
            ...c.setLocal(
              "pIdxTable",
              c.i32_add(
                c.getLocal("pTable"),
                c.i32_mul(
                  c.i32_sub(
                    c.getLocal("idx"),
                    c.i32_const(1)
                  ),
                  c.i32_const(n8g)
                )
              )
            ),
            ...c.call(
              opAdd,
              c.getLocal("pIdxTable"),
              c.getLocal("itBase"),
              c.getLocal("pIdxTable")
            )
          ]
        ),
        c.setLocal("itScalar", c.i32_add(c.getLocal("itScalar"), c.getLocal("scalarSize"))),
        c.setLocal("itBase", c.i32_add(c.getLocal("itBase"), c.i32_const(n8b))),
        c.br(0)
      )),
      c.call(fnName + "_reduceTable", c.getLocal("pTable"), c.getLocal("chunkSize")),
      c.call(
        prefix + "_copy",
        c.getLocal("pTable"),
        c.getLocal("pr")
      ),
      c.i32_store(
        c.i32_const(0),
        c.getLocal("pTable")
      )
    );
  }
  function buildMultiexp3() {
    const f = module.addFunction(fnName);
    f.addParam("pBases", "i32");
    f.addParam("pScalars", "i32");
    f.addParam("scalarSize", "i32");
    f.addParam("n", "i32");
    f.addParam("pr", "i32");
    f.addLocal("chunkSize", "i32");
    f.addLocal("nChunks", "i32");
    f.addLocal("itScalar", "i32");
    f.addLocal("endScalar", "i32");
    f.addLocal("itBase", "i32");
    f.addLocal("itBit", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("nTable", "i32");
    f.addLocal("pTable", "i32");
    f.addLocal("idx", "i32");
    f.addLocal("pIdxTable", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8g));
    const pTSizes2 = module.alloc([
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      17,
      16,
      16,
      15,
      14,
      13,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      1,
      1,
      1
    ]);
    f.addCode(
      c.call(prefix + "_zero", c.getLocal("pr")),
      c.if(
        c.i32_eqz(c.getLocal("n")),
        c.ret([])
      ),
      c.setLocal("chunkSize", c.i32_load8_u(c.i32_clz(c.getLocal("n")), pTSizes2)),
      c.setLocal(
        "nChunks",
        c.i32_add(
          c.i32_div_u(
            c.i32_sub(
              c.i32_shl(
                c.getLocal("scalarSize"),
                c.i32_const(3)
              ),
              c.i32_const(1)
            ),
            c.getLocal("chunkSize")
          ),
          c.i32_const(1)
        )
      ),
      // Allocate memory
      c.setLocal(
        "itBit",
        c.i32_mul(
          c.i32_sub(
            c.getLocal("nChunks"),
            c.i32_const(1)
          ),
          c.getLocal("chunkSize")
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_lt_s(
            c.getLocal("itBit"),
            c.i32_const(0)
          )
        ),
        // Double nChunk times
        c.if(
          c.i32_eqz(c.call(prefix + "_isZero", c.getLocal("pr"))),
          [
            ...c.setLocal("j", c.i32_const(0)),
            ...c.block(c.loop(
              c.br_if(
                1,
                c.i32_eq(
                  c.getLocal("j"),
                  c.getLocal("chunkSize")
                )
              ),
              c.call(prefix + "_double", c.getLocal("pr"), c.getLocal("pr")),
              c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
              c.br(0)
            ))
          ]
        ),
        c.call(
          fnName + "_chunk",
          c.getLocal("pBases"),
          c.getLocal("pScalars"),
          c.getLocal("scalarSize"),
          c.getLocal("n"),
          c.getLocal("itBit"),
          c.getLocal("chunkSize"),
          aux
        ),
        c.call(
          prefix + "_add",
          c.getLocal("pr"),
          aux,
          c.getLocal("pr")
        ),
        c.setLocal("itBit", c.i32_sub(c.getLocal("itBit"), c.getLocal("chunkSize"))),
        c.br(0)
      ))
    );
  }
  function buildReduceTable() {
    const f = module.addFunction(fnName + "_reduceTable");
    f.addParam("pTable", "i32");
    f.addParam("p", "i32");
    f.addLocal("half", "i32");
    f.addLocal("it1", "i32");
    f.addLocal("it2", "i32");
    f.addLocal("pAcc", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.if(
        c.i32_eq(c.getLocal("p"), c.i32_const(1)),
        c.ret([])
      ),
      c.setLocal(
        "half",
        c.i32_shl(
          c.i32_const(1),
          c.i32_sub(
            c.getLocal("p"),
            c.i32_const(1)
          )
        )
      ),
      c.setLocal("it1", c.getLocal("pTable")),
      c.setLocal(
        "it2",
        c.i32_add(
          c.getLocal("pTable"),
          c.i32_mul(
            c.getLocal("half"),
            c.i32_const(n8g)
          )
        )
      ),
      c.setLocal(
        "pAcc",
        c.i32_sub(
          c.getLocal("it2"),
          c.i32_const(n8g)
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("it1"),
            c.getLocal("pAcc")
          )
        ),
        c.call(
          prefix + "_add",
          c.getLocal("it1"),
          c.getLocal("it2"),
          c.getLocal("it1")
        ),
        c.call(
          prefix + "_add",
          c.getLocal("pAcc"),
          c.getLocal("it2"),
          c.getLocal("pAcc")
        ),
        c.setLocal("it1", c.i32_add(c.getLocal("it1"), c.i32_const(n8g))),
        c.setLocal("it2", c.i32_add(c.getLocal("it2"), c.i32_const(n8g))),
        c.br(0)
      )),
      c.call(
        fnName + "_reduceTable",
        c.getLocal("pTable"),
        c.i32_sub(
          c.getLocal("p"),
          c.i32_const(1)
        )
      ),
      c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
      c.block(c.loop(
        c.br_if(1, c.i32_eqz(c.getLocal("p"))),
        c.call(prefix + "_double", c.getLocal("pAcc"), c.getLocal("pAcc")),
        c.setLocal("p", c.i32_sub(c.getLocal("p"), c.i32_const(1))),
        c.br(0)
      )),
      c.call(prefix + "_add", c.getLocal("pTable"), c.getLocal("pAcc"), c.getLocal("pTable"))
    );
  }
  buildGetChunk();
  buildReduceTable();
  buildMutiexpChunk();
  buildMultiexp3();
  module.exportFunction(fnName);
  module.exportFunction(fnName + "_chunk");
};
var buildTimesScalarNAF2 = build_timesscalarnaf;
var buildBatchConvertion = build_batchconvertion;
var buildMultiexp$1 = build_multiexp;
var build_curve_jacobian_a0 = function buildCurve(module, prefix, prefixField, pB) {
  const n64 = module.modules[prefixField].n64;
  const n8 = n64 * 8;
  if (module.modules[prefix]) return prefix;
  module.modules[prefix] = {
    n64: n64 * 3
  };
  function buildIsZero() {
    const f = module.addFunction(prefix + "_isZero");
    f.addParam("p1", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_isZero",
      c.i32_add(
        c.getLocal("p1"),
        c.i32_const(n8 * 2)
      )
    ));
  }
  function buildIsZeroAffine() {
    const f = module.addFunction(prefix + "_isZeroAffine");
    f.addParam("p1", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.i32_and(
        c.call(
          prefixField + "_isZero",
          c.getLocal("p1")
        ),
        c.call(
          prefixField + "_isZero",
          c.i32_add(
            c.getLocal("p1"),
            c.i32_const(n8)
          )
        )
      )
    );
  }
  function buildCopy() {
    const f = module.addFunction(prefix + "_copy");
    f.addParam("ps", "i32");
    f.addParam("pd", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64 * 3; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pd"),
          i * 8,
          c.i64_load(
            c.getLocal("ps"),
            i * 8
          )
        )
      );
    }
  }
  function buildCopyAffine() {
    const f = module.addFunction(prefix + "_copyAffine");
    f.addParam("ps", "i32");
    f.addParam("pd", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < n64 * 2; i++) {
      f.addCode(
        c.i64_store(
          c.getLocal("pd"),
          i * 8,
          c.i64_load(
            c.getLocal("ps"),
            i * 8
          )
        )
      );
    }
  }
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_zero",
      c.getLocal("pr")
    ));
    f.addCode(c.call(
      prefixField + "_one",
      c.i32_add(
        c.getLocal("pr"),
        c.i32_const(n8)
      )
    ));
    f.addCode(c.call(
      prefixField + "_zero",
      c.i32_add(
        c.getLocal("pr"),
        c.i32_const(n8 * 2)
      )
    ));
  }
  function buildZeroAffine() {
    const f = module.addFunction(prefix + "_zeroAffine");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_zero",
      c.getLocal("pr")
    ));
    f.addCode(c.call(
      prefixField + "_zero",
      c.i32_add(
        c.getLocal("pr"),
        c.i32_const(n8)
      )
    ));
  }
  function buildEq() {
    const f = module.addFunction(prefix + "_eq");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.setReturnType("i32");
    f.addLocal("z1", "i32");
    f.addLocal("z2", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    f.addCode(c.setLocal("z2", c.i32_add(c.getLocal("p2"), c.i32_const(n8 * 2))));
    const z2 = c.getLocal("z2");
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const Z2Z2 = c.i32_const(module.alloc(n8));
    const U1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const Z2_cubed = c.i32_const(module.alloc(n8));
    const S1 = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        c.ret(c.call(prefix + "_isZero", c.getLocal("p2")))
      ),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p2")),
        c.ret(c.i32_const(0))
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        c.ret(c.call(prefix + "_eqMixed", c.getLocal("p2"), c.getLocal("p1")))
      ),
      c.if(
        c.call(prefixField + "_isOne", z2),
        c.ret(c.call(prefix + "_eqMixed", c.getLocal("p1"), c.getLocal("p2")))
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_square", z2, Z2Z2),
      c.call(prefixField + "_mul", x1, Z2Z2, U1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", z2, Z2Z2, Z2_cubed),
      c.call(prefixField + "_mul", y1, Z2_cubed, S1),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", U1, U2),
        c.if(
          c.call(prefixField + "_eq", S1, S2),
          c.ret(c.i32_const(1))
        )
      ),
      c.ret(c.i32_const(0))
    );
  }
  function buildEqMixed() {
    const f = module.addFunction(prefix + "_eqMixed");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.setReturnType("i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        c.ret(c.call(prefix + "_isZeroAffine", c.getLocal("p2")))
      ),
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p2")),
        c.ret(c.i32_const(0))
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        c.ret(c.call(prefix + "_eqAffine", c.getLocal("p1"), c.getLocal("p2")))
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", x1, U2),
        c.if(
          c.call(prefixField + "_eq", y1, S2),
          c.ret(c.i32_const(1))
        )
      ),
      c.ret(c.i32_const(0))
    );
  }
  function buildDouble() {
    const f = module.addFunction(prefix + "_double");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const A = c.i32_const(module.alloc(n8));
    const B = c.i32_const(module.alloc(n8));
    const C = c.i32_const(module.alloc(n8));
    const D = c.i32_const(module.alloc(n8));
    const E = c.i32_const(module.alloc(n8));
    const F = c.i32_const(module.alloc(n8));
    const G = c.i32_const(module.alloc(n8));
    const eightC = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z),
        [
          ...c.ret(c.call(prefix + "_doubleAffine", c.getLocal("p1"), c.getLocal("pr"))),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_square", x, A),
      c.call(prefixField + "_square", y, B),
      c.call(prefixField + "_square", B, C),
      c.call(prefixField + "_add", x, B, D),
      c.call(prefixField + "_square", D, D),
      c.call(prefixField + "_sub", D, A, D),
      c.call(prefixField + "_sub", D, C, D),
      c.call(prefixField + "_add", D, D, D),
      c.call(prefixField + "_add", A, A, E),
      c.call(prefixField + "_add", E, A, E),
      c.call(prefixField + "_square", E, F),
      c.call(prefixField + "_mul", y, z, G),
      c.call(prefixField + "_add", D, D, x3),
      c.call(prefixField + "_sub", F, x3, x3),
      c.call(prefixField + "_add", C, C, eightC),
      c.call(prefixField + "_add", eightC, eightC, eightC),
      c.call(prefixField + "_add", eightC, eightC, eightC),
      c.call(prefixField + "_sub", D, x3, y3),
      c.call(prefixField + "_mul", y3, E, y3),
      c.call(prefixField + "_sub", y3, eightC, y3),
      c.call(prefixField + "_add", G, G, z3)
    );
  }
  function buildDoubleAffine() {
    const f = module.addFunction(prefix + "_doubleAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const XX = c.i32_const(module.alloc(n8));
    const YY = c.i32_const(module.alloc(n8));
    const YYYY = c.i32_const(module.alloc(n8));
    const S = c.i32_const(module.alloc(n8));
    const M = c.i32_const(module.alloc(n8));
    const eightYYYY = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p1")),
        [
          ...c.call(prefix + "_toJacobian", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      // XX = X1^2
      c.call(prefixField + "_square", x, XX),
      // YY = Y1^2
      c.call(prefixField + "_square", y, YY),
      // YYYY = YY^2
      c.call(prefixField + "_square", YY, YYYY),
      // S = 2*((X1+YY)^2-XX-YYYY)
      c.call(prefixField + "_add", x, YY, S),
      c.call(prefixField + "_square", S, S),
      c.call(prefixField + "_sub", S, XX, S),
      c.call(prefixField + "_sub", S, YYYY, S),
      c.call(prefixField + "_add", S, S, S),
      // M = 3*XX+a  (Hera a=0)
      c.call(prefixField + "_add", XX, XX, M),
      c.call(prefixField + "_add", M, XX, M),
      // Z3 = 2*Y1
      c.call(prefixField + "_add", y, y, z3),
      // T = M^2-2*S
      // X3 = T
      c.call(prefixField + "_square", M, x3),
      c.call(prefixField + "_sub", x3, S, x3),
      c.call(prefixField + "_sub", x3, S, x3),
      // Y3 = M*(S-T)-8*YYYY
      c.call(prefixField + "_add", YYYY, YYYY, eightYYYY),
      c.call(prefixField + "_add", eightYYYY, eightYYYY, eightYYYY),
      c.call(prefixField + "_add", eightYYYY, eightYYYY, eightYYYY),
      c.call(prefixField + "_sub", S, x3, y3),
      c.call(prefixField + "_mul", y3, M, y3),
      c.call(prefixField + "_sub", y3, eightYYYY, y3)
    );
  }
  function buildEqAffine() {
    const f = module.addFunction(prefix + "_eqAffine");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.setReturnType("i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.ret(c.i32_and(
        c.call(
          prefixField + "_eq",
          c.getLocal("p1"),
          c.getLocal("p2")
        ),
        c.call(
          prefixField + "_eq",
          c.i32_add(c.getLocal("p1"), c.i32_const(n8)),
          c.i32_add(c.getLocal("p2"), c.i32_const(n8))
        )
      ))
    );
  }
  function buildToMontgomery() {
    const f = module.addFunction(prefix + "_toMontgomery");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_toMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 3; i++) {
      f.addCode(c.call(
        prefixField + "_toMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildToMontgomeryAffine() {
    const f = module.addFunction(prefix + "_toMontgomeryAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_toMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 2; i++) {
      f.addCode(c.call(
        prefixField + "_toMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildFromMontgomery() {
    const f = module.addFunction(prefix + "_fromMontgomery");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_fromMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 3; i++) {
      f.addCode(c.call(
        prefixField + "_fromMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildFromMontgomeryAffine() {
    const f = module.addFunction(prefix + "_fromMontgomeryAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(c.call(
      prefixField + "_fromMontgomery",
      c.getLocal("p1"),
      c.getLocal("pr")
    ));
    for (let i = 1; i < 2; i++) {
      f.addCode(c.call(
        prefixField + "_fromMontgomery",
        c.i32_add(c.getLocal("p1"), c.i32_const(i * n8)),
        c.i32_add(c.getLocal("pr"), c.i32_const(i * n8))
      ));
    }
  }
  function buildAdd() {
    const f = module.addFunction(prefix + "_add");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    f.addLocal("z1", "i32");
    f.addLocal("z2", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    f.addCode(c.setLocal("z2", c.i32_add(c.getLocal("p2"), c.i32_const(n8 * 2))));
    const z2 = c.getLocal("z2");
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const Z2Z2 = c.i32_const(module.alloc(n8));
    const U1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const Z2_cubed = c.i32_const(module.alloc(n8));
    const S1 = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    const H = c.i32_const(module.alloc(n8));
    const S2_minus_S1 = c.i32_const(module.alloc(n8));
    const I = c.i32_const(module.alloc(n8));
    const J = c.i32_const(module.alloc(n8));
    const r2 = c.i32_const(module.alloc(n8));
    const r22 = c.i32_const(module.alloc(n8));
    const V = c.i32_const(module.alloc(n8));
    const V2 = c.i32_const(module.alloc(n8));
    const S1_J2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p2"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p2")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        [
          ...c.call(prefix + "_addMixed", x2, x1, x3),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z2),
        [
          ...c.call(prefix + "_addMixed", x1, x2, x3),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_square", z2, Z2Z2),
      c.call(prefixField + "_mul", x1, Z2Z2, U1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", z2, Z2Z2, Z2_cubed),
      c.call(prefixField + "_mul", y1, Z2_cubed, S1),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", U1, U2),
        c.if(
          c.call(prefixField + "_eq", S1, S2),
          [
            ...c.call(prefix + "_double", c.getLocal("p1"), c.getLocal("pr")),
            ...c.ret([])
          ]
        )
      ),
      c.call(prefixField + "_sub", U2, U1, H),
      c.call(prefixField + "_sub", S2, S1, S2_minus_S1),
      c.call(prefixField + "_add", H, H, I),
      c.call(prefixField + "_square", I, I),
      c.call(prefixField + "_mul", H, I, J),
      c.call(prefixField + "_add", S2_minus_S1, S2_minus_S1, r2),
      c.call(prefixField + "_mul", U1, I, V),
      c.call(prefixField + "_square", r2, r22),
      c.call(prefixField + "_add", V, V, V2),
      c.call(prefixField + "_sub", r22, J, x3),
      c.call(prefixField + "_sub", x3, V2, x3),
      c.call(prefixField + "_mul", S1, J, S1_J2),
      c.call(prefixField + "_add", S1_J2, S1_J2, S1_J2),
      c.call(prefixField + "_sub", V, x3, y3),
      c.call(prefixField + "_mul", y3, r2, y3),
      c.call(prefixField + "_sub", y3, S1_J2, y3),
      c.call(prefixField + "_add", z1, z2, z3),
      c.call(prefixField + "_square", z3, z3),
      c.call(prefixField + "_sub", z3, Z1Z1, z3),
      c.call(prefixField + "_sub", z3, Z2Z2, z3),
      c.call(prefixField + "_mul", z3, H, z3)
    );
  }
  function buildAddMixed() {
    const f = module.addFunction(prefix + "_addMixed");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const z1 = c.getLocal("z1");
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const Z1Z1 = c.i32_const(module.alloc(n8));
    const U2 = c.i32_const(module.alloc(n8));
    const Z1_cubed = c.i32_const(module.alloc(n8));
    const S2 = c.i32_const(module.alloc(n8));
    const H = c.i32_const(module.alloc(n8));
    const HH = c.i32_const(module.alloc(n8));
    const S2_minus_y1 = c.i32_const(module.alloc(n8));
    const I = c.i32_const(module.alloc(n8));
    const J = c.i32_const(module.alloc(n8));
    const r2 = c.i32_const(module.alloc(n8));
    const r22 = c.i32_const(module.alloc(n8));
    const V = c.i32_const(module.alloc(n8));
    const V2 = c.i32_const(module.alloc(n8));
    const y1_J2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copyAffine", c.getLocal("p2"), c.getLocal("pr")),
          ...c.call(prefixField + "_one", c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p2")),
        [
          ...c.call(prefix + "_copy", c.getLocal("p1"), c.getLocal("pr")),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_isOne", z1),
        [
          ...c.call(prefix + "_addAffine", x1, x2, x3),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_square", z1, Z1Z1),
      c.call(prefixField + "_mul", x2, Z1Z1, U2),
      c.call(prefixField + "_mul", z1, Z1Z1, Z1_cubed),
      c.call(prefixField + "_mul", y2, Z1_cubed, S2),
      c.if(
        c.call(prefixField + "_eq", x1, U2),
        c.if(
          c.call(prefixField + "_eq", y1, S2),
          [
            ...c.call(prefix + "_doubleAffine", c.getLocal("p2"), c.getLocal("pr")),
            ...c.ret([])
          ]
        )
      ),
      c.call(prefixField + "_sub", U2, x1, H),
      c.call(prefixField + "_sub", S2, y1, S2_minus_y1),
      c.call(prefixField + "_square", H, HH),
      c.call(prefixField + "_add", HH, HH, I),
      c.call(prefixField + "_add", I, I, I),
      c.call(prefixField + "_mul", H, I, J),
      c.call(prefixField + "_add", S2_minus_y1, S2_minus_y1, r2),
      c.call(prefixField + "_mul", x1, I, V),
      c.call(prefixField + "_square", r2, r22),
      c.call(prefixField + "_add", V, V, V2),
      c.call(prefixField + "_sub", r22, J, x3),
      c.call(prefixField + "_sub", x3, V2, x3),
      c.call(prefixField + "_mul", y1, J, y1_J2),
      c.call(prefixField + "_add", y1_J2, y1_J2, y1_J2),
      c.call(prefixField + "_sub", V, x3, y3),
      c.call(prefixField + "_mul", y3, r2, y3),
      c.call(prefixField + "_sub", y3, y1_J2, y3),
      c.call(prefixField + "_add", z1, H, z3),
      c.call(prefixField + "_square", z3, z3),
      c.call(prefixField + "_sub", z3, Z1Z1, z3),
      c.call(prefixField + "_sub", z3, HH, z3)
    );
  }
  function buildAddAffine() {
    const f = module.addFunction(prefix + "_addAffine");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    f.addLocal("z1", "i32");
    const c = f.getCodeBuilder();
    const x1 = c.getLocal("p1");
    const y1 = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    f.addCode(c.setLocal("z1", c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2))));
    const x2 = c.getLocal("p2");
    const y2 = c.i32_add(c.getLocal("p2"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const H = c.i32_const(module.alloc(n8));
    const HH = c.i32_const(module.alloc(n8));
    const y2_minus_y1 = c.i32_const(module.alloc(n8));
    const I = c.i32_const(module.alloc(n8));
    const J = c.i32_const(module.alloc(n8));
    const r2 = c.i32_const(module.alloc(n8));
    const r22 = c.i32_const(module.alloc(n8));
    const V = c.i32_const(module.alloc(n8));
    const V2 = c.i32_const(module.alloc(n8));
    const y1_J2 = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p1")),
        [
          ...c.call(prefix + "_copyAffine", c.getLocal("p2"), c.getLocal("pr")),
          ...c.call(prefixField + "_one", c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p2")),
        [
          ...c.call(prefix + "_copyAffine", c.getLocal("p1"), c.getLocal("pr")),
          ...c.call(prefixField + "_one", c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))),
          ...c.ret([])
        ]
      ),
      c.if(
        c.call(prefixField + "_eq", x1, x2),
        c.if(
          c.call(prefixField + "_eq", y1, y2),
          [
            ...c.call(prefix + "_doubleAffine", c.getLocal("p2"), c.getLocal("pr")),
            ...c.ret([])
          ]
        )
      ),
      c.call(prefixField + "_sub", x2, x1, H),
      c.call(prefixField + "_sub", y2, y1, y2_minus_y1),
      c.call(prefixField + "_square", H, HH),
      c.call(prefixField + "_add", HH, HH, I),
      c.call(prefixField + "_add", I, I, I),
      c.call(prefixField + "_mul", H, I, J),
      c.call(prefixField + "_add", y2_minus_y1, y2_minus_y1, r2),
      c.call(prefixField + "_mul", x1, I, V),
      c.call(prefixField + "_square", r2, r22),
      c.call(prefixField + "_add", V, V, V2),
      c.call(prefixField + "_sub", r22, J, x3),
      c.call(prefixField + "_sub", x3, V2, x3),
      c.call(prefixField + "_mul", y1, J, y1_J2),
      c.call(prefixField + "_add", y1_J2, y1_J2, y1_J2),
      c.call(prefixField + "_sub", V, x3, y3),
      c.call(prefixField + "_mul", y3, r2, y3),
      c.call(prefixField + "_sub", y3, y1_J2, y3),
      c.call(prefixField + "_add", H, H, z3)
    );
  }
  function buildNeg() {
    const f = module.addFunction(prefix + "_neg");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    f.addCode(
      c.call(prefixField + "_copy", x, x3),
      c.call(prefixField + "_neg", y, y3),
      c.call(prefixField + "_copy", z, z3)
    );
  }
  function buildNegAffine() {
    const f = module.addFunction(prefix + "_negAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    f.addCode(
      c.call(prefixField + "_copy", x, x3),
      c.call(prefixField + "_neg", y, y3)
    );
  }
  function buildSub() {
    const f = module.addFunction(prefix + "_sub");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8 * 3));
    f.addCode(
      c.call(prefix + "_neg", c.getLocal("p2"), AUX),
      c.call(prefix + "_add", c.getLocal("p1"), AUX, c.getLocal("pr"))
    );
  }
  function buildSubMixed() {
    const f = module.addFunction(prefix + "_subMixed");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8 * 3));
    f.addCode(
      c.call(prefix + "_negAffine", c.getLocal("p2"), AUX),
      c.call(prefix + "_addMixed", c.getLocal("p1"), AUX, c.getLocal("pr"))
    );
  }
  function buildSubAffine() {
    const f = module.addFunction(prefix + "_subAffine");
    f.addParam("p1", "i32");
    f.addParam("p2", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8 * 3));
    f.addCode(
      c.call(prefix + "_negAffine", c.getLocal("p2"), AUX),
      c.call(prefix + "_addAffine", c.getLocal("p1"), AUX, c.getLocal("pr"))
    );
  }
  function buildNormalize() {
    const f = module.addFunction(prefix + "_normalize");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    const Z_inv = c.i32_const(module.alloc(n8));
    const Z2_inv = c.i32_const(module.alloc(n8));
    const Z3_inv = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        c.call(prefix + "_zero", c.getLocal("pr")),
        [
          ...c.call(prefixField + "_inverse", z, Z_inv),
          ...c.call(prefixField + "_square", Z_inv, Z2_inv),
          ...c.call(prefixField + "_mul", Z_inv, Z2_inv, Z3_inv),
          ...c.call(prefixField + "_mul", x, Z2_inv, x3),
          ...c.call(prefixField + "_mul", y, Z3_inv, y3),
          ...c.call(prefixField + "_one", z3)
        ]
      )
    );
  }
  function buildToAffine() {
    const f = module.addFunction(prefix + "_toAffine");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(n8 * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const Z_inv = c.i32_const(module.alloc(n8));
    const Z2_inv = c.i32_const(module.alloc(n8));
    const Z3_inv = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZero", c.getLocal("p1")),
        [
          ...c.call(prefixField + "_zero", x3),
          ...c.call(prefixField + "_zero", y3)
        ],
        [
          ...c.call(prefixField + "_inverse", z, Z_inv),
          ...c.call(prefixField + "_square", Z_inv, Z2_inv),
          ...c.call(prefixField + "_mul", Z_inv, Z2_inv, Z3_inv),
          ...c.call(prefixField + "_mul", x, Z2_inv, x3),
          ...c.call(prefixField + "_mul", y, Z3_inv, y3)
        ]
      )
    );
  }
  function buildToJacobian() {
    const f = module.addFunction(prefix + "_toJacobian");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(n8));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("p1")),
        c.call(prefix + "_zero", c.getLocal("pr")),
        [
          ...c.call(prefixField + "_one", z3),
          ...c.call(prefixField + "_copy", y, y3),
          ...c.call(prefixField + "_copy", x, x3)
        ]
      )
    );
  }
  function buildBatchToAffine() {
    const f = module.addFunction(prefix + "_batchToAffine");
    f.addParam("pIn", "i32");
    f.addParam("n", "i32");
    f.addParam("pOut", "i32");
    f.addLocal("pAux", "i32");
    f.addLocal("itIn", "i32");
    f.addLocal("itAux", "i32");
    f.addLocal("itOut", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const tmp = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("pAux", c.i32_load(c.i32_const(0))),
      c.i32_store(
        c.i32_const(0),
        c.i32_add(
          c.getLocal("pAux"),
          c.i32_mul(c.getLocal("n"), c.i32_const(n8))
        )
      ),
      c.call(
        prefixField + "_batchInverse",
        c.i32_add(c.getLocal("pIn"), c.i32_const(n8 * 2)),
        c.i32_const(n8 * 3),
        c.getLocal("n"),
        c.getLocal("pAux"),
        c.i32_const(n8)
      ),
      c.setLocal("itIn", c.getLocal("pIn")),
      c.setLocal("itAux", c.getLocal("pAux")),
      c.setLocal("itOut", c.getLocal("pOut")),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
        c.if(
          c.call(prefixField + "_isZero", c.getLocal("itAux")),
          [
            ...c.call(prefixField + "_zero", c.getLocal("itOut")),
            ...c.call(prefixField + "_zero", c.i32_add(c.getLocal("itOut"), c.i32_const(n8)))
          ],
          [
            ...c.call(
              prefixField + "_mul",
              c.getLocal("itAux"),
              c.i32_add(c.getLocal("itIn"), c.i32_const(n8)),
              tmp
            ),
            ...c.call(
              prefixField + "_square",
              c.getLocal("itAux"),
              c.getLocal("itAux")
            ),
            ...c.call(
              prefixField + "_mul",
              c.getLocal("itAux"),
              c.getLocal("itIn"),
              c.getLocal("itOut")
            ),
            ...c.call(
              prefixField + "_mul",
              c.getLocal("itAux"),
              tmp,
              c.i32_add(c.getLocal("itOut"), c.i32_const(n8))
            )
          ]
        ),
        c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.i32_const(n8 * 3))),
        c.setLocal("itOut", c.i32_add(c.getLocal("itOut"), c.i32_const(n8 * 2))),
        c.setLocal("itAux", c.i32_add(c.getLocal("itAux"), c.i32_const(n8))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      )),
      c.i32_store(
        c.i32_const(0),
        c.getLocal("pAux")
      )
    );
  }
  function buildReverseBytes() {
    const f = module.addFunction(prefix + "__reverseBytes");
    f.addParam("pIn", "i32");
    f.addParam("n", "i32");
    f.addParam("pOut", "i32");
    f.addLocal("itOut", "i32");
    f.addLocal("itIn", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "itOut",
        c.i32_sub(
          c.i32_add(
            c.getLocal("pOut"),
            c.getLocal("n")
          ),
          c.i32_const(1)
        )
      ),
      c.setLocal(
        "itIn",
        c.getLocal("pIn")
      ),
      c.block(c.loop(
        c.br_if(1, c.i32_lt_s(c.getLocal("itOut"), c.getLocal("pOut"))),
        c.i32_store8(
          c.getLocal("itOut"),
          c.i32_load8_u(c.getLocal("itIn"))
        ),
        c.setLocal("itOut", c.i32_sub(c.getLocal("itOut"), c.i32_const(1))),
        c.setLocal("itIn", c.i32_add(c.getLocal("itIn"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildLEMtoC() {
    const f = module.addFunction(prefix + "_LEMtoC");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    const c = f.getCodeBuilder();
    const tmp = c.i32_const(module.alloc(n8));
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("pIn")),
        [
          ...c.call(prefixField + "_zero", c.getLocal("pOut")),
          ...c.i32_store8(
            c.getLocal("pOut"),
            c.i32_const(64)
          ),
          ...c.ret([])
        ]
      ),
      c.call(prefixField + "_fromMontgomery", c.getLocal("pIn"), tmp),
      c.call(prefix + "__reverseBytes", tmp, c.i32_const(n8), c.getLocal("pOut")),
      c.if(
        c.i32_eq(
          c.call(prefixField + "_sign", c.i32_add(c.getLocal("pIn"), c.i32_const(n8))),
          c.i32_const(-1)
        ),
        c.i32_store8(
          c.getLocal("pOut"),
          c.i32_or(
            c.i32_load8_u(c.getLocal("pOut")),
            c.i32_const(128)
          )
        )
      )
    );
  }
  function buildLEMtoU() {
    const f = module.addFunction(prefix + "_LEMtoU");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    const c = f.getCodeBuilder();
    const pTmp = module.alloc(n8 * 2);
    const tmp = c.i32_const(pTmp);
    const tmpX = c.i32_const(pTmp);
    const tmpY = c.i32_const(pTmp + n8);
    f.addCode(
      c.if(
        c.call(prefix + "_isZeroAffine", c.getLocal("pIn")),
        [
          ...c.call(prefix + "_zeroAffine", c.getLocal("pOut")),
          ...c.ret([])
        ]
      ),
      c.call(prefix + "_fromMontgomeryAffine", c.getLocal("pIn"), tmp),
      c.call(prefix + "__reverseBytes", tmpX, c.i32_const(n8), c.getLocal("pOut")),
      c.call(prefix + "__reverseBytes", tmpY, c.i32_const(n8), c.i32_add(c.getLocal("pOut"), c.i32_const(n8)))
    );
  }
  function buildUtoLEM() {
    const f = module.addFunction(prefix + "_UtoLEM");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    const c = f.getCodeBuilder();
    const pTmp = module.alloc(n8 * 2);
    const tmp = c.i32_const(pTmp);
    const tmpX = c.i32_const(pTmp);
    const tmpY = c.i32_const(pTmp + n8);
    f.addCode(
      c.if(
        c.i32_and(c.i32_load8_u(c.getLocal("pIn")), c.i32_const(64)),
        [
          ...c.call(prefix + "_zeroAffine", c.getLocal("pOut")),
          ...c.ret([])
        ]
      ),
      c.call(prefix + "__reverseBytes", c.getLocal("pIn"), c.i32_const(n8), tmpX),
      c.call(prefix + "__reverseBytes", c.i32_add(c.getLocal("pIn"), c.i32_const(n8)), c.i32_const(n8), tmpY),
      c.call(prefix + "_toMontgomeryAffine", tmp, c.getLocal("pOut"))
    );
  }
  function buildCtoLEM() {
    const f = module.addFunction(prefix + "_CtoLEM");
    f.addParam("pIn", "i32");
    f.addParam("pOut", "i32");
    f.addLocal("firstByte", "i32");
    f.addLocal("greatest", "i32");
    const c = f.getCodeBuilder();
    const pTmp = module.alloc(n8 * 2);
    const tmpX = c.i32_const(pTmp);
    const tmpY = c.i32_const(pTmp + n8);
    f.addCode(
      c.setLocal("firstByte", c.i32_load8_u(c.getLocal("pIn"))),
      c.if(
        c.i32_and(
          c.getLocal("firstByte"),
          c.i32_const(64)
        ),
        [
          ...c.call(prefix + "_zeroAffine", c.getLocal("pOut")),
          ...c.ret([])
        ]
      ),
      c.setLocal(
        "greatest",
        c.i32_and(
          c.getLocal("firstByte"),
          c.i32_const(128)
        )
      ),
      c.call(prefixField + "_copy", c.getLocal("pIn"), tmpY),
      c.i32_store8(tmpY, c.i32_and(c.getLocal("firstByte"), c.i32_const(63))),
      c.call(prefix + "__reverseBytes", tmpY, c.i32_const(n8), tmpX),
      c.call(prefixField + "_toMontgomery", tmpX, c.getLocal("pOut")),
      c.call(prefixField + "_square", c.getLocal("pOut"), tmpY),
      c.call(prefixField + "_mul", c.getLocal("pOut"), tmpY, tmpY),
      c.call(prefixField + "_add", tmpY, c.i32_const(pB), tmpY),
      c.call(prefixField + "_sqrt", tmpY, tmpY),
      c.call(prefixField + "_neg", tmpY, tmpX),
      c.if(
        c.i32_eq(
          c.call(prefixField + "_sign", tmpY),
          c.i32_const(-1)
        ),
        c.if(
          c.getLocal("greatest"),
          c.call(prefixField + "_copy", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8))),
          c.call(prefixField + "_neg", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8)))
        ),
        c.if(
          c.getLocal("greatest"),
          c.call(prefixField + "_neg", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8))),
          c.call(prefixField + "_copy", tmpY, c.i32_add(c.getLocal("pOut"), c.i32_const(n8)))
        )
      )
    );
  }
  function buildInCurveAffine() {
    const f = module.addFunction(prefix + "_inCurveAffine");
    f.addParam("pIn", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("pIn");
    const y = c.i32_add(c.getLocal("pIn"), c.i32_const(n8));
    const y2 = c.i32_const(module.alloc(n8));
    const x3b = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call(prefixField + "_square", y, y2),
      c.call(prefixField + "_square", x, x3b),
      c.call(prefixField + "_mul", x, x3b, x3b),
      c.call(prefixField + "_add", x3b, c.i32_const(pB), x3b),
      c.ret(
        c.call(prefixField + "_eq", y2, x3b)
      )
    );
  }
  function buildInCurve() {
    const f = module.addFunction(prefix + "_inCurve");
    f.addParam("pIn", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8 * 2));
    f.addCode(
      c.call(prefix + "_toAffine", c.getLocal("pIn"), aux),
      c.ret(
        c.call(prefix + "_inCurveAffine", aux)
      )
    );
  }
  buildIsZeroAffine();
  buildIsZero();
  buildZeroAffine();
  buildZero();
  buildCopyAffine();
  buildCopy();
  buildToJacobian();
  buildEqAffine();
  buildEqMixed();
  buildEq();
  buildDoubleAffine();
  buildDouble();
  buildAddAffine();
  buildAddMixed();
  buildAdd();
  buildNegAffine();
  buildNeg();
  buildSubAffine();
  buildSubMixed();
  buildSub();
  buildFromMontgomeryAffine();
  buildFromMontgomery();
  buildToMontgomeryAffine();
  buildToMontgomery();
  buildToAffine();
  buildInCurveAffine();
  buildInCurve();
  buildBatchToAffine();
  buildNormalize();
  buildReverseBytes();
  buildLEMtoU();
  buildLEMtoC();
  buildUtoLEM();
  buildCtoLEM();
  buildBatchConvertion(module, prefix + "_batchLEMtoU", prefix + "_LEMtoU", n8 * 2, n8 * 2);
  buildBatchConvertion(module, prefix + "_batchLEMtoC", prefix + "_LEMtoC", n8 * 2, n8);
  buildBatchConvertion(module, prefix + "_batchUtoLEM", prefix + "_UtoLEM", n8 * 2, n8 * 2);
  buildBatchConvertion(module, prefix + "_batchCtoLEM", prefix + "_CtoLEM", n8, n8 * 2, true);
  buildBatchConvertion(module, prefix + "_batchToJacobian", prefix + "_toJacobian", n8 * 2, n8 * 3, true);
  buildMultiexp$1(module, prefix, prefix + "_multiexp", prefix + "_add", n8 * 3);
  buildMultiexp$1(module, prefix, prefix + "_multiexpAffine", prefix + "_addMixed", n8 * 2);
  buildTimesScalarNAF2(
    module,
    prefix + "_timesScalar",
    n8 * 3,
    prefix + "_add",
    prefix + "_double",
    prefix + "_sub",
    prefix + "_copy",
    prefix + "_zero"
  );
  buildTimesScalarNAF2(
    module,
    prefix + "_timesScalarAffine",
    n8 * 2,
    prefix + "_addMixed",
    prefix + "_double",
    prefix + "_subMixed",
    prefix + "_copyAffine",
    prefix + "_zero"
  );
  module.exportFunction(prefix + "_isZero");
  module.exportFunction(prefix + "_isZeroAffine");
  module.exportFunction(prefix + "_eq");
  module.exportFunction(prefix + "_eqMixed");
  module.exportFunction(prefix + "_eqAffine");
  module.exportFunction(prefix + "_copy");
  module.exportFunction(prefix + "_copyAffine");
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_zeroAffine");
  module.exportFunction(prefix + "_double");
  module.exportFunction(prefix + "_doubleAffine");
  module.exportFunction(prefix + "_add");
  module.exportFunction(prefix + "_addMixed");
  module.exportFunction(prefix + "_addAffine");
  module.exportFunction(prefix + "_neg");
  module.exportFunction(prefix + "_negAffine");
  module.exportFunction(prefix + "_sub");
  module.exportFunction(prefix + "_subMixed");
  module.exportFunction(prefix + "_subAffine");
  module.exportFunction(prefix + "_fromMontgomery");
  module.exportFunction(prefix + "_fromMontgomeryAffine");
  module.exportFunction(prefix + "_toMontgomery");
  module.exportFunction(prefix + "_toMontgomeryAffine");
  module.exportFunction(prefix + "_timesScalar");
  module.exportFunction(prefix + "_timesScalarAffine");
  module.exportFunction(prefix + "_normalize");
  module.exportFunction(prefix + "_LEMtoU");
  module.exportFunction(prefix + "_LEMtoC");
  module.exportFunction(prefix + "_UtoLEM");
  module.exportFunction(prefix + "_CtoLEM");
  module.exportFunction(prefix + "_batchLEMtoU");
  module.exportFunction(prefix + "_batchLEMtoC");
  module.exportFunction(prefix + "_batchUtoLEM");
  module.exportFunction(prefix + "_batchCtoLEM");
  module.exportFunction(prefix + "_toAffine");
  module.exportFunction(prefix + "_toJacobian");
  module.exportFunction(prefix + "_batchToAffine");
  module.exportFunction(prefix + "_batchToJacobian");
  module.exportFunction(prefix + "_inCurve");
  module.exportFunction(prefix + "_inCurveAffine");
  return prefix;
};
var { isOdd: isOdd$2, modInv: modInv$1, modPow } = bigint;
var utils$3 = utils$6;
var build_fft = function buildFFT(module, prefix, gPrefix, fPrefix, opGtimesF) {
  const n64f = module.modules[fPrefix].n64;
  const n8f = n64f * 8;
  const n64g = module.modules[gPrefix].n64;
  const n8g = n64g * 8;
  const q = module.modules[fPrefix].q;
  let rem = q - 1n;
  let maxBits = 0;
  while (!isOdd$2(rem)) {
    maxBits++;
    rem = rem >> 1n;
  }
  let nr = 2n;
  while (modPow(nr, q >> 1n, q) === 1n) nr = nr + 1n;
  const w = new Array(maxBits + 1);
  w[maxBits] = modPow(nr, rem, q);
  let n = maxBits - 1;
  while (n >= 0) {
    w[n] = modPow(w[n + 1], 2n, q);
    n--;
  }
  const bytes2 = [];
  const R = (1n << BigInt(n8f * 8)) % q;
  for (let i = 0; i < w.length; i++) {
    const m = w[i] * R % q;
    bytes2.push(...utils$3.bigInt2BytesLE(m, n8f));
  }
  const ROOTs = module.alloc(bytes2);
  const i2 = new Array(maxBits + 1);
  i2[0] = 1n;
  for (let i = 1; i <= maxBits; i++) {
    i2[i] = i2[i - 1] * 2n;
  }
  const bytesi2 = [];
  for (let i = 0; i <= maxBits; i++) {
    const m = modInv$1(i2[i], q) * R % q;
    bytesi2.push(...utils$3.bigInt2BytesLE(m, n8f));
  }
  const INV2 = module.alloc(bytesi2);
  const shift = modPow(nr, 2n, q);
  const bytesShiftToSmallM = [];
  const bytesSConst = [];
  for (let i = 0; i <= maxBits; i++) {
    const shiftToSmallM = modPow(shift, 2n ** BigInt(i), q);
    const sConst = modInv$1(q + 1n - shiftToSmallM, q);
    bytesShiftToSmallM.push(...utils$3.bigInt2BytesLE(shiftToSmallM * R % q, n8f));
    bytesSConst.push(...utils$3.bigInt2BytesLE(sConst * R % q, n8f));
  }
  const SHIFT_TO_M = module.alloc(bytesShiftToSmallM);
  const SCONST = module.alloc(bytesSConst);
  function rev(x) {
    let r2 = 0;
    for (let i = 0; i < 8; i++) {
      if (x & 1 << i) {
        r2 = r2 | 128 >> i;
      }
    }
    return r2;
  }
  const rtable = Array(256);
  for (let i = 0; i < 256; i++) {
    rtable[i] = rev(i);
  }
  const REVTABLE = module.alloc(rtable);
  function buildLog2() {
    const f = module.addFunction(prefix + "__log2");
    f.addParam("n", "i32");
    f.setReturnType("i32");
    f.addLocal("bits", "i32");
    f.addLocal("aux", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "aux",
        c.i32_shr_u(
          c.getLocal("n"),
          c.i32_const(1)
        )
      )
    );
    f.addCode(c.setLocal("bits", c.i32_const(0)));
    f.addCode(c.block(c.loop(
      c.br_if(
        1,
        c.i32_eqz(c.getLocal("aux"))
      ),
      c.setLocal(
        "aux",
        c.i32_shr_u(
          c.getLocal("aux"),
          c.i32_const(1)
        )
      ),
      c.setLocal(
        "bits",
        c.i32_add(
          c.getLocal("bits"),
          c.i32_const(1)
        )
      ),
      c.br(0)
    )));
    f.addCode(c.if(
      c.i32_ne(
        c.getLocal("n"),
        c.i32_shl(
          c.i32_const(1),
          c.getLocal("bits")
        )
      ),
      c.unreachable()
    ));
    f.addCode(c.if(
      c.i32_gt_u(
        c.getLocal("bits"),
        c.i32_const(maxBits)
      ),
      c.unreachable()
    ));
    f.addCode(c.getLocal("bits"));
  }
  function buildFFT3() {
    const f = module.addFunction(prefix + "_fft");
    f.addParam("px", "i32");
    f.addParam("n", "i32");
    f.addLocal("bits", "i32");
    const c = f.getCodeBuilder();
    const One = c.i32_const(module.alloc(n8f));
    f.addCode(
      c.setLocal(
        "bits",
        c.call(
          prefix + "__log2",
          c.getLocal("n")
        )
      ),
      c.call(fPrefix + "_one", One),
      c.call(
        prefix + "_rawfft",
        c.getLocal("px"),
        c.getLocal("bits"),
        c.i32_const(0),
        One
      )
    );
  }
  function buildIFFT() {
    const f = module.addFunction(prefix + "_ifft");
    f.addParam("px", "i32");
    f.addParam("n", "i32");
    f.addLocal("bits", "i32");
    f.addLocal("pInv2", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal(
        "bits",
        c.call(
          prefix + "__log2",
          c.getLocal("n")
        )
      ),
      c.setLocal(
        "pInv2",
        c.i32_add(
          c.i32_const(INV2),
          c.i32_mul(
            c.getLocal("bits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(
        prefix + "_rawfft",
        c.getLocal("px"),
        c.getLocal("bits"),
        c.i32_const(1),
        c.getLocal("pInv2")
      )
    );
  }
  function buildRawFFT() {
    const f = module.addFunction(prefix + "_rawfft");
    f.addParam("px", "i32");
    f.addParam("bits", "i32");
    f.addParam("reverse", "i32");
    f.addParam("mulFactor", "i32");
    f.addLocal("s", "i32");
    f.addLocal("k", "i32");
    f.addLocal("j", "i32");
    f.addLocal("m", "i32");
    f.addLocal("mdiv2", "i32");
    f.addLocal("n", "i32");
    f.addLocal("pwm", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const T = c.i32_const(module.alloc(n8g));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.call(prefix + "__reversePermutation", c.getLocal("px"), c.getLocal("bits")),
      c.setLocal("n", c.i32_shl(c.i32_const(1), c.getLocal("bits"))),
      c.setLocal("s", c.i32_const(1)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_gt_u(
            c.getLocal("s"),
            c.getLocal("bits")
          )
        ),
        c.setLocal("m", c.i32_shl(c.i32_const(1), c.getLocal("s"))),
        c.setLocal(
          "pwm",
          c.i32_add(
            c.i32_const(ROOTs),
            c.i32_mul(
              c.getLocal("s"),
              c.i32_const(n8f)
            )
          )
        ),
        c.setLocal("k", c.i32_const(0)),
        c.block(c.loop(
          c.br_if(
            1,
            c.i32_ge_u(
              c.getLocal("k"),
              c.getLocal("n")
            )
          ),
          c.call(fPrefix + "_one", W),
          c.setLocal("mdiv2", c.i32_shr_u(c.getLocal("m"), c.i32_const(1))),
          c.setLocal("j", c.i32_const(0)),
          c.block(c.loop(
            c.br_if(
              1,
              c.i32_ge_u(
                c.getLocal("j"),
                c.getLocal("mdiv2")
              )
            ),
            c.setLocal(
              "idx1",
              c.i32_add(
                c.getLocal("px"),
                c.i32_mul(
                  c.i32_add(
                    c.getLocal("k"),
                    c.getLocal("j")
                  ),
                  c.i32_const(n8g)
                )
              )
            ),
            c.setLocal(
              "idx2",
              c.i32_add(
                c.getLocal("idx1"),
                c.i32_mul(
                  c.getLocal("mdiv2"),
                  c.i32_const(n8g)
                )
              )
            ),
            c.call(
              opGtimesF,
              c.getLocal("idx2"),
              W,
              T
            ),
            c.call(
              gPrefix + "_copy",
              c.getLocal("idx1"),
              U
            ),
            c.call(
              gPrefix + "_add",
              U,
              T,
              c.getLocal("idx1")
            ),
            c.call(
              gPrefix + "_sub",
              U,
              T,
              c.getLocal("idx2")
            ),
            c.call(
              fPrefix + "_mul",
              W,
              c.getLocal("pwm"),
              W
            ),
            c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
            c.br(0)
          )),
          c.setLocal("k", c.i32_add(c.getLocal("k"), c.getLocal("m"))),
          c.br(0)
        )),
        c.setLocal("s", c.i32_add(c.getLocal("s"), c.i32_const(1))),
        c.br(0)
      )),
      c.call(
        prefix + "__fftFinal",
        c.getLocal("px"),
        c.getLocal("bits"),
        c.getLocal("reverse"),
        c.getLocal("mulFactor")
      )
    );
  }
  function buildFinalInverse() {
    const f = module.addFunction(prefix + "__fftFinal");
    f.addParam("px", "i32");
    f.addParam("bits", "i32");
    f.addParam("reverse", "i32");
    f.addParam("mulFactor", "i32");
    f.addLocal("n", "i32");
    f.addLocal("ndiv2", "i32");
    f.addLocal("pInv2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("mask", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    const c = f.getCodeBuilder();
    const T = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.if(
        c.i32_and(
          c.i32_eqz(c.getLocal("reverse")),
          c.call(fPrefix + "_isOne", c.getLocal("mulFactor"))
        ),
        c.ret([])
      ),
      c.setLocal("n", c.i32_shl(c.i32_const(1), c.getLocal("bits"))),
      c.setLocal("mask", c.i32_sub(c.getLocal("n"), c.i32_const(1))),
      c.setLocal("i", c.i32_const(1)),
      c.setLocal(
        "ndiv2",
        c.i32_shr_u(
          c.getLocal("n"),
          c.i32_const(1)
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_ge_u(
            c.getLocal("i"),
            c.getLocal("ndiv2")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.i32_sub(
                c.getLocal("n"),
                c.getLocal("i")
              ),
              c.i32_const(n8g)
            )
          )
        ),
        c.if(
          c.getLocal("reverse"),
          c.if(
            c.call(fPrefix + "_isOne", c.getLocal("mulFactor")),
            [
              ...c.call(gPrefix + "_copy", c.getLocal("idx1"), T),
              ...c.call(gPrefix + "_copy", c.getLocal("idx2"), c.getLocal("idx1")),
              ...c.call(gPrefix + "_copy", T, c.getLocal("idx2"))
            ],
            [
              ...c.call(gPrefix + "_copy", c.getLocal("idx1"), T),
              ...c.call(opGtimesF, c.getLocal("idx2"), c.getLocal("mulFactor"), c.getLocal("idx1")),
              ...c.call(opGtimesF, T, c.getLocal("mulFactor"), c.getLocal("idx2"))
            ]
          ),
          c.if(
            c.call(fPrefix + "_isOne", c.getLocal("mulFactor")),
            [
              // Do nothing (It should not be here)
            ],
            [
              ...c.call(opGtimesF, c.getLocal("idx1"), c.getLocal("mulFactor"), c.getLocal("idx1")),
              ...c.call(opGtimesF, c.getLocal("idx2"), c.getLocal("mulFactor"), c.getLocal("idx2"))
            ]
          )
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      )),
      c.if(
        c.call(fPrefix + "_isOne", c.getLocal("mulFactor")),
        [
          // Do nothing (It should not be here)
        ],
        [
          ...c.call(opGtimesF, c.getLocal("px"), c.getLocal("mulFactor"), c.getLocal("px")),
          ...c.setLocal(
            "idx2",
            c.i32_add(
              c.getLocal("px"),
              c.i32_mul(
                c.getLocal("ndiv2"),
                c.i32_const(n8g)
              )
            )
          ),
          ...c.call(opGtimesF, c.getLocal("idx2"), c.getLocal("mulFactor"), c.getLocal("idx2"))
        ]
      )
    );
  }
  function buildReversePermutation() {
    const f = module.addFunction(prefix + "__reversePermutation");
    f.addParam("px", "i32");
    f.addParam("bits", "i32");
    f.addLocal("n", "i32");
    f.addLocal("i", "i32");
    f.addLocal("ri", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    const c = f.getCodeBuilder();
    const T = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal("n", c.i32_shl(c.i32_const(1), c.getLocal("bits"))),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal("ri", c.call(prefix + "__rev", c.getLocal("i"), c.getLocal("bits"))),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("px"),
            c.i32_mul(
              c.getLocal("ri"),
              c.i32_const(n8g)
            )
          )
        ),
        c.if(
          c.i32_lt_u(
            c.getLocal("i"),
            c.getLocal("ri")
          ),
          [
            ...c.call(gPrefix + "_copy", c.getLocal("idx1"), T),
            ...c.call(gPrefix + "_copy", c.getLocal("idx2"), c.getLocal("idx1")),
            ...c.call(gPrefix + "_copy", T, c.getLocal("idx2"))
          ]
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildRev() {
    const f = module.addFunction(prefix + "__rev");
    f.addParam("x", "i32");
    f.addParam("bits", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.i32_rotl(
        c.i32_add(
          c.i32_add(
            c.i32_shl(
              c.i32_load8_u(
                c.i32_and(
                  c.getLocal("x"),
                  c.i32_const(255)
                ),
                REVTABLE,
                0
              ),
              c.i32_const(24)
            ),
            c.i32_shl(
              c.i32_load8_u(
                c.i32_and(
                  c.i32_shr_u(
                    c.getLocal("x"),
                    c.i32_const(8)
                  ),
                  c.i32_const(255)
                ),
                REVTABLE,
                0
              ),
              c.i32_const(16)
            )
          ),
          c.i32_add(
            c.i32_shl(
              c.i32_load8_u(
                c.i32_and(
                  c.i32_shr_u(
                    c.getLocal("x"),
                    c.i32_const(16)
                  ),
                  c.i32_const(255)
                ),
                REVTABLE,
                0
              ),
              c.i32_const(8)
            ),
            c.i32_load8_u(
              c.i32_and(
                c.i32_shr_u(
                  c.getLocal("x"),
                  c.i32_const(24)
                ),
                c.i32_const(255)
              ),
              REVTABLE,
              0
            )
          )
        ),
        c.getLocal("bits")
      )
    );
  }
  function buildFFTJoin() {
    const f = module.addFunction(prefix + "_fftJoin");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const T = c.i32_const(module.alloc(n8g));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          T
        ),
        c.call(
          gPrefix + "_copy",
          c.getLocal("idx1"),
          U
        ),
        c.call(
          gPrefix + "_add",
          U,
          T,
          c.getLocal("idx1")
        ),
        c.call(
          gPrefix + "_sub",
          U,
          T,
          c.getLocal("idx2")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTJoinExt() {
    const f = module.addFunction(prefix + "_fftJoinExt");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addParam("totalBits", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("pShiftToM", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal(
        "pShiftToM",
        c.i32_add(
          c.i32_const(SHIFT_TO_M),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          gPrefix + "_add",
          c.getLocal("idx1"),
          c.getLocal("idx2"),
          U
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          c.getLocal("pShiftToM"),
          c.getLocal("idx2")
        ),
        c.call(
          gPrefix + "_add",
          c.getLocal("idx1"),
          c.getLocal("idx2"),
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          c.getLocal("idx2")
        ),
        c.call(
          gPrefix + "_copy",
          U,
          c.getLocal("idx1")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTJoinExtInv() {
    const f = module.addFunction(prefix + "_fftJoinExtInv");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addParam("totalBits", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("pShiftToM", "i32");
    f.addLocal("pSConst", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal(
        "pShiftToM",
        c.i32_add(
          c.i32_const(SHIFT_TO_M),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.setLocal(
        "pSConst",
        c.i32_add(
          c.i32_const(SCONST),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          U
        ),
        c.call(
          gPrefix + "_sub",
          c.getLocal("idx1"),
          U,
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          c.getLocal("pSConst"),
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("pShiftToM"),
          c.getLocal("idx1")
        ),
        c.call(
          gPrefix + "_sub",
          U,
          c.getLocal("idx1"),
          c.getLocal("idx1")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("pSConst"),
          c.getLocal("idx1")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildPrepareLagrangeEvaluation() {
    const f = module.addFunction(prefix + "_prepareLagrangeEvaluation");
    f.addParam("pBuff1", "i32");
    f.addParam("pBuff2", "i32");
    f.addParam("n", "i32");
    f.addParam("first", "i32");
    f.addParam("inc", "i32");
    f.addParam("totalBits", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("pShiftToM", "i32");
    f.addLocal("pSConst", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal(
        "pShiftToM",
        c.i32_add(
          c.i32_const(SHIFT_TO_M),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.setLocal(
        "pSConst",
        c.i32_add(
          c.i32_const(SCONST),
          c.i32_mul(
            c.getLocal("totalBits"),
            c.i32_const(n8f)
          )
        )
      ),
      c.call(fPrefix + "_copy", c.getLocal("first"), W),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("n")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff1"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff2"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("pShiftToM"),
          U
        ),
        c.call(
          gPrefix + "_sub",
          c.getLocal("idx2"),
          U,
          U
        ),
        c.call(
          gPrefix + "_sub",
          c.getLocal("idx1"),
          c.getLocal("idx2"),
          c.getLocal("idx2")
        ),
        c.call(
          opGtimesF,
          U,
          c.getLocal("pSConst"),
          c.getLocal("idx1")
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          W,
          c.getLocal("idx2")
        ),
        c.call(
          fPrefix + "_mul",
          W,
          c.getLocal("inc"),
          W
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTMix() {
    const f = module.addFunction(prefix + "_fftMix");
    f.addParam("pBuff", "i32");
    f.addParam("n", "i32");
    f.addParam("exp", "i32");
    f.addLocal("nGroups", "i32");
    f.addLocal("nPerGroup", "i32");
    f.addLocal("nPerGroupDiv2", "i32");
    f.addLocal("pairOffset", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("pwm", "i32");
    const c = f.getCodeBuilder();
    const W = c.i32_const(module.alloc(n8f));
    const T = c.i32_const(module.alloc(n8g));
    const U = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal("nPerGroup", c.i32_shl(c.i32_const(1), c.getLocal("exp"))),
      c.setLocal("nPerGroupDiv2", c.i32_shr_u(c.getLocal("nPerGroup"), c.i32_const(1))),
      c.setLocal("nGroups", c.i32_shr_u(c.getLocal("n"), c.getLocal("exp"))),
      c.setLocal("pairOffset", c.i32_mul(c.getLocal("nPerGroupDiv2"), c.i32_const(n8g))),
      c.setLocal(
        "pwm",
        c.i32_add(
          c.i32_const(ROOTs),
          c.i32_mul(
            c.getLocal("exp"),
            c.i32_const(n8f)
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("nGroups")
          )
        ),
        c.call(fPrefix + "_one", W),
        c.setLocal("j", c.i32_const(0)),
        c.block(c.loop(
          c.br_if(
            1,
            c.i32_eq(
              c.getLocal("j"),
              c.getLocal("nPerGroupDiv2")
            )
          ),
          c.setLocal(
            "idx1",
            c.i32_add(
              c.getLocal("pBuff"),
              c.i32_mul(
                c.i32_add(
                  c.i32_mul(
                    c.getLocal("i"),
                    c.getLocal("nPerGroup")
                  ),
                  c.getLocal("j")
                ),
                c.i32_const(n8g)
              )
            )
          ),
          c.setLocal(
            "idx2",
            c.i32_add(
              c.getLocal("idx1"),
              c.getLocal("pairOffset")
            )
          ),
          c.call(
            opGtimesF,
            c.getLocal("idx2"),
            W,
            T
          ),
          c.call(
            gPrefix + "_copy",
            c.getLocal("idx1"),
            U
          ),
          c.call(
            gPrefix + "_add",
            U,
            T,
            c.getLocal("idx1")
          ),
          c.call(
            gPrefix + "_sub",
            U,
            T,
            c.getLocal("idx2")
          ),
          c.call(
            fPrefix + "_mul",
            W,
            c.getLocal("pwm"),
            W
          ),
          c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
          c.br(0)
        )),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFFTFinal() {
    const f = module.addFunction(prefix + "_fftFinal");
    f.addParam("pBuff", "i32");
    f.addParam("n", "i32");
    f.addParam("factor", "i32");
    f.addLocal("idx1", "i32");
    f.addLocal("idx2", "i32");
    f.addLocal("i", "i32");
    f.addLocal("ndiv2", "i32");
    const c = f.getCodeBuilder();
    const T = c.i32_const(module.alloc(n8g));
    f.addCode(
      c.setLocal("ndiv2", c.i32_shr_u(c.getLocal("n"), c.i32_const(1))),
      c.if(
        c.i32_and(
          c.getLocal("n"),
          c.i32_const(1)
        ),
        c.call(
          opGtimesF,
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.getLocal("ndiv2"),
              c.i32_const(n8g)
            )
          ),
          c.getLocal("factor"),
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.getLocal("ndiv2"),
              c.i32_const(n8g)
            )
          )
        )
      ),
      c.setLocal("i", c.i32_const(0)),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_ge_u(
            c.getLocal("i"),
            c.getLocal("ndiv2")
          )
        ),
        c.setLocal(
          "idx1",
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.getLocal("i"),
              c.i32_const(n8g)
            )
          )
        ),
        c.setLocal(
          "idx2",
          c.i32_add(
            c.getLocal("pBuff"),
            c.i32_mul(
              c.i32_sub(
                c.i32_sub(
                  c.getLocal("n"),
                  c.i32_const(1)
                ),
                c.getLocal("i")
              ),
              c.i32_const(n8g)
            )
          )
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx2"),
          c.getLocal("factor"),
          T
        ),
        c.call(
          opGtimesF,
          c.getLocal("idx1"),
          c.getLocal("factor"),
          c.getLocal("idx2")
        ),
        c.call(
          gPrefix + "_copy",
          T,
          c.getLocal("idx1")
        ),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  buildRev();
  buildReversePermutation();
  buildFinalInverse();
  buildRawFFT();
  buildLog2();
  buildFFT3();
  buildIFFT();
  buildFFTJoin();
  buildFFTJoinExt();
  buildFFTJoinExtInv();
  buildFFTMix();
  buildFFTFinal();
  buildPrepareLagrangeEvaluation();
  module.exportFunction(prefix + "_fft");
  module.exportFunction(prefix + "_ifft");
  module.exportFunction(prefix + "_rawfft");
  module.exportFunction(prefix + "_fftJoin");
  module.exportFunction(prefix + "_fftJoinExt");
  module.exportFunction(prefix + "_fftJoinExtInv");
  module.exportFunction(prefix + "_fftMix");
  module.exportFunction(prefix + "_fftFinal");
  module.exportFunction(prefix + "_prepareLagrangeEvaluation");
};
var build_pol = function buildPol(module, prefix, prefixField) {
  const n64 = module.modules[prefixField].n64;
  const n8 = n64 * 8;
  function buildZero() {
    const f = module.addFunction(prefix + "_zero");
    f.addParam("px", "i32");
    f.addParam("n", "i32");
    f.addLocal("lastp", "i32");
    f.addLocal("p", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal("p", c.getLocal("px")),
      c.setLocal(
        "lastp",
        c.i32_add(
          c.getLocal("px"),
          c.i32_mul(
            c.getLocal("n"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("p"),
            c.getLocal("lastp")
          )
        ),
        c.call(prefixField + "_zero", c.getLocal("p")),
        c.setLocal("p", c.i32_add(c.getLocal("p"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  function buildConstructLC() {
    const f = module.addFunction(prefix + "_constructLC");
    f.addParam("ppolynomials", "i32");
    f.addParam("psignals", "i32");
    f.addParam("nSignals", "i32");
    f.addParam("pres", "i32");
    f.addLocal("i", "i32");
    f.addLocal("j", "i32");
    f.addLocal("pp", "i32");
    f.addLocal("ps", "i32");
    f.addLocal("pd", "i32");
    f.addLocal("ncoefs", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("i", c.i32_const(0)),
      c.setLocal("pp", c.getLocal("ppolynomials")),
      c.setLocal("ps", c.getLocal("psignals")),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("i"),
            c.getLocal("nSignals")
          )
        ),
        c.setLocal("ncoefs", c.i32_load(c.getLocal("pp"))),
        c.setLocal("pp", c.i32_add(c.getLocal("pp"), c.i32_const(4))),
        c.setLocal("j", c.i32_const(0)),
        c.block(c.loop(
          c.br_if(
            1,
            c.i32_eq(
              c.getLocal("j"),
              c.getLocal("ncoefs")
            )
          ),
          c.setLocal(
            "pd",
            c.i32_add(
              c.getLocal("pres"),
              c.i32_mul(
                c.i32_load(c.getLocal("pp")),
                c.i32_const(n8)
              )
            )
          ),
          c.setLocal("pp", c.i32_add(c.getLocal("pp"), c.i32_const(4))),
          c.call(
            prefixField + "_mul",
            c.getLocal("ps"),
            c.getLocal("pp"),
            aux
          ),
          c.call(
            prefixField + "_add",
            aux,
            c.getLocal("pd"),
            c.getLocal("pd")
          ),
          c.setLocal("pp", c.i32_add(c.getLocal("pp"), c.i32_const(n8))),
          c.setLocal("j", c.i32_add(c.getLocal("j"), c.i32_const(1))),
          c.br(0)
        )),
        c.setLocal("ps", c.i32_add(c.getLocal("ps"), c.i32_const(n8))),
        c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  buildZero();
  buildConstructLC();
  module.exportFunction(prefix + "_zero");
  module.exportFunction(prefix + "_constructLC");
  return prefix;
};
var build_qap = function buildQAP(module, prefix, prefixField) {
  const n64 = module.modules[prefixField].n64;
  const n8 = n64 * 8;
  function buildBuildABC() {
    const f = module.addFunction(prefix + "_buildABC");
    f.addParam("pCoefs", "i32");
    f.addParam("nCoefs", "i32");
    f.addParam("pWitness", "i32");
    f.addParam("pA", "i32");
    f.addParam("pB", "i32");
    f.addParam("pC", "i32");
    f.addParam("offsetOut", "i32");
    f.addParam("nOut", "i32");
    f.addParam("offsetWitness", "i32");
    f.addParam("nWitness", "i32");
    f.addLocal("it", "i32");
    f.addLocal("ita", "i32");
    f.addLocal("itb", "i32");
    f.addLocal("last", "i32");
    f.addLocal("m", "i32");
    f.addLocal("c", "i32");
    f.addLocal("s", "i32");
    f.addLocal("pOut", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8));
    f.addCode(
      // Set output a and b to 0
      c.setLocal("ita", c.getLocal("pA")),
      c.setLocal("itb", c.getLocal("pB")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pA"),
          c.i32_mul(
            c.getLocal("nOut"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(prefixField + "_zero", c.getLocal("ita")),
        c.call(prefixField + "_zero", c.getLocal("itb")),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.br(0)
      )),
      c.setLocal("it", c.getLocal("pCoefs")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pCoefs"),
          c.i32_mul(
            c.getLocal("nCoefs"),
            c.i32_const(n8 + 12)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("it"),
            c.getLocal("last")
          )
        ),
        c.setLocal(
          "s",
          c.i32_load(c.getLocal("it"), 8)
        ),
        c.if(
          c.i32_or(
            c.i32_lt_u(
              c.getLocal("s"),
              c.getLocal("offsetWitness")
            ),
            c.i32_ge_u(
              c.getLocal("s"),
              c.i32_add(
                c.getLocal("offsetWitness"),
                c.getLocal("nWitness")
              )
            )
          ),
          [
            ...c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
            ...c.br(1)
          ]
        ),
        c.setLocal(
          "m",
          c.i32_load(c.getLocal("it"))
        ),
        c.if(
          c.i32_eq(c.getLocal("m"), c.i32_const(0)),
          c.setLocal("pOut", c.getLocal("pA")),
          c.if(
            c.i32_eq(c.getLocal("m"), c.i32_const(1)),
            c.setLocal("pOut", c.getLocal("pB")),
            [
              ...c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
              ...c.br(1)
            ]
          )
        ),
        c.setLocal(
          "c",
          c.i32_load(c.getLocal("it"), 4)
        ),
        c.if(
          c.i32_or(
            c.i32_lt_u(
              c.getLocal("c"),
              c.getLocal("offsetOut")
            ),
            c.i32_ge_u(
              c.getLocal("c"),
              c.i32_add(
                c.getLocal("offsetOut"),
                c.getLocal("nOut")
              )
            )
          ),
          [
            ...c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
            ...c.br(1)
          ]
        ),
        c.setLocal(
          "pOut",
          c.i32_add(
            c.getLocal("pOut"),
            c.i32_mul(
              c.i32_sub(
                c.getLocal("c"),
                c.getLocal("offsetOut")
              ),
              c.i32_const(n8)
            )
          )
        ),
        c.call(
          prefixField + "_mul",
          c.i32_add(
            c.getLocal("pWitness"),
            c.i32_mul(
              c.i32_sub(c.getLocal("s"), c.getLocal("offsetWitness")),
              c.i32_const(n8)
            )
          ),
          c.i32_add(c.getLocal("it"), c.i32_const(12)),
          aux
        ),
        c.call(
          prefixField + "_add",
          c.getLocal("pOut"),
          aux,
          c.getLocal("pOut")
        ),
        c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8 + 12))),
        c.br(0)
      )),
      c.setLocal("ita", c.getLocal("pA")),
      c.setLocal("itb", c.getLocal("pB")),
      c.setLocal("it", c.getLocal("pC")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pA"),
          c.i32_mul(
            c.getLocal("nOut"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(
          prefixField + "_mul",
          c.getLocal("ita"),
          c.getLocal("itb"),
          c.getLocal("it")
        ),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.setLocal("it", c.i32_add(c.getLocal("it"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  function buildJoinABC() {
    const f = module.addFunction(prefix + "_joinABC");
    f.addParam("pA", "i32");
    f.addParam("pB", "i32");
    f.addParam("pC", "i32");
    f.addParam("n", "i32");
    f.addParam("pP", "i32");
    f.addLocal("ita", "i32");
    f.addLocal("itb", "i32");
    f.addLocal("itc", "i32");
    f.addLocal("itp", "i32");
    f.addLocal("last", "i32");
    const c = f.getCodeBuilder();
    const aux = c.i32_const(module.alloc(n8));
    f.addCode(
      c.setLocal("ita", c.getLocal("pA")),
      c.setLocal("itb", c.getLocal("pB")),
      c.setLocal("itc", c.getLocal("pC")),
      c.setLocal("itp", c.getLocal("pP")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pA"),
          c.i32_mul(
            c.getLocal("n"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(
          prefixField + "_mul",
          c.getLocal("ita"),
          c.getLocal("itb"),
          aux
        ),
        c.call(
          prefixField + "_sub",
          aux,
          c.getLocal("itc"),
          c.getLocal("itp")
        ),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.setLocal("itc", c.i32_add(c.getLocal("itc"), c.i32_const(n8))),
        c.setLocal("itp", c.i32_add(c.getLocal("itp"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  function buildBatchAdd() {
    const f = module.addFunction(prefix + "_batchAdd");
    f.addParam("pa", "i32");
    f.addParam("pb", "i32");
    f.addParam("n", "i32");
    f.addParam("pr", "i32");
    f.addLocal("ita", "i32");
    f.addLocal("itb", "i32");
    f.addLocal("itr", "i32");
    f.addLocal("last", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.setLocal("ita", c.getLocal("pa")),
      c.setLocal("itb", c.getLocal("pb")),
      c.setLocal("itr", c.getLocal("pr")),
      c.setLocal(
        "last",
        c.i32_add(
          c.getLocal("pa"),
          c.i32_mul(
            c.getLocal("n"),
            c.i32_const(n8)
          )
        )
      ),
      c.block(c.loop(
        c.br_if(
          1,
          c.i32_eq(
            c.getLocal("ita"),
            c.getLocal("last")
          )
        ),
        c.call(
          prefixField + "_add",
          c.getLocal("ita"),
          c.getLocal("itb"),
          c.getLocal("itr")
        ),
        c.setLocal("ita", c.i32_add(c.getLocal("ita"), c.i32_const(n8))),
        c.setLocal("itb", c.i32_add(c.getLocal("itb"), c.i32_const(n8))),
        c.setLocal("itr", c.i32_add(c.getLocal("itr"), c.i32_const(n8))),
        c.br(0)
      ))
    );
  }
  buildBuildABC();
  buildJoinABC();
  buildBatchAdd();
  module.exportFunction(prefix + "_buildABC");
  module.exportFunction(prefix + "_joinABC");
  module.exportFunction(prefix + "_batchAdd");
  return prefix;
};
var build_applykey = function buildApplyKey(module, fnName, gPrefix, frPrefix, sizeGIn, sizeGOut, sizeF, opGtimesF) {
  const f = module.addFunction(fnName);
  f.addParam("pIn", "i32");
  f.addParam("n", "i32");
  f.addParam("pFirst", "i32");
  f.addParam("pInc", "i32");
  f.addParam("pOut", "i32");
  f.addLocal("pOldFree", "i32");
  f.addLocal("i", "i32");
  f.addLocal("pFrom", "i32");
  f.addLocal("pTo", "i32");
  const c = f.getCodeBuilder();
  const t = c.i32_const(module.alloc(sizeF));
  f.addCode(
    c.setLocal("pFrom", c.getLocal("pIn")),
    c.setLocal("pTo", c.getLocal("pOut"))
  );
  f.addCode(
    c.call(
      frPrefix + "_copy",
      c.getLocal("pFirst"),
      t
    )
  );
  f.addCode(
    c.setLocal("i", c.i32_const(0)),
    c.block(c.loop(
      c.br_if(1, c.i32_eq(c.getLocal("i"), c.getLocal("n"))),
      c.call(
        opGtimesF,
        c.getLocal("pFrom"),
        t,
        c.getLocal("pTo")
      ),
      c.setLocal("pFrom", c.i32_add(c.getLocal("pFrom"), c.i32_const(sizeGIn))),
      c.setLocal("pTo", c.i32_add(c.getLocal("pTo"), c.i32_const(sizeGOut))),
      // t = t* inc
      c.call(
        frPrefix + "_mul",
        t,
        c.getLocal("pInc"),
        t
      ),
      c.setLocal("i", c.i32_add(c.getLocal("i"), c.i32_const(1))),
      c.br(0)
    ))
  );
  module.exportFunction(fnName);
};
var utils$2 = utils$6;
var buildF1m$1 = build_f1m;
var buildF1$1 = build_f1;
var buildF2m$1 = build_f2m;
var buildF3m$1 = build_f3m;
var buildCurve$1 = build_curve_jacobian_a0;
var buildFFT$2 = build_fft;
var buildPol$1 = build_pol;
var buildQAP$1 = build_qap;
var buildApplyKey$1 = build_applykey;
var { bitLength: bitLength$2, modInv, isOdd: isOdd$1, isNegative: isNegative$2 } = bigint;
var build_bn128 = function buildBN128(module, _prefix) {
  const prefix = _prefix || "bn128";
  if (module.modules[prefix]) return prefix;
  const q = 21888242871839275222246405745257275088696311157297823662689037894645226208583n;
  const r2 = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
  const n64 = Math.floor((bitLength$2(q - 1n) - 1) / 64) + 1;
  const n8 = n64 * 8;
  const frsize = n8;
  const f1size = n8;
  const f2size = f1size * 2;
  const ftsize = f1size * 12;
  const pr = module.alloc(utils$2.bigInt2BytesLE(r2, frsize));
  const f1mPrefix = buildF1m$1(module, q, "f1m");
  buildF1$1(module, r2, "fr", "frm");
  const pG1b = module.alloc(utils$2.bigInt2BytesLE(toMontgomery(3n), f1size));
  const g1mPrefix = buildCurve$1(module, "g1m", "f1m", pG1b);
  buildFFT$2(module, "frm", "frm", "frm", "frm_mul");
  buildPol$1(module, "pol", "frm");
  buildQAP$1(module, "qap", "frm");
  const f2mPrefix = buildF2m$1(module, "f1m_neg", "f2m", "f1m");
  const pG2b = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(19485874751759354771024239261021720505790618469301721065564631296452457478373n), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(266929791119991161246907387137283842545076965332900288569378510910307636690n), f1size)
  ]);
  const g2mPrefix = buildCurve$1(module, "g2m", "f2m", pG2b);
  function buildGTimesFr(fnName, opMul) {
    const f = module.addFunction(fnName);
    f.addParam("pG", "i32");
    f.addParam("pFr", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8));
    f.addCode(
      c.call("frm_fromMontgomery", c.getLocal("pFr"), AUX),
      c.call(
        opMul,
        c.getLocal("pG"),
        AUX,
        c.i32_const(n8),
        c.getLocal("pr")
      )
    );
    module.exportFunction(fnName);
  }
  buildGTimesFr("g1m_timesFr", "g1m_timesScalar");
  buildFFT$2(module, "g1m", "g1m", "frm", "g1m_timesFr");
  buildGTimesFr("g2m_timesFr", "g2m_timesScalar");
  buildFFT$2(module, "g2m", "g2m", "frm", "g2m_timesFr");
  buildGTimesFr("g1m_timesFrAffine", "g1m_timesScalarAffine");
  buildGTimesFr("g2m_timesFrAffine", "g2m_timesScalarAffine");
  buildApplyKey$1(module, "frm_batchApplyKey", "fmr", "frm", n8, n8, n8, "frm_mul");
  buildApplyKey$1(module, "g1m_batchApplyKey", "g1m", "frm", n8 * 3, n8 * 3, n8, "g1m_timesFr");
  buildApplyKey$1(module, "g1m_batchApplyKeyMixed", "g1m", "frm", n8 * 2, n8 * 3, n8, "g1m_timesFrAffine");
  buildApplyKey$1(module, "g2m_batchApplyKey", "g2m", "frm", n8 * 2 * 3, n8 * 3 * 2, n8, "g2m_timesFr");
  buildApplyKey$1(module, "g2m_batchApplyKeyMixed", "g2m", "frm", n8 * 2 * 2, n8 * 3 * 2, n8, "g2m_timesFrAffine");
  function toMontgomery(a2) {
    return BigInt(a2) * (1n << BigInt(f1size * 8)) % q;
  }
  const G1gen = [
    1n,
    2n,
    1n
  ];
  const pG1gen = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G1gen[0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1gen[1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1gen[2]), f1size)
    ]
  );
  const G1zero = [
    0n,
    1n,
    0n
  ];
  const pG1zero = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G1zero[0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1zero[1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G1zero[2]), f1size)
    ]
  );
  const G2gen = [
    [
      10857046999023057135944570762232829481370756359578518086990519993285655852781n,
      11559732032986387107991004021392285783925812861821192530917403151452391805634n
    ],
    [
      8495653923123431417604973247489272438418190587263600148770280649306958101930n,
      4082367875863433681332203403145435568316851327593401208105741076214120093531n
    ],
    [
      1n,
      0n
    ]
  ];
  const pG2gen = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[0][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[0][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[1][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[1][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[2][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2gen[2][1]), f1size)
    ]
  );
  const G2zero = [
    [
      0n,
      0n
    ],
    [
      1n,
      0n
    ],
    [
      0n,
      0n
    ]
  ];
  const pG2zero = module.alloc(
    [
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[0][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[0][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[1][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[1][1]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[2][0]), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery(G2zero[2][1]), f1size)
    ]
  );
  const pOneT = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(1), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(0), f1size)
  ]);
  const pNonResidueF6 = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(9), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(1), f1size)
  ]);
  const pTwoInv = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(modInv(2n, q)), f1size),
    ...utils$2.bigInt2BytesLE(0n, f1size)
  ]);
  const pAltBn128Twist = pNonResidueF6;
  const pTwistCoefB = module.alloc([
    ...utils$2.bigInt2BytesLE(toMontgomery(19485874751759354771024239261021720505790618469301721065564631296452457478373n), f1size),
    ...utils$2.bigInt2BytesLE(toMontgomery(266929791119991161246907387137283842545076965332900288569378510910307636690n), f1size)
  ]);
  function build_mulNR6() {
    const f = module.addFunction(prefix + "_mulNR6");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(
        f2mPrefix + "_mul",
        c.i32_const(pNonResidueF6),
        c.getLocal("x"),
        c.getLocal("pr")
      )
    );
  }
  build_mulNR6();
  const f6mPrefix = buildF3m$1(module, prefix + "_mulNR6", "f6m", "f2m");
  function build_mulNR12() {
    const f = module.addFunction(prefix + "_mulNR12");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(
        f2mPrefix + "_mul",
        c.i32_const(pNonResidueF6),
        c.i32_add(c.getLocal("x"), c.i32_const(n8 * 4)),
        c.getLocal("pr")
      ),
      c.call(
        f2mPrefix + "_copy",
        c.getLocal("x"),
        c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 2))
      ),
      c.call(
        f2mPrefix + "_copy",
        c.i32_add(c.getLocal("x"), c.i32_const(n8 * 2)),
        c.i32_add(c.getLocal("pr"), c.i32_const(n8 * 4))
      )
    );
  }
  build_mulNR12();
  const ftmPrefix = buildF2m$1(module, prefix + "_mulNR12", "ftm", f6mPrefix);
  const ateLoopCount = 29793968203157093288n;
  const ateLoopBitBytes = bits3(ateLoopCount);
  const pAteLoopBitBytes = module.alloc(ateLoopBitBytes);
  const ateCoefSize = 3 * f2size;
  const ateNDblCoefs = ateLoopBitBytes.length - 1;
  const ateNAddCoefs = ateLoopBitBytes.reduce((acc, b) => acc + (b != 0 ? 1 : 0), 0);
  const ateNCoefs = ateNAddCoefs + ateNDblCoefs + 1;
  const prePSize = 3 * 2 * n8;
  const preQSize = 3 * n8 * 2 + ateNCoefs * ateCoefSize;
  module.modules[prefix] = {
    n64,
    pG1gen,
    pG1zero,
    pG1b,
    pG2gen,
    pG2zero,
    pG2b,
    pq: module.modules["f1m"].pq,
    pr,
    pOneT,
    prePSize,
    preQSize,
    r: r2.toString(),
    q: q.toString()
  };
  const finalExpZ = 4965661367192848881n;
  function naf2(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd$1(E)) {
        const z = 2 - Number(E % 4n);
        res.push(z);
        E = E - BigInt(z);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function bits3(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd$1(E)) {
        res.push(1);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function buildPrepareG1() {
    const f = module.addFunction(prefix + "_prepareG1");
    f.addParam("pP", "i32");
    f.addParam("ppreP", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(g1mPrefix + "_normalize", c.getLocal("pP"), c.getLocal("ppreP"))
      // TODO Remove if already in affine
    );
  }
  function buildPrepAddStep() {
    const f = module.addFunction(prefix + "_prepAddStep");
    f.addParam("pQ", "i32");
    f.addParam("pR", "i32");
    f.addParam("pCoef", "i32");
    const c = f.getCodeBuilder();
    const X2 = c.getLocal("pQ");
    const Y2 = c.i32_add(c.getLocal("pQ"), c.i32_const(f2size));
    const X1 = c.getLocal("pR");
    const Y1 = c.i32_add(c.getLocal("pR"), c.i32_const(f2size));
    const Z1 = c.i32_add(c.getLocal("pR"), c.i32_const(2 * f2size));
    const ELL_0 = c.getLocal("pCoef");
    const ELL_VW = c.i32_add(c.getLocal("pCoef"), c.i32_const(f2size));
    const ELL_VV = c.i32_add(c.getLocal("pCoef"), c.i32_const(2 * f2size));
    const D = ELL_VW;
    const E = c.i32_const(module.alloc(f2size));
    const F = c.i32_const(module.alloc(f2size));
    const G = c.i32_const(module.alloc(f2size));
    const H = c.i32_const(module.alloc(f2size));
    const I = c.i32_const(module.alloc(f2size));
    const J = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      // D = X1 - X2*Z1
      c.call(f2mPrefix + "_mul", X2, Z1, D),
      c.call(f2mPrefix + "_sub", X1, D, D),
      // E = Y1 - Y2*Z1
      c.call(f2mPrefix + "_mul", Y2, Z1, E),
      c.call(f2mPrefix + "_sub", Y1, E, E),
      // F = D^2
      c.call(f2mPrefix + "_square", D, F),
      // G = E^2
      c.call(f2mPrefix + "_square", E, G),
      // H = D*F
      c.call(f2mPrefix + "_mul", D, F, H),
      // I = X1 * F
      c.call(f2mPrefix + "_mul", X1, F, I),
      // J = H + Z1*G - (I+I)
      c.call(f2mPrefix + "_add", I, I, AUX),
      c.call(f2mPrefix + "_mul", Z1, G, J),
      c.call(f2mPrefix + "_add", H, J, J),
      c.call(f2mPrefix + "_sub", J, AUX, J),
      // X3 (X1) = D*J
      c.call(f2mPrefix + "_mul", D, J, X1),
      // Y3 (Y1) = E*(I-J)-(H*Y1)
      c.call(f2mPrefix + "_mul", H, Y1, Y1),
      c.call(f2mPrefix + "_sub", I, J, AUX),
      c.call(f2mPrefix + "_mul", E, AUX, AUX),
      c.call(f2mPrefix + "_sub", AUX, Y1, Y1),
      // Z3 (Z1) = Z1*H
      c.call(f2mPrefix + "_mul", Z1, H, Z1),
      // ell_0 = xi * (E * X2 - D * Y2)
      c.call(f2mPrefix + "_mul", D, Y2, AUX),
      c.call(f2mPrefix + "_mul", E, X2, ELL_0),
      c.call(f2mPrefix + "_sub", ELL_0, AUX, ELL_0),
      c.call(f2mPrefix + "_mul", ELL_0, c.i32_const(pAltBn128Twist), ELL_0),
      // ell_VV = - E (later: * xP)
      c.call(f2mPrefix + "_neg", E, ELL_VV)
      // ell_VW = D (later: * yP    )
      // Already assigned
    );
  }
  function buildPrepDoubleStep() {
    const f = module.addFunction(prefix + "_prepDblStep");
    f.addParam("pR", "i32");
    f.addParam("pCoef", "i32");
    const c = f.getCodeBuilder();
    const X1 = c.getLocal("pR");
    const Y1 = c.i32_add(c.getLocal("pR"), c.i32_const(f2size));
    const Z1 = c.i32_add(c.getLocal("pR"), c.i32_const(2 * f2size));
    const ELL_0 = c.getLocal("pCoef");
    const ELL_VW = c.i32_add(c.getLocal("pCoef"), c.i32_const(f2size));
    const ELL_VV = c.i32_add(c.getLocal("pCoef"), c.i32_const(2 * f2size));
    const A = c.i32_const(module.alloc(f2size));
    const B = c.i32_const(module.alloc(f2size));
    const C = c.i32_const(module.alloc(f2size));
    const D = c.i32_const(module.alloc(f2size));
    const E = c.i32_const(module.alloc(f2size));
    const F = c.i32_const(module.alloc(f2size));
    const G = c.i32_const(module.alloc(f2size));
    const H = c.i32_const(module.alloc(f2size));
    const I = c.i32_const(module.alloc(f2size));
    const J = c.i32_const(module.alloc(f2size));
    const E2 = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      // A = X1 * Y1 / 2
      c.call(f2mPrefix + "_mul", Y1, c.i32_const(pTwoInv), A),
      c.call(f2mPrefix + "_mul", X1, A, A),
      // B = Y1^2
      c.call(f2mPrefix + "_square", Y1, B),
      // C = Z1^2
      c.call(f2mPrefix + "_square", Z1, C),
      // D = 3 * C
      c.call(f2mPrefix + "_add", C, C, D),
      c.call(f2mPrefix + "_add", D, C, D),
      // E = twist_b * D
      c.call(f2mPrefix + "_mul", c.i32_const(pTwistCoefB), D, E),
      // F = 3 * E
      c.call(f2mPrefix + "_add", E, E, F),
      c.call(f2mPrefix + "_add", E, F, F),
      // G = (B+F)/2
      c.call(f2mPrefix + "_add", B, F, G),
      c.call(f2mPrefix + "_mul", G, c.i32_const(pTwoInv), G),
      // H = (Y1+Z1)^2-(B+C)
      c.call(f2mPrefix + "_add", B, C, AUX),
      c.call(f2mPrefix + "_add", Y1, Z1, H),
      c.call(f2mPrefix + "_square", H, H),
      c.call(f2mPrefix + "_sub", H, AUX, H),
      // I = E-B
      c.call(f2mPrefix + "_sub", E, B, I),
      // J = X1^2
      c.call(f2mPrefix + "_square", X1, J),
      // E_squared = E^2
      c.call(f2mPrefix + "_square", E, E2),
      // X3 (X1) = A * (B-F)
      c.call(f2mPrefix + "_sub", B, F, AUX),
      c.call(f2mPrefix + "_mul", A, AUX, X1),
      // Y3 (Y1) = G^2 - 3*E^2
      c.call(f2mPrefix + "_add", E2, E2, AUX),
      c.call(f2mPrefix + "_add", E2, AUX, AUX),
      c.call(f2mPrefix + "_square", G, Y1),
      c.call(f2mPrefix + "_sub", Y1, AUX, Y1),
      // Z3 (Z1) = B * H
      c.call(f2mPrefix + "_mul", B, H, Z1),
      // ell_0 = xi * I
      c.call(f2mPrefix + "_mul", c.i32_const(pAltBn128Twist), I, ELL_0),
      // ell_VW = - H (later: * yP)
      c.call(f2mPrefix + "_neg", H, ELL_VW),
      // ell_VV = 3*J (later: * xP)
      c.call(f2mPrefix + "_add", J, J, ELL_VV),
      c.call(f2mPrefix + "_add", J, ELL_VV, ELL_VV)
    );
  }
  function buildMulByQ() {
    const f = module.addFunction(prefix + "_mulByQ");
    f.addParam("p1", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("p1");
    const y = c.i32_add(c.getLocal("p1"), c.i32_const(f2size));
    const z = c.i32_add(c.getLocal("p1"), c.i32_const(f2size * 2));
    const x3 = c.getLocal("pr");
    const y3 = c.i32_add(c.getLocal("pr"), c.i32_const(f2size));
    const z3 = c.i32_add(c.getLocal("pr"), c.i32_const(f2size * 2));
    const MulByQX = c.i32_const(module.alloc([
      ...utils$2.bigInt2BytesLE(toMontgomery("21575463638280843010398324269430826099269044274347216827212613867836435027261"), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery("10307601595873709700152284273816112264069230130616436755625194854815875713954"), f1size)
    ]));
    const MulByQY = c.i32_const(module.alloc([
      ...utils$2.bigInt2BytesLE(toMontgomery("2821565182194536844548159561693502659359617185244120367078079554186484126554"), f1size),
      ...utils$2.bigInt2BytesLE(toMontgomery("3505843767911556378687030309984248845540243509899259641013678093033130930403"), f1size)
    ]));
    f.addCode(
      // The frobeniusMap(1) in this field, is the conjugate
      c.call(f2mPrefix + "_conjugate", x, x3),
      c.call(f2mPrefix + "_mul", MulByQX, x3, x3),
      c.call(f2mPrefix + "_conjugate", y, y3),
      c.call(f2mPrefix + "_mul", MulByQY, y3, y3),
      c.call(f2mPrefix + "_conjugate", z, z3)
    );
  }
  function buildPrepareG2() {
    buildMulByQ();
    const f = module.addFunction(prefix + "_prepareG2");
    f.addParam("pQ", "i32");
    f.addParam("ppreQ", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const QX = c.getLocal("pQ");
    const pR = module.alloc(f2size * 3);
    const R = c.i32_const(pR);
    const RX = c.i32_const(pR);
    const RY = c.i32_const(pR + f2size);
    const RZ = c.i32_const(pR + 2 * f2size);
    const cQX = c.i32_add(c.getLocal("ppreQ"), c.i32_const(0));
    const cQY = c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size));
    const pQ1 = module.alloc(f2size * 3);
    const Q1 = c.i32_const(pQ1);
    const pQ2 = module.alloc(f2size * 3);
    const Q2 = c.i32_const(pQ2);
    const Q2Y = c.i32_const(pQ2 + f2size);
    f.addCode(
      c.call(g2mPrefix + "_normalize", QX, cQX),
      // TODO Remove if already in affine
      c.call(f2mPrefix + "_copy", cQX, RX),
      c.call(f2mPrefix + "_copy", cQY, RY),
      c.call(f2mPrefix + "_one", RZ)
    );
    f.addCode(
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3))),
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "_prepDblStep", R, c.getLocal("pCoef")),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(prefix + "_prepAddStep", cQX, R, c.getLocal("pCoef")),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
    f.addCode(
      c.call(prefix + "_mulByQ", cQX, Q1),
      c.call(prefix + "_mulByQ", Q1, Q2)
    );
    f.addCode(
      c.call(f2mPrefix + "_neg", Q2Y, Q2Y),
      c.call(prefix + "_prepAddStep", Q1, R, c.getLocal("pCoef")),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
      c.call(prefix + "_prepAddStep", Q2, R, c.getLocal("pCoef")),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
    );
  }
  function buildMulBy024Old() {
    const f = module.addFunction(prefix + "__mulBy024Old");
    f.addParam("pEll0", "i32");
    f.addParam("pEllVW", "i32");
    f.addParam("pEllVV", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("pEll0");
    const x2 = c.getLocal("pEllVV");
    const x4 = c.getLocal("pEllVW");
    const z0 = c.getLocal("pR");
    const pAUX12 = module.alloc(ftsize);
    const AUX12 = c.i32_const(pAUX12);
    const AUX12_0 = c.i32_const(pAUX12);
    const AUX12_2 = c.i32_const(pAUX12 + f2size);
    const AUX12_4 = c.i32_const(pAUX12 + f2size * 2);
    const AUX12_6 = c.i32_const(pAUX12 + f2size * 3);
    const AUX12_8 = c.i32_const(pAUX12 + f2size * 4);
    const AUX12_10 = c.i32_const(pAUX12 + f2size * 5);
    f.addCode(
      c.call(f2mPrefix + "_copy", x0, AUX12_0),
      c.call(f2mPrefix + "_zero", AUX12_2),
      c.call(f2mPrefix + "_copy", x2, AUX12_4),
      c.call(f2mPrefix + "_zero", AUX12_6),
      c.call(f2mPrefix + "_copy", x4, AUX12_8),
      c.call(f2mPrefix + "_zero", AUX12_10),
      c.call(ftmPrefix + "_mul", AUX12, z0, z0)
    );
  }
  function buildMulBy024() {
    const f = module.addFunction(prefix + "__mulBy024");
    f.addParam("pEll0", "i32");
    f.addParam("pEllVW", "i32");
    f.addParam("pEllVV", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("pEll0");
    const x2 = c.getLocal("pEllVV");
    const x4 = c.getLocal("pEllVW");
    const z0 = c.getLocal("pR");
    const z1 = c.i32_add(c.getLocal("pR"), c.i32_const(2 * n8));
    const z2 = c.i32_add(c.getLocal("pR"), c.i32_const(4 * n8));
    const z3 = c.i32_add(c.getLocal("pR"), c.i32_const(6 * n8));
    const z4 = c.i32_add(c.getLocal("pR"), c.i32_const(8 * n8));
    const z5 = c.i32_add(c.getLocal("pR"), c.i32_const(10 * n8));
    const t0 = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const s0 = c.i32_const(module.alloc(f2size));
    const T3 = c.i32_const(module.alloc(f2size));
    const T4 = c.i32_const(module.alloc(f2size));
    const D0 = c.i32_const(module.alloc(f2size));
    const D2 = c.i32_const(module.alloc(f2size));
    const D4 = c.i32_const(module.alloc(f2size));
    const S1 = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      // D0 = z0 * x0;
      c.call(f2mPrefix + "_mul", z0, x0, D0),
      // D2 = z2 * x2;
      c.call(f2mPrefix + "_mul", z2, x2, D2),
      // D4 = z4 * x4;
      c.call(f2mPrefix + "_mul", z4, x4, D4),
      // t2 = z0 + z4;
      c.call(f2mPrefix + "_add", z0, z4, t2),
      // t1 = z0 + z2;
      c.call(f2mPrefix + "_add", z0, z2, t1),
      // s0 = z1 + z3 + z5;
      c.call(f2mPrefix + "_add", z1, z3, s0),
      c.call(f2mPrefix + "_add", s0, z5, s0),
      // For z.a_.a_ = z0.
      // S1 = z1 * x2;
      c.call(f2mPrefix + "_mul", z1, x2, S1),
      // T3 = S1 + D4;
      c.call(f2mPrefix + "_add", S1, D4, T3),
      // T4 = my_Fp6::non_residue * T3 + D0;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      c.call(f2mPrefix + "_add", T4, D0, z0),
      // z0 = T4;
      // For z.a_.b_ = z1
      // T3 = z5 * x4;
      c.call(f2mPrefix + "_mul", z5, x4, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T3 = T3 + D2;
      c.call(f2mPrefix + "_add", T3, D2, T3),
      // T4 = my_Fp6::non_residue * T3;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      // T3 = z1 * x0;
      c.call(f2mPrefix + "_mul", z1, x0, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T4 = T4 + T3;
      c.call(f2mPrefix + "_add", T4, T3, z1),
      // z1 = T4;
      // For z.a_.c_ = z2
      // t0 = x0 + x2;
      c.call(f2mPrefix + "_add", x0, x2, t0),
      // T3 = t1 * t0 - D0 - D2;
      c.call(f2mPrefix + "_mul", t1, t0, T3),
      c.call(f2mPrefix + "_add", D0, D2, AUX),
      c.call(f2mPrefix + "_sub", T3, AUX, T3),
      // T4 = z3 * x4;
      c.call(f2mPrefix + "_mul", z3, x4, T4),
      // S1 = S1 + T4;
      c.call(f2mPrefix + "_add", S1, T4, S1),
      // For z.b_.a_ = z3 (z3 needs z2)
      // t0 = z2 + z4;
      c.call(f2mPrefix + "_add", z2, z4, t0),
      // T3 = T3 + T4;
      // z2 = T3;
      c.call(f2mPrefix + "_add", T3, T4, z2),
      // t1 = x2 + x4;
      c.call(f2mPrefix + "_add", x2, x4, t1),
      // T3 = t0 * t1 - D2 - D4;
      c.call(f2mPrefix + "_mul", t1, t0, T3),
      c.call(f2mPrefix + "_add", D2, D4, AUX),
      c.call(f2mPrefix + "_sub", T3, AUX, T3),
      // T4 = my_Fp6::non_residue * T3;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      // T3 = z3 * x0;
      c.call(f2mPrefix + "_mul", z3, x0, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T4 = T4 + T3;
      c.call(f2mPrefix + "_add", T4, T3, z3),
      // z3 = T4;
      // For z.b_.b_ = z4
      // T3 = z5 * x2;
      c.call(f2mPrefix + "_mul", z5, x2, T3),
      // S1 = S1 + T3;
      c.call(f2mPrefix + "_add", S1, T3, S1),
      // T4 = my_Fp6::non_residue * T3;
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), T3, T4),
      // t0 = x0 + x4;
      c.call(f2mPrefix + "_add", x0, x4, t0),
      // T3 = t2 * t0 - D0 - D4;
      c.call(f2mPrefix + "_mul", t2, t0, T3),
      c.call(f2mPrefix + "_add", D0, D4, AUX),
      c.call(f2mPrefix + "_sub", T3, AUX, T3),
      // T4 = T4 + T3;
      c.call(f2mPrefix + "_add", T4, T3, z4),
      // z4 = T4;
      // For z.b_.c_ = z5.
      // t0 = x0 + x2 + x4;
      c.call(f2mPrefix + "_add", x0, x2, t0),
      c.call(f2mPrefix + "_add", t0, x4, t0),
      // T3 = s0 * t0 - S1;
      c.call(f2mPrefix + "_mul", s0, t0, T3),
      c.call(f2mPrefix + "_sub", T3, S1, z5)
      // z5 = T3;
    );
  }
  function buildMillerLoop() {
    const f = module.addFunction(prefix + "_millerLoop");
    f.addParam("ppreP", "i32");
    f.addParam("ppreQ", "i32");
    f.addParam("r", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const preP_PX = c.getLocal("ppreP");
    const preP_PY = c.i32_add(c.getLocal("ppreP"), c.i32_const(f1size));
    const ELL_0 = c.getLocal("pCoef");
    const ELL_VW = c.i32_add(c.getLocal("pCoef"), c.i32_const(f2size));
    const ELL_VV = c.i32_add(c.getLocal("pCoef"), c.i32_const(2 * f2size));
    const pVW = module.alloc(f2size);
    const VW = c.i32_const(pVW);
    const pVV = module.alloc(f2size);
    const VV = c.i32_const(pVV);
    const F = c.getLocal("r");
    f.addCode(
      c.call(ftmPrefix + "_one", F),
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3))),
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(ftmPrefix + "_square", F, F),
        c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
        c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
        c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
            ...c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
            ...c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
    f.addCode(
      c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
      c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
      c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
      c.call(f2mPrefix + "_mul1", ELL_VW, preP_PY, VW),
      c.call(f2mPrefix + "_mul1", ELL_VV, preP_PX, VV),
      c.call(prefix + "__mulBy024", ELL_0, VW, VV, F),
      c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
    );
  }
  function buildFrobeniusMap(n) {
    const F12 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [8376118865763821496583973867626364092589906065868298776909617916018768340080n, 16469823323077808223889137241176536799009286646108169935659301613961712198316n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556617n, 0n],
        [11697423496358154304825782922584725312912383441159505038794027105778954184319n, 303847389135065887422783454877609941456349188919719272345083954437860409601n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556616n, 0n],
        [3321304630594332808241809054958361220322477375291206261884409189760185844239n, 5722266937896532885780051958958348231143373700109372999374820235121374419868n],
        [21888242871839275222246405745257275088696311157297823662689037894645226208582n, 0n],
        [13512124006075453725662431877630910996106405091429524885779419978626457868503n, 5418419548761466998357268504080738289687024511189653727029736280683514010267n],
        [2203960485148121921418603742825762020974279258880205651966n, 0n],
        [10190819375481120917420622822672549775783927716138318623895010788866272024264n, 21584395482704209334823622290379665147239961968378104390343953940207365798982n],
        [2203960485148121921418603742825762020974279258880205651967n, 0n],
        [18566938241244942414004596690298913868373833782006617400804628704885040364344n, 16165975933942742336466353786298926857552937457188450663314217659523851788715n]
      ]
    ];
    const F6 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [21575463638280843010398324269430826099269044274347216827212613867836435027261n, 10307601595873709700152284273816112264069230130616436755625194854815875713954n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556616n, 0n],
        [3772000881919853776433695186713858239009073593817195771773381919316419345261n, 2236595495967245188281701248203181795121068902605861227855261137820944008926n],
        [2203960485148121921418603742825762020974279258880205651966n, 0n],
        [18429021223477853657660792034369865839114504446431234726392080002137598044644n, 9344045779998320333812420223237981029506012124075525679208581902008406485703n]
      ],
      [
        [1n, 0n],
        [2581911344467009335267311115468803099551665605076196740867805258568234346338n, 19937756971775647987995932169929341994314640652964949448313374472400716661030n],
        [2203960485148121921418603742825762020974279258880205651966n, 0n],
        [5324479202449903542726783395506214481928257762400643279780343368557297135718n, 16208900380737693084919495127334387981393726419856888799917914180988844123039n],
        [21888242871839275220042445260109153167277707414472061641714758635765020556616n, 0n],
        [13981852324922362344252311234282257507216387789820983642040889267519694726527n, 7629828391165209371577384193250820201684255241773809077146787135900891633097n]
      ]
    ];
    const f = module.addFunction(prefix + "__frobeniusMap" + n);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < 6; i++) {
      const X = i == 0 ? c.getLocal("x") : c.i32_add(c.getLocal("x"), c.i32_const(i * f2size));
      const Xc0 = X;
      const Xc1 = c.i32_add(c.getLocal("x"), c.i32_const(i * f2size + f1size));
      const R = i == 0 ? c.getLocal("r") : c.i32_add(c.getLocal("r"), c.i32_const(i * f2size));
      const Rc0 = R;
      const Rc1 = c.i32_add(c.getLocal("r"), c.i32_const(i * f2size + f1size));
      const coef = mul2(F12[Math.floor(i / 3)][n % 12], F6[i % 3][n % 6]);
      const pCoef = module.alloc([
        ...utils$2.bigInt2BytesLE(toMontgomery(coef[0]), 32),
        ...utils$2.bigInt2BytesLE(toMontgomery(coef[1]), 32)
      ]);
      if (n % 2 == 1) {
        f.addCode(
          c.call(f1mPrefix + "_copy", Xc0, Rc0),
          c.call(f1mPrefix + "_neg", Xc1, Rc1),
          c.call(f2mPrefix + "_mul", R, c.i32_const(pCoef), R)
        );
      } else {
        f.addCode(c.call(f2mPrefix + "_mul", X, c.i32_const(pCoef), R));
      }
    }
    function mul2(a2, b) {
      const ac0 = BigInt(a2[0]);
      const ac1 = BigInt(a2[1]);
      const bc0 = BigInt(b[0]);
      const bc1 = BigInt(b[1]);
      const res = [
        (ac0 * bc0 - ac1 * bc1) % q,
        (ac0 * bc1 + ac1 * bc0) % q
      ];
      if (isNegative$2(res[0])) res[0] = res[0] + q;
      return res;
    }
  }
  function buildFinalExponentiationFirstChunk() {
    const f = module.addFunction(prefix + "__finalExponentiationFirstChunk");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const eltC0 = elt;
    const eltC1 = c.i32_add(elt, c.i32_const(n8 * 6));
    const r3 = c.getLocal("r");
    const pA = module.alloc(ftsize);
    const A = c.i32_const(pA);
    const Ac0 = A;
    const Ac1 = c.i32_const(pA + n8 * 6);
    const B = c.i32_const(module.alloc(ftsize));
    const C = c.i32_const(module.alloc(ftsize));
    const D = c.i32_const(module.alloc(ftsize));
    f.addCode(
      // const alt_bn128_Fq12 A = alt_bn128_Fq12(elt.c0,-elt.c1);
      c.call(f6mPrefix + "_copy", eltC0, Ac0),
      c.call(f6mPrefix + "_neg", eltC1, Ac1),
      // const alt_bn128_Fq12 B = elt.inverse();
      c.call(ftmPrefix + "_inverse", elt, B),
      // const alt_bn128_Fq12 C = A * B;
      c.call(ftmPrefix + "_mul", A, B, C),
      // const alt_bn128_Fq12 D = C.Frobenius_map(2);
      c.call(prefix + "__frobeniusMap2", C, D),
      // const alt_bn128_Fq12 result = D * C;
      c.call(ftmPrefix + "_mul", C, D, r3)
    );
  }
  function buildCyclotomicSquare() {
    const f = module.addFunction(prefix + "__cyclotomicSquare");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x4 = c.i32_add(c.getLocal("x"), c.i32_const(f2size));
    const x3 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f2size));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(3 * f2size));
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(4 * f2size));
    const x5 = c.i32_add(c.getLocal("x"), c.i32_const(5 * f2size));
    const r0 = c.getLocal("r");
    const r4 = c.i32_add(c.getLocal("r"), c.i32_const(f2size));
    const r3 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f2size));
    const r22 = c.i32_add(c.getLocal("r"), c.i32_const(3 * f2size));
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(4 * f2size));
    const r5 = c.i32_add(c.getLocal("r"), c.i32_const(5 * f2size));
    const t0 = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t3 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    const tmp = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      //    // t0 + t1*y = (z0 + z1*y)^2 = a^2
      //    tmp = z0 * z1;
      //    t0 = (z0 + z1) * (z0 + my_Fp6::non_residue * z1) - tmp - my_Fp6::non_residue * tmp;
      //    t1 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x0, x1, tmp),
      c.call(f2mPrefix + "_mul", x1, c.i32_const(pNonResidueF6), t0),
      c.call(f2mPrefix + "_add", x0, t0, t0),
      c.call(f2mPrefix + "_add", x0, x1, AUX),
      c.call(f2mPrefix + "_mul", AUX, t0, t0),
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t0, AUX, t0),
      c.call(f2mPrefix + "_add", tmp, tmp, t1),
      //  // t2 + t3*y = (z2 + z3*y)^2 = b^2
      //  tmp = z2 * z3;
      //  t2 = (z2 + z3) * (z2 + my_Fp6::non_residue * z3) - tmp - my_Fp6::non_residue * tmp;
      //  t3 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x2, x3, tmp),
      c.call(f2mPrefix + "_mul", x3, c.i32_const(pNonResidueF6), t2),
      c.call(f2mPrefix + "_add", x2, t2, t2),
      c.call(f2mPrefix + "_add", x2, x3, AUX),
      c.call(f2mPrefix + "_mul", AUX, t2, t2),
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t2, AUX, t2),
      c.call(f2mPrefix + "_add", tmp, tmp, t3),
      //  // t4 + t5*y = (z4 + z5*y)^2 = c^2
      //  tmp = z4 * z5;
      //  t4 = (z4 + z5) * (z4 + my_Fp6::non_residue * z5) - tmp - my_Fp6::non_residue * tmp;
      //  t5 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x4, x5, tmp),
      c.call(f2mPrefix + "_mul", x5, c.i32_const(pNonResidueF6), t4),
      c.call(f2mPrefix + "_add", x4, t4, t4),
      c.call(f2mPrefix + "_add", x4, x5, AUX),
      c.call(f2mPrefix + "_mul", AUX, t4, t4),
      c.call(f2mPrefix + "_mul", c.i32_const(pNonResidueF6), tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t4, AUX, t4),
      c.call(f2mPrefix + "_add", tmp, tmp, t5),
      // For A
      // z0 = 3 * t0 - 2 * z0
      c.call(f2mPrefix + "_sub", t0, x0, r0),
      c.call(f2mPrefix + "_add", r0, r0, r0),
      c.call(f2mPrefix + "_add", t0, r0, r0),
      // z1 = 3 * t1 + 2 * z1
      c.call(f2mPrefix + "_add", t1, x1, r1),
      c.call(f2mPrefix + "_add", r1, r1, r1),
      c.call(f2mPrefix + "_add", t1, r1, r1),
      // For B
      // z2 = 3 * (xi * t5) + 2 * z2
      c.call(f2mPrefix + "_mul", t5, c.i32_const(pAltBn128Twist), AUX),
      c.call(f2mPrefix + "_add", AUX, x2, r22),
      c.call(f2mPrefix + "_add", r22, r22, r22),
      c.call(f2mPrefix + "_add", AUX, r22, r22),
      // z3 = 3 * t4 - 2 * z3
      c.call(f2mPrefix + "_sub", t4, x3, r3),
      c.call(f2mPrefix + "_add", r3, r3, r3),
      c.call(f2mPrefix + "_add", t4, r3, r3),
      // For C
      // z4 = 3 * t2 - 2 * z4
      c.call(f2mPrefix + "_sub", t2, x4, r4),
      c.call(f2mPrefix + "_add", r4, r4, r4),
      c.call(f2mPrefix + "_add", t2, r4, r4),
      // z5 = 3 * t3 + 2 * z5
      c.call(f2mPrefix + "_add", t3, x5, r5),
      c.call(f2mPrefix + "_add", r5, r5, r5),
      c.call(f2mPrefix + "_add", t3, r5, r5)
    );
  }
  function buildCyclotomicExp(exponent, fnName) {
    const exponentNafBytes = naf2(exponent).map((b) => b == -1 ? 255 : b);
    const pExponentNafBytes = module.alloc(exponentNafBytes);
    const f = module.addFunction(prefix + "__cyclotomicExp_" + fnName);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("bit", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("x");
    const res = c.getLocal("r");
    const inverse = c.i32_const(module.alloc(ftsize));
    f.addCode(
      c.call(ftmPrefix + "_conjugate", x, inverse),
      c.call(ftmPrefix + "_one", res),
      c.if(
        c.teeLocal("bit", c.i32_load8_s(c.i32_const(exponentNafBytes.length - 1), pExponentNafBytes)),
        c.if(
          c.i32_eq(
            c.getLocal("bit"),
            c.i32_const(1)
          ),
          c.call(ftmPrefix + "_mul", res, x, res),
          c.call(ftmPrefix + "_mul", res, inverse, res)
        )
      ),
      c.setLocal("i", c.i32_const(exponentNafBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "__cyclotomicSquare", res, res),
        c.if(
          c.teeLocal("bit", c.i32_load8_s(c.getLocal("i"), pExponentNafBytes)),
          c.if(
            c.i32_eq(
              c.getLocal("bit"),
              c.i32_const(1)
            ),
            c.call(ftmPrefix + "_mul", res, x, res),
            c.call(ftmPrefix + "_mul", res, inverse, res)
          )
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildFinalExponentiationLastChunk() {
    buildCyclotomicSquare();
    buildCyclotomicExp(finalExpZ, "w0");
    const f = module.addFunction(prefix + "__finalExponentiationLastChunk");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const result2 = c.getLocal("r");
    const A = c.i32_const(module.alloc(ftsize));
    const B = c.i32_const(module.alloc(ftsize));
    const C = c.i32_const(module.alloc(ftsize));
    const D = c.i32_const(module.alloc(ftsize));
    const E = c.i32_const(module.alloc(ftsize));
    const F = c.i32_const(module.alloc(ftsize));
    const G = c.i32_const(module.alloc(ftsize));
    const H = c.i32_const(module.alloc(ftsize));
    const I = c.i32_const(module.alloc(ftsize));
    const J = c.i32_const(module.alloc(ftsize));
    const K = c.i32_const(module.alloc(ftsize));
    const L = c.i32_const(module.alloc(ftsize));
    const M = c.i32_const(module.alloc(ftsize));
    const N = c.i32_const(module.alloc(ftsize));
    const O = c.i32_const(module.alloc(ftsize));
    const P = c.i32_const(module.alloc(ftsize));
    const Q = c.i32_const(module.alloc(ftsize));
    const R = c.i32_const(module.alloc(ftsize));
    const S = c.i32_const(module.alloc(ftsize));
    const T = c.i32_const(module.alloc(ftsize));
    const U = c.i32_const(module.alloc(ftsize));
    f.addCode(
      // A = exp_by_neg_z(elt)  // = elt^(-z)
      c.call(prefix + "__cyclotomicExp_w0", elt, A),
      c.call(ftmPrefix + "_conjugate", A, A),
      // B = A^2                // = elt^(-2*z)
      c.call(prefix + "__cyclotomicSquare", A, B),
      // C = B^2                // = elt^(-4*z)
      c.call(prefix + "__cyclotomicSquare", B, C),
      // D = C * B              // = elt^(-6*z)
      c.call(ftmPrefix + "_mul", C, B, D),
      // E = exp_by_neg_z(D)    // = elt^(6*z^2)
      c.call(prefix + "__cyclotomicExp_w0", D, E),
      c.call(ftmPrefix + "_conjugate", E, E),
      // F = E^2                // = elt^(12*z^2)
      c.call(prefix + "__cyclotomicSquare", E, F),
      // G = epx_by_neg_z(F)    // = elt^(-12*z^3)
      c.call(prefix + "__cyclotomicExp_w0", F, G),
      c.call(ftmPrefix + "_conjugate", G, G),
      // H = conj(D)            // = elt^(6*z)
      c.call(ftmPrefix + "_conjugate", D, H),
      // I = conj(G)            // = elt^(12*z^3)
      c.call(ftmPrefix + "_conjugate", G, I),
      // J = I * E              // = elt^(12*z^3 + 6*z^2)
      c.call(ftmPrefix + "_mul", I, E, J),
      // K = J * H              // = elt^(12*z^3 + 6*z^2 + 6*z)
      c.call(ftmPrefix + "_mul", J, H, K),
      // L = K * B              // = elt^(12*z^3 + 6*z^2 + 4*z)
      c.call(ftmPrefix + "_mul", K, B, L),
      // M = K * E              // = elt^(12*z^3 + 12*z^2 + 6*z)
      c.call(ftmPrefix + "_mul", K, E, M),
      // N = M * elt            // = elt^(12*z^3 + 12*z^2 + 6*z + 1)
      c.call(ftmPrefix + "_mul", M, elt, N),
      // O = L.Frobenius_map(1) // = elt^(q*(12*z^3 + 6*z^2 + 4*z))
      c.call(prefix + "__frobeniusMap1", L, O),
      // P = O * N              // = elt^(q*(12*z^3 + 6*z^2 + 4*z) * (12*z^3 + 12*z^2 + 6*z + 1))
      c.call(ftmPrefix + "_mul", O, N, P),
      // Q = K.Frobenius_map(2) // = elt^(q^2 * (12*z^3 + 6*z^2 + 6*z))
      c.call(prefix + "__frobeniusMap2", K, Q),
      // R = Q * P              // = elt^(q^2 * (12*z^3 + 6*z^2 + 6*z) + q*(12*z^3 + 6*z^2 + 4*z) * (12*z^3 + 12*z^2 + 6*z + 1))
      c.call(ftmPrefix + "_mul", Q, P, R),
      // S = conj(elt)          // = elt^(-1)
      c.call(ftmPrefix + "_conjugate", elt, S),
      // T = S * L              // = elt^(12*z^3 + 6*z^2 + 4*z - 1)
      c.call(ftmPrefix + "_mul", S, L, T),
      // U = T.Frobenius_map(3) // = elt^(q^3(12*z^3 + 6*z^2 + 4*z - 1))
      c.call(prefix + "__frobeniusMap3", T, U),
      // V = U * R              // = elt^(q^3(12*z^3 + 6*z^2 + 4*z - 1) + q^2 * (12*z^3 + 6*z^2 + 6*z) + q*(12*z^3 + 6*z^2 + 4*z) * (12*z^3 + 12*z^2 + 6*z + 1))
      c.call(ftmPrefix + "_mul", U, R, result2)
      // result = V
    );
  }
  function buildFinalExponentiation() {
    buildFinalExponentiationFirstChunk();
    buildFinalExponentiationLastChunk();
    const f = module.addFunction(prefix + "_finalExponentiation");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const result2 = c.getLocal("r");
    const eltToFirstChunk = c.i32_const(module.alloc(ftsize));
    f.addCode(
      c.call(prefix + "__finalExponentiationFirstChunk", elt, eltToFirstChunk),
      c.call(prefix + "__finalExponentiationLastChunk", eltToFirstChunk, result2)
    );
  }
  function buildFinalExponentiationOld() {
    const f = module.addFunction(prefix + "_finalExponentiationOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const exponent = 552484233613224096312617126783173147097382103762957654188882734314196910839907541213974502761540629817009608548654680343627701153829446747810907373256841551006201639677726139946029199968412598804882391702273019083653272047566316584365559776493027495458238373902875937659943504873220554161550525926302303331747463515644711876653177129578303191095900909191624817826566688241804408081892785725967931714097716709526092261278071952560171111444072049229123565057483750161460024353346284167282452756217662335528813519139808291170539072125381230815729071544861602750936964829313608137325426383735122175229541155376346436093930287402089517426973178917569713384748081827255472576937471496195752727188261435633271238710131736096299798168852925540549342330775279877006784354801422249722573783561685179618816480037695005515426162362431072245638324744480n;
    const pExponent = module.alloc(utils$2.bigInt2BytesLE(exponent, 352));
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(ftmPrefix + "_exp", c.getLocal("x"), c.i32_const(pExponent), c.i32_const(352), c.getLocal("r"))
    );
  }
  const pPreP = module.alloc(prePSize);
  const pPreQ = module.alloc(preQSize);
  function buildPairingEquation(nPairings) {
    const f = module.addFunction(prefix + "_pairingEq" + nPairings);
    for (let i = 0; i < nPairings; i++) {
      f.addParam("p_" + i, "i32");
      f.addParam("q_" + i, "i32");
    }
    f.addParam("c", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    const auxT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(ftmPrefix + "_one", resT));
    for (let i = 0; i < nPairings; i++) {
      f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p_" + i), c.i32_const(pPreP)));
      f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q_" + i), c.i32_const(pPreQ)));
      f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), auxT));
      f.addCode(c.call(ftmPrefix + "_mul", resT, auxT, resT));
    }
    f.addCode(c.call(prefix + "_finalExponentiation", resT, resT));
    f.addCode(c.call(ftmPrefix + "_eq", resT, c.getLocal("c")));
  }
  function buildPairing2() {
    const f = module.addFunction(prefix + "_pairing");
    f.addParam("p", "i32");
    f.addParam("q", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p"), c.i32_const(pPreP)));
    f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q"), c.i32_const(pPreQ)));
    f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), resT));
    f.addCode(c.call(prefix + "_finalExponentiation", resT, c.getLocal("r")));
  }
  buildPrepAddStep();
  buildPrepDoubleStep();
  buildPrepareG1();
  buildPrepareG2();
  buildMulBy024();
  buildMulBy024Old();
  buildMillerLoop();
  for (let i = 0; i < 10; i++) {
    buildFrobeniusMap(i);
    module.exportFunction(prefix + "__frobeniusMap" + i);
  }
  buildFinalExponentiationOld();
  buildFinalExponentiation();
  for (let i = 1; i <= 5; i++) {
    buildPairingEquation(i);
    module.exportFunction(prefix + "_pairingEq" + i);
  }
  buildPairing2();
  module.exportFunction(prefix + "_pairing");
  module.exportFunction(prefix + "_prepareG1");
  module.exportFunction(prefix + "_prepareG2");
  module.exportFunction(prefix + "_millerLoop");
  module.exportFunction(prefix + "_finalExponentiation");
  module.exportFunction(prefix + "_finalExponentiationOld");
  module.exportFunction(prefix + "__mulBy024");
  module.exportFunction(prefix + "__mulBy024Old");
  module.exportFunction(prefix + "__cyclotomicSquare");
  module.exportFunction(prefix + "__cyclotomicExp_w0");
};
var utils$1 = utils$6;
var buildF1m2 = build_f1m;
var buildF12 = build_f1;
var buildF2m2 = build_f2m;
var buildF3m2 = build_f3m;
var buildCurve2 = build_curve_jacobian_a0;
var buildFFT$1 = build_fft;
var buildPol2 = build_pol;
var buildQAP2 = build_qap;
var buildApplyKey2 = build_applykey;
var { bitLength: bitLength$1, isOdd, isNegative: isNegative$1 } = bigint;
var build_bls12381 = function buildBLS12381(module, _prefix) {
  const prefix = _prefix || "bls12381";
  if (module.modules[prefix]) return prefix;
  const q = 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn;
  const r2 = 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n;
  const n64q = Math.floor((bitLength$1(q - 1n) - 1) / 64) + 1;
  const n8q = n64q * 8;
  const f1size = n8q;
  const f2size = f1size * 2;
  const ftsize = f1size * 12;
  const n64r = Math.floor((bitLength$1(r2 - 1n) - 1) / 64) + 1;
  const n8r = n64r * 8;
  const frsize = n8r;
  const pr = module.alloc(utils$1.bigInt2BytesLE(r2, frsize));
  const f1mPrefix = buildF1m2(module, q, "f1m", "intq");
  buildF12(module, r2, "fr", "frm", "intr");
  const pG1b = module.alloc(utils$1.bigInt2BytesLE(toMontgomery(4n), f1size));
  const g1mPrefix = buildCurve2(module, "g1m", "f1m", pG1b);
  buildFFT$1(module, "frm", "frm", "frm", "frm_mul");
  buildPol2(module, "pol", "frm");
  buildQAP2(module, "qap", "frm");
  const f2mPrefix = buildF2m2(module, "f1m_neg", "f2m", "f1m");
  const pG2b = module.alloc([
    ...utils$1.bigInt2BytesLE(toMontgomery(4n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(4n), f1size)
  ]);
  const g2mPrefix = buildCurve2(module, "g2m", "f2m", pG2b);
  function buildGTimesFr(fnName, opMul) {
    const f = module.addFunction(fnName);
    f.addParam("pG", "i32");
    f.addParam("pFr", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const AUX = c.i32_const(module.alloc(n8r));
    f.addCode(
      c.call("frm_fromMontgomery", c.getLocal("pFr"), AUX),
      c.call(
        opMul,
        c.getLocal("pG"),
        AUX,
        c.i32_const(n8r),
        c.getLocal("pr")
      )
    );
    module.exportFunction(fnName);
  }
  buildGTimesFr("g1m_timesFr", "g1m_timesScalar");
  buildFFT$1(module, "g1m", "g1m", "frm", "g1m_timesFr");
  buildGTimesFr("g2m_timesFr", "g2m_timesScalar");
  buildFFT$1(module, "g2m", "g2m", "frm", "g2m_timesFr");
  buildGTimesFr("g1m_timesFrAffine", "g1m_timesScalarAffine");
  buildGTimesFr("g2m_timesFrAffine", "g2m_timesScalarAffine");
  buildApplyKey2(module, "frm_batchApplyKey", "fmr", "frm", n8r, n8r, n8r, "frm_mul");
  buildApplyKey2(module, "g1m_batchApplyKey", "g1m", "frm", n8q * 3, n8q * 3, n8r, "g1m_timesFr");
  buildApplyKey2(module, "g1m_batchApplyKeyMixed", "g1m", "frm", n8q * 2, n8q * 3, n8r, "g1m_timesFrAffine");
  buildApplyKey2(module, "g2m_batchApplyKey", "g2m", "frm", n8q * 2 * 3, n8q * 3 * 2, n8r, "g2m_timesFr");
  buildApplyKey2(module, "g2m_batchApplyKeyMixed", "g2m", "frm", n8q * 2 * 2, n8q * 3 * 2, n8r, "g2m_timesFrAffine");
  function toMontgomery(a2) {
    return BigInt(a2) * (1n << BigInt(f1size * 8)) % q;
  }
  const G1gen = [
    3685416753713387016781088315183077757961620795782546409894578378688607592378376318836054947676345821548104185464507n,
    1339506544944476473020471379941921221584933875938349620426543736416511423956333506472724655353366534992391756441569n,
    1n
  ];
  const pG1gen = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G1gen[0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1gen[1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1gen[2]), f1size)
    ]
  );
  const G1zero = [
    0n,
    1n,
    0n
  ];
  const pG1zero = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G1zero[0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1zero[1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G1zero[2]), f1size)
    ]
  );
  const G2gen = [
    [
      352701069587466618187139116011060144890029952792775240219908644239793785735715026873347600343865175952761926303160n,
      3059144344244213709971259814753781636986470325476647558659373206291635324768958432433509563104347017837885763365758n
    ],
    [
      1985150602287291935568054521177171638300868978215655730859378665066344726373823718423869104263333984641494340347905n,
      927553665492332455747201965776037880757740193453592970025027978793976877002675564980949289727957565575433344219582n
    ],
    [
      1n,
      0n
    ]
  ];
  const pG2gen = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[0][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[0][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[1][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[1][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[2][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2gen[2][1]), f1size)
    ]
  );
  const G2zero = [
    [
      0n,
      0n
    ],
    [
      1n,
      0n
    ],
    [
      0n,
      0n
    ]
  ];
  const pG2zero = module.alloc(
    [
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[0][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[0][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[1][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[1][1]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[2][0]), f1size),
      ...utils$1.bigInt2BytesLE(toMontgomery(G2zero[2][1]), f1size)
    ]
  );
  const pOneT = module.alloc([
    ...utils$1.bigInt2BytesLE(toMontgomery(1n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(0n), f1size)
  ]);
  const pBls12381Twist = module.alloc([
    ...utils$1.bigInt2BytesLE(toMontgomery(1n), f1size),
    ...utils$1.bigInt2BytesLE(toMontgomery(1n), f1size)
  ]);
  function build_mulNR2() {
    const f = module.addFunction(f2mPrefix + "_mulNR");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const x0c = c.i32_const(module.alloc(f1size));
    const x0 = c.getLocal("x");
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(f1size));
    const r0 = c.getLocal("pr");
    const r1 = c.i32_add(c.getLocal("pr"), c.i32_const(f1size));
    f.addCode(
      c.call(f1mPrefix + "_copy", x0, x0c),
      c.call(f1mPrefix + "_sub", x0, x1, r0),
      c.call(f1mPrefix + "_add", x0c, x1, r1)
    );
  }
  build_mulNR2();
  const f6mPrefix = buildF3m2(module, f2mPrefix + "_mulNR", "f6m", "f2m");
  function build_mulNR6() {
    const f = module.addFunction(f6mPrefix + "_mulNR");
    f.addParam("x", "i32");
    f.addParam("pr", "i32");
    const c = f.getCodeBuilder();
    const c0copy = c.i32_const(module.alloc(f1size * 2));
    f.addCode(
      c.call(
        f2mPrefix + "_copy",
        c.getLocal("x"),
        c0copy
      ),
      c.call(
        f2mPrefix + "_mulNR",
        c.i32_add(c.getLocal("x"), c.i32_const(n8q * 4)),
        c.getLocal("pr")
      ),
      c.call(
        f2mPrefix + "_copy",
        c.i32_add(c.getLocal("x"), c.i32_const(n8q * 2)),
        c.i32_add(c.getLocal("pr"), c.i32_const(n8q * 4))
      ),
      c.call(
        f2mPrefix + "_copy",
        c0copy,
        c.i32_add(c.getLocal("pr"), c.i32_const(n8q * 2))
      )
    );
  }
  build_mulNR6();
  const ftmPrefix = buildF2m2(module, f6mPrefix + "_mulNR", "ftm", f6mPrefix);
  const ateLoopCount = 0xd201000000010000n;
  const ateLoopBitBytes = bits3(ateLoopCount);
  const pAteLoopBitBytes = module.alloc(ateLoopBitBytes);
  const ateCoefSize = 3 * f2size;
  const ateNDblCoefs = ateLoopBitBytes.length - 1;
  const ateNAddCoefs = ateLoopBitBytes.reduce((acc, b) => acc + (b != 0 ? 1 : 0), 0);
  const ateNCoefs = ateNAddCoefs + ateNDblCoefs + 1;
  const prePSize = 3 * 2 * n8q;
  const preQSize = 3 * n8q * 2 + ateNCoefs * ateCoefSize;
  const finalExpIsNegative = true;
  const finalExpZ = 15132376222941642752n;
  module.modules[prefix] = {
    n64q,
    n64r,
    n8q,
    n8r,
    pG1gen,
    pG1zero,
    pG1b,
    pG2gen,
    pG2zero,
    pG2b,
    pq: module.modules["f1m"].pq,
    pr,
    pOneT,
    r: r2,
    q,
    prePSize,
    preQSize
  };
  function naf2(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd(E)) {
        const z = 2 - Number(E % 4n);
        res.push(z);
        E = E - BigInt(z);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function bits3(n) {
    let E = n;
    const res = [];
    while (E > 0n) {
      if (isOdd(E)) {
        res.push(1);
      } else {
        res.push(0);
      }
      E = E >> 1n;
    }
    return res;
  }
  function buildPrepareG1() {
    const f = module.addFunction(prefix + "_prepareG1");
    f.addParam("pP", "i32");
    f.addParam("ppreP", "i32");
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(g1mPrefix + "_normalize", c.getLocal("pP"), c.getLocal("ppreP"))
      // TODO Remove if already in affine
    );
  }
  function buildPrepDoubleStep() {
    const f = module.addFunction(prefix + "_prepDblStep");
    f.addParam("R", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const Rx = c.getLocal("R");
    const Ry = c.i32_add(c.getLocal("R"), c.i32_const(2 * n8q));
    const Rz = c.i32_add(c.getLocal("R"), c.i32_const(4 * n8q));
    const t0 = c.getLocal("r");
    const t3 = c.i32_add(c.getLocal("r"), c.i32_const(2 * n8q));
    const t6 = c.i32_add(c.getLocal("r"), c.i32_const(4 * n8q));
    const zsquared = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    f.addCode(
      // tmp0 = r.x.square();
      c.call(f2mPrefix + "_square", Rx, t0),
      // tmp1 = r.y.square();
      c.call(f2mPrefix + "_square", Ry, t1),
      // tmp2 = tmp1.square();
      c.call(f2mPrefix + "_square", t1, t2),
      // tmp3 = (tmp1 + r.x).square() - tmp0 - tmp2;
      c.call(f2mPrefix + "_add", t1, Rx, t3),
      c.call(f2mPrefix + "_square", t3, t3),
      c.call(f2mPrefix + "_sub", t3, t0, t3),
      c.call(f2mPrefix + "_sub", t3, t2, t3),
      // tmp3 = tmp3 + tmp3;
      c.call(f2mPrefix + "_add", t3, t3, t3),
      // tmp4 = tmp0 + tmp0 + tmp0;
      c.call(f2mPrefix + "_add", t0, t0, t4),
      c.call(f2mPrefix + "_add", t4, t0, t4),
      // tmp6 = r.x + tmp4;
      c.call(f2mPrefix + "_add", Rx, t4, t6),
      // tmp5 = tmp4.square();
      c.call(f2mPrefix + "_square", t4, t5),
      // zsquared = r.z.square();
      c.call(f2mPrefix + "_square", Rz, zsquared),
      // r.x = tmp5 - tmp3 - tmp3;
      c.call(f2mPrefix + "_sub", t5, t3, Rx),
      c.call(f2mPrefix + "_sub", Rx, t3, Rx),
      // r.z = (r.z + r.y).square() - tmp1 - zsquared;
      c.call(f2mPrefix + "_add", Rz, Ry, Rz),
      c.call(f2mPrefix + "_square", Rz, Rz),
      c.call(f2mPrefix + "_sub", Rz, t1, Rz),
      c.call(f2mPrefix + "_sub", Rz, zsquared, Rz),
      // r.y = (tmp3 - r.x) * tmp4;
      c.call(f2mPrefix + "_sub", t3, Rx, Ry),
      c.call(f2mPrefix + "_mul", Ry, t4, Ry),
      // tmp2 = tmp2 + tmp2;
      c.call(f2mPrefix + "_add", t2, t2, t2),
      // tmp2 = tmp2 + tmp2;
      c.call(f2mPrefix + "_add", t2, t2, t2),
      // tmp2 = tmp2 + tmp2;
      c.call(f2mPrefix + "_add", t2, t2, t2),
      // r.y -= tmp2;
      c.call(f2mPrefix + "_sub", Ry, t2, Ry),
      // tmp3 = tmp4 * zsquared;
      c.call(f2mPrefix + "_mul", t4, zsquared, t3),
      // tmp3 = tmp3 + tmp3;
      c.call(f2mPrefix + "_add", t3, t3, t3),
      // tmp3 = -tmp3;
      c.call(f2mPrefix + "_neg", t3, t3),
      // tmp6 = tmp6.square() - tmp0 - tmp5;
      c.call(f2mPrefix + "_square", t6, t6),
      c.call(f2mPrefix + "_sub", t6, t0, t6),
      c.call(f2mPrefix + "_sub", t6, t5, t6),
      // tmp1 = tmp1 + tmp1;
      c.call(f2mPrefix + "_add", t1, t1, t1),
      // tmp1 = tmp1 + tmp1;
      c.call(f2mPrefix + "_add", t1, t1, t1),
      // tmp6 = tmp6 - tmp1;
      c.call(f2mPrefix + "_sub", t6, t1, t6),
      // tmp0 = r.z * zsquared;
      c.call(f2mPrefix + "_mul", Rz, zsquared, t0),
      // tmp0 = tmp0 + tmp0;
      c.call(f2mPrefix + "_add", t0, t0, t0)
    );
  }
  function buildPrepAddStep() {
    const f = module.addFunction(prefix + "_prepAddStep");
    f.addParam("R", "i32");
    f.addParam("Q", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const Rx = c.getLocal("R");
    const Ry = c.i32_add(c.getLocal("R"), c.i32_const(2 * n8q));
    const Rz = c.i32_add(c.getLocal("R"), c.i32_const(4 * n8q));
    const Qx = c.getLocal("Q");
    const Qy = c.i32_add(c.getLocal("Q"), c.i32_const(2 * n8q));
    const t10 = c.getLocal("r");
    const t1 = c.i32_add(c.getLocal("r"), c.i32_const(2 * n8q));
    const t9 = c.i32_add(c.getLocal("r"), c.i32_const(4 * n8q));
    const zsquared = c.i32_const(module.alloc(f2size));
    const ysquared = c.i32_const(module.alloc(f2size));
    const ztsquared = c.i32_const(module.alloc(f2size));
    const t0 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t3 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    const t6 = c.i32_const(module.alloc(f2size));
    const t7 = c.i32_const(module.alloc(f2size));
    const t8 = c.i32_const(module.alloc(f2size));
    f.addCode(
      // zsquared = r.z.square();
      c.call(f2mPrefix + "_square", Rz, zsquared),
      // ysquared = q.y.square();
      c.call(f2mPrefix + "_square", Qy, ysquared),
      // t0 = zsquared * q.x;
      c.call(f2mPrefix + "_mul", zsquared, Qx, t0),
      // t1 = ((q.y + r.z).square() - ysquared - zsquared) * zsquared;
      c.call(f2mPrefix + "_add", Qy, Rz, t1),
      c.call(f2mPrefix + "_square", t1, t1),
      c.call(f2mPrefix + "_sub", t1, ysquared, t1),
      c.call(f2mPrefix + "_sub", t1, zsquared, t1),
      c.call(f2mPrefix + "_mul", t1, zsquared, t1),
      // t2 = t0 - r.x;
      c.call(f2mPrefix + "_sub", t0, Rx, t2),
      // t3 = t2.square();
      c.call(f2mPrefix + "_square", t2, t3),
      // t4 = t3 + t3;
      c.call(f2mPrefix + "_add", t3, t3, t4),
      // t4 = t4 + t4;
      c.call(f2mPrefix + "_add", t4, t4, t4),
      // t5 = t4 * t2;
      c.call(f2mPrefix + "_mul", t4, t2, t5),
      // t6 = t1 - r.y - r.y;
      c.call(f2mPrefix + "_sub", t1, Ry, t6),
      c.call(f2mPrefix + "_sub", t6, Ry, t6),
      // t9 = t6 * q.x;
      c.call(f2mPrefix + "_mul", t6, Qx, t9),
      // t7 = t4 * r.x;
      c.call(f2mPrefix + "_mul", t4, Rx, t7),
      // r.x = t6.square() - t5 - t7 - t7;
      c.call(f2mPrefix + "_square", t6, Rx),
      c.call(f2mPrefix + "_sub", Rx, t5, Rx),
      c.call(f2mPrefix + "_sub", Rx, t7, Rx),
      c.call(f2mPrefix + "_sub", Rx, t7, Rx),
      // r.z = (r.z + t2).square() - zsquared - t3;
      c.call(f2mPrefix + "_add", Rz, t2, Rz),
      c.call(f2mPrefix + "_square", Rz, Rz),
      c.call(f2mPrefix + "_sub", Rz, zsquared, Rz),
      c.call(f2mPrefix + "_sub", Rz, t3, Rz),
      // t10 = q.y + r.z;
      c.call(f2mPrefix + "_add", Qy, Rz, t10),
      // t8 = (t7 - r.x) * t6;
      c.call(f2mPrefix + "_sub", t7, Rx, t8),
      c.call(f2mPrefix + "_mul", t8, t6, t8),
      // t0 = r.y * t5;
      c.call(f2mPrefix + "_mul", Ry, t5, t0),
      // t0 = t0 + t0;
      c.call(f2mPrefix + "_add", t0, t0, t0),
      // r.y = t8 - t0;
      c.call(f2mPrefix + "_sub", t8, t0, Ry),
      // t10 = t10.square() - ysquared;
      c.call(f2mPrefix + "_square", t10, t10),
      c.call(f2mPrefix + "_sub", t10, ysquared, t10),
      // ztsquared = r.z.square();
      c.call(f2mPrefix + "_square", Rz, ztsquared),
      // t10 = t10 - ztsquared;
      c.call(f2mPrefix + "_sub", t10, ztsquared, t10),
      // t9 = t9 + t9 - t10;
      c.call(f2mPrefix + "_add", t9, t9, t9),
      c.call(f2mPrefix + "_sub", t9, t10, t9),
      // t10 = r.z + r.z;
      c.call(f2mPrefix + "_add", Rz, Rz, t10),
      // t6 = -t6;
      c.call(f2mPrefix + "_neg", t6, t6),
      // t1 = t6 + t6;
      c.call(f2mPrefix + "_add", t6, t6, t1)
    );
  }
  function buildPrepareG2() {
    const f = module.addFunction(prefix + "_prepareG2");
    f.addParam("pQ", "i32");
    f.addParam("ppreQ", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const Q = c.getLocal("pQ");
    const pR = module.alloc(f2size * 3);
    const R = c.i32_const(pR);
    const base = c.getLocal("ppreQ");
    f.addCode(
      c.call(g2mPrefix + "_normalize", Q, base),
      c.if(
        c.call(g2mPrefix + "_isZero", base),
        c.ret([])
      ),
      c.call(g2mPrefix + "_copy", base, R),
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3)))
    );
    f.addCode(
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "_prepDblStep", R, c.getLocal("pCoef")),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(prefix + "_prepAddStep", R, base, c.getLocal("pCoef")),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
  }
  function buildF6Mul1() {
    const f = module.addFunction(f6mPrefix + "_mul1");
    f.addParam("pA", "i32");
    f.addParam("pC1", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const A_c0 = c.getLocal("pA");
    const A_c1 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 2));
    const A_c2 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 4));
    const c1 = c.getLocal("pC1");
    const t1 = c.getLocal("pR");
    const t2 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 2));
    const b_b = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 4));
    const Ac0_Ac1 = c.i32_const(module.alloc(f1size * 2));
    const Ac1_Ac2 = c.i32_const(module.alloc(f1size * 2));
    f.addCode(
      c.call(f2mPrefix + "_add", A_c0, A_c1, Ac0_Ac1),
      c.call(f2mPrefix + "_add", A_c1, A_c2, Ac1_Ac2),
      // let b_b = self.c1 * c1;
      c.call(f2mPrefix + "_mul", A_c1, c1, b_b),
      // let t1 = (self.c1 + self.c2) * c1 - b_b;
      c.call(f2mPrefix + "_mul", Ac1_Ac2, c1, t1),
      c.call(f2mPrefix + "_sub", t1, b_b, t1),
      // let t1 = t1.mul_by_nonresidue();
      c.call(f2mPrefix + "_mulNR", t1, t1),
      // let t2 = (self.c0 + self.c1) * c1 - b_b;
      c.call(f2mPrefix + "_mul", Ac0_Ac1, c1, t2),
      c.call(f2mPrefix + "_sub", t2, b_b, t2)
    );
  }
  buildF6Mul1();
  function buildF6Mul01() {
    const f = module.addFunction(f6mPrefix + "_mul01");
    f.addParam("pA", "i32");
    f.addParam("pC0", "i32");
    f.addParam("pC1", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const A_c0 = c.getLocal("pA");
    const A_c1 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 2));
    const A_c2 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 4));
    const c0 = c.getLocal("pC0");
    const c1 = c.getLocal("pC1");
    const t1 = c.getLocal("pR");
    const t2 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 2));
    const t3 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 4));
    const a_a = c.i32_const(module.alloc(f1size * 2));
    const b_b = c.i32_const(module.alloc(f1size * 2));
    const Ac0_Ac1 = c.i32_const(module.alloc(f1size * 2));
    const Ac0_Ac2 = c.i32_const(module.alloc(f1size * 2));
    f.addCode(
      // let a_a = self.c0 * c0;
      c.call(f2mPrefix + "_mul", A_c0, c0, a_a),
      // let b_b = self.c1 * c1;
      c.call(f2mPrefix + "_mul", A_c1, c1, b_b),
      c.call(f2mPrefix + "_add", A_c0, A_c1, Ac0_Ac1),
      c.call(f2mPrefix + "_add", A_c0, A_c2, Ac0_Ac2),
      // let t1 = (self.c1 + self.c2) * c1 - b_b;
      c.call(f2mPrefix + "_add", A_c1, A_c2, t1),
      c.call(f2mPrefix + "_mul", t1, c1, t1),
      c.call(f2mPrefix + "_sub", t1, b_b, t1),
      // let t1 = t1.mul_by_nonresidue() + a_a;
      c.call(f2mPrefix + "_mulNR", t1, t1),
      c.call(f2mPrefix + "_add", t1, a_a, t1),
      // let t2 = (c0 + c1) * (self.c0 + self.c1) - a_a - b_b;
      c.call(f2mPrefix + "_add", c0, c1, t2),
      c.call(f2mPrefix + "_mul", t2, Ac0_Ac1, t2),
      c.call(f2mPrefix + "_sub", t2, a_a, t2),
      c.call(f2mPrefix + "_sub", t2, b_b, t2),
      // let t3 = (self.c0 + self.c2) * c0 - a_a + b_b;
      c.call(f2mPrefix + "_mul", Ac0_Ac2, c0, t3),
      c.call(f2mPrefix + "_sub", t3, a_a, t3),
      c.call(f2mPrefix + "_add", t3, b_b, t3)
    );
  }
  buildF6Mul01();
  function buildF12Mul014() {
    const f = module.addFunction(ftmPrefix + "_mul014");
    f.addParam("pA", "i32");
    f.addParam("pC0", "i32");
    f.addParam("pC1", "i32");
    f.addParam("pC4", "i32");
    f.addParam("pR", "i32");
    const c = f.getCodeBuilder();
    const A_c0 = c.getLocal("pA");
    const A_c1 = c.i32_add(c.getLocal("pA"), c.i32_const(f1size * 6));
    const c0 = c.getLocal("pC0");
    const c1 = c.getLocal("pC1");
    const c4 = c.getLocal("pC4");
    const aa = c.i32_const(module.alloc(f1size * 6));
    const bb = c.i32_const(module.alloc(f1size * 6));
    const o = c.i32_const(module.alloc(f1size * 2));
    const R_c0 = c.getLocal("pR");
    const R_c1 = c.i32_add(c.getLocal("pR"), c.i32_const(f1size * 6));
    f.addCode(
      // let aa = self.c0.mul_by_01(c0, c1);
      c.call(f6mPrefix + "_mul01", A_c0, c0, c1, aa),
      // let bb = self.c1.mul_by_1(c4);
      c.call(f6mPrefix + "_mul1", A_c1, c4, bb),
      // let o = c1 + c4;
      c.call(f2mPrefix + "_add", c1, c4, o),
      // let c1 = self.c1 + self.c0;
      c.call(f6mPrefix + "_add", A_c1, A_c0, R_c1),
      // let c1 = c1.mul_by_01(c0, &o);
      c.call(f6mPrefix + "_mul01", R_c1, c0, o, R_c1),
      // let c1 = c1 - aa - bb;
      c.call(f6mPrefix + "_sub", R_c1, aa, R_c1),
      c.call(f6mPrefix + "_sub", R_c1, bb, R_c1),
      // let c0 = bb;
      c.call(f6mPrefix + "_copy", bb, R_c0),
      // let c0 = c0.mul_by_nonresidue();
      c.call(f6mPrefix + "_mulNR", R_c0, R_c0),
      // let c0 = c0 + aa;
      c.call(f6mPrefix + "_add", R_c0, aa, R_c0)
    );
  }
  buildF12Mul014();
  function buildELL() {
    const f = module.addFunction(prefix + "_ell");
    f.addParam("pP", "i32");
    f.addParam("pCoefs", "i32");
    f.addParam("pF", "i32");
    const c = f.getCodeBuilder();
    const Px = c.getLocal("pP");
    const Py = c.i32_add(c.getLocal("pP"), c.i32_const(n8q));
    const F = c.getLocal("pF");
    const coef0_0 = c.getLocal("pCoefs");
    const coef0_1 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size));
    const coef1_0 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size * 2));
    const coef1_1 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size * 3));
    const coef2 = c.i32_add(c.getLocal("pCoefs"), c.i32_const(f1size * 4));
    const pc0 = module.alloc(f1size * 2);
    const c0 = c.i32_const(pc0);
    const c0_c0 = c.i32_const(pc0);
    const c0_c1 = c.i32_const(pc0 + f1size);
    const pc1 = module.alloc(f1size * 2);
    const c1 = c.i32_const(pc1);
    const c1_c0 = c.i32_const(pc1);
    const c1_c1 = c.i32_const(pc1 + f1size);
    f.addCode(
      //     let mut c0 = coeffs.0;
      //     let mut c1 = coeffs.1;
      //
      //    c0.c0 *= p.y;
      //    c0.c1 *= p.y;
      //
      //    c1.c0 *= p.x;
      //    c1.c1 *= p.x;
      //
      //     f.mul_by_014(&coeffs.2, &c1, &c0)
      c.call(f1mPrefix + "_mul", coef0_0, Py, c0_c0),
      c.call(f1mPrefix + "_mul", coef0_1, Py, c0_c1),
      c.call(f1mPrefix + "_mul", coef1_0, Px, c1_c0),
      c.call(f1mPrefix + "_mul", coef1_1, Px, c1_c1),
      c.call(ftmPrefix + "_mul014", F, coef2, c1, c0, F)
    );
  }
  buildELL();
  function buildMillerLoop() {
    const f = module.addFunction(prefix + "_millerLoop");
    f.addParam("ppreP", "i32");
    f.addParam("ppreQ", "i32");
    f.addParam("r", "i32");
    f.addLocal("pCoef", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const preP = c.getLocal("ppreP");
    const coefs = c.getLocal("pCoef");
    const F = c.getLocal("r");
    f.addCode(
      c.call(ftmPrefix + "_one", F),
      c.if(
        c.call(g1mPrefix + "_isZero", preP),
        c.ret([])
      ),
      c.if(
        c.call(g1mPrefix + "_isZero", c.getLocal("ppreQ")),
        c.ret([])
      ),
      c.setLocal("pCoef", c.i32_add(c.getLocal("ppreQ"), c.i32_const(f2size * 3))),
      c.setLocal("i", c.i32_const(ateLoopBitBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "_ell", preP, coefs, F),
        c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize))),
        c.if(
          c.i32_load8_s(c.getLocal("i"), pAteLoopBitBytes),
          [
            ...c.call(prefix + "_ell", preP, coefs, F),
            ...c.setLocal("pCoef", c.i32_add(c.getLocal("pCoef"), c.i32_const(ateCoefSize)))
          ]
        ),
        c.call(ftmPrefix + "_square", F, F),
        c.br_if(1, c.i32_eq(c.getLocal("i"), c.i32_const(1))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      )),
      c.call(prefix + "_ell", preP, coefs, F)
    );
    {
      f.addCode(
        c.call(ftmPrefix + "_conjugate", F, F)
      );
    }
  }
  function buildFrobeniusMap(n) {
    const F12 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [3850754370037169011952147076051364057158807420970682438676050522613628423219637725072182697113062777891589506424760n, 151655185184498381465642749684540099398075398968325446656007613510403227271200139370504932015952886146304766135027n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620351n, 0n],
        [2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n, 1028732146235106349975324479215795277384839936929757896155643118032610843298655225875571310552543014690878354869257n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n, 0n],
        [3125332594171059424908108096204648978570118281977575435832422631601824034463382777937621250592425535493320683825557n, 877076961050607968509681729531255177986764537961432449499635504522207616027455086505066378536590128544573588734230n],
        [4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559786n, 0n],
        [151655185184498381465642749684540099398075398968325446656007613510403227271200139370504932015952886146304766135027n, 3850754370037169011952147076051364057158807420970682438676050522613628423219637725072182697113062777891589506424760n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n, 0n],
        [1028732146235106349975324479215795277384839936929757896155643118032610843298655225875571310552543014690878354869257n, 2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939437n, 0n],
        [877076961050607968509681729531255177986764537961432449499635504522207616027455086505066378536590128544573588734230n, 3125332594171059424908108096204648978570118281977575435832422631601824034463382777937621250592425535493320683825557n]
      ]
    ];
    const F6 = [
      [
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n],
        [1n, 0n]
      ],
      [
        [1n, 0n],
        [0n, 4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n, 0n],
        [0n, 1n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n, 0n],
        [0n, 793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n]
      ],
      [
        [1n, 0n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939437n, 0n],
        [4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n, 0n],
        [4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559786n, 0n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n, 0n],
        [793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620351n, 0n]
      ]
    ];
    const f = module.addFunction(ftmPrefix + "_frobeniusMap" + n);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    for (let i = 0; i < 6; i++) {
      const X = i == 0 ? c.getLocal("x") : c.i32_add(c.getLocal("x"), c.i32_const(i * f2size));
      const Xc0 = X;
      const Xc1 = c.i32_add(c.getLocal("x"), c.i32_const(i * f2size + f1size));
      const R = i == 0 ? c.getLocal("r") : c.i32_add(c.getLocal("r"), c.i32_const(i * f2size));
      const Rc0 = R;
      const Rc1 = c.i32_add(c.getLocal("r"), c.i32_const(i * f2size + f1size));
      const coef = mul2(F12[Math.floor(i / 3)][n % 12], F6[i % 3][n % 6]);
      const pCoef = module.alloc([
        ...utils$1.bigInt2BytesLE(toMontgomery(coef[0]), n8q),
        ...utils$1.bigInt2BytesLE(toMontgomery(coef[1]), n8q)
      ]);
      if (n % 2 == 1) {
        f.addCode(
          c.call(f1mPrefix + "_copy", Xc0, Rc0),
          c.call(f1mPrefix + "_neg", Xc1, Rc1),
          c.call(f2mPrefix + "_mul", R, c.i32_const(pCoef), R)
        );
      } else {
        f.addCode(c.call(f2mPrefix + "_mul", X, c.i32_const(pCoef), R));
      }
    }
    function mul2(a2, b) {
      const ac0 = a2[0];
      const ac1 = a2[1];
      const bc0 = b[0];
      const bc1 = b[1];
      const res = [
        (ac0 * bc0 - ac1 * bc1) % q,
        (ac0 * bc1 + ac1 * bc0) % q
      ];
      if (isNegative$1(res[0])) res[0] = res[0] + q;
      return res;
    }
  }
  function buildCyclotomicSquare() {
    const f = module.addFunction(prefix + "__cyclotomicSquare");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const x0 = c.getLocal("x");
    const x4 = c.i32_add(c.getLocal("x"), c.i32_const(f2size));
    const x3 = c.i32_add(c.getLocal("x"), c.i32_const(2 * f2size));
    const x2 = c.i32_add(c.getLocal("x"), c.i32_const(3 * f2size));
    const x1 = c.i32_add(c.getLocal("x"), c.i32_const(4 * f2size));
    const x5 = c.i32_add(c.getLocal("x"), c.i32_const(5 * f2size));
    const r0 = c.getLocal("r");
    const r4 = c.i32_add(c.getLocal("r"), c.i32_const(f2size));
    const r3 = c.i32_add(c.getLocal("r"), c.i32_const(2 * f2size));
    const r22 = c.i32_add(c.getLocal("r"), c.i32_const(3 * f2size));
    const r1 = c.i32_add(c.getLocal("r"), c.i32_const(4 * f2size));
    const r5 = c.i32_add(c.getLocal("r"), c.i32_const(5 * f2size));
    const t0 = c.i32_const(module.alloc(f2size));
    const t1 = c.i32_const(module.alloc(f2size));
    const t2 = c.i32_const(module.alloc(f2size));
    const t3 = c.i32_const(module.alloc(f2size));
    const t4 = c.i32_const(module.alloc(f2size));
    const t5 = c.i32_const(module.alloc(f2size));
    const tmp = c.i32_const(module.alloc(f2size));
    const AUX = c.i32_const(module.alloc(f2size));
    f.addCode(
      //    // t0 + t1*y = (z0 + z1*y)^2 = a^2
      //    tmp = z0 * z1;
      //    t0 = (z0 + z1) * (z0 + my_Fp6::non_residue * z1) - tmp - my_Fp6::non_residue * tmp;
      //    t1 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x0, x1, tmp),
      c.call(f2mPrefix + "_mulNR", x1, t0),
      c.call(f2mPrefix + "_add", x0, t0, t0),
      c.call(f2mPrefix + "_add", x0, x1, AUX),
      c.call(f2mPrefix + "_mul", AUX, t0, t0),
      c.call(f2mPrefix + "_mulNR", tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t0, AUX, t0),
      c.call(f2mPrefix + "_add", tmp, tmp, t1),
      //  // t2 + t3*y = (z2 + z3*y)^2 = b^2
      //  tmp = z2 * z3;
      //  t2 = (z2 + z3) * (z2 + my_Fp6::non_residue * z3) - tmp - my_Fp6::non_residue * tmp;
      //  t3 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x2, x3, tmp),
      c.call(f2mPrefix + "_mulNR", x3, t2),
      c.call(f2mPrefix + "_add", x2, t2, t2),
      c.call(f2mPrefix + "_add", x2, x3, AUX),
      c.call(f2mPrefix + "_mul", AUX, t2, t2),
      c.call(f2mPrefix + "_mulNR", tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t2, AUX, t2),
      c.call(f2mPrefix + "_add", tmp, tmp, t3),
      //  // t4 + t5*y = (z4 + z5*y)^2 = c^2
      //  tmp = z4 * z5;
      //  t4 = (z4 + z5) * (z4 + my_Fp6::non_residue * z5) - tmp - my_Fp6::non_residue * tmp;
      //  t5 = tmp + tmp;
      c.call(f2mPrefix + "_mul", x4, x5, tmp),
      c.call(f2mPrefix + "_mulNR", x5, t4),
      c.call(f2mPrefix + "_add", x4, t4, t4),
      c.call(f2mPrefix + "_add", x4, x5, AUX),
      c.call(f2mPrefix + "_mul", AUX, t4, t4),
      c.call(f2mPrefix + "_mulNR", tmp, AUX),
      c.call(f2mPrefix + "_add", tmp, AUX, AUX),
      c.call(f2mPrefix + "_sub", t4, AUX, t4),
      c.call(f2mPrefix + "_add", tmp, tmp, t5),
      // For A
      // z0 = 3 * t0 - 2 * z0
      c.call(f2mPrefix + "_sub", t0, x0, r0),
      c.call(f2mPrefix + "_add", r0, r0, r0),
      c.call(f2mPrefix + "_add", t0, r0, r0),
      // z1 = 3 * t1 + 2 * z1
      c.call(f2mPrefix + "_add", t1, x1, r1),
      c.call(f2mPrefix + "_add", r1, r1, r1),
      c.call(f2mPrefix + "_add", t1, r1, r1),
      // For B
      // z2 = 3 * (xi * t5) + 2 * z2
      c.call(f2mPrefix + "_mul", t5, c.i32_const(pBls12381Twist), AUX),
      c.call(f2mPrefix + "_add", AUX, x2, r22),
      c.call(f2mPrefix + "_add", r22, r22, r22),
      c.call(f2mPrefix + "_add", AUX, r22, r22),
      // z3 = 3 * t4 - 2 * z3
      c.call(f2mPrefix + "_sub", t4, x3, r3),
      c.call(f2mPrefix + "_add", r3, r3, r3),
      c.call(f2mPrefix + "_add", t4, r3, r3),
      // For C
      // z4 = 3 * t2 - 2 * z4
      c.call(f2mPrefix + "_sub", t2, x4, r4),
      c.call(f2mPrefix + "_add", r4, r4, r4),
      c.call(f2mPrefix + "_add", t2, r4, r4),
      // z5 = 3 * t3 + 2 * z5
      c.call(f2mPrefix + "_add", t3, x5, r5),
      c.call(f2mPrefix + "_add", r5, r5, r5),
      c.call(f2mPrefix + "_add", t3, r5, r5)
    );
  }
  function buildCyclotomicExp(exponent, isExpNegative, fnName) {
    const exponentNafBytes = naf2(exponent).map((b) => b == -1 ? 255 : b);
    const pExponentNafBytes = module.alloc(exponentNafBytes);
    const f = module.addFunction(prefix + "__cyclotomicExp_" + fnName);
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    f.addLocal("bit", "i32");
    f.addLocal("i", "i32");
    const c = f.getCodeBuilder();
    const x = c.getLocal("x");
    const res = c.getLocal("r");
    const inverse = c.i32_const(module.alloc(ftsize));
    f.addCode(
      c.call(ftmPrefix + "_conjugate", x, inverse),
      c.call(ftmPrefix + "_one", res),
      c.if(
        c.teeLocal("bit", c.i32_load8_s(c.i32_const(exponentNafBytes.length - 1), pExponentNafBytes)),
        c.if(
          c.i32_eq(
            c.getLocal("bit"),
            c.i32_const(1)
          ),
          c.call(ftmPrefix + "_mul", res, x, res),
          c.call(ftmPrefix + "_mul", res, inverse, res)
        )
      ),
      c.setLocal("i", c.i32_const(exponentNafBytes.length - 2)),
      c.block(c.loop(
        c.call(prefix + "__cyclotomicSquare", res, res),
        c.if(
          c.teeLocal("bit", c.i32_load8_s(c.getLocal("i"), pExponentNafBytes)),
          c.if(
            c.i32_eq(
              c.getLocal("bit"),
              c.i32_const(1)
            ),
            c.call(ftmPrefix + "_mul", res, x, res),
            c.call(ftmPrefix + "_mul", res, inverse, res)
          )
        ),
        c.br_if(1, c.i32_eqz(c.getLocal("i"))),
        c.setLocal("i", c.i32_sub(c.getLocal("i"), c.i32_const(1))),
        c.br(0)
      ))
    );
    if (isExpNegative) {
      f.addCode(
        c.call(ftmPrefix + "_conjugate", res, res)
      );
    }
  }
  function buildFinalExponentiation() {
    buildCyclotomicSquare();
    buildCyclotomicExp(finalExpZ, finalExpIsNegative, "w0");
    const f = module.addFunction(prefix + "_finalExponentiation");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const elt = c.getLocal("x");
    const res = c.getLocal("r");
    const t0 = c.i32_const(module.alloc(ftsize));
    const t1 = c.i32_const(module.alloc(ftsize));
    const t2 = c.i32_const(module.alloc(ftsize));
    const t3 = c.i32_const(module.alloc(ftsize));
    const t4 = c.i32_const(module.alloc(ftsize));
    const t5 = c.i32_const(module.alloc(ftsize));
    const t6 = c.i32_const(module.alloc(ftsize));
    f.addCode(
      // let mut t0 = f.frobenius_map(6)
      c.call(ftmPrefix + "_frobeniusMap6", elt, t0),
      // let t1 = f.invert()
      c.call(ftmPrefix + "_inverse", elt, t1),
      // let mut t2 = t0 * t1;
      c.call(ftmPrefix + "_mul", t0, t1, t2),
      // t1 = t2.clone();
      c.call(ftmPrefix + "_copy", t2, t1),
      // t2 = t2.frobenius_map().frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap2", t2, t2),
      // t2 *= t1;
      c.call(ftmPrefix + "_mul", t2, t1, t2),
      // t1 = cyclotomic_square(t2).conjugate();
      c.call(prefix + "__cyclotomicSquare", t2, t1),
      c.call(ftmPrefix + "_conjugate", t1, t1),
      // let mut t3 = cycolotomic_exp(t2);
      c.call(prefix + "__cyclotomicExp_w0", t2, t3),
      // let mut t4 = cyclotomic_square(t3);
      c.call(prefix + "__cyclotomicSquare", t3, t4),
      // let mut t5 = t1 * t3;
      c.call(ftmPrefix + "_mul", t1, t3, t5),
      // t1 = cycolotomic_exp(t5);
      c.call(prefix + "__cyclotomicExp_w0", t5, t1),
      // t0 = cycolotomic_exp(t1);
      c.call(prefix + "__cyclotomicExp_w0", t1, t0),
      // let mut t6 = cycolotomic_exp(t0);
      c.call(prefix + "__cyclotomicExp_w0", t0, t6),
      // t6 *= t4;
      c.call(ftmPrefix + "_mul", t6, t4, t6),
      // t4 = cycolotomic_exp(t6);
      c.call(prefix + "__cyclotomicExp_w0", t6, t4),
      // t5 = t5.conjugate();
      c.call(ftmPrefix + "_conjugate", t5, t5),
      // t4 *= t5 * t2;
      c.call(ftmPrefix + "_mul", t4, t5, t4),
      c.call(ftmPrefix + "_mul", t4, t2, t4),
      // t5 = t2.conjugate();
      c.call(ftmPrefix + "_conjugate", t2, t5),
      // t1 *= t2;
      c.call(ftmPrefix + "_mul", t1, t2, t1),
      // t1 = t1.frobenius_map().frobenius_map().frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap3", t1, t1),
      // t6 *= t5;
      c.call(ftmPrefix + "_mul", t6, t5, t6),
      // t6 = t6.frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap1", t6, t6),
      // t3 *= t0;
      c.call(ftmPrefix + "_mul", t3, t0, t3),
      // t3 = t3.frobenius_map().frobenius_map();
      c.call(ftmPrefix + "_frobeniusMap2", t3, t3),
      // t3 *= t1;
      c.call(ftmPrefix + "_mul", t3, t1, t3),
      // t3 *= t6;
      c.call(ftmPrefix + "_mul", t3, t6, t3),
      // f = t3 * t4;
      c.call(ftmPrefix + "_mul", t3, t4, res)
    );
  }
  function buildFinalExponentiationOld() {
    const f = module.addFunction(prefix + "_finalExponentiationOld");
    f.addParam("x", "i32");
    f.addParam("r", "i32");
    const exponent = 322277361516934140462891564586510139908379969514828494218366688025288661041104682794998680497580008899973249814104447692778988208376779573819485263026159588510513834876303014016798809919343532899164848730280942609956670917565618115867287399623286813270357901731510188149934363360381614501334086825442271920079363289954510565375378443704372994881406797882676971082200626541916413184642520269678897559532260949334760604962086348898118982248842634379637598665468817769075878555493752214492790122785850202957575200176084204422751485957336465472324810982833638490904279282696134323072515220044451592646885410572234451732790590013479358343841220074174848221722017083597872017638514103174122784843925578370430843522959600095676285723737049438346544753168912974976791528535276317256904336520179281145394686565050419250614107803233314658825463117900250701199181529205942363159325765991819433914303908860460720581408201373164047773794825411011922305820065611121544561808414055302212057471395719432072209245600258134364584636810093520285711072578721435517884103526483832733289802426157301542744476740008494780363354305116978805620671467071400711358839553375340724899735460480144599782014906586543813292157922220645089192130209334926661588737007768565838519456601560804957985667880395221049249803753582637708560n;
    const pExponent = module.alloc(utils$1.bigInt2BytesLE(exponent, 544));
    const c = f.getCodeBuilder();
    f.addCode(
      c.call(ftmPrefix + "_exp", c.getLocal("x"), c.i32_const(pExponent), c.i32_const(544), c.getLocal("r"))
    );
  }
  const pPreP = module.alloc(prePSize);
  const pPreQ = module.alloc(preQSize);
  function buildPairingEquation(nPairings) {
    const f = module.addFunction(prefix + "_pairingEq" + nPairings);
    for (let i = 0; i < nPairings; i++) {
      f.addParam("p_" + i, "i32");
      f.addParam("q_" + i, "i32");
    }
    f.addParam("c", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    const auxT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(ftmPrefix + "_one", resT));
    for (let i = 0; i < nPairings; i++) {
      f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p_" + i), c.i32_const(pPreP)));
      f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q_" + i), c.i32_const(pPreQ)));
      f.addCode(
        c.if(
          c.i32_eqz(c.call(g1mPrefix + "_inGroupAffine", c.i32_const(pPreP))),
          c.ret(c.i32_const(0))
        ),
        c.if(
          c.i32_eqz(c.call(g2mPrefix + "_inGroupAffine", c.i32_const(pPreQ))),
          c.ret(c.i32_const(0))
        )
      );
      f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), auxT));
      f.addCode(c.call(ftmPrefix + "_mul", resT, auxT, resT));
    }
    f.addCode(c.call(prefix + "_finalExponentiation", resT, resT));
    f.addCode(c.call(ftmPrefix + "_eq", resT, c.getLocal("c")));
  }
  function buildPairing2() {
    const f = module.addFunction(prefix + "_pairing");
    f.addParam("p", "i32");
    f.addParam("q", "i32");
    f.addParam("r", "i32");
    const c = f.getCodeBuilder();
    const resT = c.i32_const(module.alloc(ftsize));
    f.addCode(c.call(prefix + "_prepareG1", c.getLocal("p"), c.i32_const(pPreP)));
    f.addCode(c.call(prefix + "_prepareG2", c.getLocal("q"), c.i32_const(pPreQ)));
    f.addCode(c.call(prefix + "_millerLoop", c.i32_const(pPreP), c.i32_const(pPreQ), resT));
    f.addCode(c.call(prefix + "_finalExponentiation", resT, c.getLocal("r")));
  }
  function buildInGroupG2() {
    const f = module.addFunction(g2mPrefix + "_inGroupAffine");
    f.addParam("p", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const WINV = [
      2001204777610833696708894912867952078278441409969503942666029068062015825245418932221343814564507832018947136279894n,
      2001204777610833696708894912867952078278441409969503942666029068062015825245418932221343814564507832018947136279893n
    ];
    const FROB2X = 4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n;
    const FROB3Y = [
      2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n,
      2973677408986561043442465346520108879172042883009249989176415018091420807192182638567116318576472649347015917690530n
    ];
    const wInv = c.i32_const(module.alloc([
      ...utils$1.bigInt2BytesLE(toMontgomery(WINV[0]), n8q),
      ...utils$1.bigInt2BytesLE(toMontgomery(WINV[1]), n8q)
    ]));
    const frob2X = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(toMontgomery(FROB2X), n8q)));
    const frob3Y = c.i32_const(module.alloc([
      ...utils$1.bigInt2BytesLE(toMontgomery(FROB3Y[0]), n8q),
      ...utils$1.bigInt2BytesLE(toMontgomery(FROB3Y[1]), n8q)
    ]));
    const z = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(finalExpZ, 8)));
    const px = c.getLocal("p");
    const py = c.i32_add(c.getLocal("p"), c.i32_const(f2size));
    const aux = c.i32_const(module.alloc(f1size));
    const x_winv = c.i32_const(module.alloc(f2size));
    const y_winv = c.i32_const(module.alloc(f2size));
    const pf2 = module.alloc(f2size * 2);
    const f2 = c.i32_const(pf2);
    const f2x = c.i32_const(pf2);
    const f2x_c1 = c.i32_const(pf2);
    const f2x_c2 = c.i32_const(pf2 + f1size);
    const f2y = c.i32_const(pf2 + f2size);
    const f2y_c1 = c.i32_const(pf2 + f2size);
    const f2y_c2 = c.i32_const(pf2 + f2size + f1size);
    const pf3 = module.alloc(f2size * 3);
    const f3 = c.i32_const(pf3);
    const f3x = c.i32_const(pf3);
    const f3x_c1 = c.i32_const(pf3);
    const f3x_c2 = c.i32_const(pf3 + f1size);
    const f3y = c.i32_const(pf3 + f2size);
    const f3y_c1 = c.i32_const(pf3 + f2size);
    const f3y_c2 = c.i32_const(pf3 + f2size + f1size);
    const f3z = c.i32_const(pf3 + f2size * 2);
    f.addCode(
      c.if(
        c.call(g2mPrefix + "_isZeroAffine", c.getLocal("p")),
        c.ret(c.i32_const(1))
      ),
      c.if(
        c.i32_eqz(c.call(g2mPrefix + "_inCurveAffine", c.getLocal("p"))),
        c.ret(c.i32_const(0))
      ),
      c.call(f2mPrefix + "_mul", px, wInv, x_winv),
      c.call(f2mPrefix + "_mul", py, wInv, y_winv),
      c.call(f2mPrefix + "_mul1", x_winv, frob2X, f2x),
      c.call(f2mPrefix + "_neg", y_winv, f2y),
      c.call(f2mPrefix + "_neg", x_winv, f3x),
      c.call(f2mPrefix + "_mul", y_winv, frob3Y, f3y),
      c.call(f1mPrefix + "_sub", f2x_c1, f2x_c2, aux),
      c.call(f1mPrefix + "_add", f2x_c1, f2x_c2, f2x_c2),
      c.call(f1mPrefix + "_copy", aux, f2x_c1),
      c.call(f1mPrefix + "_sub", f2y_c1, f2y_c2, aux),
      c.call(f1mPrefix + "_add", f2y_c1, f2y_c2, f2y_c2),
      c.call(f1mPrefix + "_copy", aux, f2y_c1),
      c.call(f1mPrefix + "_add", f3x_c1, f3x_c2, aux),
      c.call(f1mPrefix + "_sub", f3x_c1, f3x_c2, f3x_c2),
      c.call(f1mPrefix + "_copy", aux, f3x_c1),
      c.call(f1mPrefix + "_sub", f3y_c2, f3y_c1, aux),
      c.call(f1mPrefix + "_add", f3y_c1, f3y_c2, f3y_c2),
      c.call(f1mPrefix + "_copy", aux, f3y_c1),
      c.call(f2mPrefix + "_one", f3z),
      c.call(g2mPrefix + "_timesScalar", f3, z, c.i32_const(8), f3),
      c.call(g2mPrefix + "_addMixed", f3, f2, f3),
      c.ret(
        c.call(g2mPrefix + "_eqMixed", f3, c.getLocal("p"))
      )
    );
    const fInGroup = module.addFunction(g2mPrefix + "_inGroup");
    fInGroup.addParam("pIn", "i32");
    fInGroup.setReturnType("i32");
    const c2 = fInGroup.getCodeBuilder();
    const aux2 = c2.i32_const(module.alloc(f2size * 2));
    fInGroup.addCode(
      c2.call(g2mPrefix + "_toAffine", c2.getLocal("pIn"), aux2),
      c2.ret(
        c2.call(g2mPrefix + "_inGroupAffine", aux2)
      )
    );
  }
  function buildInGroupG1() {
    const f = module.addFunction(g1mPrefix + "_inGroupAffine");
    f.addParam("p", "i32");
    f.setReturnType("i32");
    const c = f.getCodeBuilder();
    const BETA = 4002409555221667392624310435006688643935503118305586438271171395842971157480381377015405980053539358417135540939436n;
    const BETA2 = 793479390729215512621379701633421447060886740281060493010456487427281649075476305620758731620350n;
    const Z2M1D3 = (finalExpZ * finalExpZ - 1n) / 3n;
    const beta = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(toMontgomery(BETA), n8q)));
    const beta2 = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(toMontgomery(BETA2), n8q)));
    const z2m1d3 = c.i32_const(module.alloc(utils$1.bigInt2BytesLE(Z2M1D3, 16)));
    const px = c.getLocal("p");
    const py = c.i32_add(c.getLocal("p"), c.i32_const(f1size));
    const psp = module.alloc(f1size * 3);
    const sp = c.i32_const(psp);
    const spx = c.i32_const(psp);
    const spy = c.i32_const(psp + f1size);
    const ps2p = module.alloc(f1size * 2);
    const s2p = c.i32_const(ps2p);
    const s2px = c.i32_const(ps2p);
    const s2py = c.i32_const(ps2p + f1size);
    f.addCode(
      c.if(
        c.call(g1mPrefix + "_isZeroAffine", c.getLocal("p")),
        c.ret(c.i32_const(1))
      ),
      c.if(
        c.i32_eqz(c.call(g1mPrefix + "_inCurveAffine", c.getLocal("p"))),
        c.ret(c.i32_const(0))
      ),
      c.call(f1mPrefix + "_mul", px, beta, spx),
      c.call(f1mPrefix + "_copy", py, spy),
      c.call(f1mPrefix + "_mul", px, beta2, s2px),
      c.call(f1mPrefix + "_copy", py, s2py),
      c.call(g1mPrefix + "_doubleAffine", sp, sp),
      c.call(g1mPrefix + "_subMixed", sp, c.getLocal("p"), sp),
      c.call(g1mPrefix + "_subMixed", sp, s2p, sp),
      c.call(g1mPrefix + "_timesScalar", sp, z2m1d3, c.i32_const(16), sp),
      c.ret(
        c.call(g1mPrefix + "_eqMixed", sp, s2p)
      )
    );
    const fInGroup = module.addFunction(g1mPrefix + "_inGroup");
    fInGroup.addParam("pIn", "i32");
    fInGroup.setReturnType("i32");
    const c2 = fInGroup.getCodeBuilder();
    const aux2 = c2.i32_const(module.alloc(f1size * 2));
    fInGroup.addCode(
      c2.call(g1mPrefix + "_toAffine", c2.getLocal("pIn"), aux2),
      c2.ret(
        c2.call(g1mPrefix + "_inGroupAffine", aux2)
      )
    );
  }
  for (let i = 0; i < 10; i++) {
    buildFrobeniusMap(i);
    module.exportFunction(ftmPrefix + "_frobeniusMap" + i);
  }
  buildInGroupG1();
  buildInGroupG2();
  buildPrepAddStep();
  buildPrepDoubleStep();
  buildPrepareG1();
  buildPrepareG2();
  buildMillerLoop();
  buildFinalExponentiationOld();
  buildFinalExponentiation();
  for (let i = 1; i <= 5; i++) {
    buildPairingEquation(i);
    module.exportFunction(prefix + "_pairingEq" + i);
  }
  buildPairing2();
  module.exportFunction(prefix + "_pairing");
  module.exportFunction(prefix + "_prepareG1");
  module.exportFunction(prefix + "_prepareG2");
  module.exportFunction(prefix + "_millerLoop");
  module.exportFunction(prefix + "_finalExponentiation");
  module.exportFunction(prefix + "_finalExponentiationOld");
  module.exportFunction(prefix + "__cyclotomicSquare");
  module.exportFunction(prefix + "__cyclotomicExp_w0");
  module.exportFunction(f6mPrefix + "_mul1");
  module.exportFunction(f6mPrefix + "_mul01");
  module.exportFunction(ftmPrefix + "_mul014");
  module.exportFunction(g1mPrefix + "_inGroupAffine");
  module.exportFunction(g1mPrefix + "_inGroup");
  module.exportFunction(g2mPrefix + "_inGroupAffine");
  module.exportFunction(g2mPrefix + "_inGroup");
};
var buildBn128$1 = build_bn128;
var buildBls12381$1 = build_bls12381;
function stringifyBigInts(o) {
  if (typeof o == "bigint" || o.eq !== void 0) {
    return o.toString(10);
  } else if (o instanceof Uint8Array) {
    return fromRprLE(o, 0);
  } else if (Array.isArray(o)) {
    return o.map(stringifyBigInts);
  } else if (typeof o == "object") {
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = stringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}
function unstringifyBigInts(o) {
  if (typeof o == "string" && /^[0-9]+$/.test(o)) {
    return BigInt(o);
  } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o == "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}
function beBuff2int(buff) {
  let res = BigInt(0);
  let i = buff.length;
  let offset = 0;
  const buffV = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);
  while (i > 0) {
    if (i >= 4) {
      i -= 4;
      res += BigInt(buffV.getUint32(i)) << BigInt(offset * 8);
      offset += 4;
    } else if (i >= 2) {
      i -= 2;
      res += BigInt(buffV.getUint16(i)) << BigInt(offset * 8);
      offset += 2;
    } else {
      i -= 1;
      res += BigInt(buffV.getUint8(i)) << BigInt(offset * 8);
      offset += 1;
    }
  }
  return res;
}
function beInt2Buff(n, len) {
  let r2 = n;
  const buff = new Uint8Array(len);
  const buffV = new DataView(buff.buffer);
  let o = len;
  while (o > 0) {
    if (o - 4 >= 0) {
      o -= 4;
      buffV.setUint32(o, Number(r2 & BigInt(4294967295)));
      r2 = r2 >> BigInt(32);
    } else if (o - 2 >= 0) {
      o -= 2;
      buffV.setUint16(o, Number(r2 & BigInt(65535)));
      r2 = r2 >> BigInt(16);
    } else {
      o -= 1;
      buffV.setUint8(o, Number(r2 & BigInt(255)));
      r2 = r2 >> BigInt(8);
    }
  }
  if (r2) {
    throw new Error("Number does not fit in this length");
  }
  return buff;
}
function leBuff2int(buff) {
  let res = BigInt(0);
  let i = 0;
  const buffV = new DataView(buff.buffer, buff.byteOffset, buff.byteLength);
  while (i < buff.length) {
    if (i + 4 <= buff.length) {
      res += BigInt(buffV.getUint32(i, true)) << BigInt(i * 8);
      i += 4;
    } else if (i + 2 <= buff.length) {
      res += BigInt(buffV.getUint16(i, true)) << BigInt(i * 8);
      i += 2;
    } else {
      res += BigInt(buffV.getUint8(i, true)) << BigInt(i * 8);
      i += 1;
    }
  }
  return res;
}
function leInt2Buff(n, len) {
  let r2 = n;
  if (typeof len === "undefined") {
    len = Math.floor((bitLength$6(n) - 1) / 8) + 1;
    if (len == 0) len = 1;
  }
  const buff = new Uint8Array(len);
  const buffV = new DataView(buff.buffer);
  let o = 0;
  while (o < len) {
    if (o + 4 <= len) {
      buffV.setUint32(o, Number(r2 & BigInt(4294967295)), true);
      o += 4;
      r2 = r2 >> BigInt(32);
    } else if (o + 2 <= len) {
      buffV.setUint16(o, Number(r2 & BigInt(65535)), true);
      o += 2;
      r2 = r2 >> BigInt(16);
    } else {
      buffV.setUint8(o, Number(r2 & BigInt(255)), true);
      o += 1;
      r2 = r2 >> BigInt(8);
    }
  }
  if (r2) {
    throw new Error("Number does not fit in this length");
  }
  return buff;
}
function stringifyFElements(F, o) {
  if (typeof o == "bigint" || o.eq !== void 0) {
    return o.toString(10);
  } else if (o instanceof Uint8Array) {
    return F.toString(F.e(o));
  } else if (Array.isArray(o)) {
    return o.map(stringifyFElements.bind(this, F));
  } else if (typeof o == "object") {
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = stringifyFElements(F, o[k]);
    });
    return res;
  } else {
    return o;
  }
}
function unstringifyFElements(F, o) {
  if (typeof o == "string" && /^[0-9]+$/.test(o)) {
    return F.e(o);
  } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
    return F.e(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyFElements.bind(this, F));
  } else if (typeof o == "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyFElements(F, o[k]);
    });
    return res;
  } else {
    return o;
  }
}
var _revTable = [];
for (let i = 0; i < 256; i++) {
  _revTable[i] = _revSlow(i, 8);
}
function _revSlow(idx, bits3) {
  let res = 0;
  let a2 = idx;
  for (let i = 0; i < bits3; i++) {
    res <<= 1;
    res = res | a2 & 1;
    a2 >>= 1;
  }
  return res;
}
function bitReverse(idx, bits3) {
  return (_revTable[idx >>> 24] | _revTable[idx >>> 16 & 255] << 8 | _revTable[idx >>> 8 & 255] << 16 | _revTable[idx & 255] << 24) >>> 32 - bits3;
}
function log2(V) {
  return ((V & 4294901760) !== 0 ? (V &= 4294901760, 16) : 0) | ((V & 4278255360) !== 0 ? (V &= 4278255360, 8) : 0) | ((V & 4042322160) !== 0 ? (V &= 4042322160, 4) : 0) | ((V & 3435973836) !== 0 ? (V &= 3435973836, 2) : 0) | (V & 2863311530) !== 0;
}
function buffReverseBits(buff, eSize) {
  const n = buff.byteLength / eSize;
  const bits3 = log2(n);
  if (n != 1 << bits3) {
    throw new Error("Invalid number of pointers");
  }
  for (let i = 0; i < n; i++) {
    const r2 = bitReverse(i, bits3);
    if (i > r2) {
      const tmp = buff.slice(i * eSize, (i + 1) * eSize);
      buff.set(buff.slice(r2 * eSize, (r2 + 1) * eSize), i * eSize);
      buff.set(tmp, r2 * eSize);
    }
  }
}
function array2buffer(arr, sG) {
  const buff = new Uint8Array(sG * arr.length);
  for (let i = 0; i < arr.length; i++) {
    buff.set(arr[i], i * sG);
  }
  return buff;
}
function buffer2array(buff, sG) {
  const n = buff.byteLength / sG;
  const arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = buff.slice(i * sG, i * sG + sG);
  }
  return arr;
}
var _utils = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  array2buffer,
  beBuff2int,
  beInt2Buff,
  bitReverse,
  buffReverseBits,
  buffer2array,
  leBuff2int,
  leInt2Buff,
  log2,
  stringifyBigInts,
  stringifyFElements,
  unstringifyBigInts,
  unstringifyFElements
});
var PAGE_SIZE = 1 << 30;
var BigBuffer = class _BigBuffer {
  constructor(size2) {
    this.buffers = [];
    this.byteLength = size2;
    for (let i = 0; i < size2; i += PAGE_SIZE) {
      const n = Math.min(size2 - i, PAGE_SIZE);
      this.buffers.push(new Uint8Array(n));
    }
  }
  slice(fr, to) {
    if (to === void 0) to = this.byteLength;
    if (fr === void 0) fr = 0;
    const len = to - fr;
    const firstPage = Math.floor(fr / PAGE_SIZE);
    const lastPage = Math.floor((fr + len - 1) / PAGE_SIZE);
    if (firstPage == lastPage || len == 0)
      return this.buffers[firstPage].slice(fr % PAGE_SIZE, fr % PAGE_SIZE + len);
    let buff;
    let p = firstPage;
    let o = fr % PAGE_SIZE;
    let r2 = len;
    while (r2 > 0) {
      const l = o + r2 > PAGE_SIZE ? PAGE_SIZE - o : r2;
      const srcView = new Uint8Array(this.buffers[p].buffer, this.buffers[p].byteOffset + o, l);
      if (l == len) return srcView.slice();
      if (!buff) {
        if (len <= PAGE_SIZE) {
          buff = new Uint8Array(len);
        } else {
          buff = new _BigBuffer(len);
        }
      }
      buff.set(srcView, len - r2);
      r2 = r2 - l;
      p++;
      o = 0;
    }
    return buff;
  }
  set(buff, offset) {
    if (offset === void 0) offset = 0;
    const len = buff.byteLength;
    if (len == 0) return;
    const firstPage = Math.floor(offset / PAGE_SIZE);
    const lastPage = Math.floor((offset + len - 1) / PAGE_SIZE);
    if (firstPage == lastPage) {
      if (buff instanceof _BigBuffer && buff.buffers.length == 1) {
        return this.buffers[firstPage].set(buff.buffers[0], offset % PAGE_SIZE);
      } else {
        return this.buffers[firstPage].set(buff, offset % PAGE_SIZE);
      }
    }
    let p = firstPage;
    let o = offset % PAGE_SIZE;
    let r2 = len;
    while (r2 > 0) {
      const l = o + r2 > PAGE_SIZE ? PAGE_SIZE - o : r2;
      const srcView = buff.slice(len - r2, len - r2 + l);
      const dstView = new Uint8Array(this.buffers[p].buffer, this.buffers[p].byteOffset + o, l);
      dstView.set(srcView);
      r2 = r2 - l;
      p++;
      o = 0;
    }
  }
};
function buildBatchConvert(tm, fnName, sIn, sOut) {
  return async function batchConvert(buffIn) {
    const nPoints = Math.floor(buffIn.byteLength / sIn);
    if (nPoints * sIn !== buffIn.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const pointsPerChunk = Math.floor(nPoints / tm.concurrency);
    const opPromises = [];
    for (let i = 0; i < tm.concurrency; i++) {
      let n;
      if (i < tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const buffChunk = buffIn.slice(i * pointsPerChunk * sIn, i * pointsPerChunk * sIn + n * sIn);
      const task = [
        { cmd: "ALLOCSET", var: 0, buff: buffChunk },
        { cmd: "ALLOC", var: 1, len: sOut * n },
        { cmd: "CALL", fnName, params: [
          { var: 0 },
          { val: n },
          { var: 1 }
        ] },
        { cmd: "GET", out: 0, var: 1, len: sOut * n }
      ];
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result2 = await Promise.all(opPromises);
    let fullBuffOut;
    if (buffIn instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sOut);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sOut);
    }
    let p = 0;
    for (let i = 0; i < result2.length; i++) {
      fullBuffOut.set(result2[i][0], p);
      p += result2[i][0].byteLength;
    }
    return fullBuffOut;
  };
}
var WasmField1 = class {
  constructor(tm, prefix, n8, p) {
    this.tm = tm;
    this.prefix = prefix;
    this.p = p;
    this.n8 = n8;
    this.type = "F1";
    this.m = 1;
    this.half = shiftRight(p, one);
    this.bitLength = bitLength$6(p);
    this.mask = sub(shiftLeft(one, this.bitLength), one);
    this.pOp1 = tm.alloc(n8);
    this.pOp2 = tm.alloc(n8);
    this.pOp3 = tm.alloc(n8);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = this.tm.getBuff(this.pOp1, this.n8);
    this.tm.instance.exports[prefix + "_one"](this.pOp1);
    this.one = this.tm.getBuff(this.pOp1, this.n8);
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
    this.n64 = Math.floor(n8 / 8);
    this.n32 = Math.floor(n8 / 4);
    if (this.n64 * 8 != this.n8) {
      throw new Error("n8 must be a multiple of 8");
    }
    this.half = shiftRight(this.p, one);
    this.nqr = this.two;
    let r2 = this.exp(this.nqr, this.half);
    while (!this.eq(r2, this.negone)) {
      this.nqr = this.add(this.nqr, this.one);
      r2 = this.exp(this.nqr, this.half);
    }
    this.shift = this.mul(this.nqr, this.nqr);
    this.shiftInv = this.inv(this.shift);
    this.s = 0;
    let t = sub(this.p, one);
    while (!isOdd$5(t)) {
      this.s = this.s + 1;
      t = shiftRight(t, one);
    }
    this.w = [];
    this.w[this.s] = this.exp(this.nqr, t);
    for (let i = this.s - 1; i >= 0; i--) {
      this.w[i] = this.square(this.w[i + 1]);
    }
    if (!this.eq(this.w[0], this.one)) {
      throw new Error("Error calculating roots of unity");
    }
    this.batchToMontgomery = buildBatchConvert(tm, prefix + "_batchToMontgomery", this.n8, this.n8);
    this.batchFromMontgomery = buildBatchConvert(tm, prefix + "_batchFromMontgomery", this.n8, this.n8);
  }
  op2(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op2Bool(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2);
  }
  op1(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op1Bool(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  add(a2, b) {
    return this.op2("_add", a2, b);
  }
  eq(a2, b) {
    return this.op2Bool("_eq", a2, b);
  }
  isZero(a2) {
    return this.op1Bool("_isZero", a2);
  }
  sub(a2, b) {
    return this.op2("_sub", a2, b);
  }
  neg(a2) {
    return this.op1("_neg", a2);
  }
  inv(a2) {
    return this.op1("_inverse", a2);
  }
  toMontgomery(a2) {
    return this.op1("_toMontgomery", a2);
  }
  fromMontgomery(a2) {
    return this.op1("_fromMontgomery", a2);
  }
  mul(a2, b) {
    return this.op2("_mul", a2, b);
  }
  div(a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_inverse"](this.pOp2, this.pOp2);
    this.tm.instance.exports[this.prefix + "_mul"](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  square(a2) {
    return this.op1("_square", a2);
  }
  isSquare(a2) {
    return this.op1Bool("_isSquare", a2);
  }
  sqrt(a2) {
    return this.op1("_sqrt", a2);
  }
  exp(a2, b) {
    if (!(b instanceof Uint8Array)) {
      b = toLEBuff(e(b));
    }
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_exp"](this.pOp1, this.pOp2, b.byteLength, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  isNegative(a2) {
    return this.op1Bool("_isNegative", a2);
  }
  e(a2, b) {
    if (a2 instanceof Uint8Array) return a2;
    let ra = e(a2, b);
    if (isNegative$4(ra)) {
      ra = neg(ra);
      if (gt(ra, this.p)) {
        ra = mod(ra, this.p);
      }
      ra = sub(this.p, ra);
    } else {
      if (gt(ra, this.p)) {
        ra = mod(ra, this.p);
      }
    }
    const buff = leInt2Buff(ra, this.n8);
    return this.toMontgomery(buff);
  }
  toString(a2, radix) {
    const an = this.fromMontgomery(a2);
    const s = fromRprLE(an, 0);
    return toString(s, radix);
  }
  fromRng(rng) {
    let v;
    const buff = new Uint8Array(this.n8);
    do {
      v = zero;
      for (let i = 0; i < this.n64; i++) {
        v = add(v, shiftLeft(rng.nextU64(), 64 * i));
      }
      v = band(v, this.mask);
    } while (geq(v, this.p));
    toRprLE(buff, 0, v, this.n8);
    return buff;
  }
  random() {
    return this.fromRng(getThreadRng());
  }
  toObject(a2) {
    const an = this.fromMontgomery(a2);
    return fromRprLE(an, 0);
  }
  fromObject(a2) {
    const buff = new Uint8Array(this.n8);
    toRprLE(buff, 0, a2, this.n8);
    return this.toMontgomery(buff);
  }
  toRprLE(buff, offset, a2) {
    buff.set(this.fromMontgomery(a2), offset);
  }
  toRprBE(buff, offset, a2) {
    const buff2 = this.fromMontgomery(a2);
    for (let i = 0; i < this.n8 / 2; i++) {
      const aux = buff2[i];
      buff2[i] = buff2[this.n8 - 1 - i];
      buff2[this.n8 - 1 - i] = aux;
    }
    buff.set(buff2, offset);
  }
  fromRprLE(buff, offset) {
    offset = offset || 0;
    const res = buff.slice(offset, offset + this.n8);
    return this.toMontgomery(res);
  }
  async batchInverse(buffIn) {
    let returnArray = false;
    const sIn = this.n8;
    const sOut = this.n8;
    if (Array.isArray(buffIn)) {
      buffIn = array2buffer(buffIn, sIn);
      returnArray = true;
    } else {
      buffIn = buffIn.slice(0, buffIn.byteLength);
    }
    const nPoints = Math.floor(buffIn.byteLength / sIn);
    if (nPoints * sIn !== buffIn.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const pointsPerChunk = Math.floor(nPoints / this.tm.concurrency);
    const opPromises = [];
    for (let i = 0; i < this.tm.concurrency; i++) {
      let n;
      if (i < this.tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const buffChunk = buffIn.slice(i * pointsPerChunk * sIn, i * pointsPerChunk * sIn + n * sIn);
      const task = [
        { cmd: "ALLOCSET", var: 0, buff: buffChunk },
        { cmd: "ALLOC", var: 1, len: sOut * n },
        { cmd: "CALL", fnName: this.prefix + "_batchInverse", params: [
          { var: 0 },
          { val: sIn },
          { val: n },
          { var: 1 },
          { val: sOut }
        ] },
        { cmd: "GET", out: 0, var: 1, len: sOut * n }
      ];
      opPromises.push(
        this.tm.queueAction(task)
      );
    }
    const result2 = await Promise.all(opPromises);
    let fullBuffOut;
    if (buffIn instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sOut);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sOut);
    }
    let p = 0;
    for (let i = 0; i < result2.length; i++) {
      fullBuffOut.set(result2[i][0], p);
      p += result2[i][0].byteLength;
    }
    if (returnArray) {
      return buffer2array(fullBuffOut, sOut);
    } else {
      return fullBuffOut;
    }
  }
};
var WasmField2 = class {
  constructor(tm, prefix, F) {
    this.tm = tm;
    this.prefix = prefix;
    this.F = F;
    this.type = "F2";
    this.m = F.m * 2;
    this.n8 = this.F.n8 * 2;
    this.n32 = this.F.n32 * 2;
    this.n64 = this.F.n64 * 2;
    this.pOp1 = tm.alloc(F.n8 * 2);
    this.pOp2 = tm.alloc(F.n8 * 2);
    this.pOp3 = tm.alloc(F.n8 * 2);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = tm.getBuff(this.pOp1, this.n8);
    this.tm.instance.exports[prefix + "_one"](this.pOp1);
    this.one = tm.getBuff(this.pOp1, this.n8);
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
  }
  op2(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op2Bool(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2);
  }
  op1(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op1Bool(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  add(a2, b) {
    return this.op2("_add", a2, b);
  }
  eq(a2, b) {
    return this.op2Bool("_eq", a2, b);
  }
  isZero(a2) {
    return this.op1Bool("_isZero", a2);
  }
  sub(a2, b) {
    return this.op2("_sub", a2, b);
  }
  neg(a2) {
    return this.op1("_neg", a2);
  }
  inv(a2) {
    return this.op1("_inverse", a2);
  }
  isNegative(a2) {
    return this.op1Bool("_isNegative", a2);
  }
  toMontgomery(a2) {
    return this.op1("_toMontgomery", a2);
  }
  fromMontgomery(a2) {
    return this.op1("_fromMontgomery", a2);
  }
  mul(a2, b) {
    return this.op2("_mul", a2, b);
  }
  mul1(a2, b) {
    return this.op2("_mul1", a2, b);
  }
  div(a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_inverse"](this.pOp2, this.pOp2);
    this.tm.instance.exports[this.prefix + "_mul"](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  square(a2) {
    return this.op1("_square", a2);
  }
  isSquare(a2) {
    return this.op1Bool("_isSquare", a2);
  }
  sqrt(a2) {
    return this.op1("_sqrt", a2);
  }
  exp(a2, b) {
    if (!(b instanceof Uint8Array)) {
      b = toLEBuff(e(b));
    }
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_exp"](this.pOp1, this.pOp2, b.byteLength, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  e(a2, b) {
    if (a2 instanceof Uint8Array) return a2;
    if (Array.isArray(a2) && a2.length == 2) {
      const c1 = this.F.e(a2[0], b);
      const c2 = this.F.e(a2[1], b);
      const res = new Uint8Array(this.F.n8 * 2);
      res.set(c1);
      res.set(c2, this.F.n8 * 2);
      return res;
    } else {
      throw new Error("invalid F2");
    }
  }
  toString(a2, radix) {
    const s1 = this.F.toString(a2.slice(0, this.F.n8), radix);
    const s2 = this.F.toString(a2.slice(this.F.n8), radix);
    return `[${s1}, ${s2}]`;
  }
  fromRng(rng) {
    const c1 = this.F.fromRng(rng);
    const c2 = this.F.fromRng(rng);
    const res = new Uint8Array(this.F.n8 * 2);
    res.set(c1);
    res.set(c2, this.F.n8);
    return res;
  }
  random() {
    return this.fromRng(getThreadRng());
  }
  toObject(a2) {
    const c1 = this.F.toObject(a2.slice(0, this.F.n8));
    const c2 = this.F.toObject(a2.slice(this.F.n8, this.F.n8 * 2));
    return [c1, c2];
  }
  fromObject(a2) {
    const buff = new Uint8Array(this.F.n8 * 2);
    const b1 = this.F.fromObject(a2[0]);
    const b2 = this.F.fromObject(a2[1]);
    buff.set(b1);
    buff.set(b2, this.F.n8);
    return buff;
  }
  c1(a2) {
    return a2.slice(0, this.F.n8);
  }
  c2(a2) {
    return a2.slice(this.F.n8);
  }
};
var WasmField3 = class {
  constructor(tm, prefix, F) {
    this.tm = tm;
    this.prefix = prefix;
    this.F = F;
    this.type = "F3";
    this.m = F.m * 3;
    this.n8 = this.F.n8 * 3;
    this.n32 = this.F.n32 * 3;
    this.n64 = this.F.n64 * 3;
    this.pOp1 = tm.alloc(F.n8 * 3);
    this.pOp2 = tm.alloc(F.n8 * 3);
    this.pOp3 = tm.alloc(F.n8 * 3);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = tm.getBuff(this.pOp1, this.n8);
    this.tm.instance.exports[prefix + "_one"](this.pOp1);
    this.one = tm.getBuff(this.pOp1, this.n8);
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
  }
  op2(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op2Bool(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2);
  }
  op1(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  op1Bool(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  eq(a2, b) {
    return this.op2Bool("_eq", a2, b);
  }
  isZero(a2) {
    return this.op1Bool("_isZero", a2);
  }
  add(a2, b) {
    return this.op2("_add", a2, b);
  }
  sub(a2, b) {
    return this.op2("_sub", a2, b);
  }
  neg(a2) {
    return this.op1("_neg", a2);
  }
  inv(a2) {
    return this.op1("_inverse", a2);
  }
  isNegative(a2) {
    return this.op1Bool("_isNegative", a2);
  }
  toMontgomery(a2) {
    return this.op1("_toMontgomery", a2);
  }
  fromMontgomery(a2) {
    return this.op1("_fromMontgomery", a2);
  }
  mul(a2, b) {
    return this.op2("_mul", a2, b);
  }
  div(a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_inverse"](this.pOp2, this.pOp2);
    this.tm.instance.exports[this.prefix + "_mul"](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.n8);
  }
  square(a2) {
    return this.op1("_square", a2);
  }
  isSquare(a2) {
    return this.op1Bool("_isSquare", a2);
  }
  sqrt(a2) {
    return this.op1("_sqrt", a2);
  }
  exp(a2, b) {
    if (!(b instanceof Uint8Array)) {
      b = toLEBuff(e(b));
    }
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + "_exp"](this.pOp1, this.pOp2, b.byteLength, this.pOp3);
    return this.getBuff(this.pOp3, this.n8);
  }
  e(a2, b) {
    if (a2 instanceof Uint8Array) return a2;
    if (Array.isArray(a2) && a2.length == 3) {
      const c1 = this.F.e(a2[0], b);
      const c2 = this.F.e(a2[1], b);
      const c3 = this.F.e(a2[2], b);
      const res = new Uint8Array(this.F.n8 * 3);
      res.set(c1);
      res.set(c2, this.F.n8);
      res.set(c3, this.F.n8 * 2);
      return res;
    } else {
      throw new Error("invalid F3");
    }
  }
  toString(a2, radix) {
    const s1 = this.F.toString(a2.slice(0, this.F.n8), radix);
    const s2 = this.F.toString(a2.slice(this.F.n8, this.F.n8 * 2), radix);
    const s3 = this.F.toString(a2.slice(this.F.n8 * 2), radix);
    return `[${s1}, ${s2}, ${s3}]`;
  }
  fromRng(rng) {
    const c1 = this.F.fromRng(rng);
    const c2 = this.F.fromRng(rng);
    const c3 = this.F.fromRng(rng);
    const res = new Uint8Array(this.F.n8 * 3);
    res.set(c1);
    res.set(c2, this.F.n8);
    res.set(c3, this.F.n8 * 2);
    return res;
  }
  random() {
    return this.fromRng(getThreadRng());
  }
  toObject(a2) {
    const c1 = this.F.toObject(a2.slice(0, this.F.n8));
    const c2 = this.F.toObject(a2.slice(this.F.n8, this.F.n8 * 2));
    const c3 = this.F.toObject(a2.slice(this.F.n8 * 2, this.F.n8 * 3));
    return [c1, c2, c3];
  }
  fromObject(a2) {
    const buff = new Uint8Array(this.F.n8 * 3);
    const b1 = this.F.fromObject(a2[0]);
    const b2 = this.F.fromObject(a2[1]);
    const b3 = this.F.fromObject(a2[2]);
    buff.set(b1);
    buff.set(b2, this.F.n8);
    buff.set(b3, this.F.n8 * 2);
    return buff;
  }
  c1(a2) {
    return a2.slice(0, this.F.n8);
  }
  c2(a2) {
    return a2.slice(this.F.n8, this.F.n8 * 2);
  }
  c3(a2) {
    return a2.slice(this.F.n8 * 2);
  }
};
var WasmCurve = class {
  constructor(tm, prefix, F, pGen, pGb, cofactor) {
    this.tm = tm;
    this.prefix = prefix;
    this.F = F;
    this.pOp1 = tm.alloc(F.n8 * 3);
    this.pOp2 = tm.alloc(F.n8 * 3);
    this.pOp3 = tm.alloc(F.n8 * 3);
    this.tm.instance.exports[prefix + "_zero"](this.pOp1);
    this.zero = this.tm.getBuff(this.pOp1, F.n8 * 3);
    this.tm.instance.exports[prefix + "_zeroAffine"](this.pOp1);
    this.zeroAffine = this.tm.getBuff(this.pOp1, F.n8 * 2);
    this.one = this.tm.getBuff(pGen, F.n8 * 3);
    this.g = this.one;
    this.oneAffine = this.tm.getBuff(pGen, F.n8 * 2);
    this.gAffine = this.oneAffine;
    this.b = this.tm.getBuff(pGb, F.n8);
    if (cofactor) {
      this.cofactor = toLEBuff(cofactor);
    }
    this.negone = this.neg(this.one);
    this.two = this.add(this.one, this.one);
    this.batchLEMtoC = buildBatchConvert(tm, prefix + "_batchLEMtoC", F.n8 * 2, F.n8);
    this.batchLEMtoU = buildBatchConvert(tm, prefix + "_batchLEMtoU", F.n8 * 2, F.n8 * 2);
    this.batchCtoLEM = buildBatchConvert(tm, prefix + "_batchCtoLEM", F.n8, F.n8 * 2);
    this.batchUtoLEM = buildBatchConvert(tm, prefix + "_batchUtoLEM", F.n8 * 2, F.n8 * 2);
    this.batchToJacobian = buildBatchConvert(tm, prefix + "_batchToJacobian", F.n8 * 2, F.n8 * 3);
    this.batchToAffine = buildBatchConvert(tm, prefix + "_batchToAffine", F.n8 * 3, F.n8 * 2);
  }
  op2(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  op2bool(opName, a2, b) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, b);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp2, this.pOp3);
  }
  op1(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  op1Affine(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 2);
  }
  op1Bool(opName, a2) {
    this.tm.setBuff(this.pOp1, a2);
    return !!this.tm.instance.exports[this.prefix + opName](this.pOp1, this.pOp3);
  }
  add(a2, b) {
    if (a2.byteLength == this.F.n8 * 3) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_add", a2, b);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_addMixed", a2, b);
      } else {
        throw new Error("invalid point size");
      }
    } else if (a2.byteLength == this.F.n8 * 2) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_addMixed", b, a2);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_addAffine", a2, b);
      } else {
        throw new Error("invalid point size");
      }
    } else {
      throw new Error("invalid point size");
    }
  }
  sub(a2, b) {
    if (a2.byteLength == this.F.n8 * 3) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_sub", a2, b);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_subMixed", a2, b);
      } else {
        throw new Error("invalid point size");
      }
    } else if (a2.byteLength == this.F.n8 * 2) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2("_subMixed", b, a2);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2("_subAffine", a2, b);
      } else {
        throw new Error("invalid point size");
      }
    } else {
      throw new Error("invalid point size");
    }
  }
  neg(a2) {
    if (a2.byteLength == this.F.n8 * 3) {
      return this.op1("_neg", a2);
    } else if (a2.byteLength == this.F.n8 * 2) {
      return this.op1Affine("_negAffine", a2);
    } else {
      throw new Error("invalid point size");
    }
  }
  double(a2) {
    if (a2.byteLength == this.F.n8 * 3) {
      return this.op1("_double", a2);
    } else if (a2.byteLength == this.F.n8 * 2) {
      return this.op1("_doubleAffine", a2);
    } else {
      throw new Error("invalid point size");
    }
  }
  isZero(a2) {
    if (a2.byteLength == this.F.n8 * 3) {
      return this.op1Bool("_isZero", a2);
    } else if (a2.byteLength == this.F.n8 * 2) {
      return this.op1Bool("_isZeroAffine", a2);
    } else {
      throw new Error("invalid point size");
    }
  }
  timesScalar(a2, s) {
    if (!(s instanceof Uint8Array)) {
      s = toLEBuff(e(s));
    }
    let fnName;
    if (a2.byteLength == this.F.n8 * 3) {
      fnName = this.prefix + "_timesScalar";
    } else if (a2.byteLength == this.F.n8 * 2) {
      fnName = this.prefix + "_timesScalarAffine";
    } else {
      throw new Error("invalid point size");
    }
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, s);
    this.tm.instance.exports[fnName](this.pOp1, this.pOp2, s.byteLength, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  timesFr(a2, s) {
    let fnName;
    if (a2.byteLength == this.F.n8 * 3) {
      fnName = this.prefix + "_timesFr";
    } else if (a2.byteLength == this.F.n8 * 2) {
      fnName = this.prefix + "_timesFrAffine";
    } else {
      throw new Error("invalid point size");
    }
    this.tm.setBuff(this.pOp1, a2);
    this.tm.setBuff(this.pOp2, s);
    this.tm.instance.exports[fnName](this.pOp1, this.pOp2, this.pOp3);
    return this.tm.getBuff(this.pOp3, this.F.n8 * 3);
  }
  eq(a2, b) {
    if (a2.byteLength == this.F.n8 * 3) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2bool("_eq", a2, b);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2bool("_eqMixed", a2, b);
      } else {
        throw new Error("invalid point size");
      }
    } else if (a2.byteLength == this.F.n8 * 2) {
      if (b.byteLength == this.F.n8 * 3) {
        return this.op2bool("_eqMixed", b, a2);
      } else if (b.byteLength == this.F.n8 * 2) {
        return this.op2bool("_eqAffine", a2, b);
      } else {
        throw new Error("invalid point size");
      }
    } else {
      throw new Error("invalid point size");
    }
  }
  toAffine(a2) {
    if (a2.byteLength == this.F.n8 * 3) {
      return this.op1Affine("_toAffine", a2);
    } else if (a2.byteLength == this.F.n8 * 2) {
      return a2;
    } else {
      throw new Error("invalid point size");
    }
  }
  toJacobian(a2) {
    if (a2.byteLength == this.F.n8 * 3) {
      return a2;
    } else if (a2.byteLength == this.F.n8 * 2) {
      return this.op1("_toJacobian", a2);
    } else {
      throw new Error("invalid point size");
    }
  }
  toRprUncompressed(arr, offset, a2) {
    this.tm.setBuff(this.pOp1, a2);
    if (a2.byteLength == this.F.n8 * 3) {
      this.tm.instance.exports[this.prefix + "_toAffine"](this.pOp1, this.pOp1);
    } else if (a2.byteLength != this.F.n8 * 2) {
      throw new Error("invalid point size");
    }
    this.tm.instance.exports[this.prefix + "_LEMtoU"](this.pOp1, this.pOp1);
    const res = this.tm.getBuff(this.pOp1, this.F.n8 * 2);
    arr.set(res, offset);
  }
  fromRprUncompressed(arr, offset) {
    const buff = arr.slice(offset, offset + this.F.n8 * 2);
    this.tm.setBuff(this.pOp1, buff);
    this.tm.instance.exports[this.prefix + "_UtoLEM"](this.pOp1, this.pOp1);
    return this.tm.getBuff(this.pOp1, this.F.n8 * 2);
  }
  toRprCompressed(arr, offset, a2) {
    this.tm.setBuff(this.pOp1, a2);
    if (a2.byteLength == this.F.n8 * 3) {
      this.tm.instance.exports[this.prefix + "_toAffine"](this.pOp1, this.pOp1);
    } else if (a2.byteLength != this.F.n8 * 2) {
      throw new Error("invalid point size");
    }
    this.tm.instance.exports[this.prefix + "_LEMtoC"](this.pOp1, this.pOp1);
    const res = this.tm.getBuff(this.pOp1, this.F.n8);
    arr.set(res, offset);
  }
  fromRprCompressed(arr, offset) {
    const buff = arr.slice(offset, offset + this.F.n8);
    this.tm.setBuff(this.pOp1, buff);
    this.tm.instance.exports[this.prefix + "_CtoLEM"](this.pOp1, this.pOp2);
    return this.tm.getBuff(this.pOp2, this.F.n8 * 2);
  }
  toUncompressed(a2) {
    const buff = new Uint8Array(this.F.n8 * 2);
    this.toRprUncompressed(buff, 0, a2);
    return buff;
  }
  toRprLEM(arr, offset, a2) {
    if (a2.byteLength == this.F.n8 * 2) {
      arr.set(a2, offset);
      return;
    } else if (a2.byteLength == this.F.n8 * 3) {
      this.tm.setBuff(this.pOp1, a2);
      this.tm.instance.exports[this.prefix + "_toAffine"](this.pOp1, this.pOp1);
      const res = this.tm.getBuff(this.pOp1, this.F.n8 * 2);
      arr.set(res, offset);
    } else {
      throw new Error("invalid point size");
    }
  }
  fromRprLEM(arr, offset) {
    offset = offset || 0;
    return arr.slice(offset, offset + this.F.n8 * 2);
  }
  toString(a2, radix) {
    if (a2.byteLength == this.F.n8 * 3) {
      const x = this.F.toString(a2.slice(0, this.F.n8), radix);
      const y = this.F.toString(a2.slice(this.F.n8, this.F.n8 * 2), radix);
      const z = this.F.toString(a2.slice(this.F.n8 * 2), radix);
      return `[ ${x}, ${y}, ${z} ]`;
    } else if (a2.byteLength == this.F.n8 * 2) {
      const x = this.F.toString(a2.slice(0, this.F.n8), radix);
      const y = this.F.toString(a2.slice(this.F.n8), radix);
      return `[ ${x}, ${y} ]`;
    } else {
      throw new Error("invalid point size");
    }
  }
  isValid(a2) {
    if (this.isZero(a2)) return true;
    const F = this.F;
    const aa = this.toAffine(a2);
    const x = aa.slice(0, this.F.n8);
    const y = aa.slice(this.F.n8, this.F.n8 * 2);
    const x3b = F.add(F.mul(F.square(x), x), this.b);
    const y2 = F.square(y);
    return F.eq(x3b, y2);
  }
  fromRng(rng) {
    const F = this.F;
    let P = [];
    let greatest;
    let x3b;
    do {
      P[0] = F.fromRng(rng);
      greatest = rng.nextBool();
      x3b = F.add(F.mul(F.square(P[0]), P[0]), this.b);
    } while (!F.isSquare(x3b));
    P[1] = F.sqrt(x3b);
    const s = F.isNegative(P[1]);
    if (greatest ^ s) P[1] = F.neg(P[1]);
    let Pbuff = new Uint8Array(this.F.n8 * 2);
    Pbuff.set(P[0]);
    Pbuff.set(P[1], this.F.n8);
    if (this.cofactor) {
      Pbuff = this.timesScalar(Pbuff, this.cofactor);
    }
    return Pbuff;
  }
  toObject(a2) {
    if (this.isZero(a2)) {
      return [
        this.F.toObject(this.F.zero),
        this.F.toObject(this.F.one),
        this.F.toObject(this.F.zero)
      ];
    }
    const x = this.F.toObject(a2.slice(0, this.F.n8));
    const y = this.F.toObject(a2.slice(this.F.n8, this.F.n8 * 2));
    let z;
    if (a2.byteLength == this.F.n8 * 3) {
      z = this.F.toObject(a2.slice(this.F.n8 * 2, this.F.n8 * 3));
    } else {
      z = this.F.toObject(this.F.one);
    }
    return [x, y, z];
  }
  fromObject(a2) {
    const x = this.F.fromObject(a2[0]);
    const y = this.F.fromObject(a2[1]);
    let z;
    if (a2.length == 3) {
      z = this.F.fromObject(a2[2]);
    } else {
      z = this.F.one;
    }
    if (this.F.isZero(z, this.F.one)) {
      return this.zeroAffine;
    } else if (this.F.eq(z, this.F.one)) {
      const buff = new Uint8Array(this.F.n8 * 2);
      buff.set(x);
      buff.set(y, this.F.n8);
      return buff;
    } else {
      const buff = new Uint8Array(this.F.n8 * 3);
      buff.set(x);
      buff.set(y, this.F.n8);
      buff.set(z, this.F.n8 * 2);
      return buff;
    }
  }
  e(a2) {
    if (a2 instanceof Uint8Array) return a2;
    return this.fromObject(a2);
  }
  x(a2) {
    const tmp = this.toAffine(a2);
    return tmp.slice(0, this.F.n8);
  }
  y(a2) {
    const tmp = this.toAffine(a2);
    return tmp.slice(this.F.n8);
  }
};
function thread(self) {
  const MAXMEM = 32767;
  let instance;
  let memory;
  if (self) {
    self.onmessage = function(e2) {
      let data;
      if (e2.data) {
        data = e2.data;
      } else {
        data = e2;
      }
      if (data[0].cmd == "INIT") {
        init(data[0]).then(function() {
          self.postMessage(data.result);
        });
      } else if (data[0].cmd == "TERMINATE") {
        self.close();
      } else {
        const res = runTask(data);
        self.postMessage(res);
      }
    };
  }
  async function init(data) {
    const code = new Uint8Array(data.code);
    const wasmModule = await WebAssembly.compile(code);
    memory = new WebAssembly.Memory({ initial: data.init, maximum: MAXMEM });
    instance = await WebAssembly.instantiate(wasmModule, {
      env: {
        "memory": memory
      }
    });
  }
  function alloc(length) {
    const u324 = new Uint32Array(memory.buffer, 0, 1);
    while (u324[0] & 3) u324[0]++;
    const res = u324[0];
    u324[0] += length;
    if (u324[0] + length > memory.buffer.byteLength) {
      const currentPages = memory.buffer.byteLength / 65536;
      let requiredPages = Math.floor((u324[0] + length) / 65536) + 1;
      if (requiredPages > MAXMEM) requiredPages = MAXMEM;
      memory.grow(requiredPages - currentPages);
    }
    return res;
  }
  function allocBuffer(buffer) {
    const p = alloc(buffer.byteLength);
    setBuffer(p, buffer);
    return p;
  }
  function getBuffer(pointer, length) {
    const u8 = new Uint8Array(memory.buffer);
    return new Uint8Array(u8.buffer, u8.byteOffset + pointer, length);
  }
  function setBuffer(pointer, buffer) {
    const u8 = new Uint8Array(memory.buffer);
    u8.set(new Uint8Array(buffer), pointer);
  }
  function runTask(task) {
    if (task[0].cmd == "INIT") {
      return init(task[0]);
    }
    const ctx = {
      vars: [],
      out: []
    };
    const u32a = new Uint32Array(memory.buffer, 0, 1);
    const oldAlloc = u32a[0];
    for (let i = 0; i < task.length; i++) {
      switch (task[i].cmd) {
        case "ALLOCSET":
          ctx.vars[task[i].var] = allocBuffer(task[i].buff);
          break;
        case "ALLOC":
          ctx.vars[task[i].var] = alloc(task[i].len);
          break;
        case "SET":
          setBuffer(ctx.vars[task[i].var], task[i].buff);
          break;
        case "CALL": {
          const params = [];
          for (let j = 0; j < task[i].params.length; j++) {
            const p = task[i].params[j];
            if (typeof p.var !== "undefined") {
              params.push(ctx.vars[p.var] + (p.offset || 0));
            } else if (typeof p.val != "undefined") {
              params.push(p.val);
            }
          }
          instance.exports[task[i].fnName](...params);
          break;
        }
        case "GET":
          ctx.out[task[i].out] = getBuffer(ctx.vars[task[i].var], task[i].len).slice();
          break;
        default:
          throw new Error("Invalid cmd");
      }
    }
    const u32b = new Uint32Array(memory.buffer, 0, 1);
    u32b[0] = oldAlloc;
    return ctx.out;
  }
  return runTask;
}
var MEM_SIZE = 25;
var Deferred = class {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var workerSource;
var threadStr = `(${'function thread(self) {\n    const MAXMEM = 32767;\n    let instance;\n    let memory;\n\n    if (self) {\n        self.onmessage = function(e) {\n            let data;\n            if (e.data) {\n                data = e.data;\n            } else {\n                data = e;\n            }\n\n            if (data[0].cmd == "INIT") {\n                init(data[0]).then(function() {\n                    self.postMessage(data.result);\n                });\n            } else if (data[0].cmd == "TERMINATE") {\n                self.close();\n            } else {\n                const res = runTask(data);\n                self.postMessage(res);\n            }\n        };\n    }\n\n    async function init(data) {\n        const code = new Uint8Array(data.code);\n        const wasmModule = await WebAssembly.compile(code);\n        memory = new WebAssembly.Memory({initial:data.init, maximum: MAXMEM});\n\n        instance = await WebAssembly.instantiate(wasmModule, {\n            env: {\n                "memory": memory\n            }\n        });\n    }\n\n\n\n    function alloc(length) {\n        const u32 = new Uint32Array(memory.buffer, 0, 1);\n        while (u32[0] & 3) u32[0]++;  // Return always aligned pointers\n        const res = u32[0];\n        u32[0] += length;\n        if (u32[0] + length > memory.buffer.byteLength) {\n            const currentPages = memory.buffer.byteLength / 0x10000;\n            let requiredPages = Math.floor((u32[0] + length) / 0x10000)+1;\n            if (requiredPages>MAXMEM) requiredPages=MAXMEM;\n            memory.grow(requiredPages-currentPages);\n        }\n        return res;\n    }\n\n    function allocBuffer(buffer) {\n        const p = alloc(buffer.byteLength);\n        setBuffer(p, buffer);\n        return p;\n    }\n\n    function getBuffer(pointer, length) {\n        const u8 = new Uint8Array(memory.buffer);\n        return new Uint8Array(u8.buffer, u8.byteOffset + pointer, length);\n    }\n\n    function setBuffer(pointer, buffer) {\n        const u8 = new Uint8Array(memory.buffer);\n        u8.set(new Uint8Array(buffer), pointer);\n    }\n\n    function runTask(task) {\n        if (task[0].cmd == "INIT") {\n            return init(task[0]);\n        }\n        const ctx = {\n            vars: [],\n            out: []\n        };\n        const u32a = new Uint32Array(memory.buffer, 0, 1);\n        const oldAlloc = u32a[0];\n        for (let i=0; i<task.length; i++) {\n            switch (task[i].cmd) {\n            case "ALLOCSET":\n                ctx.vars[task[i].var] = allocBuffer(task[i].buff);\n                break;\n            case "ALLOC":\n                ctx.vars[task[i].var] = alloc(task[i].len);\n                break;\n            case "SET":\n                setBuffer(ctx.vars[task[i].var], task[i].buff);\n                break;\n            case "CALL": {\n                const params = [];\n                for (let j=0; j<task[i].params.length; j++) {\n                    const p = task[i].params[j];\n                    if (typeof p.var !== "undefined") {\n                        params.push(ctx.vars[p.var] + (p.offset || 0));\n                    } else if (typeof p.val != "undefined") {\n                        params.push(p.val);\n                    }\n                }\n                instance.exports[task[i].fnName](...params);\n                break;\n            }\n            case "GET":\n                ctx.out[task[i].out] = getBuffer(ctx.vars[task[i].var], task[i].len).slice();\n                break;\n            default:\n                throw new Error("Invalid cmd");\n            }\n        }\n        const u32b = new Uint32Array(memory.buffer, 0, 1);\n        u32b[0] = oldAlloc;\n        return ctx.out;\n    }\n\n\n    return runTask;\n}'})(self)`;
{
  if (globalThis?.Blob) {
    const threadBytes = new TextEncoder().encode(threadStr);
    const workerBlob = new Blob([threadBytes], { type: "application/javascript" });
    workerSource = URL.createObjectURL(workerBlob);
  } else {
    workerSource = "data:application/javascript;base64," + globalThis.btoa(threadStr);
  }
}
async function buildThreadManager(wasm, singleThread) {
  const tm = new ThreadManager();
  tm.memory = new WebAssembly.Memory({ initial: MEM_SIZE });
  tm.u8 = new Uint8Array(tm.memory.buffer);
  tm.u32 = new Uint32Array(tm.memory.buffer);
  const wasmModule = await WebAssembly.compile(wasm.code);
  tm.instance = await WebAssembly.instantiate(wasmModule, {
    env: {
      "memory": tm.memory
    }
  });
  if (!globalThis?.Worker) {
    singleThread = true;
  }
  tm.singleThread = singleThread;
  tm.initalPFree = tm.u32[0];
  tm.pq = wasm.pq;
  tm.pr = wasm.pr;
  tm.pG1gen = wasm.pG1gen;
  tm.pG1zero = wasm.pG1zero;
  tm.pG2gen = wasm.pG2gen;
  tm.pG2zero = wasm.pG2zero;
  tm.pOneT = wasm.pOneT;
  if (singleThread) {
    tm.code = wasm.code;
    tm.taskManager = thread();
    await tm.taskManager([{
      cmd: "INIT",
      init: MEM_SIZE,
      code: tm.code.slice()
    }]);
    tm.concurrency = 1;
  } else {
    tm.workers = [];
    tm.pendingDeferreds = [];
    tm.working = [];
    let concurrency = 2;
    {
      if (typeof navigator === "object" && navigator.hardwareConcurrency) {
        concurrency = navigator.hardwareConcurrency;
      }
    }
    if (concurrency == 0) {
      concurrency = 2;
    }
    if (concurrency > 64) concurrency = 64;
    tm.concurrency = concurrency;
    for (let i = 0; i < concurrency; i++) {
      tm.workers[i] = new Worker(workerSource);
      tm.workers[i].addEventListener("message", getOnMsg(i));
      tm.working[i] = false;
    }
    const initPromises = [];
    for (let i = 0; i < tm.workers.length; i++) {
      const copyCode = wasm.code.slice();
      initPromises.push(tm.postAction(i, [{
        cmd: "INIT",
        init: MEM_SIZE,
        code: copyCode
      }], [copyCode.buffer]));
    }
    await Promise.all(initPromises);
  }
  return tm;
  function getOnMsg(i) {
    return function(e2) {
      let data;
      if (e2 && e2.data) {
        data = e2.data;
      } else {
        data = e2;
      }
      tm.working[i] = false;
      tm.pendingDeferreds[i].resolve(data);
      tm.processWorks();
    };
  }
}
var ThreadManager = class {
  constructor() {
    this.actionQueue = [];
    this.oldPFree = 0;
  }
  startSyncOp() {
    if (this.oldPFree != 0) throw new Error("Sync operation in progress");
    this.oldPFree = this.u32[0];
  }
  endSyncOp() {
    if (this.oldPFree == 0) throw new Error("No sync operation in progress");
    this.u32[0] = this.oldPFree;
    this.oldPFree = 0;
  }
  postAction(workerId, e2, transfers, _deferred) {
    if (this.working[workerId]) {
      throw new Error("Posting a job t a working worker");
    }
    this.working[workerId] = true;
    this.pendingDeferreds[workerId] = _deferred ? _deferred : new Deferred();
    this.workers[workerId].postMessage(e2, transfers);
    return this.pendingDeferreds[workerId].promise;
  }
  processWorks() {
    for (let i = 0; i < this.workers.length && this.actionQueue.length > 0; i++) {
      if (this.working[i] == false) {
        const work = this.actionQueue.shift();
        this.postAction(i, work.data, work.transfers, work.deferred);
      }
    }
  }
  queueAction(actionData, transfers) {
    const d2 = new Deferred();
    if (this.singleThread) {
      const res = this.taskManager(actionData);
      d2.resolve(res);
    } else {
      this.actionQueue.push({
        data: actionData,
        transfers,
        deferred: d2
      });
      this.processWorks();
    }
    return d2.promise;
  }
  resetMemory() {
    this.u32[0] = this.initalPFree;
  }
  allocBuff(buff) {
    const pointer = this.alloc(buff.byteLength);
    this.setBuff(pointer, buff);
    return pointer;
  }
  getBuff(pointer, length) {
    return this.u8.slice(pointer, pointer + length);
  }
  setBuff(pointer, buffer) {
    this.u8.set(new Uint8Array(buffer), pointer);
  }
  alloc(length) {
    while (this.u32[0] & 3) this.u32[0]++;
    const res = this.u32[0];
    this.u32[0] += length;
    return res;
  }
  async terminate() {
    for (let i = 0; i < this.workers.length; i++) {
      this.workers[i].postMessage([{ cmd: "TERMINATE" }]);
    }
    await sleep(200);
  }
};
function buildBatchApplyKey(curve2, groupName) {
  const G = curve2[groupName];
  const Fr2 = curve2.Fr;
  const tm = curve2.tm;
  curve2[groupName].batchApplyKey = async function(buff, first, inc, inType, outType) {
    inType = inType || "affine";
    outType = outType || "affine";
    let fnName, fnAffine;
    let sGin, sGmid, sGout;
    if (groupName == "G1") {
      if (inType == "jacobian") {
        sGin = G.F.n8 * 3;
        fnName = "g1m_batchApplyKey";
      } else {
        sGin = G.F.n8 * 2;
        fnName = "g1m_batchApplyKeyMixed";
      }
      sGmid = G.F.n8 * 3;
      if (outType == "jacobian") {
        sGout = G.F.n8 * 3;
      } else {
        fnAffine = "g1m_batchToAffine";
        sGout = G.F.n8 * 2;
      }
    } else if (groupName == "G2") {
      if (inType == "jacobian") {
        sGin = G.F.n8 * 3;
        fnName = "g2m_batchApplyKey";
      } else {
        sGin = G.F.n8 * 2;
        fnName = "g2m_batchApplyKeyMixed";
      }
      sGmid = G.F.n8 * 3;
      if (outType == "jacobian") {
        sGout = G.F.n8 * 3;
      } else {
        fnAffine = "g2m_batchToAffine";
        sGout = G.F.n8 * 2;
      }
    } else if (groupName == "Fr") {
      fnName = "frm_batchApplyKey";
      sGin = G.n8;
      sGmid = G.n8;
      sGout = G.n8;
    } else {
      throw new Error("Invalid group: " + groupName);
    }
    const nPoints = Math.floor(buff.byteLength / sGin);
    const pointsPerChunk = Math.floor(nPoints / tm.concurrency);
    const opPromises = [];
    inc = Fr2.e(inc);
    let t = Fr2.e(first);
    for (let i = 0; i < tm.concurrency; i++) {
      let n;
      if (i < tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const task = [];
      task.push({
        cmd: "ALLOCSET",
        var: 0,
        buff: buff.slice(i * pointsPerChunk * sGin, i * pointsPerChunk * sGin + n * sGin)
      });
      task.push({ cmd: "ALLOCSET", var: 1, buff: t });
      task.push({ cmd: "ALLOCSET", var: 2, buff: inc });
      task.push({ cmd: "ALLOC", var: 3, len: n * Math.max(sGmid, sGout) });
      task.push({
        cmd: "CALL",
        fnName,
        params: [
          { var: 0 },
          { val: n },
          { var: 1 },
          { var: 2 },
          { var: 3 }
        ]
      });
      if (fnAffine) {
        task.push({
          cmd: "CALL",
          fnName: fnAffine,
          params: [
            { var: 3 },
            { val: n },
            { var: 3 }
          ]
        });
      }
      task.push({ cmd: "GET", out: 0, var: 3, len: n * sGout });
      opPromises.push(tm.queueAction(task));
      t = Fr2.mul(t, Fr2.exp(inc, n));
    }
    const result2 = await Promise.all(opPromises);
    let outBuff;
    if (buff instanceof BigBuffer) {
      outBuff = new BigBuffer(nPoints * sGout);
    } else {
      outBuff = new Uint8Array(nPoints * sGout);
    }
    let p = 0;
    for (let i = 0; i < result2.length; i++) {
      outBuff.set(result2[i][0], p);
      p += result2[i][0].byteLength;
    }
    return outBuff;
  };
}
function buildPairing(curve2) {
  const tm = curve2.tm;
  curve2.pairing = function pairing(a2, b) {
    tm.startSyncOp();
    const pA = tm.allocBuff(curve2.G1.toJacobian(a2));
    const pB = tm.allocBuff(curve2.G2.toJacobian(b));
    const pRes = tm.alloc(curve2.Gt.n8);
    tm.instance.exports[curve2.name + "_pairing"](pA, pB, pRes);
    const res = tm.getBuff(pRes, curve2.Gt.n8);
    tm.endSyncOp();
    return res;
  };
  curve2.pairingEq = async function pairingEq() {
    let buffCt;
    let nEqs;
    if (arguments.length % 2 == 1) {
      buffCt = arguments[arguments.length - 1];
      nEqs = (arguments.length - 1) / 2;
    } else {
      buffCt = curve2.Gt.one;
      nEqs = arguments.length / 2;
    }
    const opPromises = [];
    for (let i = 0; i < nEqs; i++) {
      const task = [];
      const g1Buff = curve2.G1.toJacobian(arguments[i * 2]);
      task.push({ cmd: "ALLOCSET", var: 0, buff: g1Buff });
      task.push({ cmd: "ALLOC", var: 1, len: curve2.prePSize });
      const g2Buff = curve2.G2.toJacobian(arguments[i * 2 + 1]);
      task.push({ cmd: "ALLOCSET", var: 2, buff: g2Buff });
      task.push({ cmd: "ALLOC", var: 3, len: curve2.preQSize });
      task.push({ cmd: "ALLOC", var: 4, len: curve2.Gt.n8 });
      task.push({ cmd: "CALL", fnName: curve2.name + "_prepareG1", params: [
        { var: 0 },
        { var: 1 }
      ] });
      task.push({ cmd: "CALL", fnName: curve2.name + "_prepareG2", params: [
        { var: 2 },
        { var: 3 }
      ] });
      task.push({ cmd: "CALL", fnName: curve2.name + "_millerLoop", params: [
        { var: 1 },
        { var: 3 },
        { var: 4 }
      ] });
      task.push({ cmd: "GET", out: 0, var: 4, len: curve2.Gt.n8 });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result2 = await Promise.all(opPromises);
    tm.startSyncOp();
    const pRes = tm.alloc(curve2.Gt.n8);
    tm.instance.exports.ftm_one(pRes);
    for (let i = 0; i < result2.length; i++) {
      const pMR = tm.allocBuff(result2[i][0]);
      tm.instance.exports.ftm_mul(pRes, pMR, pRes);
    }
    tm.instance.exports[curve2.name + "_finalExponentiation"](pRes, pRes);
    const pCt = tm.allocBuff(buffCt);
    const r2 = !!tm.instance.exports.ftm_eq(pRes, pCt);
    tm.endSyncOp();
    return r2;
  };
  curve2.prepareG1 = function(p) {
    this.tm.startSyncOp();
    const pP = this.tm.allocBuff(p);
    const pPrepP = this.tm.alloc(this.prePSize);
    this.tm.instance.exports[this.name + "_prepareG1"](pP, pPrepP);
    const res = this.tm.getBuff(pPrepP, this.prePSize);
    this.tm.endSyncOp();
    return res;
  };
  curve2.prepareG2 = function(q) {
    this.tm.startSyncOp();
    const pQ = this.tm.allocBuff(q);
    const pPrepQ = this.tm.alloc(this.preQSize);
    this.tm.instance.exports[this.name + "_prepareG2"](pQ, pPrepQ);
    const res = this.tm.getBuff(pPrepQ, this.preQSize);
    this.tm.endSyncOp();
    return res;
  };
  curve2.millerLoop = function(preP, preQ) {
    this.tm.startSyncOp();
    const pPreP = this.tm.allocBuff(preP);
    const pPreQ = this.tm.allocBuff(preQ);
    const pRes = this.tm.alloc(this.Gt.n8);
    this.tm.instance.exports[this.name + "_millerLoop"](pPreP, pPreQ, pRes);
    const res = this.tm.getBuff(pRes, this.Gt.n8);
    this.tm.endSyncOp();
    return res;
  };
  curve2.finalExponentiation = function(a2) {
    this.tm.startSyncOp();
    const pA = this.tm.allocBuff(a2);
    const pRes = this.tm.alloc(this.Gt.n8);
    this.tm.instance.exports[this.name + "_finalExponentiation"](pA, pRes);
    const res = this.tm.getBuff(pRes, this.Gt.n8);
    this.tm.endSyncOp();
    return res;
  };
}
var pTSizes = [
  1,
  1,
  1,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  13,
  14,
  15,
  16,
  16,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17,
  17
];
function buildMultiexp2(curve2, groupName) {
  const G = curve2[groupName];
  const tm = G.tm;
  async function _multiExpChunk(buffBases, buffScalars, inType, logger, logText) {
    if (!(buffBases instanceof Uint8Array)) {
      if (logger) logger.error(`${logText} _multiExpChunk buffBases is not Uint8Array`);
      throw new Error(`${logText} _multiExpChunk buffBases is not Uint8Array`);
    }
    if (!(buffScalars instanceof Uint8Array)) {
      if (logger) logger.error(`${logText} _multiExpChunk buffScalars is not Uint8Array`);
      throw new Error(`${logText} _multiExpChunk buffScalars is not Uint8Array`);
    }
    inType = inType || "affine";
    let sGIn;
    let fnName;
    if (groupName == "G1") {
      if (inType == "affine") {
        fnName = "g1m_multiexpAffine_chunk";
        sGIn = G.F.n8 * 2;
      } else {
        fnName = "g1m_multiexp_chunk";
        sGIn = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        fnName = "g2m_multiexpAffine_chunk";
        sGIn = G.F.n8 * 2;
      } else {
        fnName = "g2m_multiexp_chunk";
        sGIn = G.F.n8 * 3;
      }
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buffBases.byteLength / sGIn);
    if (nPoints == 0) return G.zero;
    const sScalar = Math.floor(buffScalars.byteLength / nPoints);
    if (sScalar * nPoints != buffScalars.byteLength) {
      throw new Error("Scalar size does not match");
    }
    const bitChunkSize = pTSizes[log2(nPoints)];
    const nChunks = Math.floor((sScalar * 8 - 1) / bitChunkSize) + 1;
    const opPromises = [];
    for (let i = 0; i < nChunks; i++) {
      const task = [
        { cmd: "ALLOCSET", var: 0, buff: buffBases },
        { cmd: "ALLOCSET", var: 1, buff: buffScalars },
        { cmd: "ALLOC", var: 2, len: G.F.n8 * 3 },
        { cmd: "CALL", fnName, params: [
          { var: 0 },
          { var: 1 },
          { val: sScalar },
          { val: nPoints },
          { val: i * bitChunkSize },
          { val: Math.min(sScalar * 8 - i * bitChunkSize, bitChunkSize) },
          { var: 2 }
        ] },
        { cmd: "GET", out: 0, var: 2, len: G.F.n8 * 3 }
      ];
      opPromises.push(
        G.tm.queueAction(task)
      );
    }
    const result2 = await Promise.all(opPromises);
    let res = G.zero;
    for (let i = result2.length - 1; i >= 0; i--) {
      if (!G.isZero(res)) {
        for (let j = 0; j < bitChunkSize; j++) res = G.double(res);
      }
      res = G.add(res, result2[i][0]);
    }
    return res;
  }
  async function _multiExp(buffBases, buffScalars, inType, logger, logText) {
    const MAX_CHUNK_SIZE = 1 << 22;
    const MIN_CHUNK_SIZE = 1 << 10;
    let sGIn;
    if (groupName == "G1") {
      if (inType == "affine") {
        sGIn = G.F.n8 * 2;
      } else {
        sGIn = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sGIn = G.F.n8 * 2;
      } else {
        sGIn = G.F.n8 * 3;
      }
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buffBases.byteLength / sGIn);
    if (nPoints == 0) return G.zero;
    const sScalar = Math.floor(buffScalars.byteLength / nPoints);
    if (sScalar * nPoints != buffScalars.byteLength) {
      throw new Error("Scalar size does not match");
    }
    const bitChunkSize = pTSizes[log2(nPoints)];
    const nChunks = Math.floor((sScalar * 8 - 1) / bitChunkSize) + 1;
    let chunkSize;
    chunkSize = Math.floor(nPoints / (tm.concurrency / nChunks));
    if (chunkSize > MAX_CHUNK_SIZE) chunkSize = MAX_CHUNK_SIZE;
    if (chunkSize < MIN_CHUNK_SIZE) chunkSize = MIN_CHUNK_SIZE;
    const opPromises = [];
    for (let i = 0; i < nPoints; i += chunkSize) {
      if (logger) logger.debug(`Multiexp start: ${logText}: ${i}/${nPoints}`);
      const n = Math.min(nPoints - i, chunkSize);
      const buffBasesChunk = buffBases.slice(i * sGIn, (i + n) * sGIn);
      const buffScalarsChunk = buffScalars.slice(i * sScalar, (i + n) * sScalar);
      opPromises.push(_multiExpChunk(buffBasesChunk, buffScalarsChunk, inType, logger, logText).then((r2) => {
        if (logger) logger.debug(`Multiexp end: ${logText}: ${i}/${nPoints}`);
        return r2;
      }));
    }
    const result2 = await Promise.all(opPromises);
    let res = G.zero;
    for (let i = result2.length - 1; i >= 0; i--) {
      res = G.add(res, result2[i]);
    }
    return res;
  }
  G.multiExp = async function multiExpAffine(buffBases, buffScalars, logger, logText) {
    return await _multiExp(buffBases, buffScalars, "jacobian", logger, logText);
  };
  G.multiExpAffine = async function multiExpAffine(buffBases, buffScalars, logger, logText) {
    return await _multiExp(buffBases, buffScalars, "affine", logger, logText);
  };
}
function buildFFT2(curve2, groupName) {
  const G = curve2[groupName];
  const Fr2 = curve2.Fr;
  const tm = G.tm;
  async function _fft(buff, inverse, inType, outType, logger, loggerTxt) {
    inType = inType || "affine";
    outType = outType || "affine";
    const MAX_BITS_THREAD = 14;
    let sIn, sMid, sOut, fnIn2Mid, fnMid2Out, fnFFTMix, fnFFTJoin, fnFFTFinal;
    if (groupName == "G1") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g1m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      sMid = G.F.n8 * 3;
      if (inverse) {
        fnFFTFinal = "g1m_fftFinal";
      }
      fnFFTJoin = "g1m_fftJoin";
      fnFFTMix = "g1m_fftMix";
      if (outType == "affine") {
        sOut = G.F.n8 * 2;
        fnMid2Out = "g1m_batchToAffine";
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g2m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      sMid = G.F.n8 * 3;
      if (inverse) {
        fnFFTFinal = "g2m_fftFinal";
      }
      fnFFTJoin = "g2m_fftJoin";
      fnFFTMix = "g2m_fftMix";
      if (outType == "affine") {
        sOut = G.F.n8 * 2;
        fnMid2Out = "g2m_batchToAffine";
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "Fr") {
      sIn = G.n8;
      sMid = G.n8;
      sOut = G.n8;
      if (inverse) {
        fnFFTFinal = "frm_fftFinal";
      }
      fnFFTMix = "frm_fftMix";
      fnFFTJoin = "frm_fftJoin";
    }
    let returnArray = false;
    if (Array.isArray(buff)) {
      buff = array2buffer(buff, sIn);
      returnArray = true;
    } else {
      buff = buff.slice(0, buff.byteLength);
    }
    const nPoints = buff.byteLength / sIn;
    const bits3 = log2(nPoints);
    if (1 << bits3 != nPoints) {
      throw new Error("fft must be multiple of 2");
    }
    if (bits3 == Fr2.s + 1) {
      let buffOut2;
      if (inverse) {
        buffOut2 = await _fftExtInv(buff, inType, outType, logger, loggerTxt);
      } else {
        buffOut2 = await _fftExt(buff, inType, outType, logger, loggerTxt);
      }
      if (returnArray) {
        return buffer2array(buffOut2, sOut);
      } else {
        return buffOut2;
      }
    }
    let inv;
    if (inverse) {
      inv = Fr2.inv(Fr2.e(nPoints));
    }
    let buffOut;
    buffReverseBits(buff, sIn);
    let chunks;
    let pointsInChunk = Math.min(1 << MAX_BITS_THREAD, nPoints);
    let nChunks = nPoints / pointsInChunk;
    while (nChunks < tm.concurrency && pointsInChunk >= 16) {
      nChunks *= 2;
      pointsInChunk /= 2;
    }
    const l2Chunk = log2(pointsInChunk);
    const promises = [];
    for (let i = 0; i < nChunks; i++) {
      if (logger) logger.debug(`${loggerTxt}: fft ${bits3} mix start: ${i}/${nChunks}`);
      const task = [];
      task.push({ cmd: "ALLOC", var: 0, len: sMid * pointsInChunk });
      const buffChunk = buff.slice(pointsInChunk * i * sIn, pointsInChunk * (i + 1) * sIn);
      task.push({ cmd: "SET", var: 0, buff: buffChunk });
      if (fnIn2Mid) {
        task.push({ cmd: "CALL", fnName: fnIn2Mid, params: [{ var: 0 }, { val: pointsInChunk }, { var: 0 }] });
      }
      for (let j = 1; j <= l2Chunk; j++) {
        task.push({ cmd: "CALL", fnName: fnFFTMix, params: [{ var: 0 }, { val: pointsInChunk }, { val: j }] });
      }
      if (l2Chunk == bits3) {
        if (fnFFTFinal) {
          task.push({ cmd: "ALLOCSET", var: 1, buff: inv });
          task.push({ cmd: "CALL", fnName: fnFFTFinal, params: [
            { var: 0 },
            { val: pointsInChunk },
            { var: 1 }
          ] });
        }
        if (fnMid2Out) {
          task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 0 }, { val: pointsInChunk }, { var: 0 }] });
        }
        task.push({ cmd: "GET", out: 0, var: 0, len: pointsInChunk * sOut });
      } else {
        task.push({ cmd: "GET", out: 0, var: 0, len: sMid * pointsInChunk });
      }
      promises.push(tm.queueAction(task).then((r2) => {
        if (logger) logger.debug(`${loggerTxt}: fft ${bits3} mix end: ${i}/${nChunks}`);
        return r2;
      }));
    }
    chunks = await Promise.all(promises);
    for (let i = 0; i < nChunks; i++) chunks[i] = chunks[i][0];
    for (let i = l2Chunk + 1; i <= bits3; i++) {
      if (logger) logger.debug(`${loggerTxt}: fft  ${bits3}  join: ${i}/${bits3}`);
      const nGroups = 1 << bits3 - i;
      const nChunksPerGroup = nChunks / nGroups;
      const opPromises = [];
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const first = Fr2.exp(Fr2.w[i], k * pointsInChunk);
          const inc = Fr2.w[i];
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const task = [];
          task.push({ cmd: "ALLOCSET", var: 0, buff: chunks[o1] });
          task.push({ cmd: "ALLOCSET", var: 1, buff: chunks[o2] });
          task.push({ cmd: "ALLOCSET", var: 2, buff: first });
          task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
          task.push({ cmd: "CALL", fnName: fnFFTJoin, params: [
            { var: 0 },
            { var: 1 },
            { val: pointsInChunk },
            { var: 2 },
            { var: 3 }
          ] });
          if (i == bits3) {
            if (fnFFTFinal) {
              task.push({ cmd: "ALLOCSET", var: 4, buff: inv });
              task.push({ cmd: "CALL", fnName: fnFFTFinal, params: [
                { var: 0 },
                { val: pointsInChunk },
                { var: 4 }
              ] });
              task.push({ cmd: "CALL", fnName: fnFFTFinal, params: [
                { var: 1 },
                { val: pointsInChunk },
                { var: 4 }
              ] });
            }
            if (fnMid2Out) {
              task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 0 }, { val: pointsInChunk }, { var: 0 }] });
              task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 1 }, { val: pointsInChunk }, { var: 1 }] });
            }
            task.push({ cmd: "GET", out: 0, var: 0, len: pointsInChunk * sOut });
            task.push({ cmd: "GET", out: 1, var: 1, len: pointsInChunk * sOut });
          } else {
            task.push({ cmd: "GET", out: 0, var: 0, len: pointsInChunk * sMid });
            task.push({ cmd: "GET", out: 1, var: 1, len: pointsInChunk * sMid });
          }
          opPromises.push(tm.queueAction(task).then((r2) => {
            if (logger) logger.debug(`${loggerTxt}: fft ${bits3} join  ${i}/${bits3}  ${j + 1}/${nGroups} ${k}/${nChunksPerGroup / 2}`);
            return r2;
          }));
        }
      }
      const res = await Promise.all(opPromises);
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const resChunk = res.shift();
          chunks[o1] = resChunk[0];
          chunks[o2] = resChunk[1];
        }
      }
    }
    if (buff instanceof BigBuffer) {
      buffOut = new BigBuffer(nPoints * sOut);
    } else {
      buffOut = new Uint8Array(nPoints * sOut);
    }
    if (inverse) {
      buffOut.set(chunks[0].slice((pointsInChunk - 1) * sOut));
      let p = sOut;
      for (let i = nChunks - 1; i > 0; i--) {
        buffOut.set(chunks[i], p);
        p += pointsInChunk * sOut;
        delete chunks[i];
      }
      buffOut.set(chunks[0].slice(0, (pointsInChunk - 1) * sOut), p);
      delete chunks[0];
    } else {
      for (let i = 0; i < nChunks; i++) {
        buffOut.set(chunks[i], pointsInChunk * sOut * i);
        delete chunks[i];
      }
    }
    if (returnArray) {
      return buffer2array(buffOut, sOut);
    } else {
      return buffOut;
    }
  }
  async function _fftExt(buff, inType, outType, logger, loggerTxt) {
    let b1, b2;
    b1 = buff.slice(0, buff.byteLength / 2);
    b2 = buff.slice(buff.byteLength / 2, buff.byteLength);
    const promises = [];
    [b1, b2] = await _fftJoinExt(b1, b2, "fftJoinExt", Fr2.one, Fr2.shift, inType, "jacobian", logger, loggerTxt);
    promises.push(_fft(b1, false, "jacobian", outType, logger, loggerTxt));
    promises.push(_fft(b2, false, "jacobian", outType, logger, loggerTxt));
    const res1 = await Promise.all(promises);
    let buffOut;
    if (res1[0].byteLength > 1 << 28) {
      buffOut = new BigBuffer(res1[0].byteLength * 2);
    } else {
      buffOut = new Uint8Array(res1[0].byteLength * 2);
    }
    buffOut.set(res1[0]);
    buffOut.set(res1[1], res1[0].byteLength);
    return buffOut;
  }
  async function _fftExtInv(buff, inType, outType, logger, loggerTxt) {
    let b1, b2;
    b1 = buff.slice(0, buff.byteLength / 2);
    b2 = buff.slice(buff.byteLength / 2, buff.byteLength);
    const promises = [];
    promises.push(_fft(b1, true, inType, "jacobian", logger, loggerTxt));
    promises.push(_fft(b2, true, inType, "jacobian", logger, loggerTxt));
    [b1, b2] = await Promise.all(promises);
    const res1 = await _fftJoinExt(b1, b2, "fftJoinExtInv", Fr2.one, Fr2.shiftInv, "jacobian", outType, logger, loggerTxt);
    let buffOut;
    if (res1[0].byteLength > 1 << 28) {
      buffOut = new BigBuffer(res1[0].byteLength * 2);
    } else {
      buffOut = new Uint8Array(res1[0].byteLength * 2);
    }
    buffOut.set(res1[0]);
    buffOut.set(res1[1], res1[0].byteLength);
    return buffOut;
  }
  async function _fftJoinExt(buff1, buff2, fn, first, inc, inType, outType, logger, loggerTxt) {
    const MAX_CHUNK_SIZE = 1 << 16;
    const MIN_CHUNK_SIZE = 1 << 4;
    let fnName;
    let fnIn2Mid, fnMid2Out;
    let sOut, sIn, sMid;
    if (groupName == "G1") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g1m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      sMid = G.F.n8 * 3;
      fnName = "g1m_" + fn;
      if (outType == "affine") {
        fnMid2Out = "g1m_batchToAffine";
        sOut = G.F.n8 * 2;
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
        fnIn2Mid = "g2m_batchToJacobian";
      } else {
        sIn = G.F.n8 * 3;
      }
      fnName = "g2m_" + fn;
      sMid = G.F.n8 * 3;
      if (outType == "affine") {
        fnMid2Out = "g2m_batchToAffine";
        sOut = G.F.n8 * 2;
      } else {
        sOut = G.F.n8 * 3;
      }
    } else if (groupName == "Fr") {
      sIn = Fr2.n8;
      sOut = Fr2.n8;
      sMid = Fr2.n8;
      fnName = "frm_" + fn;
    } else {
      throw new Error("Invalid group");
    }
    if (buff1.byteLength != buff2.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const nPoints = Math.floor(buff1.byteLength / sIn);
    if (nPoints != 1 << log2(nPoints)) {
      throw new Error("Invalid number of points");
    }
    let chunkSize = Math.floor(nPoints / tm.concurrency);
    if (chunkSize < MIN_CHUNK_SIZE) chunkSize = MIN_CHUNK_SIZE;
    if (chunkSize > MAX_CHUNK_SIZE) chunkSize = MAX_CHUNK_SIZE;
    const opPromises = [];
    for (let i = 0; i < nPoints; i += chunkSize) {
      if (logger) logger.debug(`${loggerTxt}: fftJoinExt Start: ${i}/${nPoints}`);
      const n = Math.min(nPoints - i, chunkSize);
      const firstChunk = Fr2.mul(first, Fr2.exp(inc, i));
      const task = [];
      const b1 = buff1.slice(i * sIn, (i + n) * sIn);
      const b2 = buff2.slice(i * sIn, (i + n) * sIn);
      task.push({ cmd: "ALLOC", var: 0, len: sMid * n });
      task.push({ cmd: "SET", var: 0, buff: b1 });
      task.push({ cmd: "ALLOC", var: 1, len: sMid * n });
      task.push({ cmd: "SET", var: 1, buff: b2 });
      task.push({ cmd: "ALLOCSET", var: 2, buff: firstChunk });
      task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
      if (fnIn2Mid) {
        task.push({ cmd: "CALL", fnName: fnIn2Mid, params: [{ var: 0 }, { val: n }, { var: 0 }] });
        task.push({ cmd: "CALL", fnName: fnIn2Mid, params: [{ var: 1 }, { val: n }, { var: 1 }] });
      }
      task.push({ cmd: "CALL", fnName, params: [
        { var: 0 },
        { var: 1 },
        { val: n },
        { var: 2 },
        { var: 3 },
        { val: Fr2.s }
      ] });
      if (fnMid2Out) {
        task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 0 }, { val: n }, { var: 0 }] });
        task.push({ cmd: "CALL", fnName: fnMid2Out, params: [{ var: 1 }, { val: n }, { var: 1 }] });
      }
      task.push({ cmd: "GET", out: 0, var: 0, len: n * sOut });
      task.push({ cmd: "GET", out: 1, var: 1, len: n * sOut });
      opPromises.push(
        tm.queueAction(task).then((r2) => {
          if (logger) logger.debug(`${loggerTxt}: fftJoinExt End: ${i}/${nPoints}`);
          return r2;
        })
      );
    }
    const result2 = await Promise.all(opPromises);
    let fullBuffOut1;
    let fullBuffOut2;
    if (nPoints * sOut > 1 << 28) {
      fullBuffOut1 = new BigBuffer(nPoints * sOut);
      fullBuffOut2 = new BigBuffer(nPoints * sOut);
    } else {
      fullBuffOut1 = new Uint8Array(nPoints * sOut);
      fullBuffOut2 = new Uint8Array(nPoints * sOut);
    }
    let p = 0;
    for (let i = 0; i < result2.length; i++) {
      fullBuffOut1.set(result2[i][0], p);
      fullBuffOut2.set(result2[i][1], p);
      p += result2[i][0].byteLength;
    }
    return [fullBuffOut1, fullBuffOut2];
  }
  G.fft = async function(buff, inType, outType, logger, loggerTxt) {
    return await _fft(buff, false, inType, outType, logger, loggerTxt);
  };
  G.ifft = async function(buff, inType, outType, logger, loggerTxt) {
    return await _fft(buff, true, inType, outType, logger, loggerTxt);
  };
  G.lagrangeEvaluations = async function(buff, inType, outType, logger, loggerTxt) {
    inType = inType || "affine";
    outType = outType || "affine";
    let sIn;
    if (groupName == "G1") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
      } else {
        sIn = G.F.n8 * 3;
      }
    } else if (groupName == "G2") {
      if (inType == "affine") {
        sIn = G.F.n8 * 2;
      } else {
        sIn = G.F.n8 * 3;
      }
    } else if (groupName == "Fr") {
      sIn = Fr2.n8;
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = buff.byteLength / sIn;
    const bits3 = log2(nPoints);
    if (2 ** bits3 * sIn != buff.byteLength) {
      if (logger) logger.error("lagrangeEvaluations iinvalid input size");
      throw new Error("lagrangeEvaluations invalid Input size");
    }
    if (bits3 <= Fr2.s) {
      return await G.ifft(buff, inType, outType, logger, loggerTxt);
    }
    if (bits3 > Fr2.s + 1) {
      if (logger) logger.error("lagrangeEvaluations input too big");
      throw new Error("lagrangeEvaluations input too big");
    }
    let t0 = buff.slice(0, buff.byteLength / 2);
    let t1 = buff.slice(buff.byteLength / 2, buff.byteLength);
    const shiftToSmallM = Fr2.exp(Fr2.shift, nPoints / 2);
    const sConst = Fr2.inv(Fr2.sub(Fr2.one, shiftToSmallM));
    [t0, t1] = await _fftJoinExt(t0, t1, "prepareLagrangeEvaluation", sConst, Fr2.shiftInv, inType, "jacobian", logger, loggerTxt + " prep");
    const promises = [];
    promises.push(_fft(t0, true, "jacobian", outType, logger, loggerTxt + " t0"));
    promises.push(_fft(t1, true, "jacobian", outType, logger, loggerTxt + " t1"));
    [t0, t1] = await Promise.all(promises);
    let buffOut;
    if (t0.byteLength > 1 << 28) {
      buffOut = new BigBuffer(t0.byteLength * 2);
    } else {
      buffOut = new Uint8Array(t0.byteLength * 2);
    }
    buffOut.set(t0);
    buffOut.set(t1, t0.byteLength);
    return buffOut;
  };
  G.fftMix = async function fftMix(buff) {
    const sG = G.F.n8 * 3;
    let fnName, fnFFTJoin;
    if (groupName == "G1") {
      fnName = "g1m_fftMix";
      fnFFTJoin = "g1m_fftJoin";
    } else if (groupName == "G2") {
      fnName = "g2m_fftMix";
      fnFFTJoin = "g2m_fftJoin";
    } else if (groupName == "Fr") {
      fnName = "frm_fftMix";
      fnFFTJoin = "frm_fftJoin";
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buff.byteLength / sG);
    const power = log2(nPoints);
    let nChunks = 1 << log2(tm.concurrency);
    if (nPoints <= nChunks * 2) nChunks = 1;
    const pointsPerChunk = nPoints / nChunks;
    const powerChunk = log2(pointsPerChunk);
    const opPromises = [];
    for (let i = 0; i < nChunks; i++) {
      const task = [];
      const b = buff.slice(i * pointsPerChunk * sG, (i + 1) * pointsPerChunk * sG);
      task.push({ cmd: "ALLOCSET", var: 0, buff: b });
      for (let j = 1; j <= powerChunk; j++) {
        task.push({ cmd: "CALL", fnName, params: [
          { var: 0 },
          { val: pointsPerChunk },
          { val: j }
        ] });
      }
      task.push({ cmd: "GET", out: 0, var: 0, len: pointsPerChunk * sG });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result2 = await Promise.all(opPromises);
    const chunks = [];
    for (let i = 0; i < result2.length; i++) chunks[i] = result2[i][0];
    for (let i = powerChunk + 1; i <= power; i++) {
      const nGroups = 1 << power - i;
      const nChunksPerGroup = nChunks / nGroups;
      const opPromises2 = [];
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const first = Fr2.exp(Fr2.w[i], k * pointsPerChunk);
          const inc = Fr2.w[i];
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const task = [];
          task.push({ cmd: "ALLOCSET", var: 0, buff: chunks[o1] });
          task.push({ cmd: "ALLOCSET", var: 1, buff: chunks[o2] });
          task.push({ cmd: "ALLOCSET", var: 2, buff: first });
          task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
          task.push({ cmd: "CALL", fnName: fnFFTJoin, params: [
            { var: 0 },
            { var: 1 },
            { val: pointsPerChunk },
            { var: 2 },
            { var: 3 }
          ] });
          task.push({ cmd: "GET", out: 0, var: 0, len: pointsPerChunk * sG });
          task.push({ cmd: "GET", out: 1, var: 1, len: pointsPerChunk * sG });
          opPromises2.push(tm.queueAction(task));
        }
      }
      const res = await Promise.all(opPromises2);
      for (let j = 0; j < nGroups; j++) {
        for (let k = 0; k < nChunksPerGroup / 2; k++) {
          const o1 = j * nChunksPerGroup + k;
          const o2 = j * nChunksPerGroup + k + nChunksPerGroup / 2;
          const resChunk = res.shift();
          chunks[o1] = resChunk[0];
          chunks[o2] = resChunk[1];
        }
      }
    }
    let fullBuffOut;
    if (buff instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sG);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sG);
    }
    let p = 0;
    for (let i = 0; i < nChunks; i++) {
      fullBuffOut.set(chunks[i], p);
      p += chunks[i].byteLength;
    }
    return fullBuffOut;
  };
  G.fftJoin = async function fftJoin(buff1, buff2, first, inc) {
    const sG = G.F.n8 * 3;
    let fnName;
    if (groupName == "G1") {
      fnName = "g1m_fftJoin";
    } else if (groupName == "G2") {
      fnName = "g2m_fftJoin";
    } else if (groupName == "Fr") {
      fnName = "frm_fftJoin";
    } else {
      throw new Error("Invalid group");
    }
    if (buff1.byteLength != buff2.byteLength) {
      throw new Error("Invalid buffer size");
    }
    const nPoints = Math.floor(buff1.byteLength / sG);
    if (nPoints != 1 << log2(nPoints)) {
      throw new Error("Invalid number of points");
    }
    let nChunks = 1 << log2(tm.concurrency);
    if (nPoints <= nChunks * 2) nChunks = 1;
    const pointsPerChunk = nPoints / nChunks;
    const opPromises = [];
    for (let i = 0; i < nChunks; i++) {
      const task = [];
      const firstChunk = Fr2.mul(first, Fr2.exp(inc, i * pointsPerChunk));
      const b1 = buff1.slice(i * pointsPerChunk * sG, (i + 1) * pointsPerChunk * sG);
      const b2 = buff2.slice(i * pointsPerChunk * sG, (i + 1) * pointsPerChunk * sG);
      task.push({ cmd: "ALLOCSET", var: 0, buff: b1 });
      task.push({ cmd: "ALLOCSET", var: 1, buff: b2 });
      task.push({ cmd: "ALLOCSET", var: 2, buff: firstChunk });
      task.push({ cmd: "ALLOCSET", var: 3, buff: inc });
      task.push({ cmd: "CALL", fnName, params: [
        { var: 0 },
        { var: 1 },
        { val: pointsPerChunk },
        { var: 2 },
        { var: 3 }
      ] });
      task.push({ cmd: "GET", out: 0, var: 0, len: pointsPerChunk * sG });
      task.push({ cmd: "GET", out: 1, var: 1, len: pointsPerChunk * sG });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result2 = await Promise.all(opPromises);
    let fullBuffOut1;
    let fullBuffOut2;
    if (buff1 instanceof BigBuffer) {
      fullBuffOut1 = new BigBuffer(nPoints * sG);
      fullBuffOut2 = new BigBuffer(nPoints * sG);
    } else {
      fullBuffOut1 = new Uint8Array(nPoints * sG);
      fullBuffOut2 = new Uint8Array(nPoints * sG);
    }
    let p = 0;
    for (let i = 0; i < result2.length; i++) {
      fullBuffOut1.set(result2[i][0], p);
      fullBuffOut2.set(result2[i][1], p);
      p += result2[i][0].byteLength;
    }
    return [fullBuffOut1, fullBuffOut2];
  };
  G.fftFinal = async function fftFinal(buff, factor) {
    const sG = G.F.n8 * 3;
    const sGout = G.F.n8 * 2;
    let fnName, fnToAffine;
    if (groupName == "G1") {
      fnName = "g1m_fftFinal";
      fnToAffine = "g1m_batchToAffine";
    } else if (groupName == "G2") {
      fnName = "g2m_fftFinal";
      fnToAffine = "g2m_batchToAffine";
    } else {
      throw new Error("Invalid group");
    }
    const nPoints = Math.floor(buff.byteLength / sG);
    if (nPoints != 1 << log2(nPoints)) {
      throw new Error("Invalid number of points");
    }
    const pointsPerChunk = Math.floor(nPoints / tm.concurrency);
    const opPromises = [];
    for (let i = 0; i < tm.concurrency; i++) {
      let n;
      if (i < tm.concurrency - 1) {
        n = pointsPerChunk;
      } else {
        n = nPoints - i * pointsPerChunk;
      }
      if (n == 0) continue;
      const task = [];
      const b = buff.slice(i * pointsPerChunk * sG, (i * pointsPerChunk + n) * sG);
      task.push({ cmd: "ALLOCSET", var: 0, buff: b });
      task.push({ cmd: "ALLOCSET", var: 1, buff: factor });
      task.push({ cmd: "CALL", fnName, params: [
        { var: 0 },
        { val: n },
        { var: 1 }
      ] });
      task.push({ cmd: "CALL", fnName: fnToAffine, params: [
        { var: 0 },
        { val: n },
        { var: 0 }
      ] });
      task.push({ cmd: "GET", out: 0, var: 0, len: n * sGout });
      opPromises.push(
        tm.queueAction(task)
      );
    }
    const result2 = await Promise.all(opPromises);
    let fullBuffOut;
    if (buff instanceof BigBuffer) {
      fullBuffOut = new BigBuffer(nPoints * sGout);
    } else {
      fullBuffOut = new Uint8Array(nPoints * sGout);
    }
    let p = 0;
    for (let i = result2.length - 1; i >= 0; i--) {
      fullBuffOut.set(result2[i][0], p);
      p += result2[i][0].byteLength;
    }
    return fullBuffOut;
  };
}
async function buildEngine(params) {
  const tm = await buildThreadManager(params.wasm, params.singleThread);
  const curve2 = {};
  curve2.q = e(params.wasm.q.toString());
  curve2.r = e(params.wasm.r.toString());
  curve2.name = params.name;
  curve2.tm = tm;
  curve2.prePSize = params.wasm.prePSize;
  curve2.preQSize = params.wasm.preQSize;
  curve2.Fr = new WasmField1(tm, "frm", params.n8r, params.r);
  curve2.F1 = new WasmField1(tm, "f1m", params.n8q, params.q);
  curve2.F2 = new WasmField2(tm, "f2m", curve2.F1);
  curve2.G1 = new WasmCurve(tm, "g1m", curve2.F1, params.wasm.pG1gen, params.wasm.pG1b, params.cofactorG1);
  curve2.G2 = new WasmCurve(tm, "g2m", curve2.F2, params.wasm.pG2gen, params.wasm.pG2b, params.cofactorG2);
  curve2.F6 = new WasmField3(tm, "f6m", curve2.F2);
  curve2.F12 = new WasmField2(tm, "ftm", curve2.F6);
  curve2.Gt = curve2.F12;
  buildBatchApplyKey(curve2, "G1");
  buildBatchApplyKey(curve2, "G2");
  buildBatchApplyKey(curve2, "Fr");
  buildMultiexp2(curve2, "G1");
  buildMultiexp2(curve2, "G2");
  buildFFT2(curve2, "G1");
  buildFFT2(curve2, "G2");
  buildFFT2(curve2, "Fr");
  buildPairing(curve2);
  curve2.array2buffer = function(arr, sG) {
    const buff = new Uint8Array(sG * arr.length);
    for (let i = 0; i < arr.length; i++) {
      buff.set(arr[i], i * sG);
    }
    return buff;
  };
  curve2.buffer2array = function(buff, sG) {
    const n = buff.byteLength / sG;
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = buff.slice(i * sG, i * sG + sG);
    }
    return arr;
  };
  return curve2;
}
function toNumber(n) {
  return BigInt(n);
}
function isNegative(n) {
  return n < 0n;
}
function isZero(n) {
  return n === 0n;
}
function bitLength(n) {
  if (isNegative(n)) {
    return n.toString(2).length - 1;
  } else {
    return n.toString(2).length;
  }
}
function u32(n) {
  const b = [];
  const v = toNumber(n);
  b.push(Number(v & 0xFFn));
  b.push(Number(v >> 8n & 0xFFn));
  b.push(Number(v >> 16n & 0xFFn));
  b.push(Number(v >> 24n & 0xFFn));
  return b;
}
function toUTF8Array(str) {
  var utf8 = [];
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 128) utf8.push(charcode);
    else if (charcode < 2048) {
      utf8.push(
        192 | charcode >> 6,
        128 | charcode & 63
      );
    } else if (charcode < 55296 || charcode >= 57344) {
      utf8.push(
        224 | charcode >> 12,
        128 | charcode >> 6 & 63,
        128 | charcode & 63
      );
    } else {
      i++;
      charcode = 65536 + ((charcode & 1023) << 10 | str.charCodeAt(i) & 1023);
      utf8.push(
        240 | charcode >> 18,
        128 | charcode >> 12 & 63,
        128 | charcode >> 6 & 63,
        128 | charcode & 63
      );
    }
  }
  return utf8;
}
function string(str) {
  const bytes2 = toUTF8Array(str);
  return [...varuint32(bytes2.length), ...bytes2];
}
function varuint(n) {
  const code = [];
  let v = toNumber(n);
  if (isNegative(v)) throw new Error("Number cannot be negative");
  while (!isZero(v)) {
    code.push(Number(v & 0x7Fn));
    v = v >> 7n;
  }
  if (code.length == 0) code.push(0);
  for (let i = 0; i < code.length - 1; i++) {
    code[i] = code[i] | 128;
  }
  return code;
}
function varint(_n) {
  let n, sign;
  const bits3 = bitLength(_n);
  if (_n < 0) {
    sign = true;
    n = (1n << BigInt(bits3)) + _n;
  } else {
    sign = false;
    n = toNumber(_n);
  }
  const paddingBits = 7 - bits3 % 7;
  const padding = (1n << BigInt(paddingBits)) - 1n << BigInt(bits3);
  const paddingMask = (1 << 7 - paddingBits) - 1 | 128;
  const code = varuint(n + padding);
  if (!sign) {
    code[code.length - 1] = code[code.length - 1] & paddingMask;
  }
  return code;
}
function varint32(n) {
  let v = toNumber(n);
  if (v > 0xFFFFFFFFn) throw new Error("Number too big");
  if (v > 0x7FFFFFFFn) v = v - 0x100000000n;
  if (v < -2147483648n) throw new Error("Number too small");
  return varint(v);
}
function varint64(n) {
  let v = toNumber(n);
  if (v > 0xFFFFFFFFFFFFFFFFn) throw new Error("Number too big");
  if (v > 0x7FFFFFFFFFFFFFFFn) v = v - 0x10000000000000000n;
  if (v < -9223372036854775808n) throw new Error("Number too small");
  return varint(v);
}
function varuint32(n) {
  let v = toNumber(n);
  if (v > 0xFFFFFFFFn) throw new Error("Number too big");
  return varuint(v);
}
function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ("0" + (byte & 255).toString(16)).slice(-2);
  }).join("");
}
var CodeBuilder = class {
  constructor(func) {
    this.func = func;
    this.functionName = func.functionName;
    this.module = func.module;
  }
  setLocal(localName, valCode) {
    const idx = this.func.localIdxByName[localName];
    if (idx === void 0)
      throw new Error(`Local Variable not defined: Function: ${this.functionName} local: ${localName} `);
    return [...valCode, 33, ...varuint32(idx)];
  }
  teeLocal(localName, valCode) {
    const idx = this.func.localIdxByName[localName];
    if (idx === void 0)
      throw new Error(`Local Variable not defined: Function: ${this.functionName} local: ${localName} `);
    return [...valCode, 34, ...varuint32(idx)];
  }
  getLocal(localName) {
    const idx = this.func.localIdxByName[localName];
    if (idx === void 0)
      throw new Error(`Local Variable not defined: Function: ${this.functionName} local: ${localName} `);
    return [32, ...varuint32(idx)];
  }
  i64_load8_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 48, align, ...varuint32(offset)];
  }
  i64_load8_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 49, align, ...varuint32(offset)];
  }
  i64_load16_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 50, align, ...varuint32(offset)];
  }
  i64_load16_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 51, align, ...varuint32(offset)];
  }
  i64_load32_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 2 : _align;
    return [...idxCode, 52, align, ...varuint32(offset)];
  }
  i64_load32_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 2 : _align;
    return [...idxCode, 53, align, ...varuint32(offset)];
  }
  i64_load(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 3 : _align;
    return [...idxCode, 41, align, ...varuint32(offset)];
  }
  i64_store(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 3;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 3;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 55, align, ...varuint32(offset)];
  }
  i64_store32(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 2;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 2;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 62, align, ...varuint32(offset)];
  }
  i64_store16(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 1;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 1;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 61, align, ...varuint32(offset)];
  }
  i64_store8(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 0;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 0;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 60, align, ...varuint32(offset)];
  }
  i32_load8_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 44, align, ...varuint32(offset)];
  }
  i32_load8_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 0 : _align;
    return [...idxCode, 45, align, ...varuint32(offset)];
  }
  i32_load16_s(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 46, align, ...varuint32(offset)];
  }
  i32_load16_u(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 1 : _align;
    return [...idxCode, 47, align, ...varuint32(offset)];
  }
  i32_load(idxCode, _offset, _align) {
    const offset = _offset || 0;
    const align = _align === void 0 ? 2 : _align;
    return [...idxCode, 40, align, ...varuint32(offset)];
  }
  i32_store(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 2;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 2;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 54, align, ...varuint32(offset)];
  }
  i32_store16(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 1;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 1;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 59, align, ...varuint32(offset)];
  }
  i32_store8(idxCode, _offset, _align, _codeVal) {
    let offset, align, codeVal;
    if (Array.isArray(_offset)) {
      offset = 0;
      align = 0;
      codeVal = _offset;
    } else if (Array.isArray(_align)) {
      offset = _offset;
      align = 0;
      codeVal = _align;
    } else if (Array.isArray(_codeVal)) {
      offset = _offset;
      align = _align;
      codeVal = _codeVal;
    }
    return [...idxCode, ...codeVal, 58, align, ...varuint32(offset)];
  }
  call(fnName, ...args) {
    const idx = this.module.functionIdxByName[fnName];
    if (idx === void 0)
      throw new Error(`Function not defined: Function: ${fnName}`);
    return [...[].concat(...args), 16, ...varuint32(idx)];
  }
  call_indirect(fnIdx, ...args) {
    return [...[].concat(...args), ...fnIdx, 17, 0, 0];
  }
  if(condCode, thenCode, elseCode) {
    if (elseCode) {
      return [...condCode, 4, 64, ...thenCode, 5, ...elseCode, 11];
    } else {
      return [...condCode, 4, 64, ...thenCode, 11];
    }
  }
  block(bCode) {
    return [2, 64, ...bCode, 11];
  }
  loop(...args) {
    return [3, 64, ...[].concat(...[...args]), 11];
  }
  br_if(relPath, condCode) {
    return [...condCode, 13, ...varuint32(relPath)];
  }
  br(relPath) {
    return [12, ...varuint32(relPath)];
  }
  ret(rCode) {
    return [...rCode, 15];
  }
  drop(dCode) {
    return [...dCode, 26];
  }
  i64_const(num2) {
    return [66, ...varint64(num2)];
  }
  i32_const(num2) {
    return [65, ...varint32(num2)];
  }
  i64_eqz(opcode) {
    return [...opcode, 80];
  }
  i64_eq(op1code, op2code) {
    return [...op1code, ...op2code, 81];
  }
  i64_ne(op1code, op2code) {
    return [...op1code, ...op2code, 82];
  }
  i64_lt_s(op1code, op2code) {
    return [...op1code, ...op2code, 83];
  }
  i64_lt_u(op1code, op2code) {
    return [...op1code, ...op2code, 84];
  }
  i64_gt_s(op1code, op2code) {
    return [...op1code, ...op2code, 85];
  }
  i64_gt_u(op1code, op2code) {
    return [...op1code, ...op2code, 86];
  }
  i64_le_s(op1code, op2code) {
    return [...op1code, ...op2code, 87];
  }
  i64_le_u(op1code, op2code) {
    return [...op1code, ...op2code, 88];
  }
  i64_ge_s(op1code, op2code) {
    return [...op1code, ...op2code, 89];
  }
  i64_ge_u(op1code, op2code) {
    return [...op1code, ...op2code, 90];
  }
  i64_add(op1code, op2code) {
    return [...op1code, ...op2code, 124];
  }
  i64_sub(op1code, op2code) {
    return [...op1code, ...op2code, 125];
  }
  i64_mul(op1code, op2code) {
    return [...op1code, ...op2code, 126];
  }
  i64_div_s(op1code, op2code) {
    return [...op1code, ...op2code, 127];
  }
  i64_div_u(op1code, op2code) {
    return [...op1code, ...op2code, 128];
  }
  i64_rem_s(op1code, op2code) {
    return [...op1code, ...op2code, 129];
  }
  i64_rem_u(op1code, op2code) {
    return [...op1code, ...op2code, 130];
  }
  i64_and(op1code, op2code) {
    return [...op1code, ...op2code, 131];
  }
  i64_or(op1code, op2code) {
    return [...op1code, ...op2code, 132];
  }
  i64_xor(op1code, op2code) {
    return [...op1code, ...op2code, 133];
  }
  i64_shl(op1code, op2code) {
    return [...op1code, ...op2code, 134];
  }
  i64_shr_s(op1code, op2code) {
    return [...op1code, ...op2code, 135];
  }
  i64_shr_u(op1code, op2code) {
    return [...op1code, ...op2code, 136];
  }
  i64_extend_i32_s(op1code) {
    return [...op1code, 172];
  }
  i64_extend_i32_u(op1code) {
    return [...op1code, 173];
  }
  i64_clz(op1code) {
    return [...op1code, 121];
  }
  i64_ctz(op1code) {
    return [...op1code, 122];
  }
  i32_eqz(op1code) {
    return [...op1code, 69];
  }
  i32_eq(op1code, op2code) {
    return [...op1code, ...op2code, 70];
  }
  i32_ne(op1code, op2code) {
    return [...op1code, ...op2code, 71];
  }
  i32_lt_s(op1code, op2code) {
    return [...op1code, ...op2code, 72];
  }
  i32_lt_u(op1code, op2code) {
    return [...op1code, ...op2code, 73];
  }
  i32_gt_s(op1code, op2code) {
    return [...op1code, ...op2code, 74];
  }
  i32_gt_u(op1code, op2code) {
    return [...op1code, ...op2code, 75];
  }
  i32_le_s(op1code, op2code) {
    return [...op1code, ...op2code, 76];
  }
  i32_le_u(op1code, op2code) {
    return [...op1code, ...op2code, 77];
  }
  i32_ge_s(op1code, op2code) {
    return [...op1code, ...op2code, 78];
  }
  i32_ge_u(op1code, op2code) {
    return [...op1code, ...op2code, 79];
  }
  i32_add(op1code, op2code) {
    return [...op1code, ...op2code, 106];
  }
  i32_sub(op1code, op2code) {
    return [...op1code, ...op2code, 107];
  }
  i32_mul(op1code, op2code) {
    return [...op1code, ...op2code, 108];
  }
  i32_div_s(op1code, op2code) {
    return [...op1code, ...op2code, 109];
  }
  i32_div_u(op1code, op2code) {
    return [...op1code, ...op2code, 110];
  }
  i32_rem_s(op1code, op2code) {
    return [...op1code, ...op2code, 111];
  }
  i32_rem_u(op1code, op2code) {
    return [...op1code, ...op2code, 112];
  }
  i32_and(op1code, op2code) {
    return [...op1code, ...op2code, 113];
  }
  i32_or(op1code, op2code) {
    return [...op1code, ...op2code, 114];
  }
  i32_xor(op1code, op2code) {
    return [...op1code, ...op2code, 115];
  }
  i32_shl(op1code, op2code) {
    return [...op1code, ...op2code, 116];
  }
  i32_shr_s(op1code, op2code) {
    return [...op1code, ...op2code, 117];
  }
  i32_shr_u(op1code, op2code) {
    return [...op1code, ...op2code, 118];
  }
  i32_rotl(op1code, op2code) {
    return [...op1code, ...op2code, 119];
  }
  i32_rotr(op1code, op2code) {
    return [...op1code, ...op2code, 120];
  }
  i32_wrap_i64(op1code) {
    return [...op1code, 167];
  }
  i32_clz(op1code) {
    return [...op1code, 103];
  }
  i32_ctz(op1code) {
    return [...op1code, 104];
  }
  unreachable() {
    return [0];
  }
  current_memory() {
    return [63, 0];
  }
  comment() {
    return [];
  }
};
var typeCodes = {
  "i32": 127,
  "i64": 126,
  "f32": 125,
  "f64": 124,
  "anyfunc": 112,
  "func": 96,
  "emptyblock": 64
};
var FunctionBuilder = class {
  constructor(module, fnName, fnType, moduleName, fieldName) {
    if (fnType == "import") {
      this.fnType = "import";
      this.moduleName = moduleName;
      this.fieldName = fieldName;
    } else if (fnType == "internal") {
      this.fnType = "internal";
    } else {
      throw new Error("Invalid function fnType: " + fnType);
    }
    this.module = module;
    this.fnName = fnName;
    this.params = [];
    this.locals = [];
    this.localIdxByName = {};
    this.code = [];
    this.returnType = null;
    this.nextLocal = 0;
  }
  addParam(paramName, paramType) {
    if (this.localIdxByName[paramName])
      throw new Error(`param already exists. Function: ${this.fnName}, Param: ${paramName} `);
    const idx = this.nextLocal++;
    this.localIdxByName[paramName] = idx;
    this.params.push({
      type: paramType
    });
  }
  addLocal(localName, localType, _length) {
    const length = _length || 1;
    if (this.localIdxByName[localName])
      throw new Error(`local already exists. Function: ${this.fnName}, Param: ${localName} `);
    const idx = this.nextLocal++;
    this.localIdxByName[localName] = idx;
    this.locals.push({
      type: localType,
      length
    });
  }
  setReturnType(returnType) {
    if (this.returnType)
      throw new Error(`returnType already defined. Function: ${this.fnName}`);
    this.returnType = returnType;
  }
  getSignature() {
    const params = [...varuint32(this.params.length), ...this.params.map((p) => typeCodes[p.type])];
    const returns = this.returnType ? [1, typeCodes[this.returnType]] : [0];
    return [96, ...params, ...returns];
  }
  getBody() {
    const locals = this.locals.map((l) => [
      ...varuint32(l.length),
      typeCodes[l.type]
    ]);
    const body = [
      ...varuint32(this.locals.length),
      ...[].concat(...locals),
      ...this.code,
      11
    ];
    return [
      ...varuint32(body.length),
      ...body
    ];
  }
  addCode(...code) {
    this.code.push(...[].concat(...[...code]));
  }
  getCodeBuilder() {
    return new CodeBuilder(this);
  }
};
var ModuleBuilder = class {
  constructor() {
    this.functions = [];
    this.functionIdxByName = {};
    this.nImportFunctions = 0;
    this.nInternalFunctions = 0;
    this.memory = {
      pagesSize: 1,
      moduleName: "env",
      fieldName: "memory"
    };
    this.free = 8;
    this.datas = [];
    this.modules = {};
    this.exports = [];
    this.functionsTable = [];
  }
  build() {
    this._setSignatures();
    return new Uint8Array([
      ...u32(1836278016),
      ...u32(1),
      ...this._buildType(),
      ...this._buildImport(),
      ...this._buildFunctionDeclarations(),
      ...this._buildFunctionsTable(),
      ...this._buildExports(),
      ...this._buildElements(),
      ...this._buildCode(),
      ...this._buildData()
    ]);
  }
  addFunction(fnName) {
    if (typeof this.functionIdxByName[fnName] !== "undefined")
      throw new Error(`Function already defined: ${fnName}`);
    const idx = this.functions.length;
    this.functionIdxByName[fnName] = idx;
    this.functions.push(new FunctionBuilder(this, fnName, "internal"));
    this.nInternalFunctions++;
    return this.functions[idx];
  }
  addIimportFunction(fnName, moduleName, _fieldName) {
    if (typeof this.functionIdxByName[fnName] !== "undefined")
      throw new Error(`Function already defined: ${fnName}`);
    if (this.functions.length > 0 && this.functions[this.functions.length - 1].type == "internal")
      throw new Error(`Import functions must be declared before internal: ${fnName}`);
    let fieldName = _fieldName || fnName;
    const idx = this.functions.length;
    this.functionIdxByName[fnName] = idx;
    this.functions.push(new FunctionBuilder(this, fnName, "import", moduleName, fieldName));
    this.nImportFunctions++;
    return this.functions[idx];
  }
  setMemory(pagesSize, moduleName, fieldName) {
    this.memory = {
      pagesSize,
      moduleName: moduleName || "env",
      fieldName: fieldName || "memory"
    };
  }
  exportFunction(fnName, _exportName) {
    const exportName = _exportName || fnName;
    if (typeof this.functionIdxByName[fnName] === "undefined")
      throw new Error(`Function not defined: ${fnName}`);
    const idx = this.functionIdxByName[fnName];
    if (exportName != fnName) {
      this.functionIdxByName[exportName] = idx;
    }
    this.exports.push({
      exportName,
      idx
    });
  }
  addFunctionToTable(fnName) {
    const idx = this.functionIdxByName[fnName];
    this.functionsTable.push(idx);
  }
  addData(offset, bytes2) {
    this.datas.push({
      offset,
      bytes: bytes2
    });
  }
  alloc(a2, b) {
    let size2;
    let bytes2;
    if ((Array.isArray(a2) || ArrayBuffer.isView(a2)) && typeof b === "undefined") {
      size2 = a2.length;
      bytes2 = a2;
    } else {
      size2 = a2;
      bytes2 = b;
    }
    size2 = (size2 - 1 >> 3) + 1 << 3;
    const p = this.free;
    this.free += size2;
    if (bytes2) {
      this.addData(p, bytes2);
    }
    return p;
  }
  allocString(s) {
    const encoder3 = new globalThis.TextEncoder();
    const uint8array = encoder3.encode(s);
    return this.alloc([...uint8array, 0]);
  }
  _setSignatures() {
    this.signatures = [];
    const signatureIdxByName = {};
    if (this.functionsTable.length > 0) {
      const signature = this.functions[this.functionsTable[0]].getSignature();
      const signatureName = "s_" + toHexString(signature);
      signatureIdxByName[signatureName] = 0;
      this.signatures.push(signature);
    }
    for (let i = 0; i < this.functions.length; i++) {
      const signature = this.functions[i].getSignature();
      const signatureName = "s_" + toHexString(signature);
      if (typeof signatureIdxByName[signatureName] === "undefined") {
        signatureIdxByName[signatureName] = this.signatures.length;
        this.signatures.push(signature);
      }
      this.functions[i].signatureIdx = signatureIdxByName[signatureName];
    }
  }
  _buildSection(sectionType, section) {
    return [sectionType, ...varuint32(section.length), ...section];
  }
  _buildType() {
    return this._buildSection(
      1,
      [
        ...varuint32(this.signatures.length),
        ...[].concat(...this.signatures)
      ]
    );
  }
  _buildImport() {
    const entries = [];
    entries.push([
      ...string(this.memory.moduleName),
      ...string(this.memory.fieldName),
      2,
      0,
      //Flags no init valua
      ...varuint32(this.memory.pagesSize)
    ]);
    for (let i = 0; i < this.nImportFunctions; i++) {
      entries.push([
        ...string(this.functions[i].moduleName),
        ...string(this.functions[i].fieldName),
        0,
        ...varuint32(this.functions[i].signatureIdx)
      ]);
    }
    return this._buildSection(
      2,
      varuint32(entries.length).concat(...entries)
    );
  }
  _buildFunctionDeclarations() {
    const entries = [];
    for (let i = this.nImportFunctions; i < this.nImportFunctions + this.nInternalFunctions; i++) {
      entries.push(...varuint32(this.functions[i].signatureIdx));
    }
    return this._buildSection(
      3,
      [
        ...varuint32(entries.length),
        ...[...entries]
      ]
    );
  }
  _buildFunctionsTable() {
    if (this.functionsTable.length == 0) return [];
    return this._buildSection(
      4,
      [
        ...varuint32(1),
        112,
        0,
        ...varuint32(this.functionsTable.length)
      ]
    );
  }
  _buildElements() {
    if (this.functionsTable.length == 0) return [];
    const entries = [];
    for (let i = 0; i < this.functionsTable.length; i++) {
      entries.push(...varuint32(this.functionsTable[i]));
    }
    return this._buildSection(
      9,
      [
        ...varuint32(1),
        // 1 entry
        ...varuint32(0),
        // Table (0 in MVP)
        65,
        // offset 0
        ...varint32(0),
        11,
        ...varuint32(this.functionsTable.length),
        // Number of elements
        ...[...entries]
      ]
    );
  }
  _buildExports() {
    const entries = [];
    for (let i = 0; i < this.exports.length; i++) {
      entries.push([
        ...string(this.exports[i].exportName),
        0,
        ...varuint32(this.exports[i].idx)
      ]);
    }
    return this._buildSection(
      7,
      varuint32(entries.length).concat(...entries)
    );
  }
  _buildCode() {
    const entries = [];
    for (let i = this.nImportFunctions; i < this.nImportFunctions + this.nInternalFunctions; i++) {
      entries.push(this.functions[i].getBody());
    }
    return this._buildSection(
      10,
      varuint32(entries.length).concat(...entries)
    );
  }
  _buildData() {
    const entries = [];
    entries.push([
      0,
      65,
      0,
      11,
      4,
      ...u32(this.free)
    ]);
    for (let i = 0; i < this.datas.length; i++) {
      entries.push([
        0,
        65,
        ...varint32(this.datas[i].offset),
        11,
        ...varuint32(this.datas[i].bytes.length),
        ...this.datas[i].bytes
      ]);
    }
    return this._buildSection(
      11,
      varuint32(entries.length).concat(...entries)
    );
  }
};
globalThis.curve_bn128 = null;
async function buildBn128(singleThread, plugins) {
  if (!singleThread && globalThis.curve_bn128) return globalThis.curve_bn128;
  const moduleBuilder = new ModuleBuilder();
  moduleBuilder.setMemory(25);
  buildBn128$1(moduleBuilder);
  if (plugins) plugins(moduleBuilder);
  const bn128wasm = {};
  bn128wasm.code = moduleBuilder.build();
  bn128wasm.pq = moduleBuilder.modules.f1m.pq;
  bn128wasm.pr = moduleBuilder.modules.frm.pq;
  bn128wasm.pG1gen = moduleBuilder.modules.bn128.pG1gen;
  bn128wasm.pG1zero = moduleBuilder.modules.bn128.pG1zero;
  bn128wasm.pG1b = moduleBuilder.modules.bn128.pG1b;
  bn128wasm.pG2gen = moduleBuilder.modules.bn128.pG2gen;
  bn128wasm.pG2zero = moduleBuilder.modules.bn128.pG2zero;
  bn128wasm.pG2b = moduleBuilder.modules.bn128.pG2b;
  bn128wasm.pOneT = moduleBuilder.modules.bn128.pOneT;
  bn128wasm.prePSize = moduleBuilder.modules.bn128.prePSize;
  bn128wasm.preQSize = moduleBuilder.modules.bn128.preQSize;
  bn128wasm.n8q = 32;
  bn128wasm.n8r = 32;
  bn128wasm.q = moduleBuilder.modules.bn128.q;
  bn128wasm.r = moduleBuilder.modules.bn128.r;
  const params = {
    name: "bn128",
    wasm: bn128wasm,
    q: e("21888242871839275222246405745257275088696311157297823662689037894645226208583"),
    r: e("21888242871839275222246405745257275088548364400416034343698204186575808495617"),
    n8q: 32,
    n8r: 32,
    cofactorG2: e("30644e72e131a029b85045b68181585e06ceecda572a2489345f2299c0f9fa8d", 16),
    singleThread: singleThread ? true : false
  };
  const curve2 = await buildEngine(params);
  curve2.terminate = async function() {
    if (!params.singleThread) {
      globalThis.curve_bn128 = null;
      await this.tm.terminate();
    }
  };
  if (!singleThread) {
    globalThis.curve_bn128 = curve2;
  }
  return curve2;
}
globalThis.curve_bls12381 = null;
async function buildBls12381(singleThread, plugins) {
  if (!singleThread && globalThis.curve_bls12381) return globalThis.curve_bls12381;
  const moduleBuilder = new ModuleBuilder();
  moduleBuilder.setMemory(25);
  buildBls12381$1(moduleBuilder);
  if (plugins) plugins(moduleBuilder);
  const bls12381wasm = {};
  bls12381wasm.code = moduleBuilder.build();
  bls12381wasm.pq = moduleBuilder.modules.f1m.pq;
  bls12381wasm.pr = moduleBuilder.modules.frm.pq;
  bls12381wasm.pG1gen = moduleBuilder.modules.bls12381.pG1gen;
  bls12381wasm.pG1zero = moduleBuilder.modules.bls12381.pG1zero;
  bls12381wasm.pG1b = moduleBuilder.modules.bls12381.pG1b;
  bls12381wasm.pG2gen = moduleBuilder.modules.bls12381.pG2gen;
  bls12381wasm.pG2zero = moduleBuilder.modules.bls12381.pG2zero;
  bls12381wasm.pG2b = moduleBuilder.modules.bls12381.pG2b;
  bls12381wasm.pOneT = moduleBuilder.modules.bls12381.pOneT;
  bls12381wasm.prePSize = moduleBuilder.modules.bls12381.prePSize;
  bls12381wasm.preQSize = moduleBuilder.modules.bls12381.preQSize;
  bls12381wasm.n8q = 48;
  bls12381wasm.n8r = 32;
  bls12381wasm.q = moduleBuilder.modules.bls12381.q;
  bls12381wasm.r = moduleBuilder.modules.bls12381.r;
  const params = {
    name: "bls12381",
    wasm: bls12381wasm,
    q: e("1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab", 16),
    r: e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16),
    n8q: 48,
    n8r: 32,
    cofactorG1: e("0x396c8c005555e1568c00aaab0000aaab", 16),
    cofactorG2: e("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5", 16),
    singleThread: singleThread ? true : false
  };
  const curve2 = await buildEngine(params);
  curve2.terminate = async function() {
    if (!params.singleThread) {
      globalThis.curve_bls12381 = null;
      await this.tm.terminate();
    }
  };
  if (!singleThread) {
    globalThis.curve_bls12381 = curve2;
  }
  return curve2;
}
var bls12381r = e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16);
var bn128r = e("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var bls12381q = e("1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab", 16);
var bn128q = e("21888242871839275222246405745257275088696311157297823662689037894645226208583");
var Scalar = _Scalar;
var utils = _utils;

// node_modules/snarkjs/build/browser.esm.js
var fs = {};
async function open(fileName, openFlags, cacheSize, pageSize) {
  cacheSize = cacheSize || 4096 * 64;
  if (typeof openFlags !== "number" && ["w+", "wx+", "r", "ax+", "a+"].indexOf(openFlags) < 0)
    throw new Error("Invalid open option");
  const fd = await fs.promises.open(fileName, openFlags);
  const stats = await fd.stat();
  return new FastFile(fd, stats, cacheSize, pageSize, fileName);
}
var FastFile = class {
  constructor(fd, stats, cacheSize, pageSize, fileName) {
    this.fileName = fileName;
    this.fd = fd;
    this.pos = 0;
    this.pageSize = pageSize || 1 << 8;
    while (this.pageSize < stats.blksize) {
      this.pageSize *= 2;
    }
    this.totalSize = stats.size;
    this.totalPages = Math.floor((stats.size - 1) / this.pageSize) + 1;
    this.maxPagesLoaded = Math.floor(cacheSize / this.pageSize) + 1;
    this.pages = {};
    this.pendingLoads = [];
    this.writing = false;
    this.reading = false;
    this.avBuffs = [];
    this.history = {};
  }
  _loadPage(p) {
    const self = this;
    const P = new Promise((resolve, reject) => {
      self.pendingLoads.push({
        page: p,
        resolve,
        reject
      });
    });
    self.__statusPage("After Load request: ", p);
    return P;
  }
  __statusPage(s, p) {
    const logEntry = [];
    const self = this;
    if (!self.logHistory) return;
    logEntry.push("==" + s + " " + p);
    let S = "";
    for (let i = 0; i < self.pendingLoads.length; i++) {
      if (self.pendingLoads[i].page == p) S = S + " " + i;
    }
    if (S) logEntry.push("Pending loads:" + S);
    if (typeof self.pages[p] != "undefined") {
      const page = self.pages[p];
      logEntry.push("Loaded");
      logEntry.push("pendingOps: " + page.pendingOps);
      if (page.loading) logEntry.push("loading: " + page.loading);
      if (page.writing) logEntry.push("writing");
      if (page.dirty) logEntry.push("dirty");
    }
    logEntry.push("==");
    if (!self.history[p]) self.history[p] = [];
    self.history[p].push(logEntry);
  }
  __printHistory(p) {
    const self = this;
    if (!self.history[p]) console.log("Empty History ", p);
    console.log("History " + p);
    for (let i = 0; i < self.history[p].length; i++) {
      for (let j = 0; j < self.history[p][i].length; j++) {
        console.log("-> " + self.history[p][i][j]);
      }
    }
  }
  _triggerLoad() {
    const self = this;
    if (self.reading) return;
    if (self.pendingLoads.length == 0) return;
    const pageIdxs = Object.keys(self.pages);
    const deletablePages = [];
    for (let i = 0; i < pageIdxs.length; i++) {
      const page = self.pages[parseInt(pageIdxs[i])];
      if (page.dirty == false && page.pendingOps == 0 && !page.writing && !page.loading) deletablePages.push(parseInt(pageIdxs[i]));
    }
    let freePages = self.maxPagesLoaded - pageIdxs.length;
    const ops = [];
    while (self.pendingLoads.length > 0 && (typeof self.pages[self.pendingLoads[0].page] != "undefined" || (freePages > 0 || deletablePages.length > 0))) {
      const load = self.pendingLoads.shift();
      if (typeof self.pages[load.page] != "undefined") {
        self.pages[load.page].pendingOps++;
        const idx = deletablePages.indexOf(load.page);
        if (idx >= 0) deletablePages.splice(idx, 1);
        if (self.pages[load.page].loading) {
          self.pages[load.page].loading.push(load);
        } else {
          load.resolve();
        }
        self.__statusPage("After Load (cached): ", load.page);
      } else {
        if (freePages) {
          freePages--;
        } else {
          const fp = deletablePages.shift();
          self.__statusPage("Before Unload: ", fp);
          self.avBuffs.unshift(self.pages[fp]);
          delete self.pages[fp];
          self.__statusPage("After Unload: ", fp);
        }
        if (load.page >= self.totalPages) {
          self.pages[load.page] = getNewPage();
          load.resolve();
          self.__statusPage("After Load (new): ", load.page);
        } else {
          self.reading = true;
          self.pages[load.page] = getNewPage();
          self.pages[load.page].loading = [load];
          ops.push(self.fd.read(self.pages[load.page].buff, 0, self.pageSize, load.page * self.pageSize).then((res) => {
            self.pages[load.page].size = res.bytesRead;
            const loading = self.pages[load.page].loading;
            delete self.pages[load.page].loading;
            for (let i = 0; i < loading.length; i++) {
              loading[i].resolve();
            }
            self.__statusPage("After Load (loaded): ", load.page);
            return res;
          }, (err) => {
            load.reject(err);
          }));
          self.__statusPage("After Load (loading): ", load.page);
        }
      }
    }
    Promise.all(ops).then(() => {
      self.reading = false;
      if (self.pendingLoads.length > 0) setImmediate(self._triggerLoad.bind(self));
      self._tryClose();
    });
    function getNewPage() {
      if (self.avBuffs.length > 0) {
        const p = self.avBuffs.shift();
        p.dirty = false;
        p.pendingOps = 1;
        p.size = 0;
        return p;
      } else {
        return {
          dirty: false,
          buff: new Uint8Array(self.pageSize),
          pendingOps: 1,
          size: 0
        };
      }
    }
  }
  _triggerWrite() {
    const self = this;
    if (self.writing) return;
    const pageIdxs = Object.keys(self.pages);
    const ops = [];
    for (let i = 0; i < pageIdxs.length; i++) {
      const page = self.pages[parseInt(pageIdxs[i])];
      if (page.dirty) {
        page.dirty = false;
        page.writing = true;
        self.writing = true;
        ops.push(self.fd.write(page.buff, 0, page.size, parseInt(pageIdxs[i]) * self.pageSize).then(() => {
          page.writing = false;
          return;
        }, (err) => {
          console.log("ERROR Writing: " + err);
          self.error = err;
          self._tryClose();
        }));
      }
    }
    if (self.writing) {
      Promise.all(ops).then(() => {
        self.writing = false;
        setImmediate(self._triggerWrite.bind(self));
        self._tryClose();
        if (self.pendingLoads.length > 0) setImmediate(self._triggerLoad.bind(self));
      });
    }
  }
  _getDirtyPage() {
    for (let p in this.pages) {
      if (this.pages[p].dirty) return p;
    }
    return -1;
  }
  async write(buff, pos) {
    if (buff.byteLength == 0) return;
    const self = this;
    if (typeof pos == "undefined") pos = self.pos;
    self.pos = pos + buff.byteLength;
    if (self.totalSize < pos + buff.byteLength) self.totalSize = pos + buff.byteLength;
    if (self.pendingClose)
      throw new Error("Writing a closing file");
    const firstPage = Math.floor(pos / self.pageSize);
    const lastPage = Math.floor((pos + buff.byteLength - 1) / self.pageSize);
    const pagePromises = [];
    for (let i = firstPage; i <= lastPage; i++) pagePromises.push(self._loadPage(i));
    self._triggerLoad();
    let p = firstPage;
    let o = pos % self.pageSize;
    let r2 = buff.byteLength;
    while (r2 > 0) {
      await pagePromises[p - firstPage];
      const l = o + r2 > self.pageSize ? self.pageSize - o : r2;
      const srcView = buff.slice(buff.byteLength - r2, buff.byteLength - r2 + l);
      const dstView = new Uint8Array(self.pages[p].buff.buffer, o, l);
      dstView.set(srcView);
      self.pages[p].dirty = true;
      self.pages[p].pendingOps--;
      self.pages[p].size = Math.max(o + l, self.pages[p].size);
      if (p >= self.totalPages) {
        self.totalPages = p + 1;
      }
      r2 = r2 - l;
      p++;
      o = 0;
      if (!self.writing) setImmediate(self._triggerWrite.bind(self));
    }
  }
  async read(len, pos) {
    const self = this;
    let buff = new Uint8Array(len);
    await self.readToBuffer(buff, 0, len, pos);
    return buff;
  }
  async readToBuffer(buffDst, offset, len, pos) {
    if (len == 0) {
      return;
    }
    const self = this;
    if (len > self.pageSize * self.maxPagesLoaded * 0.8) {
      const cacheSize = Math.floor(len * 1.1);
      this.maxPagesLoaded = Math.floor(cacheSize / self.pageSize) + 1;
    }
    if (typeof pos == "undefined") pos = self.pos;
    self.pos = pos + len;
    if (self.pendingClose)
      throw new Error("Reading a closing file");
    const firstPage = Math.floor(pos / self.pageSize);
    const lastPage = Math.floor((pos + len - 1) / self.pageSize);
    const pagePromises = [];
    for (let i = firstPage; i <= lastPage; i++) pagePromises.push(self._loadPage(i));
    self._triggerLoad();
    let p = firstPage;
    let o = pos % self.pageSize;
    let r2 = pos + len > self.totalSize ? len - (pos + len - self.totalSize) : len;
    while (r2 > 0) {
      await pagePromises[p - firstPage];
      self.__statusPage("After Await (read): ", p);
      const l = o + r2 > self.pageSize ? self.pageSize - o : r2;
      const srcView = new Uint8Array(self.pages[p].buff.buffer, self.pages[p].buff.byteOffset + o, l);
      buffDst.set(srcView, offset + len - r2);
      self.pages[p].pendingOps--;
      self.__statusPage("After Op done: ", p);
      r2 = r2 - l;
      p++;
      o = 0;
      if (self.pendingLoads.length > 0) setImmediate(self._triggerLoad.bind(self));
    }
    this.pos = pos + len;
  }
  _tryClose() {
    const self = this;
    if (!self.pendingClose) return;
    if (self.error) {
      self.pendingCloseReject(self.error);
    }
    const p = self._getDirtyPage();
    if (p >= 0 || self.writing || self.reading || self.pendingLoads.length > 0) return;
    self.pendingClose();
  }
  close() {
    const self = this;
    if (self.pendingClose)
      throw new Error("Closing the file twice");
    return new Promise((resolve, reject) => {
      self.pendingClose = resolve;
      self.pendingCloseReject = reject;
      self._tryClose();
    }).then(() => {
      self.fd.close();
    }, (err) => {
      self.fd.close();
      throw err;
    });
  }
  async discard() {
    const self = this;
    await self.close();
    await fs.promises.unlink(this.fileName);
  }
  async writeULE32(v, pos) {
    const self = this;
    const tmpBuff322 = new Uint8Array(4);
    const tmpBuff32v2 = new DataView(tmpBuff322.buffer);
    tmpBuff32v2.setUint32(0, v, true);
    await self.write(tmpBuff322, pos);
  }
  async writeUBE32(v, pos) {
    const self = this;
    const tmpBuff322 = new Uint8Array(4);
    const tmpBuff32v2 = new DataView(tmpBuff322.buffer);
    tmpBuff32v2.setUint32(0, v, false);
    await self.write(tmpBuff322, pos);
  }
  async writeULE64(v, pos) {
    const self = this;
    const tmpBuff642 = new Uint8Array(8);
    const tmpBuff64v2 = new DataView(tmpBuff642.buffer);
    tmpBuff64v2.setUint32(0, v & 4294967295, true);
    tmpBuff64v2.setUint32(4, Math.floor(v / 4294967296), true);
    await self.write(tmpBuff642, pos);
  }
  async readULE32(pos) {
    const self = this;
    const b = await self.read(4, pos);
    const view = new Uint32Array(b.buffer);
    return view[0];
  }
  async readUBE32(pos) {
    const self = this;
    const b = await self.read(4, pos);
    const view = new DataView(b.buffer);
    return view.getUint32(0, false);
  }
  async readULE64(pos) {
    const self = this;
    const b = await self.read(8, pos);
    const view = new Uint32Array(b.buffer);
    return view[1] * 4294967296 + view[0];
  }
  async readString(pos) {
    const self = this;
    if (self.pendingClose) {
      throw new Error("Reading a closing file");
    }
    let currentPosition = typeof pos == "undefined" ? self.pos : pos;
    let currentPage = Math.floor(currentPosition / self.pageSize);
    let endOfStringFound = false;
    let str = "";
    while (!endOfStringFound) {
      let pagePromise = self._loadPage(currentPage);
      self._triggerLoad();
      await pagePromise;
      self.__statusPage("After Await (read): ", currentPage);
      let offsetOnPage = currentPosition % self.pageSize;
      const dataArray = new Uint8Array(
        self.pages[currentPage].buff.buffer,
        self.pages[currentPage].buff.byteOffset + offsetOnPage,
        self.pageSize - offsetOnPage
      );
      let indexEndOfString = dataArray.findIndex((element) => element === 0);
      endOfStringFound = indexEndOfString !== -1;
      if (endOfStringFound) {
        str += new TextDecoder().decode(dataArray.slice(0, indexEndOfString));
        self.pos = currentPage * this.pageSize + offsetOnPage + indexEndOfString + 1;
      } else {
        str += new TextDecoder().decode(dataArray);
        self.pos = currentPage * this.pageSize + offsetOnPage + dataArray.length;
      }
      self.pages[currentPage].pendingOps--;
      self.__statusPage("After Op done: ", currentPage);
      currentPosition = self.pos;
      currentPage++;
      if (self.pendingLoads.length > 0) setImmediate(self._triggerLoad.bind(self));
    }
    return str;
  }
};
function createNew$1(o) {
  const initialSize = o.initialSize || 1 << 20;
  const fd = new MemFile();
  fd.o = o;
  fd.o.data = new Uint8Array(initialSize);
  fd.allocSize = initialSize;
  fd.totalSize = 0;
  fd.readOnly = false;
  fd.pos = 0;
  return fd;
}
function readExisting$2(o) {
  const fd = new MemFile();
  fd.o = o;
  fd.allocSize = o.data.byteLength;
  fd.totalSize = o.data.byteLength;
  fd.readOnly = true;
  fd.pos = 0;
  return fd;
}
var tmpBuff32$1 = new Uint8Array(4);
var tmpBuff32v$1 = new DataView(tmpBuff32$1.buffer);
var tmpBuff64$1 = new Uint8Array(8);
var tmpBuff64v$1 = new DataView(tmpBuff64$1.buffer);
var MemFile = class {
  constructor() {
    this.pageSize = 1 << 14;
  }
  _resizeIfNeeded(newLen) {
    if (newLen > this.allocSize) {
      const newAllocSize = Math.max(
        this.allocSize + (1 << 20),
        Math.floor(this.allocSize * 1.1),
        newLen
      );
      const newData = new Uint8Array(newAllocSize);
      newData.set(this.o.data);
      this.o.data = newData;
      this.allocSize = newAllocSize;
    }
  }
  async write(buff, pos) {
    const self = this;
    if (typeof pos == "undefined") pos = self.pos;
    if (this.readOnly) throw new Error("Writing a read only file");
    this._resizeIfNeeded(pos + buff.byteLength);
    this.o.data.set(buff.slice(), pos);
    if (pos + buff.byteLength > this.totalSize) this.totalSize = pos + buff.byteLength;
    this.pos = pos + buff.byteLength;
  }
  async readToBuffer(buffDest, offset, len, pos) {
    const self = this;
    if (typeof pos == "undefined") pos = self.pos;
    if (this.readOnly) {
      if (pos + len > this.totalSize) throw new Error("Reading out of bounds");
    }
    this._resizeIfNeeded(pos + len);
    const buffSrc = new Uint8Array(this.o.data.buffer, this.o.data.byteOffset + pos, len);
    buffDest.set(buffSrc, offset);
    this.pos = pos + len;
  }
  async read(len, pos) {
    const self = this;
    const buff = new Uint8Array(len);
    await self.readToBuffer(buff, 0, len, pos);
    return buff;
  }
  close() {
    if (this.o.data.byteLength != this.totalSize) {
      this.o.data = this.o.data.slice(0, this.totalSize);
    }
  }
  async discard() {
  }
  async writeULE32(v, pos) {
    const self = this;
    tmpBuff32v$1.setUint32(0, v, true);
    await self.write(tmpBuff32$1, pos);
  }
  async writeUBE32(v, pos) {
    const self = this;
    tmpBuff32v$1.setUint32(0, v, false);
    await self.write(tmpBuff32$1, pos);
  }
  async writeULE64(v, pos) {
    const self = this;
    tmpBuff64v$1.setUint32(0, v & 4294967295, true);
    tmpBuff64v$1.setUint32(4, Math.floor(v / 4294967296), true);
    await self.write(tmpBuff64$1, pos);
  }
  async readULE32(pos) {
    const self = this;
    const b = await self.read(4, pos);
    const view = new Uint32Array(b.buffer);
    return view[0];
  }
  async readUBE32(pos) {
    const self = this;
    const b = await self.read(4, pos);
    const view = new DataView(b.buffer);
    return view.getUint32(0, false);
  }
  async readULE64(pos) {
    const self = this;
    const b = await self.read(8, pos);
    const view = new Uint32Array(b.buffer);
    return view[1] * 4294967296 + view[0];
  }
  async readString(pos) {
    const self = this;
    let currentPosition = typeof pos == "undefined" ? self.pos : pos;
    if (currentPosition > this.totalSize) {
      if (this.readOnly) {
        throw new Error("Reading out of bounds");
      }
      this._resizeIfNeeded(pos);
    }
    const dataArray = new Uint8Array(
      self.o.data.buffer,
      currentPosition,
      this.totalSize - currentPosition
    );
    let indexEndOfString = dataArray.findIndex((element) => element === 0);
    let endOfStringFound = indexEndOfString !== -1;
    let str = "";
    if (endOfStringFound) {
      str = new TextDecoder().decode(dataArray.slice(0, indexEndOfString));
      self.pos = currentPosition + indexEndOfString + 1;
    } else {
      self.pos = currentPosition;
    }
    return str;
  }
};
var PAGE_SIZE2 = 1 << 22;
function createNew(o) {
  const initialSize = o.initialSize || 0;
  const fd = new BigMemFile();
  fd.o = o;
  const nPages = initialSize ? Math.floor((initialSize - 1) / PAGE_SIZE2) + 1 : 0;
  fd.o.data = [];
  for (let i = 0; i < nPages - 1; i++) {
    fd.o.data.push(new Uint8Array(PAGE_SIZE2));
  }
  if (nPages) fd.o.data.push(new Uint8Array(initialSize - PAGE_SIZE2 * (nPages - 1)));
  fd.totalSize = 0;
  fd.readOnly = false;
  fd.pos = 0;
  return fd;
}
function readExisting$1(o) {
  const fd = new BigMemFile();
  fd.o = o;
  fd.totalSize = (o.data.length - 1) * PAGE_SIZE2 + o.data[o.data.length - 1].byteLength;
  fd.readOnly = true;
  fd.pos = 0;
  return fd;
}
var tmpBuff32 = new Uint8Array(4);
var tmpBuff32v = new DataView(tmpBuff32.buffer);
var tmpBuff64 = new Uint8Array(8);
var tmpBuff64v = new DataView(tmpBuff64.buffer);
var BigMemFile = class {
  constructor() {
    this.pageSize = 1 << 14;
  }
  _resizeIfNeeded(newLen) {
    if (newLen <= this.totalSize) return;
    if (this.readOnly) throw new Error("Reading out of file bounds");
    const nPages = Math.floor((newLen - 1) / PAGE_SIZE2) + 1;
    for (let i = Math.max(this.o.data.length - 1, 0); i < nPages; i++) {
      const newSize = i < nPages - 1 ? PAGE_SIZE2 : newLen - (nPages - 1) * PAGE_SIZE2;
      const p = new Uint8Array(newSize);
      if (i == this.o.data.length - 1) p.set(this.o.data[i]);
      this.o.data[i] = p;
    }
    this.totalSize = newLen;
  }
  async write(buff, pos) {
    const self = this;
    if (typeof pos == "undefined") pos = self.pos;
    if (this.readOnly) throw new Error("Writing a read only file");
    this._resizeIfNeeded(pos + buff.byteLength);
    const firstPage = Math.floor(pos / PAGE_SIZE2);
    let p = firstPage;
    let o = pos % PAGE_SIZE2;
    let r2 = buff.byteLength;
    while (r2 > 0) {
      const l = o + r2 > PAGE_SIZE2 ? PAGE_SIZE2 - o : r2;
      const srcView = buff.slice(buff.byteLength - r2, buff.byteLength - r2 + l);
      const dstView = new Uint8Array(self.o.data[p].buffer, o, l);
      dstView.set(srcView);
      r2 = r2 - l;
      p++;
      o = 0;
    }
    this.pos = pos + buff.byteLength;
  }
  async readToBuffer(buffDst, offset, len, pos) {
    const self = this;
    if (typeof pos == "undefined") pos = self.pos;
    if (this.readOnly) {
      if (pos + len > this.totalSize) throw new Error("Reading out of bounds");
    }
    this._resizeIfNeeded(pos + len);
    const firstPage = Math.floor(pos / PAGE_SIZE2);
    let p = firstPage;
    let o = pos % PAGE_SIZE2;
    let r2 = len;
    while (r2 > 0) {
      const l = o + r2 > PAGE_SIZE2 ? PAGE_SIZE2 - o : r2;
      const srcView = new Uint8Array(self.o.data[p].buffer, o, l);
      buffDst.set(srcView, offset + len - r2);
      r2 = r2 - l;
      p++;
      o = 0;
    }
    this.pos = pos + len;
  }
  async read(len, pos) {
    const self = this;
    const buff = new Uint8Array(len);
    await self.readToBuffer(buff, 0, len, pos);
    return buff;
  }
  close() {
  }
  async discard() {
  }
  async writeULE32(v, pos) {
    const self = this;
    tmpBuff32v.setUint32(0, v, true);
    await self.write(tmpBuff32, pos);
  }
  async writeUBE32(v, pos) {
    const self = this;
    tmpBuff32v.setUint32(0, v, false);
    await self.write(tmpBuff32, pos);
  }
  async writeULE64(v, pos) {
    const self = this;
    tmpBuff64v.setUint32(0, v & 4294967295, true);
    tmpBuff64v.setUint32(4, Math.floor(v / 4294967296), true);
    await self.write(tmpBuff64, pos);
  }
  async readULE32(pos) {
    const self = this;
    const b = await self.read(4, pos);
    const view = new Uint32Array(b.buffer);
    return view[0];
  }
  async readUBE32(pos) {
    const self = this;
    const b = await self.read(4, pos);
    const view = new DataView(b.buffer);
    return view.getUint32(0, false);
  }
  async readULE64(pos) {
    const self = this;
    const b = await self.read(8, pos);
    const view = new Uint32Array(b.buffer);
    return view[1] * 4294967296 + view[0];
  }
  async readString(pos) {
    const self = this;
    const fixedSize = 2048;
    let currentPosition = typeof pos == "undefined" ? self.pos : pos;
    if (currentPosition > this.totalSize) {
      if (this.readOnly) {
        throw new Error("Reading out of bounds");
      }
      this._resizeIfNeeded(pos);
    }
    let endOfStringFound = false;
    let str = "";
    while (!endOfStringFound) {
      let currentPage = Math.floor(currentPosition / PAGE_SIZE2);
      let offsetOnPage = currentPosition % PAGE_SIZE2;
      if (self.o.data[currentPage] === void 0) {
        throw new Error("ERROR");
      }
      let readLength = Math.min(fixedSize, self.o.data[currentPage].length - offsetOnPage);
      const dataArray = new Uint8Array(self.o.data[currentPage].buffer, offsetOnPage, readLength);
      let indexEndOfString = dataArray.findIndex((element) => element === 0);
      endOfStringFound = indexEndOfString !== -1;
      if (endOfStringFound) {
        str += new TextDecoder().decode(dataArray.slice(0, indexEndOfString));
        self.pos = currentPage * PAGE_SIZE2 + offsetOnPage + indexEndOfString + 1;
      } else {
        str += new TextDecoder().decode(dataArray);
        self.pos = currentPage * PAGE_SIZE2 + offsetOnPage + dataArray.length;
      }
      currentPosition = self.pos;
    }
    return str;
  }
};
var O_TRUNC = 1024;
var O_CREAT = 512;
var O_RDWR = 2;
var O_RDONLY = 0;
var DEFAULT_CACHE_SIZE = 1 << 16;
var DEFAULT_PAGE_SIZE = 1 << 13;
async function createOverride(o, b, c) {
  if (typeof o === "string") {
    o = {
      type: "file",
      fileName: o,
      cacheSize: b || DEFAULT_CACHE_SIZE,
      pageSize: c || DEFAULT_PAGE_SIZE
    };
  }
  if (o.type == "file") {
    return await open(o.fileName, O_TRUNC | O_CREAT | O_RDWR, o.cacheSize, o.pageSize);
  } else if (o.type == "mem") {
    return createNew$1(o);
  } else if (o.type == "bigMem") {
    return createNew(o);
  } else {
    throw new Error("Invalid FastFile type: " + o.type);
  }
}
async function readExisting(o, b, c) {
  if (o instanceof Uint8Array) {
    o = {
      type: "mem",
      data: o
    };
  }
  {
    if (typeof o === "string") {
      const buff = await fetch(o).then(function(res) {
        return res.arrayBuffer();
      }).then(function(ab) {
        return new Uint8Array(ab);
      });
      o = {
        type: "mem",
        data: buff
      };
    }
  }
  if (o.type == "file") {
    return await open(o.fileName, O_RDONLY, o.cacheSize, o.pageSize);
  } else if (o.type == "mem") {
    return await readExisting$2(o);
  } else if (o.type == "bigMem") {
    return await readExisting$1(o);
  } else {
    throw new Error("Invalid FastFile type: " + o.type);
  }
}
async function readBinFile(fileName, type, maxVersion, cacheSize, pageSize) {
  const fd = await readExisting(fileName);
  const b = await fd.read(4);
  let readedType = "";
  for (let i = 0; i < 4; i++) readedType += String.fromCharCode(b[i]);
  if (readedType != type) throw new Error(fileName + ": Invalid File format");
  let v = await fd.readULE32();
  if (v > maxVersion) throw new Error("Version not supported");
  const nSections = await fd.readULE32();
  let sections = [];
  for (let i = 0; i < nSections; i++) {
    let ht = await fd.readULE32();
    let hl = await fd.readULE64();
    if (typeof sections[ht] == "undefined") sections[ht] = [];
    sections[ht].push({
      p: fd.pos,
      size: hl
    });
    fd.pos += hl;
  }
  return { fd, sections };
}
async function createBinFile(fileName, type, version2, nSections, cacheSize, pageSize) {
  const fd = await createOverride(fileName, cacheSize, pageSize);
  const buff = new Uint8Array(4);
  for (let i = 0; i < 4; i++) buff[i] = type.charCodeAt(i);
  await fd.write(buff, 0);
  await fd.writeULE32(version2);
  await fd.writeULE32(nSections);
  return fd;
}
async function startWriteSection(fd, idSection) {
  if (typeof fd.writingSection !== "undefined") throw new Error("Already writing a section");
  await fd.writeULE32(idSection);
  fd.writingSection = {
    pSectionSize: fd.pos
  };
  await fd.writeULE64(0);
}
async function endWriteSection(fd) {
  if (typeof fd.writingSection === "undefined") throw new Error("Not writing a section");
  const sectionSize = fd.pos - fd.writingSection.pSectionSize - 8;
  const oldPos = fd.pos;
  fd.pos = fd.writingSection.pSectionSize;
  await fd.writeULE64(sectionSize);
  fd.pos = oldPos;
  delete fd.writingSection;
}
async function startReadUniqueSection(fd, sections, idSection) {
  if (typeof fd.readingSection !== "undefined") throw new Error("Already reading a section");
  if (!sections[idSection]) throw new Error(fd.fileName + ": Missing section " + idSection);
  if (sections[idSection].length > 1) throw new Error(fd.fileName + ": Section Duplicated " + idSection);
  fd.pos = sections[idSection][0].p;
  fd.readingSection = sections[idSection][0];
}
async function endReadSection(fd, noCheck) {
  if (typeof fd.readingSection === "undefined") throw new Error("Not reading a section");
  if (!noCheck) {
    if (fd.pos - fd.readingSection.p != fd.readingSection.size) throw new Error("Invalid section size reading");
  }
  delete fd.readingSection;
}
async function writeBigInt(fd, n, n8, pos) {
  const buff = new Uint8Array(n8);
  Scalar.toRprLE(buff, 0, n, n8);
  await fd.write(buff, pos);
}
async function readBigInt(fd, n8, pos) {
  const buff = await fd.read(n8, pos);
  return Scalar.fromRprLE(buff, 0, n8);
}
async function readSection(fd, sections, idSection, offset, length) {
  offset = typeof offset === "undefined" ? 0 : offset;
  length = typeof length === "undefined" ? sections[idSection][0].size - offset : length;
  if (offset + length > sections[idSection][0].size) {
    throw new Error("Reading out of the range of the section");
  }
  let buff;
  if (length < 1 << 30) {
    buff = new Uint8Array(length);
  } else {
    buff = new BigBuffer(length);
  }
  await fd.readToBuffer(buff, 0, length, sections[idSection][0].p + offset);
  return buff;
}
var bls12381r$1 = Scalar.e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16);
var bn128r$1 = Scalar.e("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var bls12381q2 = Scalar.e("1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab", 16);
var bn128q2 = Scalar.e("21888242871839275222246405745257275088696311157297823662689037894645226208583");
async function getCurveFromQ(q, options) {
  let curve2;
  let singleThread = options && options.singleThread;
  if (Scalar.eq(q, bn128q2)) {
    curve2 = await buildBn128(singleThread);
  } else if (Scalar.eq(q, bls12381q2)) {
    curve2 = await buildBls12381(singleThread);
  } else {
    throw new Error(`Curve not supported: ${Scalar.toString(q)}`);
  }
  return curve2;
}
async function getCurveFromName(name, options) {
  let curve2;
  let singleThread = options && options.singleThread;
  const normName = normalizeName(name);
  if (["BN128", "BN254", "ALTBN128"].indexOf(normName) >= 0) {
    curve2 = await buildBn128(singleThread);
  } else if (["BLS12381"].indexOf(normName) >= 0) {
    curve2 = await buildBls12381(singleThread);
  } else {
    throw new Error(`Curve not supported: ${name}`);
  }
  return curve2;
  function normalizeName(n) {
    return n.toUpperCase().match(/[A-Za-z0-9]+/g).join("");
  }
}
function number(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function isBytes(a2) {
  return a2 instanceof Uint8Array || a2 != null && typeof a2 === "object" && a2.constructor.name === "Uint8Array";
}
function bytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error(`Uint8Array expected of length ${lengths}, not of length=${b.length}`);
}
function exists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function output(out, instance) {
  bytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error(`digestInto() expects output buffer of length at least ${min}`);
  }
}
var u322 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  bytes(data);
  return data;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i = 0; i < lst.length; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
function log22(V) {
  return ((V & 4294901760) !== 0 ? (V &= 4294901760, 16) : 0) | ((V & 4278255360) !== 0 ? (V &= 4278255360, 8) : 0) | ((V & 4042322160) !== 0 ? (V &= 4042322160, 4) : 0) | ((V & 3435973836) !== 0 ? (V &= 3435973836, 2) : 0) | (V & 2863311530) !== 0;
}
var GROTH16_PROTOCOL_ID = 1;
var PLONK_PROTOCOL_ID = 2;
var FFLONK_PROTOCOL_ID = 10;
var ZKEY_FF_HEADER_SECTION = 2;
async function readG1(fd, curve2, toObject) {
  const buff = await fd.read(curve2.G1.F.n8 * 2);
  const res = curve2.G1.fromRprLEM(buff, 0);
  return toObject ? curve2.G1.toObject(res) : res;
}
async function readG2(fd, curve2, toObject) {
  const buff = await fd.read(curve2.G2.F.n8 * 2);
  const res = curve2.G2.fromRprLEM(buff, 0);
  return toObject ? curve2.G2.toObject(res) : res;
}
async function readHeader$1(fd, sections, toObject, options) {
  await startReadUniqueSection(fd, sections, 1);
  const protocolId = await fd.readULE32();
  await endReadSection(fd);
  if (protocolId === GROTH16_PROTOCOL_ID) {
    return await readHeaderGroth16(fd, sections, toObject, options);
  } else if (protocolId === PLONK_PROTOCOL_ID) {
    return await readHeaderPlonk(fd, sections, toObject, options);
  } else if (protocolId === FFLONK_PROTOCOL_ID) {
    return await readHeaderFFlonk(fd, sections, toObject, options);
  } else {
    throw new Error("Protocol not supported: ");
  }
}
async function readHeaderGroth16(fd, sections, toObject, options) {
  const zkey = {};
  zkey.protocol = "groth16";
  await startReadUniqueSection(fd, sections, 2);
  const n8q = await fd.readULE32();
  zkey.n8q = n8q;
  zkey.q = await readBigInt(fd, n8q);
  const n8r = await fd.readULE32();
  zkey.n8r = n8r;
  zkey.r = await readBigInt(fd, n8r);
  zkey.curve = await getCurveFromQ(zkey.q, options);
  zkey.nVars = await fd.readULE32();
  zkey.nPublic = await fd.readULE32();
  zkey.domainSize = await fd.readULE32();
  zkey.power = log22(zkey.domainSize);
  zkey.vk_alpha_1 = await readG1(fd, zkey.curve, toObject);
  zkey.vk_beta_1 = await readG1(fd, zkey.curve, toObject);
  zkey.vk_beta_2 = await readG2(fd, zkey.curve, toObject);
  zkey.vk_gamma_2 = await readG2(fd, zkey.curve, toObject);
  zkey.vk_delta_1 = await readG1(fd, zkey.curve, toObject);
  zkey.vk_delta_2 = await readG2(fd, zkey.curve, toObject);
  await endReadSection(fd);
  return zkey;
}
async function readHeaderPlonk(fd, sections, toObject, options) {
  const zkey = {};
  zkey.protocol = "plonk";
  await startReadUniqueSection(fd, sections, 2);
  const n8q = await fd.readULE32();
  zkey.n8q = n8q;
  zkey.q = await readBigInt(fd, n8q);
  const n8r = await fd.readULE32();
  zkey.n8r = n8r;
  zkey.r = await readBigInt(fd, n8r);
  zkey.curve = await getCurveFromQ(zkey.q, options);
  zkey.nVars = await fd.readULE32();
  zkey.nPublic = await fd.readULE32();
  zkey.domainSize = await fd.readULE32();
  zkey.power = log22(zkey.domainSize);
  zkey.nAdditions = await fd.readULE32();
  zkey.nConstraints = await fd.readULE32();
  zkey.k1 = await fd.read(n8r);
  zkey.k2 = await fd.read(n8r);
  zkey.Qm = await readG1(fd, zkey.curve, toObject);
  zkey.Ql = await readG1(fd, zkey.curve, toObject);
  zkey.Qr = await readG1(fd, zkey.curve, toObject);
  zkey.Qo = await readG1(fd, zkey.curve, toObject);
  zkey.Qc = await readG1(fd, zkey.curve, toObject);
  zkey.S1 = await readG1(fd, zkey.curve, toObject);
  zkey.S2 = await readG1(fd, zkey.curve, toObject);
  zkey.S3 = await readG1(fd, zkey.curve, toObject);
  zkey.X_2 = await readG2(fd, zkey.curve, toObject);
  await endReadSection(fd);
  return zkey;
}
async function readHeaderFFlonk(fd, sections, toObject, options) {
  const zkey = {};
  zkey.protocol = "fflonk";
  zkey.protocolId = FFLONK_PROTOCOL_ID;
  await startReadUniqueSection(fd, sections, ZKEY_FF_HEADER_SECTION);
  const n8q = await fd.readULE32();
  zkey.n8q = n8q;
  zkey.q = await readBigInt(fd, n8q);
  zkey.curve = await getCurveFromQ(zkey.q, options);
  const n8r = await fd.readULE32();
  zkey.n8r = n8r;
  zkey.r = await readBigInt(fd, n8r);
  zkey.nVars = await fd.readULE32();
  zkey.nPublic = await fd.readULE32();
  zkey.domainSize = await fd.readULE32();
  zkey.power = log22(zkey.domainSize);
  zkey.nAdditions = await fd.readULE32();
  zkey.nConstraints = await fd.readULE32();
  zkey.k1 = await fd.read(n8r);
  zkey.k2 = await fd.read(n8r);
  zkey.w3 = await fd.read(n8r);
  zkey.w4 = await fd.read(n8r);
  zkey.w8 = await fd.read(n8r);
  zkey.wr = await fd.read(n8r);
  zkey.X_2 = await readG2(fd, zkey.curve, toObject);
  zkey.C0 = await readG1(fd, zkey.curve, toObject);
  await endReadSection(fd);
  return zkey;
}
async function writeBin(fd, witnessBin, prime) {
  await startWriteSection(fd, 1);
  const n8 = (Math.floor((Scalar.bitLength(prime) - 1) / 64) + 1) * 8;
  await fd.writeULE32(n8);
  await writeBigInt(fd, prime, n8);
  if (witnessBin.byteLength % n8 != 0) {
    throw new Error("Invalid witness length");
  }
  await fd.writeULE32(witnessBin.byteLength / n8);
  await endWriteSection(fd);
  await startWriteSection(fd, 2);
  await fd.write(witnessBin);
  await endWriteSection(fd);
}
async function readHeader(fd, sections) {
  await startReadUniqueSection(fd, sections, 1);
  const n8 = await fd.readULE32();
  const q = await readBigInt(fd, n8);
  const nWitness = await fd.readULE32();
  await endReadSection(fd);
  return { n8, q, nWitness };
}
var { stringifyBigInts: stringifyBigInts$4 } = utils;
async function groth16Prove(zkeyFileName, witnessFileName, logger, options) {
  const { fd: fdWtns, sections: sectionsWtns } = await readBinFile(witnessFileName, "wtns", 2);
  const wtns = await readHeader(fdWtns, sectionsWtns);
  const { fd: fdZKey, sections: sectionsZKey } = await readBinFile(zkeyFileName, "zkey", 2);
  const zkey = await readHeader$1(fdZKey, sectionsZKey, void 0, options);
  if (zkey.protocol != "groth16") {
    throw new Error("zkey file is not groth16");
  }
  if (!Scalar.eq(zkey.r, wtns.q)) {
    throw new Error("Curve of the witness does not match the curve of the proving key");
  }
  if (wtns.nWitness != zkey.nVars) {
    throw new Error(`Invalid witness length. Circuit: ${zkey.nVars}, witness: ${wtns.nWitness}`);
  }
  const curve2 = zkey.curve;
  const Fr2 = curve2.Fr;
  const G1 = curve2.G1;
  const G2 = curve2.G2;
  const power = log22(zkey.domainSize);
  if (logger) logger.debug("Reading Wtns");
  const buffWitness = await readSection(fdWtns, sectionsWtns, 2);
  if (logger) logger.debug("Reading Coeffs");
  const buffCoeffs = await readSection(fdZKey, sectionsZKey, 4);
  if (logger) logger.debug("Building ABC");
  const [buffA_T, buffB_T, buffC_T] = await buildABC1(curve2, zkey, buffWitness, buffCoeffs, logger);
  const inc = power == Fr2.s ? curve2.Fr.shift : curve2.Fr.w[power + 1];
  const buffA = await Fr2.ifft(buffA_T, "", "", logger, "IFFT_A");
  const buffAodd = await Fr2.batchApplyKey(buffA, Fr2.e(1), inc);
  const buffAodd_T = await Fr2.fft(buffAodd, "", "", logger, "FFT_A");
  const buffB = await Fr2.ifft(buffB_T, "", "", logger, "IFFT_B");
  const buffBodd = await Fr2.batchApplyKey(buffB, Fr2.e(1), inc);
  const buffBodd_T = await Fr2.fft(buffBodd, "", "", logger, "FFT_B");
  const buffC = await Fr2.ifft(buffC_T, "", "", logger, "IFFT_C");
  const buffCodd = await Fr2.batchApplyKey(buffC, Fr2.e(1), inc);
  const buffCodd_T = await Fr2.fft(buffCodd, "", "", logger, "FFT_C");
  if (logger) logger.debug("Join ABC");
  const buffPodd_T = await joinABC(curve2, zkey, buffAodd_T, buffBodd_T, buffCodd_T, logger);
  let proof = {};
  if (logger) logger.debug("Reading A Points");
  const buffBasesA = await readSection(fdZKey, sectionsZKey, 5);
  proof.pi_a = await curve2.G1.multiExpAffine(buffBasesA, buffWitness, logger, "multiexp A");
  if (logger) logger.debug("Reading B1 Points");
  const buffBasesB1 = await readSection(fdZKey, sectionsZKey, 6);
  let pib1 = await curve2.G1.multiExpAffine(buffBasesB1, buffWitness, logger, "multiexp B1");
  if (logger) logger.debug("Reading B2 Points");
  const buffBasesB2 = await readSection(fdZKey, sectionsZKey, 7);
  proof.pi_b = await curve2.G2.multiExpAffine(buffBasesB2, buffWitness, logger, "multiexp B2");
  if (logger) logger.debug("Reading C Points");
  const buffBasesC = await readSection(fdZKey, sectionsZKey, 8);
  proof.pi_c = await curve2.G1.multiExpAffine(buffBasesC, buffWitness.slice((zkey.nPublic + 1) * curve2.Fr.n8), logger, "multiexp C");
  if (logger) logger.debug("Reading H Points");
  const buffBasesH = await readSection(fdZKey, sectionsZKey, 9);
  const resH = await curve2.G1.multiExpAffine(buffBasesH, buffPodd_T, logger, "multiexp H");
  const r2 = curve2.Fr.random();
  const s = curve2.Fr.random();
  proof.pi_a = G1.add(proof.pi_a, zkey.vk_alpha_1);
  proof.pi_a = G1.add(proof.pi_a, G1.timesFr(zkey.vk_delta_1, r2));
  proof.pi_b = G2.add(proof.pi_b, zkey.vk_beta_2);
  proof.pi_b = G2.add(proof.pi_b, G2.timesFr(zkey.vk_delta_2, s));
  pib1 = G1.add(pib1, zkey.vk_beta_1);
  pib1 = G1.add(pib1, G1.timesFr(zkey.vk_delta_1, s));
  proof.pi_c = G1.add(proof.pi_c, resH);
  proof.pi_c = G1.add(proof.pi_c, G1.timesFr(proof.pi_a, s));
  proof.pi_c = G1.add(proof.pi_c, G1.timesFr(pib1, r2));
  proof.pi_c = G1.add(proof.pi_c, G1.timesFr(zkey.vk_delta_1, Fr2.neg(Fr2.mul(r2, s))));
  let publicSignals = [];
  for (let i = 1; i <= zkey.nPublic; i++) {
    const b = buffWitness.slice(i * Fr2.n8, i * Fr2.n8 + Fr2.n8);
    publicSignals.push(Scalar.fromRprLE(b));
  }
  proof.pi_a = G1.toObject(G1.toAffine(proof.pi_a));
  proof.pi_b = G2.toObject(G2.toAffine(proof.pi_b));
  proof.pi_c = G1.toObject(G1.toAffine(proof.pi_c));
  proof.protocol = "groth16";
  proof.curve = curve2.name;
  await fdZKey.close();
  await fdWtns.close();
  proof = stringifyBigInts$4(proof);
  publicSignals = stringifyBigInts$4(publicSignals);
  return { proof, publicSignals };
}
async function buildABC1(curve2, zkey, witness, coeffs, logger) {
  const n8 = curve2.Fr.n8;
  const sCoef = 4 * 3 + zkey.n8r;
  const nCoef = (coeffs.byteLength - 4) / sCoef;
  const outBuffA = new BigBuffer(zkey.domainSize * n8);
  const outBuffB = new BigBuffer(zkey.domainSize * n8);
  const outBuffC = new BigBuffer(zkey.domainSize * n8);
  const outBuf = [outBuffA, outBuffB];
  for (let i = 0; i < nCoef; i++) {
    if (logger && i % 1e6 == 0) logger.debug(`QAP AB: ${i}/${nCoef}`);
    const buffCoef = coeffs.slice(4 + i * sCoef, 4 + i * sCoef + sCoef);
    const buffCoefV = new DataView(buffCoef.buffer);
    const m = buffCoefV.getUint32(0, true);
    const c = buffCoefV.getUint32(4, true);
    const s = buffCoefV.getUint32(8, true);
    const coef = buffCoef.slice(12, 12 + n8);
    outBuf[m].set(
      curve2.Fr.add(
        outBuf[m].slice(c * n8, c * n8 + n8),
        curve2.Fr.mul(coef, witness.slice(s * n8, s * n8 + n8))
      ),
      c * n8
    );
  }
  for (let i = 0; i < zkey.domainSize; i++) {
    if (logger && i % 1e6 == 0) logger.debug(`QAP C: ${i}/${zkey.domainSize}`);
    outBuffC.set(
      curve2.Fr.mul(
        outBuffA.slice(i * n8, i * n8 + n8),
        outBuffB.slice(i * n8, i * n8 + n8)
      ),
      i * n8
    );
  }
  return [outBuffA, outBuffB, outBuffC];
}
async function joinABC(curve2, zkey, a2, b, c, logger) {
  const MAX_CHUNK_SIZE = 1 << 22;
  const n8 = curve2.Fr.n8;
  const nElements = Math.floor(a2.byteLength / curve2.Fr.n8);
  const promises = [];
  for (let i = 0; i < nElements; i += MAX_CHUNK_SIZE) {
    if (logger) logger.debug(`JoinABC: ${i}/${nElements}`);
    const n = Math.min(nElements - i, MAX_CHUNK_SIZE);
    const task = [];
    const aChunk = a2.slice(i * n8, (i + n) * n8);
    const bChunk = b.slice(i * n8, (i + n) * n8);
    const cChunk = c.slice(i * n8, (i + n) * n8);
    task.push({ cmd: "ALLOCSET", var: 0, buff: aChunk });
    task.push({ cmd: "ALLOCSET", var: 1, buff: bChunk });
    task.push({ cmd: "ALLOCSET", var: 2, buff: cChunk });
    task.push({ cmd: "ALLOC", var: 3, len: n * n8 });
    task.push({ cmd: "CALL", fnName: "qap_joinABC", params: [
      { var: 0 },
      { var: 1 },
      { var: 2 },
      { val: n },
      { var: 3 }
    ] });
    task.push({ cmd: "CALL", fnName: "frm_batchFromMontgomery", params: [
      { var: 3 },
      { val: n },
      { var: 3 }
    ] });
    task.push({ cmd: "GET", out: 0, var: 3, len: n * n8 });
    promises.push(curve2.tm.queueAction(task));
  }
  const result2 = await Promise.all(promises);
  let outBuff;
  if (a2 instanceof BigBuffer) {
    outBuff = new BigBuffer(a2.byteLength);
  } else {
    outBuff = new Uint8Array(a2.byteLength);
  }
  let p = 0;
  for (let i = 0; i < result2.length; i++) {
    outBuff.set(result2[i][0], p);
    p += result2[i][0].byteLength;
  }
  return outBuff;
}
function flatArray(a2) {
  let res = [];
  fillArray(res, a2);
  return res;
  function fillArray(res2, a3) {
    if (Array.isArray(a3)) {
      for (let i = 0; i < a3.length; i++) {
        fillArray(res2, a3[i]);
      }
    } else {
      res2.push(a3);
    }
  }
}
function normalize(n, prime) {
  let res = BigInt(n) % prime;
  if (res < 0) res += prime;
  return res;
}
function fnvHash(str) {
  const uint64_max = BigInt(2) ** BigInt(64);
  let hash = BigInt("0xCBF29CE484222325");
  for (let i = 0; i < str.length; i++) {
    hash ^= BigInt(str[i].charCodeAt(0));
    hash *= BigInt(1099511628211);
    hash %= uint64_max;
  }
  let shash = hash.toString(16);
  let n = 16 - shash.length;
  shash = "0".repeat(n).concat(shash);
  return shash;
}
function toArray32(s, size2) {
  const res = [];
  let rem = BigInt(s);
  const radix = BigInt(4294967296);
  while (rem) {
    res.unshift(Number(rem % radix));
    rem = rem / radix;
  }
  if (size2) {
    let i = size2 - res.length;
    while (i > 0) {
      res.unshift(0);
      i--;
    }
  }
  return res;
}
async function builder(code, options) {
  let instance;
  let wc;
  let memory;
  options = options || {};
  let majorVersion = 1;
  let minorVersion = 0;
  let patchVersion = 0;
  let codeIsWebAssemblyInstance = false;
  if (code instanceof WebAssembly.Instance) {
    instance = code;
    codeIsWebAssemblyInstance = true;
  } else {
    let memorySize = 32767;
    if (options.memorySize) {
      memorySize = parseInt(options.memorySize);
      if (memorySize < 0) {
        throw new Error("Invalid memory size");
      }
    }
    let memoryAllocated = false;
    while (!memoryAllocated) {
      try {
        memory = new WebAssembly.Memory({ initial: memorySize });
        memoryAllocated = true;
      } catch (err) {
        if (memorySize <= 1) {
          throw err;
        }
        console.warn("Could not allocate " + memorySize * 1024 * 64 + " bytes. This may cause severe instability. Trying with " + memorySize * 1024 * 64 / 2 + " bytes");
        memorySize = Math.floor(memorySize / 2);
      }
    }
    const wasmModule = await WebAssembly.compile(code);
    let errStr = "";
    let msgStr = "";
    instance = await WebAssembly.instantiate(wasmModule, {
      env: {
        "memory": memory
      },
      runtime: {
        printDebug: function(value) {
          console.log("printDebug:", value);
        },
        exceptionHandler: function(code2) {
          let err;
          if (code2 === 1) {
            err = "Signal not found. ";
          } else if (code2 === 2) {
            err = "Too many signals set. ";
          } else if (code2 === 3) {
            err = "Signal already set. ";
          } else if (code2 === 4) {
            err = "Assert Failed. ";
          } else if (code2 === 5) {
            err = "Not enough memory. ";
          } else if (code2 === 6) {
            err = "Input signal array access exceeds the size. ";
          } else {
            err = "Unknown error. ";
          }
          console.error("ERROR: ", code2, errStr);
          throw new Error(err + errStr);
        },
        // A new way of logging messages was added in Circom 2.0.7 that requires 2 new imports
        // `printErrorMessage` and `writeBufferMessage`.
        printErrorMessage: function() {
          errStr += getMessage() + "\n";
        },
        writeBufferMessage: function() {
          const msg = getMessage();
          if (msg === "\n") {
            console.log(msgStr);
            msgStr = "";
          } else {
            if (msgStr !== "") {
              msgStr += " ";
            }
            msgStr += msg;
          }
        },
        showSharedRWMemory: function() {
          const shared_rw_memory_size = instance.exports.getFieldNumLen32();
          const arr = new Uint32Array(shared_rw_memory_size);
          for (let j = 0; j < shared_rw_memory_size; j++) {
            arr[shared_rw_memory_size - 1 - j] = instance.exports.readSharedRWMemory(j);
          }
          if (majorVersion >= 2 && (minorVersion >= 1 || patchVersion >= 7)) {
            if (msgStr !== "") {
              msgStr += " ";
            }
            const msg = Scalar.fromArray(arr, 4294967296).toString();
            msgStr += msg;
          } else {
            console.log(Scalar.fromArray(arr, 4294967296));
          }
        },
        error: function(code2, pstr, a2, b, c, d2) {
          let errStr2;
          if (code2 === 7) {
            errStr2 = p2str(pstr) + " " + wc.getFr(b).toString() + " != " + wc.getFr(c).toString() + " " + p2str(d2);
          } else if (code2 === 9) {
            errStr2 = p2str(pstr) + " " + wc.getFr(b).toString() + " " + p2str(c);
          } else if (code2 === 5 && options.sym) {
            errStr2 = p2str(pstr) + " " + options.sym.labelIdx2Name[c];
          } else {
            errStr2 = p2str(pstr) + " " + a2 + " " + b + " " + c + " " + d2;
          }
          console.log("ERROR: ", code2, errStr2);
          throw new Error(errStr2);
        },
        log: function(a2) {
          console.log(wc.getFr(a2).toString());
        },
        logGetSignal: function(signal, pVal) {
          if (options.logGetSignal) {
            options.logGetSignal(signal, wc.getFr(pVal));
          }
        },
        logSetSignal: function(signal, pVal) {
          if (options.logSetSignal) {
            options.logSetSignal(signal, wc.getFr(pVal));
          }
        },
        logStartComponent: function(cIdx) {
          if (options.logStartComponent) {
            options.logStartComponent(cIdx);
          }
        },
        logFinishComponent: function(cIdx) {
          if (options.logFinishComponent) {
            options.logFinishComponent(cIdx);
          }
        }
      }
    });
  }
  if (typeof instance.exports.getVersion == "function") {
    majorVersion = instance.exports.getVersion();
  }
  if (typeof instance.exports.getMinorVersion == "function") {
    minorVersion = instance.exports.getMinorVersion();
  }
  if (typeof instance.exports.getPatchVersion == "function") {
    patchVersion = instance.exports.getPatchVersion();
  }
  const sanityCheck = options && (options.sanityCheck || options.logGetSignal || options.logSetSignal || options.logStartComponent || options.logFinishComponent);
  if (majorVersion === 2) {
    wc = new WitnessCalculatorCircom2(instance, sanityCheck);
  } else if (majorVersion === 1) {
    if (codeIsWebAssemblyInstance) {
      throw new Error("Loading code from WebAssembly instance is not supported for circom version 1");
    }
    wc = new WitnessCalculatorCircom1(memory, instance, sanityCheck);
  } else {
    throw new Error(`Unsupported circom version: ${majorVersion}`);
  }
  return wc;
  function getMessage() {
    let message = "";
    let c = instance.exports.getMessageChar();
    while (c !== 0) {
      message += String.fromCharCode(c);
      c = instance.exports.getMessageChar();
    }
    return message;
  }
  function p2str(p) {
    const i8 = new Uint8Array(memory.buffer);
    const bytes2 = [];
    for (let i = 0; i8[p + i] > 0; i++) bytes2.push(i8[p + i]);
    return String.fromCharCode.apply(null, bytes2);
  }
}
var WitnessCalculatorCircom1 = class {
  constructor(memory, instance, sanityCheck) {
    this.memory = memory;
    this.i32 = new Uint32Array(memory.buffer);
    this.instance = instance;
    this.n32 = (this.instance.exports.getFrLen() >> 2) - 2;
    const pRawPrime = this.instance.exports.getPRawPrime();
    const arr = new Array(this.n32);
    for (let i = 0; i < this.n32; i++) {
      arr[this.n32 - 1 - i] = this.i32[(pRawPrime >> 2) + i];
    }
    this.prime = Scalar.fromArray(arr, 4294967296);
    this.Fr = new ZqField(this.prime);
    this.mask32 = Scalar.fromString("FFFFFFFF", 16);
    this.NVars = this.instance.exports.getNVars();
    this.n64 = Math.floor((this.Fr.bitLength - 1) / 64) + 1;
    this.R = this.Fr.e(Scalar.shiftLeft(1, this.n64 * 64));
    this.RInv = this.Fr.inv(this.R);
    this.sanityCheck = sanityCheck;
  }
  circom_version() {
    return 1;
  }
  async _doCalculateWitness(input, sanityCheck) {
    this.instance.exports.init(this.sanityCheck || sanityCheck ? 1 : 0);
    const pSigOffset = this.allocInt();
    const pFr = this.allocFr();
    const keys = Object.keys(input);
    keys.forEach((k) => {
      const h = fnvHash(k);
      const hMSB = parseInt(h.slice(0, 8), 16);
      const hLSB = parseInt(h.slice(8, 16), 16);
      try {
        this.instance.exports.getSignalOffset32(pSigOffset, 0, hMSB, hLSB);
      } catch (err) {
        throw new Error(`Signal ${k} is not an input of the circuit.`);
      }
      const sigOffset = this.getInt(pSigOffset);
      const fArr = flatArray(input[k]);
      for (let i = 0; i < fArr.length; i++) {
        this.setFr(pFr, fArr[i]);
        this.instance.exports.setSignal(0, 0, sigOffset + i, pFr);
      }
    });
  }
  async calculateWitness(input, sanityCheck) {
    const self = this;
    const old0 = self.i32[0];
    const w = [];
    await self._doCalculateWitness(input, sanityCheck);
    for (let i = 0; i < self.NVars; i++) {
      const pWitness = self.instance.exports.getPWitness(i);
      w.push(self.getFr(pWitness));
    }
    self.i32[0] = old0;
    return w;
  }
  async calculateBinWitness(input, sanityCheck) {
    const self = this;
    const old0 = self.i32[0];
    await self._doCalculateWitness(input, sanityCheck);
    const pWitnessBuffer = self.instance.exports.getWitnessBuffer();
    self.i32[0] = old0;
    const buff = self.memory.buffer.slice(pWitnessBuffer, pWitnessBuffer + self.NVars * self.n64 * 8);
    return new Uint8Array(buff);
  }
  allocInt() {
    const p = this.i32[0];
    this.i32[0] = p + 8;
    return p;
  }
  allocFr() {
    const p = this.i32[0];
    this.i32[0] = p + this.n32 * 4 + 8;
    return p;
  }
  getInt(p) {
    return this.i32[p >> 2];
  }
  setInt(p, v) {
    this.i32[p >> 2] = v;
  }
  getFr(p) {
    const self = this;
    const idx = p >> 2;
    if (self.i32[idx + 1] & 2147483648) {
      const arr = new Array(self.n32);
      for (let i = 0; i < self.n32; i++) {
        arr[self.n32 - 1 - i] = self.i32[idx + 2 + i];
      }
      const res = self.Fr.e(Scalar.fromArray(arr, 4294967296));
      if (self.i32[idx + 1] & 1073741824) {
        return fromMontgomery(res);
      } else {
        return res;
      }
    } else {
      if (self.i32[idx] & 2147483648) {
        return self.Fr.e(self.i32[idx] - 4294967296);
      } else {
        return self.Fr.e(self.i32[idx]);
      }
    }
    function fromMontgomery(n) {
      return self.Fr.mul(self.RInv, n);
    }
  }
  setFr(p, v) {
    const self = this;
    v = self.Fr.e(v);
    const minShort = self.Fr.neg(self.Fr.e("80000000", 16));
    const maxShort = self.Fr.e("7FFFFFFF", 16);
    if (self.Fr.geq(v, minShort) && self.Fr.leq(v, maxShort)) {
      let a2;
      if (self.Fr.geq(v, self.Fr.zero)) {
        a2 = Scalar.toNumber(v);
      } else {
        a2 = Scalar.toNumber(self.Fr.sub(v, minShort));
        a2 = a2 - 2147483648;
        a2 = 4294967296 + a2;
      }
      self.i32[p >> 2] = a2;
      self.i32[(p >> 2) + 1] = 0;
      return;
    }
    self.i32[p >> 2] = 0;
    self.i32[(p >> 2) + 1] = 2147483648;
    const arr = Scalar.toArray(v, 4294967296);
    for (let i = 0; i < self.n32; i++) {
      const idx = arr.length - 1 - i;
      if (idx >= 0) {
        self.i32[(p >> 2) + 2 + i] = arr[idx];
      } else {
        self.i32[(p >> 2) + 2 + i] = 0;
      }
    }
  }
};
var WitnessCalculatorCircom2 = class {
  constructor(instance, sanityCheck) {
    this.instance = instance;
    this.version = this.instance.exports.getVersion();
    this.n32 = this.instance.exports.getFieldNumLen32();
    this.instance.exports.getRawPrime();
    const arr = new Uint32Array(this.n32);
    for (let i = 0; i < this.n32; i++) {
      arr[this.n32 - 1 - i] = this.instance.exports.readSharedRWMemory(i);
    }
    this.prime = Scalar.fromArray(arr, 4294967296);
    this.witnessSize = this.instance.exports.getWitnessSize();
    this.sanityCheck = sanityCheck;
  }
  circom_version() {
    return this.instance.exports.getVersion();
  }
  async _doCalculateWitness(input, sanityCheck) {
    this.instance.exports.init(this.sanityCheck || sanityCheck ? 1 : 0);
    const keys = Object.keys(input);
    let input_counter = 0;
    keys.forEach((k) => {
      const h = fnvHash(k);
      const hMSB = parseInt(h.slice(0, 8), 16);
      const hLSB = parseInt(h.slice(8, 16), 16);
      const fArr = flatArray(input[k]);
      if (typeof this.instance.exports.getInputSignalSize === "function") {
        let signalSize = this.instance.exports.getInputSignalSize(hMSB, hLSB);
        if (signalSize < 0) {
          throw new Error(`Signal ${k} not found
`);
        }
        if (fArr.length < signalSize) {
          throw new Error(`Not enough values for input signal ${k}
`);
        }
        if (fArr.length > signalSize) {
          throw new Error(`Too many values for input signal ${k}
`);
        }
      }
      for (let i = 0; i < fArr.length; i++) {
        const arrFr = toArray32(normalize(fArr[i], this.prime), this.n32);
        for (let j = 0; j < this.n32; j++) {
          this.instance.exports.writeSharedRWMemory(j, arrFr[this.n32 - 1 - j]);
        }
        try {
          this.instance.exports.setInputSignal(hMSB, hLSB, i);
          input_counter++;
        } catch (err) {
          throw new Error(err);
        }
      }
    });
    if (input_counter < this.instance.exports.getInputSize()) {
      throw new Error(`Not all inputs have been set. Only ${input_counter} out of ${this.instance.exports.getInputSize()}`);
    }
  }
  async calculateWitness(input, sanityCheck) {
    const w = [];
    await this._doCalculateWitness(input, sanityCheck);
    for (let i = 0; i < this.witnessSize; i++) {
      this.instance.exports.getWitness(i);
      const arr = new Uint32Array(this.n32);
      for (let j = 0; j < this.n32; j++) {
        arr[this.n32 - 1 - j] = this.instance.exports.readSharedRWMemory(j);
      }
      w.push(Scalar.fromArray(arr, 4294967296));
    }
    return w;
  }
  async calculateWTNSBin(input, sanityCheck) {
    const buff32 = new Uint32Array(this.witnessSize * this.n32 + this.n32 + 11);
    const buff = new Uint8Array(buff32.buffer);
    await this._doCalculateWitness(input, sanityCheck);
    buff[0] = "w".charCodeAt(0);
    buff[1] = "t".charCodeAt(0);
    buff[2] = "n".charCodeAt(0);
    buff[3] = "s".charCodeAt(0);
    buff32[1] = 2;
    buff32[2] = 2;
    buff32[3] = 1;
    const n8 = this.n32 * 4;
    const idSection1length = 8 + n8;
    const idSection1lengthHex = idSection1length.toString(16);
    buff32[4] = parseInt(idSection1lengthHex.slice(0, 8), 16);
    buff32[5] = parseInt(idSection1lengthHex.slice(8, 16), 16);
    buff32[6] = n8;
    this.instance.exports.getRawPrime();
    let pos = 7;
    for (let j = 0; j < this.n32; j++) {
      buff32[pos + j] = this.instance.exports.readSharedRWMemory(j);
    }
    pos += this.n32;
    buff32[pos] = this.witnessSize;
    pos++;
    buff32[pos] = 2;
    pos++;
    const idSection2length = n8 * this.witnessSize;
    const idSection2lengthHex = idSection2length.toString(16);
    buff32[pos] = parseInt(idSection2lengthHex.slice(0, 8), 16);
    buff32[pos + 1] = parseInt(idSection2lengthHex.slice(8, 16), 16);
    pos += 2;
    for (let i = 0; i < this.witnessSize; i++) {
      this.instance.exports.getWitness(i);
      for (let j = 0; j < this.n32; j++) {
        buff32[pos + j] = this.instance.exports.readSharedRWMemory(j);
      }
      pos += this.n32;
    }
    return buff;
  }
};
var { unstringifyBigInts: unstringifyBigInts$b } = utils;
async function wtnsCalculate(_input, wasmFileName, wtnsFileName, options) {
  const input = unstringifyBigInts$b(_input);
  const fdWasm = await readExisting(wasmFileName);
  const wasm = await fdWasm.read(fdWasm.totalSize);
  await fdWasm.close();
  const wc = await builder(wasm, options);
  if (wc.circom_version() === 1) {
    const w = await wc.calculateBinWitness(input);
    const fdWtns = await createBinFile(wtnsFileName, "wtns", 2, 2);
    await writeBin(fdWtns, w, wc.prime);
    await fdWtns.close();
  } else {
    const fdWtns = await createOverride(wtnsFileName);
    const w = await wc.calculateWTNSBin(input);
    await fdWtns.write(w);
    await fdWtns.close();
  }
}
var { unstringifyBigInts: unstringifyBigInts$a } = utils;
async function groth16FullProve(_input, wasmFile, zkeyFileName, logger, wtnsCalcOptions, proverOptions) {
  const input = unstringifyBigInts$a(_input);
  const wtns = {
    type: "mem"
  };
  await wtnsCalculate(input, wasmFile, wtns, wtnsCalcOptions);
  return await groth16Prove(zkeyFileName, wtns, logger, proverOptions);
}
var { unstringifyBigInts: unstringifyBigInts$9 } = utils;
async function groth16Verify(_vk_verifier, _publicSignals, _proof, logger) {
  const vk_verifier = unstringifyBigInts$9(_vk_verifier);
  const proof = unstringifyBigInts$9(_proof);
  const publicSignals = unstringifyBigInts$9(_publicSignals);
  const curve2 = await getCurveFromName(vk_verifier.curve);
  const IC0 = curve2.G1.fromObject(vk_verifier.IC[0]);
  const IC = new Uint8Array(curve2.G1.F.n8 * 2 * publicSignals.length);
  const w = new Uint8Array(curve2.Fr.n8 * publicSignals.length);
  if (!publicInputsAreValid$2(curve2, publicSignals)) {
    if (logger) logger.error("Public inputs are not valid.");
    return false;
  }
  for (let i = 0; i < publicSignals.length; i++) {
    const buffP = curve2.G1.fromObject(vk_verifier.IC[i + 1]);
    IC.set(buffP, i * curve2.G1.F.n8 * 2);
    Scalar.toRprLE(w, curve2.Fr.n8 * i, publicSignals[i], curve2.Fr.n8);
  }
  let cpub = await curve2.G1.multiExpAffine(IC, w);
  cpub = curve2.G1.add(cpub, IC0);
  const pi_a = curve2.G1.fromObject(proof.pi_a);
  const pi_b = curve2.G2.fromObject(proof.pi_b);
  const pi_c = curve2.G1.fromObject(proof.pi_c);
  if (!isWellConstructed$1(curve2, { pi_a, pi_b, pi_c })) {
    if (logger) logger.error("Proof commitments are not valid.");
    return false;
  }
  const vk_gamma_2 = curve2.G2.fromObject(vk_verifier.vk_gamma_2);
  const vk_delta_2 = curve2.G2.fromObject(vk_verifier.vk_delta_2);
  const vk_alpha_1 = curve2.G1.fromObject(vk_verifier.vk_alpha_1);
  const vk_beta_2 = curve2.G2.fromObject(vk_verifier.vk_beta_2);
  const res = await curve2.pairingEq(
    curve2.G1.neg(pi_a),
    pi_b,
    cpub,
    vk_gamma_2,
    pi_c,
    vk_delta_2,
    vk_alpha_1,
    vk_beta_2
  );
  if (!res) {
    if (logger) logger.error("Invalid proof");
    return false;
  }
  if (logger) logger.info("OK!");
  return true;
}
function isWellConstructed$1(curve2, proof) {
  const G1 = curve2.G1;
  const G2 = curve2.G2;
  return G1.isValid(proof.pi_a) && G2.isValid(proof.pi_b) && G1.isValid(proof.pi_c);
}
function checkValueBelongToField$2(curve2, value) {
  return Scalar.geq(value, 0) && Scalar.lt(value, curve2.r);
}
function publicInputsAreValid$2(curve2, publicInputs) {
  for (let i = 0; i < publicInputs.length; i++) {
    if (!checkValueBelongToField$2(curve2, publicInputs[i])) {
      return false;
    }
  }
  return true;
}
var { unstringifyBigInts: unstringifyBigInts$8 } = utils;
function p256$2(n) {
  let nstr = n.toString(16);
  while (nstr.length < 64) nstr = "0" + nstr;
  nstr = `"0x${nstr}"`;
  return nstr;
}
async function groth16ExportSolidityCallData(_proof, _pub) {
  const proof = unstringifyBigInts$8(_proof);
  const pub = unstringifyBigInts$8(_pub);
  let inputs = "";
  for (let i = 0; i < pub.length; i++) {
    if (inputs != "") inputs = inputs + ",";
    inputs = inputs + p256$2(pub[i]);
  }
  let S;
  S = `[${p256$2(proof.pi_a[0])}, ${p256$2(proof.pi_a[1])}],[[${p256$2(proof.pi_b[0][1])}, ${p256$2(proof.pi_b[0][0])}],[${p256$2(proof.pi_b[1][1])}, ${p256$2(proof.pi_b[1][0])}]],[${p256$2(proof.pi_c[0])}, ${p256$2(proof.pi_c[1])}],[${inputs}]`;
  return S;
}
var groth16 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fullProve: groth16FullProve,
  prove: groth16Prove,
  verify: groth16Verify,
  exportSolidityCallData: groth16ExportSolidityCallData
});
var bls12381r2 = Scalar.e("73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001", 16);
var bn128r2 = Scalar.e("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var { unstringifyBigInts: unstringifyBigInts$7 } = utils;
var { stringifyBigInts: stringifyBigInts$3 } = utils;
var { unstringifyBigInts: unstringifyBigInts$6, stringifyBigInts: stringifyBigInts$2 } = utils;
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
var _0n = /* @__PURE__ */ BigInt(0);
var _1n = /* @__PURE__ */ BigInt(1);
var _2n = /* @__PURE__ */ BigInt(2);
var _7n = /* @__PURE__ */ BigInt(7);
var _256n = /* @__PURE__ */ BigInt(256);
var _0x71n = /* @__PURE__ */ BigInt(113);
for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
  [x, y] = [y, (2 * x + 3 * y) % 5];
  SHA3_PI.push(2 * (5 * y + x));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n;
  for (let j = 0; j < 7; j++) {
    R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
    if (R & _2n)
      t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ split(_SHA3_IOTA, true);
var rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
var rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    number(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u322(this.state);
  }
  keccak() {
    if (!isLE)
      byteSwap32(this.state32);
    keccakP(this.state32, this.rounds);
    if (!isLE)
      byteSwap32(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    exists(this);
    const { blockLen, state } = this;
    data = toBytes(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0; i < take; i++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    exists(this, false);
    bytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    output(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
var keccak_256 = /* @__PURE__ */ gen(1, 136, 256 / 8);
var { stringifyBigInts: stringifyBigInts$1 } = utils;
var { unstringifyBigInts: unstringifyBigInts$5 } = utils;
var { unstringifyBigInts: unstringifyBigInts$4 } = utils;
var { unstringifyBigInts: unstringifyBigInts$3 } = utils;
var { stringifyBigInts: stringifyBigInts2 } = utils;
var { unstringifyBigInts: unstringifyBigInts$2 } = utils;
var { unstringifyBigInts: unstringifyBigInts$1 } = utils;
var { unstringifyBigInts: unstringifyBigInts2 } = utils;

// src/rules/index.ts
var COVERAGE_BPS = 3e3;
var BPS = 10000n;
var CA_MONTHLY_FLOOR_CENTS = 125000n;
function assess(facts2) {
  validate(facts2);
  if (facts2.jurisdiction === "MN") return assessMN(facts2);
  if (facts2.jurisdiction === "IL") return assessIL(facts2);
  return assessCA(facts2);
}
function validate(f) {
  if (f.grossCents < 0n) throw new RangeError("grossCents must not be negative");
  if (!Number.isInteger(f.contentBps) || f.contentBps < 0 || f.contentBps > 1e4) {
    throw new RangeError("contentBps must be an integer from 0 to 10000");
  }
  if (!Number.isInteger(f.minorsInSegment) || f.minorsInSegment < 1) {
    throw new RangeError("minorsInSegment must be at least 1");
  }
}
function result(f, covered, setAsideBps, citation, ruleVersion) {
  if (!covered) return { covered, setAsideBps: 0, owedCents: 0n, flags: [], citation, ruleVersion };
  return {
    covered,
    setAsideBps,
    owedCents: f.grossCents * BigInt(setAsideBps) / BPS,
    flags: [],
    citation,
    ruleVersion
  };
}
function assessMN(f) {
  const citation = "Minn. Stat. 181A.13 subds. 1, 3";
  const ruleVersion = "MN-181A.13-2026";
  if (f.ageYears < 14 && f.contentBps > 0) {
    return {
      covered: true,
      setAsideBps: 1e4,
      owedCents: f.grossCents,
      flags: ["UNDER_14_BARRED"],
      citation,
      ruleVersion
    };
  }
  const covered = f.contentBps >= COVERAGE_BPS && f.viewTestMet;
  return result(f, covered, Math.floor(f.contentBps / 2 / f.minorsInSegment), citation, ruleVersion);
}
function assessIL(f) {
  const covered = f.ageYears < 16 && f.contentBps >= COVERAGE_BPS && f.viewTestMet;
  return result(
    f,
    covered,
    Math.floor(f.contentBps / 2 / f.minorsInSegment),
    "820 ILCS 206/95, 206/100",
    "IL-206-2025"
  );
}
function assessCA(f) {
  const covered = f.contentBps >= COVERAGE_BPS && f.grossCents >= CA_MONTHLY_FLOOR_CENTS && f.viewTestMet;
  return result(
    f,
    covered,
    Math.floor(f.contentBps * 65 / 100 / f.minorsInSegment),
    "Cal. Fam. Code 6651, 6652(f), 6653(a)",
    "CA-6650-2025"
  );
}

// node_modules/@zk-kit/utils/dist/lib.esm/conversions.js
var import_buffer2 = __toESM(require_buffer(), 1);

// node_modules/@zk-kit/utils/dist/lib.esm/type-checks.js
var import_buffer = __toESM(require_buffer(), 1);

// node_modules/@zk-kit/utils/dist/lib.esm/scalar.js
function isZero2(a2) {
  return !a2;
}
function isOdd2(a2) {
  return (a2 & BigInt(1)) === BigInt(1);
}
function shiftRight2(a2, n) {
  return a2 >> n;
}
function bits2(n) {
  const res = [];
  let E = n;
  while (E) {
    if (E & BigInt(1)) {
      res.push(1);
    } else {
      res.push(0);
    }
    E >>= BigInt(1);
  }
  return res;
}

// node_modules/@zk-kit/utils/dist/lib.esm/f1-field.js
var F1Field = class {
  constructor(order2) {
    this.one = 1n;
    this.zero = 0n;
    this._order = order2;
    this._half = order2 >> this.one;
    this._negone = this._order - this.one;
  }
  /**
   * Ensures a given result falls within the field by applying modular reduction.
   * This method also handles negative inputs, correctly mapping them into the field.
   * @param res The result to be normalized to the field.
   * @returns The equivalent value within the field.
   */
  e(res) {
    res %= this._order;
    return res < 0 ? res + this._order : res;
  }
  /**
   * Performs modular multiplication of two bigint values within the field.
   * @param a The first value.
   * @param b The second value.
   * @returns The product of 'a' and 'b' modulo the field's order.
   */
  mul(a2, b) {
    return a2 * b % this._order;
  }
  /**
   * Subtracts one bigint from another under modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value from which to subtract.
   * @param b The value to be subtracted.
   * @returns The difference of 'a' and 'b' modulo the field's order.
   */
  sub(a2, b) {
    return a2 >= b ? a2 - b : this._order - b + a2;
  }
  /**
   * Adds two bigint values together under modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value.
   * @param b The second value.
   * @returns The sum of 'a' and 'b' modulo the field's order.
   */
  add(a2, b) {
    const res = a2 + b;
    return res >= this._order ? res - this._order : res;
  }
  /**
   * Computes the multiplicative inverse of a given value within the field.
   * This method uses the Extended Euclidean Algorithm to find the inverse,
   * ensuring the result is always a positive value less than the field's order.
   * If the input value is zero, which has no inverse, an error is thrown.
   * @param a The value for which to compute the inverse.
   * @returns The multiplicative inverse of 'a' modulo the field's order.
   * @throws if 'a' is zero.
   */
  inv(a2) {
    if (a2 === this.zero) {
      throw new Error("Zero has no inverse");
    }
    let t = this.zero;
    let r2 = this._order;
    let newt = this.one;
    let newr = a2 % this._order;
    while (newr) {
      const q = r2 / newr;
      [t, newt] = [newt, t - q * newt];
      [r2, newr] = [newr, r2 - q * newr];
    }
    if (t < this.zero) {
      t += this._order;
    }
    return t;
  }
  /**
   * Divides one bigint by another within the field by multiplying the first value
   * by the multiplicative inverse of the second.
   * @param a The dividend.
   * @param b The divisor.
   * @returns The result of the division of 'a' by 'b' modulo the field's order.
   */
  div(a2, b) {
    return this.mul(a2, this.inv(b));
  }
  /**
   * Checks if two bigint values are equal within the context of the field.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' equals 'b', false otherwise.
   */
  eq(a2, b) {
    return a2 === b;
  }
  /**
   * Squares a bigint value within the field.
   * This is a specific case of multiplication where the value is multiplied by itself,
   * optimized for performance where applicable.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value to square.
   * @returns The square of 'a' modulo the field's order.
   */
  square(a2) {
    return a2 * a2 % this._order;
  }
  /**
   * Compares two bigint values to determine if the first is less than the second,
   * taking into account the field's order for modular comparison.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' is less than 'b', false otherwise.
   */
  lt(a2, b) {
    const aa = a2 > this._half ? a2 - this._order : a2;
    const bb = b > this._half ? b - this._order : b;
    return aa < bb;
  }
  /**
   * Compares two bigint values to determine if the first is greater than or equal to the second,
   * considering the field's modular context.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The first value to compare.
   * @param b The second value to compare.
   * @returns True if 'a' is greater than or equal to 'b', false otherwise.
   */
  geq(a2, b) {
    const aa = a2 > this._half ? a2 - this._order : a2;
    const bb = b > this._half ? b - this._order : b;
    return aa >= bb;
  }
  /**
   * Computes the negation of a bigint value within the field.
   * The result is the modular additive inverse that, when added to the original value,
   * yields zero in the field's modulus.
   * It ensures the result is within the field if and only if the input values are within the field.
   * @param a The value to negate.
   * @returns The negation of 'a' modulo the field's order.
   */
  neg(a2) {
    return a2 ? this._order - a2 : a2;
  }
  /**
   * Checks if a bigint value is zero within the context of the field.
   * @param a The value to check.
   * @returns True if 'a' is zero, false otherwise.
   */
  isZero(a2) {
    return a2 === this.zero;
  }
  /**
   * Raises a base to an exponent within the field, efficiently computing
   * scalar exponentiation using the square-and-multiply algorithm.
   * Supports both positive and negative exponents through the use of the `inv` method for negatives.
   * @param base The base to be exponentiated.
   * @param e The exponent.
   * @returns The result of raising 'base' to the power 'e' modulo the field's order.
   */
  pow(base, e2) {
    if (isZero2(e2)) {
      return this.one;
    }
    if (e2 < 0n) {
      base = this.inv(base);
      e2 = -e2;
    }
    const n = bits2(e2);
    if (n.length === 0) {
      return this.one;
    }
    let res = base;
    for (let i = n.length - 2; i >= 0; i -= 1) {
      res = this.square(res);
      if (n[i]) {
        res = this.mul(res, base);
      }
    }
    return res;
  }
};

// node_modules/@zk-kit/baby-jubjub/dist/index.js
var r = BigInt("21888242871839275222246405745257275088548364400416034343698204186575808495617");
var Fr = new F1Field(r);
var Base8 = [
  Fr.e(BigInt("5299619240641551281634865583518297030282874472190772894086521144482721001553")),
  Fr.e(BigInt("16950150798460657717958625567821834550301663161624707787222815936182638968203"))
];
var a = Fr.e(BigInt("168700"));
var d = Fr.e(BigInt("168696"));
var order = BigInt("21888242871839275222246405745257275088614511777268538073601725287587578984328");
var subOrder = shiftRight2(order, BigInt(3));
function addPoint(p1, p2) {
  const beta = Fr.mul(p1[0], p2[1]);
  const gamma = Fr.mul(p1[1], p2[0]);
  const delta = Fr.mul(Fr.sub(p1[1], Fr.mul(a, p1[0])), Fr.add(p2[0], p2[1]));
  const tau = Fr.mul(beta, gamma);
  const dtau = Fr.mul(d, tau);
  const p3x = Fr.div(Fr.add(beta, gamma), Fr.add(Fr.one, dtau));
  const p3y = Fr.div(Fr.add(delta, Fr.sub(Fr.mul(a, beta), gamma)), Fr.sub(Fr.one, dtau));
  return [p3x, p3y];
}
function mulPointEscalar(base, e2) {
  let res = [Fr.e(BigInt(0)), Fr.e(BigInt(1))];
  let rem = e2;
  let exp2 = base;
  while (!isZero2(rem)) {
    if (isOdd2(rem)) {
      res = addPoint(res, exp2);
    }
    exp2 = addPoint(exp2, exp2);
    rem = shiftRight2(rem, BigInt(1));
  }
  return res;
}

// src/witness.ts
var import_poseidon2 = __toESM(require_poseidon2(), 1);
var import_poseidon3 = __toESM(require_poseidon3(), 1);
var import_poseidon5 = __toESM(require_poseidon5(), 1);
var import_poseidon7 = __toESM(require_poseidon7(), 1);

// node_modules/viem/_esm/index.js
init_toHex();
init_keccak256();

// src/witness.ts
var earningsCommitment = (grossCents, salt) => (0, import_poseidon2.poseidon2)([grossCents, salt]);
var JURISDICTION_ID = { MN: 0, CA: 1, IL: 2 };
function commit(p) {
  return (0, import_poseidon7.poseidon7)([
    p.grossCents,
    BigInt(p.contentBps),
    BigInt(p.minorsInSegment),
    BigInt(p.ageYears),
    p.viewTestMet ? 1n : 0n,
    p.depositedCents,
    p.salt
  ]);
}
var scalar = (text) => BigInt(keccak256(stringToHex(text))) % (subOrder - 1n) + 1n;
function fiduciaryPublicKey(key) {
  return mulPointEscalar(Base8, scalar(key));
}
function signDeposit(fiduciaryKey, depositedCents, dealId, periodId) {
  const message = (0, import_poseidon3.poseidon3)([depositedCents, dealId, periodId]);
  const x = scalar(fiduciaryKey);
  const [ax, ay] = fiduciaryPublicKey(fiduciaryKey);
  const r2 = scalar(`${fiduciaryKey}:${message}`);
  const r8 = mulPointEscalar(Base8, r2);
  const h = (0, import_poseidon5.poseidon5)([r8[0], r8[1], ax, ay, message]);
  return { r8, s: (r2 + 8n * (h % subOrder) * x) % subOrder };
}
function circuitInput(p, dealId, periodId, fiduciary, statement, oracle) {
  const isCA = p.jurisdiction === "CA";
  const numerator = BigInt(p.contentBps) * (isCA ? 65n : 1n);
  const denominator = (isCA ? 100n : 2n) * BigInt(p.minorsInSegment);
  const setAsideBps = numerator / denominator;
  return {
    grossCents: p.grossCents.toString(),
    contentBps: p.contentBps.toString(),
    minors: p.minorsInSegment.toString(),
    age: p.ageYears.toString(),
    viewTestMet: p.viewTestMet ? "1" : "0",
    depositedCents: p.depositedCents.toString(),
    salt: p.salt.toString(),
    setAsideBps: setAsideBps.toString(),
    owedShareCents: (p.grossCents * setAsideBps / 10000n).toString(),
    sigR8x: statement.r8[0].toString(),
    sigR8y: statement.r8[1].toString(),
    sigS: statement.s.toString(),
    commitment: commit(p).toString(),
    dealId: dealId.toString(),
    periodId: periodId.toString(),
    jurisdiction: JURISDICTION_ID[p.jurisdiction].toString(),
    fiduciaryAx: fiduciary[0].toString(),
    fiduciaryAy: fiduciary[1].toString(),
    earningsSalt: oracle.earningsSalt.toString(),
    earningsCommitment: earningsCommitment(p.grossCents, oracle.earningsSalt).toString(),
    factsDigest: oracle.factsDigest.toString()
  };
}

// src/packet.ts
var dollars = (cents2) => `$${(Number(cents2) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
function buildRows(periods) {
  return periods.map((period) => {
    const assessment = assess(period);
    const gap = assessment.owedCents - period.depositedCents;
    return {
      label: period.label,
      citation: assessment.citation,
      owedCents: assessment.owedCents,
      depositedCents: period.depositedCents,
      shortfallCents: gap > 0n ? gap : 0n,
      fiduciarySigned: period.fiduciarySigned,
      flags: assessment.flags,
      commitment: commit(period).toString(16).padStart(64, "0")
    };
  });
}
function renderPacket(childAlias, periods) {
  const rows = buildRows(periods);
  const total = (pick) => rows.reduce((sum, row) => sum + pick(row), 0n);
  const table = rows.map(
    (r2) => `| ${r2.label} | ${dollars(r2.owedCents)} | ${dollars(r2.depositedCents)} | ${dollars(r2.shortfallCents)} | ${r2.fiduciarySigned ? "Yes" : "No"} | ${r2.citation} |`
  );
  return [
    `# Birthday Packet: ${childAlias}`,
    "",
    `Owed: ${dollars(total((r2) => r2.owedCents))}. Deposited: ${dollars(total((r2) => r2.depositedCents))}. Shortfall: ${dollars(total((r2) => r2.shortfallCents))}.`,
    "",
    "| Period | Owed | Deposited | Shortfall | Fiduciary signed | Rule |",
    "|---|---|---|---|---|---|",
    ...table,
    "",
    "## Commitments",
    "",
    ...rows.map((r2) => `- ${r2.label}: 0x${r2.commitment}`),
    "",
    "## What this record does not prove",
    "",
    "- That the parent's declared content share is accurate. It shows who declared what, and when.",
    "- That all income was reported. Income outside the connected platform is self-reported.",
    "- That any shortfall was knowing or reckless, which is what a claim under these statutes turns on.",
    "",
    "This packet is not legal advice. Take it to a lawyer.",
    ""
  ].join("\n");
}

// demo/app.ts
var SANDBOX_FIDUCIARY_KEY = "sandbox-fiduciary";
var DEAL = 1n;
var PERIOD = 1n;
var $ = (id) => document.getElementById(id);
var num = (id) => Number($(id).value);
var cents = (id) => BigInt(Math.round(num(id) * 100));
var usd = (value) => `$${(Number(value) / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
function facts() {
  return {
    jurisdiction: $("state").value,
    grossCents: cents("gross"),
    contentBps: Math.round(num("content") * 100),
    minorsInSegment: num("minors"),
    ageYears: num("age"),
    viewTestMet: $("views").checked
  };
}
function refresh() {
  const assessment = assess(facts());
  $("owed").textContent = usd(assessment.owedCents);
  $("citation").textContent = `${assessment.citation} (${assessment.ruleVersion})`;
  $("covered").textContent = assessment.covered ? "Covered" : "Below the coverage test";
  $("flags").textContent = assessment.flags.join(", ");
  const gap = assessment.owedCents - cents("deposit");
  $("gap").textContent = gap > 0n ? `Short by ${usd(gap)}` : "Claimed deposit covers the amount owed";
  $("outcome").textContent = "";
}
async function generate() {
  const button = $("prove");
  button.disabled = true;
  $("outcome").textContent = "Proving in this browser. This can take up to a minute.";
  const period = {
    ...facts(),
    depositedCents: cents("deposit"),
    salt: BigInt(Math.floor(Math.random() * 2 ** 48))
  };
  const fiduciary = fiduciaryPublicKey(SANDBOX_FIDUCIARY_KEY);
  const statement = signDeposit(SANDBOX_FIDUCIARY_KEY, cents("signed"), DEAL, PERIOD);
  const started = performance.now();
  try {
    const { proof, publicSignals } = await groth16.fullProve(
      circuitInput(period, DEAL, PERIOD, fiduciary, statement, { earningsSalt: 31n, factsDigest: 1n }),
      "zk/setaside.wasm",
      "zk/setaside.zkey"
    );
    const key = await fetch("zk/verification_key.json").then((r2) => r2.json());
    const valid = await groth16.verify(key, publicSignals, proof);
    const elapsed = Math.round(performance.now() - started);
    const commitment = commit(period).toString().slice(0, 12);
    $("outcome").textContent = `${valid ? "Proof verified" : "Proof failed verification"} in ${elapsed} ms. A verifier sees only: commitment ${commitment}..., deal 1, period 1, statute ${period.jurisdiction}, the fiduciary's public key, and the oracle's earnings commitment. Earnings, content share, age and the deposit stay private.`;
  } catch {
    $("outcome").textContent = cents("deposit") !== cents("signed") ? "No proof exists: the claimed deposit doesn't match what the fiduciary signed." : "No proof exists for these numbers, so the payout contract would revert.";
  }
  button.disabled = false;
}
var SAMPLE = [
  ["January", 2000000n, 500000n],
  ["February", 1800000n, 450000n],
  ["March", 2400000n, 400000n],
  ["April", 2000000n, 500000n]
];
function downloadPacket() {
  const periods = SAMPLE.map(([label, grossCents, depositedCents]) => ({
    label,
    ...facts(),
    grossCents,
    depositedCents,
    salt: 11n,
    fiduciarySigned: true
  }));
  const blob = new Blob([renderPacket("Child A (sample data)", periods)], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "birthday-packet-sample.md";
  link.click();
  URL.revokeObjectURL(link.href);
}
for (const id of ["state", "gross", "content", "minors", "age", "views", "deposit", "signed"]) {
  $(id).addEventListener("input", refresh);
}
$("prove").addEventListener("click", generate);
$("packet").addEventListener("click", downloadPacket);
refresh();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

@noble/hashes/esm/utils.js:
snarkjs/build/browser.esm.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@zk-kit/utils/dist/lib.esm/type-checks.js:
@zk-kit/utils/dist/lib.esm/error-handlers.js:
@zk-kit/utils/dist/lib.esm/conversions.js:
@zk-kit/utils/dist/lib.esm/scalar.js:
@zk-kit/utils/dist/lib.esm/f1-field.js:
  (**
   * @module @zk-kit/utils
   * @version 1.2.1
   * @file Essential zero-knowledge utility library for JavaScript developers.
   * @copyright Ethereum Foundation 2024
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/utils}
  *)

@zk-kit/baby-jubjub/dist/index.js:
  (**
   * @module @zk-kit/baby-jubjub
   * @version 1.0.3
   * @file A JavaScript library for adding points to the curve.
   * @copyright Ethereum Foundation 2024
   * @license MIT
   * @see [Github]{@link https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/baby-jubjub}
  *)
*/
