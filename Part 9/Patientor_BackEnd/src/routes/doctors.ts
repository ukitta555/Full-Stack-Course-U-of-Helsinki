import express from 'express';
import DoctorModel from '../models/doctor';

const doctorsRouter = express.Router();


doctorsRouter.get('/', async (_request, response): Promise<void> => {
  const patients = await DoctorModel.find({});
  response.status(200).json(patients);
});

doctorsRouter.post('/', async (request, response) => {
  const patient = new DoctorModel(request.body);
  const patientInDB = await patient.save();
  response.json(patientInDB);
});

doctorsRouter.put('/:id', async (request, response) => {
  const newPatient = request.body;
  const updatedDoc = await DoctorModel.findOneAndUpdate({ _id: request.params.id }, newPatient, { new: true });
  response.json(updatedDoc);
});

doctorsRouter.delete('/:id', async (request, response) => {
  await DoctorModel.findOneAndDelete({ _id: request.params.id });
  response.status(201).send('removed');
});

export default doctorsRouter;