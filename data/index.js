import * as userData from "./user.js";
import * as medicationData from "./medication.js";
import * as clinicData from "./clinic.js";
import * as patientData from "./patient.js";
import * as prescriptionData from "./prescription.js";

const dataFunctions = {
    ...clinicData,
    ...medicationData,
    ...userData,
    ...patientData,
    ...prescriptionData
};

export default dataFunctions;