import express, { request } from 'express';
import * as prescriptionData from '../data/prescription.js';
import * as userData from "../data/user.js";
import * as medicationData from "../data/medication.js";
import * as helpers from '../helpers.js';
import { addPrescriptionToPatient, getPatientByUserId } from '../data/patient.js';

const router = express.Router();

router.route('/:id')
    .post(async (req, res) => {
        try {
            const requestingUser = helpers.authenticateUser(req);
            const user = await userData.getUserById(req.params.id);
            if(requestingUser.role != 'doctor' || !helpers.shareClinic(requestingUser, user)) {
                if(requestingUser.role != 'admin') {
                    throw helpers.CustomException.unauthorized();
                }
            }
            const {quantity, unit, refills, startDate, endDate, instructions} = req.body;
            const med = await medicationData.cacheMedication(req.body.productId);
            const prescription = await prescriptionData.createPrescription(med._id, quantity, unit, refills, startDate, endDate, instructions);
            console.log(prescription);
            res.status(200).json(prescription);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'create prescription server error'});
        }
    })
    .get(async (req, res) => {
        try {
            const prescriptionId = req.params.id;
            const prescription = await prescriptionData.getPrescriptionById(prescriptionId);
            const requestingUser = helpers.authenticateUser(req);
            if(requestingUser.role == 'patient') {
                const patient = await getPatientByUserId(requestingUser._id);
                let foundFlag = false;
                patient.prescriptions.forEach(prescription => {
                    if(prescription == prescriptionId) foundFlag = true;
                })
                if(!foundFlag) throw helpers.CustomException.unauthorized();
            }
            res.status(200).json(prescription);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'get prescription server error'});
        }
    });

router.route('/patient/:userId')
    .post(async (req, res) => {
        try {
            const requestingUser = helpers.authenticateUser(req);
            const user = await userData.getUserById(req.params.userId);
            if(requestingUser.role != 'doctor' || !helpers.shareClinic(requestingUser, user)) {
                if(requestingUser.role != 'admin') {
                    throw helpers.CustomException.unauthorized();
                }
            }
            const patient = await addPrescriptionToPatient(req.params.userId, req.body.prescriptionId);
            res.status(200).json(patient);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'add prescription to user server error'});
        }
    })



export default router;