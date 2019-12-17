'use strict';

let key = [];
let passwordENC = '';

// Convert password to a usable key
function generateKey(pass) {
  console.log('Password PLT:', pass);
  let hashed = calcMD5(pass);
  console.log('Password Hashed:', hashed)
  let keyed = [];
  for (let i = 0; i < hashed.length; i++) {
    if (!isNaN(hashed[i])) {
      keyed.push(parseInt(hashed[i]))
    } else if (hashed[i] === 'a') {
      keyed.push(10)
    } else if (hashed[i] === 'b') {
      keyed.push(11)
    } else if (hashed[i] === 'c') {
      keyed.push(12)
    } else if (hashed[i] === 'd') {
      keyed.push(13)
    } else if (hashed[i] === 'e') {
      keyed.push(14)
    } else if (hashed[i] === 'f') {
      keyed.push(15)
    } else {
      console.log('There was an error keying the hash');
    }
  }
  // console.log('keyed array:', keyed);
  key = keyed;
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
