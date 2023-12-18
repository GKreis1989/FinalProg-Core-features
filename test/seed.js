import { CustomException } from "../helpers.js";
import * as patientData from "../data/patient.js";
import * as userData from "../data/user.js";
import * as prescriptionData from "../data/prescription.js";
import * as medicationData from "../data/medication.js";
import { patient as initPatient, user as initUser, prescription as initPrescription, medication as initMedication, clinic as initClinic } from "../config/mongoCollections.js";
import { closeConnection } from "../config/mongoConnection.js";
import { createClinic } from "../data/clinic.js";

const main = async () => {

  const patient = await initPatient();
  const user = await initUser();
  const prescription = await initPrescription();
  const medication = await initMedication();
  const clinic = await initClinic();

  const reset = async () => {
    await patient.deleteMany({});
    await user.deleteMany({});
    await prescription.deleteMany({});
    await medication.deleteMany({});
    await clinic.deleteMany({});
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
    await createClinic('new clinic');
    userData.addUserToClinic(userId, 'new clinic');
    const medicationId = cachedMedication._id;
    const today = new Date();
    today.setDate(today.getDate() + 1)
    const yearFromNow = new Date();
    yearFromNow.setFullYear(yearFromNow.getFullYear() + 1);
    const newPrescription = await prescriptionData.createPrescription(medicationId, 5, 'inhaler', 5, today, yearFromNow, 'take once daily');
    prescriptionId = newPrescription._id;
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
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
    const res = await patientData.addPrescriptionToPatient(userId, prescriptionId);
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
    const newUser = await userData.createUser(
      'noah',
      'katz',
      'noah@stevens.edu',
      'Noahtest123!',
      'patient'
    );
    userId = newUser._id;
    await userData.addUserToClinic(userId, 'new clinic');
    const medicationSearchResults = await medicationData.searchMedications({ "genericName": "ibuprofen" });
    const cachedMedication = await medicationData.cacheMedication(medicationSearchResults[0].productId);
    const medicationId = cachedMedication._id;
    const today = new Date();
    today.setDate(today.getDate() + 1)
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
    const res = await patientData.addPrescriptionToPatient(userId, prescriptionId);
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();
  try {
    const newUser = await userData.createUser(
      'Chris',
      'Kehoe',
      'ckehoe@stevens.edu',
      'Christest123!',
      'doctor'
    );
    userId = newUser._id;
    await userData.addUserToClinic(userId, 'new clinic');
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    const newUser = await userData.createUser(
      'Mike',
      'Tyson',
      'mtyson@stevens.edu',
      'Mtysonstest123!',
      'admin'
    );
    userId = newUser._id;
    await createClinic('Mikes Clinic');
    await userData.addUserToClinic(userId, 'Mikes Clinic');
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
    const newUser = await userData.createUser(
      'Susy',
      'Queue',
      'squeue@stevens.edu',
      'Testpassword!123',
      'medical professional'
    );
    userId = newUser._id;
    await userData.addUserToClinic(userId, 'Mikes Clinic');
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
    const newUser = await userData.createUser(
      'Doctor',
      'Who',
      'dwho@stevens.edu',
      'Testpassword!123',
      'doctor'
    );
    userId = newUser._id;
    await userData.addUserToClinic(userId, 'Mikes Clinic');
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
    const newUser = await userData.createUser(
      'Test',
      'User',
      'tuser@stevens.edu',
      'Testpassword!123',
      'admin'
    );
    userId = newUser._id;
    await userData.addUserToClinic(userId, 'new clinic');
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }
}

await main();
await closeConnection();