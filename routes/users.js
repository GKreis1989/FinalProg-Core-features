import { Router } from 'express';
const router = Router();
import { ObjectId } from "bson";
import { user as initUser } from "../config/mongoCollections.js";
import { createUser, getUser, updateUser, removeUser } from '../data/users.js'


router.post('/users', async (req, res) => {
   try {
    const { firstName, lastName, emailAddress, password, role, associatedClinics } = req.body;
    const newUser = await createUser(firstName, lastName, emailAddress, password, role, associatedClinics);
     res.json(newUser);
   } catch (error) 
      { console.error(error);
       res.status(400).json({error: 'Create User Route Error'});
      }
});

router.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getUser(new ObjectId(userId));
    res.json(user);
  } catch (error) 
      {console.error(error);
       res.status(400).json({error: 'Get User Route Error'});
      }
});

router.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await updateUser({ userId: new ObjectId(userId), ...req.body });
    res.json(updatedUser);
  } catch (error) 
      {console.error(error);
       res.status(400).json({error: 'Update User Route Error'});
      }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await removeUser(new ObjectId(userId));
    res.json(deletedUser);
  } catch (error)
    {console.error(error);
       res.status(400).json({error: 'Delete User Route Error'});
      }
});

export default router;
