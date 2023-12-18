const quantity = $id('quantity');
const unit = $id('unit');
const refills = $id('refills');
const startDate = $id('start-date');
const endDate = $id('end-date');
const instructions = $id('instructions');
const prescribeForm = $id('prescribe-med');
const userName = $id('user-name');

prescribeForm.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        const userId = window.localStorage['currentUser'];
        const [start, end] = validateStartAndEndDates(startDate.value, endDate.value);
        const res = await fetch(`/prescription/${userId}`, {
            method: "POST",
            body: JSON.stringify({
                productId: window.localStorage['currentMedication'],
                quantity: validateQuantity(quantity.value),
                unit: validateUnit(unit.value),
                refills: validateRefills(refills.value),
                startDate: start,
                endDate: end,
                instructions: validateInstructions(instructions.value)
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        const prescription = await res.json();
        if(!prescription.hasOwnProperty('_id')) return error(prescription.error)
        const addedPrescriptionResponse = await fetch(`/prescription/patient/${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                prescriptionId: prescription._id
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        const addedPrescription = await addedPrescriptionResponse.json();
        if(!addedPrescription?.hasOwnProperty('_id')) return error(addedPrescription.error);
        window.location = 'individualUser.html';
    } catch(err) {
        console.log(err);
        error(err.error);
    }
})

const getUser = async () => {

    const userId = window.localStorage['currentUser'];
    if(!userId) window.location = 'users.html';
    const response = await fetch(`/user/${userId}`);
    user = await response.json();
    userName.innerText = `${user.firstName} ${user.lastName}`;
    if(user.role !== 'patient') window.location = '/individualUser.html';
    return user;
}

getUser();