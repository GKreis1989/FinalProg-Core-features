import { ObjectId } from "bson";
import { CustomException, validateObjectId, validatePrescription } from "../helpers.js";
import { prescription as initPrescription } from "../config/mongoCollections.js";

export const prescription = await initPrescription();

const samplePrescription = {
    _id: new ObjectId(),
    medicationId: new ObjectId(),
    quantity: 30,
    unit: 'tablets',
    refills: 2,
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-31'),
    instructions: ''
};

export const createPrescription = async ( medicaitonId, quantity, unit, refills, startDate, endDate, instructions ) => {

    const prescription = await initPrescription();
    const newPrescription = validatePrescription({
        medicaitonId,
        quantity,
        unit,
        refills,
        startDate,
        endDate,
        instructions
    });
    const createPrescriptionResponse = await prescription.insertOne(newPrescription);
    if(createPrescriptionResponse.acknowledged) {
        return await getPrescriptionById(createPrescriptionResponse.insertedId);
    }
    throw CustomException.serverError('add prescription');

};

export const getPrescriptionById = async ( prescriptionId ) => {

    const oId = validateObjectId('prescriptionId', prescriptionId);
    const prescription = await initPrescription();
    const foundPrescription = await prescription.findOne({ _id: oId });
    if(!foundPrescription) throw CustomException.notFound("prescription with id", foundPrescription);
    return foundPrescription;

};

