import { Router } from 'express';
import { ObjectId } from "bson";
import { CustomException } from '../helpers.js';
import { createUser, getUser, updateUser, removeUser, getAllUsers, loginUser } from '../data/user.js'

const router = Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch(e) {
      console.error(error);
      if(error instanceof CustomException) res.status(error.code).json({error: error.message});
      else res.status(500).json({error: 'get users server error'});
    }
  })
  .post(async (req, res) => {
    try {
      const { firstName, lastName, emailAddress, password, role, associatedClinics: [] } = req.body;
      const newUser = await createUser(firstName, lastName, emailAddress, password, role);
      res.status(200).json(newUser);
    } catch (error) {
      console.error(error);
      if(error instanceof CustomException) res.status(error.code).json({error: error.message});
      else res.status(500).json({error: 'create user server error'});
    }
  });

router.route('/:userId')
  .get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await getUser(new ObjectId(userId));
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      if(error instanceof CustomException) res.status(error.code).json({error: error.message});
      else res.status(500).json({error: 'get user server error'});
    }
  })
  .put('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedUser = await updateUser({ userId: new ObjectId(userId), ...req.body });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      if(error instanceof CustomException) res.status(error.code).json({error: error.message});
      else res.status(500).json({error: 'update user server error'});
    }
  })
  .delete('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await removeUser(new ObjectId(userId));
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error(error);
      if(error instanceof CustomException) res.status(error.code).json({error: error.message});
      else res.status(500).json({error: 'delete user server error'});
    }
  });

router.route('/login')
  .post(async (req, res) => {
    try {
      const emailAddress = req.body.emailAddressInput;
      const password = req.body.passwordInput;
      const authenticatedUser = await loginUser(emailAddress, password);
      req.session.user = authenticatedUser;
    } catch (error) {
      console.error(error);
      if(error instanceof CustomException) res.status(error.code).json({error: error.message});
      else res.status(500).json({error: 'authenticate user server error'});
    }
  });

router.route('/register')
  .post(async (req, res) => {
    try {
      const firstName = req.body.firstNameInput;
      const lastName = req.body.lastNameInput;
      const emailAddress = req.body.emailAddressInput;
      const password = req.body.passwordInput;
      const role = req.body.roleInput;
      await createUser(firstName, lastName, emailAddress, password, role);
      return res.redirect('/login');
    } catch (error) {
      console.error(error);
      if(error instanceof CustomException) res.status(error.code).json({error: error.message});
      else res.status(500).json({error: 'create user server error'});
    }
  })

export default router;
