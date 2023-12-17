import { CustomException } from "../../helpers.js";
import * as patientData from "../../data/patient.js";
import * as userData from "../../data/user.js";
import * as prescriptionData from "../../data/prescription.js";
import * as medicationData from "../../data/medication.js";
import { patient as initPatient, user as initUser, prescription as initPrescription, medication as initMedication } from "../../config/mongoCollections.js";

const main = async () => {

  const patient = await initPatient();
  const user = await initUser();
  const prescription = await initPrescription();
  const medication = await initMedication();

  const reset = async () => {
    await patient.deleteMany({});
    await user.deleteMany({});
    await prescription.deleteMany({});
    await medication.deleteMany({});
  }

  await reset();

  let userId;
  let prescriptionId;

  try {
    const newUser = await userData.createUser(
      'santa',
      'clause',
      'santa@stevens.edu',
      'Northpole1225!',
      'patient'
    );
    userId = newUser._id;
    const medicationSearchResults = await medicationData.searchMedications({ "genericName": "albuterol" });
    const cachedMedication = await medicationData.cacheMedication(medicationSearchResults[0].productId);
    const medicationId = cachedMedication._id;
    const today = new Date();
    const yearFromNow = new Date();
    yearFromNow.setFullYear(yearFromNow.getFullYear() + 1);
    const newPrescription = await prescriptionData.createPrescription(medicationId, 5, 'pill', 5, today, yearFromNow, 'take once daily');
    prescriptionId = newPrescription._id;
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
    console.log("TESTING CREATE PATIENT");
    const res = await patientData.createPatient(await userData.getUserById(userId), new Date('10/12/1995'), 'male', ['peanuts']);
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log("TESTING ADD PRESCRIPTION TO PATIENT");
    const res = await patientData.addPrescriptionToPatient(userId, prescriptionId);
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