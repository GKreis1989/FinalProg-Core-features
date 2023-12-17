import express from 'express';
import * as medicationData from '../data/medication.js';
import * as helpers from '../helpers.js';

const router = express.Router();

router.route('/productId/:productId')
    .get(async (req, res) => {
        try {
            const productId = req.params.productId;
            const foundMedication = await medicationData.getMedicationByProductId(productId);
            res.status(200).json(foundMedication);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'get medication by productId error'});
        }
    });

router.route('/:method/:value')
    .get(async (req, res) => {
        try {
            const searchParams = {
                [req.params.method]: req.params.value
            };
            const foundMedications = await medicationData.searchMedications(searchParams);
            res.status(200).json(foundMedications);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'search medication server error'});
        }
    })

router.route('/:objectId')
    .get(async (req, res) => {
        try {
            const medication = await medicationData.getMedicationByObjectId(req.params.objectId);
            res.status(200).json(medication);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'get medication server error'});
        }
    })

export default router;