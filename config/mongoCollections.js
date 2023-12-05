import { dbConnection } from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const user = getCollectionFn('user');
export const clinic = getCollectionFn('clinic');
export const medication = getCollectionFn('medication');
export const patient = getCollectionFn('patient');
