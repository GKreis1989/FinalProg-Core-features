import { ObjectId } from "bson";
import { medication as initMedication } from "../config/mongoCollections.js";
import { CustomException, validateObjectId, validateString } from "../helpers.js";
import axios from 'axios';

export const medication = await initMedication();

const BASE_URL = 'https://api.fda.gov/drug/ndc.json';
const SEARCH_LIMIT = 200;

const sampleMedicaiton = {
    _id: new ObjectId('654199d077b5d9aa7fedbf6e'),
    // ! Deprecated:
    // ndc: '12345678',
    // ! Deprecated:
    // pharmacyClass: ['bronchodilators'],
    // * New Attribute:
    productId: '79753-079_4c6d2b61-9129-414e-b706-73b01a934e51',
    brandName: 'proair',
    dosageForm: 'liquid',
    // * Was String, now [ String ]:
    route : [ 'inhalation' ],
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

export const searchMedications = async (keyword) => {
    keyword = validateString('keyword', keyword);
    const res = await paginatedEndpoint(`${BASE_URL}?search="${keyword}"&limit=${SEARCH_LIMIT}`);
    if(!res?.length) throw CustomException.notFound("medications with keyword", keyword);
    return res;
}

export const getMedicationByProductId = async (productId) => {
    productId = validateString('productId', productId);
    const res = await paginatedEndpoint(`${BASE_URL}?search=product_id:"${productId}"&limit=${SEARCH_LIMIT}`);
    if(!res?.length) throw CustomException.notFound("medication with id", productId);
    if(res.length !== 1) throw CustomException.badParameter("productId");
    return res[0];
};

export const getMedicationByObjectId = async (medicationId) => {
    const oId = validateObjectId('medicationId', medicationId);
    const foundMedication = await medication.findOne({ _id: oId });
    if(!foundMedication?._id) throw CustomException.notFound("medication with id ", medicationId);
    return foundMedication;
}

export const cacheMedication = async (productId) => {
    const foundMedication = await getMedicationByProductId(productId);
    const medicationObject = {
        productId: foundMedication?.product_id,
        brandName: foundMedication?.brand_name,
        dosageForm: foundMedication?.dosage_form,
        route: foundMedication?.route,
        genericName: foundMedication?.generic_name,
    }
    Object.keys(medicationObject).forEach(field => {
        try {
            validateString(field, medicationObject[field]);
        } catch(e) {
            medicationObject[field] = undefined;
        }
    })
}
