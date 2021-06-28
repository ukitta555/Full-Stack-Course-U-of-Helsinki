import express from "express";
import diagnoseModel from "../models/Diagnose";
/*
import { getDiagnoses } from "../services/diagnoses";
*/

const diagnosesRouter = express.Router();

/*
diagnosesRouter.get('/', (_request, response) => {
  response.json(getDiagnoses());
});
*/


diagnosesRouter.get('/', async (_request, response): Promise<void> => {
  const patients = await diagnoseModel.find({});
  response.status(200).json(patients);
});

diagnosesRouter.post('/', async (request, response) => {
  const patient = new diagnoseModel(request.body);
  const patientInDB = await patient.save();
  response.json(patientInDB);
});

diagnosesRouter.put('/:id', async (request, response) => {
  const newPatient = request.body;
  const updatedDoc = await diagnoseModel.findOneAndUpdate({ _id: request.params.id }, newPatient, { new: true });
  response.json(updatedDoc);
});

diagnosesRouter.delete('/:id', async (request, response) => {
  await diagnoseModel.findOneAndDelete({ _id: request.params.id });
  response.status(201).send('removed');
});


export default diagnosesRouter;