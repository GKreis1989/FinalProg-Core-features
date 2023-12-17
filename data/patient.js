import { ObjectId } from "bson";
import { patient as initPatient } from "../config/mongoCollections.js";
import { CustomException, validateObjectId, validatePatient, validateUpdatePatient } from "../helpers.js";
import { getPrescriptionById } from "./prescription.js";

const samplePatient = {
    _id: new ObjectId, //patient collection ID
    userId: new ObjectId('654199d077b5d9aa7fedbf6c'), //userID collection ID 
    firstName: 'santa',
    lastName: 'clause',
    emailAddress: 'santaclause',
    dateOfBirth: new Date('1999-01-01'),
    gender: 'Male',
    allergies: ['Penicillin'],
    prescriptions: [],
};

export const createPatient = async (user, dateOfBirth, gender, allergies) => {

    const userId = user._id;
    delete user['_id'];
    user.userId = userId;
    const newPatient = validatePatient({
        ...user,
        dateOfBirth,
        gender,
        allergies,
        prescriptions: []
    });
    const patient = await initPatient();
    const createPatientResponse = await patient.insertOne(newPatient);
    if(createPatientResponse.acknowledged) {
        return await getPatientByUserId(userId);
    }
    throw CustomException.serverError('add patient');

};

export const getPatientByUserId = async (userId) => {

    const patient = await initPatient();
    const oId = validateObjectId('userId', userId);
    const foundPatient = await patient.findOne({ userId: oId });
    if(!foundPatient) throw CustomException.notFound("patient with userId", userId);
    return foundPatient;

};


export const updatePatient = async (updatePatientParams) => {

    const oId = validateObjectId('userId', updatePatientParams.userId);
    const patient = await initPatient();
    const foundPatient = await patient.findOne({
        "userId": oId
    });
    if(!foundPatient?.hasOwnProperty("_id")) throw CustomException.notFound("patient with userId", oId.toString());
    delete updatePatientParams['userId'];
    validateUpdatePatient(updatePatientParams);
    delete updatePatientParams['userId'];
    const updatePatientResponse = await patient.findOneAndUpdate(
        { userId : oId },
        { $set: updatePatientParams }
    );
    if(!updatePatientResponse.hasOwnProperty('_id')) throw CustomException.serverError("update patient");
    return await getPatientByUserId(oId.toString());

};

export const addPrescriptionToPatient = async (userId, prescriptionId) => {

    const oId = validateObjectId('userId', userId);
    const patient = await initPatient();
    const foundPatient = await getPatientByUserId(userId);
    if(!foundPatient?.hasOwnProperty("_id")) throw CustomException.notFound("patient with userId", oId.toString());
    const foundPrescription = await getPrescriptionById(prescriptionId);
    if(!foundPrescription?.hasOwnProperty('_id')) throw CustomException.notFound("prescription with id", prescriptionId.toString());
    if(foundPatient.prescriptions.includes(foundPrescription._id)) throw CustomException.alreadyExists(`prescription ${prescriptionId} for user`, foundPatient._id.toString())
    const prescriptions = [...foundPatient.prescriptions, prescriptionId];
    const updatePatientResponse = await patient.findOneAndUpdate(
        { userId : oId },
        { $set: { prescriptions } }
    );
    if(!updatePatientResponse.hasOwnProperty('_id')) throw CustomException.serverError("add prescription to patient");
    return await getPatientByUserId(oId.toString());

};

export const removePrescriptionFromPatient = async (userId, prescriptionId) => {

    const oId = validateObjectId('userId', userId);
    const patient = await initPatient();
    const foundPatient = await getPatientByUserId(userId);
    if(!foundPatient?.hasOwnProperty("_id")) throw CustomException.notFound("patient with userId", oId.toString());
    const foundPrescription = await getPrescriptionById(prescriptionId);
    if(!foundPrescription?.hasOwnProperty('_id')) throw CustomException.notFound("prescription with id", prescriptionId.toString());
    const prescriptions = foundPatient.prescriptions.filter(prescription => prescription.toString() !== prescriptionId.toString());
    if(foundPatient.prescriptions.length === prescriptions.length) throw CustomException.notFound(`prescription ${prescriptionId} for user`, foundPatient._id.toString())
    const updatePatientResponse = await patient.findOneAndUpdate(
        { userId : oId },
        { $set: { prescriptions } }
    );
    if(!updatePatientResponse.hasOwnProperty('_id')) throw CustomException.serverError("remove prescription from patient");
    return await getPatientByUserId(oId.toString());

};