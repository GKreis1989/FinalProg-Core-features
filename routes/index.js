import userRoutes from './user.js';
import authRoutes from './auth.js';

const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  
  app.get('/*', (req, res) => {
    res.redirect('/');
  })
 
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};
  
export default constructorMethod;
