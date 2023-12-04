import { ObjectId } from "mongodb";

export class CustomException {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
CustomException.badParameter = (params) => {
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

const validateEmail = (email) => {
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
}

const validateRole = (role) => ['pharmacist', 'doctor', 'patient', 'admin'].includes(role);

const validateString = (name, str) => {
  const err = CustomException.badParameter(name);
  if(!str || typeof str !== 'string') throw err;
  str = str.trim();
  if(!str.length) throw err;
  return str;
}

export const validateObjectId = (name, id) => {
  let oId;
  try {
    oId = new ObjectId(id);
  } catch(e) {
    throw CustomException.badParameter(name)
  }
  return oId;
}

const userParams = ['firstName', 'lastName', 'emailAddress', 'password', 'role'];

const roles = ["doctor", "medical professional", "patient", "admin"];

export const validateUser = (userConfig) => {
  userParams.forEach(key => {
    userConfig[key] = validateString(key, userConfig[key]);
  })
  validateEmail(userConfig.emailAddress);
  validateRole(userConfig.role);
  userConfig.associatedClinics = userConfig.associatedClinics.map(clinicId => validateObjectId(clinicId));
  return userConfig;
};

export const validateClinicName = (clinicName) => {
  return true; // TODO: implement
}

export const validateSearchOptions = (searchOptions) => {
  return searchOptions; // TODO: implement
}