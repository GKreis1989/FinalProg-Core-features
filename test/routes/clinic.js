import axios from 'axios';
import { clinic as initClinic } from '../../config/mongoCollections.js';

const main = async () => {

    const clinic = await initClinic();
    const reset = async () => {
        await clinic.deleteMany({});
    }

    await reset();

    console.log('TESTING CREATE CLINIC');
    const createClinicResponse = await axios.post('http://localhost:3000/clinic/Test%20Clinic');
    console.log(createClinicResponse.status, createClinicResponse.data);
    console.log();

    console.log('TESTING EDIT CLINIC NAME');
    const editClinicNameResponse = await axios.put('http://localhost:3000/clinic/Test%20Clinic', {
        "newClinicName": "New Test Clinic"
    });
    console.log(editClinicNameResponse.status, editClinicNameResponse.data);
    console.log();

    console.log('TESTING GET CLINIC BY NAME');
    const getClinicByNameResponse = await axios.get('http://localhost:3000/clinic/New%20Test%20Clinic');
    console.log(getClinicByNameResponse.status, getClinicByNameResponse.data);
    console.log();

    await axios.post('http://localhost:3000/clinic/Test%20Clinic%202');
    await axios.post('http://localhost:3000/clinic/Test%20Clinic%203');
    await axios.post('http://localhost:3000/clinic/Test%20Clinic%204');

    console.log('TESTING GET ALL CLINICS');
    const getAllClinicsResponse = await axios.get('http://localhost:3000/clinic/');
    console.log(getAllClinicsResponse.status, getAllClinicsResponse.data);
    console.log();

    await reset();

}

export default main;