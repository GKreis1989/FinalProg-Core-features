// import axios from 'axios';
// import { patient as initPatient } from '../../config/mongoCollections.js';

// const main = async () => {

//     const patient = await initPatient();
//     const reset = async () => {
//         await patient.deleteMany({});
//     }

//     await reset();

//     console.log('TESTING CREATE PATIENT');
//     const createPatientResponse = await axios.post('http://localhost:3000/patient', {
//         user: {
//             firstName: 'patrick',
//             lastName: 'hill',
//             emailAddress: 'phill@stevens.edu',
//             role: 'admin',
//             associatedClinics: []
//         },
//         gender: "male",
//         dateOfBirth: new Date(10, 12, 1995),
//         allergies: [ 'peanuts' ]
//     });
//     console.log(createPatientResponse.status, createPatientResponse.data);
//     console.log();

//     await reset();

// }

// export default main;