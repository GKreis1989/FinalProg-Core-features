import {
    validateObjectId,
    validateString,
    validateStringArray,
    validateEmail,
  } from './inputValidation.js';

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
       
        const validatedUserId = validateObjectId('userId', userIdInput.value);
        const validatedFirstName = validateString('firstName', firstNameInput.value);
        const validatedLastName = validateString('lastName', lastNameInput.value);
        const validatedEmailAddress = validateEmail(emailAddressInput.value);
        const validatedDateOfBirth = validateString('dateOfBirth', dateOfBirthInput.value);
        const validatedGender = validateString('gender', genderInput.value);
        const validatedAllergies = validateStringArray('allergies', allergiesInput.value.split(','));
       
       
        const patientData = {
            userId: validatedUserId,
            firstName: validatedFirstName,
            lastName: validatedLastName,
            emailAddress: validatedEmailAddress,
            dateOfBirth: validatedDateOfBirth,
            gender: validatedGender,
            allergies: validatedAllergies,
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
        try {
            const validatedPatientId = validateObjectId('patientId', patientIdInput.value);
            const validatedFirstName = validateString('updatedFirstName', updatedFirstNameInput.value);
            const validatedLastName = validateString('updatedLastName', updatedLastNameInput.value);
            const validatedEmailAddress = validateEmail(updatedEmailAddressInput.value);
            const validatedDateOfBirth = validateString('updatedDateOfBirth', updatedDateOfBirthInput.value);
            const validatedGender = validateString('updatedGender', updatedGenderInput.value);
            const validatedAllergies = validateStringArray('updatedAllergies', updatedAllergiesInput.value.split(','));

            const updatedData = {
                firstName: validatedFirstName,
                lastName: validatedLastName,
                emailAddress: validatedEmailAddress,
                dateOfBirth: validatedDateOfBirth,
                gender: validatedGender,
                allergies: validatedAllergies,
            };

            try {
                const response = await fetch(`/patient/${validatedPatientId}`, {
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
        } catch (validationError) {
            console.error("Validation error during patient update", validationError.message);
        }
    });
};
