import express from 'express';
import emergencyCallModel from '../models/emergencyCall';


const callRouter = express.Router();

callRouter.get('/', async (_request, response): Promise<void> => {
  const patients = await emergencyCallModel.find({});
  response.status(200).json(patients);
});

callRouter.post('/', async (request, response) => {
  const patient = new emergencyCallModel(request.body);
  const patientInDB = await patient.save();
  response.json(patientInDB);
});

callRouter.put('/:id', async (request, response) => {
  const newPatient = request.body;
  const updatedDoc = await emergencyCallModel.findOneAndUpdate({ _id: request.params.id }, newPatient, { new: true });
  response.json(updatedDoc);
});

callRouter.delete('/:id', async (request, response) => {
  await emergencyCallModel.findOneAndDelete({ _id: request.params.id });
  response.status(201).send('removed');
});

export default callRouter;