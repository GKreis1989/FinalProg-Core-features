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

const validatePassword = (password) => {
  return password;
};

const validateFirstName = (firstName) => {
  const err = new Error('Invalid first name.');

  if (!firstName || typeof firstName !== 'string') {
    throw err;
  }

  const trimmedFirstName = firstName.trim();

  if (!trimmedFirstName.length) {
    throw err;
  }

  return trimmedFirstName;
};

const validateLastName = (firstName) => {
  const err = new Error('Invalid Last name.');

  if (!firstName || typeof firstName !== 'string') {
    throw err;
  }
  const trimmedFirstName = firstName.trim();

  if (!trimmedFirstName.length) {
    throw err;
  }
  return trimmedFirstName;
};

const validaterole = (role) => {
  const roles = ["doctor", "medical professional", "patient", "admin"];
  const trimmedRole = role.toLowerCase().trim();

  if (!roles.includes(trimmedRole)) {
    throw new Error('Invalid Role');
  }
  return trimmedRole;
}

const validatePatient = (patient) => {
  if (!patient.hasOwnProperty('dateOfBirth') || new Date(patient.dateOfBirth) >= new Date()) {
    throw new Error('Invalid or missing dateOfBirth');
  }

  if (!patient.hasOwnProperty('gender') || typeof patient.gender !== 'string') {
    throw new Error('Invalid or missing gender');
  }

  if (!patient.hasOwnProperty('allergies') || !Array.isArray(patient.allergies)) {
    throw new Error('Invalid or missing allergies');
  }

  return patient;
};


 const validatePrescription = (prescription) => {
  if (!('quantity' in prescription) || typeof prescription.quantity !== 'number' || prescription.quantity <= 0 || prescription.quantity > 400) {
    throw new Error('Invalid or missing quantity');
  }

  if (!('unit' in prescription) || typeof prescription.unit !== 'string') {
    throw new Error('Invalid or missing unit');
  }

  if (!('refills' in prescription) || typeof prescription.refills !== 'number' || prescription.refills <= 0 || prescription.refills > 50) {
    throw new Error('Invalid or missing refills');
  }

  if (!('startDate' in prescription) || new Date(prescription.startDate) < new Date()) {
    throw new Error('Invalid or missing startDate');
  }

  if (!('endDate' in prescription) || new Date(prescription.endDate) < new Date(prescription.startDate)) {
    throw new Error('Invalid or missing endDate');
  }

  if (!('instructions' in prescription) || typeof prescription.instructions !== 'string' || prescription.instructions.length > 500 ) {
    throw new Error('Invalid or missing instructions');
  }

  return prescription;
};
const validateSearch = (input) => {
  const trimmedInput = input.trim();
  const maxLength = 200;
  if (trimmedInput.length > maxLength) {
      throw new Error(`Input length exceeds the limit`);
  }

  return trimmedInput;
};
