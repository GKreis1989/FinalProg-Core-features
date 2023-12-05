import { shareClinic } from "../helpers";
import { getAllUsers } from "./user"

export const getAllDoctors = async (doctor) => {
    const users = await getAllUsers();
    const filteredUsers = users.filter(user => shareClinic(user, doctor));
    return filteredUsers;
}

class User {
    async _getAllUsers(filter) {
        const users = await getAllUsers();
        return users.filter(filter);
    }
}

class Doctor extends User {

    constructor(doctor) {
        this.doctor = doctor;
    }

    getAllUsers() {
        return this._getAllUsers((user) => shareClinic(user, this.doctor))
    }
}

class Patient extends User {

    constructor(patient) {
        this.patient = patient;
    }

    getAllUsers() {
        return this._getAllUsers((user) => user == this.patient)
    }
}

user.getAllUsers();

const patient = {
    data: {},
    getAllUsers: async (p) => { return await getAllUsers().filter(u => u === p) }
}