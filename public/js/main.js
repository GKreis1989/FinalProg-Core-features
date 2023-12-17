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
  return firstName;
}

const validateLastName = (lastName) => {
  return lastName;
}

const validaterole = (role) => {
  return role;
}