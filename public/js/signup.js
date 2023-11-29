const signupForm = $id('signupForm');
const firstNameInput = $id('firstName');
const lastNameInput = $id('lastName');
const emailAddressInput = $id('emailAddress');
const passwordInput = $id('password');
const roleInput = $id('role');
const associatedClinicsInput = $id('associatedClinics');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

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
