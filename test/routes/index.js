import clinic from './clinic.js';
import medication from './medication.js';
// import patient from './patient.js';
import user from './user.js';

const main = async () => {
    await clinic();
    await medication();
    // await patient();
    await user();
}

export default main;