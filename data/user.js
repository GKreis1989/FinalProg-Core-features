import { ObjectId } from "bson";
import { user as initUser } from "../config/mongoCollections.js";
import { CustomException, validateObjectId, validateUser } from "../helpers.js";

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

export const createUser = async (firstName, lastName, emailAddress, password, role) => {

    const user = await initUser();
    const newUser = {
        firstName,
        lastName,
        emailAddress,
        password,
        role,
        associatedClinics: []
    };
    validateUser(newUser);
    // TODO: input validation
    const existing = await user.findOne({ emailAddress: emailAddress });
    if(existing) throw CustomException.alreadyExists('user with email', emailAddress);
    const createUserResponse = await user.insertOne(newUser);
    if(createUserResponse.acknowledged) {
        return await getUserById(createUserResponse.insertedId);
    }
    throw CustomException.serverError('add user');

}

export const loginUser = async (emailAddress, password) => {

    const user = await initUser();
    const foundUser = await getUserByEmailAddress(emailAddress);
    const foundPassword = foundUser.password;
    delete foundUser['password'];
    const compare = (a, b) => a === b;
    if(compare(foundPassword, password)) return foundUser;
    throw CustomException.unauthenticated('with email address ' + emailAddress);

};

export const getUserByEmailAddress = async (emailAddress) => {

    // TODO: input validation
    const user = await initUser();
    const foundUser = await user.findOne({ emailAddress });
    if(!foundUser) throw CustomException.notFound("user with email address", emailAddress);
    return foundUser;

}

export const getUserById = async (userId) => {

    // TODO: input validation
    const user = await initUser();
    const oId = validateObjectId('userId', userId);
    const foundUser = await user.findOne({ _id: oId });
    if(!foundUser) throw CustomException.notFound("user with id", userId);
    delete foundUser['password'];
    return foundUser;

}

export const getAllUsers = async () => {

    // TODO: input validation
    const user = await initUser();
    const allUsers = await user.find({ });
    allUsers.forEach(user => {
        delete user['password'];
    })
    return allUsers;

}

export const updateUser = async (config) => {

    // TODO: input validation
    const user = await initUser();
    const foundUser = await getUserById(config.userId);
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
    const updatedFoundUser = await getUserById(oId);
    delete updatedFoundUser['password'];
    return updatedFoundUser;

}

export const removeUser = async (userId) => {

    // TODO: input validation
    const user = await initUser();
    const foundUser = await getUserById(userId);
    const deleteResponse = await user.deleteOne({ _id: foundUser._id });
    if(!deleteResponse?.acknowledged) throw CustomException.serverError("delete user")
    delete foundUser['password'];
    return foundUser;

}