import clinic from './clinic.js';
import user from './user.js';
import medication from './medication.js';

const main = async () => {
    await clinic();
    await user();
    await medication();
}

export default main;