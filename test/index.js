import { closeConnection } from '../config/mongoConnection.js';
import data from './data/index.js';
import routes from './routes/index.js';

const main = async () => {
    switch(process.env.METHOD) {
        case 'DATA':
            await data();
            break;
        case 'ROUTES':
            await routes();
            break;
        default:
            await data();
            await routes();
            break;
    }
};

await main();
await closeConnection();