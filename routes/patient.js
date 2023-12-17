import express from 'express';
import * as patientData from '../data/patient.js';
import * as helpers from '../helpers.js';

const router = express.Router();

router.route('/')
    .post(async (req, res) => { // create user
        try {
            const requestingUser = await helpers.authenticateUser(req);
            const { user, dateOfBirth, gender, allergies } = req.body;
            if(requestingUser.emailAddress !== user.emailAddress) throw helpers.CustomException.unauthorized();
            const createdPatient = await patientData.createPatient(user, dateOfBirth, gender, allergies);
            res.status(200).send(createdPatient);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'create patient server error'});
        }
    })
    .put(async (req, res) => { // update patient
        try {
            const requestingUser = await helpers.authenticateUser(req);
            const isSelf = requestingUser._id == req.userId;
            if(requestingUser.role !== 'admin' && !isSelf) throw helpers.CustomException.unauthorized();
            const updatePatientParams = req.body;
            const updatedPatient = await patientData.updatePatient(updatePatientParams);
            res.status(200).send(updatedPatient);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'update patient server error'});
        }
    })

export default router;