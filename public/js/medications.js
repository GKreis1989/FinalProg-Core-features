const brandName = $id('brand-name');
const dosageForm = $id('dosage-form');
const route = $id('route');
const genericName = $id('generic-name');
const userName = $id('user-name');
const searchForm = $id('search-medication');
const medicationList = $id('medication-list');
let user;

const getUser = async () => {

    const userId = window.localStorage['currentUser'];
    if(!userId) window.location = 'users.html';
    const response = await fetch(`/user/${userId}`);
    user = await response.json();
    userName.innerText = `${user.firstName} ${user.lastName}`;
    if(user.role !== 'patient') window.location = '/individualUser.html';
    return user;
}

const searchMedications = async (method, value) => {
    const medicationResponse = await fetch(`/medication/${method}/${value}`);
    const meds = await medicationResponse.json();
    return meds;
}

getUser();

const selectMedication = async (e) => {
    const id = e.target.id;
    window.localStorage['currentMedication'] = id;
    window.location = 'prescription.html';
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // TODO: validate brandname, dosageform, route, genericname
    let meds;
    if(brandName.value) meds = await searchMedications('brandName', brandName.value);
    if(dosageForm.value) meds = await searchMedications('dosageForm', dosageForm.value);
    if(route.value) meds = await searchMedications('route', route.value);
    if(genericName.value) meds = await searchMedications('genericName', genericName.value);
    medicationList.innerHTML = '';
    meds.forEach(med => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        li.appendChild(button);
        button.id = med.productId;
        button.innerText = `${med.brandName ?? ''} | ${med.genericName} | ${med.dosageForm} | ${med.route}`;
        button.addEventListener('click', selectMedication)
        medicationList.appendChild(li);
    })
})