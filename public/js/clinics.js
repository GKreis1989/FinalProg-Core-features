const clinicList = $id('clinic-list');

const joinClinic = async (e) => {
    const clinicName = e.target.id;
    const joinClinicResponse = await fetch('/user/clinic/join', {
        method: 'POST',
        body: JSON.stringify({
            clinicName
        }),
        headers: {
            'content-type': 'application/json'
        }
    });
    const joinClinic = await joinClinicResponse.json();
    console.log(joinClinic);
}

const populateClinicList = async() => {
    const clinicResponse = await fetch('/clinic');
    const clinics = await clinicResponse.json();
    clinics.forEach(clinic => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.id = clinic.name;
        button.innerText = clinic.name;
        button.addEventListener('click', joinClinic);
        li.appendChild(button);
        clinicList.appendChild(li);
    });
}

populateClinicList();