import express from 'express';
import * as clinicData from '../data/clinic.js';
import * as helpers from '../helpers.js';

const router = express.Router();

router.route('/')
    .get(async(req, res) => {
        try {
            helpers.authenticateUser(req);
            const clinics = await clinicData.getAllClinics();
            res.status(200).json(clinics);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'get all clinics server error'});
        }
    })

router.route('/:clinicName')
    .get(async (req, res) => {
        try {
            helpers.authenticateUser(req);
            const clinicName = req.params.clinicName;
            const clinic = await clinicData.findClinicByName(clinicName);
            res.status(200).json(clinic);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'get clinic server error'});
        }
    })
    .post(async (req, res) => {
        try {
            helpers.authenticateUser(req);
            const clinicName = req.params.clinicName;
            const clinic = await clinicData.createClinic(clinicName);
            res.status(200).json(clinic);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'create clinic server error'});
        }
    })
    .put(async (req, res) => {
        try {
            const user = helpers.authenticateUser(req);
            if(user.role !== 'admin') throw helpers.CustomException.unauthorized();
            const clinicName = req.params.clinicName;
            const newClinicName = req.body.newClinicName;
            const clinic = await clinicData.editClinicName(clinicName, newClinicName);
            res.status(200).json(clinic);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'edit clinic name server error'});
        }
    });

export default router;