import express from 'express';
import * as clinicData from '../data/clinic.js';
import * as helpers from '../helpers.js';

const router = Router();

router.route('/')
    .get(async(req, res) => {
        try {
            const user = helpers.authenticateUser(req);
            let res;
            switch(user.role) {
                case 'admin':
                    res = await clinicData.getAllClinics();
                    break;
                case 'medical professional':
                case 'doctor':
                case 'patient':
                    res = await clinicData.getAllClinics.filter(clinic => {
                        user.associatedClinics.includes(clinic.name);
                    });
                    break;
            }
        } catch(e) {
            console.error(error);
            if(error instanceof CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'delete user server error'});
        }
    })
