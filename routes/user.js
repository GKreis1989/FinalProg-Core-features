import { Router } from 'express';
import { ObjectId } from "bson";
import { CustomException } from '../helpers.js';
import { createUser, getUser, updateUser, removeUser } from '../data/user.js'

const router = Router();

router.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, password, role, associatedClinics } = req.body;
    const newUser = await createUser(firstName, lastName, emailAddress, password, role, associatedClinics);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    if(error instanceof CustomException) res.status(error.code).json({error: error.message});
    else res.status(500).json({error: 'create user error'});
  }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getUser(new ObjectId(userId));
    res.json(user);
  } catch (error) {
    console.error(error);
    if(error instanceof CustomException) res.status(error.code).json({error: error.message});
    else res.status(500).json({error: 'get user error'});
  }
});

router.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await updateUser({ userId: new ObjectId(userId), ...req.body });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    if(error instanceof CustomException) res.status(error.code).json({error: error.message});
    else res.status(500).json({error: 'update user error'});
  }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await removeUser(new ObjectId(userId));
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    if(error instanceof CustomException) res.status(error.code).json({error: error.message});
    else res.status(500).json({error: 'delete user error'});
  }
});

export default router;
