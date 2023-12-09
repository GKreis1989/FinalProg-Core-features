import { medication as initMedication } from "../../config/mongoCollections.js";
import * as medicationData from "../../data/medication.js";
import { CustomException } from "../../helpers.js";

const main = async () => {

    const medication = await initMedication();

    const reset = async () => {
      await medication.deleteMany({});
    }

    await reset();

    console.log("TESTING SEARCH MEDICATIONS");
    try {
        const searchObject = {
            "brandName": "proair",
        }
        const res = await medicationData.searchMedications(searchObject);
        console.log(res);
    } catch(e) {
        if(e instanceof CustomException) {
          console.log(e.code, e.message);
        }
        else console.log(e);
    }

    console.log();

    console.log("TESTING GET MEDICATION BY PRODUCT ID");
    try {
        const productId = '59310-579_6aab0200-1a77-4658-b899-86e1d5524089';
        const res = await medicationData.getMedicationByProductId(productId);
        console.log(res);
    } catch(e) {
        if(e instanceof CustomException) {
          console.log(e.code, e.message);
        }
        else console.log(e);
    }
    
    console.log();

    let id;

    console.log("TESTING CACHE MEDICATION");
    try {
        const productId = '59310-579_6aab0200-1a77-4658-b899-86e1d5524089';
        const res = await medicationData.cacheMedication(productId);
        id = res['_id'];
        console.log(res);
    } catch(e) {
        if(e instanceof CustomException) {
          console.log(e.code, e.message);
        }
        else console.log(e);
    }
    
    console.log();

    console.log("TESTING GET MEDICATION BY OBJECT ID");
    try {
        const res = await medicationData.getMedicationByObjectId(id);
        console.log(res);
    } catch(e) {
        if(e instanceof CustomException) {
          console.log(e.code, e.message);
        }
        else console.log(e);
    }

    console.log();

    await reset();

}

export default main;