import express from 'express';
import medicationRoutes from './medication.js';

router.get('/', async (req, res) => {
  try {
    res.json({ message: 'Search medications route', data: medications });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const medicationId = req.params.id;
  try {
    res.json({ message: `Get medication by ID route for ID: ${medicationId}`, data: medication });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const newMedication = req.body;
  try {
    res.json({ message: 'Create medication route', data: createdMedication });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const medicationId = req.params.id;
  const updatedMedication = req.body;
  try {
    res.json({ message: `Update medication route for ID: ${medicationId}`, data: updatedMedication });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const medicationId = req.params.id;
  try {
    res.json({ message: `Delete medication route for ID: ${medicationId}`, data: deletedMedication });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
