import express from 'express';
import { LaunchConfig, parseArguments as BMICalculator } from './bmiCalculator';
import { parseApiArguments as exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
  response.send('Hello FullStack!');
});

app.get ('/bmi', (request, response) => {
  let bmiResponse;
  if (request.query.height && request.query.weight) {
    bmiResponse = BMICalculator([request.query.height as string, request.query.weight as string], LaunchConfig.Api);
    response.status(200).json(bmiResponse);
  }
  else {
    bmiResponse = {error: "malformed parameters"};
    response.status(404).json(bmiResponse);
  }
});

app.post('/exercises', (request, response) => {
  const exerciseCalculatorResult = exerciseCalculator(request.body);
  if ("error" in exerciseCalculatorResult)
  {
    response.status(404).json(exerciseCalculatorResult);
  }
  else response.status(200).json(exerciseCalculatorResult);
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});