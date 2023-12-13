import addressRoutes from './address.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Get all addresses route', data: addresses });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const addressId = req.params.id;
  try {
    res.json({ message: `Get address by ID route for ID: ${addressId}`, data: address });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const newAddress = req.body;
  try {
    res.json({ message: 'Create address route', data: createdAddress });
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const addressId = req.params.id;
  const updatedAddress = req.body;
  try {
    res.json({ message: `Update address route for ID: ${addressId}`, data: updatedAddress });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const addressId = req.params.id;
  try {
    res.json({ message: `Delete address route for ID: ${addressId}`, data: deletedAddress });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
