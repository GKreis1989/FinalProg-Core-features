import express, { request } from 'express';
import * as patientData from '../data/patient.js';
import * as userData from '../data/user.js';
import * as helpers from '../helpers.js';

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
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
    .put(async (req, res) => {
        try {
            const requestingUser = await helpers.authenticateUser(req);
            const isSelf = requestingUser._id == req.body.userId;
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

router.route('/:userId')
    .get(async (req, res) => {
        try {
            const requestingUser = await helpers.authenticateUser(req);
            const isSelf = requestingUser._id == req.params.userId;
            const user = await userData.getUserById(req.params.userId);
            if(requestingUser.role !== 'admin' && !isSelf && !helpers.shareClinic(requestingUser, user)) throw helpers.CustomException.unauthorized();
            const patient = await patientData.getPatientByUserId(req.params.userId);
            res.status(200).send(patient);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'get patient server error'});
        }
    })

export default router;