const userName = $id('user-name');
const firstName = $id('first-name');
const lastName = $id('last-name');
const emailAddress = $id('email-address');
const role = $id('role');
const userForm = $id('individual-user');
const prescriptionLink = $id('prescription-link');
const dateOfBirth = $id('date-of-birth');
const allergies = $id('allergies');
const gender = $id('gender');
const prescriptionList = $id('prescription-list');
let user;

const addPrescription = async (prescription) => {
    const li = document.createElement('li');
    li.classList.add('prescription')
    console.log(prescription);
    const medication = await (await fetch(`/medication/${prescription.medicationId}`)).json();
    const p1 = document.createElement('p');
    const start = new Date(prescription.startDate).toDateString();
    const end = new Date(prescription.endDate).toDateString();
    p1.innerText = `
    ${medication.brandName} | ${start}-${end} | quantity ${prescription.quantity} | refills ${prescription.refills} | unit ${prescription.unit}
    `
    const p2 = document.createElement('p');
    p2.innerText = prescription.instructions;
    li.appendChild(p1);
    li.appendChild(p2);
    prescriptionList.appendChild(li);
}

const getUserById = async (id) => {
    const response = await fetch(`/user/${id}`);
    user = await response.json();
    userName.innerText = `${user.firstName} ${user.lastName}`;
    if(user.role === 'patient') {
        const patient = await (await fetch(`/patient/${id}`)).json();
        console.log(patient);
        dateOfBirth.innerText = new Date(patient.dateOfBirth).toDateString();
        allergies.innerText = patient.allergies.reduce((a, b) => a + ' ' + b, '');
        gender.innerText = patient.gender;
        $id('role-label').classList.add('hidden');
        prescriptionLink.classList.remove('hidden');
        Array.from(document.getElementsByClassName('patient-data')).forEach(item => {
            item.classList.remove('hidden');
        })
        for(let pres of patient.prescriptions) {
            const prescriptionResponse = await fetch(`/prescription/${pres}`);
            const prescriptionObject = await prescriptionResponse.json();
            await addPrescription(prescriptionObject)
        }
    }
    return user;
}

const fillUser = async () => {

    const userId = window.localStorage['currentUser'];
    if(!userId) window.location = 'users.html';
    await getUserById(userId);
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    emailAddress.value = user.emailAddress;
    role.value = user.role;

}

fillUser();

const updateUser = async (updates) => {
    const updateResponse = await fetch("/user",{
        method: "PUT",
        body: JSON.stringify(updates),
        headers: {
            "content-type": "application/json"
        }
    })
    return await updateResponse.json();
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const updates = { _id: user._id };
    if(firstName.value !== user.firstName) updates.firstName = firstName.value;
    if(lastName.value !== user.lastName) updates.lastName = lastName.value;
    if(emailAddress.value !== user.emailAddress) updates.emailAddress = emailAddress.value;
    if(role.value !== user.role) updates.role = role.value;
    if(Object.keys(updates).length !== 1) {
        const res = await updateUser(updates);
        if(res.hasOwnProperty('_id')) window.location = '/';
    }
});