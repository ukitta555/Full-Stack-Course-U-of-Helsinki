import express from 'express';
import hospitalModel from '../models/hospital';

const hospitalRouter = express.Router();


hospitalRouter.get('/', async (_request, response): Promise<void> => {
  const hospitals = await hospitalModel.find({});
  response.status(200).json(hospitals);
});

hospitalRouter.post('/', async (request, response) => {
  const hospital = new hospitalModel(request.body);
  const hospitalInDB = await hospital.save();
  response.json(hospitalInDB);
});

hospitalRouter.put('/:id', async (request, response) => {
  const newHospital = request.body;
  const updatedDoc = await hospitalModel.findOneAndUpdate({_id: request.params.id}, newHospital, {new: true});
  response.json(updatedDoc);
});

hospitalRouter.delete('/:id', async (request, response) => {
  await hospitalModel.findOneAndDelete({ _id: request.params.id});
  response.status(201).send('removed');
});

export default hospitalRouter;