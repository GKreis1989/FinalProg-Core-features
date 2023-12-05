import { closeConnection } from '../config/mongoConnection.js';
import data from './data/index.js';

const main = async () => {
    await data();
};

await main();
await closeConnection();