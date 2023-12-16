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

    await reset();

}

export default main;