import { Router } from 'express';
import { ObjectId } from "bson";
import { CustomException, createUserObject } from '../helpers.js';
import { createPrescription, updatePrescription, assignPrescriptionToPatient } from '../data/prescipriton.js'

const router = Router();

router.route('/prescriptions')
  .get(async (req, res) => {
    try {
      res.status(200).json(prescriptions);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'get prescriptions server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const { medicationId, quantity, unit, refills, startDate, endDate } = req.body;
      const newPrescriptionId = await createPrescription(medicationId, quantity, unit, refills, startDate, endDate);
      res.status(200).json({ prescriptionId: newPrescriptionId });
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'create prescription server error' });
    }
  });

router.route('/prescriptions/:prescriptionId')
  .get(async (req, res) => {
    try {
      const prescriptionId = req.params.prescriptionId;

      res.status(200).json(prescription);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'get prescription server error' });
    }
  })
  .put('/prescriptions/:prescriptionId', async (req, res) => {
    try {
      const prescriptionId = req.params.prescriptionId;
      const updatedPrescription = await updatePrescription({ prescriptionId, ...req.body });
      res.status(200).json(updatedPrescription);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'update prescription server error' });
    }
  })
  .post('/assign-prescription/:patientId', async (req, res) => {
    try {
      const prescriptionId = req.params.prescriptionId;
      const patientId = req.params.patientId;
      const assignResponse = await assignPrescriptionToPatient(prescriptionId, patientId);
      res.status(200).json(assignResponse);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'assign prescription to patient server error' });
    }
  });


export default router;
