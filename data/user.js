import { ObjectId } from "bson";
import { user as initUser } from "../config/mongoCollections.js";
import { CustomException, validateObjectId, validateUser } from "../helpers.js";

export const user = await initUser();

const sampleUser = {
    _id: new ObjectId('654199d077b5d9aa7fedbf6b'),
    role: 'patient',
    firstName: 'santa',
    lastName: 'clause',
    emailAddress: 'santaclause@gmail.com',
    associatedClinics: [
        new ObjectId('654199d077b5d9aa7fedbf6c')
    ],
    password: '12380asd0j01-djiahsd90u90ausd0a9s0dua09sdu093ud9'
};

export const createUser = async (firstName, lastName, emailAddress, password, role, associatedClinics) => {

    const newUser = {
        firstName,
        lastName,
        emailAddress,
        password,
        role,
        associatedClinics
    };
    validateUser(newUser);
    const existing = await user.findOne({ emailAddress: emailAddress });
    if(existing) throw CustomException.alreadyExists('user with email', emailAddress);
    const createUserResponse = await user.insertOne(newUser);
    if(createUserResponse.acknowledged) {
        return await getUser(createUserResponse.insertedId);
    }
    throw CustomException.serverError('add user');

}

export const getUser = async (userId) => {

    const oId = validateObjectId('userId', userId);
    const foundUser = await user.findOne({ _id: oId });
    if(!foundUser) throw CustomException.notFound("user with id", userId);
    delete foundUser['password'];
    return foundUser;

}

export const updateUser = async (config) => {

    const foundUser = await getUser(config.userId);
    const oId = foundUser._id;
    delete foundUser['_id'];
    const userKeys = Object.keys(foundUser);
    delete config['userId'];
    if(config.hasOwnProperty('_id')) delete config['_id']
    const updates = {};
    userKeys.forEach(key => {
        if(config.hasOwnProperty(key)) updates[key] = config[key];
    });
    Object.keys(updates).forEach(key => foundUser[key] = updates[key]);
    foundUser.password = '!FakePassword123';
    validateUser(foundUser);
    Object.keys(updates).forEach(key => updates[key] = foundUser[key]);
    const updatedResponse = await user.findOneAndUpdate(
        { _id : oId },
        { $set: updates }
    );
    if(updatedResponse?._id.toString() !== oId.toString()) throw CustomException.serverError("update user");
    const updatedFoundUser = await getUser(oId);
    delete updatedFoundUser['password'];
    return updatedFoundUser;

}

export const removeUser = async (userId) => {

    const foundUser = await getUser(userId);
    const deleteResponse = await user.deleteOne({ _id: foundUser._id });
    return foundUser;

}