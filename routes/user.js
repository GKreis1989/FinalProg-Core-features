import express from 'express';
import * as userData from '../data/user.js';
import * as helpers from '../helpers.js';

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const requestingUser = helpers.authenticateUser(req);
            const allUsers = await userData.getAllUsers();
            const filteredUsers = [];
            const role = requestingUser.role;
            allUsers.forEach(u => {
                if(role == 'admin') filteredUsers.push(u);
                else if(['medical professional', 'doctor'].includes(role) 
                    && helpers.shareClinic(requestingUser, u)) filteredUsers.push(u);
                else if(role == 'patient' 
                    && requestingUser.emailAddress == u.emailAddress) filteredUsers.push(u);
            })
            res.status(200).json(filteredUsers);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'get all users server error'});
        }
    })
    .post(async (req, res) => {
        try {
            const { firstName, lastName, emailAddress, password, role } = req.body;
            const loggedInUser = await userData.createUser(firstName, lastName, emailAddress, password, role);
            req.session.user = loggedInUser;
            res.status(200).json(loggedInUser);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'create user server error'});
        }
    });

router.route('/login')
    .post(async (req, res) => {
        try {
            const { emailAddress, password } = req.body;
            const loggedInUser = await userData.loginUser(emailAddress, password);
            req.session.user = loggedInUser;
            res.status(200).json(loggedInUser);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'login user server error'});
        }
    })

router.route('/clinic')
    .post(async (req, res) => {
        try {
            const requestingUser = helpers.authenticateUser(req);
            const { userId, clinicName } = req.body;
            if(userId?.toString() !== requestingUser._id?.toString() && requestingUser.role !== 'admin')
                throw helpers.CustomException.unauthorized();
            const userResponse = await userData.addUserToClinic(userId, clinicName);
            req.session.user = userResponse;
            res.status(200).json(userResponse);
        } catch(error) {
            console.error(error);
            if(error instanceof helpers.CustomException) res.status(error.code).json({error: error.message});
            else res.status(500).json({error: 'add user to clinic server error'});
        }

    })

export default router;