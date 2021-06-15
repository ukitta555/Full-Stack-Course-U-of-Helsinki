import express from "express";
import { getDiagnoses } from "../services/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_request, response) => {
  response.json(getDiagnoses());
});

export default diagnosesRouter;