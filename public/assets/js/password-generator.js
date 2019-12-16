'use strict';

//constant values to use with password.
const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; //26 characters
const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //26 characters
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; //10 characters
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')']; //10 Characters
const optionalCharacters = ['-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '\'', '\"', '<', '>', ',', '.', '?', '/', '|', '`', '~']; //21 Characters
const similarCharacters = ['o', 'O', '0', 'i', 'j', 'l', 'I', 'S', '$', '5', 'B', '8'];

let meetsReqirements = true;
//function to generate random password
function generatePassword({
  _length,
  _lower,
  _lowerMin,
  _upper,
  _upperMin,
  _numb,
  _numbMin,
  _special,
  _specialMin,
  _optional,
  _optionalMin,
  _firstLetter,
  _repeat,
  _noSimilar,
  _noSequential
} = {}) {
  do {
    meetsReqirements === true
    // debugger;
    let passwordLength = _length;
    let lower = _lower;
    let lowerMin = _lowerMin;
    let upper = _upper;
    let upperMin = _upperMin;
    let numb = _numb;
    let special = _special;
    let specialMin = _specialMin;
    let optional = _optional;
    let optionalMin = _optionalMin;
    let firstLetter = _firstLetter;
    let repeat = _repeat;
    let noSimilar = _noSimilar;
    let noSequential = _noSequential;
    let numbMin = _numbMin;


    let upperCheck = 0;
    let lowerCheck = 0;
    let numbCheck = 0;
    let specialCheck = 0;
    let optionalCheck = 0;

    let generatedPassword = [];
    let parameters = [];

    //set lower case by default
    if (lower == false) {
      //do nothing
    } else if (lower == null || true) {
      parameters.push(lowerCase);
    };

    //set upper case by default
    if (upper == false) {
      //do nothing
    } else if (upper == null || true) {
      parameters.push(upperCase);
    };

    //set numbers case by default
    if (numb == false) {
      //do nothing
    } else if (numb == null || true) {
      parameters.push(numbers);
    };

    //enables special characters
    if (special == true) {
      parameters.push(specialCharacters);
    }

    //enables optional characters
    if (optional == true) {
      parameters.push(optionalCharacters);
    }


    // console.log('parameters: ', parameters)
    for (let i = 0; i < passwordLength; i++) {
      let charSet = Math.floor(Math.random() * parameters.length);
      let charSel = Math.floor(Math.random() * parameters[charSet].length);

      //Checking password for speficied modifications

      if (repeat == true) {
        if (i == 0) {
          console.log('no duplicate characters selected.');
        }
        if (parameters[charSet][charSel] === generatedPassword[i - 1]) {
          console.log('duplicate character found and dropped');
          generatedPassword.pop();
          i--;
        }
      }
      
      generatedPassword.push(parameters[charSet][charSel]);

      // if enabled will make sure first character is a letter.
      if (firstLetter == true) {
        // need something to prevent selecting false on upper and lower case to cause crash.

        let first = false;
        if (i == 0) {
          console.log('first letter option selected.');
          for (let j = 0; j < lowerCase.length; j++) {
            if (generatedPassword[0] == lowerCase[j] || generatedPassword[0] == upperCase[j]) {
              first = true;
            }
          }
          if (first == false) {
            console.log('First character not a letter');
            generatedPassword.pop();
            i--;
          }
        }
      }

      // if enabled will not use similar looking characters.
      if (noSimilar == true) {
        if (i == 0) {
          console.log('no similar characters option selected.');
        }
        for (let k = 0; k < similarCharacters.length; k++) {
          if (generatedPassword[i] == similarCharacters[k]) {
            console.log('Found invalid character');
            generatedPassword.pop();
            i--;
          }
        }
      }

      // if enabled will not use sequential characters.
      if (noSequential == true) {
        if (i == 0) {
          console.log('no sequential characters option selected.');
        }
        if (i > 0) {
          if (generatedPassword[i - 1] === parameters[charSet][charSel - 1] || generatedPassword[i - 1] === parameters[charSet][charSel + 1]) {
            generatedPassword.pop();
            i--;
          }
        }
      }
    };
    // console.log(generatedPassword);
    // Sets minimum characters to be used.
    for (let i = 0; i < generatedPassword.length; i++) {
      for (let j = 0; j < lowerCase.length; j++) { if (generatedPassword[i] === lowerCase[j]) { lowerCheck++; } };
      for (let k = 0; k < upperCase.length; k++) { if (generatedPassword[i] === upperCase[k]) { upperCheck++; } };
      for (let l = 0; l < numbers.length; l++) { if (generatedPassword[i] === numbers[l]) { numbCheck++; } };
      for (let m = 0; m < specialCharacters.length; m++) { if (generatedPassword[i] === specialCharacters[m]) { specialCheck++; } };
      for (let n = 0; n < optionalCharacters.length; n++) { if (generatedPassword[i] === optionalCharacters[n]) { optionalCheck++; } };
    }
    // console.log('upperCheck: ', upperCheck, 'lowerCheck: ', lowerCheck, 'numbCheck: ', numbCheck, 'specialCheck: ', specialCheck, 'optionalCheck: ', optionalCheck)
    if (lower == true && lowerMin > lowerCheck) {
      meetsReqirements = false;
      console.log('lower requested: ', lowerMin, 'result: ', lowerCheck)
    }else

    if (upper == true && upperMin > upperCheck) {
      meetsReqirements = false;
      console.log('upper requested: ', upperMin, 'result: ', upperCheck)
    }else

    if (numb == true && numbMin > numbCheck) {
      meetsReqirements = false;
      console.log('number requested: ', numbMin, 'result: ', numbCheck)
    }else

    if (special == true && specialMin > specialCheck) {
      meetsReqirements = false;
      console.log('special requested: ', specialMin, 'result: ', specialCheck)
    }else

    if (optional == true && optionalMin > optionalCheck) {
      meetsReqirements = false;
      console.log('optional requested: ', optionalMin, 'result: ', optionalCheck)
    }else{
      meetsReqirements = true
    }



    if (meetsReqirements == true) {
      return generatedPassword.join('');
    } else {
      console.log('does not meet: ', generatedPassword.join(''))
      generatedPassword = {};
      // reRunPasswordGeneration(passwordLength, lower, lowerMin, upper, upperMin, numb, special, specialMin, optional, optionalMin, firstLetter, repeat, noSimilar, noSequential, numbMin)
    };

  }
  while (meetsReqirements == false);
}

function reRunPasswordGeneration(passwordLength, lower, lowerMin, upper, upperMin, numb, special, specialMin, optional, optionalMin, firstLetter, repeat, noSimilar, noSequential, numbMin) {
  // console.log('PW re run: ', passwordLength, lower, lowerMin, upper, upperMin, numb, special, specialMin, optional, optionalMin, firstLetter, repeat, noSimilar, noSequential, numbMin)
  generatePassword(passwordLength, lower, lowerMin, upper, upperMin, numb, special, specialMin, optional, optionalMin, firstLetter, repeat, noSimilar, noSequential, numbMin)
}