'use strict';
// password = 'password to be hashed'
// salt = 
// iterations = 100000 
// length = 128
// hashType = 'sha512'

exports.pbkdf2 = function (password, salt, iterations, len, hashType) {
  hashType = hashType || 'sha1';
  if (!Buffer.isBuffer(password)) {
    password = new Buffer(password);
  }
  if (!Buffer.isBuffer(salt)) {
    salt = new Buffer(salt);
  }
  var out = new Buffer('');
  var md, prev, i, j;
  var num = 0;
  var block = Buffer.concat([salt, new Buffer(4)]);
  while (out.length < len) {
    num++;
    block.writeUInt32BE(num, salt.length);
    prev = crypto.createHmac(hashType, password)
      .update(block)
      .digest();
    md = prev;
    i = 0;
    while (++i < iterations) {
      prev = crypto.createHmac(hashType, password)
        .update(prev)
        .digest();
      j = -1;
      while (++j < prev.length) {
        md[j] ^= prev[j]
      }
    }
    out = Buffer.concat([out, md]);
  }
  return out.slice(0, len);
}