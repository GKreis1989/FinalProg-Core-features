import axios from 'axios';
import { medication as initMedication } from '../../config/mongoCollections.js';

const main = async () => {

    const medication = await initMedication();
    const reset = async () => {
        await medication.deleteMany({});
    }

    await reset();

    console.log('TESTING SEARCH MEDICATION');
    const searchMedicationsResponse = await axios.get('http://localhost:3000/medication/brandName/Albuterol%20Sulfate%20HFA');
    console.log(searchMedicationsResponse.status, searchMedicationsResponse.data);
    console.log();

    console.log('TESTING GET MEDICATION BY PRODUCT ID');
    const productId = searchMedicationsResponse.data[0].productId;
    const getMedicationByProductIdResponse = await axios.get(`http://localhost:3000/medication/productId/${productId}`);
    console.log(getMedicationByProductIdResponse.status, getMedicationByProductIdResponse.data);
    console.log();

    await reset();

}

export default main;