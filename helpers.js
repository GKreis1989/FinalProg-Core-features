import { ObjectId } from "mongodb";

export class CustomException {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
CustomException.badParameter = (params) => {
  params = typeof params === 'string' ? [params] : params;
  return new CustomException(
    400, // http status code for "bad request"
    `error: bad parameter${params.length > 1 ? 's' : ''}: ${params}`
  );
};
CustomException.unauthenticated = (id) => {
  return new CustomException(
    401, // http status code for "not authenticated"
    `error: failed to authenticate user ${id}`
  );
};
CustomException.unauthorized = () => {
  return new CustomException(
    403, // http status code for "not authorized"
    `error: user is not authorized to perform this operation`
  );
};
CustomException.notFound = (type, id) => {
  return new CustomException(
    404, // http status code for "not found"
    `error: ${type} ${id} not found`
  );
};
CustomException.alreadyExists = (type, id) => {
  return new CustomException(
    409, // http status code for "conflict"
    `error: ${type} ${id} already exists`
  );
}
CustomException.serverError = (failedAction) => {
  return new CustomException(
    500, // http status code for "conflict"
    `failed to ${failedAction}`
  );
}

export const validateEmail = (email) => {
  const err = CustomException.badParameter('emailAddress');
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

const hasNumber = (value) => /^\d+$/.test(value);
export const validatePassword = (password) => {
  if(!password) throw CustomException.badParameter('password must not be undefined');
  if(typeof password !== 'string') throw CustomException.badParameter('password must have type string');
  if(password.length < 8) throw CustomException.badParameter('password must have length >= 8');
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
  if(!hasLowercase) throw CustomException.badParameter('password must contain lowercase character');
  if(!hasUppercase) throw CustomException.badParameter('password must contain uppercase character');
  if(!_hasNumber) throw CustomException.badParameter('password must contain number');
  if(!hasSpecialCharacter) throw CustomException.badParameter('password must contain special character');
};

const roles = ["doctor", "medical professional", "patient", "admin"];
const validateRole = (role) => roles.includes(role.toLowerCase().trim()) ? role.toLowerCase().trim() : false;

export const validateString = (name, str) => {
  const err = CustomException.badParameter(name);
  if(!str || typeof str !== 'string') throw err;
  str = str.trim();
  if(!str.length) throw err;
  return str;
}

export const validateStringArray = (name, arr) => {
  arr.forEach(str => validateString(name, str));
  return arr;
}

export const validateObjectId = (name, id) => {
  if(id === undefined) throw CustomException.badParameter(name);
  let oId;
  try {
    oId = new ObjectId(id);
  } catch(e) {
    throw CustomException.badParameter(name)
  }
  return oId;
}

const userParams = ['firstName', 'lastName', 'emailAddress', 'password', 'role'];
export const validateUser = (userConfig) => {
  userParams.forEach(key => {
    userConfig[key] = validateString(key, userConfig[key]);
  })
  validateEmail(userConfig.emailAddress);
  validatePassword(userConfig.password);
  validateRole(userConfig.role);
  userConfig.associatedClinics = userConfig.associatedClinics.map(clinicId => validateObjectId('clinicId', clinicId));
  return userConfig;
};

export const validateUpdateUser = (updateUserParams) => {
  Object.keys(updateUserParams).forEach(key => {
    validateString(key, updateUserParams[key]);
    switch(key) {
      case 'emailAddress':
        updateUserParams[key] = validateEmail(updateUserParams[key]);
        break;
      case 'password':
        updateUserParams[key] = validatePassword(updateUserParams[key]);
        break;
      case 'role':
        updateUserParams[key] = validateRole(updateUserParams[key]);
        break;
      default:
        if(!userParams.includes(key)) throw CustomException.badParameter(key);
        updateUserParams[key] = validateString(key, updateUserParams[key]);
    }
  });
}

export const validateClinicName = (clinicName) => {
  return clinicName; // TODO: implement
}

export const shareClinic = (userA, userB) => {
  return true; // TODO: implement
}

const validMedicationSearchParams = {
  "productId": "product_id", 
  "brandName": "brand_name", 
  "dosageForm": "dosage_form", 
  "route": "route", 
  "genericName": "generic_name"
};

export const validateMedicationSearchParam = (searchParam) => {
  if(Object.keys(searchParam).length !== 1) throw CustomException.badParameter("searchParam");
  const key = Object.keys(searchParam)[0];
  const validKey = validMedicationSearchParams[key];
  if(!validKey) throw CustomException.badParameter(key);
  const value = validateString(key, searchParam[key]);
  const searchString = `${validKey}:"${value}"`;
  return searchString;
}

export const validatePatient = ( patientParams ) => {
  return patientParams;
}

export const validatePrescription = (prescriptionParams) => {
  return prescriptionParams;
}

export const validateUpdatePatient = (updatePatientParams) => {
  return updatePatientParams;
}

export const authenticateUser = (request) => {
  if(process.env.TESTING === 'TRUE') {
    return {
      firstName: 'patrick',
      lastName: 'hill',
      emailAddress: 'phill@stevens.edu',
      role: 'admin',
      associatedClinics: []
    };
  }

  if(request.session.user.hasOwnProperty('role')) {
    return request.session.user;
  }
  throw CustomException.unauthenticated('');
}