var pbkdf2Sync = require('pbkdf2').pbkdf2Sync

var MAX_VALUE = 0x7fffffff

// N = Cpu cost, r = Memory cost, p = parallelization cost
// callback(error, progress, key)
function scrypt(key, salt, N, r, p, dkLen, callback) {

  if (!callback) { throw new Error('missing callback'); }

  if (N === 0 || (N & (N - 1)) !== 0) throw Error('invalid parameter N')

  if (N > MAX_VALUE / 128 / r) throw Error('invalid parameter N')
  if (r > MAX_VALUE / 128 / p) throw Error('invalid parameter r')

  var XY = new Buffer(256 * r)
  var V = new Buffer(128 * r * N)

  // pseudo global
  var B32 = new Int32Array(16) // salsa20_8
  var x = new Int32Array(16) // salsa20_8
  var _X = new Buffer(64) // blockmix_salsa8

  // pseudo global
  var B = pbkdf2Sync(key, salt, 1, p * 128 * r, 'sha256')

  var tickCallback = null;
  var totalOps = p * N * 2
  var currentOp = 0

  var stop = false;

  var tickCallback = function () {
    ++currentOp

    // send progress notifications once every 1,000 ops
    if (currentOp % 1000 === 0) {
      //callack(null, currentOp / totalOps);
    }
  }

  var state = 0;
  var i0 = 0, i1;
  var Yi = 128 * r;

  var incrementalSMix = function() {
      if (stop) {
          return callback(new Error('cancelled'));
      }

      switch (state) {
          case 0:
              // for (vr i = 0; i < p; i++)
              state = 1;
              Bi = i0 * 128 * r;

              // Fall through

          //case 1:
              Xi = 0
              B.copy(XY, Xi, Bi, Bi + Yi);

              state = 2;
              i1 = 0;

              // Fall through

          case 2:
              // Run up to 1000 steps of the first inner smix loop
              var steps = N - i1;
              if (steps > 1000) { steps = 1000; }
              for (var i = 0; i < steps; i++) {
                  XY.copy(V, (i1 + i) * Yi, Xi, Xi + Yi)
                  blockmix_salsa8(XY, Xi, Yi, r)
              }

              // for (var i = 0; i < N; i++)
              i1 += steps;
              currentOp += steps;
              if (i1 < N) {
                  break;
              }

              i1 = 0;
              state = 3;

              //if (tickCallback) tickCallback()
              stop = callback(null, currentOp / totalOps);
              //break;
              // Fall through

          case 3:
              // Run up to 1000 steps of the second inner smix loop
              var steps = N - i1;
              if (steps > 1000) { steps = 1000; }
              for (var i = 0; i < steps; i++) {

                  var offset = Xi + (2 * r - 1) * 64
                  var j = XY.readUInt32LE(offset) & (N - 1)
                  blockxor(V, j * Yi, XY, Xi, Yi)
                  blockmix_salsa8(XY, Xi, Yi, r)
              }

              // for (var i = 0; i < N; i++)
              i1 += steps;
              currentOp += steps;
              if (i1 < N) {
                  break;
              }

              //state = 4

              stop = callback(null, currentOp / totalOps);
              //if (tickCallback) tickCallback()
              //break;
              // Fall through

          //case 4:
              XY.copy(B, Bi, Xi, Xi + Yi)

              i0++;
              if (i0 < p) {
                  state = 0;
                  break;
              }

          //case 5:
              key = pbkdf2Sync(key, B, 1, dkLen, 'sha256')
              return callback(null, 1.0, key);

              // Done; don't break (which would reschedule)
              //return;
      }

      setTimeout(incrementalSMix, 0);
  }

  incrementalSMix();


  function blockmix_salsa8 (BY, Bi, Yi, r) {
    var i

    arraycopy(BY, Bi + (2 * r - 1) * 64, _X, 0, 64)

    for (i = 0; i < 2 * r; i++) {
      blockxor(BY, i * 64, _X, 0, 64)
      salsa20_8(_X)
      arraycopy(_X, 0, BY, Yi + (i * 64), 64)
    }

    for (i = 0; i < r; i++) {
      arraycopy(BY, Yi + (i * 2) * 64, BY, Bi + (i * 64), 64)
    }

    for (i = 0; i < r; i++) {
      arraycopy(BY, Yi + (i * 2 + 1) * 64, BY, Bi + (i + r) * 64, 64)
    }
  }

  function R (a, b) {
    return (a << b) | (a >>> (32 - b))
  }

  function salsa20_8 (B) {
    var i

    for (i = 0; i < 16; i++) {
      B32[i] = (B[i * 4 + 0] & 0xff) << 0
      B32[i] |= (B[i * 4 + 1] & 0xff) << 8
      B32[i] |= (B[i * 4 + 2] & 0xff) << 16
      B32[i] |= (B[i * 4 + 3] & 0xff) << 24
      // B32[i] = B.readUInt32LE(i*4)   <--- this is signficantly slower even in Node.js
    }

    arraycopy(B32, 0, x, 0, 16)

    for (i = 8; i > 0; i -= 2) {
      x[ 4] ^= R(x[ 0] + x[12], 7)
      x[ 8] ^= R(x[ 4] + x[ 0], 9)
      x[12] ^= R(x[ 8] + x[ 4], 13)
      x[ 0] ^= R(x[12] + x[ 8], 18)
      x[ 9] ^= R(x[ 5] + x[ 1], 7)
      x[13] ^= R(x[ 9] + x[ 5], 9)
      x[ 1] ^= R(x[13] + x[ 9], 13)
      x[ 5] ^= R(x[ 1] + x[13], 18)
      x[14] ^= R(x[10] + x[ 6], 7)
      x[ 2] ^= R(x[14] + x[10], 9)
      x[ 6] ^= R(x[ 2] + x[14], 13)
      x[10] ^= R(x[ 6] + x[ 2], 18)
      x[ 3] ^= R(x[15] + x[11], 7)
      x[ 7] ^= R(x[ 3] + x[15], 9)
      x[11] ^= R(x[ 7] + x[ 3], 13)
      x[15] ^= R(x[11] + x[ 7], 18)
      x[ 1] ^= R(x[ 0] + x[ 3], 7)
      x[ 2] ^= R(x[ 1] + x[ 0], 9)
      x[ 3] ^= R(x[ 2] + x[ 1], 13)
      x[ 0] ^= R(x[ 3] + x[ 2], 18)
      x[ 6] ^= R(x[ 5] + x[ 4], 7)
      x[ 7] ^= R(x[ 6] + x[ 5], 9)
      x[ 4] ^= R(x[ 7] + x[ 6], 13)
      x[ 5] ^= R(x[ 4] + x[ 7], 18)
      x[11] ^= R(x[10] + x[ 9], 7)
      x[ 8] ^= R(x[11] + x[10], 9)
      x[ 9] ^= R(x[ 8] + x[11], 13)
      x[10] ^= R(x[ 9] + x[ 8], 18)
      x[12] ^= R(x[15] + x[14], 7)
      x[13] ^= R(x[12] + x[15], 9)
      x[14] ^= R(x[13] + x[12], 13)
      x[15] ^= R(x[14] + x[13], 18)
    }

    for (i = 0; i < 16; ++i) B32[i] = x[i] + B32[i]

    for (i = 0; i < 16; i++) {
      var bi = i * 4
      B[bi + 0] = (B32[i] >> 0 & 0xff)
      B[bi + 1] = (B32[i] >> 8 & 0xff)
      B[bi + 2] = (B32[i] >> 16 & 0xff)
      B[bi + 3] = (B32[i] >> 24 & 0xff)
      // B.writeInt32LE(B32[i], i*4)  //<--- this is signficantly slower even in Node.js
    }
  }

  // naive approach... going back to loop unrolling may yield additional performance
  function blockxor (S, Si, D, Di, len) {
    for (var i = 0; i < len; i++) {
      D[Di + i] ^= S[Si + i]
    }
  }
}

function arraycopy (src, srcPos, dest, destPos, length) {
  if (Buffer.isBuffer(src) && Buffer.isBuffer(dest)) {
    src.copy(dest, destPos, srcPos, srcPos + length)
  } else {
    while (length--) {
      dest[destPos++] = src[srcPos++]
    }
  }
}

module.exports = scrypt
