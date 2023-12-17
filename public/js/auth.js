const loginForm = $id('loginForm');
const emailAddressInput = $id('emailAddress');
const passwordInput = $id('password');
const roleInput = $id('role');
const lastNameInput = $id('lastName');
const firstNameInput = $id('firstName');
const confirmPasswordInput = $id('confirm-password');
const genderInput = $id('gender');
const dateOfBirthInput = $id('date-of-birth');
const allergiesInput = $id('allergies');
const switchAuthContent = $id('switch-auth-content');
const switchAuthModeButton = $id('switch-auth-mode');
const header = $id('header');

let modeLogin = true;

const requestLogin = async () => {
    const authResponse = await fetch("/user/login", {
        "method": "POST",
        "body": JSON.stringify({
            "emailAddress": emailAddressInput.value,
            "password": passwordInput.value
        }),
        "headers": {
            "content-type": "application/json"
        }
    });
    return authResponse;
}

const requestRegister = async () => {
    const authResponse = await fetch("/user", {
        "method": "POST",
        "body": JSON.stringify({
            "emailAddress": emailAddressInput.value,
            "role": roleInput.value,
            "password": passwordInput.value,
            "firstName": firstNameInput.value,
            "lastName": lastNameInput.value
        }),
        "headers": {
            "content-type": "application/json"
        }
    });
    return authResponse;
}

const createPatient = async (user) => {
    authResponse = await fetch("/patient", {
        "method": "POST",
        "body": JSON.stringify({
            "user": user,
            "allergies": allergiesInput.value.split(','),
            "dateOfBirth": dateOfBirthInput.value,
            "gender": genderInput.value,
        }),
        "headers": {
            "content-type": "application/json"
        }
    });
    return authResponse;
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let authResponse = await (modeLogin ? requestLogin : requestRegister)();
    let user = await authResponse.json();
    if(user.hasOwnProperty('role') && user.role == 'patient') user = await (await createPatient(user)).json();
    if(user.hasOwnProperty('_id')) window.location = '/user.html';
    else {
        error(user.error);
    }
})

switchAuthModeButton.addEventListener('click', async (e) => {
    modeLogin = !modeLogin;
    if(modeLogin) {
        Array.from(document.getElementsByClassName('login-label')).forEach(element => {
            element.classList.add('hidden');
        })
        switchAuthModeButton.innerText = 'Register';
        header.innerText = 'Login';
    } else {
        Array.from(document.getElementsByClassName('login-label')).forEach(element => {
            element.classList.remove('hidden');
        })
        switchAuthModeButton.innerText = 'Login';
        header.innerText = 'Register';
    }
})


roleInput.addEventListener('change', () => {
    if(roleInput.value == 'patient') {
        Array.from(document.getElementsByClassName('login-label-patient')).forEach(element => {
            element.classList.remove('hidden');
        })
    } else {
        Array.from(document.getElementsByClassName('login-label-patient')).forEach(element => {
            element.classList.add('hidden');
        })
    }
})