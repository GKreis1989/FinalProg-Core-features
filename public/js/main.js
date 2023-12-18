const $id = (id) => document.getElementById(id);
const $class = (className) => document.getElementsByClassName(className);
const $tag = (tagName) => document.getElementsByTagName(tagName);
const errorMessage = $id('error-message');
const error = (err) => {
    errorMessage.innerText = err;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
        errorMessage.innerText = '';
    }, 3500);
}

const validateEmail = (email) => {
    const err = { error: 'invalid email address' }
    const arr = Array.from(email);
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    if([atIndex, dotIndex].includes(-1) || atIndex > dotIndex || atIndex == 0) throw err;
    if(email.length - dotIndex < 3) throw err;
    arr.forEach((c, i) => {
      if([atIndex, dotIndex].includes(i)) return;
      if(!/[a-zA-Z0-9]/.test(c)) {
        if(i == 0) throw err;
        if(['_','.','-'].includes(c) && arr[i+1]) { if(!/[a-zA-Z0-9]/.test(arr[i+1])) throw err; }
        else throw err;
      }
    })
    return email.trim();
}

const validateAllergies = (allergies) => {
  const err = { error: 'invalid allergies input' };
  if(!Array.isArray(allergies)) throw err;
  allergies.forEach(a => {
    if(typeof a !== 'string' || a.length > 50) throw err;
  });
  return allergies;
}

const validateDateOfBirth = (dateOfBirth) => {
  let dob;
  try {
    dob = new Date(dateOfBirth);
    if(!dob || dob >= new Date()) throw '';
  } catch(e) {
    throw { error: 'invalid date' };
  }
  return dob;
}

const validateGender = (gender) => {
  gender = gender.trim();
  if(!gender) throw { error: 'gender must not be undefined' };
  if(gender.length > 50) throw { error: 'gender must be <= 50 characters' };
  if(gender.length < 1) throw { error: 'gender must be >= 1 characters' };
  return gender;
}

const validateFirstName = (firstName) => {
  firstName = firstName.trim();
  if(!firstName) throw { error: 'firstName must not be undefined' };
  if(firstName.length > 50) throw { error: 'firstName must be <= 50 characters' };
  if(firstName.length < 1) throw { error: 'firstName must be >= 1 characters' };
  return firstName.trim();
}

const validateLastName = (lastName) => {
  lastName = lastName.trim();
  if(!lastName) throw { error: 'lastName must not be undefined' };
  if(lastName.length > 50) throw { error: 'lastName must be <= 50 characters' };
  if(lastName.length < 1) throw { error: 'lastName must be >= 1 characters' };
  return lastName;
}

const hasNumber = (value) => /^\d+$/.test(value);

const validatePassword = (password) => {
  if(!password) throw {error: 'password must not be undefined'}
  if(typeof password !== 'string') throw {error: 'password must have type string'};
  if(password.length < 8) throw {error: 'password must have length >= 8'}
  let hasSpecialCharacter = false;
  let _hasNumber = false;
  let hasLowercase = false;
  let hasUppercase = false;
  const arr = Array.from(password);
  arr.forEach(char => {
      if(/[a-z]/.test(char)) hasLowercase = true;
      else if(/[A-Z]/.test(char)) hasUppercase = true;
      else if(hasNumber(char)) _hasNumber = true;
      else hasSpecialCharacter = true;
  })
  if(!hasLowercase) throw {error: 'password must contain lowercase character'};
  if(!hasUppercase) throw {error: 'password must contain uppercase character'};
  if(!_hasNumber) throw {error: 'password must contain number'};
  if(!hasSpecialCharacter) throw {error: 'password must contain special character'};
  return password;
};

const validateRole = (role) => {
  const roles = ["doctor", "medical professional", "patient", "admin"];
  const trimmedRole = role.toLowerCase().trim();

  if (!roles.includes(trimmedRole)) {
    throw {error: 'Invalid Role'}
  }
  return trimmedRole;
}

const validateSearch = (input) => {
  const trimmedInput = input.trim();
  const maxLength = 200;
  if (trimmedInput.length > maxLength) {
      throw new { error: `Input length exceeds the limit`};
  }

  return trimmedInput;
};

const validateUnit = (unit) => {
  unit = unit.trim();
  if(!unit) throw { error: 'unit must not be undefined' };
  if(unit.length > 50) throw { error: 'unit must be <= 50 characters' };
  if(unit.length < 1) throw { error: 'unit must be >= 1 characters' };
  return unit;
}

const validateStartAndEndDates = (start, end) => {
  let s;
  let e;
  try {
    s = new Date(start);
    e = new Date(end);
    if(s >= e) throw { error: 'end date must come after start date' }
  } finally {
    if(!s || !e) throw { error: 'invalid start or end date' };
  }
  return [start, end]
}

const validateInstructions = (instructions) => {
  if(!instructions) throw { error: 'instructions must not be undefined' };
  if(instructions.length > 100) throw { error: 'instructions must be <= 100 characters' }
  return instructions;
}

const validateQuantity = (quantity) => {
  const q = parseInt(quantity);
  if(!q || q == NaN) throw { error: 'invalid quantity' }
  return q;
}

const validateRefills = (refills) => {
  const r = parseInt(refills);
  if(!r || r == NaN) throw { error: 'invalid refills' };
  return r;
}