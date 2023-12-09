import { ObjectId } from "bson";
import { prescription as initPrescription } from "../config/mongoCollections.js";
import { CustomException, validateObjectId, validatePrescription } from "../helpers.js";
import { getUserById } from "./user.js";

export const prescription = await initPrescription();

const samplePrescription = {
    _id: new ObjectId(),
    medicationId: new ObjectId(),
    quantity: 30,
    unit: 'tablets',
    refills: 2,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-31'),
    assignedTo: null 
};

export const createPrescription = async (medicationId, quantity, unit, refills, startDate, endDate) => {
    const newPrescription = {
        _id: new ObjectId(),
        medicationId,
        quantity,
        unit,
        refills,
        startDate,
        endDate,
        Patient: null
    };

    validatePrescription(newPrescription);

    const createPrescriptionResponse = await prescription.insertOne(newPrescription);
    if (createPrescriptionResponse.acknowledged) {
        return createPrescriptionResponse.insertedId;
    }
    throw CustomException.serverError('create prescription');
};

export const updatePrescription = async (config) => {
    // TODO: input validation

    // Verify doctor or medical professional 
    const foundPrescription = await getPrescriptionById(config.prescriptionId);
    const oId = foundPrescription._id;

    delete foundPrescription['_id'];
    delete config['prescriptionId'];

    const prescriptionKeys = Object.keys(foundPrescription);
    const updates = {};

    prescriptionKeys.forEach(key => {
        if (config.hasOwnProperty(key)) updates[key] = config[key];
    });

    Object.keys(updates).forEach(key => foundPrescription[key] = updates[key]);

    validatePrescription(foundPrescription);

    const updatedPrescription = await prescription.findOneAndUpdate(
        { _id: oId },
        { $set: updates },
    );

    if (updatedResponse?._id.toString() !== oId.toString()) {
        throw CustomException.serverError("update prescription");
    }
    return updatedPrescription;
};

export const assignPrescriptionToPatient = async (prescriptionId, patientId) => {
    const oPrescriptionId = validateObjectId('prescriptionId', prescriptionId);
    const oPatientId = validateObjectId('patientId', patientId);

    await getPatientById(patientId);

    const assignResponse = await prescription.findOneAndUpdate(
        { _id: oPrescriptionId },
        { $set: { assignedTo: oPatientId } },
        { returnDocument: 'after' }
    );

    if (!assignResponse) {
        throw CustomException.serverError('assign prescription to patient');
    }

    return assignResponse;
};
