import clinicRoutes from './clinic.js';
router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Get all clinics route', data: clinics });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const clinicId = req.params.id;
  try {
    res.json({ message: `Get clinic by ID route for ID: ${clinicId}`, data: clinic });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const newClinic = req.body;
  try {
    res.json({ message: 'Create clinic route', data: createdClinic });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const clinicId = req.params.id;
  const updatedClinic = req.body;
  try {
    res.json({ message: `Update clinic route for ID: ${clinicId}`, data: updatedClinic });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const clinicId = req.params.id;
  try {
    res.json({ message: `Delete clinic route for ID: ${clinicId}`, data: deletedClinic });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
