import clinic from './clinic.js';
import user from './user.js';
import medication from './medication.js';
import patient from "./patient.js";

const main = async () => {
    await clinic();
    await user();
    await medication();
    await patient();
}

export default main;