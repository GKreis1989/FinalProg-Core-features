import { ObjectId } from "bson";
import { clinic as initClinic } from "../config/mongoCollections.js";
import { CustomException, validateClinicName } from "../helpers.js";
import { getUserById } from "./user.js";

const sampleClinic = {
    _id: new ObjectId('654199d077b5d9aa7fedbf6c'),
    name: 'Stevens Institute of Medicine'
}

export const getAllClinics = async () => {

    const clinic = await initClinic();
    const allClinics = await clinic.find({});
    return allClinics;

}

export const findClinicByName = async (clinicName) => {

    const clinic = await initClinic();
    validateClinicName(clinicName);
    const foundClinic = await clinic.findOne({ name: clinicName });
    if(!foundClinic?.hasOwnProperty('_id')) throw CustomException.notFound('clinic', clinicName);
    return foundClinic;

}

export const createClinic = async (clinicName) => {

    const clinic = await initClinic();
    validateClinicName(clinicName);
    const foundClinic = await clinic.findOne({ name: clinicName });
    if(foundClinic?.hasOwnProperty('_id')) throw CustomException.alreadyExists('clinic', clinicName);
    const createClinicResponse = await clinic.insertOne({ name: clinicName });
    if(createClinicResponse.acknowledged) {
        return await findClinicByName(clinicName);
    }
    throw CustomException.serverError('create clinic');

}

export const editClinicName = async (clinicName, newClinicName) => {

    const clinic = await initClinic();
    let foundClinic = await findClinicByName(clinicName);
    validateClinicName(newClinicName);
    const updatedResponse = await clinic.findOneAndUpdate(
        { name: clinicName },
        { $set: { name: newClinicName } }
    );
    if(updatedResponse?._id.toString() !== oId.toString()) throw CustomException.serverError("update clinic");
    foundClinic = await findClinicByName(newClinicName);
    return foundClinic;

}
