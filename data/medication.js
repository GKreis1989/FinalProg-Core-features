import { ObjectId } from "bson";
import { medication as initMedication } from "../config/mongoCollections.js";
import { CustomException, validateSearchOptions } from "../helpers.js";
import { getUserById } from "./user.js";
import axios from 'axios';
import { closeConnection } from "../config/mongoConnection.js";

export const medication = await initMedication();

const BASE_URL = 'https://api.fda.gov/drug/ndc.json';
const SEARCH_LIMIT = 200;

const sampleMedicaiton = {
    _id: new ObjectId('654199d077b5d9aa7fedbf6e'),
    ndc: '12345678',
    pharmacyClass: ['bronchodilators'],
    brandName: 'proair',
    dosageForm: 'liquid',
    route : 'inhalation',
    genericName: 'albuterol sulfate'
}

const paginatedEndpoint = async (endpoint, offset=0) => {
    // TODO: error handling
    const initial = [];
    const response = await axios.get(`${endpoint}&skip=${offset}`);
    initial.push(...response.data.results);
    const remaining = (response?.data?.meta?.results?.total ?? 0) - offset - SEARCH_LIMIT;
    if(remaining > 0) initial.push(...(await paginatedEndpoint(endpoint, offset + SEARCH_LIMIT)));
    return initial;
}

export const searchMedicaitons = async (searchOptions) => {
    searchOptions = validateSearchOptions(searchOptions);
    const res = await paginatedEndpoint(`${BASE_URL}?search=${searchOptions.name}&limit=${SEARCH_LIMIT}`);
    console.log(res);
}