import { ObjectId } from "bson";
import { medication as initMedication } from "../config/mongoCollections.js";
import { CustomException, validateObjectId, validateStringArray, validateString, validateMedicationSearchParam } from "../helpers.js";
import axios from 'axios';

const BASE_URL = 'https://api.fda.gov/drug/ndc.json';
const SEARCH_LIMIT = 200;

// ! documentation: https://open.fda.gov/apis/drug/ndc/searchable-fields/

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
    const initial = [];
    const response = await axios.get(`${endpoint}&skip=${offset}`);
    initial.push(...response.data.results);
    const remaining = (response?.data?.meta?.results?.total ?? 0) - offset - SEARCH_LIMIT;
    if(remaining > 0) initial.push(...(await paginatedEndpoint(endpoint, offset + SEARCH_LIMIT)));
    return initial;
}

export const searchMedications = async (searchParam) => {
    const searchString = validateMedicationSearchParam(searchParam);
    const url = `${BASE_URL}?search=${searchString}&limit=${SEARCH_LIMIT}`
    const res = await paginatedEndpoint(url);
    if(!res?.length) throw CustomException.notFound("medications with keyword", keyword);
    const foundMedications = res.map(med => {
        return {
            productId: med?.product_id,
            brandName: med?.brand_name,
            dosageForm: med?.dosage_form,
            route: med?.route,
            genericName: med?.generic_name
        }
    })
    return foundMedications;
}

export const getMedicationByProductId = async (productId) => {

    const medication = await initMedication();
    productId = validateString('productId', productId);
    const foundMedication = await medication.findOne({
        'productId': productId
    });
    if(foundMedication?.hasOwnProperty('_id')) return foundMedication;
    const res = await paginatedEndpoint(`${BASE_URL}?search=product_id:"${productId}"&limit=${SEARCH_LIMIT}`);
    if(!res?.length) throw CustomException.notFound("medication with id", productId);
    if(res.length !== 1) throw CustomException.badParameter("productId");
    const med = res[0];
    return {
        productId: med?.product_id,
        brandName: med?.brand_name,
        dosageForm: med?.dosage_form,
        route: med?.route,
        genericName: med?.generic_name
    }

};

export const getMedicationByObjectId = async (medicationId) => {

    const medication = await initMedication();
    const oId = validateObjectId('medicationId', medicationId);
    const foundMedication = await medication.findOne({ _id: oId });
    if(!foundMedication?._id) throw CustomException.notFound("medication with id ", medicationId);
    foundMedication._id = foundMedication._id.toString();
    return foundMedication;

}

export const cacheMedication = async (productId) => {

    const medication = await initMedication();
    let foundMedication = await medication.findOne({
        "productId": productId
    });
    if(foundMedication?.hasOwnProperty('_id')) 
        throw CustomException.alreadyExists("cached medication with product id", productId);
    foundMedication = await getMedicationByProductId(productId);
    Object.keys(foundMedication).forEach(field => {
        try {
            foundMedication[field] = (field === 'route' ? 
                validateStringArray : validateString)(field, foundMedication[field]);
        } catch(e) {
            foundMedication[field] = undefined;
        }
    });
    const createMedicationResponse  = await medication.insertOne(foundMedication);
    if(createMedicationResponse.acknowledged) {
        return await getMedicationByObjectId(createMedicationResponse.insertedId);
    }
    throw CustomException.serverError("caching medication");

}
