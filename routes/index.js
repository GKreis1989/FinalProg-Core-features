const constructorMethod = (app) => {

    app.use('/clinic', clinicRoutes);
    app.use('/medication', medicationRoutes);
    app.use('/patient', patientRoutes);
    app.use('/prescription', prescriptionRoutes);
    app.use('/user', userRoutes);

    app.get('/*', (req, res) => {
      res.redirect('/');
    })

    app.use('*', (req, res) => {
      res.status(404).json({ error: 'Not found' });
    });

};

export default constructorMethod;