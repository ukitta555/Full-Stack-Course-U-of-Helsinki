import express from 'express';
import { createPatient, getPatients } from '../services/patients';
import { NewPatientEntry } from '../utils/types';
import { createNewPatient } from '../utils/utils';

const patientsRouter = express.Router();

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

export default patientsRouter;