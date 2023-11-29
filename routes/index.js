import userRoutes from './user.js';
import authRoutes from './auth.js';

const constructorMethod = (app) => {
  app.use('/user', userRoutes);
  app.use('/auth', authRoutes);

  app.post('/user/signup', async (req, res) => {
    try {
      const authResponse = await fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (authResponse.ok) {
        const responseObject = await authResponse.json();
        res.status(201).json(responseObject);
      } 
      
      else {
        console.error("Forwarded signup failed:", authResponse.statusText);
        res.status(authResponse.status).send(authResponse.statusText);
      }
    } 
    
    catch (error) {
      console.error("Error during signup forwarding:", error);
      res.status(500).send('signup forwarding error');
    }
  });
  
  app.get('/*', (req, res) => {
    res.redirect('/');
  })
 
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};
  
export default constructorMethod;
