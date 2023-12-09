import * as medicationData from "../../data/medication.js";

const main = async () => {

    console.log("TESTING SEARCH MEDICATIONS");
    try {
        const res = await medicationData.searchMedications('Jungsaemmool');
        console.log(res);
    } catch(e) { // TODO: implement CustomException
        console.log(e);
    }

    console.log("TESTING GET MEDICATION BY PRODUCT ID");
    try {
        const res = await medicationData.getMedicationByProductId('79753-079_4c6d2b61-9129-414e-b706-73b01a934e51');
        console.log(res);
    } catch(e) { // TODO: implement CustomException
        console.log(e);
    }


}

export default main;