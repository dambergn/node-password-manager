'use strict';

// 128-bit, 192-bit and 256-bit keys
// var key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// var key_192 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
//               16, 17, 18, 19, 20, 21, 22, 23];
// var key_256 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
//               16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
//               29, 30, 31];
// numbers can be between 0 - 255

// let key = [];
let passwordENC = '';

// Convert password to a usable key
function generateKey(pass) {
  // console.log('Password PLT:', pass);
  // let hashed = calcMD5(pass);
  let hashed = hex_sha256(pass);
  // console.log('Password Hashed:', hashed);
  let keyed = [];
  let numberfied = [];
  for (let i = 0; i < hashed.length; i++) {
    if (!isNaN(hashed[i])) {
      numberfied.push(parseInt(hashed[i])+1)
    } else if (hashed[i] === 'a') {
      numberfied.push(11)
    } else if (hashed[i] === 'b') {
      numberfied.push(12)
    } else if (hashed[i] === 'c') {
      numberfied.push(13)
    } else if (hashed[i] === 'd') {
      numberfied.push(14)
    } else if (hashed[i] === 'e') {
      numberfied.push(15)
    } else if (hashed[i] === 'f') {
      numberfied.push(16)
    } else {
      console.log('There was an error keying the hash');
    }
  }
  // console.log('numberfied:', numberfied);

  for (let j = 0; j < numberfied.length; j++) {
    // console.log('adding', numberfied[j], 'and', numberfied[j+1]);
    if (numberfied[j] === 0 && numberfied[j+1] === 0){
      keyed.push(numberfied[j]);
    } else {
      keyed.push((numberfied[j] * numberfied[j+1]) -1);
    }
    j++;
  }
  // console.log('keyed array:', keyed);
  // key = keyed;
  return keyed
};

function encrypt(key, toBeEnc) {
  // Convert text to bytes
  // var text = 'system:system, username:username, password:password';
  var textBytes = aesjs.utils.utf8.toBytes(toBeEnc);

  // The counter is optional, and if omitted will begin at 1
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  // To print or store the binary data, you may convert it to hex
  var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  // console.log('Encrypted HEX:', encryptedHex);
  passwordENC = encryptedHex;
  return encryptedHex;
  // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
  //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"
};

function decrypt(key, toBeDec) {
  // When ready to decrypt the hex string, convert it back to bytes
  var encryptedBytes = aesjs.utils.hex.toBytes(toBeDec);

  // The counter mode of operation maintains internal state, so to
  // decrypt a new instance must be instantiated.
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);

  // Convert our bytes back into text
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  // console.log('Decrypted:', decryptedText);
  return decryptedText;
  // "Text may be any length you wish, no padding is required."
};
