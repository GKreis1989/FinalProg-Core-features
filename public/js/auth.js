const loginForm = $id('loginForm');
const emailAddressInput = $id('emailAddress');
const passwordInput = $id('password');
const roleInput = $id('role');
const lastNameInput = $id('lastName');
const firstNameInput = $id('firstName');
const confirmPasswordInput = $id('confirm-password')
const switchAuthContent = $id('switch-auth-content');
const switchAuthModeButton = $id('switch-auth-mode');
const header = $id('header');

let modeLogin = true;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let authResponse;
    if(modeLogin) {
        authResponse = await fetch("/user/login", {
            "method": "POST",
            "body": JSON.stringify({
                "emailAddress": emailAddressInput.value,
                "password": passwordInput.value
            }),
            "headers": {
                "content-type": "application/json"
            }
        });
    } else {
        authResponse = await fetch("/user", {
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
    }
    const user = await authResponse.json();
    if(user.hasOwnProperty('_id')) window.location = '/home.html';
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