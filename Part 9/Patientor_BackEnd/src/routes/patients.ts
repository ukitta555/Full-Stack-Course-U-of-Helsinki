import express from 'express';
import patientModel from '../models/patient';
/*
import { createPatient, getPatients } from '../services/patients';
import { NewPatientEntry } from '../utils/types';
import { createNewPatient } from '../utils/utils';
*/


const patientsRouter = express.Router();

/*
patientsRouter.get('/', (_request, response) => {
  response.json(getPatients());
});

patientsRouter.post('/', (request, response) => {
  try {
    const newPatient: NewPatientEntry = createNewPatient(request.body);
    response.json(createPatient(newPatient));
  }
  catch (error) {
    response.status(400).json({error: `Bad request! Error message: ${error.message}`});
  }
});
*/



patientsRouter.get('/', async (_request, response): Promise<void> => {
  const patients = await patientModel.find({});
  response.status(200).json(patients);
});

patientsRouter.post('/', async (request, response) => {
  const patient = new patientModel(request.body);
  const patientInDB = await patient.save();
  response.json(patientInDB);
});

patientsRouter.put('/:id', async (request, response) => {
  const newPatient = request.body;
  const updatedDoc = await patientModel.findOneAndUpdate({ _id: request.params.id }, newPatient, { new: true });
  response.json(updatedDoc);
});

patientsRouter.delete('/:id', async (request, response) => {
  await patientModel.findOneAndDelete({ _id: request.params.id });
  response.status(201).send('removed');
});



export default patientsRouter;