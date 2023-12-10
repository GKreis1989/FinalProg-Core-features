import { ObjectId } from "bson";
import { user as initUser } from "../config/mongoCollections.js";
import { CustomException, validateEmail, validatePassword, validateObjectId, validateUser, validateUpdateUser } from "../helpers.js";

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

    emailAddress = validateEmail(emailAddress);
    validatePassword(password);
    const exception = CustomException.unauthenticated('with email address ' + emailAddress);
    const user = await initUser();
    const foundUser = await user.findOne({
        "emailAddress": emailAddress
    });
    if(!foundUser?._id) throw exception
    const foundPassword = foundUser.password;
    delete foundUser['password'];
    const compare = (a, b) => a === b;
    if(compare(foundPassword, password)) return foundUser;
    throw exception;

};

export const getUserByEmailAddress = async (emailAddress) => {

    // TODO: input validation
    const user = await initUser();
    const foundUser = await user.findOne({ emailAddress });
    if(!foundUser) throw CustomException.notFound("user with email address", emailAddress);
    delete foundUser['password'];
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

export const updateUser = async (updateUserParams) => {

    const oId = validateObjectId('_id', updateUserParams._id);
    const user = await initUser();
    const foundUser = await user.findOne({
        "_id": oId
    });
    if(!foundUser?.hasOwnProperty("_id")) throw CustomException.notFound("user with id", oId.toString());
    delete updateUserParams['_id'];
    validateUpdateUser(updateUserParams);
    delete updateUserParams['_id'];
    const updateUserResponse = await user.findOneAndUpdate(
        { _id : oId },
        { $set: updateUserParams }
    );
    if(!updateUserResponse.hasOwnProperty('_id')) throw CustomException.serverError("update user");
    return await getUserById(oId.toString());

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