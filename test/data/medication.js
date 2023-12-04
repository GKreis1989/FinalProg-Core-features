import * as medicationData from "../../data/medication.js";

const main = async () => {

    console.log("TESTING SEARCH MEDICATIONS")
    try {
        const res = await medicationData.searchMedicaitons({
            name: 'water'
        });
        console.log(res);
    } catch(e) { // TODO: implement CustomException
        console.log(e);
    }

}

export default main;