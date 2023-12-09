import { CustomException, shareClinic } from "../helpers.js";
import * as userData from "./user.js";

class User {

    constructor(user) {
        this.user = user;
    }

    async getAllUsers() {
        const users = await userData.getAllUsers();
        return users.filter(filter);
    }

    async getUserById(id) {
        const user = await userData.getUserById(id);
        return user;
    }

    async getUserByEmailAddress(emailAddress) {
        const user = await userData.getUserByEmailAddress(emailAddress);
        return user;
    }

    async updateUser(config) {
        const user = await userData.updateUser(config);
        return user;
    }

    async removeUser(id) {
        const user = await userData.removeUser(id);
        return user;
    }

}

class Admin extends User {

    getAllUsers = async () => await super.getAllUsers();
    getUserById = async (id) => await super.getUserById(id);

}

class MedicalProfessional extends User {

    getAllUsers = async () => await super.getAllUsers().filter((user) => shareClinic(user, this.user));
    getUserById = async (id) => {
        const user = await super.getUserById(id);
        if(shareClinic(user, this.user)) return user;
        throw CustomException.unauthorized();
    }
    getUserByEmailAddress = async (emailAddress) => {
        const user = await super.getUserByEmailAddress(emailAddress);
        if(shareClinic(user, this.user)) return user;
        throw CustomException.unauthorized();
    }

}

class Doctor extends User {

    getAllUsers = async () => await super.getAllUsers().filter((user) => shareClinic(user, this.user));
    getUserById = async (id) => {
        const user = await super.getUserById(id);
        if(shareClinic(user, this.user)) return user;
        throw CustomException.unauthorized();
    }

}

class Patient extends User {

    getAllUsers = async () => await super.getAllUsers().filter((user) => user._id === this.user._id);
    getUserById = async (id) => {
        const user = await super.getUserById(id);
        if(user._id === this.user._id) return user;
        throw CustomException.unauthorized();
    }

}