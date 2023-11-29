const $id = (id) => document.getElementById(id);
const $class = (className) => document.getElementsByClassName(className);
const $tag = (tagName) => document.getElementsByTagName(tagName);

const checkAuth = async () => {
    try {
        const auth = await fetch('/auth/check');
        return auth;
    } catch(e) {
        console.log(e);
        return { status: 500 };
    }
}

const main = async () => {
    const isLoggedIn = (await checkAuth()).status === 200;
    const isSignupPage = window.location.pathname.includes('/signup.html');
    
    if (isSignupPage) {
        const signupForm = $id('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const firstNameInput = $id('firstName');
                const lastNameInput = $id('lastName');
                const emailAddressInput = $id('emailAddress');
                const passwordInput = $id('password');
                const roleInput = $id('role');
                const associatedClinicsInput = $id('associatedClinics');

                const signupData = {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    emailAddress: emailAddressInput.value,
                    password: passwordInput.value,
                    role: roleInput.value,
                    associatedClinics: associatedClinicsInput.value.split(',').map(id => id.trim()),
                };

                try {
                    const response = await fetch("/auth/signup", {
                        method: "POST",
                        body: JSON.stringify(signupData),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (response.ok) {
                        console.log("Signup successful!");
                    } 
                    
                    else {
                        console.error("Signup failed:", response.statusText);
                    }
                } 
                
                catch (error) {
                    console.error("Error during signup:", error);
                }
            });
        }
    } 
        
    else {
        window.location.href = isLoggedIn ? '/home.html' : '/auth.html';
    }
}

document.addEventListener('DOMContentLoaded', main);
