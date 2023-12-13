//import userRoutes from './user.js';

//const constructorMethod = (app) => {
//  app.use('/user', userRoutes);
  
 // app.get('/*', (req, res) => {
 //   res.redirect('/');
//  })
 
//  app.use('*', (req, res) => {
 //   res.status(404).json({ error: 'Not found' });
//  });
//};
  
//export default constructorMethod;

//New changes
import express from 'express';
import addressRoutes from './address.js';
import clinicRoutes from './clinic.js';
import medicationRoutes from './medication.js';

const router = express.Router();

router.use('/address', addressRoutes);
router.use('/clinic', clinicRoutes);
router.use('/medication', medicationRoutes);

export default router;
