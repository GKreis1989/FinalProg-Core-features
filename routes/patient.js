import { Router } from 'express';
import { ObjectId } from 'bson';
import { CustomException, createUserObject } from '../helpers.js';
import { createUser, getUserById, updateUser, removeUser, getAllUsers, loginUser } from '../data/user.js';
import { addPatient, getAllPatient, getPatientById, updatePatient } from '../data/patient.js';

const router = Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const userObject = await createUserObject(req.cookies.session);
      const patients = await userObject.getAllPatient();
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'get patients server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const userObject = await createUserObject(req.cookies.session);
      const { userId, firstName, lastName, emailAddress, dateOfBirth, gender, allergies } = req.body;
      const newPatient = await userObject.addPatient(userId, firstName, lastName, emailAddress, dateOfBirth, gender, allergies);
      res.status(200).json(newPatient);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'create patient server error' });
    }
  });

router.route('/:patientId')
  .get(async (req, res) => {
    try {
      const userObject = await createUserObject(req.cookies.session);
      const patientId = req.params.patientId;
      const patient = await userObject.getPatientById(new ObjectId(patientId));
      res.status(200).json(patient);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'get patient server error' });
    }
  })
  .put(async (req, res) => {
    try {
      const userObject = await createUserObject(req.cookies.session);
      const patientId = req.params.patientId;
      const updatedPatient = await userObject.updatePatient({ patientId: new ObjectId(patientId), ...req.body });
      res.status(200).json(updatedPatient);
    } catch (error) {
      console.error(error);
      if (error instanceof CustomException) res.status(error.code).json({ error: error.message });
      else res.status(500).json({ error: 'update patient server error' });
    }
  });

export default router;
