const loginForm = $id('loginForm');
const emailAddressInput = $id('emailAddress');
const passwordInput = $id('password');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const authResponse = await fetch("/auth/login", {
        "method": "POST",
        "body": JSON.stringify({
            "emailAddress": emailAddressInput.value,
            "password": passwordInput.value
        }),
        "headers": {
            "content-type": "application/json"
        }
    });
    console.log(authResponse.status);
    console.log(await authResponse.text());
})