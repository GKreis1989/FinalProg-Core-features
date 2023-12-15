const getAllPatients = async () => {
    try {
        const response = await fetch('/patient');
        const patients = await response.json();

        console.log('All Patients:', patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
};

const createPatient = async () => {
    const createPatientBtn = $id('createPatientBtn');
    const userIdInput = $id('userId');
    const firstNameInput = $id('firstName');
    const lastNameInput = $id('lastName');
    const emailAddressInput = $id('emailAddress');
    const dateOfBirthInput = $id('dateOfBirth');
    const genderInput = $id('gender');
    const allergiesInput = $id('allergies');

    createPatientBtn.addEventListener('click', async () => {
        const patientData = {
            userId: userIdInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            emailAddress: emailAddressInput.value,
            dateOfBirth: dateOfBirthInput.value,
            gender: genderInput.value,
            allergies: allergiesInput.value,
        };

        try {
            const response = await fetch("/patient", {
                method: "POST",
                body: JSON.stringify(patientData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log("Patient created");
            } else {
                console.error("Patient creation failed", response.statusText);
            }
        } catch (error) {
            console.error("Error during patient creation", error);
        }
    });
};

const getPatientById = async (patientId) => {
    try {
        const response = await fetch(`/patient/${patientId}`);
        const patient = await response.json();

        console.log('Patient by ID:', patient);
    } catch (error) {
        console.error('Error fetching patient by ID', error);
    }
};

const updatePatient = async () => {
    const updatePatientBtn = $id('updatePatientBtn');
    const patientIdInput = $id('patientId');
    const updatedFirstNameInput = $id('updatedFirstName');
    const updatedLastNameInput = $id('updatedLastName');
    const updatedEmailAddressInput = $id('updatedEmailAddress');
    const updatedDateOfBirthInput = $id('updatedDateOfBirth');
    const updatedGenderInput = $id('updatedGender');
    const updatedAllergiesInput = $id('updatedAllergies');

    updatePatientBtn.addEventListener('click', async () => {
        const patientId = patientIdInput.value;
        const updatedData = {
            firstName: updatedFirstNameInput.value,
            lastName: updatedLastNameInput.value,
            emailAddress: updatedEmailAddressInput.value,
            dateOfBirth: updatedDateOfBirthInput.value,
            gender: updatedGenderInput.value,
            allergies: updatedAllergiesInput.value,
        };

        try {
            const response = await fetch(`/patient/${patientId}`, {
                method: "PUT",
                body: JSON.stringify(updatedData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                console.log("Patient updated");
            } else {
                console.error("Patient update failed", response.statusText);
            }
        } catch (error) {
            console.error("Error during patient update", error);
        }
    });
};
