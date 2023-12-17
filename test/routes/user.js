import axios from 'axios';
import { user as initUser, patient as initPatient, clinic as initClinic } from '../../config/mongoCollections.js';

const main = async () => {

    const user = await initUser();
    const patient = await initPatient();
    const clinic = await initClinic();
    const reset = async () => {
        await user.deleteMany({});
        await patient.deleteMany({});
        await clinic.deleteMany({});
    }

    await reset();

    console.log('TESTING CREATE USER');
    const createUserResponse = await axios.post('http://localhost:3000/user', {
        firstName: 'patrick',
        lastName: 'hill',
        emailAddress: 'phill@stevens.edu',
        password: "1234Password!",
        role: 'admin',
    });
    console.log(createUserResponse.status, createUserResponse.data);
    console.log();

    console.log('TESTING CREATE PATIENT');
    const createPatientResponse = await axios.post('http://localhost:3000/patient', {
        user: createUserResponse.data,
        gender: "male",
        dateOfBirth: new Date(10, 12, 1995),
        allergies: [ 'peanuts' ]
    });
    console.log(createPatientResponse.status, createPatientResponse.data);
    console.log();

    console.log('TESTING UPDATE PATIENT');
    const updatePatientResponse = await axios.put('http://localhost:3000/patient', {
        userId: createUserResponse.data._id,
        gender: "n/a"
    });
    console.log(updatePatientResponse.status, updatePatientResponse.data);
    console.log();

    console.log('TESTING LOGIN PATIENT');
    const loginPatientResponse = await axios.post('http://localhost:3000/user/login', {
        emailAddress: 'phill@stevens.edu',
        password: "1234Password!"
    });
    console.log(loginPatientResponse.status, loginPatientResponse.data);
    console.log();

    console.log('TESTING GET ALL USERS');
    const getAllUsersResponse = await axios.get('http://localhost:3000/user');
    console.log(getAllUsersResponse.status, getAllUsersResponse.data);
    console.log();

    await axios.post('http://localhost:3000/clinic/Test%20Clinic');
    
    console.log('TESTING ADD USER TO CLINIC');
    const addUserToClinicResponse = await axios.post('http://localhost:3000/user/clinic',{
        userId: getAllUsersResponse.data[0]._id,
        clinicName: 'Test Clinic'
    });
    console.log(addUserToClinicResponse.status, addUserToClinicResponse.data);
    console.log();

    await reset();

}

export default main;