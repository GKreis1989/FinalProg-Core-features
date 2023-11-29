import { Router } from 'express';
import { ObjectId } from "bson";
import { CustomException } from '../helpers.js';
import { login } from '../data/auth.js';
import { createUser } from '../data/user.js';

const router = Router();

router.get('/check', async (req, res) => {
    res.status(400).json({ "error": "failed" });
});

router.post('/login', async (req, res) => {
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    try {
        const foundUser = await login(emailAddress, password);
        res.status(200).json(foundUser);
    } catch(e) {
        if(e instanceof CustomException) res.status(e.code).send(e.message);
        else res.status(500).send('login error');
    }
});

router.post('/signup', async (req, res) => {
    const { firstName, lastName, emailAddress, password, role, associatedClinics } = req.body;
    try {
        const newUser = await createUser(firstName, lastName, emailAddress, password, role, associatedClinics);
        
        res.status(201).json(newUser);
    } 
    
    catch (e) {
        if (e instanceof CustomException) {
            res.status(e.code).send(e.message);
        } 
        
        else {
            res.status(500).send('signup error');
        }
    }
});

export default router;
