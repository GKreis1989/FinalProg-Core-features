import { CustomException } from "../../helpers.js";
import * as clinicData from "../../data/clinic.js";
import { clinic as initClinic } from "../../config/mongoCollections.js";

const main = async () => {

  let clinic = await initClinic();

  const reset = async () => {
    await clinic.deleteMany({});
  }

  await reset();

  try {
    console.log('TESTING CREATE CLINIC');
    const res = await clinicData.createClinic(
      'North Pole Clinic'
    );
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