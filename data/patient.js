import { ObjectId } from "bson";
import { patient as initPatient } from "../config/mongoCollections.js";
import { user as initUser } from "../config/mongoCollections.js";
import { CustomException, validateObjectId, validatePatient } from "../helpers.js";
import { getUserById } from "./user.js";

export const patient = await initPatient();
const user = await initUser();

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


export const addPatient = async (userId, firstName, lastName, emailAddress, dateOfBirth, gender, allergies) => {
        const newPatient = {
        userId,
        firstName,
        lastName,
        emailAddress,
        dateOfBirth,
        gender,
        medicalHistory,
        allergies,
        prescriptions: [],
    }
       validatePatient(newPatient);
    // TODO: input validation
    const existing = await user.findOne({ userId: userId });
    if(existing) throw CustomException.alreadyExists('user with ID', userId);
    const createPatientResponse = await user.insertOne(newPatient);
    if(createPatientResponse.acknowledged) {
        return await getUserById(createPatientResponse.insertedId);
    }
    throw CustomException.serverError('add patient');
}



export const getAllPatient = async () => {
    // TODO: input validation
    const allPatient = await patient.find({ });
     //Verify route checks doctor/medical professional permission
    return allPatient;

}


export const updatePatient = async (config) => {
    // TODO: input validation

    //verify doctor or medical professional 
    const foundPatient = await getPatientById(config.patientId);
    const oId = foundPatient._id;
    delete foundPatient['_id'];
    const patientKeys = Object.keys(foundPatient);
    delete config['patientId'];
    if(config.hasOwnProperty('_id')) delete config['_id']
    const updates = {};
    patientKeys.forEach(key => {
        if(config.hasOwnProperty(key)) updates[key] = config[key];
    });
    Object.keys(updates).forEach(key => foundPatient[key] = updates[key]);
 
    validatePatient(foundPatient);
    Object.keys(updates).forEach(key => updates[key] = foundPatient[key]);
    const updatedResponse = await patient.findOneAndUpdate(
        { _id : oId },
        { $set: updates }
    );
    if(updatedResponse?._id.toString() !== oId.toString()) throw CustomException.serverError("update patient");
    const updatedFoundPatient = await getPatientById(oId);
    delete updatedFoundPatient['password'];
    return updatedFoundPatient;

}


export const getPatientById = async (patientId) => {
    // TODO: input validation
    const oId = validateObjectId('patientId', patientId);
    const foundPatient = await patient.findOne({ _id: oId });
    if (!foundPatient) throw CustomException.notFound("patient with id", patientId);
    return foundPatient;
};
